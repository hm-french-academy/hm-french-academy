'use strict';
/**
 * HM Premium Lesson Engine
 * Loader contract for all future lessons.
 * Keeps the premium experience consistent without depending on visual labels.
 */
(() => {
  const ENGINE_VERSION = '1.1';
  const FLOW = [
    'hero',
    'discovery',
    'pronunciation',
    'interactiveExplanation',
    'contextDialogue',
    'grammarLab',
    'practiceArena',
    'independentAssessment',
    'games',
    'masteryReport'
  ];

  function normalizeLesson(lesson) {
    const content = lesson?.content || {};
    return {
      ...lesson,
      sections: Array.isArray(content.sections) ? content.sections : (lesson.sections || [])
    };
  }

  window.HMPremiumEngine = {
    version: ENGINE_VERSION,
    flow: FLOW,

    normalizeLesson,

    validate(lesson) {
      const errors = [];
      const data = normalizeLesson(lesson);
      if (!data) return ['Missing lesson data'];
      if (!data.title) errors.push('Missing lesson title');
      if (!Array.isArray(data.sections)) errors.push('Missing lesson sections');
      return errors;
    },

    getSectionsByType(lesson, type) {
      return normalizeLesson(lesson).sections.filter(section => section.type === type);
    },

    createProgressState(id) {
      return {
        lessonId: id,
        completedSections: [],
        xp: 0,
        updatedAt: new Date().toISOString()
      };
    },

    completeSection(state, section, xp = 0) {
      if (!state.completedSections.includes(section)) {
        state.completedSections.push(section);
        state.xp += xp;
      }
      state.updatedAt = new Date().toISOString();
      return state;
    }
  };
})();
