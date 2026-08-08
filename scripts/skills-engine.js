// HM Academy skill tracking engine
const HMSkills = {
  key: 'hm_academy_skills',

  get(){
    return JSON.parse(localStorage.getItem(this.key) || '{"listening":0,"speaking":0,"reading":0,"writing":0,"grammar":0}');
  },

  add(skill, points){
    const data = this.get();
    data[skill] = Math.min(100, (data[skill] || 0) + points);
    localStorage.setItem(this.key, JSON.stringify(data));
    return data;
  }
};
