/* HM Academy — Premier Pas final polish
 * Scoped to the enhanced Premier Pas iframe only.
 * Adds resilient accessibility, modal keyboard handling, speech fallback, and completion feedback.
 */
(function(){'use strict';
  if(location.pathname.split('/').pop()!=='preparatory-french-starter.html') return;
  const STYLE='hm-premier-pas-final-polish-style';
  if(document.getElementById(STYLE)) return;
  const s=document.createElement('style');s.id=STYLE;s.textContent=`
    .hm-vocab-card:focus-within{outline:2px solid #2563eb;outline-offset:2px}
    .hm-vocab-training{scroll-margin-top:20px}
    .hm-premier-pas-completion{margin:14px 0;padding:14px 16px;border:1px solid #bcd4ff;border-radius:16px;background:#f4f8ff;color:#173f8a;font-weight:900;line-height:1.8}
    .hm-premier-pas-completion[hidden]{display:none}
  `;document.head.appendChild(s);
  function announce(msg){let a=document.getElementById('hm-premier-pas-live');if(!a){a=document.createElement('div');a.id='hm-premier-pas-live';a.setAttribute('aria-live','polite');a.style.cssText='position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap';document.body.appendChild(a)}a.textContent=msg}
  function wireModal(){const m=document.querySelector('.hm-vocab-modal');if(!m||m.dataset.polished==='1')return;m.dataset.polished='1';m.setAttribute('aria-label','بطاقات مفردات Premier Pas');document.addEventListener('keydown',e=>{if(e.key==='Escape'&&m.classList.contains('open')){const b=m.querySelector('.hm-fc-close');if(b)b.click();announce('تم إغلاق بطاقات المفردات')}});}
  function wireButtons(){document.querySelectorAll('.hm-vocab-card button,.hm-vocab-toolbar button,.hm-training-option').forEach(b=>{if(b.dataset.a11y==='1')return;b.dataset.a11y='1';b.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();b.click()}})});}
  function completion(){const STORE='hm_premier_pas_vocab_progress_v1';let d={};try{d=JSON.parse(localStorage.getItem(STORE)||'{}')}catch(e){}const cards=[...document.querySelectorAll('.hm-vocab-card strong')].map(x=>x.textContent.trim()).filter(Boolean);if(!cards.length)return;const known=cards.filter(x=>d[x]==='known').length;let box=document.getElementById('hm-premier-pas-completion');if(!box){box=document.createElement('div');box.id='hm-premier-pas-completion';box.className='hm-premier-pas-completion';const host=document.querySelector('.content')||document.body;host.appendChild(box)}if(known===cards.length){box.hidden=false;box.textContent=`🏆 ممتاز! أتقنت ${known} من ${cards.length} مفردة في هذه المحطة. انتقل للمحطة التالية عندما تكون مستعدًا.`}else{box.hidden=true}}
  function run(){wireModal();wireButtons();completion();}
  const obs=new MutationObserver(run);obs.observe(document.body,{childList:true,subtree:true});run();
  window.addEventListener('load',()=>{if(!window.speechSynthesis)announce('النطق الصوتي غير متاح في هذا المتصفح. يمكنك متابعة التدريب بشكل طبيعي.')});
})();
