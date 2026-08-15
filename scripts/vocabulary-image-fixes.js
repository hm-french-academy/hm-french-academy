(function(){'use strict';
const FIX={
'Une cour':['🏫','فناء المدرسة'],
'Un CDI':['🖥️','مركز الوسائط'],
'Une bibliothèque':['📚','مكتبة المدرسة'],
'Un jardin':['🌿','حديقة المدرسة'],
'Des bancs / Un banc':['🪵','مقعد'],
'Une chaise':['🪑','كرسي'],
'Une table':['🪵','منضدة'],
'Un bureau':['🗃️','مكتب'],
'Un panneau':['🪧','لوحة إرشادية'],
'Un tableau':['📋','سبورة'],
'Une horloge':['🕐','ساعة حائط'],
'Un TNI':['🖥️','سبورة تفاعلية'],
'Un terrain de sport':['⚽','ملعب الرياضة'],
'Une piscine':['🏊','حمام السباحة'],
'Un laboratoire':['🧪','معمل العلوم'],
'Une cantine':['🍽️','مقصف المدرسة'],
'Un self-service':['🍴','قاعة الطعام']
};
function apply(){document.querySelectorAll('#viewer .card').forEach(card=>{const w=card.querySelector('.fr');const p=card.querySelector('.pic');if(!w||!p)return;const hit=FIX[w.textContent.trim()];if(!hit)return;p.innerHTML='<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;height:100%"><span style="font-size:58px;line-height:1">'+hit[0]+'</span><small style="font-size:11px;color:#68758b">'+hit[1]+'</small></div>';});}
function hook(){document.querySelectorAll('[data-t="vocabulary"],[data-j="vocabulary"]').forEach(b=>b.addEventListener('click',()=>setTimeout(apply,0)));if(new URLSearchParams(location.search).get('section')==='vocabulary')setTimeout(apply,80);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',hook);else hook();
window.HMVocabularyImageFixes={apply};
})();
