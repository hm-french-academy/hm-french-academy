/* HM Academy — platform i18n bridge v3
 * Lightweight fallback for dynamic UI. Debounced; never scans the whole DOM continuously.
 */
(function(){
'use strict';
let timer=0;
function run(){
  timer=0;
  const lang=window.HMLanguage?.get?.()||'ar';
  if(!window.HMTranslate||!document.body)return;
  const skip='.lesson-content,.lesson-body,[data-lesson-content],.lesson-vocab,.lesson-reference,.lesson-assessment,.vocabulary-content,[data-no-i18n]';
  const root=document.body, walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT), nodes=[];let n;
  while((n=walker.nextNode())){if(!n.parentElement?.closest(skip))nodes.push(n);}
  nodes.forEach(t=>{const source=t.__hmI18nOriginal ?? (t.__hmPlatformOriginal ?? (t.__hmPlatformOriginal=t.nodeValue));if(source&&source.trim())t.nodeValue=lang==='ar'?source:window.HMTranslate(source);});
  root.querySelectorAll('[title],[placeholder],[aria-label]').forEach(el=>{if(el.closest(skip))return;['title','placeholder','aria-label'].forEach(a=>{if(!el.hasAttribute(a))return;const i18nKey='hmI18nOriginal_'+a.replace(/[^a-z]/gi,'_'),platformKey='hmPlatformOriginal_'+a,source=el.dataset[i18nKey] ?? (el.dataset[platformKey] ?? (el.dataset[platformKey]=el.getAttribute(a)));el.setAttribute(a,lang==='ar'?source:window.HMTranslate(source));});});
}
function schedule(){if(timer)return;timer=setTimeout(run,120);}
window.addEventListener('hm:languagechange',run);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else schedule();
new MutationObserver(mutations=>{if(mutations.some(m=>m.type==='childList'&&m.addedNodes.length))schedule();}).observe(document.documentElement,{subtree:true,childList:true});
})();
