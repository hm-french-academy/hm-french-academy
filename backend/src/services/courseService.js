const store = require('../storage/dataStore');
const Course = require('../models/Course');

function addCourse(data) {
  const course = new Course(data);
  store.courses.push(course);
  return course;
}

function getCourses() {
  return store.courses;
}

module.exports = { addCourse, getCourses };
