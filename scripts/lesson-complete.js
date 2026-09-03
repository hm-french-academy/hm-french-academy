// HM Academy — canonical lesson completion bootstrap + lesson data preloader
(function(){
  'use strict';
  function bindDom(){['journey','viewer','unit','title','subtitle','art','completeBtn','completionMessage','complete'].forEach(function(id){var el=document.getElementById(id);if(el)window[id]=el;});var j=document.getElementById('journey');if(j)window.journeyEl=j;}
  bindDom();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindDom,{once:true});
  if(/(?:^|\/)lesson\.html$/i.test(location.pathname)&&window.fetch&&!window.__hmLessonPreload){
    var nativeFetch=window.fetch.bind(window),qs=new URLSearchParams(location.search),id=qs.get('id')||'grade8-u1-l1',m=id.match(/^grade8-u(\d+)-l(\d+)$/),base='data/lessons/grade-8/';
    var targets=[base+'lesson-registry.json'];if(m)targets.push(base+'unit-'+m[1]+'/lesson-'+m[2]+'.json');
    var preload={};targets.forEach(function(path){preload[path]=nativeFetch(path+'?v=20260815-preload1',{cache:'force-cache',credentials:'same-origin'}).then(function(r){return r.clone().json()}).catch(function(){return null});});
    var original=window.fetch;window.fetch=function(input,init){var raw=typeof input==='string'?input:((input&&input.url)||'');var clean=raw.split('?')[0].replace(/^\.\//,'');for(var i=0;i<targets.length;i++){if(clean===targets[i])return preload[targets[i]].then(function(data){if(data!==null)return new Response(JSON.stringify(data),{status:200,headers:{'Content-Type':'application/json'}});return nativeFetch(input,init);});}return original(input,init)};window.__hmLessonPreload=true;
  }
  window.hmNormalizeLessonWord=function(x){x=x||{};return{w:x.fr||x.word||x.term||x.french||'',ar:x.ar||x.translation||x.meaning||x.arabic||'',im:x.image||x.icon||'🖼️',ex:x.example||x.exampleFr||''};};
  function currentLessonId(){return new URLSearchParams(location.search).get('id')||'grade8-u1-l1';}
  function markCurrentLesson(){if(window.HMProgress){var id=currentLessonId();if(id)HMProgress.startLesson(id);}}
  function bindCompletion(){var button=document.querySelector('#completeBtn,[data-complete-lesson],#complete');if(!button||button.__hmCompletionBound)return;button.__hmCompletionBound=true;button.addEventListener('click',function(){window.markLessonComplete(currentLessonId());});}
  window.markLessonComplete=function(lessonId,achievementId,skill){if(!window.HMProgress)return false;var id=lessonId||currentLessonId(),before=HMProgress.get(),already=Array.isArray(before.completedLessons)&&before.completedLessons.includes(id);HMProgress.completeLesson(id,50);if(!already){if(achievementId&&window.HMProgress.addAchievement)HMProgress.addAchievement(achievementId);if(window.HMActivity?.add)HMActivity.add('lesson','إكمال الدرس: '+id);if(window.HMSkills?.add)HMSkills.add(skill||'grammar',10);if(window.HMStreak?.checkIn)HMStreak.checkIn();if(window.HMRewards?.unlock)HMRewards.unlock('lesson-finish');}var button=document.querySelector('#completeBtn,[data-complete-lesson],#complete');if(button){button.textContent='✅ تم إكمال الدرس';button.disabled=true;button.setAttribute('aria-pressed','true');}var message=document.querySelector('#completionMessage,#completion-message,#status');if(message)message.textContent=already?'ℹ️ هذا الدرس مكتمل بالفعل وتم الحفاظ على تقدمك.':'🎉 تم إكمال الدرس وحفظ التقدم وإضافة 50 XP.';window.dispatchEvent(new CustomEvent('hm:activity-completed',{detail:{lessonId:id,activityId:'lesson-complete',xp:already?0:50}}));window.dispatchEvent(new CustomEvent('hm:lesson-completed',{detail:{lessonId:id,alreadyCompleted:already}}));return true;};
  function init(){markCurrentLesson();bindCompletion();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
  window.addEventListener('hm:supabase-ready',init);
})();
