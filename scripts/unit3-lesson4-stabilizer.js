(function(){'use strict';
const ID='grade8-u3-l4';
if(new URLSearchParams(location.search).get('id')!==ID)return;
const WORDS={
 'a.svg':['à','إلى / في'],
 'en.svg':['en','بـ / في'],
 'ou.svg':['où','أين'],
 'quand.svg':['quand','متى'],
 'comment.svg':['comment','كيف'],
 'pourquoi.svg':['pourquoi','لماذا'],
 'gare.svg':['gare','محطة قطار'],
 'avion.svg':['avion','طائرة']
};
function asset(p){try{return new URL('./'+p.replace(/^\/+/,''),location.href).href}catch(e){return p}}
function fallbackSvg(word,meaning){return 'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 560"><rect width="900" height="560" rx="42" fill="#eef4ff"/><circle cx="450" cy="230" r="145" fill="#2563eb" opacity=".12"/><text x="450" y="270" text-anchor="middle" font-family="Arial,sans-serif" font-size="150" font-weight="700" fill="#173a82">'+word+'</text><text x="450" y="405" text-anchor="middle" font-family="Arial,sans-serif" font-size="42" fill="#52627d">'+meaning+'</text></svg>')}
function fallbackFor(src){const name=(src.split('/').pop()||'').toLowerCase();return WORDS[name]||['','']}
function fixImages(root){
 (root||document).querySelectorAll('img').forEach(function(img){
   const raw=img.getAttribute('src')||'';
   if(!raw||raw.startsWith('data:'))return;
   if(raw.indexOf('assets/vocabulary/unit3/')<0)return;
   const key=raw.slice(raw.indexOf('assets/vocabulary/unit3/'));
   img.dataset.u3l4Asset=key;
   img.src=asset(key);
   img.loading='eager';img.decoding='sync';
   img.style.cssText='display:block;width:100%;max-width:520px;min-height:250px;height:300px;object-fit:contain;margin:12px auto;border-radius:18px;background:#fff';
   img.onerror=function(){
     const pair=fallbackFor(key); if(!pair[0])return;
     img.onerror=null;img.src=fallbackSvg(pair[0],pair[1]);img.dataset.u3l4Fallback='1';
   };
 });
}
function nav(){
 const journey=document.getElementById('journey');if(journey){journey.innerHTML='';journey.style.display='none';}
 const tabs=document.getElementById('tabs');if(!tabs)return;
 const names={'vocabulary':'المفردات','pronunciation':'النطق','grammar':'القواعد','conversation':'المحادثة','practice':'التدريب','video':'فيديو الدرس','reference':'المرجع التعليمي','assessment':'التقييم التفاعلي','games':'مركز الألعاب','files':'ملفات الدرس'};
 tabs.querySelectorAll('[data-key],button,.tab').forEach(function(el){const k=el.dataset.key||el.dataset.section||el.getAttribute('data-tab');if(k&&names[k])el.textContent=names[k];});
}
function polish(){
 if(document.getElementById('u3l4-stabilizer-style'))return;
 const s=document.createElement('style');s.id='u3l4-stabilizer-style';s.textContent='.u3l4-stable #viewer{background:#f7f9fd}.u3l4-stable .u3f-img{object-fit:contain!important;max-width:100%;background:#fff}.u3l4-stable .tabs{position:sticky;top:64px;z-index:8}.u3l4-stable #journey{display:none!important}';document.head.appendChild(s);document.body.classList.add('u3l4-stable');
}
function run(){polish();nav();fixImages(document.getElementById('viewer'));}
const mo=new MutationObserver(function(){run()});mo.observe(document.body,{childList:true,subtree:true});
window.addEventListener('load',run);document.addEventListener('DOMContentLoaded',run);setTimeout(run,300);setTimeout(run,1200);setTimeout(run,2500);
})();
