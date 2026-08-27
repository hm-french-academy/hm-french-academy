# Grade 7 — Continuous Source QA Cycle

Date: 2026-08-27

## Current execution gate

The Learning Studio is a shared runtime. Content must be sourced from the authoritative curriculum package; Grade 8 is visual/interaction reference only.

## Verified

- Unit 1 lessons 1–6 are represented in `grade7-content.json`.
- Lesson 6 (`L'heure`) is represented in the current Grade 7 runtime.
- Lesson 1 was audited against extracted source content and its vocabulary/source assessment structure was expanded.
- Lesson 1 does not receive invented standalone grammar/conversation when the source does not contain those sections.
- Lessons 2–5 have structured source-mapped lesson records containing their source sections/atoms/activities and explicit enrichment boundaries; they remain pending item-by-item source-file reconciliation before final release.

## Lesson 6 source map

- Quelle heure est-il ?
- Les moments spéciaux
- Associe l'heure à la bonne horloge
- Vérifie-toi !
- Vidéo complémentaire

Authoritative assets declared by the curriculum:
- `Leçon_6/lesson6_interactive.html`
- `Leçon_6/lesson6_reference.pdf`
- `Leçon_6/lesson6_assessment.pdf`
- `Leçon_6/lesson6_quiz_secure.html`

The structured lesson-6 record is currently missing from `data/lessons/grade-7/unit-1/`. It must be created only from the authoritative source assets; no lesson-6 content is to be inferred from the runtime card alone.

## Next gate — Unit 2 / source lesson 7

The curriculum registry identifies source lesson 7 as `grade7-u1-l7` in the current source-truth index, titled `Le verbe avoir - Tu as quel âge`, with these source sections:

- Le verbe avoir
- Quel âge as-tu ?
- Compte les bougies !
- Complète avec avoir
- Vérifie-toi !
- Vidéo complémentaire

Declared source assets:
- `Leçon_7/lesson7_interactive.html`
- `Leçon_7/lesson7_reference.pdf`
- `Leçon_7/lesson7_assessment.pdf`
- `Leçon_7/lesson7_quiz_secure.html`

The repository currently exposes the lesson-7 asset paths through the curriculum manifest, but the actual lesson-7 interactive/source content is not present as a retrievable repository file. Therefore lesson 7 must not be populated by copying lesson 1–6 content or by guessing missing source activities.

## Quality rule

Do not mark a lesson as final until:

1. Source content is retrievable.
2. Every source section is mapped.
3. Source activities are preserved.
4. Enrichment is clearly additive and pedagogically relevant.
5. The 11-stage journey is wired to the correct lesson id.
6. Assessment is not represented as complete unless the source assessment has been integrated.
7. Unsupported lesson ids cannot silently display another lesson's content.
