// HM Academy Lesson Generator Runtime
(function(){
  function createLessonConfig(id,title){
    return {
      id:id,
      title:title,
      sections:['introduction','vocabulary','audio','video','practice','games','assessment','summary'],
      tracking:true,
      beta:true
    };
  }
  window.HMLessonGenerator={createLessonConfig};
})();
