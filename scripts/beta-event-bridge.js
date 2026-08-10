// HM Academy Beta Event Bridge
(function(){
  function mark(step){
    if(window.HMBetaChecklist && typeof HMBetaChecklist.mark==='function'){
      HMBetaChecklist.mark(step);
    }
  }
  window.HMBetaBridge={
    curriculumLoaded:function(){mark('curriculum-loaded')},
    lessonOpened:function(){mark('lesson-opened')},
    interactiveStarted:function(){mark('interactive-started')},
    activityCompleted:function(){mark('activity-completed')},
    assessmentCompleted:function(){mark('assessment-completed')},
    progressSaved:function(){mark('progress-saved')}
  };
})();
