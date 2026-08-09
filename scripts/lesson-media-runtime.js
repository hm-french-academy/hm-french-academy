// HM Academy lesson media runtime
(async function(){
  try {
    const params = new URLSearchParams(location.search);
    const lessonId = params.get('id') || 'lesson-hello';
    const response = await fetch('data/media.json');
    if(!response.ok) return;
    const data = await response.json();
    const media = (data.media || []).filter(item => item.lessonId === lessonId);
    window.HMLessonMedia = media;

    const video = media.find(item => item.type === 'video');
    const section = Array.from(document.querySelectorAll('section.hero h2'))
      .find(node => node.textContent.includes('فيديو الدرس'))?.parentElement;

    if(section){
      if(video){
        section.innerHTML = '<h2>🎥 فيديو الدرس</h2><video controls preload="metadata" style="width:100%;border-radius:20px"><source src="'+video.source+'" type="video/mp4">تعذر تحميل الفيديو.</video>';
      } else {
        section.innerHTML = '<h2>🎥 فيديو الدرس</h2><p>لا توجد وسائط فيديو لهذا الدرس حالياً.</p>';
      }
    }
  } catch(error) {
    console.warn('Lesson media runtime skipped', error);
  }
})();
