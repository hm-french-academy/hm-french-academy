(function(){
function applyLessonLanguage(){
 const lang=(window.HMLanguage&&HMLanguage.get())||localStorage.getItem('hm_display_language')||'ar';
 document.documentElement.lang=lang;
 document.documentElement.dir=lang==='ar'?'rtl':'ltr';
 const map={
  ar:{'الملف التفاعلي':'الملف التفاعلي','الملف المرجعي':'الملف المرجعي','ملف التقييم':'ملف التقييم','الاختبار التفاعلي':'الاختبار التفاعلي','الألعاب التعليمية':'الألعاب التعليمية','فيديو الدرس':'فيديو الدرس'},
  fr:{'الملف التفاعلي':'Leçon interactive','الملف المرجعي':'Document de référence','ملف التقييم':'Évaluation','الاختبار التفاعلي':'Test interactif','الألعاب التعليمية':'Jeux éducatifs','فيديو الدرس':'Vidéo de la leçon'},
  en:{'الملف التفاعلي':'Interactive Lesson','الملف المرجعي':'Reference Document','ملف التقييم':'Assessment','الاختبار التفاعلي':'Interactive Test','الألعاب التعليمية':'Educational Games','فيديو الدرس':'Lesson Video'}
 };
 document.querySelectorAll('h1,h2,h3,a,p,strong').forEach(e=>{const t=e.textContent.trim(); if(map[lang]&&map[lang][t]) e.textContent=map[lang][t];});
}
document.addEventListener('DOMContentLoaded',applyLessonLanguage);
window.addEventListener('hm:languagechange',applyLessonLanguage);
})();