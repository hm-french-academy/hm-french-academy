import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const candidates = [
  path.join(root, 'data', 'lessons', 'grade-8'),
  path.join(root, 'data', 'lessons', 'grade8'),
  path.join(root, 'data', 'grade-8'),
];
const gradeRoot = candidates.find(p => fs.existsSync(p));
if (!gradeRoot) throw new Error('Grade 8 data directory was not found.');

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const files = walk(gradeRoot);
const lessonFiles = files.filter(f => /lesson[-_]?([1-4])|lesson[-_]\d+/i.test(path.basename(f)));
const jsonFiles = files.filter(f => f.endsWith('.json'));

if (lessonFiles.length < 12) {
  throw new Error(`Expected at least 12 Grade 8 lesson files/references, found ${lessonFiles.length}.`);
}

const unitDirs = fs.readdirSync(gradeRoot, { withFileTypes: true })
  .filter(e => e.isDirectory() && /^unit[-_][1-3]$/i.test(e.name));
if (unitDirs.length !== 3) {
  throw new Error(`Expected exactly 3 Grade 8 unit directories, found ${unitDirs.length}.`);
}

const unit4 = fs.readdirSync(gradeRoot, { withFileTypes: true })
  .filter(e => e.isDirectory() && /^unit[-_]4$/i.test(e.name));
if (unit4.length) throw new Error('Unit 4 must remain excluded from Grade 8.');

for (const file of jsonFiles) {
  try { JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (err) { throw new Error(`Invalid JSON: ${path.relative(root, file)} — ${err.message}`); }
}

const textFiles = files.filter(f => /\.(json|html|js|mjs|css)$/i.test(f));
const brokenRefs = [];
for (const file of textFiles) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(/(?:src|href|url|file|path)\s*[:=]\s*["'`]([^"'`]+)["'`]/gi)) {
    const ref = match[1];
    if (/^(https?:|data:|#|javascript:|mailto:)/i.test(ref)) continue;
    if (!ref.includes('grade-8') && !ref.includes('grade8')) continue;
    const normalized = path.resolve(path.dirname(file), ref.split('#')[0]);
    if (ref && !fs.existsSync(normalized)) brokenRefs.push(`${path.relative(root, file)} -> ${ref}`);
  }
}
if (brokenRefs.length) throw new Error(`Broken Grade 8 local references:\n${brokenRefs.join('\n')}`);

console.log(`PASS: Grade 8 static smoke validation. Units=${unitDirs.length}, lesson references=${lessonFiles.length}, JSON=${jsonFiles.length}`);
