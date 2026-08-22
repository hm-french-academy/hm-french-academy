# Grade 5 — Lesson 2 Premium QA

Lesson: `g5-t1-l02` — Les déterminants

## Release gates
- Vocabulary and grammar data are read from the current lesson id only.
- Every vocabulary card exposes word + meaning; examples and pronunciation are added only from the lesson data.
- Game Center is rendered by Premium Engine v7 inside `grade-5-lesson-v3.html`; there is no static L01 game hub, game bank, or legacy game runtime.
- Game state is local to the currently opened lesson/game and never imports L01 questions.
- Assessment is routed to the shared lesson-scoped interactive assessment with `?lesson=g5-t1-l02`.
- Interactive assessment builds its questions from the current lesson's practice, vocabulary, and grammar data and requires at least three valid questions before rendering.
- The official assessment is a separate route and is not mixed with the interactive assessment.
- Refreshing or changing the lesson id must not switch the game or assessment source to another lesson.

## Forbidden legacy dependencies
- `grade5-games.html`
- `grade5-game-bank.js`
- `grade5-game-common.js`
- `grade5-game-*.html`
- Premium Engine v6 / stage runtime / route lock / games entry overrides
