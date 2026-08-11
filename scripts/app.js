document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('script[src="scripts/i18n-runtime.js"]')) {
    const i18n = document.createElement('script');
    i18n.src = 'scripts/i18n-runtime.js';
    document.head.appendChild(i18n);
  }

  if (location.pathname.endsWith('/lesson.html') || location.pathname.endsWith('lesson.html')) {
    ['scripts/lesson-i18n-bind.js','scripts/lesson-finalizer.js','scripts/lesson-quick-i18n.js'].forEach(src => {
      if (!document.querySelector(`script[src="${src}"]`)) {
        const s=document.createElement('script');
        s.src=src;
        document.head.appendChild(s);
      }
    });
  }

  const progressBars = document.querySelectorAll('[data-progress]');
  progressBars.forEach((bar) => {
    const value = Number(bar.getAttribute('data-progress') || '0');
    bar.style.width = `${Math.max(0, Math.min(100, value))}%`;
  });

  if (!document.querySelector('link[data-hm-theme]')) {
    const theme = document.createElement('link');
    theme.rel = 'stylesheet';
    theme.href = 'css/theme-refresh.css?v=20260809';
    theme.dataset.hmTheme = 'true';
    document.head.appendChild(theme);
  }

  if (!(location.pathname.endsWith('/lesson.html') || location.pathname.endsWith('lesson.html'))) return;

  const scripts = [
    'scripts/learning-progress.js',
    'scripts/lesson-audio-bind.js',
    'scripts/lesson-media-runtime.js',
    'scripts/lesson-runtime-init.js',
    'scripts/lesson-complete.js'
  ];

  (async function loadLessonRuntime(){
    for (const src of scripts) {
      if (document.querySelector(`script[src="${src}"]`)) continue;
      await new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = () => resolve();
        document.body.appendChild(script);
      });
    }
  })();
});
