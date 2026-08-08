// HM Academy CEFR level engine
async function getStudentLevel(xp = 0){
  const response = await fetch('data/levels.json');
  const data = await response.json();
  return data.levels.find(level => xp >= level.minXP && xp <= level.maxXP) || data.levels[0];
}

async function renderStudentLevel(){
  const progress = HMProgress.get();
  const level = await getStudentLevel(progress.xp || 0);

  const elements = document.querySelectorAll('[data-student-level]');
  elements.forEach(el => el.textContent = `${level.id} - ${level.title}`);
}

document.addEventListener('DOMContentLoaded', renderStudentLevel);
