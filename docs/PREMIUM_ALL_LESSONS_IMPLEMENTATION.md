# HM Academy — Premium All-Lessons Implementation

Date: 2026-08-12

## Scope
The Grade 8 first-semester lesson registry contains 3 included units × 4 lessons = 12 lessons. Unit 4 remains excluded by curriculum contract.

## Applied behavior
All 12 lessons now share the universal Premium Lesson Studio runtime and use the lesson-specific content in `data/lessons/grade-8/premium-course-map.json` rather than showing Lesson 1 content by default.

Each lesson presents:
- one clear mission with estimated time and XP
- image-first vocabulary interaction
- individual word listening and individual example-sentence listening
- one stable two-character dialogue scene
- individual dialogue-line listening and full-dialogue playback
- the complete grammar rule before application
- sentence-building interaction using the lesson's practice data
- practice/reinforcement games separate from formal assessment
- a visual Word Catch activity where the learner sees the image first and chooses the French word
- a lesson-specific classification label set
- a premium resource board with purpose, time, XP and a clear action for each available file
- explicit lesson completion that persists through `HMProgress`

## Progress behavior
Lesson entry records a visit through `HMProgress.startLesson`. Vocabulary, dialogue, sentence-building, games and resource interactions record activity completion. The final lesson action records the lesson as completed and awards the lesson XP once.

The dashboard already reads `completedLessons`, `visitedLessons`, `completedActivities`, XP and the current lesson from `HMProgress`; the new runtime now writes to that same source consistently.

## Production analytics note
The GitHub Pages preview remains a client-side/static environment. Local progress and local analytics work on the device. The production PostgreSQL/Supabase schema and admin architecture are prepared, but the live database/API connection is still a deployment step and is not claimed as active.
