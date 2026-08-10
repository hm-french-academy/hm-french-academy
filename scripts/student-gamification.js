// HM Academy student gamification summary
(function(){
  window.HMStudentGamification={
    getSummary:function(){
      const data=window.HMProgress?HMProgress.get():{xp:0,completedActivities:[],achievements:[]};
      return {
        xp:Number(data.xp)||0,
        activities:Array.isArray(data.completedActivities)?data.completedActivities.length:0,
        achievements:Array.isArray(data.achievements)?data.achievements.length:0
      };
    },
    render:function(container){
      if(!container)return;
      const s=this.getSummary();
      container.innerHTML=`⭐ ${s.xp} XP · 🎮 ${s.activities} Activities · 🏅 ${s.achievements} Badges`;
    }
  };
})();
