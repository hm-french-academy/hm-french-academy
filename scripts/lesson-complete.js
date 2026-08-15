// HM Academy lesson completion + Lesson Studio compatibility shim
(function(){
  ['journey','viewer','unit','title','subtitle','art','completeBtn','completionMessage'].forEach(id=>{
    const el=document.getElementById(id);
    if(el && !(id in window)) window[id]=el;
  });
  const journey=document.getElementById('journey');
  if(journey) window.journeyEl=journey;

  // Compatibility: GitHub-hosted lesson JSON is sometimes exposed by the runtime
  // as {content:"...json..."}. The unified lesson loader expects the actual JSON
  // object. Normalize fetch() responses before lesson.html parses them.
  if(window.fetch && !window.__hmLessonFetchPatched){
    const nativeFetch=window.fetch.bind(window);
    window.fetch=async function(input,init){
      const response=await nativeFetch(input,init);
      const url=typeof input==='string'?input:(input&&input.url)||'';
      if(!/data\/lessons\/grade-8\/.*\.json(?:\?|$)/i.test(url)) return response;
      try{
        const payload=await response.clone().json();
        if(payload && typeof payload.content==='string'){
          const headers=new Headers(response.headers);
          headers.set('content-type','application/json;charset=UTF-8');
          return new Response(payload.content,{status:response.status,statusText:response.statusText,headers});
        }
      }catch(e){/* leave the original response untouched */}
      return response;
    };
    window.__hmLessonFetchPatched=true;
  }

  const script=document.createElement('script');
  script.src='scripts/lesson-complete-legacy.js?v=20260815-fetch-fix';
  script.onload=function(){const j=document.getElementById('journey');if(j) window.journeyEl=j;};
  document.head.appendChild(script);

  // Keep a reusable schema normalizer available for the unified renderer.
  window.hmNormalizeLessonWord=function(x){x=x||{};return{w:x.fr||x.word||x.term||'',ar:x.ar||x.translation||'',im:x.image||x.icon||'🖼️',ex:x.example||''};};

  // Make the completion runtime use the real DOM nodes even on browsers that do not
  // expose element ids as globals.
  setTimeout(function(){
    ['journey','viewer','unit','title','subtitle','art','completeBtn','completionMessage'].forEach(id=>{const el=document.getElementById(id);if(el)window[id]=el;});
    if(document.getElementById('journey')) window.journeyEl=document.getElementById('journey');
  },0);
})();
