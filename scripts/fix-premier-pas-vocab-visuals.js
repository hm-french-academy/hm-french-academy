const fs=require('fs');
const path='preparatory-french-starter-v2.html';
let html=fs.readFileSync(path,'utf8');
const css=`.vocab-visual{height:118px;border-radius:14px;margin-bottom:9px;overflow:hidden;display:grid;place-items:center;background:#f5f8fd;border:1px solid #dce5f2;cursor:pointer;transition:.2s;user-select:none}.vocab-visual:hover{transform:translateY(-2px);box-shadow:0 8px 18px #14264a18}.vocab-visual img{width:100%;height:100%;object-fit:cover;display:block}.vocab-visual .scene{font-size:46px;line-height:1}.word.has-visual{padding:10px}.word.has-visual strong{margin-top:2px}.visual-button{border:0;background:transparent;padding:0;width:100%;font:inherit;cursor:pointer}`;
if(!html.includes('.vocab-visual{')) html=html.replace('</style>',css+'</style>');
const openmoji='https://unpkg.com/openmoji@15.1.0/color/svg/';
const visuals={
'Bonjour':openmoji+'1F44B.svg','Salut':openmoji+'1F44B.svg','Merci':openmoji+'1F64F.svg','Bonsoir':openmoji+'1F319.svg','français':'https://flagcdn.com/w640/fr.png','famille':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Family_photo_collection.jpg','école':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Face_of_the_School_building.jpg','ami':openmoji+'1F465.svg','gâteau':openmoji+'1F370.svg','piscine':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Swimming_pool.jpg','croissant':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Croissant.jpg','café':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Coffee_Cup.jpg',
'algèbre':openmoji+'2797.svg','zéro':openmoji+'0030-20E3.svg','alcool':openmoji+'1F37A.svg','Bonjour !':openmoji+'1F44B.svg','Comment ça va ?':openmoji+'1F4AC.svg','Ça va bien.':openmoji+'1F60A.svg','Je m’appelle…':openmoji+'1F64B.svg','J’ai 11 ans.':openmoji+'1F382.svg','J’aime le français.':openmoji+'2764-FE0F.svg','Au revoir !':openmoji+'1F44B.svg'
};
const mapLiteral=JSON.stringify(visuals);
const start=html.indexOf('function wordsHtml(ws){');
const end=html.indexOf('function render(){',start);
if(start<0||end<0) throw new Error('wordsHtml/render anchors not found');
const replacement=`function visualFor(term){const m=${mapLiteral};return m[term]||''}function wordsHtml(ws){return '<div class="filters"><button class="filter active" id="allWords">كل الكلمات</button><button class="filter" id="knownWords">أعرفها ('+state.known.length+')</button><button class="filter" id="reviewWords">أحتاج مراجعة ('+state.review.length+')</button><button class="filter" id="flashBtn">🃏 بطاقات المراجعة</button></div><div class="words" id="wordGrid">'+ws.map((x,n)=>'<div class="word has-visual"><button class="visual-button speak" data-speak="'+x[0].replaceAll('"','&quot;')+'" aria-label="استمع إلى '+x[0].replaceAll('"','&quot;')+'"><div class="vocab-visual">'+(visualFor(x[0])?'<img src="'+visualFor(x[0])+'" alt="صورة توضيحية لـ '+x[0].replaceAll('"','&quot;')+'" loading="eager" referrerpolicy="no-referrer">':'<div class="scene">✨</div>')+'</div></button><strong>'+x[0]+'</strong><small>'+x[1]+'</small><button class="speak" data-speak="'+x[0].replaceAll('"','&quot;')+'">🔊 استمع</button><div class="actions" style="justify-content:center"><button class="filter know" data-word="'+x[0]+'">✓ أعرفها</button><button class="filter need" data-word="'+x[0]+'">↻ مراجعة</button></div></div>').join('')+'</div>'}`;
html=html.slice(0,start)+replacement+html.slice(end);
fs.writeFileSync(path,html,'utf8');

// Also harden the published Premier Pas page without replacing its existing rich content.
const finalPath='preparatory-french-starter-final.html';
if(fs.existsSync(finalPath)){
  let finalHtml=fs.readFileSync(finalPath,'utf8');
  const before=finalHtml;
  finalHtml=finalHtml.replace('<h1>استكشف Le Français Simple</h1>','<h1>استكشف la langue française</h1>');
  finalHtml=finalHtml.replace("KEY='hmPremierPasFinalV10';","KEY='hmPremierPasFinalV11';");
  finalHtml=finalHtml.replace("let i=+localStorage.getItem(KEY+'Step')||0,known=JSON.parse(localStorage.getItem(KEY+'Known')||'[]'),review=JSON.parse(localStorage.getItem(KEY+'Review')||'[]'),xp=+localStorage.getItem(KEY+'XP')||0,cat='all';","function safeJSON(key,fallback){try{const raw=localStorage.getItem(key);if(!raw)return fallback;const v=JSON.parse(raw);return Array.isArray(v)?v:fallback}catch(e){localStorage.removeItem(key);return fallback}}let i=Number(localStorage.getItem(KEY+'Step'))||0,known=safeJSON(KEY+'Known',[]),review=safeJSON(KEY+'Review',[]),xp=Number(localStorage.getItem(KEY+'XP'))||0,cat='all';");
  finalHtml=finalHtml.replace("$('closeFlash').onclick=()=>$('flash').classList.remove('open');render()})();","$('closeFlash').onclick=()=>$('flash').classList.remove('open');try{render()}catch(e){console.error(e);$('content').innerHTML='<div class=\"panel\"><h2>تعذر تشغيل محتوى الرحلة</h2><p>حدث خطأ مؤقت في تشغيل المحتوى. أعد فتح الصفحة وسيتم تحميل النسخة الآمنة.</p></div>'}})();");
  if(finalHtml!==before) fs.writeFileSync(finalPath,finalHtml,'utf8');
  console.log('Premier Pas final page title/runtime hardening applied:',finalHtml!==before);
}
console.log('Premier Pas vocabulary cards upgraded with browser-safe image CDN URLs in '+path);
