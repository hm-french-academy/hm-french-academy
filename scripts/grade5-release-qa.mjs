import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));
const exists = (p) => fs.existsSync(path.join(root, p));
const fail = (msg) => { console.error(`FAIL: ${msg}`); failures++; };
let failures = 0;

const registry = readJson('data/lessons/grade-5/lesson-registry.json');
const media = readJson('data/lessons/grade-5/media-index.json');
const content = readJson('data/lessons/grade-5/lesson-studio-content.json');
const lessons = registry.includedUnits?.flatMap(u => u.lessons || []) || [];

if (registry.grade !== 'primary-5') fail('registry grade is not primary-5');
if (lessons.length !== 11) fail(`expected 11 lessons, found ${lessons.length}`);
if (media.videoCount !== 11 || media.readyVideos !== 11 || media.complete !== true) fail('media release is not complete 11/11');
if (!exists('grade-5-lesson-v3.html')) fail('Grade 5 Lesson Studio entry page missing');
if (!exists('scripts/grade5-premium-engine-v6.js')) fail('Premium engine missing');
if (!exists('scripts/grade5-games-entry-v1.js')) fail('Games entry missing');
if (!exists('data/lessons/grade-5/grade5-games.html')) fail('Games hub missing');

const requiredGames = [
  'grade5-game-vocabulary.html','grade5-game-subject.html','grade5-game-verb.html',
  'grade5-game-complement.html','grade5-game-order.html','grade5-game-build.html'
];
for (const file of requiredGames) if (!exists(`data/lessons/grade-5/${file}`)) fail(`missing game: ${file}`);

for (const lesson of lessons) {
  const d = content.lessons?.[lesson.id];
  if (!d) { fail(`${lesson.id}: missing lesson content`); continue; }
  for (const key of ['titleAr','titleFr','objectiveAr']) if (!d[key]) fail(`${lesson.id}: missing ${key}`);
  if (!Array.isArray(d.vocabulary) || d.vocabulary.length === 0) fail(`${lesson.id}: vocabulary missing`);
  if (!Array.isArray(d.practice) || d.practice.length === 0) fail(`${lesson.id}: practice missing`);
  if (!d.grammar) fail(`${lesson.id}: grammar missing`);
  if (!Array.isArray(d.pronunciation) || d.pronunciation.length === 0) fail(`${lesson.id}: pronunciation content missing`);
  const m = media.lessons?.find(x => x.lessonId === lesson.id);
  if (!m || m.status !== 'ready' || !m.videoId || !/^[-_A-Za-z0-9]{8,12}$/.test(m.videoId)) fail(`${lesson.id}: valid ready video binding missing`);
}

const html = fs.readFileSync(path.join(root, 'grade-5-lesson-v3.html'), 'utf8');
for (const needle of [
  'learning-progress.js?build=20260820-144',
  'grade5-fetch-cache.js?build=20260820-144',
  'grade5-premium-engine-v6.js?build=20260820-144',
  'grade5-games-entry-v1.js?build=20260820-144'
]) if (!html.includes(needle)) fail(`Lesson Studio missing pinned runtime: ${needle}`);
if (!html.includes('grade5-games.html?v=20260820-144')) fail('Games route is not pinned to release 144');

console.log(`Grade 5 release QA: ${lessons.length} lessons, ${media.readyVideos}/${media.videoCount} videos, ${requiredGames.length} games`);
if (failures) { console.error(`Grade 5 release QA failed with ${failures} issue(s).`); process.exit(1); }
console.log('Grade 5 release QA PASSED.');
