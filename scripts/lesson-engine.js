// HM Academy unified lesson engine
const HMLessonEngine = {
  async load(id){
    const response = await fetch(`data/lessons/${id}.json`);
    return await response.json();
  },

  complete(lesson){
    if(window.HMProgress){
      HMProgress.completeLesson(lesson.id, lesson.xpReward || 50);
    }

    if(window.HMSkills && lesson.skills){
      lesson.skills.forEach(skill => HMSkills.add(skill, 10));
    }

    if(window.HMActivity){
      HMActivity.add('lesson', 'إكمال: ' + lesson.id);
    }
  }
};
