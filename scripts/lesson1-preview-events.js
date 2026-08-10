// HM Academy Leçon 1 Preview Event Helpers
(function(){
  function run(name){
    if(window.HMLesson1PreviewRuntime && typeof window.HMLesson1PreviewRuntime[name]==='function'){
      window.HMLesson1PreviewRuntime[name]();
    }
  }
  window.HMLecon1PreviewEvents={
    audioStarted:function(){run('audio')},
    activityCompleted:function(){run('activity')},
    quizCompleted:function(){run('quiz')},
    assessmentCompleted:function(){run('assessment')},
    progressChecked:function(){run('progress')}
  };
})();
