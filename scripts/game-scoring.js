// HM Academy game scoring utilities
(function(){
  window.HMGameScoring={
    calculate:function(correct,total,seconds,limit){
      correct=Math.max(0,Number(correct)||0); total=Math.max(1,Number(total)||1); seconds=Math.max(0,Number(seconds)||0); limit=Math.max(1,Number(limit)||60);
      const accuracy=correct/total; const speed=Math.max(0,1-Math.min(seconds/limit,1));
      return {accuracy:Math.round(accuracy*100),bonusXP:Math.round((accuracy*.7+speed*.3)*20),score:Math.round((accuracy*.7+speed*.3)*100)};
    }
  };
})();
