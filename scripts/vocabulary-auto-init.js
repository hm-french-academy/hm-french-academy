/* Auto-initialize vocabulary blocks on lesson pages. */
(function () {
  async function init() {
    const container = document.querySelector('[data-vocabulary-container]');
    if (!container || !window.HMVocabulary) return;
    const url = container.dataset.vocabularyUrl || 'data/vocabulary/unit1/lesson1.json';
    const lessonId = container.dataset.lessonId || 'unit1-lesson1';
    try {
      await window.HMVocabulary.loadVocabulary(url, container, lessonId);
    } catch (error) {
      container.innerHTML = '<p class="vocabulary-error">تعذر تحميل المفردات حالياً.</p>';
      console.error('[HMVocabulary]', error);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
