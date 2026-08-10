// HM Academy Quiz Beta Bridge
(function(){
  function completeQuiz(quizId, lessonId, score){
    const result={quizId:quizId||'unknown',lessonId:lessonId||'unknown',score:Number(score)||0};
    if(window.HMActivityComplete){
      HMActivityComplete.complete(result.lessonId,'quiz-'+result.quizId,20);
    }
    window.dispatchEvent(new CustomEvent('hm:assessment-completed',{detail:result}));
    return result;
  }
  window.HMQuizBetaBridge={completeQuiz};
})();
