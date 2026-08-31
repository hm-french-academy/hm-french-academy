document.addEventListener('DOMContentLoaded', () => {
  // HM Academy: internal curriculum/source metadata must never appear in student UI.
  const INTERNAL_SOURCE_PATTERNS = [
    /المصدر\s*الأساسي\s*هو\s*Club\s*@dos\s*Plus\s*1\s*،?\s*مع\s*طبقة\s*إثراء[^.\n<]*/gi,
    /المصدر\s*الأساسي\s*هو[^.\n<]*Merci\s*2027[^.\n<]*Bravo\s*2027[^.\n<]*/gi,
    /المصدر\s*(?:الأساسي|الرئيسي)\s*[:：][^|؛;\n<]+/gi,
    /مصادر\s*الإثراء\s*[:：][^|؛;\n<]+/gi,
    /طبقة\s*(?:الإثراء|إثراء)\s*[:：][^|؛;\n<]+/gi,
    /مصدر\s*المحتوى\s*[:：][^|؛;\n<]+/gi,
    /المصدر\s*الأساسي\s*هو[^.\n<]*/gi,
    /\bMerci\s*2027\b/gi,
    /\bBravo\s*2027\b/gi,
    /\bElMoasser\s*2027\b/gi,
    /\bEnrichment\s*:\s*[^|;\n<]+/gi,
    /\bsource\s*primaire\s*:\s*[^|;\n<]+/gi,
    /\bprimary\s*source\s*:\s*[^|;\n<]+/gi,
    /\bmain\s*source\s*:\s*[^|;\n<]+/gi,
    /\bcontent\s*source\s*[:：][^|;\n<]+/gi,
    /\bsource\s*status\s*[:：][^|;\n<]+/gi
  ];

  const sanitizeText = (value) => {
    let result = String(value || '');
    INTERNAL_SOURCE_PATTERNS.forEach(pattern => { result = result.replace(pattern, ''); });
    return result.replace(/[ \t]{2,}/g, ' ').replace(/\s+([|·•،])/g, ' $1').trim();
  };

  const sanitizeStudentUi = (root = document.body) => {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const parent = node.parentElement;
      if (!parent || /^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE)$/.test(parent.tagName)) return;
      const next = sanitizeText(node.nodeValue);
      if (next !== node.nodeValue) node.nodeValue = next;
    });
  };

  sanitizeStudentUi();
  const sourceSanitizer = new MutationObserver(() => sanitizeStudentUi());
  sourceSanitizer.observe(document.body, { childList: true, subtree: true, characterData: true });

  if (!document.querySelector('script[src="scripts/i18n-runtime.js"]')) {
    const i18n = document.createElement('script');
    i18n.src = 'scripts/i18n-runtime.js';
    document.head.appendChild(i18n);
  }
  if (!document.querySelector('script[src="scripts/speech-runtime.js"]')) {
    const speech = document.createElement('script');
    speech.src = 'scripts/speech-runtime.js';
    document.head.appendChild(speech);
  }
  if (location.pathname.endsWith('/lesson.html') || location.pathname.endsWith('lesson.html')) {
    ['scripts/lesson-i18n-bind.js','scripts/lesson-finalizer.js','scripts/lesson-quick-i18n.js'].forEach(src => {
      if (!document.querySelector(`script[src="${src}"]`)) {
        const s = document.createElement('script'); s.src = src; document.head.appendChild(s);
      }
    });
  }
  document.querySelectorAll('[data-progress]').forEach((bar) => {
    const value = Number(bar.getAttribute('data-progress') || '0');
    bar.style.width = `${Math.max(0, Math.min(100, value))}%`;
  });
  if (!document.querySelector('link[data-hm-theme]')) {
    const theme = document.createElement('link');
    theme.rel = 'stylesheet'; theme.href = 'css/theme-refresh.css?v=20260809'; theme.dataset.hmTheme = 'true';
    document.head.appendChild(theme);
  }
  if (!(location.pathname.endsWith('/lesson.html') || location.pathname.endsWith('lesson.html'))) return;
  const scripts = ['scripts/learning-progress.js','scripts/lesson-audio-bind.js','scripts/lesson-media-runtime.js','scripts/lesson-runtime-init.js','scripts/lesson-complete.js'];
  (async function loadLessonRuntime(){
    if (!window.HMSpeech) await new Promise(resolve => { const started = Date.now(); const timer = setInterval(() => { if (window.HMSpeech || Date.now() - started > 1200) { clearInterval(timer); resolve(); } }, 30); });
    for (const src of scripts) {
      if (document.querySelector(`script[src="${src}"]`)) continue;
      await new Promise(resolve => { const script = document.createElement('script'); script.src = src; script.onload = resolve; script.onerror = resolve; document.body.appendChild(script); });
    }
  })();
});
