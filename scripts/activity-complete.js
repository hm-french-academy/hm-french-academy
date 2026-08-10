// HM Academy activity completion bridge
(function(){
  window.HMActivityComplete = {
    complete: function(lessonId, activityId, xp){
      const payload={lessonId:lessonId||'unknown',activityId:activityId||'unknown',xp:Number(xp)||0,completedAt:new Date().toISOString()};
      let firstCompletion=true;
      try{
        const key='hmAcademy.activities.completed';
        const old=JSON.parse(localStorage.getItem(key)||'[]');
        firstCompletion=!old.some(a=>a.activityId===payload.activityId&&a.lessonId===payload.lessonId);
        if(firstCompletion) old.push(payload);
        localStorage.setItem(key,JSON.stringify(old));
      }catch(e){}
      if(window.HMProgress){
        if(typeof HMProgress.completeActivity==='function') HMProgress.completeActivity(payload.lessonId+':'+payload.activityId,firstCompletion?payload.xp:0);
        else if(firstCompletion&&typeof HMProgress.addXP==='function') HMProgress.addXP(payload.xp);
      }
      if(firstCompletion) window.dispatchEvent(new CustomEvent('hm:activity-completed',{detail:payload}));
      return payload;
    }
  };
})();