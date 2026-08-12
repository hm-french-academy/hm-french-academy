'use strict';
(() => {
  window.HMPremiumRuntime = window.HMPremiumRuntime || {};

  window.HMPremiumRuntime.get = function(key, fallback) {
    const dynamic = window.HMPremiumStudioOverride || window.HMPremiumLessonData || {};
    return dynamic[key] ?? fallback;
  };

  window.addEventListener('hm:studio-dynamic-data-ready', (event) => {
    window.HMPremiumRuntime.data = event.detail;
    document.documentElement.dataset.premiumDataReady = 'true';
  });
})();
