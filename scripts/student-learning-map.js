// HM Academy student learning map
(function(){
  const key='hm_learning_map';
  function read(){try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}}
  function mark(lessonId,activity){const m=read();m[lessonId]=m[lessonId]||{};m[lessonId][activity]={completed:true,at:new Date().toISOString()};localStorage.setItem(key,JSON.stringify(m));return m}
  function get(lessonId){return read()[lessonId]||{}}
  window.HMStudentLearningMap={mark,get,read};
})();
