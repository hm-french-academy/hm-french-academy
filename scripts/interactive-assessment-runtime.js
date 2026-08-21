// HM Academy interactive assessment runtime bridge — lesson aware
(function(){'use strict';
  const params=new URLSearchParams(location.search);
  const lessonId=params.get('lesson')||'grade8-u1-l1';
  const activityId='interactive-assessment';
  function complete(score,total){
    const safeTotal=Math.max(1,Number(total)||1),safeScore=Math.max(0,Number(score)||0);
    const pct=Math.round((safeScore/safeTotal)*100),xp=Math.max(20,Math.round((safeScore/safeTotal)*50));
    const result={lessonId,activityId,score:pct,accuracy:pct,xp};
    try{localStorage.setItem('hm_last_interactive_assessment',JSON.stringify(result))}catch(e){}
    return result;
  }
  window.HMInteractiveAssessment={lessonId,activityId,complete};
})();