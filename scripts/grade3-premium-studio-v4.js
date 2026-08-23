(()=>{'use strict';
const q=new URLSearchParams(location.search),id=q.get('id')||q.get('lesson')||'';
const lessons={
'g3-l01':['Introduction','التعريف والتهيئة','01_Introduction/01_interactif_introduction.html','01_Introduction/04_examen_introduction.html'],
'g3-l02':['En classe','في الفصل','02_En_classe/01_interactif_enclasse.html','02_En_classe/04_examen_enclasse.html'],
'g3-l03':['Actes et verbes','الأفعال والأنشطة','03_Actes_et_verbes/01_interactif_actesverbes.html','03_Actes_et_verbes/04_examen_actesverbes.html'],
'g3-l04':['C’est ma classe','هذا فصلي','04_Unite1_Cest_ma_classe/01_interactif_maclasse.html','04_Unite1_Cest_ma_classe/04_examen_maclasse.html'],
'g3-l05':['C’est ma maison','هذا منزلي','05_Unite2_Cest_ma_maison/01_interactif_maison.html','05_Unite2_Cest_ma_maison/04_examen_maison.html'],
'g3-l06':['Fruits et légumes','الفواكه والخضروات','06_Unite3_Fruits_et_legumes/01_interactif_fruits.html','06_Unite3_Fruits_et_legumes/04_examen_fruits.html']};
const L=lessons[id],V=document.getElementById('viewer'),J=document.getElementById('journey'),T=document.getElementById('tabs');
if(!L||!V||!J||!T){if(V)V.innerHTML='<div class="g3panel"><h2>الدرس غير متاح</h2><p>معرف الدرس غير صالح.</p></div>';return;}
const [fr,ar,src,exam]=L;
const base=new URL('data/lessons/grade-3/web/3eme%20prim/',document.baseURI).href;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function speak(t){if(window.HMSpeech&&typeof window.HMSpeech.speak==='function')return window.HMSpeech.speak(t,'fr-FR');if('speechSynthesis'in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='fr-FR';u.rate=.85;speechSynthesis.speak(u);}}
const sections=[['lesson','📘 الدرس'],['vocabulary','🖼️ المفردات'],['grammar','📖 القواعد'],['conversation','💬 المحادثة'],['practice','✍️ التدريب'],['pronunciation','🎧 النطق'],['media','📁 الوسائط'],['assessment','🏆 التقييم'],['progress','📈 التقدم']];
document.getElementById('unit').textContent='Le français pour vous · 3e année · PREMIUM';
document.getElementById('title').textContent=ar+' · '+fr;
document.getElementById('subtitle').textContent='رحلة تعلم مؤلفة من المحتوى الأصلي للدرس';
J.innerHTML=sections.map((x,i)=>'<button class="step" data-s="'+x[0]+'">'+(i+1)+'. '+x[1]+'</button>').join('');
T.innerHTML=sections.map(x=>'<button class="tab" data-s="'+x[0]+'">'+x[1]+'</button>').join('');
let text=[];
function loadSource(){return fetch(base+encodeURI(src)+'?v=20260823g3',{cache:'no-store'}).then(r=>r.ok?r.text():Promise.reject(r.status)).then(h=>{const d=new DOMParser().parseFromString(h,'text/html');d.querySelectorAll('script,style,noscript').forEach(x=>x.remove());text=[...d.querySelectorAll('h1,h2,h3,h4,p,li,button,label,.fr,.ar')].map(x=>x.textContent.replace(/\s+/g,' ').trim()).filter(x=>x.length>2&&x.length<180);return true;}).catch(()=>false);}
const box=(tag,h,p)=>'<div class="g3std"><div class="g3panel"><small>'+tag+'</small><h2>'+h+'</h2><p>'+p+'</p></div>';
const frame=p=>'<div class="g3src"><iframe src="'+esc(base+encodeURI(p))+'" title="'+esc(fr)+'"></iframe></div></div>';
const values=()=>[...new Set(text.filter(x=>/[A-Za-zÀ-ÿ]/.test(x)))].slice(0,16);
function render(sec){
J.querySelectorAll('[data-s]').forEach(b=>b.classList.toggle('active',b.dataset.s===sec));T.querySelectorAll('[data-s]').forEach(b=>b.classList.toggle('active',b.dataset.s===sec));
if(sec==='lesson'){V.innerHTML=box('01 · EXPLORE','🚀 '+fr,'المحتوى الأصلي للدرس داخل Premium Lesson Studio.')+frame(src);return;}
if(sec==='media'){V.innerHTML=box('07 · MEDIA','📁 الوسائط','الوسائط الأصلية للدرس.')+frame(src);return;}
if(sec==='assessment'){V.innerHTML=box('08 · ASSESSMENT','🏆 التقييم الرسمي','التقييم مستقل عن التدريب.')+frame(exam);return;}
if(sec==='progress'){const k='hm:g3:'+id+':progress',d=JSON.parse(localStorage.getItem(k)||'{}');V.innerHTML=box('09 · PROGRESS','📈 التقدم','تقدم مستقل لهذا الدرس.')+'<div class="g3card"><h3>'+esc(fr)+'</h3><p id="status">'+(d.complete?'✅ مكتمل':'⏳ غير مكتمل')+'</p><button class="g3btn" id="complete">تسجيل إكمال الدرس</button></div></div>';V.querySelector('#complete').onclick=()=>{localStorage.setItem(k,JSON.stringify({complete:true,at:new Date().toISOString()}));V.querySelector('#status').textContent='✅ مكتمل'};return;}
const names={vocabulary:['02 · LEARN','🖼️ المفردات','مفردات من المادة الأصلية مع نطق مستقل.','نطق الكلمة'],grammar:['03 · UNDERSTAND','📖 القواعد','شرح وأمثلة من الدرس الحالي فقط.','استمع'],conversation:['04 · SPEAK','💬 المحادثة','عبارات الحوار الأصلية مع تشغيل صوتي مستقل.','استمع'],practice:['05 · PRACTICE','✍️ التدريب','تدريب مستقل لا يخلط مع التقييم.','استمع'],pronunciation:['06 · PRONUNCIATION','🎧 النطق','تشغيل مستقل للعبارات والأمثلة.','استمع']}[sec];
const a=values();V.innerHTML=box(names[0],names[1],names[2])+'<div class="g3cards">'+(a.length?a:['المحتوى قيد التجهيز.']).map(x=>'<article class="g3card"><div class="g3pill">'+esc(x)+'</div><br><button class="g3btn" data-sp="'+esc(x)+'">🔊 '+names[3]+'</button></article>').join('')+'</div></div>';V.querySelectorAll('[data-sp]').forEach(b=>b.onclick=()=>speak(b.dataset.sp));}
J.onclick=e=>{const b=e.target.closest('[data-s]');if(b)render(b.dataset.s)};T.onclick=e=>{const b=e.target.closest('[data-s]');if(b)render(b.dataset.s)};
render('lesson');
loadSource();
})();