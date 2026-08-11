document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('script[src="scripts/i18n-runtime.js"]')) {
    const i18n = document.createElement('script');
    i18n.src = 'scripts/i18n-runtime.js';
    document.head.appendChild(i18n);
  }

  if (location.pathname.endsWith('/lesson.html') || location.pathname.endsWith('lesson.html')) {
    if (!document.querySelector('script[src="scripts/lesson-i18n-bind.js"]')) {
      const lessonI18n = document.createElement('script');
      lessonI18n.src = 'scripts/lesson-i18n-bind.js';
      document.head.appendChild(lessonI18n);
    }
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

  const brand = Array.from(document.querySelectorAll('header h2')).find(node => /HM Academy/i.test(node.textContent || ''));
  if (brand && !brand.querySelector('a')) {
    const link = document.createElement('a');
    link.href = 'index.html';
    link.textContent = brand.textContent.trim();
    link.setAttribute('aria-label', 'العودة إلى الصفحة الرئيسية');
    brand.textContent = '';
    brand.appendChild(link);
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
