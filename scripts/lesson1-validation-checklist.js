// HM Academy Leçon 1 Validation Checklist
(function(){
  function render(target){
    const el=document.querySelector(target);
    if(!el)return;
    const steps=[
      'Open lesson',
      'Test audio and pronunciation',
      'Complete interactive activities',
      'Complete quiz',
      'Complete final assessment',
      'Verify progress sync'
    ];
    steps.forEach(function(s,i){
      const li=document.createElement('li');
      li.textContent=(i===0?'✅ ':'⬜ ')+s;
      el.appendChild(li);
    });
  }
  window.HMLecon1ValidationChecklist={render:render};
})();
