// HM Academy — lesson runtime bootstrap / compatibility layer
(function(){
  'use strict';
  function bindDom(){
    ['journey','viewer','unit','title','subtitle','art','completeBtn','completionMessage'].forEach(function(id){
      var el=document.getElementById(id); if(el){ try{ window[id]=el; }catch(_){} }
    });
    var j=document.getElementById('journey'); if(j){ try{window.journeyEl=j;}catch(_){} }
  }
  bindDom();
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bindDom,{once:true});

  // The lesson JSON files in this repository are intentionally stored as UTF-8
  // JSON. Some hosting layers expose that JSON inside a {content:"..."} envelope.
  // Normalize BOTH forms at the Response boundary so lesson.html can remain simple.
  if(window.fetch && !window.__hmLessonFetchV2){
    var nativeFetch=window.fetch.bind(window);
    window.fetch=async function(input,init){
      var response=await nativeFetch(input,init);
      var url=typeof input==='string'?input:((input&&input.url)||'');
      if(!/data\/lessons\/grade-8\/.*\.json(?:\?|$)/i.test(url)) return response;
      try{
        var raw=await response.clone().text();
        var value=JSON.parse(raw);
        for(var depth=0;depth<3 && value && typeof value.content==='string';depth++){
          try{ value=JSON.parse(value.content); }catch(_){ break; }
        }
        if(value && typeof value==='object' && !Array.isArray(value)){
          return new Response(JSON.stringify(value),{status:response.status,statusText:response.statusText,headers:{'Content-Type':'application/json;charset=UTF-8','Cache-Control':'no-store'}});
        }
      }catch(_){ }
      return response;
    };
    window.__hmLessonFetchV2=true;
  }

  // Normalize lesson vocabulary objects for all renderers.
  window.hmNormalizeLessonWord=function(x){
    x=x||{};
    return {w:x.fr||x.word||x.term||x.french||'',ar:x.ar||x.translation||x.meaning||x.arabic||'',im:x.image||x.icon||'🖼️',ex:x.example||x.exampleFr||''};
  };

  // Load the legacy completion/context/speech helpers after the DOM is available.
  function loadLegacy(){
    if(document.querySelector('script[data-hm-legacy]')) return;
    var s=document.createElement('script');
    s.src='scripts/lesson-complete-legacy.js?v=20260815-runtime-v2';
    s.dataset.hmLegacy='1';
    s.onload=bindDom;
    document.head.appendChild(s);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',loadLegacy,{once:true}); else loadLegacy();
})();
