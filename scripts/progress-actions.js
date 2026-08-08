// HM Academy lesson completion actions
function completeLesson(lessonId, achievementId){
  if(!window.HMProgress) return;

  const result = HMProgress.completeLesson(lessonId, 50);

  if(achievementId){
    HMProgress.addAchievement(achievementId);
  }

  alert('🎉 تم إكمال الدرس! تمت إضافة 50 XP');
  return result;
}
