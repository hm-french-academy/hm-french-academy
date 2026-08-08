// HM Academy learning flow client foundation

const HMLearningApi = {
  async courses() {
    return HMApi.request('/courses');
  },

  async lessons() {
    return HMApi.request('/lessons');
  },

  async assessments() {
    return HMApi.request('/assessments');
  },

  async progress() {
    return HMApi.request('/progress');
  }
};

window.HMLearningApi = HMLearningApi;
