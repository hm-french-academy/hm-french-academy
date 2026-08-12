'use strict';
(() => {
  const speak = (text) => { if (!('speechSynthesis' in window) || !text) return; window.speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = 'fr-FR'; u.rate = 0.86; window.speechSynthesis.speak(u); };
  const loadPremiumCopy = () => { if(document.querySelector('script[data-premium-copy]'))return; const s=document.createElement('script');s.src='scripts/premium-copy-runtime.js?v=20260812-copy1';s.dataset.premiumCopy='1';document.body.appendChild(s); };
  const applyLegacyPolish = () => { const root=document.querySelector('#app.premium-v4'); if(!root)return false; try{const lessonId=new URLSearchParams(location.search).get('id')||'grade8-u1-l1';if(window.HMProgress?.startLesson)HMProgress.startLesson(lessonId);}catch(e){} const q=root.querySelector('.q.has-image .desk-question');if(q)q.innerHTML='<img src="assets/lessons/grade8-u1-l1/desk-question.svg" alt="مكتب عليه كراسة وآلة حاسبة">';loadPremiumCopy();return true; };
  const load=(src,attr)=>{if(document.querySelector(`script[${attr}]`))return;const s=document.createElement('script');s.src=src;s.setAttribute(attr,'1');document.body.appendChild(s);};
  const boot=()=>{load('scripts/premium-lesson-studio-v5.js?v=20260812-v5','data-premium-v5');setTimeout(()=>load('scripts/premium-lesson-studio-v5-patch.js?v=20260812-patch1','data-premium-v5-patch'),250);};
  let tries=0;const wait=()=>{if(applyLegacyPolish()||tries++>8)setTimeout(boot,120);else setTimeout(wait,80)};wait();
})();
