// HM Academy activity rewards bridge
(function(){
  window.HMActivityRewards={
    handle:function(detail){
      if(!detail)return;
      if(window.HMStreak) HMStreak.checkIn();
      if(window.HMRewards){
        HMRewards.unlock('first-game');
        const data=window.HMProgress?HMProgress.get():{completedLessons:[]};
        if(Array.isArray(data.completedLessons)&&data.completedLessons.length) HMRewards.unlock('lesson-finish');
      }
      if(window.HMAchievements&&typeof HMAchievements.evaluate==='function') HMAchievements.evaluate();
    }
  };
  window.addEventListener('hm:activity-completed',e=>HMActivityRewards.handle(e.detail));
})();
