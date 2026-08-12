// HM Academy Dynamic Bridge
// Keeps Premium Studio UI while allowing Supabase driven lessons
(function(){
 function boot(){
  const params=new URLSearchParams(location.search);
  const lessonId=params.get('lesson_id')||params.get('id');
  if(!lessonId) return;
  document.documentElement.dataset.hmDynamicLesson='true';
  window.dispatchEvent(new CustomEvent('hm:dynamic-mode',{detail:{lessonId}}));
 }
 if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();
