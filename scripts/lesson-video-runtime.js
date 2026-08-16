(function(){'use strict';
const p=new URLSearchParams(location.search),id=p.get('id')||'';
const videos={
  'grade8-u1-l3':[
    {title:'Les matières scolaires',ar:'فيديو مفردات المواد الدراسية',url:'https://www.youtube.com/watch?v=Yq-BPKVN41g',id:'Yq-BPKVN41g',note:'فيديو تعليمي عن المواد الدراسية بالفرنسية مع عرض وتدريب سريع.'}
  ],
  'grade8-u1-l4':[
    {title:'Les professions',ar:'فيديو مفردات المهن',url:'https://www.youtube.com/watch?v=h5UP6DdXnJU',id:'h5UP6DdXnJU',note:'فيديو لمراجعة مفردات المهن بالفرنسية قبل التدريب.'},
    {title:"Il y a / Il n'y a pas de",ar:'فيديو قاعدة Il y a',url:'https://www.youtube.com/watch?v=jn7DT8pE16U',id:'jn7DT8pE16U',note:'فيديو يشرح استخدام Il y a ونفيها Il n’y a pas de / d’.'}
  ]
};
const list=videos[id];if(!list||!list.length)return;
function addStyle(){if(document.getElementById('hmLessonVideoStyle'))return;const s=document.createElement('style');s.id='hmLessonVideoStyle';s.textContent=`
.hm-video-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.hm-video-card{border:1px solid var(--line);border-radius:20px;padding:14px;background:#fff;box-shadow:0 7px 20px #14264a0b}
.hm-video-title{font-size:19px;font-weight:900;color:var(--nav);margin:0 0 8px}
.hm-video-ar{color:#315aa4;font-weight:900;margin:0 0 12px}
.hm-video-frame{position:relative;aspect-ratio:16/9;border-radius:16px;overflow:hidden;background:#0f172a}
.hm-video-frame iframe{width:100%;height:100%;border:0;display:block}
.hm-video-fallback{display:inline-block;margin-top:10px}
.hm-video-note{color:var(--muted);line-height:1.8;margin-top:10px}
@media(max-width:800px){.hm-video-grid{grid-template-columns:1fr}}
`;document.head.appendChild(s)}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function render(){
  const tabs=document.getElementById('tabs'),viewer=document.getElementById('viewer');
  if(!tabs||!viewer||tabs.dataset.hmVideoReady==='1')return false;
  const btn=document.createElement('button');btn.className='tab';btn.type='button';btn.dataset.hmVideoTab='1';btn.textContent='🎬 فيديو الدرس';
  tabs.insertBefore(btn,tabs.firstChild);
  btn.addEventListener('click',()=>{
    tabs.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));btn.classList.add('active');
    const html=`<div class="head"><h2>🎬 فيديو الدرس</h2><p>شاهد واستمع إلى الفيديوهات المرتبطة بهذا الدرس. يمكنك فتح الفيديو مباشرة على YouTube إذا تعذر تشغيله داخل الصفحة.</p></div><div class="content"><div class="hm-video-grid">${list.map(v=>`<article class="hm-video-card"><h3 class="hm-video-title">${esc(v.title)}</h3><p class="hm-video-ar">${esc(v.ar)}</p><div class="hm-video-frame"><iframe src="https://www.youtube.com/embed/${encodeURIComponent(v.id)}?rel=0" title="${esc(v.title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><a class="btn primary hm-video-fallback" target="_blank" rel="noopener" href="${esc(v.url)}">فتح الفيديو على YouTube ↗</a><div class="hm-video-note">${esc(v.note)}</div></article>`).join('')}</div></div>`;
    viewer.innerHTML=html;window.scrollTo({top:viewer.offsetTop-90,behavior:'smooth'});
  });
  tabs.dataset.hmVideoReady='1';addStyle();return true;
}
const timer=setInterval(()=>{if(render())clearInterval(timer)},150);
setTimeout(()=>clearInterval(timer),10000);
window.addEventListener('hm:languagechange',()=>{if(tabsReadyReset())setTimeout(render,50)});
function tabsReadyReset(){const tabs=document.getElementById('tabs');if(!tabs)return false;tabs.dataset.hmVideoReady='';return true}
})();
