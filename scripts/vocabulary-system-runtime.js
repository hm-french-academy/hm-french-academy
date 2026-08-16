(function(){'use strict';
/* HM Academy — Universal Vocabulary System enhancement.
 * Keeps the lesson runtime as the source of truth and upgrades every shared
 * vocabulary card to: image + French word + Arabic meaning + example + example pronunciation.
 */
const SELECTOR='.grid .card';
const textOf=el=>(el?.textContent||'').trim();
function speak(text,button){
  if(!text)return;
  if(window.HMSpeech?.speak){window.HMSpeech.speak(text,{button,lang:'fr-FR',rate:.82});return;}
  if('speechSynthesis' in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='fr-FR';u.rate=.82;speechSynthesis.speak(u);}
}
function enhance(root=document){
  const viewer=root.querySelector?.('#viewer')||root;
  const cards=[...viewer.querySelectorAll(SELECTOR)];
  if(!cards.length)return;
  cards.forEach(card=>{
    const fr=card.querySelector('.fr');
    const example=card.querySelector('.example');
    if(!fr||!example)return;
    card.dataset.hmVocabulary='1';
    if(!example.querySelector('[data-example-speak]')){
      const row=document.createElement('div');
      row.className='hm-example-audio';
      row.style.cssText='display:flex;align-items:center;gap:8px;margin-top:8px;direction:rtl';
      const b=document.createElement('button');
      b.type='button';b.dataset.exampleSpeak='1';b.className='audio';
      b.textContent='🔊';b.title='استمع إلى نطق المثال الفرنسي';b.setAttribute('aria-label','استمع إلى نطق المثال الفرنسي');
      b.addEventListener('click',()=>speak(textOf(example),b));
      const label=document.createElement('span');
      label.className='small';label.textContent='نطق المثال';
      row.append(b,label);example.appendChild(row);
    }
  });
}
function boot(){
  enhance();
  const viewer=document.querySelector('#viewer');
  if(viewer){new MutationObserver(()=>enhance(document)).observe(viewer,{childList:true,subtree:true});}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
