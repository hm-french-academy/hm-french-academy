/* HM Academy — Unified multilingual runtime v4.5 — stable language codes */
(function(){'use strict';
const supported=['ar','fr','en'],keys=['hm-language','hm_display_language'];
const protectedSelector='.lesson-content,.lesson-body,[data-lesson-content],.lesson-vocab,.lesson-reference,.lesson-assessment,.vocabulary-content,[data-no-i18n]';
const skipTags=new Set(['SCRIPT','STYLE','NOSCRIPT','TEMPLATE','TEXTAREA']);
const labelMap={ar:['ar','العربية','Arabe','Arabic'],fr:['fr','Français','French'],en:['en','English','Anglais']};
let lang='ar',dict={ar:{},fr:{},en:{}},loaded=false;
const fallback={fr:{'العربية':'Arabe','الفرنسية':'Français','الإنجليزية':'Anglais'},en:{'العربية':'Arabic','الفرنسية':'French','الإنجليزية':'English'}};
function normalizeLang(v){const s=String(v??'').trim();for(const code of supported)if(labelMap[code].includes(s))return code;return null;}
function readStored(){try{for(const k of keys){const v=normalizeLang(localStorage.getItem(k));if(v)return v;}}catch(e){}return 'ar';}
lang=readStored();
const norm=v=>String(v??'').replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim();
function tr(v,t=lang){const raw=String(v??'');if(t==='ar'||!raw)return raw;const d=Object.assign({},fallback[t]||{},dict[t]||{}),k=norm(raw);if(d[k])return d[k];let o=raw;Object.keys(d).filter(k=>k.length>1).sort((a,b)=>b.length-a.length).forEach(k=>{if(o.includes(k))o=o.split(k).join(d[k]);});return o;}
function isLanguageSelect(s){if(!s||s.tagName!=='SELECT')return false;if(s.matches('[data-lang-select],[data-hms="language"],select[data-language-select]'))return true;const vals=[...s.options].map(o=>norm(o.value||o.textContent));const hasAr=vals.some(v=>labelMap.ar.includes(v)),hasFr=vals.some(v=>labelMap.fr.includes(v)),hasEn=vals.some(v=>labelMap.en.includes(v));return hasAr&&hasFr&&hasEn;}
function prepareLanguageSelectors(){document.querySelectorAll('select').forEach(s=>{if(!isLanguageSelect(s))return;s.setAttribute('data-lang-select','');s.setAttribute('data-no-i18n','');[...s.options].forEach(o=>{const code=normalizeLang(o.value)||normalizeLang(o.textContent);if(code)o.value=code;});s.value=lang;});}
function keyFor(n){const p=n?.parentElement;if(!p)return null;return p.getAttribute('data-i18n')||n.getAttribute?.('data-i18n')||null;}
function keyTranslate(key,t){if(!key||t==='ar')return null;const d=Object.assign({},fallback[t]||{},dict[t]||{});return d[key]||null;}
function text(n,t){if(n?.nodeType!==3)return;const p=n.parentElement;if(!p||skipTags.has(p.tagName)||p.closest(protectedSelector)||isLanguageSelect(p.closest('select')))return;if(n.__hmOrig===undefined)n.__hmOrig=n.nodeValue;const s=n.__hmOrig;if(!s?.trim())return;const byKey=keyTranslate(keyFor(n),t);n.nodeValue=t==='ar'?s:(byKey||tr(s,t));}
function attr(e,t){for(const a of ['title','placeholder','aria-label','aria-description'])if(e.hasAttribute(a)){const k='hmOrig'+a;if(e.dataset[k]===undefined)e.dataset[k]=e.getAttribute(a);const s=e.dataset[k];const byKey=keyTranslate(e.getAttribute('data-i18n'),t);e.setAttribute(a,t==='ar'?s:(byKey||tr(s,t)));}}
function scan(root,t){const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),a=[];let n;while((n=w.nextNode()))a.push(n);for(const x of a)text(x,t);root.querySelectorAll?.('[title],[placeholder],[aria-label],[aria-description]').forEach(e=>{if(!isLanguageSelect(e))attr(e,t)});}
async function load(){try{const q='?v=20260820-i18n45',g=p=>fetch(p+q,{cache:'no-store'}).then(r=>r.ok?r.json():{});const [u,f,e]=await Promise.all([g('data/i18n/ui.json'),g('data/i18n/fr.json'),g('data/i18n/en.json')]);dict={ar:u.ar||{},fr:Object.assign({},u.fr||{},f||{}),en:Object.assign({},u.en||{},e||{})};loaded=true;}catch(e){}}
async function apply(t){const next=normalizeLang(t)||'ar';lang=next;try{keys.forEach(k=>localStorage.setItem(k,lang));}catch(e){}document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';prepareLanguageSelectors();if(!loaded)await load();if(document.body)scan(document.body,lang);prepareLanguageSelectors();document.querySelectorAll('[data-lang-select],[data-hms="language"]').forEach(s=>s.value=lang);window.dispatchEvent(new CustomEvent('hm:languagechange',{detail:{lang}}));window.dispatchEvent(new CustomEvent('hm:language-changed',{detail:{lang}}));}
window.HMLanguage={get:()=>lang,apply,translate:tr,dict};window.HMSetLanguage=apply;window.HMTranslate=v=>tr(v,lang);
let pending=false;const observer=new MutationObserver(ms=>{if(pending||!ms.some(m=>m.type==='childList'&&m.addedNodes.length))return;pending=true;setTimeout(()=>{pending=false;prepareLanguageSelectors();const l=lang;for(const m of ms)for(const n of m.addedNodes){if(n.nodeType===3)text(n,l);else if(n.nodeType===1&&!n.closest(protectedSelector))scan(n,l);}},160);});
function mount(){prepareLanguageSelectors();observer.observe(document.documentElement,{subtree:true,childList:true});document.querySelectorAll('[data-lang-select],[data-hms="language"]').forEach(s=>{if(!s.dataset.hmBound){s.dataset.hmBound='1';s.addEventListener('change',()=>apply(s.value));}});apply(lang);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
