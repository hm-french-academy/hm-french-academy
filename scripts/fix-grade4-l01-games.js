const fs=require('fs');
const path='grade-4-l01-learning-studio.html';
let html=fs.readFileSync(path,'utf8');

function replaceBetween(startMarker,endMarker,replacement,label){
  const a=html.indexOf(startMarker);
  const b=html.indexOf(endMarker,a+startMarker.length);
  if(a<0||b<0) throw new Error(`Grade 4 patch marker missing: ${label}`);
  html=html.slice(0,a)+replacement+html.slice(b);
}

// 1) Restore the requested "انطق" page: seasonal order, word + pronunciation note,
//    no repeated examples. Keep the existing lesson vocabulary source intact.
const pronounce=`function renderPronounce(){
const groups=[
 {title:'🌷 Le printemps · الربيع',items:[
  ['Le printemps','printemps: p و s النهائيتان لا تُنطقان؛ النطق التقريبي: /pʁɛ̃.tɑ̃/.'],
  ['beau','eau = /o/؛ الحروف الأخيرة لا تُنطق.'],
  ['le ciel','ciel: c + i = /sj/ تقريبًا، والنهاية تُنطق /j/.'],
  ['bleu','eu صوت فرنسي واحد مع تدوير الشفتين؛ x النهائي لا يُنطق.'],
  ['les fleurs','eu صوت فرنسي واحد؛ s النهائية في fleurs لا تُنطق.']
 ]},
 {title:'☀️ L’été · الصيف',items:[
  ["L’été",'é = /e/، وt النهائية في été لا تُنطق.'],
  ['chaud','ch = /ʃ/، au = /o/؛ d النهائية لا تُنطق.'],
  ['le soleil','-eil يعطي صوتًا قريبًا من /ɛj/؛ l النهائية تُنطق.'],
  ['la plage','g قبل e = /ʒ/؛ النطق التقريبي: /plaʒ/.'],
  ['les arbres','r فرنسية؛ s النهائية في arbres لا تُنطق.']
 ]},
 {title:'🍂 L’automne · الخريف',items:[
  ['gris','g هنا /g/؛ s النهائية لا تُنطق.'],
  ['les feuilles','feuill تعطي صوتًا قريبًا من /fœj/؛ s النهائية لا تُنطق.'],
  ['les vents','s النهائية في vents لا تُنطق.']
 ]},
 {title:'❄️ L’hiver · الشتاء',items:[
  ['la pluie','ui صوت فرنسي مركب؛ e النهائية لا تُنطق.'],
  ['les vents','s النهائية لا تُنطق؛ انتبه إلى نطق /vɑ̃/.']
 ]}
];
return '<span class="tag">03 · انطق</span><h2>🎧 انطق — الكلمة وملاحظة النطق</h2><p class="muted">الكلمات مرتبة حسب الفصول، بدون تكرار الأمثلة. اضغط 🔊 لسماع الكلمة.</p>'+groups.map(g=>'<section class="card" style="margin-top:14px"><h3>'+g.title+'</h3><div class="vocabGrid">'+g.items.map(x=>'<article class="word"><div class="term"><span>'+x[0]+'</span>'+sp(x[0])+'</div><div class="note">'+x[1]+'</div></article>').join('')+'</div></section>').join('');
}
`;
replaceBetween('function renderPronounce(){','function renderUnderstand(){',pronounce,'pronounce');

