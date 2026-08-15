// HM Academy lesson completion + Lesson Studio compatibility shim
(function(){
  ['journey','viewer','unit','title','subtitle','art','completeBtn','completionMessage'].forEach(id=>{
    const el=document.getElementById(id);
    if(el && !(id in window)) window[id]=el;
  });
  const journey=document.getElementById('journey');
  if(journey) window.journeyEl=journey;
  const script=document.createElement('script');
  script.src='scripts/lesson-complete-legacy.js?v=20260815-dom-fix';
  script.onload=function(){const j=document.getElementById('journey');if(j) window.journeyEl=j;};
  document.head.appendChild(script);

  // The lesson JSON uses word/translation, while the unified renderer also accepts fr/ar.
  // Normalize the schema before the renderer is re-run so Lesson 1 and Lesson 2 behave identically.
  setTimeout(function(){
    if(typeof window.wf==='function'){
      window.wf=function(x){x=x||{};return{w:x.fr||x.word||x.term||'',ar:x.ar||x.translation||'',im:x.image||x.icon||'🖼️',ex:x.example||''};};
    }
    // Prevent the browser's implicit element globals from being the source of lesson startup failures.
    ['journey','viewer','unit','title','subtitle','art','completeBtn','completionMessage'].forEach(id=>{const el=document.getElementById(id);if(el)window[id]=el;});
    if(document.getElementById('journey')) window.journeyEl=document.getElementById('journey');

    // Randomize practice choices while carrying the correct answer index with the option.
    if(window.lesson && Array.isArray(window.lesson.practice)){
      window.lesson.practice.forEach(q=>{
        if(!q || !Array.isArray(q.options) || q.options.length<2 || q.__hmShuffled) return;
        const correct=Number(q.answer); const pairs=q.options.map((text,index)=>({text,index}));
        for(let i=pairs.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pairs[i],pairs[j]]=[pairs[j],pairs[i]];}
        q.options=pairs.map(p=>p.text); q.answer=pairs.findIndex(p=>p.index===correct); q.__hmShuffled=true;
      });
    }
    if(typeof window.load==='function') window.load();
  },0);
})();
