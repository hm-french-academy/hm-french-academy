from pathlib import Path

# Production compatibility fix:
# the Grade 7 page uses the URL query variable `section`.
# Some legacy enrichment scripts still emit `currentSection`, which causes
# the published page to stop after the lesson title with a ReferenceError.
p = Path('grade7-lesson-studio.html')
s = p.read_text(encoding='utf-8')

# Normalize every legacy reference before the Pages artifact is created.
s = s.replace('currentSection', 'section')

p.write_text(s, encoding='utf-8')
print('Grade 7 runtime normalized: currentSection -> section')
print('Production Pages build guard active for Grade 7 Lesson Studio')
