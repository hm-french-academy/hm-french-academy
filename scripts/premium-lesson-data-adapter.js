'use strict';
(() => {
  const applyLessonData = (lesson) => {
    if (!lesson || !lesson.content) return;

    const content = typeof lesson.content === 'string'
      ? JSON.parse(lesson.content)
      : lesson.content;

    window.HMPremiumLessonData = {
      ...content,
      id: lesson.id,
      title: lesson.title || content.title,
      objective: lesson.objective || content.objective,
      duration: lesson.duration || content.duration,
      xp_reward: lesson.xp_reward || content.xp_reward
    };

    window.dispatchEvent(new CustomEvent('hm:premium-data-ready', {
      detail: window.HMPremiumLessonData
    }));
  };

  window.addEventListener('hm:supabase-lesson-ready', (event) => {
    try {
      applyLessonData(event.detail);
    } catch (error) {
      console.warn('Premium lesson data adapter failed', error);
    }
  });
})();
