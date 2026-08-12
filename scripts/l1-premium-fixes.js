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
    try {
      const lessonId = new URLSearchParams(location.search).get('id') || 'grade8-u1-l1';
      if (window.HMProgress?.startLesson) HMProgress.startLesson(lessonId);
    } catch(e){}
    const q = root.querySelector('.q.has-image .desk-question');
    if (q) q.innerHTML = '<img src="assets/lessons/grade8-u1-l1/desk-question.svg" alt="مكتب عليه كراسة وآلة حاسبة">';

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

    // Give the video area an unmistakable visual identity instead of a generic empty media block.
    root.querySelectorAll('.card').forEach(card => {
      const text = (card.textContent || '').trim();
      if (!/الفيديو|vidéo|video/i.test(text) || card.querySelector('.video-identity')) return;
      const visual = document.createElement('div');
      visual.className = 'video-identity';
      visual.innerHTML = '<div class="video-identity-art">🎬</div><div><strong>مشهد الفصل · À l’école</strong><span>فيديو الدرس: شاهد الموقف، استمع إلى الحوار، ثم عد إلى المفردات والتطبيق.</span></div>';
      card.insertBefore(visual, card.firstChild);
    });
  };
  const style = document.createElement('style');
  style.textContent = `.premium-v4 .example-speak{display:block;margin:8px auto 0;border:0;border-radius:10px;padding:8px 11px;background:#edf3ff;color:#2458ad;font-weight:900;cursor:pointer}.premium-v4 .example-speak:hover{transform:translateY(-1px)}.premium-v4 .resource-kicker{display:inline-block;padding:6px 9px;border-radius:99px;background:#f0f4fa;color:#52627b;font-size:11px;font-weight:900;margin-bottom:10px}.premium-v4 .resource-action{transition:.16s}.premium-v4 .resource-action:hover{transform:translateY(-2px);filter:brightness(1.03)}.premium-v4 .video-identity{display:grid;grid-template-columns:100px 1fr;gap:15px;align-items:center;padding:12px;margin-bottom:16px;border-radius:19px;background:linear-gradient(135deg,#eef5ff,#fff2f7);border:1px solid #dfe7f2}.premium-v4 .video-identity-art{height:82px;border-radius:16px;background:linear-gradient(145deg,#173a82,#2563eb);display:grid;place-items:center;color:#fff;font-size:43px;box-shadow:0 12px 25px #173a8220}.premium-v4 .video-identity strong{display:block;color:#173a82;font-size:19px}.premium-v4 .video-identity span{display:block;color:#68758b;line-height:1.7;font-size:13px;margin-top:4px}@media(max-width:600px){.premium-v4 .video-identity{grid-template-columns:70px 1fr}.premium-v4 .video-identity-art{height:70px;font-size:34px}}`;
  document.head.appendChild(style);
  apply();
})();