'use strict';
(() => {
  function mergeDynamicLesson(){
    const data = window.HMPremiumLessonData;
    if(!data) return;
    window.HMPremiumStudioOverride = {
      vocabulary: data.vocabulary || data.words || null,
      dialogue: data.dialogue || data.conversation || null,
      assessment: data.assessment || data.questions || null,
      resources: data.resources || null
    };
    window.dispatchEvent(new CustomEvent('hm:studio-dynamic-data-ready',{detail:window.HMPremiumStudioOverride}));
  }
  window.addEventListener('hm:premium-data-ready', mergeDynamicLesson);
  if(window.HMPremiumLessonData) mergeDynamicLesson();
})();
