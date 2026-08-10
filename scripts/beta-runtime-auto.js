// HM Academy automatic beta event wiring
(function(){
  function wire(){
    if(window.HMBetaBridge){
      window.addEventListener('hm:activity-completed',()=>HMBetaBridge.activityCompleted());
      window.addEventListener('hm:assessment-completed',()=>HMBetaBridge.assessmentCompleted());
      window.addEventListener('hm:progress-saved',()=>HMBetaBridge.progressSaved());
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wire);else wire();
})();
