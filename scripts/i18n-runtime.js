// HM Academy i18n Runtime
(function(){
  const supported=['ar','fr','en'];
  const saved=localStorage.getItem('hm-language') || 'ar';
  window.HMLanguage=supported.includes(saved)?saved:'ar';

  async function loadLanguage(lang=window.HMLanguage){
    const path=`data/i18n/${lang}.json`;
    const res=await fetch(path,{cache:'no-store'});
    if(!res.ok) throw new Error('Language file unavailable');
    const data=await res.json();
    document.documentElement.lang=lang;
    document.documentElement.dir=lang==='ar'?'rtl':'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key=el.dataset.i18n;
      if(data[key]) el.textContent=data[key];
    });
    return data;
  }

  window.HMSetLanguage=async function(lang){
    if(!supported.includes(lang)) return;
    localStorage.setItem('hm-language',lang);
    window.HMLanguage=lang;
    await loadLanguage(lang);
  };

  document.addEventListener('DOMContentLoaded',()=>loadLanguage().catch(()=>{}));
})();
