(()=>{'use strict';
const manifest='data/lessons/grade-5/lesson-media-manifest.json?v=20260819-31';
const p=()=>new URLSearchParams(location.search), id=()=>p().get('id')||'g5-t1-l01';
let map={};
function esc(v){return String(v??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]) )}
function patch(){const e=map[id()]; if(!e)return; const frame=document.querySelector('#viewer .video-frame'); if(!frame)return; if(frame.dataset.g5Bound===e.videoId)return; frame.dataset.g5Bound=e.videoId;
 frame.innerHTML=`<iframe src="${esc(e.youtube)}?rel=0" title="${esc(e.title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
 const card=frame.closest('.video-card'); if(card){let cap=card.querySelector('.video-caption'); if(cap){let old=cap.querySelector('.source-note'); if(!old){const a=document.createElement('a');a.className='source-note';a.href=e.watch;a.target='_blank';a.rel='noopener noreferrer';a.textContent='▶ مشاهدة الفيديو مباشرة على YouTube';cap.appendChild(a)}}}
 const note=document.querySelector('#loadNote'); if(note)note.textContent='🎬 فيديو الدرس متصل';
}
async function init(){try{const r=await fetch(manifest,{cache:'no-store'});if(!r.ok)return;const x=await r.json();(x.lessons||[]).forEach(e=>map[e.lessonId]=e);patch();const root=document.querySelector('#viewer');if(root){new MutationObserver(()=>patch()).observe(root,{childList:true,subtree:true});}setInterval(patch,800)}catch(e){}}
init();
})();