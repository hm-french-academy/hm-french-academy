'use strict';
(() => {
  window.HMPremiumRenderHook = {
    getSection(name, fallback) {
      const override = window.HMPremiumStudioOverride || {};
      const value = override[name];
      return Array.isArray(value) && value.length ? value : fallback;
    }
  };

  window.addEventListener('hm:studio-dynamic-data-ready', () => {
    document.documentElement.dataset.premiumRenderReady = 'true';
  });
})();
