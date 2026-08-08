# HM Academy Backend API Structure

## Authentication
- POST /auth/login
- POST /auth/logout
- POST /auth/register
- GET /auth/session

## Users
- GET /users
- GET /users/:id
- PUT /users/:id

## Courses
- GET /courses
- POST /courses
- PUT /courses/:id

## Lessons
- GET /lessons/:courseId
- POST /lessons

## Assessments
- GET /assessments
- POST /assessments
- POST /assessments/:id/submit

## Progress
- GET /progress/:studentId
- PUT /progress/:id

## Next phase
Implement backend framework and database connection.
