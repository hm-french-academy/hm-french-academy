import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const manifest = JSON.parse(fs.readFileSync(path.join(root,'data/revision-readiness/annual-content-manifest-v2.json'),'utf8'));
const errors=[];
const readJson=(p)=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));

for (const [stage, meta] of Object.entries(manifest.stages)) {
  const file=path.join(root,meta.source);
  if(!fs.existsSync(file)){errors.push(`${stage}: missing ${meta.source}`);continue;}
  let d=readJson(meta.source);
  if(typeof d==='string') d=JSON.parse(d);
  const lessons=Array.isArray(d.lessons)?d.lessons:[];
  const units=Array.isArray(d.units)?d.units:[];
  if(meta.mode==='annual-revision' && !units.length) errors.push(`${stage}: empty units`);
  const ids=new Set();
  for(const l of lessons){
    if(!l.id) errors.push(`${stage}: lesson without id`);
    if(ids.has(l.id)) errors.push(`${stage}: duplicate lesson ${l.id}`);
    ids.add(l.id);
    for(const k of ['vocabulary','grammar','examples','practice']) if(!(k in l) || (Array.isArray(l[k])&&!l[k].length)) errors.push(`${stage}/${l.id}: missing ${k}`);
    if(Array.isArray(l.practice)) for(const q of l.practice) if(typeof q.answer!=='number' || !Array.isArray(q.options) || q.answer<0 || q.answer>=q.options.length) errors.push(`${stage}/${l.id}: invalid practice key`);
  }
  const diag=(d.diagnostic?.questions)||[];
  const fin=(d.finalReadiness?.questions)||[];
  const diagIds=new Set(diag.map(q=>q.id));
  for(const q of fin) if(diagIds.has(q.id)) errors.push(`${stage}: diagnostic/final ID overlap ${q.id}`);
  if(fin.length && typeof d.finalReadiness?.threshold!=='number') errors.push(`${stage}: final-readiness threshold missing`);
}

if(!fs.existsSync(path.join(root,'data/reviews/secondary-1/review-content.json'))) errors.push('secondary-1: missing review content');
if(errors.length){console.error('ANNUAL REVISION CONTENT QA FAILED');for(const e of errors) console.error(' -',e);process.exit(1)}
console.log('ANNUAL REVISION CONTENT QA PASSED');
console.log(`Validated ${Object.keys(manifest.stages).length} published stage banks plus the Grade 7 intro route.`);
