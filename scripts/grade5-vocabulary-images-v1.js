(()=>{'use strict';
const esc=v=>String(v??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
const L02={
  'un stylo':'un-stylo.svg','une gomme':'une-gomme.svg','des stylos':'des-stylos.svg',
  'le stylo':'le-stylo.svg','la gomme':'la-gomme.svg','l\'animal':'lanimal.svg','l’animal':'lanimal.svg','les stylos':'les-stylos.svg'
};
function enhance(){document.querySelectorAll('.vocab .vocab-image').forEach(el=>{
  if(el.dataset.enhanced||el.querySelector('img')){el.dataset.enhanced='1';return;}
  const card=el.closest('.vocab'),word=card?.querySelector('.fr-word')?.textContent?.trim()||'';
  if(!L02[word])return;
  el.dataset.enhanced='1';el.classList.add('vocab-illustration');
  const img=document.createElement('img');img.src=`data/lessons/grade-5/assets/vocab/${L02[word]}?v=20260821-l02`;img.alt=word;img.loading='eager';img.decoding='async';
  el.replaceChildren(img);
});}
function css(){if(document.getElementById('g5vocabimg'))return;const s=document.createElement('style');s.id='g5vocabimg';s.textContent='.vocab-image.vocab-illustration{display:flex;align-items:center;justify-content:center;min-height:170px;overflow:hidden;background:linear-gradient(135deg,#eef4ff,#f8fbff 55%,#eef8f5);border:1px solid #dce7f4;border-radius:18px}.vocab-image.vocab-illustration img{display:block;width:100%;height:170px;object-fit:contain;padding:12px}.vocab{overflow:hidden}.vocab-image{position:relative}';document.head.appendChild(s)}
css();enhance();new MutationObserver(enhance).observe(document.body,{childList:true,subtree:true});
})();
