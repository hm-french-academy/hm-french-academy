(function(){
  'use strict';
  const labels={
    ar:{tagline:'تعليم اللغة الفرنسية'},
    fr:{tagline:'Enseignement du français'},
    en:{tagline:'French Language Education'}
  };
  const footerSignature='Fondateur : Hatem ElMorsi · © 2026';
  function render(lang){
    const l=labels[lang]||labels.ar;
    document.querySelectorAll('.hm-tagline').forEach(el=>el.textContent=l.tagline);
    document.querySelectorAll('.hm-footer-brand span').forEach(el=>el.textContent='French Language Education');
    document.querySelectorAll('.hm-footer-brand small').forEach(el=>el.textContent=footerSignature);
  }
  const current=()=>window.HMLanguage?.get?.()||localStorage.getItem('hm_display_language')||'ar';
  render(current());
  window.addEventListener('hm:languagechange',e=>render(e.detail?.lang||current()));
  if(/lesson\.html$/i.test(location.pathname)){
    const s=document.createElement('script');
    s.src='scripts/premium-lesson-enhancer.js?v=20260812-premium-interaction2';
    s.defer=true;
    document.head.appendChild(s);
  }
})();