// HM Academy reward system
(function(){
  const rewards=[
    {id:'first-activity',xp:10,title:'🌱 First Step',desc:'أكملت أول نشاط تعلم.'},
    {id:'first-game',xp:20,title:'🎮 Game Starter',desc:'أكملت أول لعبة.'},
    {id:'lesson-finish',xp:50,title:'📘 Lesson Finisher',desc:'أكملت أول درس.'},
    {id:'vocab-10',xp:30,title:'📚 Word Collector',desc:'أكملت 10 أنشطة تعلم.'},
    {id:'streak-3',xp:15,title:'🔥 3 Day Streak',desc:'تعلمت 3 أيام متتالية.'},
    {id:'streak-7',xp:30,title:'🔥 7 Day Streak',desc:'تعلمت 7 أيام متتالية.'},
    {id:'unit-finish',xp:100,title:'🏆 Unit Explorer',desc:'أكملت جميع دروس الوحدة.'}
  ];
  function getUnlocked(){try{return JSON.parse(localStorage.getItem('hm_rewards'))||[]}catch(e){return []}}
  function unlock(id){const list=getUnlocked();if(!list.includes(id)){list.push(id);localStorage.setItem('hm_rewards',JSON.stringify(list));const r=rewards.find(x=>x.id===id);if(r&&window.HMProgress)window.HMProgress.addXP(r.xp)}return list}
  function evaluate(){const d=window.HMProgress?.get?.()||{completedLessons:[],completedActivities:[]};const acts=d.completedActivities?.length||0;if(acts>=1)unlock('first-activity');if(acts>=10)unlock('vocab-10');if((d.completedLessons||[]).length>=1)unlock('lesson-finish');const st=window.HMStreak?.get?.()||{days:0};if(st.days>=3)unlock('streak-3');if(st.days>=7)unlock('streak-7');const lessons=new Set(d.completedLessons||[]);['unit-1','unit-2','unit-3'].forEach(u=>{const ok=[1,2,3,4].every(n=>lessons.has('grade8-'+u+'-l'+n));if(ok)unlock('unit-finish')});return getUnlocked()}
  window.HMRewards={rewards,getUnlocked,unlock,evaluate};
})();