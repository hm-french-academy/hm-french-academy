const { progressService } = require('../../controllers/serviceRegistry');

function getProgressHandler(req, res) {
  return res.json(progressService.getProgressByStudent(req.params.studentId));
}

function updateProgressHandler(req, res) {
  return res.json(progressService.updateStudentProgress(req.body));
}

module.exports = { getProgressHandler, updateProgressHandler };
