// HM Academy Leçon 1 Preview Runtime
(function(){
  function mark(step){
    if(window.HMLesson1E2E){
      HMLesson1E2E.mark(step);
    }
  }
  window.HMLesson1PreviewRuntime={
    opened:function(){mark('lesson-opened')},
    audio:function(){mark('audio-tested')},
    activity:function(){mark('activity-tested')},
    quiz:function(){mark('quiz-tested')},
    assessment:function(){mark('assessment-tested')},
    progress:function(){mark('progress-verified')}
  };
  document.addEventListener('DOMContentLoaded',function(){mark('lesson-opened')});
})();
