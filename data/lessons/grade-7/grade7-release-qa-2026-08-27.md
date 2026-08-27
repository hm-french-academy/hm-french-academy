# Grade 7 Release QA — 2026-08-27

## Scope
Authoritative curriculum: `Curriculum_Complet_Hatem_ElMorsi_avec_videos.zip`.
Grade 8 is UI/interaction reference only.

## Canonical lesson map

| # | Canonical ID | Title | Source extraction |
|---|---|---|---|
| 1 | `grade7-u1-l1` | L'alphabet et les mots transparents | verified / Gold Standard |
| 2 | `grade7-u1-l2` | Les salutations | source-mapped |
| 3 | `grade7-u1-l3` | Les pronoms sujets et les verbes en -er | source-mapped |
| 4 | `grade7-u1-l4` | Le verbe être et la présentation | source-mapped |
| 5 | `grade7-u1-l5` | Les nombres (0-20) | source-mapped / Gold Standard work present |
| 6 | `grade7-u1-l6` | L'heure | verified source integration recorded |
| 7 | `grade7-u2-l1` | Tu as quel âge ? | verified-from-original-interactive-html |
| 8 | `grade7-u2-l2` | Qu'est-ce que c'est ? Les objets de la classe | verified-from-original-interactive-html |
| 9 | `grade7-u3-l1` | Les couleurs | verified-from-original-interactive-html |
| 10 | `grade7-u3-l2` | Les articles définis et les jours de la semaine | verified-from-original-interactive-html |
| 11 | `grade7-u3-l3` | Les mois de l'année et les saisons | verified-from-original-interactive-html |

## Source verification completed for lessons 7–11

The repository contains `data/lessons/grade-7/unit-1/lessons-7-11-source-extracted.json`, explicitly marked `verified-from-original-interactive-html`.

Verified source atoms include:

- Lesson 7: `avoir` conjugation, age example, numbers 0–20, six fill-in examples, six quiz items.
- Lesson 8: indefinite articles, 16 classroom objects, backpack vocabulary, six quiz items.
- Lesson 9: 11 colors, invariant `orange`/`marron`, adjective agreement patterns, six quiz items.
- Lesson 10: definite articles, French/Egyptian weekday ordering, six quiz items.
- Lesson 11: 12 months, four seasons with month ranges and weather expressions, four source matching pairs, six quiz items.

## Runtime requirement

The single Grade 7 Learning Studio must use these canonical IDs and must not silently map a lesson to another lesson. Enrichment may add explanation, practice, accessibility, audio controls, and adaptive review, but must not be presented as original source content.

## Release status

The 11-lesson source map is complete and source extraction for 7–11 is now available. Final release still requires runtime QA of every journey stage and confirmation that the live router points to the current Studio for all 11 canonical IDs.

## No-guess rule

Where an exact source asset (interactive/reference/assessment/quiz) is not directly embedded in the repository, use the verified extracted source atoms and source manifest; do not invent missing source text, activities, answers, or media URLs.
