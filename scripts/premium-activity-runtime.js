'use strict';
(() => {
  const $ = (s, r=document) => [...r.querySelectorAll(s)];
  const speak = (text) => {
    if (!text || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'fr-FR'; u.rate = .86; u.pitch = 1;
    window.speechSynthesis.speak(u);
  };
  function upgradeVocabulary() {
    $('.word, .vcard').forEach(card => {
      const fr = card.querySelector('.fr, .word-fr, [lang="fr"]');
      const pic = card.querySelector('.pic, .visual, .word-image');
      if (!fr || !pic || card.dataset.hmPremiumVocab) return;
      card.dataset.hmPremiumVocab = '1';
      const word = fr.textContent.trim();
      pic.setAttribute('role','button'); pic.setAttribute('tabindex','0');
      pic.setAttribute('aria-label', `Écouter ${word}`);
      pic.title = 'اضغط للاستماع';
      const play = () => speak(word);
      pic.addEventListener('click', play);
      pic.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' '){e.preventDefault();play();} });
    });
  }
  function upgradeExamples() {
    $('.example, .rule-example').forEach(el => {
      if (el.dataset.hmPremiumExample) return;
      const strong = el.querySelector('b,strong');
      const text = (strong ? strong.textContent : el.textContent).trim();
      if (!text || !/[À-ÿ]/.test(text)) return;
      el.dataset.hmPremiumExample = '1';
      const b = document.createElement('button');
      b.type='button'; b.className='hm-example-audio'; b.textContent='🔊 استمع إلى الجملة';
      b.addEventListener('click', e => { e.stopPropagation(); speak(text); });
      el.appendChild(b);
    });
  }
  function improveInstructions() {
    $('.tokens, .word-bank').forEach(bank => {
      if (bank.dataset.hmPremiumInstruction) return;
      bank.dataset.hmPremiumInstruction='1';
      const hint=document.createElement('div'); hint.className='hm-interaction-hint';
      hint.textContent='كوّن الجملة بنفسك ثم تحقق من إجابتك.';
      bank.parentNode.insertBefore(hint, bank);
    });
    $('.options').forEach(group => {
      if (group.dataset.hmPremiumInstruction) return;
      group.dataset.hmPremiumInstruction='1';
      const q=group.closest('.exercise,.q');
      if(q && !q.querySelector('.hm-choice-hint')){
        const hint=document.createElement('div'); hint.className='hm-choice-hint';
        hint.textContent='اقرأ السؤال أولًا، ثم اختر إجابة واحدة.';
        q.insertBefore(hint, group);
      }
    });
  }
  function improveGameCards() {
    $('.game-card, .game, [data-game]').forEach(card => {
      if(card.dataset.hmPremiumGame) return;
      card.dataset.hmPremiumGame='1';
      const title=card.querySelector('h2,h3,strong');
      if(title && !card.querySelector('.hm-game-purpose')){
        const p=document.createElement('p'); p.className='hm-game-purpose';
        p.textContent='تحدٍّ قصير يختبر ما تعلمته من الدرس بطريقة تفاعلية.';
        title.insertAdjacentElement('afterend',p);
      }
    });
  }
  function injectStyle(){
    if(document.getElementById('hm-premium-activity-style')) return;
    const s=document.createElement('style'); s.id='hm-premium-activity-style';
    s.textContent='.hm-example-audio{display:block;margin:9px 0 0;border:0;border-radius:11px;padding:8px 12px;background:#edf3ff;color:#214f9d;font-weight:900;cursor:pointer}.hm-example-audio:hover{transform:translateY(-1px)}.hm-interaction-hint,.hm-choice-hint{margin:8px 0;padding:9px 12px;border-radius:12px;background:#f7f9fd;color:#536078;font-size:12px;font-weight:800}.hm-game-purpose{margin:6px 0;color:#647189;font-size:13px;line-height:1.7}.word .pic,.vcard .pic,.visual{cursor:pointer}.word .pic:focus-visible,.vcard .pic:focus-visible,.visual:focus-visible{outline:3px solid #2563eb;outline-offset:3px}';
    document.head.appendChild(s);
  }
  function run(){injectStyle();upgradeVocabulary();upgradeExamples();improveInstructions();improveGameCards();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true}); else run();
  new MutationObserver(run).observe(document.body,{childList:true,subtree:true});
})();
