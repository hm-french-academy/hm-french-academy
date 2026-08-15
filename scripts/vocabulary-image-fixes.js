/* HM Academy — Unit 1 vocabulary visual accuracy layer
 * Purpose: keep every vocabulary card visually aligned with its exact French word.
 * This is intentionally data-driven and resilient to lesson re-renders.
 */
(function () {
  'use strict';

  const FIX = {
    // Lesson 1 — school facilities
    'Une cantine': ['🍽️', 'مقصف المدرسة'],
    'Une cour': ['🏫', 'فناء المدرسة'],
    'Des classes (une)': ['🏫', 'فصول المدرسة'],
    'Un gymnase': ['🤸', 'صالة الألعاب الرياضية'],
    'Un CDI': ['🖥️', 'مركز الوسائط'],
    'Un laboratoire': ['🧪', 'معمل العلوم'],
    'Un terrain de sport': ['⚽', 'ملعب الرياضة'],
    'Un self-service': ['🍴', 'قاعة الطعام بالمدرسة'],
    'Une piscine': ['🏊', 'حمام السباحة'],
    'Une bibliothèque': ['📚', 'مكتبة المدرسة'],
    'Des élèves': ['🧑‍🎓', 'تلاميذ'],
    'Des professeurs': ['👨‍🏫', 'مدرسون'],
    'Un drapeau': ['🚩', 'علم'],
    'Un jardin': ['🌳', 'حديقة المدرسة'],

    // Lesson 1 — classroom
    'Un bureau': ['🪑', 'مكتب'],
    'Un tableau': ['⬛', 'سبورة'],
    'Une porte': ['🚪', 'باب'],
    'Une fenêtre': ['🪟', 'نافذة'],
    'Des bancs / Un banc': ['💺', 'مقعد / مقاعد'],
    'Un panneau': ['🪧', 'لوحة إرشادية'],
    'Un TNI': ['🖥️', 'سبورة تفاعلية'],
    'Une horloge': ['🕐', 'ساعة حائط'],
    'Une chaise': ['🪑', 'كرسي'],
    'Une table': ['🛋️', 'منضدة'],
    'Le globe terrestre': ['🌍', 'كرة أرضية'],
    'Un ordinateur': ['💻', 'كمبيوتر'],
    'Un squelette': ['🦴', 'هيكل عظمي'],
    'Une carte': ['🗺️', 'خريطة'],
    'Une corbeille à papier': ['🗑️', 'سلة مهملات'],
    'Un dictionnaire': ['📖', 'قاموس'],

    // Lesson 2 — school supplies
    'Un stylo': ['🖊️', 'قلم جاف'],
    'Un stylo (des stylos)': ['🖊️', 'قلم جاف / أقلام جافة'],
    'Un crayon': ['✏️', 'قلم رصاص'],
    'Un crayon (des crayons)': ['✏️', 'قلم رصاص / أقلام رصاص'],
    'Une gomme': ['🧽', 'ممحاة'],
    'Une règle': ['📏', 'مسطرة'],
    'Un livre': ['📘', 'كتاب'],
    'Des livres': ['📚', 'كتب'],
    'Un cahier': ['📓', 'كراسة'],
    'Des cahiers': ['📓', 'كراسات'],
    'Un taille-crayon': ['🔪', 'براية'],
    'Un tube de colle': ['🧴', 'أنبوبة لاصق'],
    'Un surligneur': ['🖍️', 'قلم تحديد'],
    'Un feutre': ['🖊️', 'قلم فلوماستر'],
    'Une feuille de papier': ['📄', 'ورقة'],
    'Un dossier': ['📁', 'دوسيه'],
    'Une trousse': ['🧰', 'مقلمة'],
    'Des ciseaux': ['✂️', 'مقص'],
    'Des crayons de couleur': ['🖍️', 'أقلام ألوان'],
    'Un correcteur liquide': ['🧴', 'مزيل سائل'],
    'Une calculatrice': ['🧮', 'آلة حاسبة'],
    'Un sac à dos': ['🎒', 'شنطة ظهر'],

    // Lesson 3 — school subjects
    'Le français': ['🇫🇷', 'اللغة الفرنسية'],
    "L'anglais": ['🇬🇧', 'اللغة الإنجليزية'],
    'Les mathématiques': ['➗', 'الرياضيات'],
    "L'arabe": ['ع', 'اللغة العربية'],
    'Le dessin': ['🎨', 'الرسم'],
    'Les sciences': ['🔬', 'العلوم'],
    "L'histoire": ['🏛️', 'التاريخ'],
    'La géographie': ['🗺️', 'الجغرافيا'],
    'La musique': ['🎵', 'الموسيقى'],
    'La gymnastique': ['🤸', 'التربية البدنية'],
    'La technologie': ['💻', 'التكنولوجيا'],

    // Lesson 4 — professions
    'Un mécanicien': ['👨‍🔧', 'ميكانيكي'],
    'Une mécanicienne': ['👩‍🔧', 'ميكانيكية'],
    'Un pharmacien': ['👨‍⚕️', 'صيدلي'],
    'Une pharmacienne': ['👩‍⚕️', 'صيدلانية'],
    'Un cuisinier': ['👨‍🍳', 'طباخ'],
    'Une cuisinière': ['👩‍🍳', 'طباخة'],
    'Un infirmier': ['👨‍⚕️', 'ممرض'],
    'Une infirmière': ['👩‍⚕️', 'ممرضة'],
    'Un policier': ['👮', 'شرطي'],
    'Une policière': ['👮‍♀️', 'شرطية'],
    'Un boulanger': ['👨‍🍳', 'خباز'],
    'Une boulangère': ['👩‍🍳', 'خبازة'],
    'Un vendeur': ['🧑‍💼', 'بائع'],
    'Une vendeuse': ['👩‍💼', 'بائعة'],
    'Un coiffeur': ['💇', 'حلاق'],
    'Une coiffeuse': ['💇‍♀️', 'حلاقة'],
    'Un acteur': ['🎭', 'ممثل'],
    'Une actrice': ['🎭', 'ممثلة']
  };

  function isUnit1Lesson() {
    const id = new URLSearchParams(location.search).get('id') || '';
    return /^grade8-u1-l[1-4]$/.test(id) || location.pathname.endsWith('/lesson.html');
  }

  function apply(root) {
    if (!isUnit1Lesson()) return;
    const scope = root || document;
    scope.querySelectorAll('#viewer .card').forEach(function (card) {
      const wordEl = card.querySelector('.fr');
      const pic = card.querySelector('.pic');
      if (!wordEl || !pic) return;

      const word = wordEl.textContent.trim();
      const hit = FIX[word];
      if (!hit) return;

      const expected = hit[0] + '|' + hit[1];
      if (pic.dataset.hmVocabFixed === expected) return;

      pic.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;height:100%">'
        + '<span style="font-size:58px;line-height:1">' + hit[0] + '</span>'
        + '<small style="font-size:11px;color:#68758b">' + hit[1] + '</small>'
        + '</div>';
      pic.dataset.hmVocabFixed = expected;
    });
  }

  function schedule() {
    clearTimeout(schedule.timer);
    schedule.timer = setTimeout(function () { apply(document); }, 20);
  }

  function hook() {
    schedule();
    const viewer = document.getElementById('viewer');
    if (viewer && !viewer.dataset.hmImageObserver) {
      const observer = new MutationObserver(schedule);
      observer.observe(viewer, { childList: true, subtree: true });
      viewer.dataset.hmImageObserver = '1';
    }
  }

  function loadDedicatedVideoTab() {
    if (!isUnit1Lesson() || document.querySelector('script[data-hm-video-tab-loader]')) return;
    const s = document.createElement('script');
    s.src = 'scripts/lesson-video-tab.js?v=20260816-video-tab1';
    s.async = false;
    s.setAttribute('data-hm-video-tab-loader', '1');
    document.body.appendChild(s);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { hook(); loadDedicatedVideoTab(); }, { once: true });
  } else {
    hook();
    loadDedicatedVideoTab();
  }

  window.HMVocabularyImageFixes = { apply: apply };
})();
