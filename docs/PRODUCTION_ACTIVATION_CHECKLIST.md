# HM Academy — Production Activation Checklist

The production code layer is now committed. GitHub Pages remains safe in local/offline mode until these values are supplied.

## 1. Supabase
Create a Supabase project and copy only the public project URL and `anon` key into `data/production-config.js`:

```js
window.HMProductionConfig = {
  enabled: true,
  supabaseUrl: 'https://YOUR_PROJECT.supabase.co',
  supabaseAnonKey: 'YOUR_PUBLIC_ANON_KEY',
  analyticsFunctionUrl: ''
};
```

Never put the `service_role` key in this file or in GitHub Pages.

## 2. Database
Run, in order, in the Supabase SQL Editor:

1. `backend/database/schema.sql`
2. `backend/database/rls-and-functions.sql`
3. `backend/database/seed-grade8.sql`

The second script enables row-level security, creates the auth profile trigger, the atomic lesson-progress RPC, protected admin RPCs and analytics policies.

## 3. Authentication
Enable Email/Password in Supabase Authentication. Create the first owner account through the platform registration flow or Supabase Auth, then promote that account once to `admin` in the `profiles` table. Do not make `role=admin` a client-editable registration field.

## 4. Frontend behavior after activation
`HMProduction` automatically provides:

- registration/sign-in/sign-out
- persistent authentication sessions
- production lesson progress
- activity attempts
- official assessment attempts
- anonymous visitor sessions
- page/lesson/activity analytics
- protected admin overview
- protected student summary

Local storage remains an offline-friendly cache; production records become the platform-wide source of truth when authenticated and connected.

## 5. Admin access
Open `admin-dashboard.html` after signing in with an account whose `profiles.role` is `admin` or `teacher`. The browser calls protected RPCs; raw admin views are not exposed to browser roles.

## 6. Final end-to-end test
Test this exact sequence with a test student:

Registration → login → dashboard → lesson start → section change → activity completion → lesson completion → official assessment → logout → login again → verify progress → admin login → verify student + analytics.

## Current status
The repository contains the production integration layer and database scripts. The global database itself is not claimed active until a real Supabase project URL/anon key is configured and the SQL scripts are executed.
