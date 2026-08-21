/* Lesson 2 vocabulary runtime: render/voice helpers for the Premium vocabulary cards. */
(function(){'use strict';
 const map=window.HMGrade5L02AudioMap||{};
 window.HMGrade5L02Vocab={
  asset(slug){return `data/lessons/grade-5/assets/vocab/${slug}.svg`;},
  speak(slug,example){const t=example?(map.examples||{})[slug]:map[slug];if(!t||!('speechSynthesis' in window))return false;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='fr-FR';u.rate=.88;window.speechSynthesis.speak(u);return true;}
 };
})();
