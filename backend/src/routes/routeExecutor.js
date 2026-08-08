const registry = require('./handlerRegistry');

const apiRoutes = {
  users: {
    handler: registry.userHandler,
    roles: ['admin']
  },
  courses: {
    handler: registry.courseHandler,
    roles: ['admin', 'teacher']
  },
  lessons: {
    handler: registry.lessonHandler,
    roles: ['admin', 'teacher']
  },
  assessments: {
    handler: registry.assessmentHandler,
    roles: ['admin', 'teacher']
  },
  progress: {
    handler: registry.progressHandler,
    roles: ['admin', 'teacher', 'student']
  }
};

module.exports = apiRoutes;
