# HM Academy Database Schema Plan

## Core Tables

- users
  - id
  - name
  - email
  - password_hash
  - role

- courses
  - id
  - title
  - teacher_id

- lessons
  - id
  - course_id
  - title
  - content

- assessments
  - id
  - course_id
  - title
  - score_rules

- progress
  - id
  - student_id
  - lesson_id
  - completion_status

## Next step
Implement backend models and API structure.
