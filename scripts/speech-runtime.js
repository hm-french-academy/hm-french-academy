// HM Academy — reliable browser French speech runtime
(function(){
  'use strict';
  const DEFAULT_LANG='fr-FR';
  const DEFAULT_RATE=0.84;
  let current=null;

  function voices(){
    try{return window.speechSynthesis?.getVoices?.()||[];}catch(_){return [];}
  }
  function pickVoice(lang){
    const wanted=String(lang||DEFAULT_LANG).toLowerCase();
    const list=voices();
    return list.find(v=>String(v.lang).toLowerCase()===wanted)
      ||list.find(v=>String(v.lang).toLowerCase().startsWith('fr'))
      ||null;
  }
  function state(button,on){
    if(!button)return;
    if(!button.dataset.hmLabel)button.dataset.hmLabel=button.textContent||'🔊';
    button.classList.toggle('playing',!!on);
    button.setAttribute('aria-busy',on?'true':'false');
    button.textContent=on?'⏸️':button.dataset.hmLabel;
  }
  function speak(text,options={}){
    const value=String(text??'').trim();
    if(!value||!('speechSynthesis' in window)||typeof SpeechSynthesisUtterance==='undefined')return Promise.resolve(false);
    const synth=window.speechSynthesis;
    const button=options.button||null;
    const lang=options.lang||DEFAULT_LANG;
    const rate=Math.max(.55,Math.min(1.15,Number(options.rate)||DEFAULT_RATE));
    try{
      if(current){try{current.cancel();}catch(_){} current=null;}
      synth.cancel();
      const u=new SpeechSynthesisUtterance(value);
      u.lang=lang;
      u.rate=rate;
      u.pitch=Number(options.pitch)||1;
      const voice=pickVoice(lang);
      if(voice)u.voice=voice;
      state(button,true);
      return new Promise(resolve=>{
        let settled=false;
        const finish=ok=>{if(settled)return;settled=true;state(button,false);if(current===u)current=null;resolve(ok);};
        u.onend=()=>finish(true);
        u.onerror=()=>finish(false);
        current=u;
        try{synth.resume();}catch(_){}
        synth.speak(u);
        window.setTimeout(()=>{try{if(synth.paused)synth.resume();}catch(_){}},120);
        window.setTimeout(()=>finish(true),Math.max(3000,Math.min(15000,value.length*140+1800)));
      });
    }catch(_){state(button,false);return Promise.resolve(false);}
  }
  function stop(){try{window.speechSynthesis?.cancel?.();}catch(_){} current=null;}
  window.HMSpeech={speak,stop,pickVoice,refreshVoices:voices};
  try{window.speechSynthesis?.getVoices?.();}catch(_){}
  if('speechSynthesis' in window && 'onvoiceschanged' in window.speechSynthesis){
    window.speechSynthesis.addEventListener('voiceschanged',()=>{try{voices();}catch(_){}},{passive:true});
  }
})();
