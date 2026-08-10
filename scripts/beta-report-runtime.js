// HM Academy Beta Report Runtime
(function(){
  function render(target){
    const el=typeof target==='string'?document.querySelector(target):target;
    if(!el||!window.HMBetaFlowRunner)return;
    const report=HMBetaFlowRunner.report();
    const done=HMBetaFlowRunner.isComplete();
    el.innerHTML=report.map(i=>`<li>${i.done?'✅':'⬜'} ${i.step}</li>`).join('')+
      `<strong>${done?'🎉 Beta Flow Completed':'⏳ Beta Flow In Progress'}</strong>`;
  }
  window.HMBetaReportRuntime={render};
})();
