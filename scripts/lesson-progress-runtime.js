/* HM Academy — universal lesson progress runtime */
(function(){
  'use strict';
  if(!/lesson\.html$/i.test(location.pathname) || !window.HMProgress) return;

  let currentLessonId = null;

  function start(){
    try{
      const params = new URLSearchParams(location.search);
      const id = params.get('id') || params.get('lesson_id');
      if(!id) return;

      currentLessonId = id;
      const section = params.get('section') || 'lesson';

      HMProgress.startLesson(id);
      HMProgress.setSection(section);

      document.documentElement.dataset.hmLessonTracked='true';
      window.dispatchEvent(new CustomEvent('hm:lesson-viewed',{
        detail:{lessonId:id,section}
      }));
    }catch(e){}
  }

  function complete(event){
    try{
      const lessonId = event?.detail?.lessonId || currentLessonId;
      if(!lessonId) return;

      if(typeof HMProgress.completeLesson === 'function'){
        const state = HMProgress.get?.();
        const alreadyCompleted = Array.isArray(state?.completedLessons) && state.completedLessons.includes(lessonId);
        if(!alreadyCompleted){
          HMProgress.completeLesson(lessonId, Number(event?.detail?.xp || 0));
        }
      }

      window.dispatchEvent(new CustomEvent('hm:progress-updated',{
        detail:{lessonId,status:'completed',synced:true}
      }));
    }catch(e){}
  }

  window.addEventListener('hm:lesson-completed',complete);

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
