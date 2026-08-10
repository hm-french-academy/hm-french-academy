// HM Academy Curriculum Registry Loader
(function(){
  async function load(url){
    const response=await fetch(url,{cache:'no-store'});
    if(!response.ok) throw new Error('Curriculum registry unavailable');
    const registry=await response.json();
    window.HMCurriculumRegistry=registry;
    window.dispatchEvent(new CustomEvent('hm:curriculum-registry-ready',{detail:registry}));
    return registry;
  }
  function findGrade(id){
    const curricula=window.HMCurriculumRegistry?.curricula||[];
    for(const c of curricula){
      const grade=(c.grades||[]).find(g=>g.id===id);
      if(grade) return grade;
    }
    return null;
  }
  window.HMCurriculumRegistryLoader={load,findGrade};
})();
