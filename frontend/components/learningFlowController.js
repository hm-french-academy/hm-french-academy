// HM Academy Learning Flow Controller Foundation

const LearningFlowController = {
  async loadCourses() {
    return window.HMLearningApi ? HMLearningApi.courses() : [];
  },

  async loadLessons() {
    return window.HMLearningApi ? HMLearningApi.lessons() : [];
  },

  async loadAssessments() {
    return window.HMLearningApi ? HMLearningApi.assessments() : [];
  },

  async loadProgress() {
    return window.HMLearningApi ? HMLearningApi.progress() : [];
  }
};

window.LearningFlowController = LearningFlowController;
