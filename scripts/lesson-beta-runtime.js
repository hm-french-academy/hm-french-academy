// HM Academy lesson beta runtime helper
(function(){
  function lessonReady(id){
    if(window.HMBetaBridge){
      HMBetaBridge.lessonOpened();
    }
    window.HMCurrentLesson=id;
  }
  function progressSaved(){
    if(window.HMBetaBridge) HMBetaBridge.progressSaved();
  }
  window.HMLessonBetaRuntime={lessonReady,progressSaved};
})();
