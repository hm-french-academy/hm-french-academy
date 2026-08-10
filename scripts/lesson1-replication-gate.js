// HM Academy Leçon 1 Replication Gate
(function(){
 function check(){
  const report=JSON.parse(localStorage.getItem('hm_lesson1_approval_report')||'{}');
  const ready=report.approvedForReplication===true;
  window.dispatchEvent(new CustomEvent('hm:replication-gate',{detail:{ready:ready,report:report}}));
  return ready;
 }
 window.HMLecon1ReplicationGate={check:check};
})();
