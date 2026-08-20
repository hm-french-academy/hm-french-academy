// HM Academy — compatibility loader for the unified i18n runtime.
// Older pages load this file through scripts/app.js; newer/root pages may load scripts/i18n.js directly.
(function(){
  function ensure(){
    if(window.HMLanguage && typeof window.HMLanguage.apply==='function') return;
    if(document.querySelector('script[data-hm-unified-i18n]')) return;
    const s=document.createElement('script');
    s.src='scripts/i18n.js?v=20260820-i18n-unified';
    s.dataset.hmUnifiedI18n='1';
    document.head.appendChild(s);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',ensure,{once:true});
  else ensure();
})();
