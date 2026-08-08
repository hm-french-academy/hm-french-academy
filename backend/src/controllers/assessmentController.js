const Assessment = require('../models/Assessment');

const assessments = [];

function createAssessment(data) {
  const assessment = new Assessment(data);
  assessments.push(assessment);
  return assessment;
}

function listAssessments() {
  return assessments;
}

module.exports = { createAssessment, listAssessments };
