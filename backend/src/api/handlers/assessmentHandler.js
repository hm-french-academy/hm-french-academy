const { assessmentService } = require('../../controllers/serviceRegistry');

function listAssessmentsHandler(req, res) {
  return res.json(assessmentService.getAssessments());
}

function createAssessmentHandler(req, res) {
  return res.json(assessmentService.addAssessment(req.body));
}

module.exports = { listAssessmentsHandler, createAssessmentHandler };
