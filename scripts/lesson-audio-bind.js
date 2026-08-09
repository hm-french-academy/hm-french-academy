// HM Academy lesson vocabulary audio binding
(function(){
  async function loadAudioMap(){
    const response = await fetch('data/audio-map.json');
    if(!response.ok) throw new Error('audio-map unavailable');
    return response.json();
  }

  async function bindVocabularyAudio(){
    try {
      const audioMap = await loadAudioMap();
      const lessonId = new URLSearchParams(location.search).get('id') || 'lesson-hello';
      const lessonAudio = audioMap[lessonId] || {};
      const buttons = Array.from(document.querySelectorAll('#vocabulary-list button'));
      const sources = Array.isArray(lessonAudio) ? lessonAudio : Object.values(lessonAudio);

      buttons.forEach((button, index) => {
        if(button.dataset.audioBound === 'true') return;
        const source = sources[index];
        if(!source){
          button.disabled = true;
          button.title = 'الصوت غير متوفر لهذا العنصر';
          button.dataset.audioBound = 'true';
          return;
        }

        button.dataset.audio = source;
        button.dataset.audioBound = 'true';
        button.addEventListener('click', async () => {
          if(button._audio) button._audio.pause();
          const audio = new Audio(source);
          button._audio = audio;
          button.textContent = '⏸️ جاري التشغيل...';
          try {
            await audio.play();
            audio.addEventListener('ended', () => {
              button.textContent = '🔊 تشغيل الصوت';
            }, {once:true});
          } catch(error) {
            button.textContent = '🔊 الصوت غير متاح حالياً';
          }
        });
      });
    } catch(error) {
      console.warn('Audio binding skipped', error);
    }
  }

  window.HMAudio = { bind: bindVocabularyAudio };

  function init(){
    bindVocabularyAudio();
    const vocabNode = document.getElementById('vocabulary-list');
    if(vocabNode && !vocabNode.dataset.audioObserver){
      const observer = new MutationObserver(() => bindVocabularyAudio());
      observer.observe(vocabNode, {childList:true, subtree:true});
      vocabNode.dataset.audioObserver = 'true';
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
