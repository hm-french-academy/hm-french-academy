// HM Academy assessment beta bridge
(function(){
  window.HMAssessmentBridge={
    complete:function(result){
      try{
        localStorage.setItem('hm_last_assessment_result',JSON.stringify(result||{}));
      }catch(e){}
      if(window.HMBetaBridge){
        HMBetaBridge.assessmentCompleted();
        HMBetaBridge.progressSaved();
      }
      window.dispatchEvent(new CustomEvent('hm:assessment-completed',{detail:result||{}}));
    }
  };
})();
