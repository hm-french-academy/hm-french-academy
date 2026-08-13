'use strict';
(() => {
  const LESSON_ID = new URLSearchParams(location.search).get('id') || 'grade8-u1-l1';
  const SCRIPT_ATTRS = {
    studio: 'data-premium-v5',
    patch: 'data-premium-v5-patch',
    copy: 'data-premium-copy'
  };

  const addScript = (src, attr) => new Promise(resolve => {
    if (document.querySelector(`script[${attr}]`)) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.setAttribute(attr, '1');
    s.onload = () => resolve();
    s.onerror = () => resolve();
    document.body.appendChild(s);
  });

  const speak = text => {
    try {
      if (!text || !('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'fr-FR';
      u.rate = 0.86;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  };

  const startProgress = () => {
    try {
      if (window.HMProgress?.startLesson) window.HMProgress.startLesson(LESSON_ID);
    } catch (e) {}
  };

  const loadCopy = () => addScript(
    'scripts/premium-copy-runtime.js?v=20260812-copy1',
    SCRIPT_ATTRS.copy
  );

  const polishLegacyImage = () => {
    const q = document.querySelector('.q.has-image .desk-question');
    if (q && !q.querySelector('img')) {
      q.innerHTML = '<img src="assets/lessons/grade8-u1-l1/desk-question.svg" alt="مكتب عليه كراسة وآلة حاسبة">';
    }
  };

  const boot = async () => {
    startProgress();
    await addScript('scripts/premium-lesson-studio-v5.js?v=20260812-v5', SCRIPT_ATTRS.studio);
    await addScript('scripts/premium-lesson-studio-v5-patch.js?v=20260812-patch1', SCRIPT_ATTRS.patch);
    await loadCopy();
    polishLegacyImage();
  };

  let tries = 0;
  const waitForApp = () => {
    const app = document.getElementById('app');
    if (app || tries++ > 12) {
      boot();
      return;
    }
    setTimeout(waitForApp, 80);
  };

  const init = () => {
    waitForApp();
    document.addEventListener('click', event => {
      const target = event.target.closest('[data-speak], .listen5, .listen, .line5');
      if (!target) return;
      const text = target.getAttribute('data-speak') || target.dataset.text || target.textContent;
      if (text) speak(text.trim());
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
