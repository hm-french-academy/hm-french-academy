// HM Academy lesson vocabulary audio binding
(async function(){
  try {
    const response = await fetch('data/audio-map.json');
    if(!response.ok) return;
    const audioMap = await response.json();
    const lessonId = new URLSearchParams(location.search).get('id') || 'lesson-hello';
    const lessonAudio = audioMap[lessonId] || {};
    const buttons = Array.from(document.querySelectorAll('#vocabulary-list button'));
    const sources = Array.isArray(lessonAudio)
      ? lessonAudio
      : Object.values(lessonAudio);

    buttons.forEach((button, index) => {
      const source = sources[index];
      if(!source) {
        button.disabled = true;
        button.title = 'الصوت غير متوفر لهذا العنصر';
        return;
      }

      button.dataset.audio = source;
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
})();
