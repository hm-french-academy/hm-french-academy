(function(){'use strict';
function guard(){document.querySelectorAll('.card .pic').forEach(function(p){var card=p.closest('.card');var f=card&&card.querySelector('.fr');if(!f)return;var word=f.textContent.trim();if(!word)return;p.dataset.semanticV1=word;p.dataset.semanticV2=word;});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',guard);else guard();
})();
