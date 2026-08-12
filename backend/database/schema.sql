-- HM Academy production database schema
-- PostgreSQL / Supabase compatible
-- Never store raw passwords. Authentication credentials should be handled by the auth provider.

create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key,
  full_name text not null,
  role text not null default 'student' check (role in ('student','teacher','admin')),
  level_code text,
  xp integer not null default 0 check (xp >= 0),
  current_course_id text,
  current_lesson_id text,
  current_section text,
  current_activity_id text,
  last_active_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists student_settings (
  user_id uuid primary key references profiles(id) on delete cascade,
  language text not null default 'ar',
  theme text not null default 'system' check (theme in ('system','light','dark')),
  reduced_motion boolean not null default false,
  sound_enabled boolean not null default true,
  autoplay_audio boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists courses (
  id text primary key,
  title text not null,
  stage text,
  description text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists lessons (
  id text primary key,
  course_id text not null references courses(id) on delete cascade,
  title text not null,
  unit_code text,
  lesson_order integer,
  duration_minutes integer,
  xp_reward integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists student_progress (
  user_id uuid not null references profiles(id) on delete cascade,
  lesson_id text not null references lessons(id) on delete cascade,
  status text not null default 'started' check (status in ('started','in_progress','completed')),
  progress_percent numeric(5,2) not null default 0 check (progress_percent >= 0 and progress_percent <= 100),
  xp_earned integer not null default 0 check (xp_earned >= 0),
  best_score numeric(5,2),
  attempts integer not null default 0,
  last_section text,
  last_activity_id text,
  started_at timestamptz,
  completed_at timestamptz,
  last_opened_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create table if not exists activity_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete set null,
  lesson_id text references lessons(id) on delete set null,
  activity_id text not null,
  activity_type text not null,
  score numeric(5,2),
  xp_earned integer not null default 0,
  completed boolean not null default false,
  duration_seconds integer,
  created_at timestamptz not null default now()
);

create table if not exists assessment_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  assessment_id text not null,
  lesson_id text references lessons(id) on delete set null,
  score numeric(5,2) not null,
  passed boolean not null default false,
  duration_seconds integer,
  attempt_number integer not null default 1,
  created_at timestamptz not null default now()
);

create table if not exists visitor_sessions (
  id uuid primary key default gen_random_uuid(),
  anonymous_id text not null,
  started_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  device_type text,
  browser_family text,
  os_family text,
  language text,
  referrer_domain text,
  landing_path text
);

create table if not exists analytics_events (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references visitor_sessions(id) on delete set null,
  user_id uuid references profiles(id) on delete set null,
  event_type text not null,
  path text,
  page_title text,
  course_id text,
  lesson_id text,
  activity_id text,
  duration_seconds integer,
  event_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_progress_user on student_progress(user_id);
create index if not exists idx_progress_lesson on student_progress(lesson_id);
create index if not exists idx_events_created_at on analytics_events(created_at);
create index if not exists idx_events_type on analytics_events(event_type);
create index if not exists idx_events_user on analytics_events(user_id);
create index if not exists idx_events_lesson on analytics_events(lesson_id);
create index if not exists idx_sessions_last_seen on visitor_sessions(last_seen_at);

create or replace view admin_student_summary as
select
  p.id,
  p.full_name,
  p.role,
  p.level_code,
  p.xp,
  p.current_course_id,
  p.current_lesson_id,
  p.current_section,
  p.last_active_at,
  count(sp.lesson_id) filter (where sp.status = 'completed') as completed_lessons,
  count(sp.lesson_id) as started_lessons,
  coalesce(avg(sp.progress_percent),0) as average_lesson_progress,
  coalesce(max(sp.best_score),0) as best_score
from profiles p
left join student_progress sp on sp.user_id = p.id
where p.role = 'student'
group by p.id;

create or replace view admin_daily_analytics as
select
  date_trunc('day', created_at)::date as day,
  count(*) filter (where event_type = 'page_view') as page_views,
  count(distinct session_id) as sessions,
  count(distinct user_id) filter (where user_id is not null) as active_students,
  count(*) filter (where event_type = 'lesson_start') as lesson_starts,
  count(*) filter (where event_type = 'lesson_complete') as lesson_completions,
  count(*) filter (where event_type = 'activity_complete') as activities_completed,
  count(*) filter (where event_type = 'assessment_complete') as assessments_completed
from analytics_events
group by date_trunc('day', created_at)::date;
