(function(){'use strict';
const ID='grade8-u3-l4';
if(new URLSearchParams(location.search).get('id')!==ID)return;
function asset(p){try{return new URL(p.replace(/^\//,''),document.baseURI).href}catch(e){return p}}
function fixImages(root){(root||document).querySelectorAll('img').forEach(function(img){const raw=img.getAttribute('src')||'';if(!raw)return;if(raw.indexOf('assets/')>=0)img.src=asset(raw.replace(/^.*?(assets\/)/,'$1'));img.onerror=function(){img.removeAttribute('onerror');img.style.visibility='hidden';};});}
function nav(){
 const journey=document.getElementById('journey'); if(journey){journey.innerHTML='';journey.style.display='none';}
 const tabs=document.getElementById('tabs'); if(!tabs)return;
 const names={'vocabulary':'المفردات','pronunciation':'النطق','grammar':'القواعد','conversation':'المحادثة','practice':'التدريب','video':'فيديو الدرس','reference':'المرجع التعليمي','assessment':'التقييم التفاعلي','games':'مركز الألعاب','files':'ملفات الدرس'};
 tabs.querySelectorAll('[data-key],button,.tab').forEach(function(el){const k=el.dataset.key||el.dataset.section||el.getAttribute('data-tab');if(k&&names[k])el.textContent=names[k];});
}
function polish(){
 const s=document.createElement('style');s.id='u3l4-stabilizer-style';s.textContent='.u3l4-stable #viewer{background:#f7f9fd}.u3l4-stable .u3f-hero{box-shadow:0 10px 30px rgba(20,38,74,.08)}.u3l4-stable .u3f-card{box-shadow:0 8px 24px rgba(20,38,74,.07)}.u3l4-stable .u3f-option{display:block;min-height:46px}.u3l4-stable #u3f-result{font-size:18px}.u3l4-stable .u3f-table{background:#fff;border-radius:14px;overflow:hidden}.u3l4-stable .u3f-table th{font-weight:900}.u3l4-stable .u3f-img{object-fit:contain!important;max-width:100%;background:#fff}.u3l4-stable .tabs{position:sticky;top:64px;z-index:8}.u3l4-stable .tabs:before{content:'أقسام الدرس';font-weight:900;color:#173a82;display:none}';document.head.appendChild(s);document.body.classList.add('u3l4-stable');}
function run(){polish();nav();fixImages(document.getElementById('viewer'));}
new MutationObserver(function(){run()}).observe(document.body,{childList:true,subtree:true});
window.addEventListener('load',run);document.addEventListener('DOMContentLoaded',run);setTimeout(run,300);setTimeout(run,1200);
})();
