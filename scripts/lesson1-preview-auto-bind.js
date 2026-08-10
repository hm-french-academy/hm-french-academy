// HM Academy Leçon 1 Preview Auto Bind
(function(){
  function bind(){
    if(!window.HMLecon1PreviewEvents)return;
    document.querySelectorAll('audio, video, button.listen, button.speak').forEach(function(el){
      el.addEventListener('click',function(){
        HMLecon1PreviewEvents.audioStarted();
      });
    });
    window.addEventListener('hm:activity-completed',function(){
      HMLecon1PreviewEvents.activityCompleted();
    });
    window.addEventListener('hm:assessment-completed',function(){
      HMLecon1PreviewEvents.assessmentCompleted();
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
})();
