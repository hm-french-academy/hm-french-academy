// HM Academy frontend API client foundation

const HMApi = {
  baseUrl: '/api',

  async request(path, options = {}) {
    const response = await fetch(this.baseUrl + path, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });

    return response.json();
  },

  getCourses() {
    return this.request('/courses');
  },

  getProgress() {
    return this.request('/progress');
  }
};

window.HMApi = HMApi;
