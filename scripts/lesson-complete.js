// HM Academy — canonical lesson completion bootstrap
(function(){
  'use strict';
  function bindDom(){['journey','viewer','unit','title','subtitle','art','completeBtn','completionMessage'].forEach(function(id){var el=document.getElementById(id);if(el)window[id]=el;});var j=document.getElementById('journey');if(j)window.journeyEl=j;}
  bindDom();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindDom,{once:true});
  window.hmNormalizeLessonWord=function(x){x=x||{};return{w:x.fr||x.word||x.term||x.french||'',ar:x.ar||x.translation||x.meaning||x.arabic||'',im:x.image||x.icon||'🖼️',ex:x.example||x.exampleFr||''};};
  window.markLessonComplete=function(lessonId,achievementId,skill){
    if(!window.HMProgress)return false;
    var id=lessonId||new URLSearchParams(location.search).get('id')||'lesson-hello',before=HMProgress.get(),already=Array.isArray(before.completedLessons)&&before.completedLessons.includes(id);
    HMProgress.completeLesson(id,50);
    if(!already){if(achievementId&&window.HMProgress.addAchievement)HMProgress.addAchievement(achievementId);if(window.HMActivity?.add)HMActivity.add('lesson','إكمال الدرس: '+id);if(window.HMSkills?.add)HMSkills.add(skill||'grammar',10);if(window.HMStreak?.checkIn)HMStreak.checkIn();if(window.HMRewards?.unlock)HMRewards.unlock('lesson-finish');}
    var button=document.querySelector('#completeBtn,[data-complete-lesson]');if(button){button.textContent='✅ تم إكمال الدرس';button.disabled=true;button.setAttribute('aria-pressed','true');}
    var message=document.querySelector('#completionMessage,#completion-message');if(message)message.textContent=already?'ℹ️ هذا الدرس مكتمل بالفعل وتم الحفاظ على تقدمك.':'🎉 تم إكمال الدرس وحفظ التقدم وإضافة 50 XP.';
    window.dispatchEvent(new CustomEvent('hm:activity-completed',{detail:{lessonId:id,activityId:'lesson-complete',xp:already?0:50}}));window.dispatchEvent(new CustomEvent('hm:lesson-completed',{detail:{lessonId:id,alreadyCompleted:already}}));return true;
  };
  // The canonical lesson.html owns loading/rendering. No fallback renderer is started here,
  // so there is no second competing loader or delayed duplicate rendering.
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindDom,{once:true});
})();
