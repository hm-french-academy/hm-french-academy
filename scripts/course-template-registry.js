// HM Academy Course Template Registry
(function(){
  const templates={
    lesson:{
      sections:['introduction','vocabulary','audio','video','practice','games','assessment','summary'],
      tracking:true,
      beta:true
    }
  };
  function get(type){return templates[type]||null;}
  window.HMCourseTemplateRegistry={get,templates};
})();
