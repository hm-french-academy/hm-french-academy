import fs from 'node:fs';
const manifest='data/lessons/grade-5/lesson-media-manifest.json';
const out='data/lessons/grade-5/media-index.json';
const x=JSON.parse(fs.readFileSync(manifest,'utf8'));
const lessons=x.lessons||[];
const validId=/^[A-Za-z0-9_-]{11}$/;
const checked=lessons.map(l=>({...l,status:validId.test(l.videoId)&&String(l.youtube||'').includes('/embed/')?'ready':'missing'}));
const ready=checked.filter(l=>l.status==='ready').length;
const result={grade:'primary-5',term:'term-1',source:'lesson-media-manifest.json',videoType:'youtube-embed',totalLessons:lessons.length,readyVideos:ready,complete:lessons.length===11&&ready===11,lessons:checked};
fs.writeFileSync(out,JSON.stringify(result,null,2)+'\n');
if(!result.complete){console.error(JSON.stringify(result,null,2));process.exit(1)}
console.log(`Grade 5 media gate: ${ready}/11 videos validated.`);
