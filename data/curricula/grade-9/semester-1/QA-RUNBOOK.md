# Grade 9 — Final QA Runbook

## Automated gate

Run from the repository root:

```bash
node scripts/grade9-qa.mjs
```

The harness verifies all 12 lesson JSON files, lesson IDs, required Journey content arrays, registry coverage, and the canonical 11-stage Journey.

## Browser gate

Open `grade-9-lesson-studio.html` and verify each lesson ID from `g9-u1-l1` through `g9-u3-l4`:

1. Correct lesson title and unit load.
2. Start → Vocabulary → Pronunciation → Grammar → Conversation → Practice → Video → Games → Smart Review → Evaluation → Progress navigation works.
3. No lesson falls back to another lesson's content.
4. Empty/unavailable media is represented safely rather than as broken UI.
5. Mobile width and desktop width preserve readable Arabic/French text and usable controls.
6. Refreshing the page does not corrupt the selected lesson state.

## Release rule

Do not mark Grade 9 semester-1 as final until both the automated gate and browser gate pass.
