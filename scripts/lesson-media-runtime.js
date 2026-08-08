// HM Academy lesson media runtime
(function(){
  document.addEventListener('DOMContentLoaded', async function(){
    const params = new URLSearchParams(location.search);
    const lessonId = params.get('id') || 'lesson-hello';
    const response = await fetch('data/media.json');
    if(!response.ok) return;
    const data = await response.json();
    const media = (data.media || []).filter(item => item.lessonId === lessonId);

    window.HMLessonMedia = media;

    const video = media.find(item => item.type === 'video');
    const section = document.querySelector('section.hero h2')?.textContent.includes('فيديو الدرس')
      ? document.querySelector('section.hero h2').parentElement
      : null;

    if(section && video){
      section.innerHTML = '<h2>🎥 فيديو الدرس</h2><video controls style="width:100%;border-radius:20px"><source src="'+video.source+'"></video>';
    }
  });
})();
