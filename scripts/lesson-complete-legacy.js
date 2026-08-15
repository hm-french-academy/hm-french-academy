// HM Academy — legacy compatibility layer (deduplicated)
(function(){
  'use strict';
  function bind(){['journey','viewer','unit','title','subtitle','art','completeBtn','completionMessage'].forEach(function(id){var el=document.getElementById(id);if(el&&!(id in window))window[id]=el;});}
  function initContextNav(){
    if(!document.querySelector('.hm-header')||(!document.querySelector('.tabs')&&!document.querySelector('#viewer'))||document.getElementById('hm-context-nav'))return;
    var qs=new URLSearchParams(location.search),lessonId=qs.get('id')||'grade8-u1-l1',current=qs.get('section')||document.querySelector('.tab.active')?.dataset.view||'lesson';
    var labels={lesson:'📘 الدرس',vocab:'📚 المفردات',pronunciation:'🎧 النطق',grammar:'📖 القواعد',conversation:'💬 المحادثة',practice:'✍️ التدريب',games:'🎮 الألعاب',assessment:'📝 التقييم',files:'📚 الملفات'};
    var host=document.querySelector('.hm-nav');if(!host)return;var home=[...host.querySelectorAll('a')].find(function(a){return a.getAttribute('href')==='index.html'});if(!home)return;
    var sections=[...document.querySelectorAll('.tab[data-view]')].map(function(b){return{key:b.dataset.view,label:(b.textContent||'').trim()||labels[b.dataset.view]}});if(!sections.length)sections=Object.entries(labels).map(function(x){return{key:x[0],label:x[1]}});
    home.setAttribute('href','#');home.setAttribute('aria-expanded','false');home.setAttribute('aria-controls','hm-context-nav');
    var menu=document.createElement('div');menu.id='hm-context-nav';menu.className='hm-context-menu';menu.innerHTML='<div class="hm-context-title">التنقل داخل الدرس</div><div class="hm-context-grid">'+sections.map(function(x){return '<a href="lesson.html?id='+encodeURIComponent(lessonId)+'&section='+encodeURIComponent(x.key)+'" class="hm-context-item'+(x.key===current?' active':'')+'">'+x.label+'</a>'}).join('')+'</div><div class="hm-context-divider"></div><a class="hm-context-item" href="grade-8.html">🧭 خريطة الوحدة</a><a class="hm-context-item hm-context-home" href="index.html">⌂ الصفحة الرئيسية للمنصة</a>';
    document.body.appendChild(menu);
    var style=document.createElement('style');style.textContent='.hm-context-menu{position:fixed;z-index:9999;top:76px;right:18px;width:min(430px,calc(100vw - 36px));padding:14px;background:#fff;border:1px solid #dfe6f2;border-radius:20px;box-shadow:0 22px 60px rgba(20,38,74,.22);display:none}.hm-context-menu.open{display:block}.hm-context-title{font-weight:900;color:#14264a;font-size:16px;padding:4px 4px 11px}.hm-context-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.hm-context-item{display:block;text-decoration:none!important;color:#243b67!important;background:#f7f9fd;border:1px solid #e0e6f0;border-radius:12px;padding:10px 11px;font-weight:900;font-size:13px}.hm-context-item:hover,.hm-context-item.active{background:#fff1f7;border-color:#e92d83;color:#c51e6c!important}.hm-context-divider{height:1px;background:#e7ebf2;margin:12px 0}.hm-context-home{background:#14264a!important;color:#fff!important;text-align:center}@media(max-width:700px){.hm-context-menu{top:68px;right:10px;width:calc(100vw - 20px)}}';document.head.appendChild(style);
    function close(){menu.classList.remove('open');home.setAttribute('aria-expanded','false')}home.addEventListener('click',function(e){e.preventDefault();var open=menu.classList.toggle('open');home.setAttribute('aria-expanded',String(open))});document.addEventListener('click',function(e){if(!menu.contains(e.target)&&!home.contains(e.target))close()});document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){bind();initContextNav()},{once:true});else{bind();initContextNav()}
})();

// Robust French speech. Important: do not inject another conversation button here;
// the canonical lesson renderer owns the single full-conversation control.
(function(){
  if(!('speechSynthesis' in window)||!('SpeechSynthesisUtterance' in window))return;
  var synth=window.speechSynthesis,nativeSpeak=synth.speak.bind(synth),nativeCancel=synth.cancel.bind(synth);
  function voice(){var v=synth.getVoices?synth.getVoices():[];return v.find(function(x){return /^fr-FR$/i.test(x.lang)})||v.find(function(x){return /^fr[-_]/i.test(x.lang)})||v.find(function(x){return /french|français/i.test(x.name||'')})||null}
  function chunks(text,max){var s=String(text||'').replace(/\s+/g,' ').trim();if(s.length<=max)return s?[s]:[];var out=[],rest=s;while(rest.length>max){var cut=rest.lastIndexOf('. ',max);if(cut<80)cut=rest.lastIndexOf(' ',max);if(cut<40)cut=max;out.push(rest.slice(0,cut).trim());rest=rest.slice(cut+(rest[cut]==='.'?1:0)).trim()}if(rest)out.push(rest);return out}
  function speakRobust(u){var pieces=chunks(u&&u.text,220),v=voice(),i=0;if(!pieces.length)return;function next(){if(i>=pieces.length){try{u.onend&&u.onend(new Event('end'))}catch(_){}return}var x=new SpeechSynthesisUtterance(pieces[i++]);x.lang='fr-FR';x.rate=Number.isFinite(u.rate)?u.rate:.86;x.pitch=Number.isFinite(u.pitch)?u.pitch:1;x.volume=Number.isFinite(u.volume)?u.volume:1;if(v)x.voice=v;x.onend=next;x.onerror=function(e){try{u.onerror&&u.onerror(e)}catch(_){}};nativeSpeak(x)}next()}
  if(!synth.__hmRobustPatched){synth.__hmRobustPatched=true;synth.speak=function(u){if(u&&u.text)speakRobust(u);else nativeSpeak(u)};synth.cancel=function(){nativeCancel()}}
  window.HMSpeech={speak:function(text,opts){opts=opts||{};var u=new SpeechSynthesisUtterance(String(text||''));u.lang='fr-FR';u.rate=opts.rate||.86;if(opts.button){var old=opts.button.textContent;opts.button.textContent='⏸️ جاري النطق...';u.onend=function(){opts.button.textContent=old};u.onerror=function(){opts.button.textContent=old}}synth.cancel();synth.speak(u);return Promise.resolve(true)}};
  if(synth.addEventListener)synth.addEventListener('voiceschanged',function(){synth.getVoices()},{passive:true});
})();
