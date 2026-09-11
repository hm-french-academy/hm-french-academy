/* HM Academy platform analytics — additive, non-blocking page-view tracker. */
(function(){
  'use strict';
  try {
    /* Grade 9 standard lesson: its legacy renderer uses the DOM ids as globals.
       Define them explicitly before the lesson's inline script runs. */
    if (/\/grade9-u1-l1-standard\.html$/i.test(location.pathname)) {
      const lessonNav=document.getElementById('nav');
      const lessonPanel=document.getElementById('panel');
      if (lessonNav) window.nav=lessonNav;
      if (lessonPanel) window.panel=lessonPanel;
    }
    const SUPABASE_URL='https://yvoprtjyxmurvcsaqsny.supabase.co';
    const SUPABASE_KEY='sb_publishable_Z_2LUR4d22zrytwD4588FQ_ro_tc3BV';
    const STORAGE_KEY='hm_analytics_session_id';
    let sid=localStorage.getItem(STORAGE_KEY);
    if(!sid){sid=(crypto.randomUUID?crypto.randomUUID():Date.now()+'-'+Math.random().toString(36).slice(2));localStorage.setItem(STORAGE_KEY,sid)}
    const path=location.pathname+location.search;
    const payload={session_id:sid,page_path:path,page_title:document.title||'',event_name:'page_view',device_type:/Mobi|Android/i.test(navigator.userAgent)?'mobile':/Tablet|iPad/i.test(navigator.userAgent)?'tablet':'desktop',referrer:document.referrer||'',user_agent:navigator.userAgent};
    fetch(SUPABASE_URL+'/rest/v1/rpc/record_platform_analytics',{method:'POST',headers:{'Content-Type':'application/json','apikey':SUPABASE_KEY,'Authorization':'Bearer '+SUPABASE_KEY},body:JSON.stringify({payload}),keepalive:true}).catch(function(){});
  } catch(e) {}
})();
