// HM Academy lesson runtime integration
(function(){
  function init(){
    const completeButton = document.querySelector('[data-complete-lesson]') || [...document.querySelectorAll('button')]
      .find(btn => btn.textContent.includes('تم إكمال الدرس'));

    if(completeButton) completeButton.dataset.completeLesson = 'true';

    // Media runtime synchronization
    if(window.HMLessonMedia){
      window.dispatchEvent(new CustomEvent('hm:media-ready',{detail:{items:window.HMLessonMedia}}));
    }

    if(window.HMMedia){
      const media = document.getElementById('lesson-media');
      if(media && !media.innerHTML.trim()) HMMedia.load('lesson-media', null);
    }

    // Keep completion state synchronized when another runtime module
    // completes the lesson.
    window.addEventListener('hm:lesson-completed', event => {
      const button = document.querySelector('[data-complete-lesson]');
      if(button){
        button.textContent = '✅ تم إكمال الدرس';
        button.disabled = true;
      }
    }, {passive:true});

    window.dispatchEvent(new CustomEvent('hm:lesson-runtime-ready',{detail:{lessonReady:true}}));
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
