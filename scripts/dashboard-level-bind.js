// HM Academy dashboard level and achievements binder
(function(){
  function render(){
    const levelTarget=document.getElementById('level');
    const summaryTarget=document.getElementById('gamificationSummary');
    if(window.HMLevelSystem){
      const level=HMLevelSystem.get();
      if(levelTarget) levelTarget.textContent=level.name;
      if(summaryTarget) summaryTarget.textContent=`🏆 ${level.name} · 📈 ${level.progress}% إلى المستوى التالي`;
    }
  }
  document.addEventListener('DOMContentLoaded',render);
  window.addEventListener('hm:activity-completed',render);
})();
