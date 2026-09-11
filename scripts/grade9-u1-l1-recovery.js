(function(){
  'use strict';

  function speakDirect(text){
    var s=String(text||'').trim();
    if(!s || !('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) return;
    var synth=window.speechSynthesis;
    try{
      synth.cancel();
      var play=function(){
        var u=new SpeechSynthesisUtterance(s);
        u.lang='fr-FR';
        u.rate=.78;
        u.pitch=1;
        u.volume=1;
        var voices=synth.getVoices();
        var v=voices.find(function(x){return /^fr[-_]FR$/i.test(x.lang)}) || voices.find(function(x){return /^fr[-_]/i.test(x.lang)});
        if(v) u.voice=v;
        synth.speak(u);
      };
      if(synth.getVoices().length){
        play();
      }else{
        var once=function(){synth.removeEventListener('voiceschanged',once);play();};
        synth.addEventListener('voiceschanged',once,{once:true});
        setTimeout(function(){synth.removeEventListener('voiceschanged',once);if(!synth.speaking)play();},250);
      }
    }catch(e){}
  }

  window.speak=speakDirect;

  function bindAudio(){
    var panel=document.getElementById('panel');
    if(!panel) return;
    panel.querySelectorAll('button').forEach(function(btn){
      var onclick=btn.getAttribute('onclick')||'';
      if(onclick.indexOf('speak(')!==-1 || btn.hasAttribute('data-s')) return;
      var label=(btn.textContent||'').trim();
      if(!/نطق|استمع|audio|speak/i.test(label)) return;
      var card=btn.closest('.card,.pron-card,.dialogue-card');
      if(!card) return;
      var target=card.querySelector('.fr,.line-fr');
      if(!target) return;
      btn.removeAttribute('onclick');
      btn.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();speakDirect(target.textContent);});
    });
  }

  function boot(){
    window.speak=speakDirect;
    bindAudio();
    var panel=document.getElementById('panel');
    if(panel){
      new MutationObserver(function(){window.speak=speakDirect;bindAudio();}).observe(panel,{childList:true,subtree:true});
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
