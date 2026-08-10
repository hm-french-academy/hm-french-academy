// HM Academy unified game runtime
(function(){
  window.HMGameRuntime={
    start:function(limit){return {started:Date.now(),limit:Number(limit)||60}},
    finish:function(state,correct,total){
      const seconds=Math.round((Date.now()-state.started)/1000);
      const result=window.HMGameScoring?HMGameScoring.calculate(correct,total,seconds,state.limit):{score:0,bonusXP:0};
      return Object.assign(result,{seconds});
    }
  };
})();
