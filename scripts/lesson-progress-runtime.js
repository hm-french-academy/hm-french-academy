/* HM Academy — universal lesson progress runtime */
(function(){
  'use strict';
  if(!/lesson\.html$/i.test(location.pathname) || !window.HMProgress) return;
  function run(){
    try{
      const params=new URLSearchParams(location.search);
      const id=params.get('id');
      if(!id) return;
      const section=params.get('section')||'lesson';
      HMProgress.startLesson(id);
      HMProgress.setSection(section);
      document.documentElement.dataset.hmLessonTracked='true';
      window.dispatchEvent(new CustomEvent('hm:lesson-viewed',{detail:{lessonId:id,section}}));
    }catch(e){}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true});
  else run();
})();
