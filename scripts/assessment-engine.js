// HM Academy smart assessment engine
const HMAssessment = {
  calculate(result, total){
    if(!total) return 0;
    return Math.round((result / total) * 100);
  },

  analyze(score){
    if(score >= 90) return 'excellent';
    if(score >= 70) return 'good';
    if(score >= 50) return 'needs-practice';
    return 'needs-review';
  },

  updateSkills(answers){
    if(!window.HMSkills) return;
    answers.forEach(item => {
      if(item.correct){
        HMSkills.add(item.skill, 5);
      }
    });
  },

  completeLesson(lessonId, score){
    try{
      window.dispatchEvent(new CustomEvent('hm:assessment-completed',{
        detail:{lessonId, score, completed:true}
      }));

      if(window.HMProgress && typeof HMProgress.completeLesson === 'function'){
        HMProgress.completeLesson(lessonId, score || 0);
      }
    }catch(e){
      console.warn('Assessment completion sync skipped', e);
    }
  }
};
