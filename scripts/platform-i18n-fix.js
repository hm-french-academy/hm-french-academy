/* HM Academy — platform i18n bridge v4
 * Performance-first bridge: translates only initial UI once and newly-added UI nodes.
 */
(function(){
'use strict';
let timer=0,booted=false;
const skip='.lesson-content,.lesson-body,[data-lesson-content],.lesson-vocab,.lesson-reference,.lesson-assessment,.vocabulary-content,[data-no-i18n]';
function translateNode(node,lang){
  if(!node||node.nodeType!==Node.ELEMENT_NODE)return;
  if(node.matches(skip)||node.closest(skip))return;
  const walker=document.createTreeWalker(node,NodeFilter.SHOW_TEXT);let n;
  while((n=walker.nextNode())){
    const p=n.parentElement;if(!p||p.closest(skip))continue;
    const source=n.__hmPlatformOriginal ?? (n.__hmI18nOriginal ?? (n.__hmPlatformOriginal=n.nodeValue));
    if(source&&source.trim())n.nodeValue=lang==='ar'?source:(window.HMTranslate?.(source)||source);
  }
  node.querySelectorAll('[title],[placeholder],[aria-label]').forEach(el=>{
    if(el.closest(skip))return;
    ['title','placeholder','aria-label'].forEach(a=>{
      if(!el.hasAttribute(a))return;
      const k='hmPlatformOriginal_'+a;
      if(el.dataset[k]===undefined)el.dataset[k]=el.getAttribute(a);
      const source=el.dataset[k];el.setAttribute(a,lang==='ar'?source:(window.HMTranslate?.(source)||source));
    });
  });
}
function run(){timer=0;if(!document.body)return;const lang=window.HMLanguage?.get?.()||document.documentElement.lang||'ar';if(!booted){booted=true;translateNode(document.body,lang);return;}}
function schedule(){if(timer)return;timer=setTimeout(run,180);}
window.addEventListener('hm:languagechange',()=>{booted=false;schedule();});
window.addEventListener('hm:language-changed',()=>{booted=false;schedule();});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
new MutationObserver(mutations=>{
  if(timer)return;
  const added=[];for(const m of mutations)for(const n of m.addedNodes)if(n.nodeType===Node.ELEMENT_NODE)added.push(n);
  if(!added.length)return;
  timer=setTimeout(()=>{timer=0;const lang=window.HMLanguage?.get?.()||document.documentElement.lang||'ar';for(const n of added)translateNode(n,lang);},180);
}).observe(document.documentElement,{subtree:true,childList:true});
})();
