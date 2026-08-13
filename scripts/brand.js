(function(){
  'use strict';
  const labels={
    ar:{tagline:'تعليم اللغة الفرنسية'},
    fr:{tagline:'Enseignement du français'},
    en:{tagline:'French Language Education'}
  };
  const footerSignature='Fondateur : Hatem ElMorsi · © 2026';
  const THEME_KEY='hm_theme_mode';
  const media=window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function currentTheme(){return localStorage.getItem(THEME_KEY)||'system'}
  function resolvedTheme(mode){return mode==='dark'||(mode==='system'&&media&&media.matches)?'dark':'light'}
  function applyTheme(mode){
    mode=['system','light','dark'].includes(mode)?mode:'system';
    localStorage.setItem(THEME_KEY,mode);
    document.documentElement.dataset.hmThemeMode=mode;
    document.documentElement.dataset.hmTheme=resolvedTheme(mode);
    document.querySelectorAll('[data-theme-choice]').forEach(el=>el.classList.toggle('active',el.dataset.themeChoice===mode));
    window.dispatchEvent(new CustomEvent('hm:themechange',{detail:{mode,theme:resolvedTheme(mode)}}));
  }
  window.HMTheme={get:currentTheme,apply:applyTheme,resolve:()=>resolvedTheme(currentTheme())};
  if(media){const onChange=()=>{if(currentTheme()==='system')applyTheme('system')};if(media.addEventListener)media.addEventListener('change',onChange);else if(media.addListener)media.addListener(onChange)}
  function render(lang){
    const l=labels[lang]||labels.ar;
    document.querySelectorAll('.hm-tagline').forEach(el=>el.textContent=l.tagline);
    document.querySelectorAll('.hm-footer-brand span').forEach(el=>el.textContent='French Language Education');
    document.querySelectorAll('.hm-footer-brand small').forEach(el=>el.textContent=footerSignature);
  }
  const current=()=>window.HMLanguage?.get?.()||localStorage.getItem('hm_display_language')||'ar';
  render(current());
  applyTheme(currentTheme());
  window.addEventListener('hm:languagechange',e=>render(e.detail?.lang||current()));
})();