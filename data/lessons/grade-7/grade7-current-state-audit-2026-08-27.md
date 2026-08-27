# Grade 7 (الصف الأول الإعدادي) — Current State Audit

Date: 2026-08-27
Repository: `hm-french-academy/hm-french-academy`
Branch: `main`

## Executive result

The Grade 7 Learning Studio exists and is routed from `lesson.html`. The repository also contains a curriculum registry, source-truth index, source-content registry, per-lesson data, and a dedicated Lesson 1 gold-standard specification.

The implementation is **not final**. The main remaining blocker is authoritative source-content retrieval/integration for the lessons whose original interactive/reference/assessment files are not present as retrievable repository files. Runtime content must not be treated as equivalent to verified source extraction merely because a lesson card or hard-coded lesson object exists.

## Verified now

### Architecture

- `grade7-lesson-studio.html` exists as the independent Grade 7 Learning Studio.
- The Studio defines the 11-stage journey: introduction, vocabulary, pronunciation, grammar, conversation, practice, video, games, smart-review, assessment, progress.
- `lesson.html` routes Grade 7 lesson IDs (`grade7-u1-l*`, `grade7-u2-l*`, `grade7-u3-l*`) to the current Grade 7 Studio.
- The routing fixes were committed on 2026-08-27, ending at commit `2409e63792ae2cbe96dd1e398d15bd816802f9ae`.

### Curriculum structure

The authoritative Grade 7 registry defines 11 source lessons across 3 units:

- Unit 1: lessons 1–6
- Unit 2: lessons 7–8
- Unit 3: lessons 9–11

The source-truth index records the original source titles and section counts for all 11 lessons.

### Lesson 1

Lesson 1 has the strongest verified content state:

- `lesson-1.json` contains the alphabet, vowels, both transparent-word groups, embedded practice, journey configuration, and formal assessment structure.
- `lesson-1-gold-standard.json` explicitly requires preservation of all verified source items and distinguishes enrichment from source truth.
- The gold-standard specification forbids invented standalone grammar/conversation where the source does not contain those sections.

## Important discrepancy found

`grade7-lesson-studio.html` currently contains hard-coded lesson data for lessons 1–11, including substantial vocabulary/grammar/quiz material for lessons 7–11. However, the QA/source-truth records state that the original source assets for lesson 7 and later are not all retrievable as repository files.

Therefore:

- Hard-coded runtime content is **not automatically source-verified content**.
- Lessons 7–11 must not be declared final solely because the Studio displays them.
- No unsupported activity should be attributed to the official source.
- The authoritative source package remains the content truth.

## Status matrix

| Lesson | In registry | Studio runtime entry | Dedicated structured data | Source-verification state | Final? |
|---|---|---|---|---|---|
| 1 | Yes | Yes | Yes + gold standard | Audited / source-mapped | No — final QA still required |
| 2 | Yes | Yes | Registry-level | Source mapped; full extraction not yet proven here | No |
| 3 | Yes | Yes | Registry-level | Source mapped; full extraction not yet proven here | No |
| 4 | Yes | Yes | Registry-level | Source mapped; full extraction not yet proven here | No |
| 5 | Yes | Yes | Registry-level | Source mapped; full extraction not yet proven here | No |
| 6 | Yes | Yes | Registry-level | Source mapped; runtime representation verified | No |
| 7 | Yes | Yes | Registry/runtime data exists | Original source files not retrievable in repo QA record | No |
| 8 | Yes | Yes | Registry/runtime data exists | Original source files not retrievable in repo QA record | No |
| 9 | Yes | Yes | Registry/runtime data exists | Original source files not retrievable in repo QA record | No |
| 10 | Yes | Yes | Registry/runtime data exists | Original source files not retrievable in repo QA record | No |
| 11 | Yes | Yes | Registry/runtime data exists | Original source files not retrievable in repo QA record | No |

## Next execution gate

1. Do not rebuild the Grade 7 Studio.
2. Keep Grade 8 strictly as UI/interaction reference only.
3. Use the authoritative curriculum package as the source of truth.
4. Complete Lesson 1 final QA first: compare every source item/activity/assessment against the structured lesson data and runtime.
5. Then process lessons 2–6 source-first, preserving every source section and activity.
6. For lessons 7–11, retrieve the missing authoritative source assets before expanding or validating runtime content. Do not guess missing activities.
7. After source verification, wire each verified lesson to the same 11-stage journey and run mobile/runtime QA.

## Acceptance rule

A lesson is final only when its source is retrievable, every source section is mapped, source activities are preserved, enrichment is clearly additive, the correct lesson ID is wired, the assessment is genuinely integrated, and unsupported IDs cannot silently present another lesson's content.
