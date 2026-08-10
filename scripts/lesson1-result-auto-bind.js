// HM Academy Leçon 1 Result Auto Bind
(function(){
  function bind(){
    if(!window.HMLecon1ResultSync)return;
    window.addEventListener('hm:quiz-completed',function(e){
      HMLecon1ResultSync.quiz(e.detail||{});
    });
    window.addEventListener('hm:assessment-completed',function(e){
      HMLecon1ResultSync.assessment(e.detail||{});
    });
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',bind);
  }else{
    bind();
  }
})();
