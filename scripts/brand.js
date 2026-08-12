(function(){
  'use strict';
  const labels={ar:{tagline:'تعليم اللغة الفرنسية'},fr:{tagline:'Enseignement du français'},en:{tagline:'French Language Education'}};
  const footerSignature='Fondateur : Hatem ElMorsi · © 2026';
  const PREF_KEY='hm_academy_preferences';
  const readPrefs=()=>{try{return {...{theme:'system',fontSize:'medium',reducedMotion:false,lessonSound:true},...JSON.parse(localStorage.getItem(PREF_KEY)||'{}')}}catch{return {theme:'system',fontSize:'medium',reducedMotion:false,lessonSound:true}}};
  function applyPrefs(){const p=readPrefs();document.documentElement.dataset.hmTheme=p.theme;document.documentElement.dataset.hmFont=p.fontSize;document.documentElement.dataset.hmMotion=p.reducedMotion?'reduced':'full';document.body.classList.toggle('hm-reduced-motion',!!p.reducedMotion);document.body.classList.toggle('hm-dark',p.theme==='dark');if(p.theme==='light')document.body.classList.remove('hm-dark');if(p.theme==='system'){const dark=window.matchMedia?.('(prefers-color-scheme: dark)').matches;document.body.classList.toggle('hm-dark',!!dark)}}
  function render(lang){const l=labels[lang]||labels.ar;document.querySelectorAll('.hm-tagline').forEach(el=>el.textContent=l.tagline);document.querySelectorAll('.hm-footer-brand span').forEach(el=>el.textContent='French Language Education');document.querySelectorAll('.hm-footer-brand small').forEach(el=>el.textContent=footerSignature)}
  const current=()=>window.HMLanguage?.get?.()||localStorage.getItem('hm_display_language')||'ar';
  window.HMPreferences={key:PREF_KEY,get:readPrefs,save(p){const next={...readPrefs(),...p};localStorage.setItem(PREF_KEY,JSON.stringify(next));applyPrefs();window.dispatchEvent(new CustomEvent('hm:preferenceschange',{detail:next}));return next},apply:applyPrefs};
  render(current());applyPrefs();window.addEventListener('hm:languagechange',e=>render(e.detail?.lang||current()));window.addEventListener('hm:preferenceschange',applyPrefs);window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener?.('change',applyPrefs);
  const load=(src)=>{if(document.querySelector('script[data-hm-runtime="'+src+'"]'))return;const s=document.createElement('script');s.src=src;s.defer=true;s.dataset.hmRuntime=src;document.head.appendChild(s)};
  load('scripts/hm-analytics.js?v=20260812-analytics1');
  if(/lesson\.html$/i.test(location.pathname)){load('scripts/premium-lesson-enhancer.js?v=20260812-premium-interaction4');load('scripts/lesson-example-audio.js?v=20260812-example-audio1')}
})();
