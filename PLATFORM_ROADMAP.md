# HM Academy Platform Roadmap

## Current state
The platform has progressed beyond the original v0.3 landing/dashboard stage into a scalable multi-page learning platform with separate school curricula and international language tracks.

### Implemented pages
- `index.html` — platform homepage with multilingual rotating daily message and homepage search
- `dashboard.html` — student dashboard
- `profile.html` — student profile
- `course.html` — school curriculum selector
- `grade-7.html` / `grade-8.html` / `grade-9.html` — curriculum grade hubs
- `lesson.html` — lesson experience
- `lesson2.html` / `lesson3.html` — legacy lesson views
- `exam.html` — unit assessment
- `achievements.html` — achievements view
- `certificate.html` — certificate view
- `login.html` — student sign-in
- `preview.html` — product preview / showcase
- `levels.html` — independent language-level selection
- `student.html` — student area
- `instructor.html` — instructor dashboard scaffold
- `search.html` — platform-wide navigation search

### Shared assets
- `css/style.css`
- `css/premium-shell.css`
- `scripts/app.js`
- lesson/media/activity runtime scripts

## Latest completed fixes
- Added and expanded homepage search across curriculum, stages, units, lessons, assessments and activities.
- Kept curriculum names stable (`Français simple 1/2/3`, `Le français pour vous`) while allowing stage/grade labels to translate.
- Preserved school curricula separately from independent language levels.
- Separated lesson games from the formal assessment.
- `Quiz Express` now randomizes both question order and answer-choice order using a real Fisher–Yates shuffle.
- `Word Catch` was rebuilt for reliable mobile/touch interaction, with non-overlapping targets and randomized choices.
- `Drag & Drop` now supports both desktop drag-and-drop and mobile tap-to-select/tap-to-place interaction, and its word order is randomized.
- Synchronized the lesson activity registry with the active game center.

## Current curriculum/content boundary
- Grade 8 / Français simple 2 / Semester 1 / Unit 1 / Leçon 1 is the current content pilot and contains the full interactive/reference/assessment/games set.
- `data/lessons/grade-8/unit-1/lesson-2.json` exists as a technical lesson record, but the actual Lesson 2 content files are not yet present in the repository.
- Units 2 and 3 are mapped at curriculum level but do not yet contain full lesson manifests/content files.
- Therefore the next content step is to populate the remaining lessons from the approved source curriculum rather than inventing lesson content.

## Next milestones
### 1. Lesson production
- Complete Leçon 2, then the remaining lessons in the active semester.
- Apply the same HM Academy lesson package: interactive explanation, reference, formal assessment, interactive assessment, and independent games.
- Keep game questions distinct from formal assessment questions.

### 2. Curriculum expansion
- Complete the remaining units of Français simple 2.
- Then replicate the validated structure for Français simple 1 and 3 and the available `Le français pour vous` primary stages.

### 3. Student experience
- Continue lesson progression from the last visited lesson.
- Show weekly goals, activity history, certificates and badges.
- Improve progress tracking.

### 4. Instructor operations
- Manage levels, units, lessons and assessments.
- Track student completion and publish announcements.

### 5. Platform expansion
- Add authentication and roles.
- Prepare database/API integration.
- Support PWA installation and mobile-first behavior.
- Add AI tutor support inside lessons.
