// HM Academy lesson runtime integration
(function(){
  function initVocabulary(){
    const container = document.querySelector('[data-vocabulary-container]');
    if(!container || !window.HMVocabulary) return;
    const url = container.dataset.vocabularyUrl || 'data/vocabulary/unit1/lesson1.json';
    const lessonId = container.dataset.lessonId || 'unit1-lesson1';
    window.HMVocabulary.loadVocabulary(url, container, lessonId).catch(error=>{
      console.error('[HM Academy Vocabulary]', error);
      container.innerHTML = '<p class="vocabulary-error">تعذر تحميل المفردات حالياً.</p>';
    });
  }

  function init(){
    const completeButton = document.querySelector('[data-complete-lesson]') || [...document.querySelectorAll('button')]
      .find(btn => btn.textContent.includes('تم إكمال الدرس'));

    if(completeButton) completeButton.dataset.completeLesson = 'true';

    if(window.HMLessonMedia){
      window.dispatchEvent(new CustomEvent('hm:media-ready',{detail:{items:window.HMLessonMedia}}));
    }

    if(window.HMMedia){
      const media = document.getElementById('lesson-media');
      if(media && !media.innerHTML.trim()) HMMedia.load('lesson-media', null);
    }

    initVocabulary();

    window.addEventListener('hm:lesson-completed', event => {
      const button = document.querySelector('[data-complete-lesson]');
      if(button){
        button.textContent = '✅ تم إكمال الدرس';
        button.disabled = true;
      }
    }, {passive:true});

    window.dispatchEvent(new CustomEvent('hm:lesson-runtime-ready',{detail:{lessonReady:true,vocabularyReady:!!window.HMVocabulary}}));
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
