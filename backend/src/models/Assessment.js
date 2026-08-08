class Assessment {
  constructor({ id, courseId, title, scoreRules }) {
    this.id = id;
    this.courseId = courseId;
    this.title = title;
    this.scoreRules = scoreRules;
  }
}

module.exports = Assessment;
