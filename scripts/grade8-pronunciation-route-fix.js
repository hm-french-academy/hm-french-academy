// HM Academy — Grade 8 targeted pronunciation routing fix
// Only Unit 2 Lesson 1 and Unit 3 Lesson 1 use their verified standalone pronunciation pages.
(function(){'use strict';
  const p=new URLSearchParams(location.search);
  const id=p.get('id');
  const targets={
    'grade8-u2-l1':'data/lessons/grade-8/unit-2/pronunciation_challenge_lecon1_unite2.html?v=20260818-u2l1pron6',
    'grade8-u3-l1':'data/lessons/grade-8/unit-3/pronunciation_challenge_lecon1_unite3.html?v=20260818-u3l1pron6'
  };
  const target=targets[id];
  if(!target)return;
  function bind(){
    document.querySelectorAll('[data-t="pronunciation"],[data-j="pronunciation"]').forEach(function(btn){
      if(btn.dataset.hmPronRouteFix==='1')return;
      btn.dataset.hmPronRouteFix='1';
      btn.addEventListener('click',function(ev){
        ev.preventDefault();ev.stopImmediatePropagation();
        location.href=target;
      },true);
    });
  }
  bind();
  new MutationObserver(bind).observe(document.documentElement,{childList:true,subtree:true});
})();
