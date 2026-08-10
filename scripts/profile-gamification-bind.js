// HM Academy profile gamification binder
(function(){
  function refresh(){
    const target=document.getElementById('studentStats');
    if(!target || !window.HMStudentGamification) return;
    HMStudentGamification.render(target);
  }
  window.addEventListener('hm:profile-saved', refresh);
  window.addEventListener('hm:activity-completed', refresh);
  document.addEventListener('DOMContentLoaded', refresh);
})();
