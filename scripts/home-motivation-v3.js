(function(){
  function mountMobileQuickNav(){
    const grid=document.querySelector('.home-index-grid');
    if(!grid)return;
    const items=[['dashboard.html','🎓','الطالب'],['language-courses.html','📚','الكورسات'],['library.html','📖','المكتبة'],['academy-map.html','🗺️','الخريطة'],['exam.html','🎯','التقييم'],['dashboard.html#progress','📈','التقدم']];
    const render=()=>{
      if(window.innerWidth<=600){
        grid.classList.add('home-mobile-quick-grid');
        grid.innerHTML=items.map(x=>'<a class="home-mobile-quick-action" href="'+x[0]+'"><span aria-hidden="true">'+x[1]+'</span><strong>'+x[2]+'</strong></a>').join('');
      }else if(grid.classList.contains('home-mobile-quick-grid')){
        location.reload();
      }
    };
    render();
    window.addEventListener('resize',render,{passive:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mountMobileQuickNav,{once:true});else mountMobileQuickNav();
})();
