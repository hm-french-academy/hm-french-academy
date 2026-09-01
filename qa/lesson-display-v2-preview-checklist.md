# Lesson Display V2 Preview — Verification Checklist

## Automated/static review
- [x] V2 preview is a separate file.
- [x] Existing `grade7-lesson-studio.html` remains untouched on the feature branch.
- [x] All 11 lesson IDs are represented.
- [x] All 11 journey stage IDs are represented.
- [x] Preview preserves the selected lesson/stage when opening the original Studio.
- [x] Responsive rules are included for tablet/mobile widths.
- [x] No lesson source data is duplicated into the preview.

## Manual browser gate
- [ ] Open `lesson-display-v2-preview.html`.
- [ ] Select lessons 1–11.
- [ ] Select every stage.
- [ ] Open the original Studio from each selected context.
- [ ] Check mobile widths for clipping/overflow.
- [ ] Check browser console for errors.
- [ ] Verify original pronunciation, quizzes, and progress remain functional.

## Release rule
This preview must not be merged into `main` as the production lesson UI until the manual browser gate is completed and the visual result is approved.
