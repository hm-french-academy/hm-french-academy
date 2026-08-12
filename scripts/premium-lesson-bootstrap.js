'use strict';
(() => {
  if (document.querySelector('script[data-hm-premium-activity]')) return;
  const s=document.createElement('script');
  s.src='scripts/premium-activity-runtime.js?v=20260812-activity1';
  s.dataset.hmPremiumActivity='1';
  document.body.appendChild(s);
})();
