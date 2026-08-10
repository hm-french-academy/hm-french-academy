// HM Academy Activity Registry Loader
(function(){
  window.HMActivityRegistry = {
    async load(url){
      const source=url || 'data/lessons/grade-8/unit-1/activities/index.json';
      const res=await fetch(source);
      if(!res.ok) throw new Error('Activity registry unavailable');
      return await res.json();
    },
    render(container, registry){
      if(!container || !registry || !registry.activities) return;
      container.innerHTML = registry.activities.map(a => `
        <article class="exercise activity-card">
          <h3>🎮 ${a.title}</h3>
          <p class="q">${(a.skills||[]).join(' · ')}<br>⭐ ${a.xp} XP</p>
          <a class="primary" href="activities/${a.file}">ابدأ النشاط</a>
        </article>`).join('');
    }
  };
})();
