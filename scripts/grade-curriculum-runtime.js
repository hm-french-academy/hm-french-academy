// HM Academy Grade Curriculum Runtime
(function(){
  function resolvePath(url){
    if (/^https?:/.test(url)) return url;
    const root = location.pathname.includes('/hm-french-academy/') ? '/hm-french-academy/' : '/';
    return root + url.replace(/^\//,'');
  }

  async function loadGrade(url){
    const response=await fetch(resolvePath(url),{cache:'no-store'});
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
