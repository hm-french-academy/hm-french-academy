import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('data/lessons/grade-5/source-package');
const out = path.resolve('data/lessons/grade-5/media-index.json');
const lessons = [
  ['g5-t1-l01','Lecon-01-La-phrase-simple'],['g5-t1-l02','Lecon-02-Les-determinants'],['g5-t1-l03','Lecon-03-Le-pluriel'],['g5-t1-l04','Lecon-04-Les-nombres'],['g5-t1-l05','Lecon-05-L-heure'],['g5-t1-l06','Lecon-06-Les-saisons'],['g5-t1-l07','Lecon-07-Pronoms-et-Present'],['g5-t1-l08','Lecon-08-Adjectifs-possessifs'],['g5-t1-l09','Lecon-09-Le-visage'],['g5-t1-l10','Lecon-10-Fournitures-et-Fruits'],['g5-t1-l11','Lecon-11-Le-corps']
];
const exts = new Set(['.mp4','.webm','.m4v','.mov']);
function walk(dir){ if(!fs.existsSync(dir)) return []; const out=[]; for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name); if(e.isDirectory()) out.push(...walk(p)); else if(exts.has(path.extname(e.name).toLowerCase())) out.push(p);} return out; }
const media=[];
for(const [lessonId, folder] of lessons){
  const base=path.join(root,folder); const files=walk(base);
  const video=files[0];
  media.push({lessonId, sourceDir:`data/lessons/grade-5/source-package/${folder}`, source:video?video.replace(process.cwd()+path.sep,'').split(path.sep).join('/') : null, status:video?'ready':'missing', filename:video?path.basename(video):null});
}
const ready=media.filter(x=>x.status==='ready').length;
fs.writeFileSync(out, JSON.stringify({grade:'primary-5',term:'term-1',generatedAt:new Date().toISOString(),videoExtensions:[...exts],totalLessons:lessons.length,readyVideos:ready,complete:ready===lessons.length,lessons:media},null,2)+'\n');
if(ready!==lessons.length){ console.error(`Grade 5 media gate: ${ready}/${lessons.length} videos present.`); process.exitCode=1; }
else console.log(`Grade 5 media gate: ${ready}/${lessons.length} videos present.`);
