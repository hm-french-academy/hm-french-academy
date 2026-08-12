// HM Academy lesson runtime integration
(function(){
  function init(){
    const completeButton = document.querySelector('[data-complete-lesson]') || [...document.querySelectorAll('button')]
      .find(btn => btn.textContent.includes('تم إكمال الدرس'));

    if(completeButton) completeButton.dataset.completeLesson = 'true';

    if(window.HMLessonMedia){
      window.dispatchEvent(new CustomEvent('hm:media-ready',{detail:{items:window.HMLessonMedia}}));
    }

    const lessonContainer=document.getElementById('lesson-media');
    if(window.HMMedia && lessonContainer && !lessonContainer.innerHTML.trim()){
      HMMedia.load('lesson-media', null);
    }

    window.addEventListener('hm:lesson-completed', () => {
      const button=document.querySelector('[data-complete-lesson]');
      if(button){
        button.textContent='✅ تم إكمال الدرس';
        button.disabled=true;
      }
    },{passive:true});

    window.addEventListener('hm:supabase-lesson-ready',event=>{
      document.documentElement.dataset.lessonLoaded='true';
      window.HMCurrentLesson=event.detail;
    });

    window.dispatchEvent(new CustomEvent('hm:lesson-runtime-ready',{detail:{lessonReady:true}}));
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
