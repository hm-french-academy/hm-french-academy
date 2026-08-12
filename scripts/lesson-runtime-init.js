// HM Academy lesson runtime integration
(function(){
  function loadLessonBridge(){
    if(window.HMLessonBridge) return;
    const script=document.createElement('script');
    script.src='scripts/lesson-supabase-bridge.js';
    script.defer=true;
    script.onload=()=>{
      if(window.HMLessonBridge){
        window.HMLessonBridge.load().catch(err=>console.warn('Lesson bridge error',err));
      }
    };
    document.head.appendChild(script);
  }

  function validateLesson(lesson){
    const missing=[];
    if(!lesson?.title) missing.push('title');
    if(!lesson?.objective) missing.push('objective');
    if(!lesson?.duration) missing.push('duration');
    if(!Array.isArray(lesson?.sections) || !lesson.sections.length) missing.push('sections');
    return missing;
  }

  function init(){
    loadLessonBridge();

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

    window.addEventListener('hm:lesson-loaded',event=>{
      window.dispatchEvent(new CustomEvent('hm:supabase-lesson-ready',{detail:event.detail}));
    });

    window.addEventListener('hm:supabase-lesson-ready',event=>{
      const lesson=event.detail;
      const missing=validateLesson(lesson);
      window.HMLessonQuality={
        status:missing.length?'Needs Content':'Complete',
        missing
      };
      document.documentElement.dataset.lessonLoaded='true';
      window.HMCurrentLesson=lesson;
      window.dispatchEvent(new CustomEvent('hm:lesson-quality-ready',{detail:window.HMLessonQuality}));
    });

    window.addEventListener('hm:lesson-completed', () => {
      const button=document.querySelector('[data-complete-lesson]');
      if(button){
        button.textContent='✅ تم إكمال الدرس';
        button.disabled=true;
      }
    },{passive:true});

    window.dispatchEvent(new CustomEvent('hm:lesson-runtime-ready',{detail:{lessonReady:true}}));
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
