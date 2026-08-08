const registry = require('./handlerRegistry');

const apiRoutes = {
  users: registry.userHandler,
  courses: registry.courseHandler,
  lessons: registry.lessonHandler,
  assessments: registry.assessmentHandler,
  progress: registry.progressHandler
};

module.exports = apiRoutes;
