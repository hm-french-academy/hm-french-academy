/* Lesson 2 runtime loader: only activate on g5-t1-l02. */
(function(){'use strict';
 const p=new URLSearchParams(location.search); if(p.get('id')!=='g5-t1-l02') return;
 const scripts=['data/lessons/grade-5/lesson2-overrides-v2.js','data/lessons/grade-5/lesson2-game-runtime-v2.js'];
 scripts.forEach(src=>{const s=document.createElement('script');s.src=src;document.head.appendChild(s);});
})();
