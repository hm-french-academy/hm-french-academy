// HM Academy student level system
(function(){
  window.HMLevelSystem={
    calculate:function(xp){
      const levels=[
        {name:'Beginner',min:0,next:100},
        {name:'Explorer',min:100,next:300},
        {name:'French Learner',min:300,next:700},
        {name:'French Master',min:700,next:1200}
      ];
      return levels.slice().reverse().find(l=>xp>=l.min)||levels[0];
    },
    get:function(){
      const data=window.HMProgress?HMProgress.get():{xp:0};
      const xp=Number(data.xp)||0;
      const level=this.calculate(xp);
      return {xp, name:level.name, progress:Math.min(100,Math.round(((xp-level.min)/(level.next-level.min))*100))};
    }
  };
})();
