// HM Academy Grade 5 -> shared learning progress bridge
(function(){
  'use strict';
  const params=new URLSearchParams(location.search);
  const lessonId=params.get('id')||'g5-t1-l01';
  const legacyKey='hm-g5-complete-'+lessonId;

  function ready(){return !!window.HMProgress;}
  function sync(){
    if(!ready())return;
    const old=localStorage.getItem(legacyKey)==='true';
    const state=window.HMProgress.get();
    if(old&&!state.completedLessons.includes(lessonId)){
      window.HMProgress.completeLesson(lessonId,0);
    }
    window.HMProgress.startLesson(lessonId);
    const done=window.HMProgress.get().completedLessons.includes(lessonId);
    const msg=document.getElementById('completionMessage');
    const btn=document.getElementById('completeBtn');
    if(done){
      if(msg)msg.textContent='تم حفظ إكمال الدرس ضمن تقدمك العام في HM Academy.';
      if(btn){btn.textContent='✓ الدرس مكتمل';btn.disabled=true;}
    }
  }

  function complete(){
    if(!ready())return;
    window.HMProgress.completeLesson(lessonId,50);
    localStorage.setItem(legacyKey,'true');
    const msg=document.getElementById('completionMessage');
    const btn=document.getElementById('completeBtn');
    if(msg)msg.textContent='تم إكمال الدرس وحفظ +50 XP في تقدمك العام.';
    if(btn){btn.textContent='✓ تم إكمال الدرس';btn.disabled=true;}
  }

  document.addEventListener('DOMContentLoaded',sync);
  window.addEventListener('load',sync);
  document.addEventListener('click',function(e){
    const b=e.target.closest('#completeBtn');
    if(b){setTimeout(complete,0);}
  });

  let lastSection='';
  const timer=setInterval(function(){
    if(!ready())return;
    const s=new URLSearchParams(location.search).get('section')||'overview';
    if(s!==lastSection){lastSection=s;window.HMProgress.startLesson(lessonId);window.HMProgress.setSection(s);}
    const done=window.HMProgress.get().completedLessons.includes(lessonId);
    const btn=document.getElementById('completeBtn');
    if(done&&btn&&!btn.disabled){
      btn.textContent='✓ الدرس مكتمل';btn.disabled=true;
      const msg=document.getElementById('completionMessage');
      if(msg)msg.textContent='تم حفظ إكمال الدرس ضمن تقدمك العام في HM Academy.';
    }
  },700);
  window.addEventListener('beforeunload',()=>clearInterval(timer));
})();