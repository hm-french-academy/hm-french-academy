// HM Academy Core Layer
// Central registry for future platform services
window.HMCore = {
  version: '1.0.0',
  modules: {
    progress: 'scripts/learning-progress.js',
    levels: 'scripts/level-engine.js',
    skills: 'scripts/skills-engine.js',
    recommendations: 'scripts/recommendation-engine.js',
    paths: 'scripts/learning-path-engine.js'
  },
  status(){
    return {
      platform: 'HM Academy',
      version: this.version,
      ready: true
    };
  }
};
