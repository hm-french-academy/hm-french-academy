// HM Academy lesson audio controller — optional real audio + universal speech fallback
(function(){
  function getSpeakText(button){
    if(button.dataset.speakText||button.dataset.text)return button.dataset.speakText||button.dataset.text;
    const scope=button.closest('article,section,.card,.lesson-card,.conversation-line,.grammar-example,.vocab-card,.word')||button.parentElement;
    const fr=scope?.querySelector('[lang="fr"],[dir="ltr"],.fr,.lesson-fr,.fr-line,.grammar-example-fr');
    if(fr&&fr.textContent.trim())return fr.textContent.trim();
    return button.closest('[data-word]')?.dataset.word||'';
  }

  async function speak(text,button){
    if(window.HMSpeech?.speak)return !!(await window.HMSpeech.speak(text,{button}));
    if(!text||!('speechSynthesis'in window))return false;
    try{
      window.speechSynthesis.cancel();
      const u=new SpeechSynthesisUtterance(text);u.lang='fr-FR';u.rate=.86;
      if(button)button.textContent='⏸️ جاري النطق...';
      u.onend=()=>{if(button)button.textContent='🔊 استمع للنطق';};
      u.onerror=()=>{if(button)button.textContent='🔊 استمع للنطق';};
      window.speechSynthesis.resume();window.speechSynthesis.speak(u);return true;
    }catch(_){return false;}
  }

  async function playAudio(src,button){
    const text=getSpeakText(button);
    if(src){
      const audio=new Audio(src);
      try{
        if(button)button.textContent='⏸️ جاري التشغيل...';
        await audio.play();
        audio.addEventListener('ended',()=>{if(button)button.textContent='🔊 استمع للنطق';},{once:true});
        return;
      }catch(_){/* fallback */}
    }
    if(!await speak(text,button)&&button)button.textContent='🔊 النطق غير متاح على هذا الجهاز';
  }

  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-audio],[data-speak-text]');
    if(!button)return;
    playAudio(button.dataset.audio||button.dataset.audioSrc||'',button);
  });

  // Grade 5 enrichment is loaded before grade5-lesson-runtime-v4.js.
  // The runtime then consumes the enriched JSON response transparently.
  if(location.pathname.endsWith('/grade-5-lesson.html')||location.pathname.endsWith('grade-5-lesson.html')){
    const s=document.createElement('script');
    s.src='scripts/grade5-content-enricher.js?build=20260819-15';
    s.async=false;
    document.head.appendChild(s);
  }
})();