/* HM Academy Universal Vocabulary Runtime */

function renderVocabularyCard(item) {
  return `
    <article class="vocabulary-card">
      <img src="${item.image || ''}" alt="${item.word || ''}">
      <h3>${item.word || ''}</h3>
      <p class="meaning">${item.translation || ''}</p>
      <p class="example">${item.example || ''}</p>
      ${item.exampleAudio ? `<audio controls src="${item.exampleAudio}"></audio>` : ''}
    </article>`;
}

function renderVocabularyList(container, items = []) {
  if (!container) return;
  container.innerHTML = items.map(renderVocabularyCard).join('');
}

window.HMVocabulary = { renderVocabularyCard, renderVocabularyList };
