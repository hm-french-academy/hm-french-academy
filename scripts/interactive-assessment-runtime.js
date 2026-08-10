// HM Academy interactive assessment runtime bridge
(function(){
  const lessonId='grade8-u1-l1', activityId='interactive-assessment';
  function complete(score,total){
    const pct=Math.round((score/total)*100);
    const xp=Math.max(20,Math.round((score/total)*50));
    return {lessonId,activityId,score:pct,accuracy:pct,xp};
  }
  window.HMInteractiveAssessment={complete};
})();
