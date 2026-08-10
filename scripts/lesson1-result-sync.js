// HM Academy Leçon 1 Result Sync
(function(){
  function sync(type,result){
    const payload={
      lessonId:'grade8-u1-l1',
      type:type,
      result:result||{},
      syncedAt:new Date().toISOString()
    };
    try{
      localStorage.setItem('hm_lesson1_last_result',JSON.stringify(payload));
    }catch(e){}
    if(type==='quiz' && window.HMQuizBetaBridge){
      HMQuizBetaBridge.completeQuiz('grade8-u1-l1-quiz','grade8-u1-l1',payload.result.score||0);
    }
    if(type==='assessment' && window.HMAssessmentBridge){
      HMAssessmentBridge.complete(payload);
    }
    window.dispatchEvent(new CustomEvent('hm:lesson1-result-synced',{detail:payload}));
    return payload;
  }
  window.HMLecon1ResultSync={quiz:function(r){return sync('quiz',r)},assessment:function(r){return sync('assessment',r)}};
})();
