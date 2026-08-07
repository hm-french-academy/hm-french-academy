# HM Academy Platform Roadmap

## Current state
The platform has progressed beyond the original v0.3 landing/dashboard stage into a more scalable multi-page learning platform.

### Implemented pages
- `index.html` — platform homepage
- `dashboard.html` — student dashboard
- `profile.html` — student profile
- `course.html` — course roadmap
- `lesson.html` — lesson experience
- `lesson2.html` — lesson 2
- `lesson3.html` — lesson 3
- `exam.html` — unit assessment
- `achievements.html` — achievements view
- `certificate.html` — certificate view
- `login.html` — student sign-in
- `preview.html` — product preview / showcase
- `levels.html` — level selection
- `student.html` — student area
- `instructor.html` — instructor dashboard scaffold

### Shared assets
- `css/style.css`
- `scripts/app.js`

## Next platform milestones

### 1. Central platform structure
- Add a consistent layout pattern across all pages.
- Introduce shared header navigation for student and instructor contexts.
- Add a reusable sidebar for future dashboard pages.
- Standardize cards, forms, badges, and progress indicators.

### 2. Instructor operations
- Manage levels, units, and lessons.
- Create and edit assessments.
- Track student completion.
- Issue certificates.
- Publish announcements.

### 3. Data-driven course content
- Move course information into a central JSON structure.
- Load lessons and units from data instead of hardcoding content into pages.
- Prepare for multiple languages and multiple tracks.

### 4. Student experience
- Continue lesson progression from the last visited lesson.
- Show weekly goals.
- Show activity history.
- Show certificates and badges.
- Improve progress tracking.

### 5. Platform expansion
- Add authentication and roles.
- Prepare database integration.
- Add API endpoints when the backend is introduced.
- Support PWA installation and mobile-friendly behavior.
- Add AI tutor support inside lessons.

## Notes
This document is the current reference for the platform direction and can be updated as the build moves forward.
