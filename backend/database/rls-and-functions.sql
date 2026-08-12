-- HM Academy production security + application functions
-- Run after schema.sql in Supabase SQL Editor.

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin','teacher')
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.profiles enable row level security;
alter table public.student_settings enable row level security;
alter table public.student_progress enable row level security;
alter table public.activity_attempts enable row level security;
alter table public.assessment_attempts enable row level security;
alter table public.courses enable row level security;
alter table public.lessons enable row level security;
alter table public.analytics_events enable row level security;
alter table public.visitor_sessions enable row level security;

drop policy if exists profiles_self_select on public.profiles;
create policy profiles_self_select on public.profiles for select to authenticated using (id = auth.uid() or public.is_admin());
drop policy if exists profiles_self_update on public.profiles;
create policy profiles_self_update on public.profiles for update to authenticated using (id = auth.uid() or public.is_admin()) with check (id = auth.uid() or public.is_admin());
drop policy if exists profiles_admin_all on public.profiles;
create policy profiles_admin_all on public.profiles for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists settings_self on public.student_settings;
create policy settings_self on public.student_settings for all to authenticated using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());

drop policy if exists progress_self on public.student_progress;
create policy progress_self on public.student_progress for all to authenticated using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());

drop policy if exists activities_self_insert on public.activity_attempts;
create policy activities_self_insert on public.activity_attempts for insert to authenticated with check (user_id = auth.uid());
drop policy if exists activities_self_select on public.activity_attempts;
create policy activities_self_select on public.activity_attempts for select to authenticated using (user_id = auth.uid() or public.is_admin());

drop policy if exists assessments_self on public.assessment_attempts;
create policy assessments_self on public.assessment_attempts for all to authenticated using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());

drop policy if exists courses_read on public.courses;
create policy courses_read on public.courses for select to anon, authenticated using (active = true or public.is_admin());
drop policy if exists lessons_read on public.lessons;
create policy lessons_read on public.lessons for select to anon, authenticated using (active = true or public.is_admin());

-- Analytics is intentionally writable by the public client only for event collection.
-- Do not expose student PII in event_data.
drop policy if exists analytics_insert on public.analytics_events;
create policy analytics_insert on public.analytics_events for insert to anon, authenticated with check (user_id is null or user_id = auth.uid());
drop policy if exists analytics_select_admin on public.analytics_events;
create policy analytics_select_admin on public.analytics_events for select to authenticated using (public.is_admin());

drop policy if exists visitor_insert on public.visitor_sessions;
create policy visitor_insert on public.visitor_sessions for insert to anon, authenticated with check (true);
drop policy if exists visitor_select_admin on public.visitor_sessions;
create policy visitor_select_admin on public.visitor_sessions for select to authenticated using (public.is_admin());

-- New accounts receive a profile and default settings automatically.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role, level_code)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(coalesce(new.email,''),'@',1), 'طالب جديد'),
    'student',
    new.raw_user_meta_data->>'level_code'
  )
  on conflict (id) do update set full_name = excluded.full_name, level_code = coalesce(excluded.level_code, public.profiles.level_code);
  insert into public.student_settings (user_id) values (new.id) on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Atomic progress writer used by the student runtime.
create or replace function public.save_lesson_progress(
  p_lesson_id text,
  p_status text default 'in_progress',
  p_progress_percent numeric default 0,
  p_xp_earned integer default 0,
  p_last_section text default null,
  p_last_activity_id text default null,
  p_best_score numeric default null
)
returns public.student_progress
language plpgsql
security definer
set search_path = public
as $$
declare r public.student_progress;
begin
  if auth.uid() is null then raise exception 'authentication required'; end if;
  if p_progress_percent < 0 or p_progress_percent > 100 then raise exception 'invalid progress'; end if;
  insert into public.student_progress(user_id, lesson_id, status, progress_percent, xp_earned, best_score, attempts, last_section, last_activity_id, started_at, completed_at, last_opened_at)
  values(auth.uid(), p_lesson_id, p_status, p_progress_percent, greatest(0,p_xp_earned), p_best_score, 1, p_last_section, p_last_activity_id, now(), case when p_status='completed' then now() else null end, now())
  on conflict(user_id, lesson_id) do update set
    status=excluded.status,
    progress_percent=greatest(public.student_progress.progress_percent, excluded.progress_percent),
    xp_earned=greatest(public.student_progress.xp_earned, excluded.xp_earned),
    best_score=case when excluded.best_score is null then public.student_progress.best_score else greatest(coalesce(public.student_progress.best_score,0), excluded.best_score) end,
    attempts=public.student_progress.attempts+1,
    last_section=excluded.last_section,
    last_activity_id=excluded.last_activity_id,
    completed_at=case when excluded.status='completed' then coalesce(public.student_progress.completed_at, now()) else public.student_progress.completed_at end,
    last_opened_at=now()
  returning * into r;
  update public.profiles set xp=coalesce((select sum(xp_earned) from public.student_progress where user_id=auth.uid()),0), current_lesson_id=p_lesson_id, current_section=p_last_section, current_activity_id=p_last_activity_id, last_active_at=now(), updated_at=now() where id=auth.uid();
  return r;
end;
$$;

grant execute on function public.save_lesson_progress(text,text,numeric,integer,text,text,numeric) to authenticated;

create or replace view public.admin_student_summary as
select * from public.admin_student_summary;
