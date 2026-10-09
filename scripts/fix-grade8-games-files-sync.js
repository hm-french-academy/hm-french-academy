const fs=require('fs');
const path=require('path');
const p=path.join(process.cwd(),'lesson-studio-standard.html');
let s=fs.readFileSync(p,'utf8');
if(!/function games\(\)\{/.test(s) || !/function files\(\)\{/.test(s)){
  console.log('Grade 8 sync skipped: lesson-studio-standard.html does not expose the legacy games/files functions.');
  process.exit(0);
}
function replaceFn(src,name,body){const re=new RegExp('function '+name+'\\(\\)\\{[\\s\\S]*?\\}\\s*function ');const m=src.match(re);if(!m){console.log('Grade 8 sync skipped for missing function: '+name);return src;}return src.slice(0,m.index)+body+'\nfunction '+src.slice(m.index+m[0].length)}
const games=`function games(){const m=id.match(/^grade8-u([1-3])-l([1-4])$/);if(m){const student=new URLSearchParams(location.search).get('student')==='1';const unit=Number(m[1]),n=Number(m[2]);const href='data/lessons/grade-8/unit-'+unit+'/lesson-'+n+'-games.html?v=20261010-grade8-single-gamehub-u'+unit+'-l'+n+(student?'&student=1':'');const title='مركز الألعاب — الدرس '+['الأول','الثاني','الثالث','الرابع'][n-1];return '<h2>🎮 '+title+'</h2><p>جميع ألعاب الدرس موجودة داخل مركز الألعاب. تم توحيد الصفحة لمنع تكرار الألعاب أسفل المركز.</p><a class="btn primary" target="_blank" rel="noopener" href="'+href+'">🎮 فتح مركز الألعاب الكامل</a>'}return '<div class="empty">لا توجد ألعاب مخصصة لهذا الدرس بعد.</div>'}`;
const files=`function files(){const f=d.files||{},L={interactive:['📘','الدرس التفاعلي','ابدأ الدرس'],reference:['📄','المرجع التعليمي','افتح المرجع'],assessment:['📝','التقييم الرسمي','ابدأ التقييم'],quiz:['💻','الاختبار التفاعلي','افتح الاختبار'],games:['🎮','التدريب والألعاب','ابدأ التحدي']},e=Object.entries(f).filter(([,v])=>v);if(!e.length)return '<div class="empty">لا توجد ملفات مرتبطة بهذا الدرس بعد.</div>';return '<h2>📁 ملفات الدرس</h2><p>كل الملفات المرتبطة بهذا الدرس كما هي محددة في بياناته.</p><div class="files">'+e.map(([k,v])=>{const x=L[k]||['📎',k,'فتح الملف'];return '<article class="file"><div class="icon">'+x[0]+'</div><div>'+esc(x[1])+'</div><a href="'+esc(v)+'">'+esc(x[2])+' ↗</a></article>'}).join('')+'</div>'}`;
s=replaceFn(s,'games',games);s=replaceFn(s,'files',files);fs.writeFileSync(p,s,'utf8');