const Progress = require('../models/Progress');

const progressRecords = [];

function updateProgress(data) {
  const record = new Progress(data);
  progressRecords.push(record);
  return record;
}

function getStudentProgress(studentId) {
  return progressRecords.filter(item => item.studentId === studentId);
}

module.exports = { updateProgress, getStudentProgress };
