'use strict';
(() => {
  const params = new URLSearchParams(location.search);
  const lessonId = params.get('lesson_id') || params.get('id');
  window.HMLessonBridge = {
    lessonId,
    data: null,
    async load() {
      if (!lessonId || !window.supabaseClient) return null;
      const { data, error } = await window.supabaseClient
        .from('lessons')
        .select('id,title,objective,duration,xp_reward,content')
        .eq('id', lessonId)
        .single();
      if (error) throw error;
      this.data = data;
      window.dispatchEvent(new CustomEvent('hm:lesson-loaded', { detail: data }));
      return data;
    }
  };
})();
