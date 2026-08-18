# HM Academy — Phonetics Course QA

## Scope

Static/runtime integration review of the phonetics course U01–U12 after the content expansion.

## Verified repository structure

- `phonetics.html` — course index.
- `phonetics-lesson.html` — lesson route.
- `phonetics-preview.html` — preview surface.
- `scripts/phonetics-course-runtime.js` — lesson renderer and speech runtime.
- `scripts/phonetics-progress.js` — progress binding.
- `scripts/phonetics-quiz.js` — quiz support.
- U01 content file.
- U02–U04 content file.
- U05–U08 content file.
- U09–U12 content file.
- `data/specialized/phonetics-course.json` — course index.

## Audio architecture

The phonetics runtime uses browser speech synthesis with `fr-FR` and falls back to the shared `HMSpeech` runtime when available. No dedicated audio file is required for each changing example. The renderer provides audio controls for targets, examples, and discrimination pairs.

## Lesson rendering

The renderer supports:

- bilingual/multilingual lesson titles;
- objectives;
- phonetic targets;
- examples;
- IPA display when supplied;
- discrimination pairs;
- practice instructions;
- assessment blocks;
- rubric/review notes;
- progress completion;
- academic-review status.

## Important QA note

A browser-level audible test cannot be certified from repository inspection alone because actual speech playback depends on the user's browser/device speech engine and permissions. The implementation is therefore marked **Ready for user browser smoke test**, not falsely marked as hardware-audio certified.

## Academic status

**Draft — Academic Review Required.**

Content should not be published as final until the instructor reviews the examples, phonetic explanations, level placement, and any dialect/context-sensitive statements.

## Next acceptance test

Open the course and test at least:

1. U01 first lesson.
2. U02-L01.
3. U03-L01.
4. U05-L01.
5. U09-L01.
6. U12-L04.

For each, confirm page load, example rendering, target rendering, speech button response, and progress/quiz behavior where present.