// 2) Restore the stronger previous four-game center. Video and assessment are
//    deliberately outside this replacement and are therefore left untouched.
const games=`let game={tab:'race',score:0,round:0,memory:[],open:[],matched:[],order:[]};
const prompts=[
 ['Quel mois appartient à l’été ?',['Juillet','Janvier','Mars','Octobre'],'Juillet'],
 ['En hiver, il fait…',['froid','chaud','beau','mauvais'],'froid'],
 ['Quelle saison vient après le printemps ?',['L’été','L’hiver','L’automne','Le printemps'],'L’été'],
 ['On dit…',['en été','au été','en printemps','au automne'],'en été'],
 ['Quel mois appartient à l’automne ?',['Octobre','Juin','Février','Avril'],'Octobre'],
 ['La neige tombe en…',['hiver','été','printemps','automne'],'hiver'],
 ['On dit…',['au printemps','en printemps','au été','en printemps'],'au printemps'],
 ['Quel mois appartient au printemps ?',['Avril','Août','Décembre','Novembre'],'Avril']
];
function renderGames(){return '<span class="tag">07 · الألعاب</span><h2>🎮 مركز الألعاب — 4 ألعاب مختلفة</h2><p class="muted">كل لعبة لها فكرة وقاعدة وهدف مختلف.</p><div class="gameTabs">'+[['race','🏁 سباق الفصول'],['memory','🧠 ذاكرة الشهور'],['clues','🔎 من أنا؟'],['order','🔢 رتّب الفصول']].map(x=>'<button class="gameTab '+(game.tab===x[0]?'active':'')+'" onclick="setGame(\\''+x[0]+'\\')">'+x[1]+'</button>').join('')+'</div><div class="gamePanel" id="gamePanel"></div>'}
function setGame(t){game={tab:t,score:0,round:0,memory:[],open:[],matched:[],order:[]};renderGame()}
function renderGame(){const p=document.getElementById('gamePanel');if(!p)return;
if(game.tab==='race'){const x=prompts[game.round%prompts.length];p.innerHTML='<div class="gameScore">النقاط: '+game.score+' / '+game.round+'</div><div class="gamePrompt fr">'+x[0]+'</div><div class="cards">'+x[1].map(o=>'<button class="choice" onclick="race(\\''+o.replace(/'/g,"\\\\'")+'\\',\\''+x[2].replace(/'/g,"\\\\'")+'\\')">'+o+'</button>').join('')+'</div><p class="feedback" id="gf"></p>'}
else if(game.tab==='memory'){if(!game.memory.length){const a=seasons.flatMap(s=>s.months.map(m=>({m,s:s.fr}))).slice(0,8);game.memory=[...a.map(x=>({t:x.m,p:x.s,k:'m'+x.m})),...a.map(x=>({t:x.s,p:x.s,k:'s'+x.m}))].sort(()=>Math.random()-.5)}p.innerHTML='<div class="gameScore">مطابقات صحيحة: '+game.matched.length/2+' / 8</div><div class="memoryGrid">'+game.memory.map((c,i)=>'<button class="memoryCard '+(game.open.includes(i)||game.matched.includes(i)?'open':'')+'" onclick="mem('+i+')">'+(game.open.includes(i)||game.matched.includes(i)?c.t:'❓')+'</button>').join('')+'</div><p class="feedback">افتح بطاقتين وابحث عن الشهر والفصل المرتبط به.</p>'}
else if(game.tab==='clues'){const c=[['Je suis en juin, juillet et août. Qui suis-je ?','L’été'],['Je suis en septembre, octobre et novembre. Qui suis-je ?','L’automne'],['Je suis en décembre, janvier et février. Qui suis-je ?','L’hiver'],['Je suis en mars, avril et mai. Qui suis-je ?','Le printemps']][game.round%4];p.innerHTML='<div class="gameScore">النقاط: '+game.score+' / '+game.round+'</div><div class="gamePrompt fr">'+c[0]+'</div><div class="cards">'+seasons.map(s=>'<button class="choice" onclick="clue(\\''+s.fr.replace(/'/g,"\\\\'")+'\\',\\''+c[1].replace(/'/g,"\\\\'")+'\\')">'+s.ar+'</button>').join('')+'</div><p class="feedback" id="gf"></p>'}
else{if(!game.order.length)game.order=seasons.map(s=>s.k).sort(()=>Math.random()-.5);p.innerHTML='<div class="gameScore">اسحب البطاقات ورتب الفصول من بداية السنة إلى نهايتها.</div><div class="orderList" id="ol">'+game.order.map(k=>{const s=seasons.find(x=>x.k===k);return '<button class="orderItem" draggable="true" data-k="'+k+'">'+s.fr+'</button>'}).join('')+'</div><button class="btn" onclick="checkOrder()">تحقق من الترتيب</button><p class="feedback" id="gf"></p>';document.querySelectorAll('.orderItem').forEach(el=>{el.ondragstart=e=>e.dataTransfer.setData('text',el.dataset.k);el.ondragover=e=>e.preventDefault();el.ondrop=e=>{e.preventDefault();const k=e.dataTransfer.getData('text'),from=[...document.querySelectorAll('.orderItem')].find(x=>x.dataset.k===k);el.parentNode.insertBefore(from,el);game.order=[...document.querySelectorAll('.orderItem')].map(x=>x.dataset.k)}})}}
function race(v,a){if(v===a)game.score++;game.round++;renderGame()}
function clue(v,a){if(v===a)game.score++;game.round++;renderGame()}
function mem(i){if(game.open.includes(i)||game.open.length===2||game.matched.includes(i))return;game.open.push(i);renderGame();if(game.open.length===2){const a=game.memory[game.open[0]],b=game.memory[game.open[1]];setTimeout(()=>{if(a.p===b.p&&a.k[0]!==b.k[0])game.matched.push(game.open[0],game.open[1]);game.open=[];renderGame()},600)}}
function checkOrder(){document.getElementById('gf').textContent=JSON.stringify(game.order)===JSON.stringify(['spring','summer','autumn','winter'])?'🏆 ترتيب صحيح!':'❌ ليس هذا الترتيب، حاول مرة أخرى.'}
`;
replaceBetween('let gameScore=0;','function renderVideo(){',games,'games');

