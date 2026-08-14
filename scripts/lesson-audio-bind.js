// HM Academy lesson vocabulary audio binding — resilient fallback
(function(){
  async function loadAudioMap(){
    const response = await fetch('data/audio-map.json',{cache:'no-store'});
    if(!response.ok) throw new Error('audio-map unavailable');
    return response.json();
  }
  function speak(text, button){
    if(!text || !('speechSynthesis' in window)) return false;
    try{
      window.speechSynthesis.cancel();
      const u=new SpeechSynthesisUtterance(text);
      u.lang='fr-FR'; u.rate=.88; u.pitch=1;
      button.textContent='⏸️ جاري النطق...';
      u.onend=()=>{button.textContent='🔊 استمع للنطق';};
      u.onerror=()=>{button.textContent='🔊 استمع للنطق';};
      window.speechSynthesis.speak(u); return true;
    }catch(e){return false;}
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
        const source=sources[index];
        const text=button.dataset.speakText||button.closest('[data-word]')?.dataset.word||button.getAttribute('aria-label')||'';
        button.dataset.audio=source||''; button.dataset.audioBound='true'; boundCount++;
        button.addEventListener('click',async()=>{
          if(source){
            const audio=new Audio(source); button._audio=audio; button.textContent='⏸️ جاري التشغيل...';
            try{await audio.play();audio.addEventListener('ended',()=>button.textContent='🔊 استمع للنطق',{once:true});return;}catch(e){}
          }
          if(!speak(text,button)) button.textContent='🔊 النطق غير متاح على هذا الجهاز';
        });
      });
      window.dispatchEvent(new CustomEvent('hm:audio-ready',{detail:{lessonId,boundCount}}));
    }catch(error){console.warn('Audio binding fallback',error);}
  }
  window.HMAudio={bind:bindVocabularyAudio,speak:speak};
  function init(){bindVocabularyAudio();const n=document.getElementById('vocabulary-list');if(n&&!n.dataset.audioObserver){const o=new MutationObserver(()=>bindVocabularyAudio());o.observe(n,{childList:true,subtree:true});n.dataset.audioObserver='true';}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
