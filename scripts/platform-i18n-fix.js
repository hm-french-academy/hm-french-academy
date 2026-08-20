/* HM Academy — platform i18n bridge v2
 * Safety net for dynamic UI rendered after the main i18n runtime.
 */
(function(){
'use strict';
function run(){
  const lang=window.HMLanguage?.get?.()||'ar';
  if(!window.HMTranslate||!document.body)return;
  const skip='.lesson-content,.lesson-body,[data-lesson-content],.lesson-vocab,.lesson-reference,.lesson-assessment,.vocabulary-content,[data-no-i18n]';
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),nodes=[];let n;
  while((n=walker.nextNode()))nodes.push(n);
  nodes.forEach(t=>{
    if(t.parentElement?.closest(skip))return;
    const source=t.__hmI18nOriginal ?? (t.__hmPlatformOriginal ?? (t.__hmPlatformOriginal=t.nodeValue));
    if(source&&source.trim())t.nodeValue=lang==='ar'?source:window.HMTranslate(source);
  });
  document.body.querySelectorAll('[title],[placeholder],[aria-label]').forEach(el=>{
    if(el.closest(skip))return;
    ['title','placeholder','aria-label'].forEach(a=>{
      if(!el.hasAttribute(a))return;
      const k='hmPlatformOriginal_'+a;
      if(el.dataset[k]===undefined)el.dataset[k]=el.getAttribute(a);
      const source=el.dataset[k];
      el.setAttribute(a,lang==='ar'?source:window.HMTranslate(source));
    });
  });
}
window.addEventListener('hm:languagechange',run);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
new MutationObserver(run).observe(document.documentElement,{subtree:true,childList:true,characterData:true});
})();
