/* HM Academy — Supabase client bootstrap
 * Browser-safe: publishable key only. Never place a service-role key here.
 */
(function () {
  const SUPABASE_URL = 'https://yvoprtjyxmurvcsaqsny.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_Z_2LUR4d22zrytwD4588FQ_ro_tc3BV';

  function init() {
    if (!window.supabase || window.HMSupabase) return;
    window.HMSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    window.dispatchEvent(new CustomEvent('hm:supabase-ready'));
  }
  if (window.supabase) init();
  else {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.async = true;
    script.onload = init;
    document.head.appendChild(script);
  }
})();
