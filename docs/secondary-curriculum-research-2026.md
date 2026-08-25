# HM Academy — Secondary 1 & 2 French Curriculum Research Baseline

## Scope
- Secondary 1 (الصف الأول الثانوي): French First Language — Champion 1; French Second Language — Club @dos 1.
- Secondary 2 (الصف الثاني الثانوي): French First Language — Champion 2; French Second Language — Club @dos 2.
- Academic source year currently evidenced online: 2025/2026 materials published by the Ministry and its official content CDN. The next 2026/2027 book release will be re-checked before final content lock.

## Confirmed official Ministry evidence
1. Ministry announcement: all secondary-stage curricula were made available on the Ministry website on 09/09/2025.
2. Ministry e-learning index explicitly lists for Secondary 1: French first-language Champion 1, Champion 1 workbook, and French second-language Club @dos 1.
3. Official 2026 Ministry assessment material explicitly identifies Secondary 1 French second language as Club @dos 1.
4. Official 2026 Ministry assessment material explicitly identifies Secondary 2 French second language as Club @dos 2.
5. Official 2026 Ministry assessment material explicitly identifies Secondary 2 French first language as Champion 2.

## Platform template baseline
The implementation will follow the existing lesson architecture rather than introduce a new UX. Existing grade registries use a curriculumId, units, lesson IDs, interactive lesson route, files route, reference page, formal assessment, interactive quiz, games, premium flag, and media contract.

## Safety / isolation rule
No existing grade page, route, registry, manifest, lesson, or media path is to be modified while introducing Secondary 1/2. Work is isolated on branch `secondary-1-2-curriculum-research` until the complete content and runtime QA are reviewed.

## Content construction pipeline
1. Identify the exact official textbook/unit/lesson sequence.
2. Cross-check each unit against official Ministry assessment material for 2025/2026.
3. Build lesson-level learning objectives, vocabulary, communication functions, grammar, phonetics, culture, examples, activities, and assessments.
4. Adapt the material into HM Academy's existing Learning Studio template without copying third-party answer keys or unofficial lesson text wholesale.
5. Create independent IDs, registries, manifests, source bindings, runtime manifests, and media contracts for grades 10 and 11.
6. Run navigation, manifest, content, and cross-grade isolation QA before merging.

## Sources
- Ministry e-learning portal: https://moe.gov.eg/ar/elearningenterypage/e-learning/
- Ministry secondary curriculum announcement: https://moe.gov.eg/what-s-on/news/
- Official Ministry 2026 Secondary 1 French 2 assessment example: https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026/Secondry/Secondry1/Term2/ClassrHomeAssessmentsTest/French2_Sec1_tr2_w4.pdf
- Official Ministry 2026 Secondary 2 French 2 assessment example: https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026/Secondry/Secondry2/Term2/ClassrHomeAssessmentsTest/French2_Sec2_tr2_w9.pdf
- Official Ministry 2026 Secondary 2 French 1 assessment example: https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026/Secondry/Secondry2/Term2/ClassrHomeAssessmentsTest/French1_Sec2_tr2_w7.pdf

## Status
Research baseline created. No production route or existing grade has been changed. Next implementation step is lesson-sequence ingestion and creation of isolated Secondary 1/2 registries and source manifests.
