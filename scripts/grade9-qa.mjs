import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const base = path.join(root, 'data', 'lessons', 'grade-9', 'semester-1');
const registryPath = path.join(base, 'lesson-registry.json');
const studioPath = path.join(root, 'grade-9-lesson-studio.html');
const stages = ['start','vocabulary','pronunciation','grammar','conversation','practice','video','games','smart-review','evaluation','progress'];
const requiredArrays = ['vocabulary','pronunciation','grammar','conversation','practice','assessment'];
const failures = [];
const arabic = /[\u0600-\u06FF]/;

if (!fs.existsSync(registryPath)) { console.error('Grade 9 QA FAILED\n- lesson-registry.json: missing'); process.exit(1); }
let registry;
try { registry = JSON.parse(fs.readFileSync(registryPath, 'utf8')); } catch { console.error('Grade 9 QA FAILED\n- lesson-registry.json: invalid JSON'); process.exit(1); }
const lessons = registry.units?.flatMap(unit => unit.lessons ?? []) ?? [];
if (lessons.length !== 12) failures.push(`registry: expected 12 lessons, found ${lessons.length}`);
if (registry.units?.length !== 3) failures.push(`registry: expected 3 units, found ${registry.units?.length ?? 0}`);
if (JSON.stringify(registry.lessonJourney) !== JSON.stringify(stages)) failures.push('registry: lessonJourney mismatch');
if (!fs.existsSync(studioPath)) failures.push('studio: grade-9-lesson-studio.html missing');
else {
  const studio = fs.readFileSync(studioPath, 'utf8');
  for (const stage of stages) if (!studio.includes(`'${stage}'`)) failures.push(`studio: stage '${stage}' is not wired`);
  for (const marker of ['function render()','async function load()','data/lessons/grade-9/semester-1/','d.assessment||j.evaluation']) if (!studio.includes(marker)) failures.push(`studio: runtime guard '${marker}' missing`);
  if (!studio.includes('cache:no-store') && !studio.includes('cache: \'no-store\'')) failures.push('studio: no-cache lesson loading guard');
}
const registeredFiles = new Set();
for (const lesson of lessons) {
  const relative = lesson.contentFile;
  if (!relative) { failures.push(`${lesson.id ?? 'unknown'}: contentFile missing`); continue; }
  registeredFiles.add(path.basename(relative));
  const file = path.join(root, relative);
  if (!fs.existsSync(file)) { failures.push(`${lesson.id}: missing ${relative}`); continue; }
  let data; try { data = JSON.parse(fs.readFileSync(file, 'utf8')); } catch { failures.push(`${relative}: invalid JSON`); continue; }
  if (data.id !== lesson.id) failures.push(`${relative}: id mismatch (${data.id ?? 'missing'} != ${lesson.id})`);
  if (!data.titleFr || !data.titleAr) failures.push(`${relative}: bilingual title missing`);
  for (const key of requiredArrays) if (!Array.isArray(data.journey?.[key]) || data.journey[key].length === 0) failures.push(`${relative}: journey.${key} empty/missing`);
  for (const key of ['pronunciation','grammar','conversation','practice','assessment']) for (const item of data.journey?.[key] ?? []) if (typeof item === 'string' && arabic.test(item)) failures.push(`${relative}: journey.${key} contains Arabic text`);
  for (const item of data.journey?.vocabulary ?? []) if (typeof item === 'object' && typeof item.fr === 'string' && arabic.test(item.fr)) failures.push(`${relative}: vocabulary.fr contains Arabic text`);
}
const actualLessonFiles = fs.readdirSync(base).filter(name => /^u\d+-l\d+\.json$/.test(name));
for (const file of actualLessonFiles) if (!registeredFiles.has(file)) failures.push(`${file}: unexpected lesson file not present in registry`);
if (failures.length) { console.error('Grade 9 QA FAILED'); for (const failure of failures) console.error(`- ${failure}`); process.exit(1); }
console.log(`Grade 9 QA PASS: ${lessons.length} lesson files, 3 units, IDs, required Journey data, 11-stage renderer wiring, runtime guards, registry coverage, and French-field language integrity verified.`);
