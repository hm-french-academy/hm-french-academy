'use strict';
/**
 * HM Premium Lesson Engine
 * Loader contract for all future lessons.
 * Keeps the premium experience consistent without depending on visual labels.
 */
(() => {
  const ENGINE_VERSION = '1.0';
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

  window.HMPremiumEngine = {
    version: ENGINE_VERSION,
    flow: FLOW,
    validate(lesson) {
      const errors = [];
      if (!lesson) return ['Missing lesson data'];
      if (!lesson.title) errors.push('Missing lesson title');
      if (!lesson.sections || !Array.isArray(lesson.sections)) errors.push('Missing lesson sections');
      return errors;
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
