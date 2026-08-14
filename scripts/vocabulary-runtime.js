/* HM Academy Universal Vocabulary Runtime */
(function () {
  const STORAGE_KEY = 'hm_academy_vocabulary_progress';

  function getProgress() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch (_) { return {}; }
  }

  function saveProgress(progress) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  function speak(text, lang = 'fr-FR') {
    if (!text || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>'"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[c]));
  }

  function renderVocabularyCard(item, index = 0, lessonId = 'lesson') {
    const key = `${lessonId}:${index}`;
    const progress = getProgress();
    const learned = !!progress[key];
    return `
      <article class="vocabulary-card${learned ? ' is-learned' : ''}" data-vocabulary-key="${escapeHtml(key)}">
        <div class="vocabulary-card__image-wrap">
          <img class="vocabulary-card__image" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.word)}" loading="lazy">
        </div>
        <div class="vocabulary-card__body">
          <h3 class="vocabulary-card__word">${escapeHtml(item.word)}</h3>
          <button type="button" class="vocabulary-card__listen" data-speak-word="${escapeHtml(item.word)}">🔊 نطق الكلمة</button>
          <p class="vocabulary-card__meaning">${escapeHtml(item.translation)}</p>
          <p class="vocabulary-card__example">${escapeHtml(item.example)}</p>
          <button type="button" class="vocabulary-card__example-listen" data-speak-example="${escapeHtml(item.example)}">▶️ نطق المثال</button>
          <button type="button" class="vocabulary-card__learned" data-vocabulary-learned="${escapeHtml(key)}">${learned ? '✓ تم التعلم' : '☆ حفظ كمكتسبة'}</button>
        </div>
      </article>`;
  }

  function renderVocabularyList(container, items = [], lessonId = 'lesson') {
    if (!container) return;
    container.innerHTML = items.map((item, index) => renderVocabularyCard(item, index, lessonId)).join('');
    container.querySelectorAll('[data-speak-word]').forEach(btn => btn.addEventListener('click', () => speak(btn.dataset.speakWord)));
    container.querySelectorAll('[data-speak-example]').forEach(btn => btn.addEventListener('click', () => speak(btn.dataset.speakExample)));
    container.querySelectorAll('[data-vocabulary-learned]').forEach(btn => btn.addEventListener('click', () => {
      const progress = getProgress();
      progress[btn.dataset.vocabularyLearned] = true;
      saveProgress(progress);
      const card = btn.closest('.vocabulary-card');
      card.classList.add('is-learned');
      btn.textContent = '✓ تم التعلم';
    }));
  }

  async function loadVocabulary(url, container, lessonId) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Vocabulary load failed: ${response.status}`);
    const data = await response.json();
    renderVocabularyList(container, data.vocabulary || [], lessonId || data.lessonId || 'lesson');
    return data;
  }

  window.HMVocabulary = { renderVocabularyCard, renderVocabularyList, loadVocabulary, speak, getProgress };
})();
