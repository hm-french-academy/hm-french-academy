// HM Academy audio + Grade 5 lesson integration
(function(){
  'use strict';
  function getSpeakText(button){
    if(button.dataset.speakText||button.dataset.text)return button.dataset.speakText||button.dataset.text;
    const scope=button.closest('article,section,.card,.lesson-card,.conversation-line,.grammar-example,.vocab-card,.word')||button.parentElement;
    const fr=scope?.querySelector('[lang="fr"],[dir="ltr"],.fr,.lesson-fr,.fr-line,.grammar-example-fr');
    if(fr&&fr.textContent.trim())return fr.textContent.trim();
    return button.closest('[data-word]')?.dataset.word||'';
  }
  async function speak(text,button){
    if(window.HMSpeech?.speak)return !!(await window.HMSpeech.speak(text,{button}));
    if(!text||!('speechSynthesis'in window))return false;
    try{
      speechSynthesis.cancel();
      const u=new SpeechSynthesisUtterance(text);u.lang='fr-FR';u.rate=.86;
      if(button)button.textContent='⏸️ جاري النطق...';
      u.onend=()=>{if(button)button.textContent='🔊 استمع للنطق';};
      u.onerror=()=>{if(button)button.textContent='🔊 استمع للنطق';};
      speechSynthesis.resume();speechSynthesis.speak(u);return true;
    }catch(_){return false;}
  }
  async function playAudio(src,button){
    const text=getSpeakText(button);
    if(src){
      const audio=new Audio(src);
      try{if(button)button.textContent='⏸️ جاري التشغيل...';await audio.play();audio.addEventListener('ended',()=>{if(button)button.textContent='🔊 استمع للنطق';},{once:true});return;}catch(_){}
    }
    if(!await speak(text,button)&&button)button.textContent='🔊 النطق غير متاح على هذا الجهاز';
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-audio],[data-speak-text]');
    if(b)playAudio(b,b);
  });

  // Grade 5 must work even when the lesson page still contains its legacy
  // completion handler. This capture listener runs first and synchronizes
  // completion with the shared HMProgress store.
  function isGrade5Lesson(){return /(^|\/)grade-5-lesson\.html$/.test(location.pathname);}
  function loadProgress(cb){
    if(window.HMProgress){cb();return;}
    const existing=document.querySelector('script[src*="learning-progress.js"]');
    if(existing){let n=0;const t=setInterval(()=>{if(window.HMProgress||++n>30){clearInterval(t);if(window.HMProgress)cb();}},50);return;}
    const s=document.createElement('script');s.src='scripts/learning-progress.js?build=20260819-20';s.onload=()=>cb();document.head.appendChild(s);
  }
  function syncCompletion(){
    if(!isGrade5Lesson())return;
    const id=new URLSearchParams(location.search).get('id');if(!id)return;
    loadProgress(()=>{
      window.HMProgress.startLesson(id);
      const legacy=localStorage.getItem('hm-g5-complete-'+id)==='true';
      if(legacy&&!window.HMProgress.get().completedLessons.includes(id))window.HMProgress.completeLesson(id,50);
      const done=window.HMProgress.get().completedLessons.includes(id);
      const msg=document.getElementById('completionMessage'),btn=document.getElementById('completeBtn');
      if(done){if(msg)msg.textContent='تم إكمال الدرس وحفظ +50 XP في تقدمك العام.';if(btn){btn.textContent='✓ الدرس مكتمل';btn.disabled=true;}}
    });
  }
  function completeGrade5(e){
    if(!isGrade5Lesson())return;
    const btn=e.target.closest('#completeBtn');if(!btn)return;
    const id=new URLSearchParams(location.search).get('id');if(!id)return;
    loadProgress(()=>{
      window.HMProgress.completeLesson(id,50);
      localStorage.setItem('hm-g5-complete-'+id,'true');
      const msg=document.getElementById('completionMessage');
      if(msg)msg.textContent='تم إكمال الدرس وحفظ +50 XP في تقدمك العام.';
      btn.textContent='✓ تم إكمال الدرس';btn.disabled=true;
    });
  }
  document.addEventListener('click',completeGrade5,true);
  document.addEventListener('DOMContentLoaded',syncCompletion);
  window.addEventListener('load',syncCompletion);
})();