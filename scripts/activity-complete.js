// HM Academy activity completion bridge
(function(){
  window.HMActivityComplete = {
    complete: function(lessonId, activityId, xp){
      const payload={
        lessonId: lessonId || 'unknown',
        activityId: activityId || 'unknown',
        xp: xp || 0,
        completedAt: new Date().toISOString()
      };
      try{
        const key='hmAcademy.activities.completed';
        const old=JSON.parse(localStorage.getItem(key)||'[]');
        if(!old.some(a=>a.activityId===payload.activityId && a.lessonId===payload.lessonId)) old.push(payload);
        localStorage.setItem(key,JSON.stringify(old));
      }catch(e){}
      if(window.HMProgress && typeof HMProgress.addXP==='function') HMProgress.addXP(payload.xp);
      window.dispatchEvent(new CustomEvent('hm:activity-completed',{detail:payload}));
      return payload;
    }
  };
})();
