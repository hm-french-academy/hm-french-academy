// HM Academy Leçon 1 Approval Generator
(function(){
  function evaluate(){
    let state={};
    try{state=JSON.parse(localStorage.getItem('hm_lesson1_validation_state')||'{}')}catch(e){}
    const required=['open','audio','activities','quiz','assessment','progress'];
    const approved=required.every(k=>state[k]===true);
    const report={
      lesson:'grade8-u1-l1',
      approvedForReplication:approved,
      validation:state,
      generatedAt:new Date().toISOString()
    };
    localStorage.setItem('hm_lesson1_approval_report',JSON.stringify(report));
    window.dispatchEvent(new CustomEvent('hm:lesson1-approval-updated',{detail:report}));
    return report;
  }
  window.HMLecon1ApprovalGenerator={evaluate:evaluate};
})();
