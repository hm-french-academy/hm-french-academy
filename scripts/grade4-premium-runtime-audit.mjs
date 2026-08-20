import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const m=JSON.parse(fs.readFileSync(path.join(root,'data/lessons/grade-4/premium-runtime-manifest.json'),'utf8'));
const a=JSON.parse(fs.readFileSync(path.join(root,'data/lessons/grade-4/source-content-audit.json'),'utf8'));
const required=['lesson','vocabulary','grammar','practice','pronunciation','media','progress'];
let errors=[];
if(m.lessons.length!==7) errors.push('runtime lesson count');
if(a.lessonCount!==7||a.fileCount!==28) errors.push('source audit count');
for(const l of m.lessons) for(const s of required) if(!l.sections.includes(s)) errors.push(`${l.id}:${s}`);
if(m.package!=='four-part-source-package') errors.push('package');
console.log(`Grade 4 Premium Runtime Audit: ${m.lessons.length} lessons / ${required.length} runtime sections / ${a.fileCount} source files`);
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('PASS: runtime manifest is structurally complete; repository ingestion remains the release gate.');
