# Grade 6 Premium Lesson Studio QA Gate

Canonical routes: g6-l01 through g6-l08.

Required journey per lesson: lesson, vocabulary, grammar, practice, pronunciation, media, games, assessment, progress.

Integrity requirements:
- Preserve all original Grade 6 source assets.
- Activities, games and assessments are scoped by lesson ID.
- No fallback may load another lesson's questions.
- Vocabulary has functional text/speech fallback.
- Runtime uses versioned cache-busting/no-cache behavior.
- Each canonical route must load independently.

Release gate: content-integrity, route-integrity, lesson-scoped-activities, browser-smoke-test.
