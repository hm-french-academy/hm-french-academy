'use strict';
(() => {
  function resolveSection(name, fallback){
    if(window.HMPremiumRenderHook?.getSection){
      return window.HMPremiumRenderHook.getSection(name, fallback);
    }
    return fallback;
  }

  window.HMPremiumLessonSections = {
    vocabulary(fallback){ return resolveSection('vocabulary', fallback); },
    dialogue(fallback){ return resolveSection('dialogue', fallback); },
    assessment(fallback){ return resolveSection('assessment', fallback); },
    resources(fallback){ return resolveSection('resources', fallback); }
  };

  window.addEventListener('hm:studio-dynamic-data-ready', () => {
    window.dispatchEvent(new CustomEvent('hm:premium-render-injection-ready'));
  });
})();
