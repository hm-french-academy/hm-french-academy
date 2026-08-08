// HM Academy lesson completion UI helper
function markLessonComplete(lessonId, achievementId = 'first-step') {
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

  const message = document.getElementById('completion-message');
  if (message) {
    message.textContent = '🎉 تم إكمال الدرس وإضافة نقاط الخبرة';
  }
}
