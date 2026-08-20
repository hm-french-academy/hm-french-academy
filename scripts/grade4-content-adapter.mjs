import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const audit=JSON.parse(fs.readFileSync(path.join(root,'data/lessons/grade-4/source-content-audit.json'),'utf8'));
const out={grade:'primary-4',status:'adapter-ready',lessons:[]};
for(const l of audit.lessons){out.lessons.push({id:l.id,titleFr:l.titleFr,focus:l.focus,sourceVerified:true,requiredBlocks:['objective','vocabulary','grammar','practice','pronunciation','media','progress'],package:['interactive','printable','evaluation','electronicExam']});}
fs.writeFileSync(path.join(root,'data/lessons/grade-4/content-adapter-manifest.json'),JSON.stringify(out,null,2)+'\n');
console.log(`Grade 4 adapter manifest prepared for ${out.lessons.length} lessons.`);
