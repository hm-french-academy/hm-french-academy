// HM Academy Leçon 1 Validation Event Bridge
(function(){
  function connect(){
    if(!window.HMLecon1ValidationRuntime)return;
    window.addEventListener('hm:audio-played',()=>HMLecon1ValidationRuntime.audioTest());
    window.addEventListener('hm:activity-completed',()=>HMLecon1ValidationRuntime.activityTest());
    window.addEventListener('hm:quiz-completed',()=>HMLecon1ValidationRuntime.quizTest());
    window.addEventListener('hm:assessment-completed',()=>HMLecon1ValidationRuntime.assessmentTest());
    window.addEventListener('hm:progress-synced',()=>HMLecon1ValidationRuntime.progressTest());
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',connect); else connect();
})();
