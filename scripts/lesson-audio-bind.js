// HM Academy lesson vocabulary audio binding — path-safe audio + resilient speech fallback
(function(){
  async function loadAudioMap(){
    const response=await fetch('/data/audio-map.json',{cache:'no-store'});
    if(!response.ok) throw new Error('audio-map unavailable');
    return response.json();
  }

  function resolveAudioSource(source){
    if(!source) return '';
    try{
      if(/^https?:\/\//i.test(source)) return source;
      const clean=String(source).replace(/^\.\//,'').replace(/^\//,'');
      return new URL('/'+clean,location.origin).href;
    }catch(e){ return source; }
  }

  function speak(text, button){
    if(!text) return false;
    if(window.HMSpeech?.speak){
      const ok=window.HMSpeech.speak(text);
      if(ok && button){
        button.textContent='⏸️ جاري النطق...';
        window.setTimeout(()=>{button.textContent='🔊 استمع للنطق';},900);
      }
      return ok;
    }
    if(!('speechSynthesis' in window)) return false;
    try{
      window.speechSynthesis.cancel();
      const u=new SpeechSynthesisUtterance(String(text));
      u.lang='fr-FR'; u.rate=.86; u.pitch=1;
      if(button) button.textContent='⏸️ جاري النطق...';
      u.onend=()=>{if(button)button.textContent='🔊 استمع للنطق';};
      u.onerror=()=>{if(button)button.textContent='🔊 استمع للنطق';};
      window.speechSynthesis.resume();
      window.speechSynthesis.speak(u);
      return true;
    }catch(e){return false;}
  }

  async function playSource(source,button,text){
    const src=resolveAudioSource(source);
    if(!src) return false;
    const audio=new Audio(src);
    audio.preload='auto';
    if(button) button.textContent='⏸️ جاري التشغيل...';
    try{
      await audio.play();
      audio.addEventListener('ended',()=>{if(button)button.textContent='🔊 استمع للنطق';},{once:true});
      audio.addEventListener('error',()=>{if(button)button.textContent='🔊 استمع للنطق';},{once:true});
      return true;
    }catch(e){
      return speak(text,button);
    }
  }

  async function bindVocabularyAudio(){
    try{
      const audioMap=await loadAudioMap();
      const lessonId=new URLSearchParams(location.search).get('id')||'lesson-hello';
      const lessonAudio=audioMap[lessonId]||{};
      const buttons=Array.from(document.querySelectorAll('#vocabulary-list button'));
      const sources=Array.isArray(lessonAudio)?lessonAudio:Object.values(lessonAudio);
      let boundCount=0;
      buttons.forEach((button,index)=>{
        if(button.dataset.audioBound==='true') return;
        const source=sources[index]||'';
        const text=button.dataset.speakText||button.closest('[data-word]')?.dataset.word||button.getAttribute('aria-label')||'';
        button.dataset.audio=resolveAudioSource(source);
        button.dataset.audioBound='true';
        boundCount++;
        button.addEventListener('click',async()=>{
          const ok=await playSource(source,button,text);
          if(!ok) button.textContent='🔊 النطق غير متاح على هذا الجهاز';
        });
      });
      window.dispatchEvent(new CustomEvent('hm:audio-ready',{detail:{lessonId,boundCount}}));
    }catch(error){
      console.warn('Audio binding fallback',error);
    }
  }

  window.HMAudio={bind:bindVocabularyAudio,speak};
  function init(){
    bindVocabularyAudio();
    const n=document.getElementById('vocabulary-list');
    if(n&&!n.dataset.audioObserver){
      const o=new MutationObserver(()=>bindVocabularyAudio());
      o.observe(n,{childList:true,subtree:true});
      n.dataset.audioObserver='true';
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
