import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const base = path.join(root, 'data', 'lessons', 'grade-9', 'semester-1');
const registryPath = path.join(base, 'lesson-registry.json');
const stages = ['start','vocabulary','pronunciation','grammar','conversation','practice','video','games','smart-review','evaluation','progress'];
const requiredArrays = ['vocabulary','pronunciation','grammar','conversation','practice','assessment'];
const failures = [];

if (!fs.existsSync(registryPath)) {
  console.error('Grade 9 QA FAILED\n- lesson-registry.json: missing');
  process.exit(1);
}

let registry;
try { registry = JSON.parse(fs.readFileSync(registryPath, 'utf8')); }
catch { console.error('Grade 9 QA FAILED\n- lesson-registry.json: invalid JSON'); process.exit(1); }

const lessons = registry.units?.flatMap(unit => unit.lessons ?? []) ?? [];
if (lessons.length !== 12) failures.push(`registry: expected 12 lessons, found ${lessons.length}`);
if (JSON.stringify(registry.lessonJourney) !== JSON.stringify(stages)) failures.push('registry: lessonJourney mismatch');

const registeredFiles = new Set();
for (const lesson of lessons) {
  const relative = lesson.contentFile;
  if (!relative) { failures.push(`${lesson.id ?? 'unknown'}: contentFile missing`); continue; }
  registeredFiles.add(path.basename(relative));
  const file = path.join(root, relative);
  if (!fs.existsSync(file)) { failures.push(`${lesson.id}: missing ${relative}`); continue; }
  let data;
  try { data = JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch { failures.push(`${relative}: invalid JSON`); continue; }
  if (data.id !== lesson.id) failures.push(`${relative}: id mismatch (${data.id ?? 'missing'} != ${lesson.id})`);
  for (const key of requiredArrays) {
    if (!Array.isArray(data.journey?.[key]) || data.journey[key].length === 0) failures.push(`${relative}: journey.${key} empty/missing`);
  }
}

const actualLessonFiles = fs.readdirSync(base).filter(name => /^u\d+-l\d+\.json$/.test(name));
for (const file of actualLessonFiles) {
  if (!registeredFiles.has(file)) failures.push(`${file}: unexpected lesson file not present in registry`);
}

if (failures.length) {
  console.error('Grade 9 QA FAILED');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Grade 9 QA PASS: ${lessons.length} registered lesson files, valid JSON, IDs, required content fields, registry coverage, and 11-stage journey verified.`);
