// HM Academy Student Progress Summary
(function(){
  function getSummary(){
    const map=(window.HMStudentLearningMap&&HMStudentLearningMap.read())||{};
    const lessons=Object.keys(map);
    let activities=0;
    lessons.forEach(l=>activities+=Object.keys(map[l]||{}).length);
    return {lessons:lessons.length,activities};
  }
  window.HMStudentProgressSummary={getSummary};
})();
