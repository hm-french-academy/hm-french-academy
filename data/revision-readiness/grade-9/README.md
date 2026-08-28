# HM Academy — Grade 9 French Revision & Readiness

## Purpose
Pre-course revision pack for Grade 9 (2e année préparatoire), reviewing the **full Grade 8 learning year** before the current-year course begins.

## Source truth and annual scope
The currently registered Grade 8 package is authoritative for the lessons already imported into HM Academy, but it is explicitly treated as **partial/term-scoped evidence** where its inventory does not cover the full annual course. The annual revision layer therefore combines the registered source with independently researched second-semester evidence before admitting a prerequisite into the annual scope.

The annual target is the complete Grade 8 year, not a first-semester-only review. Second-semester prerequisite domains are mandatory and must be represented in diagnosis, remediation, checkpoint and final assessment.

## Pack architecture
1. Annual source map and evidence log
2. Prerequisite skill matrix
3. Diagnostic assessment
4. Unit/skill prerequisite review
5. Grammar consolidation
6. Vocabulary active-recall bank
7. Communication and short writing
8. Targeted remediation routing
9. Skill checkpoints
10. Final readiness assessment
11. Teacher answer key, rubric and readiness decision
12. A4 student + teacher print packs

## Quality rules
- Do not treat a partial platform import as the full annual curriculum.
- Second-semester content must be verified against external curriculum evidence before inclusion.
- Exercises are original practice, not reproduction of textbook pages.
- Separate student-facing material from answer key.
- Keep this layer isolated from live lesson runtime.
- Every critical prerequisite needs diagnostic evidence, remediation, checkpoint and final evidence.
- Open responses require a rubric; equivalent correct wording is accepted when the target structure remains accurate.

## Current source inventory
- Grade 8 curriculum: `data/curriculum/grade-8.json`
- Grade 8 lesson registry: `data/lessons/grade-8/lesson-registry.json`
- Grade 8 annual evidence/map: `annual-source-map.json`
- Annual readiness matrix: `annual-readiness-matrix.json`
- Production question bank: `production-question-bank-v1.md`
- Remediation routing: `remediation-routing-v1.json`
- Remediation content: `remediation-content-v1.md`
- Print specification: `print-pack-spec-v1.md`
- Teacher rubric: `teacher-rubric-v1.md`

## Release target
A4 printable student pack + teacher key, followed by browser QA and platform integration only after content validation.
