// HM Academy Beta checklist runtime
(function(){
  const steps=[
    'curriculum-loaded',
    'lesson-opened',
    'interactive-started',
    'activity-completed',
    'assessment-completed',
    'progress-saved'
  ];
  function mark(step){
    const key='hm_beta_checklist';
    const data=JSON.parse(localStorage.getItem(key)||'[]');
    if(steps.includes(step)&&!data.includes(step)){data.push(step);localStorage.setItem(key,JSON.stringify(data));}
    return data;
  }
  function status(){return JSON.parse(localStorage.getItem('hm_beta_checklist')||'[]');}
  window.HMBetaChecklist={mark,status,steps};
})();
