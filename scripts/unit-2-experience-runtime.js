(function(){'use strict';
/* HM Academy — Unit 2 premium experience bridge. Source-aligned: never invents media. */
const MAP={
 'grade8-u2-l1':{games:'data/lessons/grade-8/unit-2/lesson-1-games.html',interactive:'data/lessons/grade-8/unit-2/lesson-1-interactive.html',assessment:'data/lessons/grade-8/unit-2/formal_assessment_lecon1_unite2.html',exam:'data/lessons/grade-8/unit-2/examen_u2-l1.html'},
 'grade8-u2-l2':{games:'data/lessons/grade-8/unit-2/lesson-2-games.html',assessment:'data/lessons/grade-8/unit-2/formal_assessment_lecon2_unite2.html',exam:'data/lessons/grade-8/unit-2/examen_u2-l2.html'},
 'grade8-u2-l3':{games:'data/lessons/grade-8/unit-2/lesson-3-games.html',assessment:'data/lessons/grade-8/unit-2/formal_assessment_lecon3_unite2.html',exam:'data/lessons/grade-8/unit-2/examen_u2-l3.html'},
 'grade8-u2-l4':{games:'data/lessons/grade-8/unit-2/lesson-4-games.html',assessment:'data/lessons/grade-8/unit-2/formal_assessment_lecon4_unite2.html',exam:'data/lessons/grade-8/unit-2/examen_u2-l4.html'}
};
function id(){return new URLSearchParams(location.search).get('id')}
function inject(){const cfg=MAP[id()],viewer=document.querySelector('#viewer');if(!cfg||!viewer||viewer.dataset.u2Bridge)return;viewer.dataset.u2Bridge='1';
 const existing=new Set([...viewer.querySelectorAll('a')].map(a=>a.getAttribute('href')));
 const wrap=document.createElement('section');wrap.className='u2-premium-resources';wrap.style.cssText='padding:18px;margin:14px 0;border:1px solid #dfe6f0;border-radius:20px;background:#f8faff';
 wrap.innerHTML='<h3 style="margin:0 0 10px">🎯 Practice & Assessment</h3><p style="color:#68758b;margin:0 0 12px">استكمل الدرس بالتدريب التفاعلي والألعاب والتقييم الرسمي والاختبار.</p><div style="display:flex;gap:8px;flex-wrap:wrap"></div>';
 const box=wrap.querySelector('div');[['🎮 الألعاب',cfg.games],['📝 التقييم الرسمي',cfg.assessment],['🏆 الاختبار',cfg.exam],['✨ الشرح التفاعلي',cfg.interactive]].forEach(([label,href])=>{if(!href||existing.has(href))return;const a=document.createElement('a');a.href=href;a.className='btn';a.textContent=label;a.style.textDecoration='none';box.appendChild(a)});
 viewer.appendChild(wrap);
}
function boot(){inject();window.addEventListener('hm:lesson-rendered',inject);const viewer=document.querySelector('#viewer');if(viewer)new MutationObserver(inject).observe(viewer,{childList:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
