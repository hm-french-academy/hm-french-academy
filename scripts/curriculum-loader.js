// HM Academy Curriculum Loader
(function(){
  async function load(url){
    const response=await fetch(url,{cache:'no-store'});
    if(!response.ok) throw new Error('Curriculum unavailable');
    const curriculum=await response.json();
    window.HMCurriculum=curriculum;
    window.dispatchEvent(new CustomEvent('hm:curriculum-ready',{detail:curriculum}));
    return curriculum;
  }
  window.HMCurriculumLoader={load};
})();
