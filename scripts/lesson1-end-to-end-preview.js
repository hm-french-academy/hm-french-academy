// HM Academy Leçon 1 End-to-End Preview Runner
(function(){
  const steps=[
    'lesson-opened',
    'audio-tested',
    'activity-tested',
    'quiz-tested',
    'assessment-tested',
    'progress-verified'
  ];
  function mark(step){
    const key='hm_lesson1_e2e_preview';
    const state=JSON.parse(localStorage.getItem(key)||'[]');
    if(steps.includes(step)&&!state.includes(step)){
      state.push(step);
      localStorage.setItem(key,JSON.stringify(state));
    }
  }
  function report(){
    const state=JSON.parse(localStorage.getItem('hm_lesson1_e2e_preview')||'[]');
    return steps.map(step=>({step,done:state.includes(step)}));
  }
  window.HMLesson1E2E={mark,report,steps};
})();
