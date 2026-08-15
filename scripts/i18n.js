(function(){
  'use strict';

  const dict={
    ar:{
      home:'الرئيسية',student:'الطالب',courses:'المسارات',grade8:'الصف الثاني الإعدادي',library:'المكتبة',settings:'الإعدادات',language:'لغة العرض',arabic:'العربية',french:'Français',english:'English',
      tagline:'منصة تعليم الفرنسية بذكاء ومتعة',homeTitle:'تعلّم الفرنسية بطريقة أذكى',homeSub:'منصة تعليمية متكاملة تجمع المناهج المدرسية ومسارات اللغة الدولية والتعلّم التفاعلي.',
      studentArea:'منطقة الطالب',schoolCurriculum:'المناهج الدراسية',schoolDesc:'محتوى منظم حسب المرحلة والوحدة والدرس مع ملفات تفاعلية وتقييمات.',languageTracks:'مستويات اللغة',languageDesc:'مسارات دولية مستقلة تُبنى تدريجيًا وفق أهداف تعلم اللغة.',
      libraryTitle:'المكتبة التعليمية',libraryDesc:'مراجع ومواد قابلة للتنظيم والتحميل والاستخدام داخل رحلة التعلم.',assessment:'التقييم والاختبارات',assessmentDesc:'اختبارات مرتبطة بالدروس مع نتائج وتقدم يمكن تتبعهما.',
      start:'ابدأ التعلم',open:'فتح',explore:'استكشف',continue:'متابعة',discoverCurriculum:'اكتشف المناهج',exploreLevels:'مستويات اللغة',footer:'HM Academy © 2026',interactive:'الملف التفاعلي',reference:'الملف المرجعي',games:'الألعاب التعليمية',lessonStart:'ابدأ الملف التفاعلي',video:'فيديو الدرس',progress:'تقدم الدرس'
    },
    fr:{
      home:'Accueil',student:'Élève',courses:'Parcours',grade8:'2e année préparatoire',library:'Bibliothèque',settings:'Paramètres',language:"Langue d’affichage",arabic:'العربية',french:'Français',english:'English',
      tagline:"Plateforme d’apprentissage du français, intelligente et motivante",homeTitle:'Apprenez le français plus intelligemment',homeSub:'Une plateforme complète réunissant les programmes scolaires, les parcours internationaux et l’apprentissage interactif.',
      studentArea:'Espace élève',schoolCurriculum:'Programmes scolaires',schoolDesc:'Contenu organisé par niveau, unité et leçon avec activités interactives et évaluations.',languageTracks:'Parcours de langue',languageDesc:'Parcours internationaux indépendants construits progressivement selon des objectifs linguistiques.',
      libraryTitle:'Bibliothèque pédagogique',libraryDesc:'Références et ressources organisables, téléchargeables et utilisables pendant l’apprentissage.',assessment:'Évaluations et tests',assessmentDesc:'Tests liés aux leçons avec résultats et progression suivis.',
      start:'Commencer',open:'Ouvrir',explore:'Explorer',continue:'Continuer',discoverCurriculum:'Découvrir les programmes',exploreLevels:'Parcours de langue',footer:'HM Academy © 2026',interactive:'Leçon interactive',reference:'Document de référence',games:'Activités et jeux',lessonStart:'Commencer la leçon interactive',video:'Vidéo de la leçon',progress:'Progression de la leçon'
    },
    en:{
      home:'Home',student:'Student',courses:'Learning Paths',grade8:'Grade 8',library:'Library',settings:'Settings',language:'Display language',arabic:'العربية',french:'Français',english:'English',
      tagline:'A smarter, more engaging French learning platform',homeTitle:'Learn French the smarter way',homeSub:'An integrated learning platform combining school curricula, international language pathways, and interactive learning.',
      studentArea:'Student Area',schoolCurriculum:'School Curricula',schoolDesc:'Organized content by level, unit, and lesson with interactive activities and assessments.',languageTracks:'Language Pathways',languageDesc:'Independent international pathways built progressively around language-learning goals.',
      libraryTitle:'Learning Library',libraryDesc:'Organized, downloadable references and resources for the learning journey.',assessment:'Assessment & Tests',assessmentDesc:'Lesson-linked tests with results and progress tracking.',
      start:'Start Learning',open:'Open',explore:'Explore',continue:'Continue',discoverCurriculum:'Discover curricula',exploreLevels:'Language pathways',footer:'HM Academy © 2026',interactive:'Interactive Lesson',reference:'Reference File',games:'Educational Games',lessonStart:'Start Interactive Lesson',video:'Lesson Video',progress:'Lesson Progress'
    }
  };

  const ui={
    'الرئيسية':{fr:'Accueil',en:'Home'},'الطالب':{fr:'Élève',en:'Student'},'المناهج الدراسية':{fr:'Programmes scolaires',en:'School Curricula'},'المناهج':{fr:'Programmes',en:'Curricula'},'المسارات':{fr:'Parcours',en:'Learning Paths'},'مستويات اللغة':{fr:'Parcours de langue',en:'Language Pathways'},'المكتبة':{fr:'Bibliothèque',en:'Library'},'الإعدادات':{fr:'Paramètres',en:'Settings'},'خريطة المنصة':{fr:'Carte de la plateforme',en:'Platform Map'},'قاموس HM':{fr:'Dictionnaire HM',en:'HM Dictionary'},'التقييم':{fr:'Évaluation',en:'Assessment'},'ملفي':{fr:'Mon profil',en:'My Profile'},'إنجازاتي':{fr:'Mes réussites',en:'My Achievements'},'تقدمي':{fr:'Ma progression',en:'My Progress'},
    'ابحث داخل HM Academy':{fr:'Rechercher dans HM Academy',en:'Search HM Academy'},'ابحث عن درس أو كلمة أو مورد بسرعة.':{fr:'Trouvez rapidement une leçon, un mot ou une ressource.',en:'Quickly find a lesson, word, or resource.'},'بحث / Rechercher':{fr:'Rechercher',en:'Search'},'فهرس المنصة':{fr:'Index de la plateforme',en:'Platform Index'},'نقطة وصول سريعة لأهم أجزاء الرحلة.':{fr:'Accès rapide aux étapes essentielles du parcours.',en:'Quick access to the key parts of the learning journey.'},
    'ابدأ من منطقة الطالب':{fr:'Commencer dans l’espace élève',en:'Start in the Student Area'},'استكشف المناهج':{fr:'Découvrir les programmes',en:'Explore curricula'},'ابدأ التعلم':{fr:'Commencer l’apprentissage',en:'Start Learning'},'فتح':{fr:'Ouvrir',en:'Open'},'استكشف':{fr:'Explorer',en:'Explore'},'متابعة':{fr:'Continuer',en:'Continue'},'افتح القاموس ←':{fr:'Ouvrir le dictionnaire ←',en:'Open Dictionary →'},'استكشف الخريطة ←':{fr:'Explorer la carte ←',en:'Explore the map →'},'تخصيص التجربة ←':{fr:'Personnaliser l’expérience ←',en:'Customize experience →'},
    'الإعدادات العامة':{fr:'Paramètres généraux',en:'General Settings'},'خصّص تجربة التعلم: المظهر، اللغة، الصوت، عرض الدرس، التدريب والتحفيز. تُحفظ اختياراتك على هذا الجهاز.':{fr:'Personnalisez l’apprentissage : apparence, langue, audio, affichage des leçons, entraînement et motivation. Les choix sont enregistrés sur cet appareil.',en:'Customize learning: appearance, language, audio, lesson display, practice, and motivation. Your choices are saved on this device.'},'حفظ الإعدادات':{fr:'Enregistrer les paramètres',en:'Save Settings'},'استعادة الافتراضي':{fr:'Restaurer les valeurs par défaut',en:'Restore Defaults'},'تصدير':{fr:'Exporter',en:'Export'},'استيراد':{fr:'Importer',en:'Import'},
    'المظهر':{fr:'Apparence',en:'Appearance'},'اللغة':{fr:'Langue',en:'Language'},'لغة الواجهة':{fr:"Langue de l’interface",en:'Interface language'},'الصوت والنطق':{fr:'Audio et prononciation',en:'Audio & Pronunciation'},'عرض الدرس':{fr:'Affichage de la leçon',en:'Lesson Display'},'الألعاب والتدريب':{fr:'Jeux et entraînement',en:'Games & Practice'},'التحفيز':{fr:'Motivation',en:'Motivation'},'الوضع':{fr:'Mode',en:'Mode'},'تقليل الحركة':{fr:'Réduire les animations',en:'Reduce motion'},'تفعيل النطق':{fr:'Activer la prononciation',en:'Enable pronunciation'},'سرعة النطق':{fr:'Vitesse de prononciation',en:'Speech rate'},'تشغيل المثال تلقائيًا':{fr:'Lire automatiquement l’exemple',en:'Auto-play example'},'إظهار الأمثلة':{fr:'Afficher les exemples',en:'Show examples'},'إظهار الترجمة العربية':{fr:'Afficher la traduction arabe',en:'Show Arabic translation'},'فتح آخر قسم زاره الطالب':{fr:'Ouvrir la dernière section visitée',en:'Open the last visited section'},'الصعوبة':{fr:'Difficulté',en:'Difficulty'},'إظهار التلميحات':{fr:'Afficher les indices',en:'Show hints'},'رسالة اليوم':{fr:'Message du jour',en:'Daily Message'},'كبسولة النجاح':{fr:'Capsule de réussite',en:'Success Capsule'},'الهدف اليومي':{fr:'Objectif quotidien',en:'Daily Goal'},'تلقائي':{fr:'Automatique',en:'Automatic'},'نهاري':{fr:'Clair',en:'Light'},'ليلي':{fr:'Sombre',en:'Dark'},'بطيء':{fr:'Lent',en:'Slow'},'طبيعي':{fr:'Normal',en:'Normal'},'سريع':{fr:'Rapide',en:'Fast'},'سهل':{fr:'Facile',en:'Easy'},'متوسط':{fr:'Moyen',en:'Medium'},'متقدم':{fr:'Avancé',en:'Advanced'},
    'المكتبة التعليمية':{fr:'Bibliothèque pédagogique',en:'Learning Library'},'الكتب والمراجع':{fr:'Livres et références',en:'Books & References'},'المكتبة الصوتية':{fr:'Bibliothèque audio',en:'Audio Library'},'المكتبة المرئية':{fr:'Bibliothèque vidéo',en:'Video Library'},'الموارد المفضلة':{fr:'Ressources favorites',en:'Favorite Resources'},'البحث داخل المكتبة':{fr:'Rechercher dans la bibliothèque',en:'Search the Library'},'آخر ما تمت مشاهدته':{fr:'Dernières ressources consultées',en:'Recently Viewed'},'مصادر مرتبطة بالدرس':{fr:'Ressources liées à la leçon',en:'Lesson-linked Resources'},
    'الوحدة':{fr:'Unité',en:'Unit'},'الدرس':{fr:'Leçon',en:'Lesson'},'فتح الدرس':{fr:'Ouvrir la leçon',en:'Open Lesson'},'ملفات الدرس':{fr:'Fichiers de la leçon',en:'Lesson Files'},'الألعاب':{fr:'Jeux',en:'Games'},'مراجعة ذكية':{fr:'Révision intelligente',en:'Smart Review'},
    'كبسولة اليوم':{fr:'Capsule du jour',en:'Today’s Capsule'},'إنجازاتك':{fr:'Vos réussites',en:'Your Achievements'},'تقدمك':{fr:'Votre progression',en:'Your Progress'}
  };

  const lessonPage=/\/lesson\.html$/i.test(location.pathname);
  if(lessonPage){
    const params=new URLSearchParams(location.search),lessonMatch=(params.get('id')||'grade8-u1-l1').match(/^grade8-u(\d+)-l(\d+)$/),cache={};
    const nativeFetch=window.fetch.bind(window),key=u=>String(u||'').split('?')[0];
    function prefetch(url){if(!cache[url])cache[url]=nativeFetch(url,{cache:'force-cache'}).then(r=>{if(!r.ok)throw Error('HTTP '+r.status+' — '+url);return r.clone().json()});return cache[url]}
    prefetch('data/lessons/grade-8/lesson-registry.json').catch(()=>null);
    if(lessonMatch)prefetch(`data/lessons/grade-8/unit-${lessonMatch[1]}/lesson-${lessonMatch[2]}.json`).catch(()=>null);
    window.fetch=function(input,init){const k=key(typeof input==='string'?input:input?.url);const match=/^data\/lessons\/grade-8\/unit-\d+\/lesson-\d+\.json$/.test(k)||k==='data/lessons/grade-8/lesson-registry.json';if(match&&cache[k])return cache[k].then(data=>new Response(JSON.stringify(data),{status:200,headers:{'Content-Type':'application/json'}}));return nativeFetch(input,init)};
  }

  const saved=localStorage.getItem('hm_display_language')||'ar';
  const protectedSelector='.lesson-content,.lesson-body,[data-lesson-content],.lesson-vocab,.lesson-reference,.lesson-assessment,.vocabulary-content';
  const inProtected=el=>!!el.closest?.(protectedSelector);
  const translateExact=(el,lang)=>{
    if(inProtected(el))return;
    const original=(el.dataset.hmI18nOriginal??el.textContent).trim();
    if(!original)return;
    if(!el.dataset.hmI18nOriginal)el.dataset.hmI18nOriginal=original;
    if(lang==='ar')el.textContent=el.dataset.hmI18nOriginal;
    else if(ui[el.dataset.hmI18nOriginal]?.[lang])el.textContent=ui[el.dataset.hmI18nOriginal][lang];
  };
  function autoTranslate(lang){
    if(lang==='ar'){
      document.querySelectorAll('[data-hm-i18n-original]').forEach(el=>{el.textContent=el.dataset.hmI18nOriginal});
      return;
    }
    const roots=document.querySelectorAll('header,footer,.hm-hero,.hm-nav,.hm-tools,.hm-page > main > section:not(.lesson-content),.hm-main > .hm-hero,.home-pro > .home-section,.home-pro > .home-hero,.home-pro > .home-tools-grid,.home-pro > .home-curriculum,.home-index,.hm-footer');
    roots.forEach(root=>root.querySelectorAll('a,button,h1,h2,h3,h4,p,label,span,small,option,[role="button"]') .forEach(el=>translateExact(el,lang)));
  }
  function apply(lang){
    lang=dict[lang]?lang:'ar';
    localStorage.setItem('hm_display_language',lang);
    document.documentElement.lang=lang;
    document.documentElement.dir=lang==='ar'?'rtl':'ltr';
    document.body.dataset.language=lang;
    document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;if(dict[lang][k]!=null)el.textContent=dict[lang][k]});
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{const k=el.dataset.i18nPlaceholder;if(dict[lang][k]!=null)el.placeholder=dict[lang][k]});
    document.querySelectorAll('[data-lang-select]').forEach(s=>s.value=lang);
    autoTranslate(lang);
    document.title=document.title.replace(/^HM Academy \| .*/,'HM Academy | '+(lang==='ar'?'تعلم الفرنسية بطريقة أذكى':lang==='fr'?'Apprenez le français plus intelligemment':'Learn French the smarter way'));
    window.dispatchEvent(new CustomEvent('hm:languagechange',{detail:{lang}}));
  }
  function mount(){
    document.querySelectorAll('[data-lang-select]').forEach(s=>{if(!s.dataset.hmI18nBound){s.dataset.hmI18nBound='1';s.addEventListener('change',()=>apply(s.value))}s.value=saved});
    apply(saved);
  }
  window.HMLanguage={dict,apply,get:()=>localStorage.getItem('hm_display_language')||'ar'};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
