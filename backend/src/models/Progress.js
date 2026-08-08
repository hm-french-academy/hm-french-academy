class Progress {
  constructor({ id, studentId, lessonId, completionStatus }) {
    this.id = id;
    this.studentId = studentId;
    this.lessonId = lessonId;
    this.completionStatus = completionStatus;
  }
}

module.exports = Progress;
