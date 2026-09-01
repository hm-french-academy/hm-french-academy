import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('data/reviews');
const files = [];
function walk(dir){
  if(!fs.existsSync(dir)) return;
  for(const name of fs.readdirSync(dir)){
    const p=path.join(dir,name); const st=fs.statSync(p);
    if(st.isDirectory()) walk(p); else if(name==='review-content.json') files.push(p);
  }
}
walk(root);
const errors=[];
const warn=[];
function parseDeep(v){
  let x=v;
  for(let i=0;i<8 && typeof x==='string';i++){
    try{x=JSON.parse(x)}catch{break}
  }
  return x;
}
function scanBank(file,label,bank){
  if(!Array.isArray(bank)) return;
  const ids=new Set();
  for(const q of bank){
    const id=q?.id||`${label}:${q?.q||q?.question||'unknown'}`;
    if(q?.id && ids.has(q.id)) errors.push(`${file}: duplicate id ${q.id}`);
    if(q?.id) ids.add(q.id);
    const options=Array.isArray(q?.options)?q.options:[];
    if(options.length){
      const normalized=options.map(x=>String(x).trim().toLowerCase());
      if(new Set(normalized).size!==normalized.length) errors.push(`${file}: duplicate option in ${id}`);
      if(q.answer!==undefined){
        if(Number.isInteger(q.answer) && (q.answer<0 || q.answer>=options.length)) errors.push(`${file}: answer index out of range in ${id}`);
        else if(!Number.isInteger(q.answer) && !options.map(String).includes(String(q.answer))) errors.push(`${file}: answer not present in options for ${id}`);
      }
    }
    const prompt=String(q?.prompt??q?.q??q?.question??'').trim();
    if(q?.category==='couleurs' && !q?.media && /de quelle couleur|quelle couleur/i.test(prompt)) errors.push(`${file}: visual color question without media/context ${id}`);
    if(/je parle avec\s*_{2,}|je parle avec\s*\.{2,}/i.test(prompt) && !/(avec (paul|marie|lui|elle|mon|ma|mes)|avec qui)/i.test(prompt)) warn.push(`${file}: pronoun question may be ambiguous: ${id}`);
    if(/il est\s*_{2,}\s*(heures|heure)/i.test(prompt) && options.length>1) warn.push(`${file}: time question needs explicit time context: ${id}`);
  }
}
for(const file of files){
  let data;
  try{data=parseDeep(fs.readFileSync(file,'utf8'));}catch{errors.push(`${file}: invalid JSON`);continue;}
  const nested=parseDeep(data?.content);
  const sources=[['questionBank',data?.questionBank],['diagnostic',data?.diagnostic?.questions],['finalReadiness',data?.finalReadiness?.questions],['finalAssessment',data?.finalAssessment?.questions],['lessonPractice',Array.isArray(data?.lessonPractice)?data.lessonPractice.flatMap(x=>x.questions||[]):null],['nested.questionBank',nested?.questionBank],['nested.diagnostic',nested?.diagnostic?.questions],['nested.finalReadiness',nested?.finalReadiness?.questions],['nested.finalAssessment',nested?.finalAssessment?.questions],['nested.lessonPractice',Array.isArray(nested?.lessonPractice)?nested.lessonPractice.flatMap(x=>x.questions||[]):null]];
  for(const [label,bank] of sources) scanBank(file,label,bank);
  const d=nested?.diagnostic?.questions||data?.diagnostic?.questions||[];
  const f=nested?.finalReadiness?.questions||nested?.finalAssessment?.questions||data?.finalReadiness?.questions||data?.finalAssessment?.questions||[];
  if((nested?.quality||data?.quality)?.assessmentPoolsMustBeDisjoint){
    const a=new Set(d.map(q=>q.id));
    for(const q of f) if(a.has(q.id)) errors.push(`${file}: diagnostic/final duplicate id ${q.id}`);
    const ap=new Set(d.map(q=>String(q.prompt||q.q||q.question||'').trim().toLowerCase()));
    for(const q of f) if(ap.has(String(q.prompt||q.q||q.question||'').trim().toLowerCase())) errors.push(`${file}: diagnostic/final duplicate prompt ${q.id}`);
  }
}
console.log(`Review QA scanned ${files.length} review-content.json file(s).`);
if(warn.length) console.warn('Review QA warnings:\n'+warn.join('\n'));
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log('Review QA passed: JSON integrity, answer keys, unique options/IDs, nested banks, visual-context protection, and assessment-pool separation checks passed.');