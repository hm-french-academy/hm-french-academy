(function(){
  'use strict';
  const labels={
    ar:{tagline:'تعليم اللغة الفرنسية',specialty:'تعليم اللغة الفرنسية',founder:'المؤسس: الأستاذ حاتم المرسي'},
    fr:{tagline:'Enseignement du français',specialty:'Enseignement du français',founder:'Fondateur : Monsieur Hatem ElMorsi'},
    en:{tagline:'French Language Education',specialty:'French Language Education',founder:'Founder: Monsieur Hatem ElMorsi'}
  };
  function render(lang){const l=labels[lang]||labels.ar;document.querySelectorAll('.hm-tagline').forEach(el=>el.textContent=l.tagline);document.querySelectorAll('.hm-footer-brand span').forEach(el=>el.textContent=l.specialty);document.querySelectorAll('.hm-footer-brand small').forEach(el=>el.textContent=l.founder+' · © 2026');}
  const current=()=>window.HMLanguage?.get?.()||localStorage.getItem('hm_display_language')||'ar';
  render(current());
  window.addEventListener('hm:languagechange',e=>render(e.detail?.lang||current()));
})();
