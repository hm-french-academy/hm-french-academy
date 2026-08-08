// HM Academy smart recommendation engine
function getSkillRecommendations(){
  if(!window.HMSkills) return [];
  const skills = HMSkills.get();
  const recommendations = [];

  Object.entries(skills).forEach(([skill, value]) => {
    if(value < 40) recommendations.push('ركز على تطوير: ' + skill);
  });

  if(!recommendations.length){
    recommendations.push('ممتاز! استمر في تطوير جميع المهارات');
  }

  return recommendations;
}
