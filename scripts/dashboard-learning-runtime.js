// HM Academy dashboard learning runtime
(function(){
  const mapKey='hm_learning_map';
  function read(){try{return JSON.parse(localStorage.getItem(mapKey)||'{}')}catch{return {}}}
  function lessonStats(id){const x=read()[id]||{};const keys=Object.keys(x);return {completed:keys.filter(k=>x[k]?.completed).length,activities:keys};}
  function label(id){
    const m=String(id||'').match(/^grade8-u(\d+)-l(\d+)$/);
    if(!m)return 'نشاط تعليمي';
    return 'الصف الثاني الإعدادي · الوحدة '+m[1]+' · الدرس '+m[2];
  }
  function render(target,lessonIds){
    const el=typeof target==='string'?document.querySelector(target):target;if(!el)return;
    const ids=(lessonIds||Object.keys(read())).filter(id=>/^grade8-u[1-3]-l[1-4]$/.test(id));
    el.innerHTML=ids.map(id=>{const s=lessonStats(id);return `<div class="hm-learning-item"><strong>${label(id)}</strong><span>${s.completed} نشاط مكتمل</span></div>`}).join('')||'<div>لا يوجد تقدم مسجل بعد.</div>';
  }
  window.HMDashboardLearning={read,lessonStats,render};
})();