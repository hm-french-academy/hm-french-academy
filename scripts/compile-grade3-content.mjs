import fs from 'node:fs';
import path from 'node:path';

const base = path.join(process.cwd(), 'data', 'lessons', 'grade-3', 'web', '3eme prim');
const out = path.join(process.cwd(), 'data', 'lessons', 'grade-3', 'compiled');
const lessons = {
  'g3-l01':['01_Introduction','01_interactif_introduction.html'],
  'g3-l02':['02_En_classe','01_interactif_enclasse.html'],
  'g3-l03':['03_Actes_et_verbes','01_interactif_actesverbes.html'],
  'g3-l04':['04_Unite1_Cest_ma_classe','01_interactif_maclasse.html'],
  'g3-l05':['05_Unite2_Cest_ma_maison','01_interactif_maison.html'],
  'g3-l06':['06_Unite3_Fruits_et_legumes','01_interactif_fruits.html']
};
fs.mkdirSync(out,{recursive:true});
function cleanHtml(html){return html.replace(/<script[\s\S]*?<\/script>/gi,'').replace(/<noscript[\s\S]*?<\/noscript>/gi,'').replace(/\son(?:click|load|change|input|submit)\s*=\s*("[^"]*"|'[^']*')/gi,'').replace(/\shidden(\s|>)/gi,'$1').replace(/\saria-hidden\s*=\s*(["'])true\1/gi,'');}
function sectionData(html){
  const sections=[];
  const sectionRe=/<section\b[^>]*class=["'][^"']*\bblock\b[^"']*["'][^>]*>[\s\S]*?<\/section>/gi;
  let m;
  while((m=sectionRe.exec(html)))sections.push(cleanHtml(m[0]));
  if(!sections.length){
    const divRe=/<div\b[^>]*class=["'][^"']*\bblock\b[^"']*["'][^>]*>[\s\S]*?<\/div>/gi;
    while((m=divRe.exec(html)))sections.push(cleanHtml(m[0]));
  }
  return sections;
}
for(const [id,[folder,file]] of Object.entries(lessons)){
  const src=path.join(base,folder,file); if(!fs.existsSync(src)) throw new Error(`${id}: missing ${src}`);
  const html=fs.readFileSync(src,'utf8');
  const sections=sectionData(html);
  if(sections.length<1) throw new Error(`${id}: no lesson blocks extracted`);
  const text=sections.join('\n').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
  const payload={id,folder,file,sectionCount:sections.length,sections,text,generatedAt:new Date().toISOString()};
  fs.writeFileSync(path.join(out,`${id}.json`),JSON.stringify(payload,null,2));
}
console.log('Compiled grade 3:',Object.keys(lessons).join(', '));
