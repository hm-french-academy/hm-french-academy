// HM Academy learning progress controller
const HMProgress = {
  storageKey: 'hm_academy_progress',

  get(){
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : {
      xp: 0,
      completedLessons: [],
      achievements: []
    };
  },

  save(data){
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  },

  completeLesson(id, xp = 50){
    const data = this.get();
    if(!data.completedLessons.includes(id)){
      data.completedLessons.push(id);
      data.xp += xp;
    }
    this.save(data);
    return data;
  },

  addAchievement(id){
    const data = this.get();
    if(!data.achievements.includes(id)){
      data.achievements.push(id);
    }
    this.save(data);
    return data;
  },

  summary(){
    const data = this.get();
    return {
      xp: data.xp || 0,
      lessons: data.completedLessons.length,
      achievements: data.achievements.length
    };
  }
};
