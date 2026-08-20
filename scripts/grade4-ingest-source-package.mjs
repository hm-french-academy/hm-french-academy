import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const archive=process.argv[2] || '4eme_Complet(1).zip';
if(!fs.existsSync(archive)) throw new Error(`Source archive not found: ${archive}`);
const out='data/lessons/grade-4/source';
fs.mkdirSync(out,{recursive:true});
execFileSync('unzip',['-q','-o',archive,'-d',out]);
const root=path.join(out,'4eme_Complet');
const files=[];
function walk(dir){for(const name of fs.readdirSync(dir)){const p=path.join(dir,name);const s=fs.statSync(p);if(s.isDirectory())walk(p);else files.push(p)}}
walk(root);
if(files.length!==28) throw new Error(`Expected 28 source files, found ${files.length}`);
const ext={'.html':0,'.docx':0};
for(const f of files){const e=path.extname(f); if(e in ext) ext[e]++;}
if(ext['.html']!==14 || ext['.docx']!==14) throw new Error(`Unexpected source mix: ${JSON.stringify(ext)}`);
console.log(`Grade 4 source ingestion validated: ${files.length} files (${ext['.html']} HTML + ${ext['.docx']} DOCX).`);
