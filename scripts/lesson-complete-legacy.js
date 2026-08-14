// HM Academy lesson completion helper + canonical lesson route
(function(){
  // Lesson 1 now uses the same canonical lesson studio as the rest of the curriculum.
  // Keep the legacy interactive page available from Files/legacy links, but do not
  // redirect the main lesson route away from the standardized bilingual template.
})();

function markLessonComplete(lessonId, achievementId='lesson-finish', skill='grammar') {
  if (!window.HMProgress) return false;
  const id=lessonId||new URLSearchParams(location.search).get('id')||'lesson-hello';
  const before=HMProgress.get();
  const alreadyCompleted=Array.isArray(before.completedLessons)&&before.completedLessons.includes(id);
  HMProgress.completeLesson(id,50);
  if(!alreadyCompleted){
    if(achievementId&&window.HMProgress.addAchievement) HMProgress.addAchievement(achievementId);
    if(window.HMActivity?.add) HMActivity.add('lesson','إكمال الدرس: '+id);
    if(window.HMSkills?.add) HMSkills.add(skill,10);
    if(window.HMStreak?.checkIn) HMStreak.checkIn();
    if(window.HMRewards?.unlock) HMRewards.unlock('lesson-finish');
  }
  const button=document.querySelector('#completeBtn,[data-complete-lesson]');
  if(button){button.textContent='✅ تم إكمال الدرس';button.disabled=true;button.setAttribute('aria-pressed','true');}
  const message=document.querySelector('#completionMessage,#completion-message');
  if(message)message.textContent=alreadyCompleted?'ℹ️ هذا الدرس مكتمل بالفعل وتم الحفاظ على تقدمك.':'🎉 تم إكمال الدرس وحفظ التقدم وإضافة 50 XP.';
  window.dispatchEvent(new CustomEvent('hm:activity-completed',{detail:{lessonId:id,activityId:'lesson-complete',xp:alreadyCompleted?0:50}}));
  window.dispatchEvent(new CustomEvent('hm:lesson-completed',{detail:{lessonId:id,alreadyCompleted}}));
  return true;
}

