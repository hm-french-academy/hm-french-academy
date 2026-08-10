// HM Academy Leçon 1 Preview Check
(function(){
  const checks=[
    'json-loaded',
    'interactive-opened',
    'activity-completed',
    'assessment-completed',
    'progress-saved'
  ];
  window.HMLesson1PreviewCheck={
    mark:function(item){
      const data=JSON.parse(localStorage.getItem('hm_lesson1_preview')||'[]');
      if(checks.includes(item)&&!data.includes(item)){data.push(item);localStorage.setItem('hm_lesson1_preview',JSON.stringify(data));}
    },
    status:function(){return JSON.parse(localStorage.getItem('hm_lesson1_preview')||'[]')},
    checks
  };
})();
