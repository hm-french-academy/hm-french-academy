// HM Academy lesson completion UI helper
function markLessonComplete(lessonId, achievementId = 'first-step', skill = 'grammar') {
  if (!window.HMProgress) {
    console.warn('Progress engine is not loaded');
    return false;
  }

  const id = lessonId || 'lesson-hello';
  const progress = HMProgress.get();
  const alreadyCompleted = Array.isArray(progress.completedLessons) && progress.completedLessons.includes(id);

  if (!alreadyCompleted) {
    HMProgress.completeLesson(id, 50);
    if (achievementId && window.HMProgress.addAchievement) HMProgress.addAchievement(achievementId);
    if (window.HMActivity) HMActivity.add('lesson', 'إكمال الدرس: ' + id);
    if (window.HMSkills) HMSkills.add(skill, 10);
    if (window.HMStreak) HMStreak.checkIn();
    if (window.HMRewards) HMRewards.unlock('lesson-finish');
    window.dispatchEvent(new CustomEvent('hm:activity-completed',{detail:{lessonId:id,activityId:'lesson-complete',xp:50}}));
  }

  const button = document.querySelector('[data-complete-lesson]');
  if (button) {
    button.textContent = '✅ تم إكمال الدرس';
    button.disabled = true;
    button.setAttribute('aria-pressed', 'true');
  }

  const message = document.getElementById('completion-message');
  if (message) message.textContent = alreadyCompleted ? 'ℹ️ هذا الدرس مكتمل بالفعل وتم الحفاظ على تقدمك.' : '🎉 تم إكمال الدرس وتحديث تقدم الطالب';

  window.dispatchEvent(new CustomEvent('hm:lesson-completed', {detail:{lessonId:id, alreadyCompleted}}));
  return true;
}

(function(){
  function bind(){
    const button = document.querySelector('[data-complete-lesson]');
    if(!button || button.dataset.bound === 'true') return;
    button.dataset.bound = 'true';
    const lessonId = new URLSearchParams(location.search).get('id') || 'lesson-hello';
    const progress = window.HMProgress && HMProgress.get ? HMProgress.get() : null;
    if(progress && Array.isArray(progress.completedLessons) && progress.completedLessons.includes(lessonId)){
      button.textContent = '✅ تم إكمال الدرس';
      button.disabled = true;
    }
    button.addEventListener('click', function(){ markLessonComplete(lessonId); });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind, {once:true});
  else bind();
})();
