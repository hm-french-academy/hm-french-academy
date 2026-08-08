const Lesson = require('../models/Lesson');

const lessons = [];

function createLesson(data) {
  const lesson = new Lesson(data);
  lessons.push(lesson);
  return lesson;
}

function listLessons() {
  return lessons;
}

module.exports = { createLesson, listLessons };
