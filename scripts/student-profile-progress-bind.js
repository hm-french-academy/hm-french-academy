// HM Academy student profile live progress binder
(function(){
  function render(){
    const container=document.getElementById('studentStats');
    if(!container)return;
    const progress=window.HMProgress?.get?.()||{};
    const level=window.HMLevelSystem?.get?.()||{name:'Beginner',progress:0};
    const streak=window.HMStreak?.get?.()||{days:0};
    const rewards=window.HMRewards?.getUnlocked?.()||[];
    container.innerHTML=`<div>⭐ XP: ${Number(progress.xp)||0}</div><div>🏆 المستوى: ${level.name}</div><div>📈 التقدم: ${level.progress}%</div><div>🔥 سلسلة التعلم: ${streak.days} يوم</div><div>🎁 المكافآت: ${rewards.length}</div>`;
  }
  document.addEventListener('DOMContentLoaded',render);
  window.addEventListener('hm:activity-completed',render);
  window.addEventListener('hm:profile-saved',render);
})();
