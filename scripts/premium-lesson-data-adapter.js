'use strict';
(() => {
  const applyLessonData = (lesson) => {
    if (!lesson) return;
    try {
      const content = typeof lesson.content === 'string'
        ? JSON.parse(lesson.content)
        : (lesson.content || lesson);
      if (!content || typeof content !== 'object') return;
      window.HMPremiumLessonData = {
        ...content,
        id: lesson.id || content.id,
        title: lesson.title || content.title,
        objective: lesson.objective || content.objective,
        duration: lesson.duration || content.duration || content.experience?.duration,
        xp_reward: lesson.xp_reward || content.xp_reward || content.experience?.xp
      };
      window.dispatchEvent(new CustomEvent('hm:premium-data-ready', {
        detail: window.HMPremiumLessonData
      }));
    } catch (error) {
      console.warn('Premium lesson data adapter failed', error);
    }
  };

  window.addEventListener('hm:supabase-lesson-ready', (event) => applyLessonData(event.detail));
  window.addEventListener('hm:lesson-data-ready', (event) => applyLessonData(event.detail));
})();
