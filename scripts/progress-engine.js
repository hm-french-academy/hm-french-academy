// HM Academy Progress Engine
async function loadStudentProgress(){
  try{
    const response = await fetch('data/progress-schema.json');
    if(!response.ok) return null;
    const data = await response.json();
    return data;
  }catch(error){
    console.warn('Progress unavailable', error);
    return null;
  }
}

async function renderProgress(){
  const data = await loadStudentProgress();
  if(!data) return;

  const student = data.student || {};
  const level = document.querySelector('[data-student-level]');
  const xp = document.querySelector('[data-student-xp]');
  const streak = document.querySelector('[data-student-streak]');

  if(level) level.textContent = student.level || 'A1';
  if(xp) xp.textContent = student.xp || 0;
  if(streak) streak.textContent = student.streak || 0;
}

document.addEventListener('DOMContentLoaded', renderProgress);
