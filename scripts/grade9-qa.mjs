import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const base = path.join(root, 'data', 'lessons', 'grade-9', 'semester-1');
const expected = [
  ['u1-l1.json','g9-u1-l1'], ['u1-l2.json','g9-u1-l2'], ['u1-l3.json','g9-u1-l3'], ['u1-l4.json','g9-u1-l4'],
  ['u2-l1.json','g9-u2-l1'], ['u2-l2.json','g9-u2-l2'], ['u2-l3.json','g9-u2-l3'], ['u2-l4.json','g9-u2-l4'],
  ['u3-l1.json','g9-u3-l1'], ['u3-l2.json','g9-u3-l2'], ['u3-l3.json','g9-u3-l3'], ['u3-l4.json','g9-u3-l4']
];
const stages = ['start','vocabulary','pronunciation','grammar','conversation','practice','video','games','smart-review','evaluation','progress'];
const requiredArrays = ['vocabulary','pronunciation','grammar','conversation','practice','assessment'];
let failures = [];
for (const [file, id] of expected) {
  const p = path.join(base, file);
  if (!fs.existsSync(p)) { failures.push(`${file}: missing`); continue; }
  let d;
  try { d = JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { failures.push(`${file}: invalid JSON`); continue; }
  if (d.id !== id) failures.push(`${file}: id mismatch (${d.id ?? 'missing'})`);
  for (const key of requiredArrays) if (!Array.isArray(d.journey?.[key]) || d.journey[key].length === 0) failures.push(`${file}: journey.${key} empty/missing`);
}
const registryPath = path.join(base, 'lesson-registry.json');
if (!fs.existsSync(registryPath)) failures.push('lesson-registry.json: missing');
else {
  const r = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const lessons = r.units?.flatMap(u => u.lessons ?? []) ?? [];
  if (lessons.length !== 12) failures.push(`registry: expected 12 lessons, found ${lessons.length}`);
  for (const [, id] of expected) if (!lessons.some(l => l.id === id)) failures.push(`registry: missing ${id}`);
  if (JSON.stringify(r.lessonJourney) !== JSON.stringify(stages)) failures.push('registry: lessonJourney mismatch');
}
if (failures.length) {
  console.error('Grade 9 QA FAILED');
  for (const f of failures) console.error(`- ${f}`);
  process.exit(1);
}
console.log('Grade 9 QA PASS: 12 lesson files, registry coverage, IDs, required content fields, and 11-stage journey verified.');
