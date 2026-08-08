// HM Academy lesson completion UI helper
function markLessonComplete(lessonId, achievementId = 'first-step', skill = 'grammar') {
  if (!window.HMProgress) {
    console.warn('Progress engine is not loaded');
    return;
  }

  HMProgress.completeLesson(lessonId, 50);

  if (achievementId) {
    HMProgress.addAchievement(achievementId);
  }

  if (window.HMActivity) {
    HMActivity.add('lesson', 'إكمال الدرس: ' + lessonId);
  }

  if (window.HMSkills) {
    HMSkills.add(skill, 10);
  }

  const button = document.querySelector('[data-complete-lesson]');
  if (button) {
    button.textContent = '✅ تم إكمال الدرس';
    button.disabled = true;
  }

  const message = document.getElementById('completion-message');
  if (message) {
    message.textContent = '🎉 تم إكمال الدرس وتحديث تقدم الطالب';
  }
}
