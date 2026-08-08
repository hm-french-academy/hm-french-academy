// HM Academy personalized learning path engine
async function getLearningPath(level){
  const response = await fetch('data/learning-paths.json');
  const data = await response.json();
  return (data.learningPaths || []).find(path => path.level === level) || null;
}

async function renderRecommendedPath(){
  if(!window.HMProgress) return;
  const progress = HMProgress.get();
  const level = await getStudentLevel(progress.xp || 0);
  const path = await getLearningPath(level.id);
  const target = document.getElementById('recommended-path');
  if(target && path){
    target.textContent = path.title.ar;
  }
}

document.addEventListener('DOMContentLoaded', renderRecommendedPath);
