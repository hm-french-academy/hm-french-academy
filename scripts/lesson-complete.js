// HM Academy lesson completion UI helper
function markLessonComplete(lessonId, achievementId = 'first-step', skill = 'grammar') {
  if (!window.HMProgress) {
    console.warn('Progress engine is not loaded');
    return;
  }

  HMProgress.completeLesson(lessonId, 50);
  if (achievementId) HMProgress.addAchievement(achievementId);
  if (window.HMActivity) HMActivity.add('lesson', 'إكمال الدرس: ' + lessonId);
  if (window.HMSkills) HMSkills.add(skill, 10);

  const button = document.querySelector('[data-complete-lesson]');
  if (button) {
    button.textContent = '✅ تم إكمال الدرس';
    button.disabled = true;
  }

  const message = document.getElementById('completion-message');
  if (message) message.textContent = '🎉 تم إكمال الدرس وتحديث تقدم الطالب';
}

(function(){
  function bind(){
    const button = document.querySelector('[data-complete-lesson]');
    if(!button || button.dataset.bound === 'true') return;
    button.dataset.bound = 'true';
    button.addEventListener('click', function(){
      const lessonId = new URLSearchParams(location.search).get('id') || 'lesson-hello';
      markLessonComplete(lessonId);
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind, {once:true});
  else bind();
})();
