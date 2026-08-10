// HM Academy Leçon 1 Validation Runtime
(function(){
  const state={
    open:true,
    audio:false,
    activities:false,
    quiz:false,
    assessment:false,
    progress:false
  };
  function update(key){
    if(key in state) state[key]=true;
    localStorage.setItem('hm_lesson1_validation_state',JSON.stringify(state));
    window.dispatchEvent(new CustomEvent('hm:lesson1-validation-updated',{detail:state}));
  }
  function report(){
    return Object.keys(state).map(k=>({step:k,done:state[k]}));
  }
  window.HMLecon1ValidationRuntime={
    audioTest:function(){update('audio')},
    activityTest:function(){update('activities')},
    quizTest:function(){update('quiz')},
    assessmentTest:function(){update('assessment')},
    progressTest:function(){update('progress')},
    report:report
  };
})();
