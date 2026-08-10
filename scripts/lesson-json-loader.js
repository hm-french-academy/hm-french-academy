// HM Academy generic JSON lesson loader
(function(){
  async function load(url){
    const response=await fetch(url,{cache:'no-store'});
    if(!response.ok) throw new Error('Lesson data unavailable: '+response.status);
    const data=await response.json();
    if(!data.id||!data.title||!data.files) throw new Error('Invalid lesson schema');
    window.HMLessonData=data;
    window.dispatchEvent(new CustomEvent('hm:lesson-data-ready',{detail:data}));
    return data;
  }
  window.HMLessonLoader={load};
})();
