// HM Academy student profile statistics renderer
(function(){
  function render(){
    const target=document.getElementById('studentStats');
    if(!target || !window.HMStudentGamification) return;
    const s=HMStudentGamification.getSummary();
    target.innerHTML=`<div>⭐ XP: ${s.xp}</div><div>🎮 Activities: ${s.activities}</div><div>🏅 Badges: ${s.achievements}</div>`;
  }
  document.addEventListener('DOMContentLoaded',render);
  window.addEventListener('hm:activity-completed',render);
  window.addEventListener('hm:profile-saved',render);
})();
