// HM Academy lesson runtime integration
(function(){
  function loadScript(src){
    return new Promise(resolve=>{
      if(document.querySelector(`script[src="${src}"]`)){resolve();return;}
      const script=document.createElement('script');
      script.src=src;
      script.defer=true;
      script.onload=resolve;
      script.onerror=resolve;
      document.head.appendChild(script);
    });
  }

  async function loadLessonBridge(){
    await loadScript('scripts/lesson-supabase-bridge.js');
    await loadScript('scripts/premium-lesson-data-adapter.js');
    await loadScript('scripts/premium-lesson-studio-bridge.js');
    await loadScript('scripts/premium-lesson-priority-runtime.js');
    if(window.HMLessonBridge){
      window.HMLessonBridge.load().catch(err=>console.warn('Lesson bridge error',err));
    }
  }

  function validateLesson(lesson){
    const missing=[];
    if(!lesson?.title) missing.push('title');
    if(!lesson?.objective) missing.push('objective');
    if(!lesson?.duration) missing.push('duration');
    return missing;
  }

  function init(){
    loadLessonBridge();
    window.addEventListener('hm:supabase-lesson-ready',event=>{
      const lesson=event.detail;
      window.HMCurrentLesson=lesson;
      window.HMLessonQuality={status:'Complete',missing:validateLesson(lesson)};
      document.documentElement.dataset.lessonLoaded='true';
    });

    window.addEventListener('hm:lesson-completed',()=>{
      const button=document.querySelector('[data-complete-lesson]');
      if(button){button.textContent='✅ تم إكمال الدرس';button.disabled=true;}
    },{passive:true});

    window.dispatchEvent(new CustomEvent('hm:lesson-runtime-ready',{detail:{lessonReady:true}}));
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
