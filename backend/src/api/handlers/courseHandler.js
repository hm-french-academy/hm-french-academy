const { courseService } = require('../../controllers/serviceRegistry');

function listCoursesHandler(req, res) {
  return res.json(courseService.getCourses());
}

function createCourseHandler(req, res) {
  return res.json(courseService.addCourse(req.body));
}

module.exports = { listCoursesHandler, createCourseHandler };
