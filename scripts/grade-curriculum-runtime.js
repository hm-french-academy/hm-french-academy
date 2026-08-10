// HM Academy Grade Curriculum Runtime
(function(){
  async function loadGrade(url){
    const response=await fetch(url,{cache:'no-store'});
    if(!response.ok) throw new Error('Grade curriculum unavailable');
    const data=await response.json();
    window.HMGradeCurriculum=data;
    window.dispatchEvent(new CustomEvent('hm:grade-ready',{detail:data}));
    return data;
  }
  function getLessons(){
    return (window.HMGradeCurriculum?.units||[]).flatMap(u=>u.lessons||[]);
  }
  window.HMGradeRuntime={loadGrade,getLessons};
})();
