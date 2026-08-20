import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const manifest=JSON.parse(fs.readFileSync(path.join(root,'data/lessons/grade-4/release-manifest.json'),'utf8'));
const required=['01-interactif','02-reference','03-evaluation','04-examen-electronique'];
let fail=0;
for(const lesson of manifest.lessons){
 const dir=path.join(root,'data/lessons/grade-4',lesson.sourceDir);
 const exists=fs.existsSync(dir);
 console.log(`${exists?'FOUND':'PENDING'} ${lesson.id} ${lesson.titleFr} ${exists?'source directory present':'original source files not yet present'}`);
 if(!exists) continue;
 for(const name of required){
  const candidates=fs.existsSync(dir)?fs.readdirSync(dir):[];
  if(!candidates.some(x=>x.startsWith(name))) { console.error(`MISSING ${lesson.id}: ${name}`); fail++; }
 }
}
console.log(`Grade 4 audit: ${manifest.lessonCount} lessons; unresolved package items: ${fail}`);
process.exitCode=fail?1:0;
