# HM Academy — Phonetics Runtime Validation

## Scope
U01–U12 lesson routing, structured rendering, browser speech, progress completion, and quick-check support.

## Runtime contract
- Lesson data is loaded through `HMPhonetics.loadLessons()`.
- Lesson rendering is delegated to `HMPhonetics.render()`.
- French speech uses `fr-FR` through `HMSpeech.speak()` when available and `SpeechSynthesisUtterance` as the browser fallback.
- IPA targets use French example words when a symbol itself cannot be spoken meaningfully.
- Audio does not depend on per-word audio files, so dynamic examples remain speakable.
- Missing lesson detail falls back to the indexed course lesson instead of producing a blank lesson.

## Acceptance gate
- U01–U12 are routed through the phonetics lesson page.
- Structured lesson fields are rendered when present: objectives, targets, examples, content blocks, pairs, practice, assessment, rubric, lesson flow, check questions, test plan, and review notes.
- Each rendered example/target receives an audio control.
- Quick-check questions calculate a percentage and can complete progress.
- Lesson completion remains connected to `HMPhoneticsProgress`.
- Content remains marked for academic review before publication.

## Manual browser check
Open representative lessons from U01, U02, U03, U05, U09 and U12 and click:
1. Main French model.
2. At least two example audio controls.
3. One target/pair control where present.
4. Quick-check answers where present.
5. Complete lesson.

This document is a validation gate; it does not replace the user's final academic review.