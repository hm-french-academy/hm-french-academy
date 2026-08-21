/* HM Academy — Grade 5 Lesson 2 Premium runtime patch v2
 * Fixes: lesson-scoped vocabulary/audio hooks and deterministic game state.
 */
(function(){'use strict';
  const LESSON='g5-t1-l02';
  function speak(text){
    if(!text || !('speechSynthesis' in window)) return false;
    try{window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='fr-FR';u.rate=.88;u.pitch=1;window.speechSynthesis.speak(u);return true;}catch(e){return false;}
  }
  function wireAudio(root){
    (root||document).querySelectorAll('[data-pronounce],[data-audio-text]').forEach(btn=>{
      if(btn.dataset.lessonAudioBound===LESSON)return;
      btn.dataset.lessonAudioBound=LESSON;
      btn.addEventListener('click',e=>{e.preventDefault();speak(btn.dataset.pronounce||btn.dataset.audioText||btn.textContent.trim());});
    });
  }
  function resetButtons(panel){panel.querySelectorAll('button').forEach(b=>{b.disabled=false;b.removeAttribute('aria-pressed');});}
  window.HMGrade5Lesson2={lessonId:LESSON,speak,wireAudio,resetButtons};
  document.addEventListener('DOMContentLoaded',()=>wireAudio());
})();
