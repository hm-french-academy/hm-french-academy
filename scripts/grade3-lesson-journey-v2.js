(()=>{'use strict';
const id=new URLSearchParams(location.search).get('id')||'g3-l01';
const R={'g3-l01':['التعريف والتهيئة','Introduction','01_Introduction','01_interactif_introduction.html','04_examen_introduction.html'],'g3-l02':['في الفصل','En classe','02_En_classe','01_interactif_enclasse.html','04_examen_enclasse.html'],'g3-l03':['الأفعال والأنشطة','Actes et verbes','03_Actes_et_verbes','01_interactif_actesverbes.html','04_examen_actesverbes.html'],'g3-l04':['هذا فصلي','C’est ma classe','04_Unite1_Cest_ma_classe','01_interactif_maclasse.html','04_examen_maclasse.html'],'g3-l05':['هذا منزلي','C’est ma maison','05_Unite2_Cest_ma_maison','01_interactif_maison.html','04_examen_maison.html'],'g3-l06':['الفواكه والخضروات','Fruits et légumes','06_Unite3_Fruits_et_legumes','01_interactif_fruits.html','04_examen_fruits.html']};
const d=R[id]||R['g3-l01'];
const apiBase='https://api.github.com/repos/hm-french-academy/hm-french-academy/contents/data/lessons/grade-3/web/3eme%20prim/';
const rawBase='https://raw.githubusercontent.com/hm-french-academy/hm-french-academy/main/data/lessons/grade-3/web/3eme%20prim/';
const tabs=[['start','🚀 البداية'],['vocab','🖼️ المفردات'],['pron','🎧 النطق'],['grammar','📘 القواعد'],['conversation','💬 المحادثة'],['practice','✍️ التدريب'],['media','🎬 الفيديو'],['games','🎮 مركز الألعاب'],['smart','🧠 المراجعة الذكية'],['assessment','🏆 التقييم'],['progress','📈 التقدم']];
let blocks=[],$=s=>document.querySelector(s),txt=e=>(e?.textContent||'').replace(/\s+/g,' ').trim();
function dec(s){const b=atob(s.replace(/\s/g,'')),a=new Uint8Array(b.length);for(let i=0;i<b.length;i++)a[i]=b.charCodeAt(i);return new TextDecoder().decode(a)}
async function load(){
  const u=apiBase+encodeURIComponent(d[2])+'/'+encodeURIComponent(d[3])+'?ref=main';
  const r=await fetch(u,{cache:'no-store',headers:{Accept:'application/vnd.github+json'}});
  if(!r.ok)throw Error('تعذر الوصول إلى مصدر الدرس (HTTP '+r.status+')');
  const j=await r.json();
  if(!j.content)throw Error('مصدر الدرس فارغ');
  const doc=new DOMParser().parseFromString(dec(j.content),'text/html');
  blocks=[...doc.querySelectorAll('section.block')];
  if(!blocks.length)blocks=[...doc.querySelectorAll('.block')];
  if(!blocks.length)throw Error('لم يتم العثور على أقسام المحتوى في المصدر الأصلي');
}
function kind(b,i){
  const head=txt(b.querySelector('.block-head'))||'';
  const x=(head+' '+txt(b)).toLowerCase();
  if(b.querySelector('video,iframe,.video-frame')||/vidéo|video|chanson|film|multimédia/.test(x))return'media';
  if(/pronon|phonétique|écoute|répète|son|audio/.test(x))return'pron';
  if(/grammaire|conjugaison|règle|structure|être|avoir|il y a|il n'y a pas/.test(x))return'grammar';
  if(/dialogue|conversation|communiquer|parler|situation|jouons/.test(x))return'conversation';
  if(/vocabulaire|lexique|mots|nom|prénom|âge|humeur/.test(x))return'vocab';
  if(/exercice|activité|entraînement|quiz|complète|associe|relie|vrai|faux|jeu/.test(x))return'practice';
  return i===0?'start':'practice';
}
function clean(b){
  const w=document.createElement('div');w.innerHTML=b.innerHTML;
  w.querySelectorAll('script,noscript,.block-head').forEach(e=>e.remove());
  const sourceDir=rawBase+encodeURIComponent(d[2])+'/';
  w.querySelectorAll('[src],[poster]').forEach(el=>{
    for(const attr of ['src','poster']){
      const s=el.getAttribute(attr);if(!s||/^(https?:|data:|blob:)/i.test(s))continue;
      try{el.setAttribute(attr,new URL(s,sourceDir).href)}catch{}
    }
  });
  w.querySelectorAll('a[href]').forEach(a=>{const h=a.getAttribute('href');if(!h||/^(https?:|mailto:|tel:|#|javascript:)/i.test(h))return;try{a.href=new URL(h,sourceDir).href}catch{}});
  return w.innerHTML;
}
function groups(){const g={start:[],vocab:[],pron:[],grammar:[],conversation:[],practice:[],media:[]};blocks.forEach((b,i)=>g[kind(b,i)].push(b));return g}
function shell(title,body){$('#viewer').innerHTML='<div class="section-head"><span>'+title+'</span><small>'+d[1]+'</small></div>'+body}
function render(k){const g=groups(),a=g[k]||[],list=a.length?a:(k==='start'?blocks.slice(0,1):[]);shell(tabs.find(x=>x[0]===k)[1],list.length?list.map((b,i)=>'<article class="lesson-card"><div class="card-index">'+String(i+1).padStart(2,'0')+'</div>'+clean(b)+'</article>').join(''):'<div class="empty">لا يوجد محتوى مستقل مصنف هنا في المصدر الأصلي.</div>')}
function games(){const g=groups(),w=[];g.vocab.forEach(b=>b.querySelectorAll('.fr,.word,.term,.stamp .fr').forEach(e=>{const t=txt(e);if(t&&t.length<60&&!w.includes(t))w.push(t)}));if(!w.length){shell('🎮 مركز الألعاب','<div class="empty">لا توجد مفردات قابلة للاستخدام في اللعبة.</div>');return}let n=0,score=0;function q(){const a=w[n%w.length],o=[a,...w.filter(x=>x!==a).sort(()=>Math.random()-.5).slice(0,3)].sort(()=>Math.random()-.5);shell('🎮 مركز الألعاب','<article class="game-card"><h2>اختبر نفسك</h2><div class="game-word">'+a+'</div><p>اختر الإجابة الصحيحة</p><div class="choices">'+o.map(x=>'<button>'+x+'</button>').join('')+'</div><p>النتيجة: '+score+'</p></article>');$('#viewer').querySelectorAll('.choices button').forEach(b=>b.onclick=()=>{if(b.textContent===a){score++;b.textContent='✓ صحيح';setTimeout(()=>{n++;q()},300)}else b.textContent='✕ حاول مرة أخرى'})}q()}
function media(){const g=groups();shell('🎬 الفيديو',g.media.length?g.media.map(b=>'<article class="lesson-card">'+clean(b)+'</article>').join(''):'<div class="empty">لا يوجد فيديو مستقل داخل المصدر الأصلي.</div>')}
function smart(){shell('🧠 المراجعة الذكية','<article class="assessment-card"><h2>المراجعة الذكية</h2><p>مراجعة مستقلة للدرس الحالي، خارج صفحات رحلة الدرس.</p><a class="primary" target="_blank" href="grade3-smart-review.html?lesson='+id+'">فتح المراجعة الذكية ↗</a></article>')}
function assessment(){const href=apiBase+encodeURIComponent(d[2])+'/'+encodeURIComponent(d[4])+'?ref=main';shell('🏆 التقييم','<article class="assessment-card"><h2>التقييم الرسمي للدرس</h2><p>التقييم المرتبط مباشرة بالدرس.</p><a class="primary" target="_blank" rel="noopener" href="'+href+'">فتح التقييم ↗</a></article>')}
function progress(){const done=localStorage.getItem('hm-progress-'+id)==='completed';shell('📈 التقدم','<article class="assessment-card"><h2>'+(done?'🏆 الدرس مكتمل':'📚 الدرس قيد التعلم')+'</h2><p>حالة الدرس: <b>'+(done?'مكتمل':'لم يُستكمل بعد')+'</b></p><button class="primary" id="finish">تم الانتهاء من الدرس</button></article>');$('#finish').onclick=()=>{localStorage.setItem('hm-progress-'+id,'completed');progress()}}
function show(k){document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active',b.dataset.k===k));if(k==='games')games();else if(k==='media')media();else if(k==='smart')smart();else if(k==='assessment')assessment();else if(k==='progress')progress();else render(k)}
(async()=>{try{await load();$('#title').textContent=d[0]+' · '+d[1];$('#tabs').innerHTML=tabs.map(x=>'<button class="tab" data-k="'+x[0]+'">'+x[1]+'</button>').join('');$('#tabs').style.position='sticky';$('#tabs').style.top='8px';$('#tabs').style.zIndex='30';document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>show(b.dataset.k));show('start')}catch(e){shell('⚠️ الدرس','<div class="empty"><h2>تعذر تحميل محتوى الدرس</h2><p>'+e.message+'</p></div>')}})();
})();