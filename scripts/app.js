document.addEventListener('DOMContentLoaded', () => {
  const globalScripts = ['data/production-config.js','scripts/hm-production.js','scripts/hm-analytics.js'];
  (async function loadGlobalRuntime(){
    for (const src of globalScripts) {
      if (document.querySelector(`script[src="${src}"]`)) continue;
      await new Promise((resolve) => { const script=document.createElement('script'); script.src=src; script.onload=resolve; script.onerror=resolve; document.head.appendChild(script); });
    }
  })();
  if (!document.querySelector('script[src="scripts/i18n-runtime.js"]')) { const i18n=document.createElement('script'); i18n.src='scripts/i18n-runtime.js'; document.head.appendChild(i18n); }
  if (location.pathname.endsWith('/lesson.html') || location.pathname.endsWith('lesson.html')) {
    ['scripts/lesson-i18n-bind.js','scripts/lesson-finalizer.js','scripts/lesson-quick-i18n.js'].forEach(src=>{if(!document.querySelector(`script[src="${src}"]`)){const s=document.createElement('script');s.src=src;document.head.appendChild(s);}});
  }
  document.querySelectorAll('[data-progress]').forEach(bar=>{const value=Number(bar.getAttribute('data-progress')||'0');bar.style.width=`${Math.max(0,Math.min(100,value))}%`;});
  if(!document.querySelector('link[data-hm-theme]')){const theme=document.createElement('link');theme.rel='stylesheet';theme.href='css/theme-refresh.css?v=20260809';theme.dataset.hm-theme='true';document.head.appendChild(theme);}
  if(!(location.pathname.endsWith('/lesson.html')||location.pathname.endsWith('lesson.html')))return;
  const scripts=['scripts/learning-progress.js','scripts/lesson-audio-bind.js','scripts/lesson-media-runtime.js','scripts/lesson-runtime-init.js','scripts/premium-lesson-data-adapter.js','scripts/premium-lesson-studio-bridge.js','scripts/premium-lesson-priority-runtime.js','scripts/premium-lesson-render-hook.js','scripts/supabase-lesson-runtime.js','scripts/lesson-dynamic-bridge.js','scripts/lesson-complete.js'];
  (async function(){for(const src of scripts){if(document.querySelector(`script[src="${src}"]`))continue;await new Promise(resolve=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=resolve;document.body.appendChild(s);});}})();
});