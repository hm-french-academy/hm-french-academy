// HM Academy Lesson Hub i18n bindings
(function(){
  function bind(){
    const map={
      'الرئيسية':'home',
      'الطالب':'student',
      'المسارات':'courses',
      'الصف الثاني الإعدادي':'grade8',
      'الوحدة الأولى: في المدرسة':'unit1',
      'الدرس الأول':'lesson1',
      'المكتبة':'library',
      'الإعدادات':'settings',
      'الملف التفاعلي':'interactive',
      'الملف المرجعي':'reference',
      'ملف التقييم':'assessment',
      'الاختبار التفاعلي':'assessment',
      'الألعاب التعليمية':'games',
      'ابدأ الملف التفاعلي':'lessonStart',
      'فتح الملف التفاعلي':'openInteractive',
      'فتح الملف المرجعي':'openReference',
      'فتح ملف التقييم':'openAssessment',
      'ابدأ الاختبار التفاعلي':'startAssessment',
      'فتح مركز الألعاب':'openGames',
      'فيديو الدرس':'video',
      'تقدم الدرس: لم يبدأ بعد':'progress'
    };
    document.querySelectorAll('a,h1,h2,h3,p,span,strong,div').forEach(el=>{
      const text=el.childNodes.length===1 ? el.textContent.trim() : '';
      if(text && map[text]) el.dataset.i18n=map[text];
    });
    if(window.HMLanguage) window.HMLanguage.apply(window.HMLanguage.get());
  }
  document.addEventListener('DOMContentLoaded',bind);
})();
