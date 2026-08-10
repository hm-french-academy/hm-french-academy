// HM Academy reward system
(function(){
  window.HMRewards={
    rewards:[
      {id:'first-game',xp:20,title:'🎮 Game Starter'},
      {id:'lesson-finish',xp:50,title:'📘 Lesson Finisher'},
      {id:'streak-7',xp:30,title:'🔥 7 Day Streak'}
    ],
    getUnlocked:function(){
      try{return JSON.parse(localStorage.getItem('hm_rewards'))||[]}catch(e){return []}
    },
    unlock:function(id){
      const list=this.getUnlocked();
      if(!list.includes(id)){list.push(id);localStorage.setItem('hm_rewards',JSON.stringify(list))}
      return list;
    }
  };
})();
