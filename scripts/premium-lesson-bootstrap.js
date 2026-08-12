'use strict';
(() => {
  function boot(){
    if(!window.HMPremiumLessonSections) return;
    window.HMPremiumBootstrap={ready:true,sections:window.HMPremiumLessonSections};
    window.dispatchEvent(new CustomEvent('hm:premium-bootstrap-ready',{detail:window.HMPremiumBootstrap}));
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
