# Grade 8 Revision Integration Contract

## Student flow
`revision-dashboard-config.json` is the single UI configuration source for the annual revision experience.

1. Dashboard loads `grade8-annual-revision`.
2. Diagnostic opens `g8-rev-diagnostic` (36 items).
3. Engine groups misses by domain.
4. Only weak modules unlock for remediation.
5. Each weak module ends with mastery check.
6. When required domains reach mastery, Annual Retrieval unlocks.
7. Final Readiness unlocks after retrieval.
8. Final result writes readiness state and remaining weak domains.

## Persistence contract
Persist by `revisionId` + student identity already used by HM Academy progress infrastructure:
- diagnostic score
- domain scores
- completed remediation cards
- mastery attempts/results
- retrieval score
- final score
- readiness level
- lastUpdated

## Safety/compatibility
- Additive integration only.
- Do not modify existing Grade 8 lesson registry IDs.
- Do not mark revision stages complete merely because a page was opened.
- Assessment completion requires submitted/scored attempt.
- Remediation completion requires mastery threshold.

## Current implementation boundary
The data/config layer is now prepared. A frontend page must consume this contract before the revision can truthfully be called live in the student UI.
