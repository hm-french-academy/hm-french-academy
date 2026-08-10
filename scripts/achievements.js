// HM Academy achievements engine
(function(){
  window.HMAchievements={
    evaluate:function(){
      if(!window.HMProgress) return [];
      const data=HMProgress.get();
      const unlocked=[];
      const rules=[
        ['first-activity','🏅 First Activity',data.completedActivities.length>=1],
        ['five-activities','🏅 Practice Explorer',data.completedActivities.length>=5],
        ['xp-starter','🏅 XP Starter',data.xp>=100],
        ['lesson-complete','🏅 Lesson Complete',data.completedLessons.length>=1]
      ];
      rules.forEach(r=>{if(r[2]&&!data.achievements.includes(r[0])){HMProgress.addAchievement(r[0]);unlocked.push({id:r[0],title:r[1]})}});
      return unlocked;
    }
  };
})();
