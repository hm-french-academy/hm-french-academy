// HM Academy universal lesson audio binding
(function(){
  let audioMapPromise=null;
  function loadAudioMap(){
    if(audioMapPromise)return audioMapPromise;
    const url=new URL('data/audio-map.json',document.baseURI).href;
    audioMapPromise=fetch(url,{cache:'no-store'}).then(r=>r.ok?r.json():{}).catch(()=>({}));
    return audioMapPromise;
  }
  function resolveAudioSource(source){
    if(!source)return '';
    try{return new URL(String(source).replace(/^\.\//,''),document.baseURI).href}catch(_){return String(source)}
  }
  function textFor(button){return button.dataset.speakText||button.dataset.speakWord||button.dataset.speakExample||button.closest('[data-word]')?.dataset.word||button.closest('[data-speak]')?.dataset.speak||''}
  function frenchVoice(){if(!window.speechSynthesis)return null;const voices=window.speechSynthesis.getVoices?.()||[];return voices.find(v=>/^fr-FR$/i.test(v.lang))||voices.find(v=>/^fr[-_]/i.test(v.lang))||voices.find(v=>/french|français/i.test(v.name||''))||null}
  function splitSpeech(text,max=220){const s=String(text||'').replace(/\s+/g,' ').trim();if(s.length<=max)return s?[s]:[];const out=[];let rest=s;while(rest.length>max){let cut=rest.lastIndexOf('. ',max);if(cut<80)cut=rest.lastIndexOf(' ',max);if(cut<40)cut=max;out.push(rest.slice(0,cut+(rest[cut]==='.'?1:0)).trim());rest=rest.slice(cut+(rest[cut]==='.'?1:0)).trim()}if(rest)out.push(rest);return out}
  function browserSpeak(text,button){if(!window.speechSynthesis||!window.SpeechSynthesisUtterance||!text)return false;const synth=window.speechSynthesis,pieces=splitSpeech(text),voice=frenchVoice();let index=0;if(button){if(!button.dataset.hmSpeechLabel)button.dataset.hmSpeechLabel=button.textContent||'🔊 استمع للنطق';button.textContent='⏸️ جاري النطق...'}synth.cancel();const next=()=>{if(index>=pieces.length){if(button)button.textContent=button.dataset.hmSpeechLabel||'🔊 استمع للنطق';return}const u=new SpeechSynthesisUtterance(pieces[index++]);u.lang='fr-FR';u.rate=.84;if(voice)u.voice=voice;u.onend=next;u.onerror=()=>{if(button)button.textContent=button.dataset.hmSpeechLabel||'🔊 استمع للنطق'};synth.resume();synth.speak(u)};next();return true}
  async function mappedSource(text){if(!text)return '';const lessonId=new URLSearchParams(location.search).get('id')||'';const map=await loadAudioMap();const lessonMap=map?.[lessonId];if(!lessonMap||Array.isArray(lessonMap))return '';return resolveAudioSource(lessonMap[text]||'')}
  async function playSource(source,button,text){const src=resolveAudioSource(source||'');if(src){const audio=new Audio(src);audio.preload='auto';try{if(button)button.textContent='⏸️ جاري التشغيل...';await audio.play();audio.addEventListener('ended',()=>{if(button)button.textContent=button.dataset.hmSpeechLabel||'🔊 استمع للنطق'},{once:true});audio.addEventListener('error',()=>{if(button)button.textContent=button.dataset.hmSpeechLabel||'🔊 استمع للنطق'},{once:true});return true}catch(_){} }if(window.HMSpeech?.speak)return !!(await window.HMSpeech.speak(text,{button,lang:'fr-FR',rate:.84}));return browserSpeak(text,button)}
  function bindButton(button){if(!button||button.dataset.hmAudioBound==='true')return;const text=textFor(button);if(!text)return;button.dataset.hmAudioBound='true';if(!button.dataset.hmSpeechLabel)button.dataset.hmSpeechLabel=button.textContent||'🔊 استمع للنطق';const explicit=button.dataset.audio||button.dataset.audioSrc||'';button.addEventListener('click',async()=>{const source=explicit||await mappedSource(text);const ok=await playSource(source,button,text);if(!ok)button.textContent='🔊 النطق غير متاح على هذا الجهاز'})}
  function bindAll(){document.querySelectorAll('[data-speak-text],[data-speak-word],[data-speak-example],[data-audio],[data-audio-src]').forEach(bindButton)}
  window.HMAudio={bind:bindAll,speak:(text,button)=>playSource('',button,text)};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindAll,{once:true});else bindAll();if(window.speechSynthesis?.addEventListener)window.speechSynthesis.addEventListener('voiceschanged',bindAll,{passive:true});new MutationObserver(bindAll).observe(document.documentElement,{childList:true,subtree:true});
})();
