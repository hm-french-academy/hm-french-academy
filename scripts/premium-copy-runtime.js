'use strict';
(() => {
  const COPY = new Map([
    ['افتح التجربة الكاملة','شاهد وتعلّم'],
    ['افتح المرجع','افتح المرجع'],
    ['ابدأ التقييم','اختبر نفسك'],
    ['ابدأ التحدي','تحدَّ نفسك'],
    ['ادخل مركز الألعاب','تحدَّ نفسك'],
    ['تدرّب على النطق','تدرّب على النطق'],
    ['ابدأ التجربة','ابدأ التعلم'],
    ['ملف كامل','المادة التعليمية الكاملة'],
    ['ملف الدرس','المادة التعليمية'],
    ['اضغط','اختر'],
    ['اضغط هنا','اختر الآن'],
    ['مثال','مثال قابل للاستماع'],
    ['استمع للمثال','استمع إلى الجملة'],
    ['استمع للمحادثة','استمع إلى الحوار كاملًا'],
    ['الحوار الكامل','استمع إلى الحوار كاملًا'],
    ['القاعدة','اكتشف القاعدة'],
    ['ترتيب الجملة','كوّن جملتك'],
    ['لعبة تصنيف كلمات الدرس','صنّف الكلمات'],
    ['التقاط الكلمات','اصطد الكلمة الصحيحة'],
    ['تحدي المفردات','تحدي المفردات من الصورة'],
    ['ابدأ اللعبة','ابدأ التحدي'],
    ['التالي','خطوتك التالية →'],
    ['السابق','← الخطوة السابقة']
  ]);

  function replaceText(root = document.body) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      let t = node.nodeValue;
      COPY.forEach((to, from) => { if (t.includes(from)) t = t.split(from).join(to); });
      if (t !== node.nodeValue) node.nodeValue = t;
    });
  }

  function improveInstructions() {
    document.querySelectorAll('.q').forEach((q) => {
      const text = q.textContent || '';
      if (text.includes('Qu’est-ce qu’il y a sur le bureau')) {
        const p = q.querySelector('p');
        if (p) p.textContent = 'Regarde la scène, puis choisis la réponse qui correspond exactement à ce que tu vois.';
        q.classList.add('has-image');
      }
    });
    document.querySelectorAll('.tokens button').forEach(btn => {
      btn.setAttribute('aria-label', `أضف ${btn.textContent.trim()} إلى الجملة`);
    });
    document.querySelectorAll('.visual').forEach((el) => {
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', 'استمع إلى الكلمة والجملة');
      el.title = 'استمع إلى الكلمة والجملة';
    });
  }

  function premiumExamples() {
    document.querySelectorAll('.example, .rule-example').forEach((el) => {
      if (el.dataset.premiumReady) return;
      const text = el.textContent.trim();
      if (!text) return;
      el.dataset.premiumReady = '1';
      el.setAttribute('role','button');
      el.setAttribute('tabindex','0');
      el.title = 'اضغط للاستماع إلى الجملة';
      el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') el.click(); });
    });
  }

  function run() {
    replaceText();
    improveInstructions();
    premiumExamples();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, {once:true});
  else run();
  new MutationObserver(() => run()).observe(document.body, {subtree:true, childList:true});
})();
