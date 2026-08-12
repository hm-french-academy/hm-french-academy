'use strict';
(() => {
  const speak = (text) => {
    if (!('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'fr-FR';
    u.rate = 0.86;
    window.speechSynthesis.speak(u);
  };
  const apply = () => {
    const root = document.querySelector('#app.premium-v4');
    if (!root) return setTimeout(apply, 80);

    // Persist that the learner actually opened/tried this lesson.
    try {
      const lessonId = new URLSearchParams(location.search).get('id') || 'grade8-u1-l1';
      if (window.HMProgress?.startLesson) HMProgress.startLesson(lessonId);
    } catch(e){}

    // Final visual fix for the assessment image.
    const q = root.querySelector('.q.has-image .desk-question');
    if (q) q.innerHTML = '<img src="assets/lessons/grade8-u1-l1/desk-question.svg" alt="مكتب عليه كراسة وآلة حاسبة">';

    // Examples become fully audio-enabled like the vocabulary cards.
    const ar = ['لدي قلمًا جافًا.','أكتب بقلم رصاص.','لدي ممحاة.','المسطرة على الطاولة.','لدي أنبوبة لاصق.','البراية داخل المقلمة.','الكراسة على المكتب.','الكتاب داخل الحقيبة.','الكتاب داخل حقيبة الظهر.','الآلة الحاسبة على المكتب.','المقص داخل المقلمة.','المقلمة داخل حقيبة الظهر.'];
    root.querySelectorAll('.vcard .example').forEach((el,i) => {
      const small = el.querySelector('small');
      if (small) small.textContent = ar[i] || '';
      const french = (el.childNodes[0]?.textContent || '').trim();
      if (french && !el.querySelector('.example-speak')) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'example-speak';
        b.textContent = '🔊 استمع إلى المثال';
        b.addEventListener('click', e => { e.stopPropagation(); speak(french); });
        el.appendChild(b);
      }
    });

    // Resource cards get premium, action-oriented labels instead of generic CTAs.
    const labels = ['افتح الدرس','افتح المرجع','ابدأ التقييم','ابدأ التحدي','ادخل الألعاب','ابدأ تدريب النطق'];
    root.querySelectorAll('.resources .resource-grid article').forEach((card,i) => {
      const action = card.querySelector('a,button');
      if (action && labels[i]) action.textContent = labels[i];
      if (action) action.classList.add('resource-action');
      if (!card.querySelector('.resource-kicker')) {
        const kicker = document.createElement('div');
        kicker.className = 'resource-kicker';
        kicker.textContent = i===0 ? 'المسار الأساسي' : i===1 ? 'مراجعة' : i===2 ? 'قياس الإتقان' : i===3 ? 'تدريب تفاعلي' : i===4 ? 'تعلّم باللعب' : 'صوت ونطق';
        card.insertBefore(kicker, card.firstChild);
      }
    });
  };
  const style = document.createElement('style');
  style.textContent = `.premium-v4 .example-speak{display:block;margin:8px auto 0;border:0;border-radius:10px;padding:8px 11px;background:#edf3ff;color:#2458ad;font-weight:900;cursor:pointer}.premium-v4 .example-speak:hover{transform:translateY(-1px)}.premium-v4 .resource-kicker{display:inline-block;padding:6px 9px;border-radius:99px;background:#f0f4fa;color:#52627b;font-size:11px;font-weight:900;margin-bottom:10px}.premium-v4 .resource-action{transition:.16s}.premium-v4 .resource-action:hover{transform:translateY(-2px);filter:brightness(1.03)}`;
  document.head.appendChild(style);
  apply();
})();