(function(){
  'use strict';
  if(!/lesson\.html$/i.test(location.pathname)) return;
  const clean=s=>String(s||'').replace(/\s+/g,' ').trim();
  function enabled(){try{return JSON.parse(localStorage.getItem('hm_academy_preferences')||'{}').lessonSound!==false}catch{return true}}
  function speak(text,el){if(!enabled()||!('speechSynthesis'in window)||!text)return;speechSynthesis.cancel();document.querySelectorAll('.hm-audio-active').forEach(x=>x.classList.remove('hm-audio-active'));el?.classList.add('hm-audio-active');const u=new SpeechSynthesisUtterance(clean(text));u.lang='fr-FR';u.rate=.82;u.pitch=1;u.onend=()=>el?.classList.remove('hm-audio-active');speechSynthesis.speak(u)}
  function button(host,text,label){if(host.dataset.hmAudioReady)return;host.dataset.hmAudioReady='1';const b=document.createElement('button');b.type='button';b.className='hm-example-audio';b.innerHTML='🔊 <span>'+label+'</span>';b.title='استمع إلى المثال';b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();speak(text,host)});host.appendChild(b)}
  function enhance(){
    document.querySelectorAll('.example').forEach(el=>{const text=clean(el.querySelector('strong')?.textContent||el.firstChild?.textContent||el.textContent);if(text)button(el,text,'استمع إلى المثال')});
    document.querySelectorAll('.rule-example').forEach(el=>{const text=clean(el.querySelector('strong')?.textContent||'');if(text)button(el,text,'استمع')});
    document.querySelectorAll('.line').forEach(el=>{const text=clean(el.querySelector('b')?.textContent||'');if(text)button(el,text,'استمع')});
    if(!document.getElementById('hm-example-audio-style')){const s=document.createElement('style');s.id='hm-example-audio-style';s.textContent='.example,.rule-example,.line{position:relative}.hm-example-audio{border:0;background:#edf4ff;color:#2458ad;border-radius:10px;padding:6px 9px;font-size:11px;font-weight:900;cursor:pointer;margin-inline-start:7px}.hm-example-audio:hover{transform:translateY(-1px);background:#e4eeff}.hm-audio-active{outline:3px solid #e92b8230;box-shadow:0 10px 25px #e92b8214!important}';document.head.appendChild(s)}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enhance,{once:true});else enhance();
  new MutationObserver(enhance).observe(document.body,{childList:true,subtree:true});
})();
