// HM Academy — safe UI fixes for 1ère secondaire → 2ème secondaire diagnostic.
// IMPORTANT: this file intentionally has no external imports, network calls,
// async waits, or observers. The annual review page must render independently.
(function () {
  'use strict';
  function applyFixes() {
    const root = document.getElementById('diag');
    if (!root) return;

    const style = document.createElement('style');
    style.textContent = `
      #diag .q { direction:ltr !important; }
      #diag .qHead { direction:ltr !important; display:grid !important; grid-template-columns:auto minmax(0,1fr) !important; justify-content:initial !important; align-items:start !important; }
      #diag .qNum { direction:ltr !important; unicode-bidi:isolate; grid-column:1 !important; grid-row:1 !important; }
      #diag .qText { direction:ltr !important; unicode-bidi:plaintext; text-align:left !important; grid-column:2 !important; grid-row:1 !important; min-width:0; }
      #diag .q label { direction:ltr !important; text-align:left !important; }
    `;
    document.head.appendChild(style);

    // Fix only the two previously reported question wordings.
    const questions = root.querySelectorAll('.q');
    const d8 = questions[7] && questions[7].querySelector('.qText');
    const d22 = questions[21] && questions[21].querySelector('.qText');
    if (d8) d8.textContent = 'À 8h00, quelle heure est-il ? — Il est ___ heures exactement.';
    if (d22) d22.textContent = 'Je parle avec Paul. Je parle avec ___.';
  }

  // The parent page renders the quiz before loading this module.
  // Run synchronously when possible, otherwise once after DOMContentLoaded.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyFixes, { once: true });
  } else {
    applyFixes();
  }
})();
