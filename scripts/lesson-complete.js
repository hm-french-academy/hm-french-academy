// HM Academy lesson completion helper
function markLessonComplete(lessonId, achievementId='lesson-finish', skill='grammar') {
  if (!window.HMProgress) return false;
  const id=lessonId||new URLSearchParams(location.search).get('id')||'lesson-hello';
  const before=HMProgress.get();
  const alreadyCompleted=Array.isArray(before.completedLessons)&&before.completedLessons.includes(id);
  HMProgress.completeLesson(id,50);
  if(!alreadyCompleted){
    if(achievementId&&window.HMProgress.addAchievement) HMProgress.addAchievement(achievementId);
    if(window.HMActivity?.add) HMActivity.add('lesson','إكمال الدرس: '+id);
    if(window.HMSkills?.add) HMSkills.add(skill,10);
    if(window.HMStreak?.checkIn) HMStreak.checkIn();
    if(window.HMRewards?.unlock) HMRewards.unlock('lesson-finish');
  }
  const button=document.querySelector('#completeBtn,[data-complete-lesson]');
  if(button){button.textContent='✅ تم إكمال الدرس';button.disabled=true;button.setAttribute('aria-pressed','true');}
  const message=document.querySelector('#completionMessage,#completion-message');
  if(message)message.textContent=alreadyCompleted?'ℹ️ هذا الدرس مكتمل بالفعل وتم الحفاظ على تقدمك.':'🎉 تم إكمال الدرس وحفظ التقدم وإضافة 50 XP.';
  window.dispatchEvent(new CustomEvent('hm:activity-completed',{detail:{lessonId:id,activityId:'lesson-complete',xp:alreadyCompleted?0:50}}));
  window.dispatchEvent(new CustomEvent('hm:lesson-completed',{detail:{lessonId:id,alreadyCompleted}}));
  return true;
}
