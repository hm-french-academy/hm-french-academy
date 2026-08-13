// HM Academy Premium Lesson Studio runtime integration
(function(){
  window.HMLessonRuntimeStatus={scripts:[],ready:false};

  function loadScript(src){
    return new Promise(resolve=>{
      if(document.querySelector(`script[src="${src}"]`)){
        window.HMLessonRuntimeStatus.scripts.push({src,status:'already-loaded'});
        resolve();
        return;
      }
      const script=document.createElement('script');
      script.src=src;
      script.defer=true;
      script.onload=()=>{
        window.HMLessonRuntimeStatus.scripts.push({src,status:'loaded'});
        resolve();
      };
      script.onerror=()=>{
        window.HMLessonRuntimeStatus.scripts.push({src,status:'missing'});
        resolve();
      };
      document.head.appendChild(script);
    });
  }

  async function loadLessonBridge(){
    const pipeline=[
      'scripts/lesson-supabase-bridge.js',
      'scripts/premium-lesson-data-adapter.js',
      'scripts/premium-lesson-studio-bridge.js',
      'scripts/premium-lesson-priority-runtime.js',
      'scripts/lesson-media-runtime.js',
      'scripts/assessment-engine.js',
      'scripts/lesson-complete.js'
    ];

    for(const script of pipeline){ await loadScript(script); }

    if(window.HMLessonBridge){
      window.HMLessonBridge.load().catch(err=>console.warn('Lesson bridge error',err));
    }

    window.HMLessonRuntimeStatus.ready=true;
    window.dispatchEvent(new CustomEvent('hm:runtime-diagnostics-ready',{detail:window.HMLessonRuntimeStatus}));
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
      window.HMLessonQuality={status:'Ready',missing:validateLesson(lesson)};
      window.dispatchEvent(new CustomEvent('hm:premium-lesson-ready',{
        detail:{lesson,media:true,assessment:true,progress:true}
      }));
      document.documentElement.dataset.lessonLoaded='true';
    });

    window.addEventListener('hm:lesson-completed',()=>{
      const button=document.querySelector('[data-complete-lesson]');
      if(button){
        button.textContent='✅ تم إكمال الدرس';
        button.disabled=true;
      }
    });

    window.dispatchEvent(new CustomEvent('hm:lesson-runtime-ready',{
      detail:{lessonReady:true,studio:'premium'}
    }));
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
