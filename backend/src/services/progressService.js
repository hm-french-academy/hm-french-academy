const store = require('../storage/dataStore');
const Progress = require('../models/Progress');

function updateStudentProgress(data) {
  const progress = new Progress(data);
  store.progress.push(progress);
  return progress;
}

function getProgressByStudent(studentId) {
  return store.progress.filter(item => item.studentId === studentId);
}

module.exports = { updateStudentProgress, getProgressByStudent };
