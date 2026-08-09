document.addEventListener('DOMContentLoaded', () => {
  const progressBars = document.querySelectorAll('[data-progress]');
  progressBars.forEach((bar) => {
    const value = Number(bar.getAttribute('data-progress') || '0');
    bar.style.width = `${Math.max(0, Math.min(100, value))}%`;
  });

  if (location.pathname.endsWith('/lesson.html') || location.pathname.endsWith('lesson.html')) {
    const scripts = [
      'scripts/learning-progress.js',
      'scripts/lesson-audio-bind.js',
      'scripts/lesson-media-runtime.js',
      'scripts/lesson-runtime-init.js',
      'scripts/lesson-complete.js'
    ];

    scripts.forEach((src) => {
      if (document.querySelector(`script[src="${src}"]`)) return;
      const script = document.createElement('script');
      script.src = src;
      script.defer = false;
      document.body.appendChild(script);
    });
  }
});
