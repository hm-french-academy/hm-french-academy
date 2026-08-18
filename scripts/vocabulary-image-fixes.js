/* HM Academy — Vocabulary image renderer v3
 * Unit 1 legacy emoji support + Unit 3 real local illustration support.
 */
(function () {
  'use strict';

  const UNIT1 = {
    'Une cantine':['🍽️','مقصف المدرسة'],'Une cour':['🏫','فناء المدرسة'],'Des classes (une)':['🏫','فصول المدرسة'],'Un gymnase':['🤸','صالة الألعاب الرياضية'],'Un CDI':['🖥️','مركز الوسائط'],'Un laboratoire':['🧪','معمل العلوم'],'Un terrain de sport':['⚽','ملعب الرياضة'],'Un self-service':['🍴','قاعة الطعام بالمدرسة'],'Une piscine':['🏊','حمام السباحة'],'Une bibliothèque':['📚','مكتبة المدرسة'],'Des élèves':['🧑‍🎓','تلاميذ'],'Des professeurs':['👨‍🏫','مدرسون'],'Un drapeau':['🚩','علم'],'Un jardin':['🌳','حديقة المدرسة'],
    'Un bureau':['🪑','مكتب'],'Un tableau':['⬛','سبورة'],'Une porte':['🚪','باب'],'Une fenêtre':['🪟','نافذة'],'Des bancs / Un banc':['💺','مقعد / مقاعد'],'Un panneau':['🪧','لوحة إرشادية'],'Un TNI':['🖥️','سبورة تفاعلية'],'Une horloge':['🕐','ساعة حائط'],'Une chaise':['🪑','كرسي'],'Une table':['🛋️','منضدة'],'Le globe terrestre':['🌍','كرة أرضية'],'Un ordinateur':['💻','كمبيوتر'],'Un squelette':['🦴','هيكل عظمي'],'Une carte':['🗺️','خريطة'],'Une corbeille à papier':['🗑️','سلة مهملات'],'Un dictionnaire':['📖','قاموس'],
    'Un stylo':['🖊️','قلم جاف'],'Un crayon':['✏️','قلم رصاص'],'Une gomme':['🧽','ممحاة'],'Une règle':['📏','مسطرة'],'Un livre':['📘','كتاب'],'Des livres':['📚','كتب'],'Un cahier':['📓','كراسة'],'Des cahiers':['📓','كراسات'],'Un taille-crayon':['🔪','براية'],'Un tube de colle':['🧴','أنبوبة لاصق'],'Un surligneur':['🖍️','قلم تحديد'],'Un feutre':['🖊️','قلم فلوماستر'],'Une feuille de papier':['📄','ورقة'],'Un dossier':['📁','دوسيه'],'Une trousse':['🧰','مقلمة'],'Des ciseaux':['✂️','مقص'],'Des crayons de couleur':['🖍️','أقلام ألوان'],'Un correcteur liquide':['🧴','مزيل سائل'],'Une calculatrice':['🧮','آلة حاسبة'],'Un sac à dos':['🎒','شنطة ظهر'],
    'Le français':['🇫🇷','اللغة الفرنسية'],"L'anglais":['🇬🇧','اللغة الإنجليزية'],'Les mathématiques':['➗','الرياضيات'],"L'arabe":['ع','اللغة العربية'],'Le dessin':['🎨','الرسم'],'Les sciences':['🔬','العلوم'],"L'histoire":['🏛️','التاريخ'],'La géographie':['🗺️','الجغرافيا'],'La musique':['🎵','الموسيقى'],'La gymnastique':['🤸','التربية البدنية'],'La technologie':['💻','التكنولوجيا']
  };

  const UNIT3 = {
    'un passager':['assets/vocabulary/unit3/passenger.svg','راكب'],
    'une passagère':['assets/vocabulary/unit3/passenger-female.svg','راكبة'],
    'un guichetier':['assets/vocabulary/unit3/ticket-clerk.svg','موظف الشباك'],
    'un billet':['assets/vocabulary/unit3/train-ticket.svg','تذكرة قطار أو طائرة'],
    'un ticket':['assets/vocabulary/unit3/transit-ticket.svg','تذكرة مترو أو أوتوبيس'],
    'une valise':['assets/vocabulary/unit3/suitcase.svg','حقيبة سفر'],
    'des horaires':['assets/vocabulary/unit3/travel-schedule.svg','مواعيد الرحلات'],
    'un touriste':['assets/vocabulary/unit3/tourist-male.svg','سائح'],
    'une touriste':['assets/vocabulary/unit3/tourist-female.svg','سائحة'],
    'un pharmacien':['assets/vocabulary/unit3/pharmacist.svg','صيدلي'],
    'un passeport':['assets/vocabulary/unit3/passport.svg','جواز سفر']
  };

  function lessonId(){ return new URLSearchParams(location.search).get('id') || ''; }
  function isUnit3(){ return /^grade8-u3-l\d+$/.test(lessonId()); }
  function isUnit1(){ return /^grade8-u1-l[1-4]$/.test(lessonId()); }

  function apply(root){
    const scope=root||document;
    scope.querySelectorAll('#viewer .card').forEach(function(card){
      const wordEl=card.querySelector('.fr');
      const pic=card.querySelector('.pic');
      if(!wordEl||!pic) return;
      const word=wordEl.textContent.trim();

      if(isUnit3()){
        const hit=UNIT3[word];
        if(!hit) return;
        const src=hit[0];
        if(pic.dataset.hmVocabSrc===src) return;
        pic.innerHTML='';
        const img=document.createElement('img');
        img.src=src;
        img.alt=hit[1]+' — '+word;
        img.loading='eager';
        img.decoding='async';
        img.onerror=function(){
          pic.textContent='';
          const fallback=document.createElement('span');
          fallback.textContent='صورة المفردة';
          fallback.style.cssText='font-size:14px;color:#68758b;font-weight:800';
          pic.appendChild(fallback);
        };
        img.style.cssText='display:block;width:100%;height:100%;min-height:220px;object-fit:contain;border-radius:18px';
        pic.appendChild(img);
        pic.dataset.hmVocabSrc=src;
        return;
      }

      if(!isUnit1()) return;
      const hit=UNIT1[word];
      if(!hit) return;
      const expected=hit[0]+'|'+hit[1];
      if(pic.dataset.hmVocabFixed===expected) return;
      pic.innerHTML='<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;height:100%"><span style="font-size:58px;line-height:1">'+hit[0]+'</span><small style="font-size:11px;color:#68758b">'+hit[1]+'</small></div>';
      pic.dataset.hmVocabFixed=expected;
    });
  }

  function schedule(){ clearTimeout(schedule.timer); schedule.timer=setTimeout(function(){apply(document)},30); }
  function hook(){
    schedule();
    const viewer=document.getElementById('viewer');
    if(viewer&&!viewer.dataset.hmImageObserver){
      new MutationObserver(schedule).observe(viewer,{childList:true,subtree:true});
      viewer.dataset.hmImageObserver='1';
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',hook,{once:true}); else hook();
  window.HMVocabularyImageFixes={apply:apply};
})();
