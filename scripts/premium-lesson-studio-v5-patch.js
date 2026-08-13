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

  const getProgress = () => {
    try { return window.HMProgress?.get?.() || {}; } catch (e) { return {}; }
  };

  const fix = () => {
    const bar = document.getElementById('bar');
    const state = document.getElementById('missionState');
    const d = getProgress();
    const activities = Array.isArray(d.completedActivities)
      ? d.completedActivities.filter(x => String(x).startsWith(id + ':'))
      : [];
    const done = Array.isArray(d.completedLessons) && d.completedLessons.includes(id);
    const pct = Math.min(100, Math.round(activities.length / 6 * 80) + (done ? 20 : 0));

    if (bar) {
      bar.style.width = pct + '%';
      bar.setAttribute('aria-valuenow', String(pct));
      bar.setAttribute('aria-valuemin', '0');
      bar.setAttribute('aria-valuemax', '100');
    }
    if (state) {
      state.textContent = done
        ? '🎉 الدرس مكتمل. تم حفظ تقدمك بنجاح.'
        : `أنجزت ${activities.length} نشاطًا داخل المسار. تقدّمك يُحفظ تلقائيًا على هذا الجهاز.`;
    }

    const headings = document.querySelectorAll('#games .bucket5 h4');
    const pair = labels[id] || ['المجموعة الأولى','المجموعة الثانية'];
    if (headings[0]) headings[0].textContent = pair[0];
    if (headings[1]) headings[1].textContent = pair[1];
  };

  const init = () => {
    fix();
    document.querySelectorAll('button').forEach(btn => {
      if (!btn.getAttribute('aria-label') && btn.textContent.trim()) btn.setAttribute('aria-label', btn.textContent.trim());
    });
    window.addEventListener('hm:progress-updated', fix);
    window.addEventListener('hm:lesson-completed', fix);
  };

  let n = 0;
  const run = () => {
    fix();
    if (n++ < 20) setTimeout(run, 300);
  };
  run();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
