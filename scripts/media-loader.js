// HM Academy shared media loader
// Supports local audio/video and YouTube lesson links without extracting embedded audio.
function hmYouTubeId(url){try{const u=new URL(url);if(u.hostname==='youtu.be')return u.pathname.slice(1);if(u.hostname.includes('youtube.com'))return u.searchParams.get('v')||u.pathname.split('/').filter(Boolean).pop();}catch(e){}return null;}
async function loadLessonMedia(lessonId, containerId='lesson-media'){
  const container=document.getElementById(containerId);if(!container)return;
  try{
    const response=await fetch('data/media.json');if(!response.ok){container.innerHTML='<p>الوسائط التعليمية غير متاحة حالياً.</p>';return;}
    const data=await response.json();const items=(data.media||[]).filter(item=>item.lessonId===lessonId);
    if(!items.length){container.innerHTML='<p>سيتم إضافة الوسائط لهذا الدرس قريباً.</p>';return;}
    container.innerHTML=items.map(item=>{
      const source=String(item.source||'');
      if(item.type==='audio')return `<div class="media-card"><h3>🔊 ${item.title||'Audio'}</h3><audio controls preload="metadata"><source src="${source}"></audio><p>${item.description||''}</p></div>`;
      if(item.type==='video'){
        const id=hmYouTubeId(source);
        if(id)return `<div class="media-card"><h3>🎥 ${item.title||'Video'}</h3><div style="position:relative;padding-top:56.25%;border-radius:18px;overflow:hidden;background:#101827"><iframe src="https://www.youtube.com/embed/${encodeURIComponent(id)}" title="${item.title||'Lesson video'}" loading="lazy" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;web-share" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe></div><p>${item.description||''}</p></div>`;
        return `<div class="media-card"><h3>🎥 ${item.title||'Video'}</h3><video controls preload="metadata" width="100%"><source src="${source}"></video><p>${item.description||''}</p></div>`;
      }
      return '';
    }).join('');
  }catch(error){console.warn('Media loading skipped:',error);container.innerHTML='<p>تعذر تحميل الوسائط حالياً.</p>';}
}
window.HMYouTubeId=hmYouTubeId;
