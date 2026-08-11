// HM Academy Lesson Hub i18n bindings
(function(){
  function bind(){
    const map={
      'الرئيسية':'home',
      'الطالب':'student',
      'المسارات':'courses',
      'الصف الثاني الإعدادي':'grade8',
      'المكتبة':'library',
      'الإعدادات':'settings',
      'الملف التفاعلي':'interactive',
      'الملف المرجعي':'reference',
      'الألعاب التعليمية':'games',
      'ابدأ الملف التفاعلي':'lessonStart',
      'تقدم الدرس: لم يبدأ بعد':'progress'
    };
    document.querySelectorAll('a,h1,h2,p,span,strong,div').forEach(el=>{
      const t=el.childNodes.length===1 && el.textContent.trim();
      if(t && map[t]) el.dataset.i18n=map[t];
    });
    if(window.HMLanguage) window.HMLanguage.apply(window.HMLanguage.get());
  }
  document.addEventListener('DOMContentLoaded',bind);
})();
