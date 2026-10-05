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

  // If a student session already exists, enter the closed student shell immediately.
  // This prevents the public navigation from flashing back in after refresh.
  const persistedCode=(localStorage.getItem('hm_student_code')||'').trim();
  const persistedName=(localStorage.getItem('hm_student_name')||'').trim();
  if(persistedCode){
    document.documentElement.classList.add('hm-student-authorized');
    const early=document.createElement('style');
    early.id='hm-student-early-style';
    early.textContent='html.hm-student-authorized .hm-nav,html.hm-student-authorized .hm-tools,html.hm-student-authorized .hm-header .hm-brand[href*="index.html"],html.hm-student-authorized header a[href*="secondary-french-intro.html"]{display:none!important}';
    (document.head||document.documentElement).appendChild(early);
  }

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
    s.textContent='html.hm-student-authorized .hm-nav,html.hm-student-authorized .hm-tools,html.hm-student-authorized .hm-header .hm-brand,html.hm-student-authorized .hm-header .hm-nav,html.hm-student-authorized header.top,html.hm-student-authorized header a[href*="secondary-french-intro.html"],html.hm-student-authorized header a[href*="grade-4.html"],html.hm-student-authorized header a[href*="grade-3.html"],html.hm-student-authorized header a[href*="grade-5.html"],html.hm-student-authorized header a[href*="grade-6.html"],html.hm-student-authorized header a[href*="grade-7.html"],html.hm-student-authorized header a[href*="grade-8.html"],html.hm-student-authorized header a[href*="grade-9.html"],html.hm-student-authorized a.home-btn,html.hm-student-authorized a[href="index.html"],html.hm-student-authorized a[href="../index.html"],html.hm-student-authorized a[href="./index.html"],html.hm-student-authorized .hm-nav a[href$="index.html"],html.hm-student-authorized .hm-brand[href*="index.html"]{display:none!important}html.hm-student-authorized .brand[href*="index.html"]{pointer-events:none!important;cursor:default!important}#hm-student-tools{position:relative;z-index:20;margin:40px auto 24px;padding:0 14px;display:flex;gap:8px;flex-wrap:wrap;max-width:calc(100vw - 28px);font-family:system-ui,-apple-system,"Segoe UI",Tahoma,sans-serif}#hm-student-tools button{border:1px solid #d8e1ec;border-radius:12px;padding:10px 13px;background:#fff;color:#173a82;font-weight:800;font-size:13px;box-shadow:0 8px 25px rgba(23,43,77,.12);cursor:pointer}#hm-student-tools .primary{background:#1f5d9b;color:#fff;border-color:#1f5d9b}#hm-student-tools .logout{color:#b42318}@media(max-width:600px){#hm-student-tools{margin:32px auto 20px;justify-content:center}#hm-student-tools button{flex:1;min-width:130px}}';
    document.head.appendChild(s);
    document.documentElement.classList.add('hm-student-authorized');
    // Student mode: remove every visible route back to the public homepage,
    // not only the legacy .home-btn class. This keeps the lesson a closed student session.
    const hideHomeLinks=(root=document)=>{
      const sels=[
        'header.top','a.home-btn','a[href="index.html"]','a[href="../index.html"]',
        'a[href="./index.html"]','a[href*="/index.html"]',
        'a[href*="grade-3.html"]','a[href*="grade-4.html"]','a[href*="grade-5.html"]',
        'a[href*="grade-6.html"]','a[href*="grade-7.html"]','a[href*="grade-8.html"]',
        'a[href*="grade-9.html"]',
        '.hm-nav a[href$="index.html"]','.hm-brand[href*="index.html"]'
      ];
      sels.forEach(sel=>root.querySelectorAll(sel).forEach(el=>{el.style.display='none';el.setAttribute('aria-hidden','true')}));
    };
    // Apply the student-only chrome immediately and keep it applied if a page renders
    // its header/navigation after this script runs.
    const applyStudentChrome=()=>{
      hideHomeLinks();

      // Welcome bar: keep exactly one copy and recreate it if the page renderer
      // replaces the body/main after refresh or navigation.
      if(studentName){
        let existing=document.getElementById('hm-student-namebar');
        if(!existing){
          const bar=document.createElement('div');bar.id='hm-student-namebar';bar.dir='rtl';
          bar.textContent='👋 أهلًا بك، '+studentName;
          bar.style.cssText='margin:12px auto 18px;padding:12px 18px;border-radius:16px;background:#fff;border:1px solid #dfe6f2;box-shadow:0 8px 24px rgba(20,38,74,.10);color:#173a82;font-weight:900;font-size:16px;text-align:right;max-width:calc(100% - 32px);';
          const body=document.body||document.documentElement;
          const wrap=document.querySelector('.wrap');
          const main=document.querySelector('main');
          const header=document.querySelector('.hm-header,.student-header,header');
          if(wrap&&wrap.parentNode) wrap.parentNode.insertBefore(bar,wrap);
          else if(main&&main.parentNode) main.parentNode.insertBefore(bar,main);
          else if(header&&header.parentNode) header.parentNode.insertBefore(bar,header.nextSibling);
          else body.prepend(bar);
          existing=bar;
        }
        existing.textContent='👋 أهلًا بك، '+studentName;
      }

      // Bottom controls: they are intentionally NOT part of the public header.
      // Recreate them whenever a lesson renderer replaces the page DOM.
      if(!document.getElementById('hm-student-tools') && document.body){
        const box=document.createElement('footer');box.id='hm-student-tools';box.dir='rtl';box.setAttribute('role','contentinfo');box.setAttribute('data-hm-student-controls','1');
        box.innerHTML='<button class="primary" type="button" id="hm-switch-lesson">🔑 دخول درس آخر</button><button class="logout" type="button" id="hm-student-logout">🚪 تسجيل الخروج</button>';
        box.style.cssText='display:flex!important;clear:both;position:relative!important;float:none!important;width:100%!important;box-sizing:border-box!important;';
        document.body.appendChild(box);
        box.querySelector('#hm-switch-lesson').onclick=newLesson;
        box.querySelector('#hm-student-logout').onclick=function(){
          ['hm_student_code','hm_student_current_lesson','hm_student_verified_lesson','hm_student_verified_at','hm_student_name'].forEach(k=>localStorage.removeItem(k));
          const u=new URL(LOGIN);u.searchParams.set('logout','1');location.replace(u.href);
        };
      }
    };
    applyStudentChrome();
    if(!window.__HM_STUDENT_CHROME_OBSERVER){
      // Do not rescan the entire lesson after every DOM mutation. Dynamic lesson
      // sections can replace large panels on each click; rescanning the whole
      // document for every mutation can lock slower mobile browsers.
      let chromeQueued=false;
      const queueStudentChrome=()=>{
        if(chromeQueued)return;
        chromeQueued=true;
        const run=()=>{
          chromeQueued=false;
          const missingTools=!document.getElementById('hm-student-tools');
          const missingName=!!studentName&&!document.getElementById('hm-student-namebar');
          const publicHeader=document.querySelector('header.top,.hm-nav a[href$="index.html"],.hm-brand[href*="index.html"]');
          if(missingTools||missingName||publicHeader)applyStudentChrome();
        };
        if(window.requestAnimationFrame)window.requestAnimationFrame(run);else setTimeout(run,0);
      };
      window.__HM_STUDENT_CHROME_OBSERVER=new MutationObserver(mutations=>{
        for(const m of mutations){
          if(m.type!=='childList')continue;
          if(m.addedNodes.length||m.removedNodes.length){queueStudentChrome();break;}
        }
      });
      window.__HM_STUDENT_CHROME_OBSERVER.observe(document.documentElement,{childList:true,subtree:true});
    }
    // Some lesson versions are wrapped in same-origin iframes. Keep the
    // same student-only welcome and remove public home/stage shortcuts inside
    // the actual lesson frame as well. Older versions created the iframe after
    // this script ran, so we also watch for newly-added frames.
    const syncStudentFrame=(frame)=>{
      const sync=()=>{
        try{
          const doc=frame.contentDocument;
          if(!doc)return;
          const frameSels=[
            'header.top','a.home-btn','a[href="index.html"]','a[href="../index.html"]',
            'a[href="./index.html"]','a[href*="/index.html"]',
            'a[href*="grade-3.html"]','a[href*="grade-4.html"]','a[href*="grade-5.html"]',
            'a[href*="grade-6.html"]','a[href*="grade-7.html"]','a[href*="grade-8.html"]',
            'a[href*="grade-9.html"]',
            'a[href="grade-7.html"]','a[href="../grade-7.html"]',
            'a[href="grade-4.html"]','a[href="../grade-4.html"]',
            '.hm-nav a[href$="index.html"]','.hm-brand[href*="index.html"]'
          ];
          frameSels.forEach(sel=>doc.querySelectorAll(sel).forEach(el=>{
            el.style.display='none';
            el.setAttribute('aria-hidden','true');
          }));
          if(studentName){
            let bar=doc.getElementById('hm-student-namebar');
            if(!bar){
              bar=doc.createElement('div');
              bar.id='hm-student-namebar';
              bar.dir='rtl';
              bar.style.cssText='position:relative;z-index:2147483000;margin:12px 14px 18px;padding:12px 16px;border-radius:16px;background:#fff;border:1px solid #dfe6f2;box-shadow:0 8px 24px rgba(20,38,74,.10);color:#173a82;font-weight:900;font-size:15px;text-align:right;';
              const body=doc.body||doc.documentElement;
              const wrap=doc.querySelector('.wrap');
              const main=doc.querySelector('main');
              const header=doc.querySelector('header');
              if(wrap&&wrap.parentNode)wrap.parentNode.insertBefore(bar,wrap);
              else if(main&&main.parentNode)main.parentNode.insertBefore(bar,main);
              else if(header&&header.parentNode)header.parentNode.insertBefore(bar,header.nextSibling);
              else body.prepend(bar);
            }
            bar.textContent='👋 أهلًا بك، '+studentName+' — لنُكمل رحلتك في تعلّم الفرنسية ✨';
          }
        }catch(e){}
      };
      frame.addEventListener('load',sync);
      sync();
    };
    const bindStudentFrames=(root=document)=>{
      root.querySelectorAll('iframe').forEach(syncStudentFrame);
    };
    bindStudentFrames();
    if(!window.__HM_STUDENT_FRAME_OBSERVER){
      window.__HM_STUDENT_FRAME_OBSERVER=new MutationObserver(mutations=>{
        mutations.forEach(m=>m.addedNodes.forEach(n=>{
          if(n.nodeType!==1)return;
          if(n.tagName==='IFRAME')syncStudentFrame(n);
          n.querySelectorAll&&n.querySelectorAll('iframe').forEach(syncStudentFrame);
        }));
      });
      window.__HM_STUDENT_FRAME_OBSERVER.observe(document.documentElement,{childList:true,subtree:true});
    }

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
    // A lesson opened from the student-code router is always a student session.
    // Do this before checking any Supabase admin session so a cached admin login
    // can never suppress the student welcome bar or restore public navigation.
    const explicitStudentRoute=qs.get('student')==='1';
    if(!explicitStudentRoute && !persistedCode && await getAdminSession()){
      document.documentElement.classList.add('hm-admin-authorized');
      return;
    }

    const code=localStorage.getItem('hm_student_code');
    const device=localStorage.getItem('hm_student_browser_id');
    const sessionName=(localStorage.getItem('hm_student_name')||'').trim();

    // Explicit student routes must always render the closed student chrome
    // after successful verification, even when the student's display name is
    // temporarily unavailable. The welcome bar will use the stored name once
    // it is returned by the verification endpoint.

    // Rebuild the student controls immediately from the persisted session.
    // The API check below remains authoritative and can still redirect if the
    // session/code is no longer valid.
    if(code && sessionName){
      document.documentElement.classList.add('hm-student-authorized');
      if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',tools,{once:true});else tools();
    }

    if(!code||!device){
      go(lesson);
      return;
    }

    if(lesson)localStorage.setItem('hm_student_current_lesson',lesson);

    // Do not trust a cached browser flag as authorization.
    // Every protected lesson must pass through the single canonical Supabase
    // student-code-login endpoint. LocalStorage is UI/session state only.

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
      if(!data || (data.ok!==true && data.valid!==true)) throw new Error(data.error||'denied');
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

  window.addEventListener('pageshow',function(){
    const c=(localStorage.getItem('hm_student_code')||'').trim();
    const n=(localStorage.getItem('hm_student_name')||'').trim();
    if(c&&n)tools();
  });
  document.addEventListener('visibilitychange',function(){
    if(document.visibilityState==='visible'){
      const c=(localStorage.getItem('hm_student_code')||'').trim();
      const n=(localStorage.getItem('hm_student_name')||'').trim();
      if(c&&n)tools();
    }
  });
  run();
})();