# HM Academy — Production Database & Admin Guide

## Current state

The public GitHub Pages preview currently stores analytics and learning state locally on the student's device. `scripts/hm-analytics.js` can send events to an API endpoint, but the production database connection is not active yet.

The repository now contains a PostgreSQL/Supabase-compatible schema at `backend/database/schema.sql` for:

- student profiles, roles and current learning position
- student settings
- courses and lessons
- lesson progress, completion, score, attempts and XP
- game/activity attempts
- official assessment attempts
- anonymous visitor sessions
- analytics events
- admin student and daily analytics views

## Recommended production architecture

`GitHub Pages frontend → secure API → PostgreSQL database (Supabase recommended)`

The browser must never receive the database service-role key. The frontend sends authenticated requests to the API; the API validates the user and writes to PostgreSQL.

## What the admin will be able to see

### Visitors
- page views
- unique sessions
- landing pages
- most visited pages
- device/browser/OS distribution
- referral domains
- daily/weekly/monthly traffic trends

### Students
- registration date
- name and account identity from the authentication provider
- selected level
- current course/unit/lesson/section
- last active time
- XP
- completed lessons
- average lesson progress
- assessment scores and pass rate
- activity/game completion
- learning streak
- certificates when enabled

### Student timeline

The admin student profile should show the exact last learning position, for example:

`الصف الثاني الإعدادي → الوحدة الأولى → Leçon 1 → المرجع التعليمي → النشاط 3`

This is separate from official assessment results. Games are practice/reinforcement; official assessments remain the authoritative measurement of level.

## Database access

The owner/admin should access the production database through the database provider dashboard (recommended: Supabase) and through the HM Academy Admin Center. Direct SQL access is for maintenance/reporting, not normal daily student management.

The Admin Center should become the normal control surface for:

- students
- analytics
- learning progress
- assessments
- activity logs
- notifications
- platform settings

## Security rules

- Never store raw passwords in HM Academy tables.
- Keep authentication in the provider's auth system.
- Never expose the database service-role key in GitHub Pages or browser JavaScript.
- Use row-level access controls so students can read/write only their own learning records.
- Admin/teacher access must be role-based.
- Keep anonymous analytics separate from personally identifiable student data where possible.
- Do not make exact IP addresses a permanent student profile field.

## Activation sequence

1. Create the production PostgreSQL database in Supabase.
2. Run `backend/database/schema.sql`.
3. Configure the API with `DATABASE_URL`/provider credentials as server-side secrets.
4. Connect the API to the GitHub Pages frontend.
5. Replace local-only progress writes with authenticated API writes while keeping local cache as an offline-friendly fallback.
6. Send visitor and learning events from `hm-analytics.js` to the API.
7. Connect `admin-dashboard.html`, `admin-students.html` and `admin-analytics.html` to protected admin endpoints.
8. Test registration → lesson start → activity completion → lesson completion → assessment → dashboard reporting end to end.

## Important distinction

The current local dashboard numbers are not a real global visitor database. A GitHub Pages browser cannot aggregate all visitors by itself. The production database/API is the required next step for true platform-wide statistics.
