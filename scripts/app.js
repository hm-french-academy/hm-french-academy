document.addEventListener('DOMContentLoaded', () => {
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

  // Load lesson runtime modules in dependency order. Dynamic scripts are
  // asynchronous by default, so appending all of them at once can cause
  // lesson-complete.js to run before learning-progress.js is available.
  (async function loadLessonRuntime(){
    for (const src of scripts) {
      if (document.querySelector(`script[src="${src}"]`)) continue;
      await new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = () => {
          console.warn('HM Academy runtime module failed to load:', src);
          resolve();
        };
        document.body.appendChild(script);
      });
    }
  })();
});
