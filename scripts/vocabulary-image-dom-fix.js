/* HM Academy — DOM-level vocabulary image repair */
(function(){'use strict';
const U3={
'assets/vocabulary/unit3/a.svg':'إلى / في','assets/vocabulary/unit3/en.svg':'بـ / في','assets/vocabulary/unit3/ou.svg':'أين','assets/vocabulary/unit3/quand.svg':'متى','assets/vocabulary/unit3/comment.svg':'كيف','assets/vocabulary/unit3/pourquoi.svg':'لماذا','assets/vocabulary/unit3/gare.svg':'محطة قطار','assets/vocabulary/unit3/avion.svg':'طائرة'
};
function fix(){
 const root=document.getElementById('viewer')||document.body;
 root.querySelectorAll('*').forEach(el=>{
   if(el.children.length) return;
   const raw=(el.textContent||'').trim();
   const key=Object.keys(U3).find(k=>raw===k||raw.endsWith('/'+k));
   if(!key) return;
   const img=document.createElement('img');
   img.src='/'+key;
   img.alt=U3[key]; img.loading='eager'; img.decoding='async';
   img.style.cssText='display:block;width:100%;max-width:520px;height:260px;object-fit:contain;margin:auto;border-radius:18px';
   img.onerror=function(){this.style.display='none';};
   el.textContent=''; el.appendChild(img);
 };
 root.querySelectorAll('img').forEach(img=>{
   const src=img.getAttribute('src')||'';
   if(src.startsWith('assets/vocabulary/unit3/')) img.src='/'+src;
 });
}
function boot(){fix();const v=document.getElementById('viewer');if(v&&!v.dataset.hmDomImageFix){new MutationObserver(fix).observe(v,{childList:true,subtree:true});v.dataset.hmDomImageFix='1';}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
window.HMVocabularyDomFix={fix};
})();
