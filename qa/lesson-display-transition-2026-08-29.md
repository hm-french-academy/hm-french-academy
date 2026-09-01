# HM Academy — Lesson Display Transition QA

Date: 2026-08-29

## Baseline
- Preserve the current `grade7-lesson-studio.html` implementation on `main` as the baseline.
- Preserve all existing lesson data, lesson IDs, stage IDs, source-aligned content, pronunciation behavior, quiz behavior, and localStorage progress.

## Transition rule
The requested visual redesign must be implemented as a presentation-layer change only. It must not replace or rewrite lesson source data.

## Required acceptance checks
1. Lesson selection remains stable for lessons 1–11.
2. All 11 stage IDs remain available and resolve against the selected lesson.
3. Existing source-aligned lesson content remains unchanged.
4. Pronunciation continues to use French speech (`fr-FR`).
5. Quiz interaction and feedback remain functional.
6. Progress remains persisted per lesson/stage after refresh.
7. Responsive/mobile layout has no clipped controls or unusable horizontal content.
8. Smart Review remains an independent stage in the lesson experience as previously specified.

## Safety gate
Do not delete or overwrite the baseline Studio while iterating on the new presentation. Do not claim production certification until the manual browser gate is completed.
