// HM Academy shared media loader
// Reads central media registry and renders lesson audio/video blocks
async function loadLessonMedia(lessonId, containerId = 'lesson-media') {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const response = await fetch('data/media.json');
    if (!response.ok) {
      container.innerHTML = '<p>الوسائط التعليمية غير متاحة حالياً.</p>';
      return;
    }

    const data = await response.json();
    const items = (data.media || []).filter(item => item.lessonId === lessonId);

    if (!items.length) {
      container.innerHTML = '<p>سيتم إضافة الوسائط لهذا الدرس قريباً.</p>';
      return;
    }

    container.innerHTML = items.map(item => {
      if (item.type === 'audio') {
        return `<div class="media-card"><h3>🔊 ${item.title}</h3><audio controls preload="metadata"><source src="${item.source}"></audio><p>${item.description || ''}</p></div>`;
      }

      if (item.type === 'video') {
        return `<div class="media-card"><h3>🎥 ${item.title}</h3><video controls preload="metadata" width="100%"><source src="${item.source}"></video><p>${item.description || ''}</p></div>`;
      }

      return '';
    }).join('');
  } catch (error) {
    console.warn('Media loading skipped:', error);
    container.innerHTML = '<p>تعذر تحميل الوسائط حالياً.</p>';
  }
}
