(function(){
  'use strict';
  const labels={ar:{tagline:'تعليم اللغة الفرنسية'},fr:{tagline:'Enseignement du français'},en:{tagline:'French Language Education'}};
  const footerSignature='Fondateur : Hatem ElMorsi · © 2026';
  const THEME_KEY='hm_theme_mode';
  const media=window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  const themeCss='html[data-hm-theme="dark"]{color-scheme:dark}html[data-hm-theme="dark"] body{background:#0f172a!important;color:#e5e7eb!important}html[data-hm-theme="dark"] .hm-header{background:rgba(15,23,42,.94)!important;border-color:#273449!important;box-shadow:0 6px 24px rgba(0,0,0,.25)!important}html[data-hm-theme="dark"] .hm-brand,html[data-hm-theme="dark"] .hm-card h2,html[data-hm-theme="dark"] .hm-card h3,html[data-hm-theme="dark"] .hm-theme-panel h2{color:#f8fafc!important}html[data-hm-theme="dark"] .hm-nav a,html[data-hm-theme="dark"] .hm-tagline,html[data-hm-theme="dark"] .hm-card p,html[data-hm-theme="dark"] .hm-theme-panel p{color:#aab6c8!important}html[data-hm-theme="dark"] .hm-lang,html[data-hm-theme="dark"] .hm-card,html[data-hm-theme="dark"] .hm-lang-panel,html[data-hm-theme="dark"] .hm-theme-panel,html[data-hm-theme="dark"] .hm-footer{background:#111c31!important;border-color:#273449!important;color:#e5e7eb!important}html[data-hm-theme="dark"] .hm-lang,html[data-hm-theme="dark"] .hm-lang-options button,html[data-hm-theme="dark"] .hm-theme-options button{background:#162238!important;color:#e5e7eb!important;border-color:#334155!important}html[data-hm-theme="dark"] .hm-page{background:radial-gradient(circle at 85% 5%,#172a46 0,transparent 27%),linear-gradient(180deg,#0f172a,#111827)!important}html[data-hm-theme="dark"] .hm-icon{background:#1b2a44!important}html[data-hm-theme="dark"] .hm-footer{color:#94a3b8!important}html[data-hm-theme="dark"] .hm-footer-brand strong{color:#f8fafc!important}';
  function ensureThemeStyle(){if(document.getElementById('hm-theme-runtime'))return;const s=document.createElement('style');s.id='hm-theme-runtime';s.textContent=themeCss;document.head.appendChild(s)}
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
  function render(lang){const l=labels[lang]||labels.ar;document.querySelectorAll('.hm-tagline').forEach(el=>el.textContent=l.tagline);document.querySelectorAll('.hm-footer-brand span').forEach(el=>el.textContent='French Language Education');document.querySelectorAll('.hm-footer-brand small').forEach(el=>el.textContent=footerSignature)}
  const current=()=>window.HMLanguage?.get?.()||localStorage.getItem('hm_display_language')||'ar';
  ensureThemeStyle();render(current());applyTheme(currentTheme());
  window.addEventListener('hm:languagechange',e=>render(e.detail?.lang||current()));
})();