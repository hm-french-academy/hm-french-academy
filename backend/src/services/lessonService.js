const store = require('../storage/dataStore');
const Lesson = require('../models/Lesson');

function addLesson(data) {
  const lesson = new Lesson(data);
  store.lessons.push(lesson);
  return lesson;
}

function getLessons() {
  return store.lessons;
}

module.exports = { addLesson, getLessons };
