# Grade 7 Lesson Studio — QA Gate

## Scope
Current `grade7-lesson-studio.html`, lessons 1–11, 11-stage journey, and verified source extraction for lessons 7–11.

## Automated/static checks completed
- [x] Studio file exists on `main`.
- [x] `dir="rtl"` and responsive viewport are present.
- [x] Eleven stage IDs are declared: introduction, vocabulary, pronunciation, grammar, conversation, practice, video, games, smart-review, assessment, progress.
- [x] Lesson registry contains lesson IDs 1–11.
- [x] Lessons 7–11 source extraction exists and is marked `verified-from-original-interactive-html`.
- [x] Source extraction records the original lesson sections and six-question quiz count for lessons 7–11.
- [x] Progress is persisted with `localStorage` per lesson/stage.
- [x] French speech uses `fr-FR` in the browser speech synthesis path.
- [x] Assessment rendering uses source quiz data where available.
- [x] Video UI does not invent a URL when a published video path is unavailable.

## Source coverage
- Lesson 7: avoir, age example, numbers 0–20, six fill sentences, six-question quiz.
- Lesson 8: indefinite articles, classroom objects, backpack objects, six-question quiz.
- Lesson 9: colors, invariant orange/marron, agreement forms, six-question quiz.
- Lesson 10: definite articles, France/Egypt weekday ordering, six-question quiz.
- Lesson 11: months, four seasons, weather, month-season matching, six-question quiz, congratulations section.

## Manual browser gate still required
GitHub API access cannot execute the page in a real browser. Before marking the stage as production-certified, open the deployed page and verify:
1. Each lesson 1–11 opens without console errors.
2. Every stage tab opens and remains on the selected lesson.
3. Pronunciation buttons speak French.
4. Quiz answers visibly change state and feedback appears.
5. Lesson progress survives refresh.
6. Mobile layout has no clipped controls or unusable horizontal content.
7. Original video assets, if present in deployment, resolve to the correct lesson.

## Release rule
Do not label the phase "production-certified" until the manual browser gate is completed. The source-data and static/runtime wiring checks above are complete; browser execution is intentionally not claimed here because no browser runner is available through the repository connector.