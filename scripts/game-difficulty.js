// HM Academy adaptive game difficulty
(function(){
  window.HMGameDifficulty={
    get:function(activityId){
      try{
        const key='hm_game_difficulty'; const data=JSON.parse(localStorage.getItem(key)||'{}');
        return data[activityId]||'easy';
      }catch(e){return 'easy'}
    },
    set:function(activityId,level){
      const allowed=['easy','medium','hard']; if(!allowed.includes(level))return;
      let data={};try{data=JSON.parse(localStorage.getItem('hm_game_difficulty')||'{}')}catch(e){}
      data[activityId]=level;localStorage.setItem('hm_game_difficulty',JSON.stringify(data));
    }
  };
})();
