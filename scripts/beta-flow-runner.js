// HM Academy Beta Flow Runner
(function(){
  const flow=[
    'curriculum-loaded',
    'lesson-opened',
    'interactive-started',
    'activity-completed',
    'assessment-completed',
    'progress-saved'
  ];
  function report(){
    const done=(window.HMBetaChecklist&&HMBetaChecklist.status())||[];
    return flow.map(step=>({step,done:done.includes(step)}));
  }
  function isComplete(){
    return report().every(x=>x.done);
  }
  window.HMBetaFlowRunner={report,isComplete,flow};
})();