/* HM Academy — contextual lesson navigation */
(function(){
  function initContextNav(){
    if(!document.querySelector('.hm-header')) return;
    if(!document.querySelector('.tabs') && !document.querySelector('#viewer')) return;
    if(document.getElementById('hm-context-nav')) return;
    const qs=new URLSearchParams(location.search);
    const lessonId=qs.get('id') || 'grade8-u1-l1';
    const currentSection=qs.get('section') || document.querySelector('.tab.active')?.dataset.view || 'lesson';
    const labels={lesson:'📘 الدرس',vocab:'📚 المفردات',pronunciation:'🎧 النطق',grammar:'📖 القواعد',conversation:'💬 المحادثة',practice:'✍️ التدريب',games:'🎮 الألعاب',assessment:'📝 التقييم',files:'📚 الملفات'};
    const tabButtons=[...document.querySelectorAll('.tab[data-view]')];
    const sections=tabButtons.map(b=>({key:b.dataset.view,label:(b.textContent||'').trim()||labels[b.dataset.view]}));
    const sectionItems=(sections.length?sections:Object.entries(labels).map(([key,label])=>({key,label}))).map(x=>`<a href="lesson.html?id=${encodeURIComponent(lessonId)}&section=${encodeURIComponent(x.key)}" class="hm-context-item${x.key===currentSection?' active':''}">${x.label}</a>`).join('');
    const host=document.querySelector('.hm-nav'); if(!host) return;
    const homeLink=[...host.querySelectorAll('a')].find(a=>a.getAttribute('href')==='index.html'); if(!homeLink) return;
    homeLink.setAttribute('href','#'); homeLink.setAttribute('aria-expanded','false'); homeLink.setAttribute('aria-controls','hm-context-nav'); homeLink.classList.add('hm-context-trigger'); homeLink.textContent='الرئيسية';
    const menu=document.createElement('div'); menu.id='hm-context-nav'; menu.className='hm-context-menu'; menu.setAttribute('role','menu');
    menu.innerHTML=`<div class="hm-context-title">التنقل داخل الدرس</div><div class="hm-context-grid">${sectionItems}</div><div class="hm-context-divider"></div><a class="hm-context-item hm-context-map" href="grade-8.html">🧭 خريطة الوحدة</a><a class="hm-context-item hm-context-home" href="index.html">⌂ الصفحة الرئيسية للمنصة</a>`;
    document.body.appendChild(menu);
    const style=document.createElement('style'); style.textContent=`.hm-context-menu{position:fixed;z-index:9999;top:76px;right:18px;width:min(430px,calc(100vw - 36px));padding:14px;background:#fff;border:1px solid #dfe6f2;border-radius:20px;box-shadow:0 22px 60px rgba(20,38,74,.22);display:none}.hm-context-menu.open{display:block;animation:hmMenuIn .16s ease-out}.hm-context-title{font-weight:900;color:#14264a;font-size:16px;padding:4px 4px 11px}.hm-context-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.hm-context-item{display:block;text-decoration:none!important;color:#243b67!important;background:#f7f9fd;border:1px solid #e0e6f0;border-radius:12px;padding:10px 11px;font-weight:900;font-size:13px}.hm-context-item:hover,.hm-context-item.active{background:#fff1f7;border-color:#e92d83;color:#c51e6c!important}.hm-context-divider{height:1px;background:#e7ebf2;margin:12px 0}.hm-context-map{background:#eef5ff}.hm-context-home{background:#14264a;color:#fff!important;text-align:center}@keyframes hmMenuIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}@media(max-width:700px){.hm-context-menu{top:68px;right:10px;width:calc(100vw - 20px)}.hm-context-grid{grid-template-columns:1fr 1fr}}`; document.head.appendChild(style);
    function close(){menu.classList.remove('open');homeLink.setAttribute('aria-expanded','false');}
    homeLink.addEventListener('click',function(e){e.preventDefault();const open=menu.classList.toggle('open');homeLink.setAttribute('aria-expanded',String(open));});
    document.addEventListener('click',function(e){if(!menu.contains(e.target)&&!homeLink.contains(e.target))close();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initContextNav,{once:true}); else initContextNav();
})();

/* HM Academy — robust French speech layer */
(function(){
  if(!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) return;
  const synth=window.speechSynthesis, nativeSpeak=synth.speak.bind(synth), nativeCancel=synth.cancel.bind(synth);
  function frenchVoice(){const voices=synth.getVoices?synth.getVoices():[];return voices.find(v=>/^fr-FR$/i.test(v.lang))||voices.find(v=>/^fr[-_]/i.test(v.lang))||voices.find(v=>/french|français/i.test(v.name||''))||null;}
  function chunks(text,max=220){const s=String(text||'').replace(/\s+/g,' ').trim();if(s.length<=max)return s?[s]:[];const out=[];let rest=s;while(rest.length>max){let cut=rest.lastIndexOf('. ',max);if(cut<80)cut=rest.lastIndexOf(' ',max);if(cut<40)cut=max;out.push(rest.slice(0,cut+(rest[cut]==='.'?1:0)).trim());rest=rest.slice(cut+(rest[cut]==='.'?1:0)).trim();}if(rest)out.push(rest);return out;}
  function speakRobust(utterance){const text=utterance?.text||'';if(!text)return;const pieces=chunks(text),voice=frenchVoice(),rate=Number.isFinite(utterance?.rate)?utterance.rate:.86,pitch=Number.isFinite(utterance?.pitch)?utterance.pitch:1,volume=Number.isFinite(utterance?.volume)?utterance.volume:1;let index=0;const playNext=()=>{if(index>=pieces.length){try{utterance.onend?.(new Event('end'));}catch(_){}return;}const u=new SpeechSynthesisUtterance(pieces[index++]);u.lang='fr-FR';u.rate=rate;u.pitch=pitch;u.volume=volume;if(voice)u.voice=voice;u.onstart=()=>{if(index===1)try{utterance.onstart?.(new Event('start'));}catch(_){}};u.onend=()=>playNext();u.onerror=e=>{try{utterance.onerror?.(e);}catch(_){}};nativeSpeak(u);};playNext();}
  if(!synth.__hmRobustPatched){synth.__hmRobustPatched=true;synth.speak=function(utterance){if(!utterance||!utterance.text)return nativeSpeak(utterance);speakRobust(utterance);};synth.cancel=function(){nativeCancel();};}
  window.HMSpeech={speak:function(text,opts={}){const u=new SpeechSynthesisUtterance(String(text||''));u.lang='fr-FR';u.rate=opts.rate||.86;if(opts.button){const old=opts.button.textContent;opts.button.textContent='⏸️ جاري النطق...';u.onend=()=>opts.button.textContent=old;u.onerror=()=>opts.button.textContent=old;}synth.cancel();synth.speak(u);return Promise.resolve(true);}};
  if(synth.addEventListener)synth.addEventListener('voiceschanged',()=>synth.getVoices(),{passive:true});
  function addSpeechControls(root=document){const viewer=root.querySelector?.('#viewer')||root;if(!viewer)return;viewer.querySelectorAll('.grammar-language.fr').forEach(box=>{if(box.querySelector('.hm-speech-control'))return;const text=box.textContent.replace(/Explication en français/i,'').trim();if(!text)return;const b=document.createElement('button');b.type='button';b.className='listen hm-speech-control';b.textContent='🔊 استمع لشرح القاعدة بالفرنسية';b.addEventListener('click',()=>window.HMSpeech.speak(text,{button:b}));box.appendChild(b);});const dialogue=viewer.querySelector('.dialogue');if(dialogue&&!dialogue.querySelector('.hm-dialogue-speech')){const lines=[...dialogue.querySelectorAll('.fr-line')].map(x=>x.textContent.trim()).filter(Boolean);if(lines.length){const b=document.createElement('button');b.type='button';b.className='primary hm-dialogue-speech';b.textContent='🔊 استمع إلى المحادثة كاملة';b.style.marginBottom='12px';b.addEventListener('click',()=>window.HMSpeech.speak(lines.join(' '),{button:b}));dialogue.prepend(b);}}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>addSpeechControls(),{once:true});else addSpeechControls();
  const observer=new MutationObserver(()=>addSpeechControls());observer.observe(document.documentElement,{childList:true,subtree:true});
})();

/* Lesson Studio DOM compatibility: never depend on implicit window globals for IDs. */
(function(){
  function bind(){
    ['journey','viewer','unit','title','subtitle','art','completeBtn','completionMessage'].forEach(id=>{
      const el=document.getElementById(id);
      if(el && !(id in window)) window[id]=el;
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bind,{once:true});
  else bind();
  bind();
})();
