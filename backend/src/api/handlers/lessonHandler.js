const { lessonService } = require('../../controllers/serviceRegistry');

function listLessonsHandler(req, res) {
  return res.json(lessonService.getLessons());
}

function createLessonHandler(req, res) {
  return res.json(lessonService.addLesson(req.body));
}

module.exports = { listLessonsHandler, createLessonHandler };
