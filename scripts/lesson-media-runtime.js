// HM Academy lesson media runtime
(function(){
  function youtubeId(url){try{const u=new URL(url);if(u.hostname==='youtu.be')return u.pathname.slice(1);if(u.hostname.includes('youtube.com'))return u.searchParams.get('v')||u.pathname.split('/').filter(Boolean).pop();}catch(e){}return null;}
  function inferLessonId(){
    const params=new URLSearchParams(location.search);
    const explicit=params.get('id');
    if(explicit)return explicit;
    const m=location.pathname.match(/unit-([0-9]+)\/lesson-([0-9]+)-interactive\.html$/i);
    if(m)return `grade8-u${m[1]}-l${m[2]}`;
    return 'lesson-hello';
  }
  async function init(){
    try{
      const lessonId=inferLessonId();
      const response=await fetch('data/media.json');if(!response.ok)return;
      const data=await response.json();const media=(data.media||[]).filter(item=>item.lessonId===lessonId);window.HMLessonMedia=media;
      const video=media.find(item=>item.type==='video');
      const section=Array.from(document.querySelectorAll('section')).find(node=>node.querySelector('h2')?.textContent.includes('فيديو الدرس'));
      if(!section)return;
      if(!video){section.innerHTML='<h2>🎥 فيديو الدرس</h2><p>لا يوجد فيديو مرتبط بهذا الدرس حالياً.</p>';return;}
      const id=youtubeId(video.source||'');
      if(id){section.innerHTML=`<h2>🎥 فيديو الدرس</h2><div style="position:relative;padding-top:56.25%;border-radius:20px;overflow:hidden;background:#101827"><iframe src="https://www.youtube.com/embed/${encodeURIComponent(id)}" title="${video.title||'Lesson video'}" loading="lazy" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;web-share" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe></div>`;return;}
      section.innerHTML='<h2>🎥 فيديو الدرس</h2><video controls preload="metadata" style="width:100%;border-radius:20px"><source src="'+video.source+'">تعذر تحميل الفيديو.</video>';
    }catch(error){console.warn('Lesson media runtime skipped',error);}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();