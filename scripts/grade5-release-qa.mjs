import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();let failures=0;
const rawRead=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const read=p=>{let value=rawRead(p);while(value&&typeof value.content==='string'){try{value=JSON.parse(value.content)}catch{break}}return value};
const exists=p=>fs.existsSync(path.join(root,p));
const fail=m=>{console.error(`FAIL: ${m}`);failures++};
const registry=read('data/lessons/grade-5/lesson-registry.json');
const media=read('data/lessons/grade-5/media-index.json');
const content=read('data/lessons/grade-5/lesson-studio-content.json');
const extension=read('data/lessons/grade-5/lesson-studio-content-extensions-l09-l11.json');
content.lessons={...(content.lessons||{}),...(extension.lessons||{})};
const curriculum=read('data/curricula/grade-5-french-semester-1.json');
const lessons=registry.includedUnits?.flatMap(u=>u.lessons||[])||[];
const expectedIds=Array.from({length:11},(_,i)=>`g5-t1-l${String(i+1).padStart(2,'0')}`);
if(registry.grade!=='primary-5')fail(`registry grade ${registry.grade??'missing'}`);
if(lessons.length!==11)fail(`lesson count ${lessons.length}/11`);
if(curriculum.lessonCount!==11||curriculum.lessons?.length!==11)fail('curriculum count');
if(media.videoCount!==11||media.readyVideos!==11||media.complete!==true)fail('media 11/11');
for(const id of expectedIds)if(!lessons.some(l=>l.id===id))fail(`registry missing ${id}`);
for(const p of ['grade-5.html','grade-5-lesson-v3.html','scripts/grade5-premium-engine-v7.js','scripts/grade5-vocabulary-images-v1.js','scripts/grade5-fetch-cache.js','grade5-interactive-assessment.html','data/lessons/grade-5/lesson-studio-content-extensions-l09-l11.json'])if(!exists(p))fail(`missing ${p}`);
const legacyFiles=[
'data/lessons/grade-5/grade5-games.html','data/lessons/grade-5/grade5-game-vocabulary.html','data/lessons/grade-5/grade5-game-subject.html','data/lessons/grade-5/grade5-game-verb.html','data/lessons/grade-5/grade5-game-complement.html','data/lessons/grade-5/grade5-game-order.html','data/lessons/grade-5/grade5-game-build.html','data/lessons/grade-5/grade5-game-bank.js','data/lessons/grade-5/grade5-game-common.js',
'data/lessons/grade-5/grade5-games-l02.html','data/lessons/grade-5/grade5-games-l02-v2.html','data/lessons/grade-5/grade5-assessment-l02.html','data/lessons/grade-5/grade5-interactive-assessment-l02.html',
'data/lessons/grade-5/lesson2-overrides-v1.js','data/lessons/grade-5/lesson2-picture-tool-game-v1.js','data/lessons/grade-5/lesson2-picture-tool-game-v2.js'];
for(const p of legacyFiles)if(exists(p))fail(`legacy lesson/game/assessment artifact still exists: ${p}`);
const schema=registry.packageSchema||{};const expected={interactive:'01-interactif.html',printable:'02-reference-imprimable.docx',evaluation:'03-evaluation-a-imprimer.docx',electronicExam:'04-examen-electronique.html'};for(const[k,v]of Object.entries(expected))if(schema[k]!==v)fail(`package schema ${k}`);
if(!(registry.finalExamRegistered===true||registry.finalExam===true||typeof registry.finalExam==='string'||registry.finalExam?.registered===true))fail('final exam registration');
const mediaById=new Map((media.lessons||[]).map(x=>[x.lessonId,x]));
for(const l of lessons){const d=content.lessons?.[l.id];if(!d){fail(`${l.id} content missing`);continue}for(const k of ['titleAr','titleFr','objectiveAr'])if(!d[k])fail(`${l.id} ${k}`);if(!Array.isArray(d.vocabulary)||d.vocabulary.length<4)fail(`${l.id} vocabulary`);if(!d.grammar)fail(`${l.id} grammar`);if(!Array.isArray(d.practice)||d.practice.length<2)fail(`${l.id} practice`);if(!Array.isArray(d.pronunciation)||d.pronunciation.length<4)fail(`${l.id} pronunciation`);const m=mediaById.get(l.id);if(!m||m.status!=='ready'||!m.videoId)fail(`${l.id} video binding`)}
for(const id of ['g5-t1-l09','g5-t1-l10','g5-t1-l11']){const d=content.lessons[id];if(!d||d.vocabulary.some(v=>!v.image||!v.example))fail(`${id} vocabulary image/example binding`);if(!d||d.pronunciation.length<8)fail(`${id} pronunciation coverage`)}
const html=fs.readFileSync(path.join(root,'grade-5-lesson-v3.html'),'utf8');for(const n of ['learning-progress.js?build=20260820-144','grade5-fetch-cache.js?build=20260821-145','grade5-premium-engine-v7.js?v=20260822-premium7','grade5-vocabulary-images-v1.js?build=20260822-vocab4'])if(!html.includes(n))fail(`runtime pin ${n}`);
for(const forbidden of ['grade5-premium-engine-v6.js','grade5-stage-runtime-v1.js','grade5-route-lock-v1.js','grade5-games-entry-v1.js','grade5-game-bank.js','grade5-game-common.js','grade5-games.html','grade5-games-l02.html','grade5-games-l02-v2.html','grade5-assessment-l02.html','grade5-interactive-assessment-l02.html','lesson2-overrides-v1.js','lesson2-picture-tool-game-v1.js','lesson2-picture-tool-game-v2.js'])if(html.includes(forbidden))fail(`legacy/conflicting artifact referenced by lesson page: ${forbidden}`);
const hub=fs.readFileSync(path.join(root,'grade-5.html'),'utf8');if(!hub.includes('i18n.js?v=20260821-i18n48'))fail('grade-5 hub i18n runtime');for(const id of expectedIds)if(!hub.includes(id))fail(`grade-5 hub route ${id}`);
const assessment=fs.readFileSync(path.join(root,'grade5-interactive-assessment.html'),'utf8');for(const bad of ['grade5-game-bank.js','grade5-game-common.js','g5-t1-l01','grade5-assessment-l02.html','grade5-interactive-assessment-l02.html'])if(assessment.includes(bad))fail(`assessment contains legacy/L01 dependency: ${bad}`);
console.log(`Grade 5 Release QA: ${lessons.length} lessons; ${media.readyVideos}/${media.videoCount} videos; single-owner Premium Engine v7; shared lesson-scoped assessment; all known L01/L02 legacy game and assessment artifacts removed.`);
if(failures){console.error(`FAILED: ${failures} issue(s)`);process.exit(1)}console.log('PASSED: Grade 5 structural Premium release gates are satisfied.');