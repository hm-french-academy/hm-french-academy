// HM Academy lesson media runtime
(function(){
  function youtubeId(url){try{const u=new URL(url);if(u.hostname==='youtu.be')return u.pathname.slice(1);if(u.hostname.includes('youtube.com'))return u.searchParams.get('v')||u.pathname.split('/').filter(Boolean).pop();}catch(e){}return null;}
  async function init(){
    try{
      const params=new URLSearchParams(location.search);const lessonId=params.get('id')||'lesson-hello';
      const response=await fetch('data/media.json');if(!response.ok)return;
      const data=await response.json();const media=(data.media||[]).filter(item=>item.lessonId===lessonId);window.HMLessonMedia=media;
      const video=media.find(item=>item.type==='video');
      const section=Array.from(document.querySelectorAll('section.hero h2')).find(node=>node.textContent.includes('فيديو الدرس'))?.parentElement;
      if(!section)return;
      if(!video){section.innerHTML='<h2>🎥 فيديو الدرس</h2><p>لا توجد وسائط فيديو لهذا الدرس حالياً.</p>';return;}
      const id=youtubeId(video.source||'');
      if(id){section.innerHTML=`<h2>🎥 فيديو الدرس</h2><div style="position:relative;padding-top:56.25%;border-radius:20px;overflow:hidden;background:#101827"><iframe src="https://www.youtube.com/embed/${encodeURIComponent(id)}" title="${video.title||'Lesson video'}" loading="lazy" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;web-share" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe></div>`;return;}
      section.innerHTML='<h2>🎥 فيديو الدرس</h2><video controls preload="metadata" style="width:100%;border-radius:20px"><source src="'+video.source+'">تعذر تحميل الفيديو.</video>';
    }catch(error){console.warn('Lesson media runtime skipped',error);}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
