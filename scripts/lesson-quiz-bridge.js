// HM Academy interactive quiz bridge
// Connects lesson quizzes with the central progress engine without replacing existing runtime.
(function(){
  window.HMQuizBridge = {
    complete(lessonId, score, xp){
      const id = lessonId || 'lesson-unknown';
      const reward = xp || 50;
      if(window.HMProgress && typeof HMProgress.completeLesson === 'function'){
        HMProgress.completeLesson(id, reward);
      }
      if(window.HMProgress && typeof HMProgress.addAchievement === 'function'){
        HMProgress.addAchievement('quiz-master');
      }
      window.dispatchEvent(new CustomEvent('hm:quiz-completed', {
        detail:{lessonId:id, score:score || 0, xp:reward}
      }));
      return true;
    }
  };
})();
