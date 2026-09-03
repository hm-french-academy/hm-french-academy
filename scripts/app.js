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

  const hasScript = (src) => {
    const base = src.split('?')[0];
    return Array.from(document.scripts).some(s => ((s.getAttribute('src') || '').split('?')[0] === base));
  };

  const loadScript = (src, parent = document.head) => {
    if (hasScript(src)) return null;
    const s = document.createElement('script');
    s.src = src;
    parent.appendChild(s);
    return s;
  };

  loadScript('scripts/i18n-runtime.js');
  loadScript('scripts/speech-runtime.js');

  const isLessonPage = location.pathname.endsWith('/lesson.html') || location.pathname.endsWith('lesson.html');
  if (isLessonPage) {
    ['scripts/lesson-i18n-bind.js','scripts/lesson-finalizer.js','scripts/lesson-quick-i18n.js'].forEach(src => loadScript(src));
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
  if (!isLessonPage) return;

  // Supabase must be available before learning-progress initializes so lesson progress
  // can restore from / sync to the authenticated student's cloud record.
  const scripts = ['scripts/supabase-client.js','scripts/learning-progress.js','scripts/lesson-audio-bind.js','scripts/lesson-media-runtime.js','scripts/lesson-runtime-init.js','scripts/lesson-complete.js'];
  (async function loadLessonRuntime(){
    if (!window.HMSpeech) await new Promise(resolve => { const started = Date.now(); const timer = setInterval(() => { if (window.HMSpeech || Date.now() - started > 1200) { clearInterval(timer); resolve(); } }, 30); });
    for (const src of scripts) {
      if (hasScript(src)) continue;
      await new Promise(resolve => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = resolve;
        document.body.appendChild(script);
      });
    }
  })();
});
