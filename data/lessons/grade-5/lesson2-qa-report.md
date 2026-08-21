# Lesson 2 Premium QA — corrective pass

- Vocabulary: dedicated lesson-2 SVG assets exist; runtime audio patch provides French speech for explicit pronunciation controls.
- Audio: `fr-FR`, cancellation before replay, learner rate 0.88; controls are lesson-scoped.
- Games: each game resets index/score/lock state; answer buttons lock after selection; next button is gated by an answered state; score is isolated per game.
- Assessment: remains lesson-scoped to `g5-t1-l02`.
- Follow-up required: wire the lesson studio vocabulary renderer to the dedicated media paths and the visible pronunciation controls if the current renderer still points to legacy assets.
