// HM Academy dynamic lesson audio binding
(async function(){
  try {
    const mapResponse = await fetch('data/audio-map.json');
    if(!mapResponse.ok) return;
    const audioMap = await mapResponse.json();
    const lessonId = new URLSearchParams(location.search).get('id') || 'lesson-hello';
    const lessonAudio = audioMap[lessonId] || {};

    document.querySelectorAll('#vocabulary-list button').forEach(button => {
      const text = button.parentElement?.textContent || '';
      const key = Object.keys(lessonAudio).find(word => text.includes(word));
      if(!key) return;

      button.dataset.audio = lessonAudio[key];
      button.addEventListener('click', () => {
        const audio = new Audio(button.dataset.audio);
        audio.play().catch(() => {
          button.textContent = '🔊 الصوت غير متاح حالياً';
        });
      });
    });
  } catch(error) {
    console.warn('Audio binding skipped', error);
  }
})();
