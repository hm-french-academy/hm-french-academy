// HM Academy Lesson Factory
(function(){
  function build(lesson){
    if(!lesson || !lesson.files) throw new Error('Invalid lesson configuration');
    return {
      id: lesson.id,
      title: lesson.title,
      files: lesson.files,
      activities: lesson.activities || [],
      media: lesson.media || {}
    };
  }
  window.HMLessonFactory={build};
})();
