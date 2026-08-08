const store = require('../storage/dataStore');
const Assessment = require('../models/Assessment');

function addAssessment(data) {
  const assessment = new Assessment(data);
  store.assessments.push(assessment);
  return assessment;
}

function getAssessments() {
  return store.assessments;
}

module.exports = { addAssessment, getAssessments };
