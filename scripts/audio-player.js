// HM Academy lesson audio controller — resilient fallback
(function(){
  function speak(text,button){
    if(!text||!('speechSynthesis' in window)) return false;
    try{window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='fr-FR';u.rate=.88;button.textContent='⏸️ جاري النطق...';u.onend=()=>button.textContent='🔊 استمع للنطق';u.onerror=()=>button.textContent='🔊 استمع للنطق';window.speechSynthesis.speak(u);return true;}catch(e){return false;}
  }
  function playAudio(src,button){
    const text=button.dataset.speakText||button.dataset.text||button.textContent.replace(/🔊|⏸️|جاري التشغيل|استمع للنطق/g,'').trim();
    if(src){const audio=new Audio(src);audio.play().then(()=>audio.addEventListener('ended',()=>button.textContent='🔊 استمع للنطق',{once:true})).catch(()=>{if(!speak(text,button))button.textContent='🔊 النطق غير متاح على هذا الجهاز';});return;}
    if(!speak(text,button))button.textContent='🔊 النطق غير متاح على هذا الجهاز';
  }
  document.addEventListener('click',function(event){const button=event.target.closest('[data-audio], [data-speak-text]');if(!button)return;playAudio(button.dataset.audio||'',button);});
})();
