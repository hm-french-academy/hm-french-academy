/* HM Academy Universal Vocabulary Runtime */
(function () {
  const STORAGE_KEY = 'hm_academy_vocabulary_progress';
  function getProgress() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (_) { return {}; } }
  function saveProgress(progress) { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }
  function speak(text, lang = 'fr-FR') {
    if (!text) return false;
    if (window.HMSpeech?.speak) return window.HMSpeech.speak(text, { lang });
    if (!('speechSynthesis' in window)) return false;
    try { window.speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(String(text)); u.lang = lang; u.rate = .86; window.speechSynthesis.resume(); window.speechSynthesis.speak(u); return true; } catch (_) { return false; }
  }
  function escapeHtml(value) { return String(value || '').replace(/[&<>'"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[c])); }

  /* Semantic illustrations for Grade 8 Unit 1. Existing media is preserved for every other vocabulary item. */
  const U1_ICON = {
    'une cantine':['🍽️','canteen'],'une cour':['🌳','school courtyard'],'des classes (une)':['🏫','classrooms'],'un gymnase':['🤸','gymnasium'],
    'un cdi':['📚','media centre'],'un laboratoire':['🧪','laboratory'],'un terrain de sport':['⚽','sports field'],'un self-service':['🍴','school self-service'],
    'une piscine':['🏊','swimming pool'],'une bibliothèque':['📚','library'],'des élèves':['🧑‍🎓','students'],'des professeurs':['👨‍🏫','teachers'],
    'un drapeau':['🚩','flag'],'un jardin':['🌳','garden'],'un bureau':['🗄️','desk'],'un tableau':['⬛','classroom board'],'une porte':['🚪','door'],
    'une fenêtre':['🪟','window'],'des bancs / un banc':['🪑','bench'],'un panneau':['🪧','signboard'],'un tni':['🖥️','interactive whiteboard'],
    'une horloge':['🕐','wall clock'],'une chaise':['🪑','chair'],'une table':['▰','table'],'le globe terrestre':['🌍','globe'],
    'un ordinateur':['💻','computer'],'un squelette':['🦴','skeleton'],'une carte':['🗺️','map'],'une corbeille à papier':['🗑️','paper bin'],'un dictionnaire':['📖','dictionary'],
    'un stylo':['🖊️','pen'],'un stylo (des stylos)':['🖊️','pens'],'un crayon':['✏️','pencil'],'un crayon (des crayons)':['✏️','pencils'],
    'une gomme':['🧽','eraser'],'une règle':['📏','ruler'],'un livre':['📕','book'],'des livres':['📚','books'],'un cahier':['📓','notebook'],'des cahiers':['📓','notebooks'],
    'un taille-crayon':['🔪','pencil sharpener'],'un tube de colle':['🧴','glue'],'un surligneur':['🖍️','highlighter'],'un feutre':['🖊️','marker'],
    'une feuille de papier':['📄','paper'],'un dossier':['📁','folder'],'une trousse':['🧰','pencil case'],'des ciseaux':['✂️','scissors'],'des crayons de couleur':['🖍️','colored pencils'],
    'un correcteur liquide':['🧴','correction fluid'],'une calculatrice':['🧮','calculator'],'un sac à dos':['🎒','backpack'],
    'le français':['🇫🇷','French'],'l\'anglais':['🔤','English'],'les mathématiques':['➗','mathematics'],'l\'arabe':['ع','Arabic'],'le dessin':['🎨','drawing'],
    'les sciences':['🔬','science'],'l\'histoire':['🏛️','history'],'la géographie':['🗺️','geography'],'la musique':['🎵','music'],'la gymnastique':['🤸','physical education'],'la technologie':['💻','technology'],
    'un mécanicien':['🔧','mechanic'],'une mécanicienne':['🔧','mechanic'],'un pharmacien':['🩺','pharmacist'],'une pharmacienne':['🩺','pharmacist'],
    'un cuisinier':['👨‍🍳','cook'],'une cuisinière':['👩‍🍳','cook'],'un infirmier':['🩺','nurse'],'une infirmière':['🩺','nurse'],
    'un policier':['👮','police officer'],'une policière':['👮‍♀️','police officer'],'un boulanger':['🥖','baker'],'une boulangère':['🥖','baker'],
    'un vendeur':['🛍️','salesperson'],'une vendeuse':['🛍️','salesperson'],'un coiffeur':['💈','barber'],'une coiffeuse':['💈','hairdresser'],'un acteur':['🎭','actor'],'une actrice':['🎭','actor']
  };

  function semanticIllustration(item) {
    const key = String(item.word || '').trim().toLowerCase();
    const hit = U1_ICON[key];
    if (!hit) return `<img class="vocabulary-card__image" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.word)}" loading="lazy">`;
    return `<div class="vocabulary-card__semantic-image" role="img" aria-label="${escapeHtml(hit[1])}" style="width:100%;height:100%;min-height:150px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px"><span class="vocabulary-card__semantic-glyph" style="font-size:72px;line-height:1">${escapeHtml(hit[0])}</span><small style="font-size:12px;opacity:.58;letter-spacing:.2px">${escapeHtml(hit[1])}</small></div>`;
  }

  function renderVocabularyCard(item, index = 0, lessonId = 'lesson') {
    const key = `${lessonId}:${index}`, progress = getProgress(), learned = !!progress[key];
    return `<article class="vocabulary-card${learned ? ' is-learned' : ''}" data-vocabulary-key="${escapeHtml(key)}"><div class="vocabulary-card__image-wrap">${semanticIllustration(item)}</div><div class="vocabulary-card__body"><h3 class="vocabulary-card__word">${escapeHtml(item.word)}</h3><button type="button" class="vocabulary-card__listen" data-speak-word="${escapeHtml(item.word)}">🔊 نطق الكلمة</button><p class="vocabulary-card__meaning">${escapeHtml(item.translation)}</p><p class="vocabulary-card__example">${escapeHtml(item.example)}</p><button type="button" class="vocabulary-card__example-listen" data-speak-example="${escapeHtml(item.example)}">▶️ نطق المثال</button><button type="button" class="vocabulary-card__learned" data-vocabulary-learned="${escapeHtml(key)}">${learned ? '✓ تم التعلم' : '☆ حفظ كمكتسبة'}</button></div></article>`;
  }

  function renderVocabularyList(container, items = [], lessonId = 'lesson') {
    if (!container) return;
    container.innerHTML = items.map((item, index) => renderVocabularyCard(item, index, lessonId)).join('');
    container.querySelectorAll('[data-speak-word]').forEach(btn => btn.addEventListener('click', () => speak(btn.dataset.speakWord)));
    container.querySelectorAll('[data-speak-example]').forEach(btn => btn.addEventListener('click', () => speak(btn.dataset.speakExample)));
    container.querySelectorAll('[data-vocabulary-learned]').forEach(btn => btn.addEventListener('click', () => { const progress = getProgress(); progress[btn.dataset.vocabularyLearned] = true; saveProgress(progress); const card = btn.closest('.vocabulary-card'); card.classList.add('is-learned'); btn.textContent = '✓ تم التعلم'; }));
  }
  async function loadVocabulary(url, container, lessonId) { const response = await fetch(url); if (!response.ok) throw new Error(`Vocabulary load failed: ${response.status}`); const data = await response.json(); renderVocabularyList(container, data.vocabulary || [], lessonId || data.lessonId || 'lesson'); return data; }
  window.HMVocabulary = { renderVocabularyCard, renderVocabularyList, loadVocabulary, speak, getProgress };
})();
