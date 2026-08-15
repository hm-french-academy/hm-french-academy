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
    if (!text) return false;
    if (window.HMSpeech?.speak) return window.HMSpeech.speak(text, { lang });
    if (!('speechSynthesis' in window)) return false;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(String(text));
      utterance.lang = lang;
      utterance.rate = .86;
      window.speechSynthesis.resume();
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (_) { return false; }
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>'"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[c]));
  }

  /*
   * Unit 1 uses semantic inline illustrations instead of generic/misleading
   * emoji. This is intentionally scoped to the four Grade 8 Unit 1 lessons,
   * so other courses keep their existing media unchanged.
   */
  const U1_ICON = {
    'une cantine': ['🍽️','canteen'], 'une cour': ['🏫','courtyard'], 'des classes (une)': ['🚪','classroom'],
    'un gymnase': ['🤸','gym'], 'un cdi': ['📚','media room'], 'un laboratoire': ['🧪','laboratory'],
    'un terrain de sport': ['⚽','sports field'], 'un self-service': ['🍴','self service'], 'une piscine': ['🏊','pool'],
    'une bibliothèque': ['📚','library'], 'des élèves': ['🧑‍🎓','students'], 'des professeurs': ['👨‍🏫','teachers'],
    'un drapeau': ['🚩','flag'], 'un jardin': ['🌳','garden'], 'un bureau': ['🗄️','desk'],
    'un tableau': ['🧑‍🏫','chalkboard'], 'une porte': ['🚪','door'], 'une fenêtre': ['🪟','window'],
    'des bancs / un banc': ['🪑','bench'], 'un panneau': ['🪧','sign'], 'un tni': ['🖥️','interactive board'],
    'une horloge': ['🕐','clock'], 'une chaise': ['🪑','chair'], 'une table': ['🪵','table'],
    'le globe terrestre': ['🌍','globe'], 'un ordinateur': ['💻','computer'], 'un squelette': ['🦴','skeleton'],
    'une carte': ['🗺️','map'], 'une corbeille à papier': ['🗑️','paper bin'], 'un dictionnaire': ['📖','dictionary'],
    'un stylo': ['🖊️','pen'], 'un stylo (des stylos)': ['🖊️','pens'], 'un crayon': ['✏️','pencil'],
    'un crayon (des crayons)': ['✏️','pencils'], 'une gomme': ['🧽','eraser'], 'une règle': ['📏','ruler'],
    'un livre': ['📕','book'], 'des livres': ['📚','books'], 'un cahier': ['📓','notebook'], 'des cahiers': ['📓','notebooks'],
    'un taille-crayon': ['🔪','pencil sharpener'], 'un tube de colle': ['🧴','glue'], 'un surligneur': ['🖍️','highlighter'],
    'un feutre': ['🖊️','marker'], 'une feuille de papier': ['📄','paper'], 'un dossier': ['📁','folder'],
    'une trousse': ['🧰','pencil case'], 'des ciseaux': ['✂️','scissors'], 'des crayons de couleur': ['🖍️','colored pencils'],
    'un correcteur liquide': ['🧴','correction fluid'], 'une calculatrice': ['🧮','calculator'], 'un sac à dos': ['🎒','backpack'],
    "le français": ['🇫🇷','French'], "l'anglais": ['🔤','English'], 'les mathématiques': ['➗','mathematics'],
    "l'arabe": ['ع','Arabic'], 'le dessin': ['🎨','drawing'], 'les sciences': ['🔬','science'],
    "l'histoire": ['🏛️','history'], 'la géographie': ['🗺️','geography'], 'la musique': ['🎵','music'],
    'la gymnastique': ['🤸','physical education'], 'la technologie': ['💻','technology'],
    'un mécanicien': ['🔧','mechanic'], 'une mécanicienne': ['🔧','mechanic'], 'un pharmacien': ['💊','pharmacist'],
    'une pharmacienne': ['💊','pharmacist'], 'un cuisinier': ['👨‍🍳','cook'], 'une cuisinière': ['👩‍🍳','cook'],
    'un infirmier': ['🩺','nurse'], 'une infirmière': ['🩺','nurse'], 'un policier': ['👮','police officer'],
    'une policière': ['👮‍♀️','police officer'], 'un boulanger': ['🥖','baker'], 'une boulangère': ['🥖','baker'],
    'un vendeur': ['🛍️','salesperson'], 'une vendeuse': ['🛍️','salesperson'], 'un coiffeur': ['💈','barber'],
    'une coiffeuse': ['💈','hairdresser'], 'un acteur': ['🎭','actor'], 'une actrice': ['🎭','actor']
  };

  function isUnit1(lessonId) { return /^grade8-u1-/i.test(String(lessonId || '')); }

  function semanticIllustration(item, lessonId) {
    if (!isUnit1(lessonId)) return `<img class="vocabulary-card__image" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.word)}" loading="lazy">`;
    const key = String(item.word || '').trim().toLowerCase();
    const hit = U1_ICON[key];
    if (!hit) return `<div class="vocabulary-card__semantic-image" role="img" aria-label="${escapeHtml(item.word)}"><span>${escapeHtml(item.image || '📘')}</span></div>`;
    return `<div class="vocabulary-card__semantic-image" role="img" aria-label="${escapeHtml(hit[1])}"><span class="vocabulary-card__semantic-glyph">${escapeHtml(hit[0])}</span><small>${escapeHtml(hit[1])}</small></div>`;
  }

  function renderVocabularyCard(item, index = 0, lessonId = 'lesson') {
    const key = `${lessonId}:${index}`;
    const progress = getProgress();
    const learned = !!progress[key];
    return `
      <article class="vocabulary-card${learned ? ' is-learned' : ''}" data-vocabulary-key="${escapeHtml(key)}">
        <div class="vocabulary-card__image-wrap">
          ${semanticIllustration(item, lessonId)}
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
