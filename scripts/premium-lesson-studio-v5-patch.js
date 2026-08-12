'use strict';
(() => {
  const id = new URLSearchParams(location.search).get('id') || 'grade8-u1-l1';
  const labels = {
    'grade8-u1-l1':['المدرسة والفصل','أدوات الدراسة'], 'grade8-u1-l2':['أدوات الكتابة','المقلمة والحقيبة'],
    'grade8-u1-l3':['المواد الدراسية','الأنشطة والفنون'], 'grade8-u1-l4':['المهن','أشخاص ومهن'],
    'grade8-u2-l1':['غرف المنزل','أثاث غرفة النوم'], 'grade8-u2-l2':['أثاث غرفة المعيشة','أدوات المنزل'],
    'grade8-u2-l3':['أماكن المنزل','أشياء في المنزل'], 'grade8-u2-l4':['المكان','الملكية'],
    'grade8-u3-l1':['وسائل النقل','الأماكن'], 'grade8-u3-l2':['أشخاص وأدوات السفر','مراحل الرحلة'],
    'grade8-u3-l3':['أفعال السفر','أسماء الإشارة'], 'grade8-u3-l4':['المدن والدول','تعبيرات المكان']
  };
  const fix=()=>{
    const bar=document.getElementById('bar'), state=document.getElementById('missionState');
    try{const d=window.HMProgress?.get?.()||{};const acts=(d.completedActivities||[]).filter(x=>String(x).startsWith(id+':')).length;const done=(d.completedLessons||[]).includes(id);if(bar)bar.style.width=Math.min(100,Math.round(acts/6*80)+(done?20:0))+'%';if(state&&!done)state.textContent=`أنجزت ${acts} نشاطًا داخل المسار. تقدّمك يُحفظ تلقائيًا على هذا الجهاز.`;}catch(e){}
    const h=document.querySelectorAll('#games .bucket5 h4'); const l=labels[id]||['المجموعة الأولى','المجموعة الثانية']; if(h[0])h[0].textContent=l[0];if(h[1])h[1].textContent=l[1];
  };
  let n=0;const run=()=>{fix();if(n++<20)setTimeout(run,300)};run();window.addEventListener('hm:progress-updated',fix);
})();
