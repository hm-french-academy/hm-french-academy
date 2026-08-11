(function(){
function apply(){
 const lang=(window.HMLanguage&&HMLanguage.get())||localStorage.getItem('hm_language')||'ar';
 document.documentElement.lang=lang;
 document.documentElement.dir=lang==='ar'?'rtl':'ltr';
 const t={
 ar:{'المفردات':'المفردات','في الفصل':'في الفصل','القواعد الداعمة':'القواعد الداعمة','الوسائط':'الوسائط','الملف التفاعلي':'الملف التفاعلي','الملف المرجعي':'الملف المرجعي','ملف التقييم':'ملف التقييم','الاختبار التفاعلي':'الاختبار التفاعلي','الألعاب التعليمية':'الألعاب التعليمية','فيديو الدرس':'فيديو الدرس'},
 fr:{'المفردات':'Vocabulaire','في الفصل':'En classe','القواعد الداعمة':'Grammaire complémentaire','الوسائط':'Médias','الملف التفاعلي':'Leçon interactive','الملف المرجعي':'Document de référence','ملف التقييم':'Évaluation','الاختبار التفاعلي':'Test interactif','الألعاب التعليمية':'Jeux éducatifs','فيديو الدرس':'Vidéo de la leçon'},
 en:{'المفردات':'Vocabulary','في الفصل':'In class','القواعد الداعمة':'Supporting Grammar','الوسائط':'Media','الملف التفاعلي':'Interactive Lesson','الملف المرجعي':'Reference Document','ملف التقييم':'Assessment','الاختبار التفاعلي':'Interactive Test','الألعاب التعليمية':'Educational Games','فيديو الدرس':'Lesson Video'}
 };
 document.querySelectorAll('h1,h2,h3,a,strong,p,span').forEach(e=>{let s=e.textContent.trim();if(t[lang]&&t[lang][s])e.textContent=t[lang][s];});
}
document.addEventListener('DOMContentLoaded',apply);
window.addEventListener('hm:languagechange',apply);
})();