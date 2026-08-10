// HM Academy Games Beta Bridge
(function(){
  function completeGame(gameId, lessonId){
    const detail={gameId:gameId||'unknown',lessonId:lessonId||'unknown',completedAt:new Date().toISOString()};
    if(window.HMActivityComplete){
      HMActivityComplete.complete(detail.lessonId, 'game-'+detail.gameId, 10);
    }
    window.dispatchEvent(new CustomEvent('hm:activity-completed',{detail}));
    return detail;
  }
  window.HMGameBetaBridge={completeGame};
})();
