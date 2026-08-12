'use strict';
(() => {
  const speak = (text) => {
    if (!('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text); u.lang = 'fr-FR'; u.rate = 0.86; window.speechSynthesis.speak(u);
  };
  const loadPremiumCopy = () => {
    if (document.querySelector('script[data-premium-copy]')) return;
    const s = document.createElement('script'); s.src = 'scripts/premium-copy-runtime.js?v=20260812-copy1'; s.dataset.premiumCopy = '1'; document.body.appendChild(s);
  };
  const applyLegacyPolish = () => {
    const root = document.querySelector('#app.premium-v4');
    if (!root) return false;
    try { const lessonId = new URLSearchParams(location.search).get('id') || 'grade8-u1-l1'; if (window.HMProgress?.startLesson) HMProgress.startLesson(lessonId); } catch(e){}
    const q = root.querySelector('.q.has-image .desk-question');
    if (q) q.innerHTML = '<img src="assets/lessons/grade8-u1-l1/desk-question.svg" alt="مكتب عليه كراسة وآلة حاسبة">';
    const labels = ['شاهد وتعلّم','افتح المرجع','اختبر نفسك','تحدَّ نفسك','تحدَّ نفسك','تدرّب على النطق'];
    root.querySelectorAll('.resources .resource-grid article').forEach((card,i) => { const action=card.querySelector('a,button'); if(action&&labels[i])action.textContent=labels[i]; if(action)action.classList.add('resource-action'); });
    loadPremiumCopy(); return true;
  };
  const style = document.createElement('style'); style.textContent='.premium-v4 .resource-action{transition:.16s}.premium-v4 .resource-action:hover{transform:translateY(-2px);filter:brightness(1.03)}'; document.head.appendChild(style);
  const bootV5 = () => {
    if (document.querySelector('script[data-premium-v5]')) return;
    const s=document.createElement('script'); s.src='scripts/premium-lesson-studio-v5.js?v=20260812-v5'; s.dataset.premiumV5='1'; document.body.appendChild(s);
  };
  let tries=0; const wait=()=>{ if(applyLegacyPolish() || tries++>8) { setTimeout(bootV5,120); } else setTimeout(wait,80); }; wait();
})();
