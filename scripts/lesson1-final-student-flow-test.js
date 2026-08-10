// HM Academy Leçon 1 Final Student Flow Test
(function(){
  function runDemoFlow(){
    if(!window.HMLecon1ValidationRuntime) return {ready:false,reason:'runtime missing'};
    const r=window.HMLecon1ValidationRuntime;
    r.audioTest();
    r.activityTest();
    r.quizTest();
    r.assessmentTest();
    r.progressTest();
    const report=window.HMLecon1ApprovalGenerator?
      window.HMLecon1ApprovalGenerator.evaluate():null;
    return report;
  }
  window.HMLecon1FinalStudentFlow={runDemoFlow:runDemoFlow};
})();
