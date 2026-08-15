// HM Academy — dedicated lesson-video tab
// Keeps lesson videos in their own section without changing the existing lesson content.
(function(){
  'use strict';

  const params = new URLSearchParams(location.search);
  const lessonId = params.get('id') || 'grade8-u1-l1';
  const root = location.pathname.split('/').filter(Boolean)[0] ? '/' + location.pathname.split('/').filter(Boolean)[0] + '/' : '/';
  const tabs = () => document.getElementById('tabs');
  const viewer = () => document.getElementById('viewer');
  const esc = s => String(s ?? '').replace(/[&<>\"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));

  let video = null;
  let videoOpen = false;
  let observerStarted = false;

  function youtubeId(url){
    try{
      const u = new URL(url);
      if(u.hostname === 'youtu.be') return u.pathname.slice(1);
      if(u.hostname.includes('youtube.com')) return u.searchParams.get('v') || u.pathname.split('/').filter(Boolean).pop();
    }catch(e){}
    return null;
  }

  function videoTab(){
    const host = tabs();
    if(!host || host.querySelector('[data-hm-video-tab]')) return;
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'tab';
    b.setAttribute('data-hm-video-tab','1');
    b.textContent = '🎥 فيديو الدرس';
    b.setAttribute('aria-label','فيديو الدرس');
    host.appendChild(b);
  }

  function cleanNonVideoMedia(){
    if(videoOpen) return;
    const host = viewer();
    if(!host) return;
    host.querySelectorAll('iframe, video').forEach(node => {
      const parent = node.closest('.lesson-video-panel,[data-hm-video-panel]');
      if(!parent) node.remove();
    });
    host.querySelectorAll('[data-hm-video-panel]').forEach(node => node.remove());
  }

  function renderVideo(){
    const host = viewer();
    if(!host) return;
    videoOpen = true;
    const b = tabs()?.querySelector('[data-hm-video-tab]');
    tabs()?.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
    b?.classList.add('active');

    if(!video){
      host.innerHTML = '<div class="head"><h2>🎥 فيديو الدرس</h2><p>لا يوجد فيديو مرتبط بهذا الدرس حالياً.</p></div>';
      return;
    }

    const id = youtubeId(video.source || '');
    const media = id
      ? '<div class="lesson-video-frame"><iframe src="https://www.youtube.com/embed/'+encodeURIComponent(id)+'" title="'+esc(video.title || 'Lesson video')+'" loading="lazy" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;web-share" allowfullscreen></iframe></div>'
      : '<video class="lesson-video-native" controls preload="metadata"><source src="'+esc(video.source || '')+'">تعذر تحميل الفيديو.</video>';

    host.innerHTML = '<div class="head"><h2>🎥 فيديو الدرس</h2><p>'+esc(video.title || 'عرض الفيديو التعليمي')+'</p></div><div class="content"><div class="lesson-video-panel" data-hm-video-panel>'+media+'</div></div>';
  }

  function restoreNormalTabState(){
    videoOpen = false;
    cleanNonVideoMedia();
  }

  function bind(){
    videoTab();
    const host = tabs();
    if(!host) return;

    if(!host.dataset.hmVideoBound){
      host.dataset.hmVideoBound = '1';
      host.addEventListener('click', function(e){
        const b = e.target.closest('[data-hm-video-tab]');
        if(!b) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        renderVideo();
      }, true);
    }

    if(!observerStarted){
      observerStarted = true;
      const mo = new MutationObserver(function(){
        videoTab();
        if(!videoOpen) cleanNonVideoMedia();
      });
      mo.observe(host, {childList:true, subtree:true});
      const vo = viewer();
      if(vo) new MutationObserver(function(){ if(!videoOpen) cleanNonVideoMedia(); }).observe(vo,{childList:true,subtree:true});
    }

    if(params.get('section') === 'video') renderVideo();
  }

  async function init(){
    try{
      const r = await fetch(root+'data/media.json',{cache:'no-store'});
      if(r.ok){
        const d = await r.json();
        video = (d.media || []).find(x => x.lessonId === lessonId && x.type === 'video') || null;
      }
    }catch(e){ console.warn('Lesson video tab: media lookup skipped', e); }
    bind();
  }

  const style = document.createElement('style');
  style.textContent = '.lesson-video-panel{max-width:1000px;margin:0 auto}.lesson-video-frame{position:relative;padding-top:56.25%;border-radius:22px;overflow:hidden;background:#101827;box-shadow:0 14px 34px rgba(20,38,74,.14)}.lesson-video-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0}.lesson-video-native{width:100%;border-radius:22px;background:#101827;display:block}.lesson-video-panel + *{margin-top:14px}';
  document.head.appendChild(style);

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
