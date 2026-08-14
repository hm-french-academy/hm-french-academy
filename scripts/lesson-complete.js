// HM Academy lesson completion shim
// Preserve the previously validated completion/navigation/speech runtime, while
// explicitly binding the DOM identifiers used by lesson.html before its inline runtime executes.
(function(){
  ['journey','viewer','unit','title','subtitle','art','completeBtn','completionMessage'].forEach(id=>{
    const el=document.getElementById(id);
    if(el && !(id in window)) window[id]=el;
  });
  const journey=document.getElementById('journey');
  if(journey) window.journeyEl=journey;
  const script=document.createElement('script');
  script.src='scripts/lesson-complete-legacy.js?v=20260815-dom-fix';
  script.onload=function(){
    const j=document.getElementById('journey');
    if(j) window.journeyEl=j;
  };
  document.head.appendChild(script);
})();
