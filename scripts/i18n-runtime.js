// HM Academy — professional multilingual runtime
(function(){
  const supported=['ar','fr','en'];
  const saved=localStorage.getItem('hm-language') || 'ar';
  window.HMLanguage=supported.includes(saved)?saved:'ar';
  let dictionary={};
  let languageData={};
  let translating=false;

  const normalize=(value)=>String(value||'').replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim();

  async function loadLanguage(lang=window.HMLanguage){
    const [langRes,uiRes]=await Promise.all([
      fetch(`data/i18n/${lang}.json`,{cache:'no-store'}),
      fetch('data/i18n/ui.json',{cache:'no-store'})
    ]);
    if(!langRes.ok) throw new Error('Language file unavailable');
    languageData=await langRes.json();
    dictionary=uiRes.ok ? ((await uiRes.json())[lang]||{}) : {};
    document.documentElement.lang=lang;
    document.documentElement.dir=lang==='ar'?'rtl':'ltr';
    translateDocument();
    return languageData;
  }

  function translateValue(value){
    if(window.HMLanguage==='ar') return value;
    const raw=String(value??'');
    const key=normalize(raw);
    if(!key) return value;
    if(languageData[key]) return languageData[key];
    if(dictionary[key]) return dictionary[key];

    // Common dynamic dashboard phrases: keep numbers and IDs intact.
    let m=key.match(/^(\d+)\s*\/\s*(\d+)\s*دروس$/);
    if(m) return `${m[1]} / ${m[2]} ${window.HMLanguage==='fr'?'leçons':'lessons'}`;
    m=key.match(/^(\d+)\s*\/\s*(\d+)\s*وحدات$/);
    if(m) return `${m[1]} / ${m[2]} ${window.HMLanguage==='fr'?'unités':'units'}`;
    m=key.match(/^(\d+)\s*يوم$/);
    if(m) return `${m[1]} ${window.HMLanguage==='fr'?'jour(s)':'day(s)'}`;
    m=key.match(/^آخر درس مكتمل:\s*(.*)$/);
    if(m) return `${window.HMLanguage==='fr'?'Dernière leçon terminée':'Last completed lesson'}: ${m[1]}`;
    m=key.match(/^آخر وحدة:\s*(.*)$/);
    if(m) return `${window.HMLanguage==='fr'?'Dernière unité':'Last unit'}: ${m[1]}`;
    m=key.match(/^الطلاقة:\s*(.*)$/);
    if(m) return `${window.HMLanguage==='fr'?'Fluidité':'Fluency'}: ${m[1]}`;
    m=key.match(/^أفضل نتيجة تدريب:\s*(.*)$/);
    if(m) return `${window.HMLanguage==='fr'?'Meilleur résultat d’entraînement':'Best practice result'}: ${m[1]}`;
    m=key.match(/^([🔒✅])\s*(مكتسبة|لم تُكتسب بعد)\s*·\s*(.*)$/);
    if(m) return `${m[1]} ${m[2]==='مكتسبة'?(window.HMLanguage==='fr'?'Acquise':'Earned'):(window.HMLanguage==='fr'?'Pas encore acquise':'Not earned yet')} · ${m[3]}`;

    // Translate page titles while preserving the HM Academy brand.
    if(key.startsWith('HM Academy | ')){
      const suffix=key.slice('HM Academy | '.length);
      const translated=translateValue(suffix);
      if(translated!==suffix) return `HM Academy | ${translated}`;
    }
    return value;
  }

  function setText(node,next){
    if(next===undefined || next===node.nodeValue) return;
    node.nodeValue=next;
  }

  function translateNode(node){
    if(!node || translating) return;
    if(node.nodeType===Node.TEXT_NODE){
      const parent=node.parentElement;
      if(!parent || parent.closest('[data-no-i18n]')) return;
      if(parent.tagName==='SCRIPT' || parent.tagName==='STYLE' || parent.tagName==='NOSCRIPT') return;
      setText(node,translateValue(node.nodeValue));
      return;
    }
    if(node.nodeType!==Node.ELEMENT_NODE) return;
    if(node.closest('[data-no-i18n]')) return;

    const key=node.dataset?.i18n;
    if(key && languageData[key]) node.textContent=languageData[key];
    else if(key && dictionary[key]) node.textContent=dictionary[key];

    ['title','placeholder','aria-label','aria-description'].forEach(attr=>{
      if(node.hasAttribute(attr)){
        const current=node.getAttribute(attr);
        const next=translateValue(current);
        if(next!==current) node.setAttribute(attr,next);
      }
    });

    node.childNodes.forEach(translateNode);
  }

  function translateDocument(){
    translating=true;
    try{ translateNode(document.documentElement); } finally { translating=false; }
  }

  const observer=new MutationObserver((mutations)=>{
    if(translating || window.HMLanguage==='ar') return;
    translating=true;
    try{
      for(const mutation of mutations){
        if(mutation.type==='childList') mutation.addedNodes.forEach(translateNode);
        if(mutation.type==='characterData') translateNode(mutation.target);
      }
    }finally{ translating=false; }
  });

  window.HMSetLanguage=async function(lang){
    if(!supported.includes(lang)) return;
    localStorage.setItem('hm-language',lang);
    window.HMLanguage=lang;
    await loadLanguage(lang);
    window.dispatchEvent(new CustomEvent('hm:language-changed',{detail:{lang}}));
  };

  window.HMTranslate=translateValue;

  document.addEventListener('DOMContentLoaded',()=>{
    observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true});
    loadLanguage().catch(()=>{});
    const selector=document.querySelector('[data-lang-select]');
    if(selector){
      selector.value=window.HMLanguage;
      selector.addEventListener('change',()=>window.HMSetLanguage(selector.value).catch(()=>{}));
    }
  });
})();
