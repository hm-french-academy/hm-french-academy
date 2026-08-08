const controllers = {
  users: require('../controllers/userController'),
  courses: require('../controllers/courseController'),
  lessons: require('../controllers/lessonController'),
  assessments: require('../controllers/assessmentController'),
  progress: require('../controllers/progressController')
};

module.exports = controllers;
