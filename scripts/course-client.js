// HM Academy dynamic learning flow client

const HMLearningApi = {
  async courses() {
    return HMApi.request('/courses');
  },

  async levels(courseId) {
    return HMApi.request(`/courses/${courseId}/levels`);
  },

  async units(levelId) {
    return HMApi.request(`/levels/${levelId}/units`);
  },

  async lessons(unitId) {
    return HMApi.request(`/units/${unitId}/lessons`);
  },

  async lesson(lessonId) {
    return HMApi.request(`/lessons/${lessonId}`);
  },

  async assessments() {
    return HMApi.request('/assessments');
  },

  async progress() {
    return HMApi.request('/progress');
  }
};

window.HMLearningApi = HMLearningApi;
