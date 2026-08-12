'use strict';
(() => {
  // Runtime copy enhancements are limited to static shell text only.
  // Dynamic lesson content comes from Supabase JSONB and must not be mutated here.
  const COPY = new Map([
    ['افتح التجربة الكاملة','شاهد وتعلّم'],
    ['ابدأ التقييم','اختبر نفسك'],
    ['ابدأ التحدي','تحدَّ نفسك'],
    ['ابدأ التجربة','ابدأ التعلم']
  ]);

  function replaceShellText(root = document.body) {
    const app = document.querySelector('#app');
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) {
      if (app && app.contains(walker.currentNode)) continue;
      nodes.push(walker.currentNode);
    }
    nodes.forEach(node => {
      let t = node.nodeValue;
      COPY.forEach((to, from) => { if (t.includes(from)) t = t.split(from).join(to); });
      if (t !== node.nodeValue) node.nodeValue = t;
    });
  }

  function run(){
    replaceShellText();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, {once:true});
  else run();
})();
