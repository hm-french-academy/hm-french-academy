/* HM Academy — Premier Pas vocabulary enhancement
 * Scoped enhancement: activates only on preparatory-french-starter.html.
 * Does not alter curriculum data or other HM Academy pages.
 */
(function(){'use strict';
  if(location.pathname.split('/').pop()!=='preparatory-french-starter.html') return;
  const STYLE_ID='hm-premier-pas-vocab-style';
  if(document.getElementById(STYLE_ID)) return;
  const style=document.createElement('style'); style.id=STYLE_ID;
  style.textContent=`
  .hm-vocab-enhanced{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:12px}
  .hm-vocab-card{border:1px solid #dce5f2;background:#fff;border-radius:18px;overflow:hidden;text-align:center;box-shadow:0 8px 24px rgba(20,38,74,.07);transition:.18s;}
  .hm-vocab-card:hover{transform:translateY(-2px);box-shadow:0 14px 30px rgba(20,38,74,.12)}
  .hm-vocab-visual{min-height:118px;display:grid;place-items:center;background:linear-gradient(135deg,#eef5ff,#f8fbff);font-size:58px;position:relative}
  .hm-vocab-visual small{position:absolute;top:8px;right:8px;padding:4px 7px;border-radius:999px;background:#ffffffdd;color:#315aa4;font-size:9px;font-weight:900}
  .hm-vocab-body{padding:12px}.hm-vocab-body strong{display:block;font-size:20px;direction:ltr}.hm-vocab-body small{display:block;color:#66758c;margin:5px 0 10px}
  .hm-vocab-speak{border:0;border-radius:10px;padding:8px 11px;background:#2563eb;color:#fff;font:inherit;font-weight:900;cursor:pointer}
  .hm-vocab-reveal{border:0;background:#eef4ff;color:#245bd7;border-radius:10px;padding:8px 11px;margin-inline-start:5px;font:inherit;font-weight:900;cursor:pointer}
  .hm-vocab-ar.hidden{visibility:hidden;filter:blur(5px)}
  @media(max-width:850px){.hm-vocab-enhanced{grid-template-columns:repeat(2,minmax(0,1fr))}}
  @media(max-width:560px){.hm-vocab-enhanced{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.hm-vocab-visual{min-height:100px;font-size:48px}.hm-vocab-body{padding:10px}}
  `; document.head.appendChild(style);
  const visuals=[
    [/bonjour|salut|bonsoir|bienvenue/i,'👋','تحية'],[/ami|amie|garçon|fille|homme|femme|famille/i,'🧑‍🤝‍🧑','أشخاص'],
    [/école|classe|professeur|élève|livre|cahier|stylo|crayon|règle|cartable/i,'🎒','مدرسة'],[/maison|chambre|porte|fenêtre|table|chaise|lit/i,'🏠','منزل'],
    [/rouge|orange|blanc|gris|bleu|violet|jaune|vert|marron|rose|noir/i,'🎨','ألوان'],[/zéro|un|deux|trois|quatre|cinq|six|sept|huit|neuf|dix/i,'🔢','أرقام'],
    [/janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre/i,'📅','شهور'],[/lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche/i,'🗓️','أيام'],
    [/printemps|été|automne|hiver/i,'🌦️','فصول'],[/chat|chien|oiseau|poisson|animal/i,'🐾','حيوانات'],
    [/pomme|banane|orange|fraise|fruit|pain|lait|eau|café|fromage/i,'🍎','طعام'],[/soleil|pluie|neige|vent|mer|montagne/i,'🌤️','طبيعة'],
    [/heure|minute|matin|soir|aujourd|demain|hier/i,'⏰','وقت'],[/merci|pardon|au revoir|oui|non/i,'💬','تواصل']
  ];
  function visual(term){for(const r of visuals) if(r[0].test(term)) return [r[1],r[2]]; return ['🇫🇷','Français'];}
  function speak(text){if(!window.speechSynthesis)return; speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text);u.lang='fr-FR';speechSynthesis.speak(u)}
  function enhance(){
    const root=document.querySelector('.words'); if(!root||root.dataset.hmEnhanced==='1') return;
    const items=[...root.children]; if(!items.length)return;
    root.dataset.hmEnhanced='1'; root.classList.add('hm-vocab-enhanced');
    items.forEach(card=>{
      const strong=card.querySelector('strong'); if(!strong)return; const fr=strong.textContent.trim();
      const smalls=[...card.querySelectorAll('small')]; const ar=smalls[0]?.textContent.trim()||''; const vis=visual(fr);
      card.className='hm-vocab-card'; card.innerHTML=`<div class="hm-vocab-visual"><small>${vis[1]}</small><span aria-hidden="true">${vis[0]}</span></div><div class="hm-vocab-body"><strong>${fr}</strong><small class="hm-vocab-ar">${ar}</small><button class="hm-vocab-speak" type="button">🔊 استمع</button><button class="hm-vocab-reveal" type="button">إخفاء المعنى</button></div>`;
      card.querySelector('.hm-vocab-speak').addEventListener('click',()=>speak(fr));
      const meaning=card.querySelector('.hm-vocab-ar'), reveal=card.querySelector('.hm-vocab-reveal');
      reveal.addEventListener('click',()=>{const hidden=meaning.classList.toggle('hidden');reveal.textContent=hidden?'إظهار المعنى':'إخفاء المعنى'});
    });
  }
  const obs=new MutationObserver(enhance); obs.observe(document.body,{childList:true,subtree:true});
  enhance();
})();
