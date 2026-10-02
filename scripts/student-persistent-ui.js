(function(){
'use strict';
var STYLE_ID='hm-student-persistent-ui-style',NAME_ID='hm-student-persistent-welcome',TOOLS_ID='hm-student-persistent-tools';
function name(){return(localStorage.getItem('hm_student_name')||'').trim()}
function active(){return!!(localStorage.getItem('hm_student_code')||'').trim()}
function login(){return'/hm-french-academy/student-code.html'}
function style(){
 if(document.getElementById(STYLE_ID))return;
 var s=document.createElement('style');s.id=STYLE_ID;
 s.textContent='#'+TOOLS_ID+'{display:flex!important;gap:12px;justify-content:center;align-items:center;flex-wrap:wrap;margin:32px auto 24px;padding:0 16px;position:relative;z-index:9999;direction:rtl}#'+TOOLS_ID+' button{appearance:none;cursor:pointer;padding:13px 22px;border-radius:14px;font:inherit;font-weight:900;line-height:1.2}.hm-switch{background:#173a82;color:#fff;border:0}.hm-logout{background:#fff;color:#173a82;border:1px solid #d9e1ef}#'+NAME_ID+'{display:block!important;visibility:visible!important;opacity:1!important;position:relative;z-index:9998;margin:12px auto 18px;padding:12px 18px;border-radius:16px;background:#fff;border:1px solid #dfe6f2;box-shadow:0 8px 24px rgba(20,38,74,.10);color:#173a82;font-weight:900;font-size:16px;text-align:right;max-width:calc(100% - 32px);direction:rtl}';
 (document.head||document.documentElement).appendChild(s);
}
function welcome(){
 var n=name();if(!n)return;
 var b=document.getElementById(NAME_ID);
 if(!b){b=document.createElement('div');b.id=NAME_ID;b.textContent='👋 أهلًا بك، '+n;
  var main=document.querySelector('main'),header=document.querySelector('header');
  if(main&&main.parentNode)main.parentNode.insertBefore(b,main);
  else if(header&&header.parentNode)header.parentNode.insertBefore(b,header.nextSibling);
  else(document.body||document.documentElement).prepend(b);
 }else b.textContent='👋 أهلًا بك، '+n;
}
function tools(){
 if(!active()||document.getElementById(TOOLS_ID))return;
 var b=document.createElement('div');b.id=TOOLS_ID;
 b.innerHTML='<button type="button" class="hm-switch">🔑 دخول درس آخر</button><button type="button" class="hm-logout">🚪 تسجيل الخروج</button>';
 (document.body||document.documentElement).appendChild(b);
 b.querySelector('.hm-switch').onclick=function(){location.href=login()};
 b.querySelector('.hm-logout').onclick=function(){['hm_student_code','hm_student_current_lesson','hm_student_verified_lesson','hm_student_verified_at','hm_student_name','hm_student_browser_id'].forEach(function(k){localStorage.removeItem(k)});location.replace(login()+'?logout=1')};
}
function render(){if(!active())return;style();welcome();tools()}
function start(){render();new MutationObserver(render).observe(document.documentElement,{subtree:true,childList:true});setInterval(render,700)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();