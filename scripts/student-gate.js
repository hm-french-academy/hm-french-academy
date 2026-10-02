(function(){
  'use strict';

  const ROOT='https://hm-french-academy.github.io/hm-french-academy/';
  const LOGIN=ROOT+'student-link.html';
  const API='https://yvoprtjyxmurvcsaqsny.supabase.co/functions/v1/student-code-login';
  const ADMIN_API='https://yvoprtjyxmurvcsaqsny.supabase.co/functions/v1/admin-student-codes';
  const path=location.pathname.split('/').pop()||'index.html';

  // Public entry pages must remain reachable without either a student code or admin session.
  if(path==='index.html' || path==='') return;
  if(path==='student-link.html' || path==='login.html') return;

  if(window.__HM_STUDENT_GATE_RUNNING) return;
  window.__HM_STUDENT_GATE_RUNNING=true;

  const qs=new URLSearchParams(location.search);
  const lesson=qs.get('id')||qs.get('lesson')||'';

  function go(id){
    const u=new URL(LOGIN);
    if(id)u.searchParams.set('lesson',id);
    location.replace(u.href);
  }

  function newLesson(){
    const u=new URL(LOGIN);
    u.searchParams.set('switch','1');
    location.replace(u.href);
  }

  function tools(){
    if(document.getElementById('hm-student-tools')) return;
    const studentName=(localStorage.getItem('hm_student_name')||'').trim();
    const s=document.createElement('style');s.id='hm-student-tools-style';
    s.textContent='html.hm-student-authorized a.home-btn,html.hm-student-authorized a[href="index.html"],html.hm-student-authorized a[href="../index.html"],html.hm-student-authorized a[href="./index.html"],html.hm-student-authorized a[href*="/index.html"],html.hm-student-authorized .hm-nav a[href$="index.html"],html.hm-student-authorized .hm-brand[href*="index.html"]{display:none!important}html.hm-student-authorized .brand[href*="index.html"]{pointer-events:none!important;cursor:default!important}#hm-student-tools{position:fixed;z-index:2147483000;right:14px;bottom:14px;display:flex;gap:8px;flex-wrap:wrap;max-width:calc(100vw - 28px);font-family:system-ui,-apple-system,"Segoe UI",Tahoma,sans-serif}#hm-student-tools button{border:1px solid #d8e1ec;border-radius:12px;padding:10px 13px;background:#fff;color:#173a82;font-weight:800;font-size:13px;box-shadow:0 8px 25px rgba(23,43,77,.12);cursor:pointer}#hm-student-tools .primary{background:#1f5d9b;color:#fff;border-color:#1f5d9b}#hm-student-tools .logout{color:#b42318}@media(max-width:600px){#hm-student-tools{right:10px;bottom:10px;left:10px;justify-content:center}#hm-student-tools button{flex:1;min-width:130px}}';
    document.head.appendChild(s);
    document.documentElement.classList.add('hm-student-authorized');
    // Student mode: remove every visible route back to the public homepage,
    // not only the legacy .home-btn class. This keeps the lesson a closed student session.
    const hideHomeLinks=(root=document)=>{
      const sels=[
        'a.home-btn','a[href="index.html"]','a[href="../index.html"]',
        'a[href="./index.html"]','a[href*="/index.html"]',
        '.hm-nav a[href$="index.html"]','.hm-brand[href*="index.html"]'
      ];
      sels.forEach(sel=>root.querySelectorAll(sel).forEach(el=>{el.style.display='none';el.setAttribute('aria-hidden','true')}));
    };
    hideHomeLinks();
    if(studentName){
      const existing=document.getElementById('hm-student-namebar');
      if(!existing){
        const bar=document.createElement('div');bar.id='hm-student-namebar';bar.dir='rtl';
        bar.textContent='👋 الطالب: '+studentName;
        bar.style.cssText='margin:0 0 12px;padding:11px 16px;border-radius:16px;background:#fff;border:1px solid #dfe6f2;box-shadow:0 6px 18px rgba(20,38,74,.08);color:#173a82;font-weight:900;font-size:15px;text-align:right;';
        const header=document.querySelector('.student-header');
        const main=document.querySelector('main');
        if(header&&header.parentNode) header.parentNode.insertBefore(bar,header.nextSibling);
        else if(main&&main.parentNode) main.parentNode.insertBefore(bar,main);
        else (document.body||document.documentElement).prepend(bar);
      }
    }
    // Some lesson versions are wrapped in same-origin iframes. Apply the same
    // student UI rules inside them so old home icons cannot leak through.
    document.querySelectorAll('iframe').forEach(frame=>{
      const sync=()=>{
        try{
          const doc=frame.contentDocument;
          if(!doc)return;
          hideHomeLinks(doc);
          if(studentName&&!doc.getElementById('hm-student-namebar')){
            const bar=doc.createElement('div');bar.id='hm-student-namebar';bar.dir='rtl';
            bar.textContent='👋 الطالب: '+studentName;
            bar.style.cssText='position:relative;z-index:2147483000;margin:10px 14px;padding:10px 14px;border-radius:14px;background:#fff;border:1px solid #dfe6f2;box-shadow:0 6px 18px rgba(20,38,74,.08);color:#173a82;font-weight:900;font-size:14px;text-align:right;';
            (doc.body||doc.documentElement).prepend(bar);
          }
        }catch(e){}
      };
      frame.addEventListener('load',sync);
      sync();
    });
    const box=document.createElement('div');box.id='hm-student-tools';box.dir='rtl';
    box.innerHTML='<button class="primary" type="button" id="hm-switch-lesson">🔑 دخول درس آخر</button><button class="logout" type="button" id="hm-student-logout">🚪 تسجيل الخروج</button>';
    (document.body||document.documentElement).appendChild(box);
    document.getElementById('hm-switch-lesson').onclick=newLesson;
    document.getElementById('hm-student-logout').onclick=function(){
      localStorage.removeItem('hm_student_code');
      localStorage.removeItem('hm_student_current_lesson');
      localStorage.removeItem('hm_student_verified_lesson');
      localStorage.removeItem('hm_student_verified_at');
      const u=new URL(LOGIN);u.searchParams.set('logout','1');location.replace(u.href);
    };
  }

  async function getAdminSession(){
    try{
      const {createClient}=await import('https://esm.sh/@supabase/supabase-js@2');
      const sb=createClient(
        'https://yvoprtjyxmurvcsaqsny.supabase.co',
        'sb_publishable_Z_2LUR4d22zrytwD4588FQ_ro_tc3BV'
      );
      const {data,error}=await sb.auth.getSession();
      if(error||!data?.session?.access_token) return false;

      // A valid Supabase login is not enough: the admin endpoint must confirm
      // that this account belongs to the HM Academy admin_users list.
      const r=await fetch(ADMIN_API,{
        method:'POST',
        headers:{
          Authorization:'Bearer '+data.session.access_token,
          'Content-Type':'application/json'
        },
        body:JSON.stringify({action:'list'}),
        cache:'no-store'
      });
      return r.ok;
    }catch(e){
      return false;
    }
  }

  async function run(){
    // Admin sessions are allowed to explore curricula and lessons without
    // being mistaken for a student session.
    if(await getAdminSession()){
      document.documentElement.classList.add('hm-admin-authorized');
      return;
    }

    const code=localStorage.getItem('hm_student_code');
    const device=localStorage.getItem('hm_student_browser_id');

    if(!code||!device){
      go(lesson);
      return;
    }

    if(lesson)localStorage.setItem('hm_student_current_lesson',lesson);

    // Keep the verified lesson session while the lesson uses nested wrappers/iframes.
    // This prevents the same authorized lesson from bouncing back to the code screen.
    const verifiedLesson=localStorage.getItem('hm_student_verified_lesson')||'';
    const verifiedAt=Number(localStorage.getItem('hm_student_verified_at')||0);
    if(lesson && verifiedLesson===lesson && Date.now()-verifiedAt < 30*60*1000 && (localStorage.getItem('hm_student_name')||'').trim()){
      document.documentElement.classList.add('hm-student-authorized');
      if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',tools,{once:true});else tools();
      return;
    }

    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),7000);

    fetch(API,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({code:code,device_id:device,lesson_id:lesson||undefined}),
      signal:controller.signal,
      cache:'no-store'
    })
    .then(r=>r.ok?r.json():Promise.reject(new Error('denied')))
    .then(data=>{
      clearTimeout(timer);
      if(!data||data.valid!==true)throw new Error('denied');
      if(data.student_name) localStorage.setItem('hm_student_name',String(data.student_name));
      localStorage.setItem('hm_student_verified_lesson',lesson||'');
      localStorage.setItem('hm_student_verified_at',String(Date.now()));
      if(lesson&&Array.isArray(data.allowed_lessons)&&!data.allowed_lessons.includes(lesson))throw new Error('lesson-not-allowed');
      document.documentElement.classList.add('hm-student-authorized');
      if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',tools,{once:true});else tools();
    })
    .catch(()=>{
      clearTimeout(timer);
      localStorage.removeItem('hm_student_code');
      localStorage.removeItem('hm_student_current_lesson');
      go(lesson||'');
    });
  }

  run();
})();