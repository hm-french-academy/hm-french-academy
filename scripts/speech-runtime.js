// HM Academy universal French speech runtime
// Browser speech is the primary pronunciation engine; real audio files remain optional.
(function(){
  const DEFAULT_LANG='fr-FR';
  const DEFAULT_RATE=0.86;
  let voices=[];

  function refreshVoices(){
    try{voices=window.speechSynthesis?.getVoices?.()||[];}catch(_){voices=[];}
    return voices;
  }

  function pickVoice(lang=DEFAULT_LANG){
    const list=refreshVoices();
    const wanted=String(lang).toLowerCase();
    return list.find(v=>String(v.lang).toLowerCase()===wanted)
      ||list.find(v=>String(v.lang).toLowerCase().startsWith(wanted.slice(0,2)))
      ||list.find(v=>/^fr(?:-|$)/i.test(String(v.lang)))
      ||null;
  }

  function setButtonState(button,speaking){
    if(!button)return;
    if(!button.dataset.hmSpeechLabel)button.dataset.hmSpeechLabel=button.textContent||'🔊 استمع للنطق';
    button.textContent=speaking?'⏸️ جاري النطق...':button.dataset.hmSpeechLabel;
  }

  // Patch the native browser speech call as well, because some legacy lesson buttons
  // call speechSynthesis.speak() directly instead of HMSpeech.speak().
  function patchNativeSpeech(){
    try{
      const synth=window.speechSynthesis;
      if(!synth||synth.__hmPatchedSpeak)return;
      const nativeSpeak=synth.speak.bind(synth);
      synth.speak=function(utterance){
        try{
          const voice=pickVoice(utterance?.lang||DEFAULT_LANG);
          if(voice&&!utterance.voice)utterance.voice=voice;
          if(utterance?.lang&&!/^fr/i.test(String(utterance.lang)))utterance.lang=DEFAULT_LANG;
          synth.resume();
        }catch(_){/* use browser defaults */}
        return nativeSpeak(utterance);
      };
      synth.__hmPatchedSpeak=true;
    }catch(_){/* speech API may be unavailable */}
  }

  function speak(text,options={}){
    const value=String(text??'').trim();
    if(!value||!('speechSynthesis'in window)||typeof SpeechSynthesisUtterance==='undefined')return false;
    const lang=options.lang||DEFAULT_LANG;
    const rate=Number(options.rate)||DEFAULT_RATE;
    const button=options.button||null;
    const run=()=>new Promise(resolve=>{
      try{
        const synth=window.speechSynthesis;
        patchNativeSpeech();
        synth.cancel();
        const utterance=new SpeechSynthesisUtterance(value);
        utterance.lang=lang;
        utterance.rate=Math.max(.55,Math.min(1.15,rate));
        utterance.pitch=Number(options.pitch)||1;
        const voice=pickVoice(lang);
        if(voice)utterance.voice=voice;
        setButtonState(button,true);
        let settled=false;
        const done=ok=>{if(settled)return;settled=true;setButtonState(button,false);resolve(ok);};
        utterance.onend=()=>done(true);
        utterance.onerror=()=>done(false);
        synth.resume();
        synth.speak(utterance);
        window.setTimeout(()=>{try{if(synth.paused)synth.resume();}catch(_){ }},80);
        window.setTimeout(()=>{if(!settled)done(true);},Math.max(2500,Math.min(12000,value.length*120+1800)));
      }catch(_){setButtonState(button,false);resolve(false);}
    });

    refreshVoices();
    patchNativeSpeech();
    // Mobile browsers can expose voices only after voiceschanged.
    if(!voices.length&&'onvoiceschanged'in window.speechSynthesis){
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
  patchNativeSpeech();
  if('onvoiceschanged'in window.speechSynthesis)window.speechSynthesis.addEventListener('voiceschanged',()=>{refreshVoices();patchNativeSpeech();});
  window.HMSpeech={speak,refreshVoices,pickVoice};
})();