// 3) Replace only the lesson-files view. The four original files are shown
//    as previews/cards; no download button is used. Video and assessment are untouched.
const files=`function renderFiles(){const base='data/lessons/grade-4/source/4eme_Complet/01_Les_saisons/';const raw='https://hm-french-academy.github.io/hm-french-academy/'+base;const docs=[['01_interactif_les_saisons.html','📖 الدرس التفاعلي الأصلي','HTML · عرض مباشر',raw+'01_interactif_les_saisons.html','html'],['02_reference_les_saisons.docx','📚 مرجع الدرس الأصلي','DOCX · عرض منسق',raw+'02_reference_les_saisons.docx','docx'],['03_evaluation_les_saisons.docx','📝 ملف التقييم الأصلي','DOCX · عرض منسق',raw+'03_evaluation_les_saisons.docx','docx'],['04_examen_electronique_les_saisons.html','🏆 الاختبار الإلكتروني الأصلي','HTML · عرض مباشر',raw+'04_examen_electronique_les_saisons.html','html']];return '<span class="tag">09 · ملفات الدرس</span><h2>📚 ملفات الدرس الأصلية — عرض داخل الدرس</h2><p class="muted">الملفات الأصلية الأربعة للدرس معروضة داخل صفحة منظمة. لا يوجد تحميل مباشر.</p><div class="fileGrid">'+docs.map(d=>'<article class="fileCard"><h3>'+d[1]+'</h3><p class="muted">'+d[2]+'</p><iframe title="'+d[0]+'" src="'+(d[4]==='docx'?'https://docs.google.com/gview?embedded=1&url='+encodeURIComponent(d[3]):d[3])+'" style="width:100%;height:420px;border:1px solid #e5edf3;border-radius:16px;background:#fff"></iframe><p class="source">المصدر: '+d[0]+'</p></article>').join('')+'</div>'}
`;
replaceBetween('function renderFiles(){','function renderAssessment(){',files,'files');

// 4) Robust speech handling for every existing pronunciation button.
//    This is additive only and does not alter any lesson content or page layout.
const speech=`<script>(function(){function hmSpeak(text,button){text=String(text||'').trim();if(!text||!('speechSynthesis'in window)||typeof SpeechSynthesisUtterance==='undefined')return;const s=window.speechSynthesis;s.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='fr-FR';u.rate=.82;u.pitch=1;const vs=s.getVoices?s.getVoices():[];const v=vs.find(x=>/^fr[-_]?fr$/i.test(String(x.lang)))||vs.find(x=>/^fr[-_]/i.test(String(x.lang)));if(v)u.voice=v;u.onend=()=>button&&button.classList.remove('playing');if(button)button.classList.add('playing');try{s.resume()}catch(_){}s.speak(u)}document.addEventListener('click',function(e){const b=e.target.closest('.speak,[data-speak],[data-say]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();const text=b.dataset.speak?decodeURIComponent(b.dataset.speak):b.dataset.say||b.getAttribute('data-text')||b.textContent.replace('🔊','').trim();hmSpeak(text,b)},true)})();</script>`;
if(!html.includes('hmSpeak(text,button)')){
  html=html.replace('</body>',speech+'</body>');
}

fs.writeFileSync(path,html,'utf8');
console.log('Grade 4 Lesson 1 repaired: requested pronunciation page, previous four-game center, inline original-file previews, and robust speech. Video and assessment blocks were not modified.');
