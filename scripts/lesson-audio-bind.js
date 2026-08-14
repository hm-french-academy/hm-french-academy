// HM Academy universal lesson audio binding
// MP3 files are optional. When a real source is present it is used; otherwise browser French speech is used.
(function(){
  let audioMapPromise=null;
  function loadAudioMap(){
    if(audioMapPromise)return audioMapPromise;
    audioMapPromise=fetch('/data/audio-map.json',{cache:'no-store'}).then(r=>r.ok?r.json():{}).catch(()=>({}));
    return audioMapPromise;
  }

  function resolveAudioSource(source){
    if(!source)return '';
    try{
      if(/^https?:\/\//i.test(source))return source;
      const clean=String(source).replace(/^\.\//,'').replace(/^\//,'');
      return new URL('/'+clean,location.origin).href;
    }catch(_){return String(source);}
  }

  function textFor(button){
    return button.dataset.speakText
      ||button.dataset.speakWord
      ||button.dataset.speakExample
      ||button.closest('[data-word]')?.dataset.word
      ||button.closest('[data-speak]')?.dataset.speak
      ||'';
  }

  async function mappedSource(text){
    if(!text)return '';
    const lessonId=new URLSearchParams(location.search).get('id')||'';
    const map=await loadAudioMap();
    const lessonMap=map?.[lessonId];
    if(!lessonMap)return '';
    if(Array.isArray(lessonMap))return '';
    return resolveAudioSource(lessonMap[text]||'');
  }

  async function playSource(source,button,text){
    const src=resolveAudioSource(source||'');
    if(src){
      const audio=new Audio(src);
      audio.preload='auto';
      if(button)button.textContent='⏸️ جاري التشغيل...';
      try{
        await audio.play();
        audio.addEventListener('ended',()=>{if(button)button.textContent=button.dataset.hmSpeechLabel||'🔊 استمع للنطق';},{once:true});
        audio.addEventListener('error',()=>{if(button)button.textContent=button.dataset.hmSpeechLabel||'🔊 استمع للنطق';},{once:true});
        return true;
      }catch(_){/* fall through to speech */}
    }
    if(window.HMSpeech?.speak)return !!(await window.HMSpeech.speak(text,{button}));
    if(window.speechSynthesis&&text){
      try{
        speechSynthesis.cancel();
        const u=new SpeechSynthesisUtterance(text);u.lang='fr-FR';u.rate=.86;
        if(button)button.textContent='⏸️ جاري النطق...';
        u.onend=()=>{if(button)button.textContent=button.dataset.hmSpeechLabel||'🔊 استمع للنطق';};
        u.onerror=()=>{if(button)button.textContent=button.dataset.hmSpeechLabel||'🔊 استمع للنطق';};
        speechSynthesis.resume();speechSynthesis.speak(u);return true;
      }catch(_){return false;}
    }
    return false;
  }

  async function bindButton(button){
    if(!button||button.dataset.hmAudioBound==='true')return;
    const text=textFor(button);
    if(!text)return;
    button.dataset.hmAudioBound='true';
    button.dataset.hmSpeechLabel=button.textContent||'🔊 استمع للنطق';
    const explicit=button.dataset.audio||button.dataset.audioSrc||'';
    button.addEventListener('click',async()=>{
      const source=explicit||await mappedSource(text);
      const ok=await playSource(source,button,text);
      if(!ok)button.textContent='🔊 النطق غير متاح على هذا الجهاز';
    });
  }

  function bindAll(){
    document.querySelectorAll('[data-speak-text],[data-speak-word],[data-speak-example],[data-audio],[data-audio-src]').forEach(bindButton);
  }

  window.HMAudio={bind:bindAll,speak:(text,button)=>playSource('',button,text)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindAll,{once:true});else bindAll();
  const observer=new MutationObserver(bindAll);
  observer.observe(document.documentElement,{childList:true,subtree:true});
})();
