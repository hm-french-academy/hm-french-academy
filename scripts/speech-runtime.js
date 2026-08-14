// HM Academy universal French speech runtime
// Browser speech is the primary pronunciation engine; real audio files remain optional.
(function(){
  const DEFAULT_LANG='fr-FR';
  const DEFAULT_RATE=0.86;
  let voices=[];

  function refreshVoices(){
    try{ voices=window.speechSynthesis?.getVoices?.()||[]; }catch(_){ voices=[]; }
    return voices;
  }

  function pickVoice(lang=DEFAULT_LANG){
    const list=refreshVoices();
    const wanted=String(lang).toLowerCase();
    return list.find(v=>String(v.lang).toLowerCase()===wanted)
      || list.find(v=>String(v.lang).toLowerCase().startsWith(wanted.slice(0,2)))
      || list.find(v=>/^fr(?:-|$)/i.test(String(v.lang)))
      || null;
  }

  function setButtonState(button, speaking){
    if(!button)return;
    if(!button.dataset.hmSpeechLabel) button.dataset.hmSpeechLabel=button.textContent||'🔊 استمع للنطق';
    button.textContent=speaking?'⏸️ جاري النطق...':button.dataset.hmSpeechLabel;
  }

  function speak(text, options={}){
    const value=String(text??'').trim();
    if(!value || !('speechSynthesis' in window) || typeof SpeechSynthesisUtterance==='undefined') return false;
    const lang=options.lang||DEFAULT_LANG;
    const rate=Number(options.rate)||DEFAULT_RATE;
    const button=options.button||null;
    const run=()=>new Promise(resolve=>{
      try{
        const synth=window.speechSynthesis;
        synth.cancel();
        const utterance=new SpeechSynthesisUtterance(value);
        utterance.lang=lang;
        utterance.rate=Math.max(.55,Math.min(1.15,rate));
        utterance.pitch=Number(options.pitch)||1;
        const voice=pickVoice(lang);
        if(voice) utterance.voice=voice;
        setButtonState(button,true);
        let settled=false;
        const done=ok=>{if(settled)return;settled=true;setButtonState(button,false);resolve(ok);};
        utterance.onend=()=>done(true);
        utterance.onerror=()=>done(false);
        synth.resume();
        synth.speak(utterance);
        window.setTimeout(()=>{if(synth.paused)synth.resume();},80);
        window.setTimeout(()=>{if(!settled)done(true);},Math.max(2500,Math.min(12000,value.length*120+1800)));
      }catch(_){setButtonState(button,false);resolve(false);}
    });
    refreshVoices();
    // Mobile browsers can expose voices only after voiceschanged; retry once when the list is initially empty.
    if(!voices.length && 'onvoiceschanged' in window.speechSynthesis){
      return new Promise(resolve=>{
        let finished=false;
        const finish=ok=>{if(finished)return;finished=true;window.speechSynthesis.removeEventListener('voiceschanged',onVoices);resolve(ok);};
        const onVoices=()=>{refreshVoices();run().then(finish);};
        window.speechSynthesis.addEventListener('voiceschanged',onVoices,{once:true});
        window.setTimeout(()=>{refreshVoices();run().then(finish);},180);
      });
    }
    return run();
  }

  refreshVoices();
  if('onvoiceschanged' in window.speechSynthesis) window.speechSynthesis.addEventListener('voiceschanged',refreshVoices);
  window.HMSpeech={speak,refreshVoices,pickVoice};
})();
