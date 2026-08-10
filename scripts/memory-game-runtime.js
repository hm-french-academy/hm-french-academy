// HM Academy vocabulary memory game runtime
(function(){
  window.HMMemoryGame={
    finish:function(lessonId, moves, pairs){
      const total=Number(pairs)||0;
      const score=total?Math.round(Math.max(0,total*2-Math.min(Number(moves)||0,total))/total*100):0;
      const xp=Math.max(10,Math.round(score/2));
      if(window.HMActivityComplete){
        HMActivityComplete.complete(lessonId||'grade8-u1-l1','memory-game',xp);
      }
      return {score,xp};
    }
  };
})();
