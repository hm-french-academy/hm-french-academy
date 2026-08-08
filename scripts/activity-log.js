// HM Academy student activity logger
const HMActivity = {
  key: 'hm_academy_activity',

  get(){
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  },

  add(type, title){
    const items = this.get();
    items.unshift({
      type,
      title,
      date: new Date().toISOString()
    });
    localStorage.setItem(this.key, JSON.stringify(items.slice(0,20)));
    return items;
  }
};
