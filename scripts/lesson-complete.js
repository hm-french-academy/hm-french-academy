// HM Academy lesson completion helper + Lesson 1 canonical route
(function(){
  const path=(location.pathname||'').toLowerCase();
  const id=new URLSearchParams(location.search).get('id');
  if(path.endsWith('/lesson.html') && id==='grade8-u1-l1'){
    const target='data/lessons/grade-8/unit-1/lesson-1-interactive-v2.html';
    if(!location.pathname.includes('/data/lessons/grade-8/unit-1/')) location.replace(target);
  }
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

/* HM Academy — contextual lesson navigation
   The student should not need to leave the current lesson and restart navigation.
   Clicking "الرئيسية" in the lesson header opens a compact local menu with the
   current lesson sections, unit map, and the true platform home. */
(function(){
  function initContextNav(){
    if(!document.querySelector('.hm-header')) return;
    if(!document.querySelector('.tabs') && !document.querySelector('#viewer')) return;
    if(document.getElementById('hm-context-nav')) return;

    const qs=new URLSearchParams(location.search);
    const lessonId=qs.get('id') || 'grade8-u1-l1';
    const currentSection=qs.get('section') || document.querySelector('.tab.active')?.dataset.view || 'lesson';

    const labels={
      lesson:'📘 الدرس',
      vocab:'📚 المفردات',
      pronunciation:'🎧 النطق',
      grammar:'📖 القواعد',
      practice:'✍️ التدريب',
      games:'🎮 الألعاب',
      assessment:'📝 التقييم',
      files:'📚 الملفات'
    };

    const tabButtons=[...document.querySelectorAll('.tab[data-view]')];
    const sections=tabButtons.map(b=>({key:b.dataset.view,label:(b.textContent||'').trim()||labels[b.dataset.view]}));
    const sectionItems=(sections.length?sections:Object.entries(labels).map(([key,label])=>({key,label})))
      .map(x=>`<a href="lesson.html?id=${encodeURIComponent(lessonId)}&section=${encodeURIComponent(x.key)}" class="hm-context-item${x.key===currentSection?' active':''}">${x.label}</a>`).join('');

    const host=document.querySelector('.hm-nav');
    if(!host) return;
    const homeLink=[...host.querySelectorAll('a')].find(a=>a.getAttribute('href')==='index.html');
    if(!homeLink) return;

    homeLink.setAttribute('href','#');
    homeLink.setAttribute('aria-expanded','false');
    homeLink.setAttribute('aria-controls','hm-context-nav');
    homeLink.classList.add('hm-context-trigger');
    homeLink.textContent='الرئيسية';

    const menu=document.createElement('div');
    menu.id='hm-context-nav';
    menu.className='hm-context-menu';
    menu.setAttribute('role','menu');
    menu.innerHTML=`
      <div class="hm-context-title">التنقل داخل الدرس</div>
      <div class="hm-context-grid">${sectionItems}</div>
      <div class="hm-context-divider"></div>
      <a class="hm-context-item hm-context-map" href="grade-8.html">🧭 خريطة الوحدة</a>
      <a class="hm-context-item hm-context-home" href="index.html">⌂ الصفحة الرئيسية للمنصة</a>
    `;
    document.body.appendChild(menu);

    const style=document.createElement('style');
    style.textContent=`
      .hm-context-menu{position:fixed;z-index:9999;top:76px;right:18px;width:min(430px,calc(100vw - 36px));padding:14px;background:#fff;border:1px solid #dfe6f2;border-radius:20px;box-shadow:0 22px 60px rgba(20,38,74,.22);display:none}
      .hm-context-menu.open{display:block;animation:hmMenuIn .16s ease-out}
      .hm-context-title{font-weight:900;color:#14264a;font-size:16px;padding:4px 4px 11px}
      .hm-context-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
      .hm-context-item{display:block;text-decoration:none!important;color:#243b67!important;background:#f7f9fd;border:1px solid #e0e6f0;border-radius:12px;padding:10px 11px;font-weight:900;font-size:13px}
      .hm-context-item:hover,.hm-context-item.active{background:#fff1f7;border-color:#e92d83;color:#c51e6c!important}
      .hm-context-divider{height:1px;background:#e7ebf2;margin:12px 0}
      .hm-context-map{background:#eef5ff}
      .hm-context-home{background:#14264a;color:#fff!important;text-align:center}
      @keyframes hmMenuIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
      @media(max-width:700px){.hm-context-menu{top:68px;right:10px;width:calc(100vw - 20px)}.hm-context-grid{grid-template-columns:1fr 1fr}}
    `;
    document.head.appendChild(style);

    function close(){menu.classList.remove('open');homeLink.setAttribute('aria-expanded','false');}
    homeLink.addEventListener('click',function(e){
      e.preventDefault();
      const open=menu.classList.toggle('open');
      homeLink.setAttribute('aria-expanded',String(open));
    });
    document.addEventListener('click',function(e){
      if(!menu.contains(e.target) && !homeLink.contains(e.target)) close();
    });
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initContextNav,{once:true});
  else initContextNav();
})();
