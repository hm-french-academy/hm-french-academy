(function(){
  'use strict';
  const ROOT='https://hm-french-academy.github.io/hm-french-academy/';
  const LOGIN=ROOT+'student-link.html';
  const API='https://yvoprtjyxmurvcsaqsny.supabase.co/functions/v1/student-code-login';
  const path=location.pathname.split('/').pop()||'index.html';
  if(path==='student-link.html') return;
  if(window.__HM_STUDENT_GATE_RUNNING) return;
  window.__HM_STUDENT_GATE_RUNNING=true;

  function go(lesson){
    const u=new URL(LOGIN);
    if(lesson) u.searchParams.set('lesson',lesson);
    location.replace(u.href);
  }

  // The public homepage is never a student destination.
  if(path==='index.html' || path===''){
    go();
    return;
  }

  const code=localStorage.getItem('hm_student_code');
  const device=localStorage.getItem('hm_student_browser_id');
  if(!code || !device){ go(new URLSearchParams(location.search).get('id')||''); return; }

  const qs=new URLSearchParams(location.search);
  const lesson=qs.get('id') || qs.get('lesson') || '';
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),7000);

  fetch(API,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({code:code,device_id:device,lesson_id:lesson||undefined}),
    signal:controller.signal,
    cache:'no-store'
  }).then(r=>r.ok?r.json():Promise.reject(new Error('denied')))
   .then(data=>{
      clearTimeout(timer);
      if(!data || data.valid!==true) throw new Error('denied');
      // A student session is valid, but a lesson page must also be explicitly authorized.
      if(lesson && Array.isArray(data.allowed_lessons) && !data.allowed_lessons.includes(lesson)){
        throw new Error('lesson-not-allowed');
      }
      document.documentElement.classList.add('hm-student-authorized');
   })
   .catch(()=>{
      clearTimeout(timer);
      localStorage.removeItem('hm_student_code');
      go(lesson||'');
   });
})();