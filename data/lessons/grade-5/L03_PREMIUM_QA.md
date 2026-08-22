# Grade 5 — Lesson 3 Premium QA

## Scope
`g5-t1-l03` — **Le pluriel / صيغة الجمع**

## Academic acceptance criteria

### Grammar
- [x] General plural rule: singular → plural with `-s`.
- [x] Article changes are demonstrated (`un` → `des`).
- [x] `-eau` / `-au` → `-x` is explicitly taught and demonstrated: `un tableau → des tableaux`.
- [x] Words ending in `-s`, `-x`, `-z` are explicitly identified as normally unchanged in spelling: `un pays → des pays`.
- [x] `-al` → `-aux` is explicitly taught with the lesson example: `un animal → des animaux`.
- [x] Examples include French + Arabic meaning.
- [ ] Academic review must still confirm that the final teacher-facing explanation matches the intended school curriculum wording.

### Vocabulary
- [x] `un livre` — كتاب.
- [x] `un tableau` — سبورة.
- [x] `un pays` — بلد.
- [x] `un animal` — حيوان.
- [x] Lesson 3 vocabulary illustrations are bound through the dedicated Grade 5 vocabulary-image runtime.
- [x] Cache-busted vocabulary runtime is pinned to the current image build.

### Practice
- [ ] At least 4 lesson-specific questions should be available in the final assessment pool.
- [ ] Questions must cover the general rule plus at least two special cases.
- [ ] No question may be sourced from `g5-t1-l01`.

### Games
- [x] Games are owned by Premium Engine v7.
- [x] Game data is lesson-scoped.
- [x] Legacy Grade 5 game hub/pages/bank/common runtime are forbidden.

### Assessment
- [x] Assessment is independent from the legacy game runtime.
- [x] Assessment must remain scoped to `g5-t1-l03`.
- [x] A missing lesson-specific question pool must fail closed rather than fall back to Lesson 1.

## Regression checks

1. Open Lesson 3 directly with its lesson id.
2. Verify all four vocabulary cards display their intended illustrations.
3. Verify grammar examples are Lesson 3 examples only.
4. Enter Practice and verify questions are about plural formation.
5. Enter Games and verify generated activities use Lesson 3 vocabulary/grammar only.
6. Enter Assessment and verify no Lesson 1 question appears.
7. Navigate back to Lesson 1 and verify Lesson 3 state did not overwrite Lesson 1 state.
8. Repeat after hard refresh/cache-bypass.

## Release rule

Lesson 3 is **not** considered academically complete until the unchecked academic-review items above are manually verified. Structural/runtime QA passing alone is insufficient for release.
