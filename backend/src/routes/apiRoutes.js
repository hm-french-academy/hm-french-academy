const controllers = require('./controllersMap');

module.exports = {
  users: controllers.users,
  courses: controllers.courses,
  lessons: controllers.lessons,
  assessments: controllers.assessments,
  progress: controllers.progress
};
