// HM Academy Grade 5 -> shared learning progress bridge
(function(){
  'use strict';
  const params=new URLSearchParams(location.search);
  const lessonId=params.get('id')||'g5-t1-l01';
  const legacyKey='hm-g5-complete-'+lessonId;
  let lastSection='';
  const activitySeen=new Set();
  function ready(){return !!window.HMProgress;}
  function getSection(){
    const active=document.querySelector('.lesson-tab.active');
    if(active?.dataset?.section)return active.dataset.section;
    return new URLSearchParams(location.search).get('section')||'overview';
  }
  function activity(key,score=0){
    if(!ready()||activitySeen.has(key))return;
    activitySeen.add(key);window.HMProgress.completeActivity(lessonId+':'+key,score);
  }
  function sync(){
    if(!ready())return;
    const old=localStorage.getItem(legacyKey)==='true';
    const state=window.HMProgress.get();
    if(old&&!state.completedLessons.includes(lessonId))window.HMProgress.completeLesson(lessonId,0);
    window.HMProgress.startLesson(lessonId);markSection();refreshCompletion();
  }
  function complete(){if(!ready())return;window.HMProgress.completeLesson(lessonId,50);localStorage.setItem(legacyKey,'true');activity('lesson-complete',1);refreshCompletion();}
  function refreshCompletion(){const done=ready()&&window.HMProgress.get().completedLessons.includes(lessonId);const msg=document.getElementById('completionMessage'),btn=document.getElementById('completeBtn');if(done){if(msg)msg.textContent='تم إكمال الدرس وحفظ +50 XP في تقدمك العام.';if(btn){btn.textContent='✓ الدرس مكتمل';btn.disabled=true;}}}
  function markSection(){if(!ready())return;const s=getSection();if(!s||s===lastSection)return;lastSection=s;window.HMProgress.startLesson(lessonId);window.HMProgress.setSection(s);activity('section:'+s,0);}
  document.addEventListener('DOMContentLoaded',sync);window.addEventListener('load',sync);
  document.addEventListener('click',function(e){
    const b=e.target.closest('#completeBtn');if(b)setTimeout(complete,0);
    const tab=e.target.closest('.lesson-tab');if(tab)setTimeout(markSection,0);
    const audio=e.target.closest('[data-speak-text],[data-audio]');if(audio)activity('audio:'+getSection(),0);
    const practice=e.target.closest('.question .options button');if(practice)activity('practice:'+getSection(),practice.dataset.ok==='true'?1:0);
    const assess=e.target.closest('.assessment-options button,.assessment-q button');if(assess)activity('assessment:'+getSection(),0);
    const challenge=e.target.closest('#checkChallenge,.challenge-row button');if(challenge)activity('challenge:'+getSection(),1);
  },true);
  const observer=new MutationObserver(markSection);
  document.addEventListener('DOMContentLoaded',()=>observer.observe(document.getElementById('lessonNav')||document.body,{subtree:true,attributes:true,attributeFilter:['class']}));
  const timer=setInterval(()=>{if(ready()){markSection();refreshCompletion();}},1000);
  window.addEventListener('beforeunload',()=>{clearInterval(timer);observer.disconnect();});
})();