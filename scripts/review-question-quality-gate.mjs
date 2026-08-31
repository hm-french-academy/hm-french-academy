import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('data/reviews');
const files = [];
function walk(dir){
  for(const name of fs.readdirSync(dir)){
    const p=path.join(dir,name);
    const st=fs.statSync(p);
    if(st.isDirectory()) walk(p);
    else if(name === 'review-content.json') files.push(p);
  }
}
walk(root);

const errors=[];
for(const file of files){
  let data;
  try { data=JSON.parse(fs.readFileSync(file,'utf8')); }
  catch(e){ errors.push(`${file}: invalid JSON`); continue; }
  const bank=Array.isArray(data.questionBank)?data.questionBank:[];
  const ids=new Set(), prompts=new Map();
  for(const q of bank){
    if(!q.id) errors.push(`${file}: question without id`);
    if(q.id && ids.has(q.id)) errors.push(`${file}: duplicate id ${q.id}`);
    if(q.id) ids.add(q.id);
    const prompt=String(q.prompt||'').trim().toLowerCase();
    if(prompt){
      if(prompts.has(prompt)) errors.push(`${file}: duplicate prompt ${q.id} / ${prompts.get(prompt)}`);
      else prompts.set(prompt,q.id);
    }
    if(Array.isArray(q.options)){
      const normalized=q.options.map(x=>String(x).trim().toLowerCase());
      if(new Set(normalized).size !== normalized.length) errors.push(`${file}: duplicate option in ${q.id}`);
      if(q.answer!==undefined && !q.options.map(String).includes(String(q.answer))) errors.push(`${file}: answer not present in options for ${q.id}`);
    }
    if(q.category==='couleurs' && !q.media && /de quelle couleur|quelle couleur/i.test(q.prompt||''))
      errors.push(`${file}: visual color question without media/context ${q.id}`);
  }
  if(data.quality?.assessmentPoolsMustBeDisjoint && data.diagnostic?.questions && data.finalAssessment?.questions){
    const a=new Set(data.diagnostic.questions.map(q=>q.id));
    for(const q of data.finalAssessment.questions) if(a.has(q.id)) errors.push(`${file}: diagnostic/final duplicate id ${q.id}`);
  }
}

console.log(`Review QA scanned ${files.length} review-content.json file(s).`);
if(errors.length){ console.error(errors.join('\n')); process.exit(1); }
console.log('Review QA passed: unique IDs, unique prompts, unique options, valid answers, and assessment-pool separation checks passed.');