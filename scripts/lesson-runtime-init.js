// HM Academy lesson runtime integration
(function(){
  window.addEventListener('DOMContentLoaded', function(){
    const completeButton = [...document.querySelectorAll('button')]
      .find(btn => btn.textContent.includes('تم إكمال الدرس'));

    if(completeButton){
      completeButton.dataset.completeLesson = 'true';
    }

    if(window.HMMedia){
      const media = document.getElementById('lesson-media');
      if(media && !media.innerHTML.trim()){
        HMMedia.load('lesson-media', null);
      }
    }
  });
})();
