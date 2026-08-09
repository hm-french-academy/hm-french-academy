// HM Academy CEFR level engine
const HMLevels = {
  fallback: { id: 'A1', title: 'Beginner', description: 'أساسيات اللغة الفرنسية للمبتدئين', minXP: 0, maxXP: 999 },
  async load(){
    try {
      const response = await fetch('data/levels.json', {cache:'no-store'});
      if(!response.ok) throw new Error('levels.json unavailable');
      const data = await response.json();
      if(!Array.isArray(data.levels) || !data.levels.length) throw new Error('Invalid levels data');
      return data.levels;
    } catch(error){
      console.warn('HM Academy levels fallback:', error);
      return [this.fallback];
    }
  },
  async get(xp = 0){
    const safeXP = Number.isFinite(Number(xp)) ? Math.max(0, Number(xp)) : 0;
    const levels = await this.load();
    return levels.find(level => safeXP >= Number(level.minXP) && safeXP <= Number(level.maxXP)) || levels[levels.length - 1] || this.fallback;
  }
};

async function getStudentLevel(xp = 0){
  return HMLevels.get(xp);
}

async function renderStudentLevel(){
  if(!window.HMProgress) return;
  const progress = HMProgress.get();
  const level = await getStudentLevel(progress.xp || 0);
  document.querySelectorAll('[data-student-level]').forEach(el => {
    el.textContent = `${level.id} - ${level.title}`;
  });
}

if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderStudentLevel, {once:true});
else renderStudentLevel();
