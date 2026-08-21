# Grade 6 Premium Lesson Studio QA Gate

Canonical routes: g6-l01 through g6-l08.

Required journey per lesson:
1. lesson
2. vocabulary
3. grammar
4. practice
5. pronunciation
6. media
7. games
8. assessment
9. progress

Integrity requirements:
- Preserve all original Grade 6 source assets.
- Activities, games and assessments must be scoped by lesson ID.
- No fallback may load another lesson's questions.
- Vocabulary media must have a functional fallback when an asset is missing.
- Runtime must use versioned cache-busting and prevent stale lesson payloads.
- Each canonical route must load independently.

Release gate: content-integrity, route-integrity, lesson-scoped-activities, browser-smoke-test.
