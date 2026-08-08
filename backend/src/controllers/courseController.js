const Course = require('../models/Course');

const courses = [];

function createCourse(data) {
  const course = new Course(data);
  courses.push(course);
  return course;
}

function listCourses() {
  return courses;
}

module.exports = { createCourse, listCourses };
