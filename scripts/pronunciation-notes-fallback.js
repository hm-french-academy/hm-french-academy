(function(){'use strict';
/* HM Academy — pronunciation notes fallback
   Purpose: guarantee a real Arabic pronunciation note for every vocabulary item
   in Grade 8 / Unit 2 Lessons 1–2 when the source notes are missing or still
   showing the generic "Listen carefully..." placeholder. Speech remains online
   browser speech; this file contains notes only. */

const NOTES={
 'grade8-u2-l1':{
  'la maison':'ai في maison تُنطق /ɛ/ تقريبًا؛ و s النهائية لا تُنطق.',
  'la chambre':'ch تُنطق /ʃ/ مثل «ش»؛ و e الأخيرة لا تُنطق.',
  'la porte':'o تُنطق /ɔ/ تقريبًا؛ و e الأخيرة لا تُنطق.',
  'la fenêtre':'ê تُنطق /ɛ/؛ و e الأخيرة لا تُنطق.',
  'le lit':'i تُنطق /i/؛ و t النهائية تُنطق في lit.',
  "l'armoire":'oi في armoire تُنطق /wa/ تقريبًا؛ و e الأخيرة لا تُنطق.',
  'un oreiller':'oi في oreiller تُنطق /wa/ تقريبًا؛ و ill تُنطق /j/ تقريبًا.',
  'un bureau':'eau تُنطق /o/؛ لذلك bureau تنتهي بصوت /o/.',
  'une chaise':'ch تُنطق /ʃ/ مثل «ش»؛ و e الأخيرة لا تُنطق.',
  'une table':'a واضحة؛ و e الأخيرة لا تُنطق.',
  'une table de chevet':'ch في chevet تُنطق /ʃ/؛ و e النهائية لا تُنطق.',
  'un abat-jour':'j في jour تُنطق /ʒ/؛ و ou في jour تُنطق /u/.',
  'un tapis':'s النهائية في tapis لا تُنطق؛ و a في المقطع الأول واضحة.',
  'un matelas':'e النهائية لا تُنطق؛ و s النهائية تُنطق /s/.',
  'un réveil':'é تُنطق /e/؛ و eil في النهاية تُنطق تقريبًا /ɛj/.',
  'un tableau':'eau تُنطق /o/؛ لذلك tableau تنتهي بصوت /o/.',
  'un miroir':'oi تُنطق /wa/ تقريبًا؛ و r الأخيرة فرنسية /ʁ/.',
  'un lustre':'u تُنطق /y/؛ و e الأخيرة لا تُنطق.',
  'un rideau':'eau تُنطق /o/؛ لذلك rideau ينتهي بصوت /o/.',
  'le salon':'s بين حركتين تُنطق /z/؛ و on في النهاية صوت أنفي /ɔ̃/.',
  'la cuisine':'ui تُنطق تقريبًا /ɥi/؛ و s بين حركتين تُنطق /z/.',
  'la salle de bains':'s في salle تُنطق /s/؛ و ain في bains صوت أنفي /ɛ̃/؛ و s الأخيرة لا تُنطق.'
 },
 'grade8-u2-l2':{
  'le salon':'s بين حركتين تُنطق /z/؛ و on في النهاية صوت أنفي /ɔ̃/.',
  'la cuisine':'ui تُنطق تقريبًا /ɥi/؛ و s بين حركتين تُنطق /z/.',
  'la salle de bains':'s في salle تُنطق /s/؛ و ain في bains صوت أنفي /ɛ̃/؛ و s الأخيرة لا تُنطق.',
  'le canapé':'é في النهاية تُنطق /e/؛ و c في canapé تُنطق /k/.',
  'le fauteuil':'eu في fauteuil صوت أمامي /œ/ تقريبًا؛ و il في النهاية تُنطق /j/ تقريبًا.',
  'un tapis':'s النهائية في tapis لا تُنطق؛ و a في المقطع الأول واضحة.',
  'la table':'a واضحة؛ و e الأخيرة لا تُنطق.',
  "un évier":'é في البداية تُنطق /e/؛ و ier في النهاية تُنطق تقريبًا /je/.',
  'un réfrigérateur':'é في réfrigérateur تُنطق /e/؛ و g قبل é تُنطق /ʒ/؛ و eur في النهاية صوت /œʁ/ تقريبًا.',
  'la douche':'ch تُنطق /ʃ/ مثل «ش»؛ و e الأخيرة لا تُنطق.',
  'la télévision':'é في البداية تُنطق /e/؛ و s بين حركتين تُنطق /z/؛ و on في النهاية صوت أنفي /ɔ̃/.'
 }
};

function norm(s){return String(s||'').trim().toLowerCase().replace(/[’`]/g,"'").replace(/\s+/g,' ');}
function lessonId(){const id=new URLSearchParams(location.search).get('id')||'';return id;}
function findNote(word,id){const map=NOTES[id]||{};const n=norm(word);for(const k of Object.keys(map)){if(norm(k)===n)return map[k];}return null;}
function isPlaceholder(text){const n=norm(text);return !n||/listen carefully|repeat the word|استمع.*كرر|استمع بعناية|pronunciation note|لا توجد ملاحظة|لا توجد ملاحظة نطق/.test(n);}
function patch(){
 const id=lessonId(),map=NOTES[id];if(!map)return;
 document.querySelectorAll('.pronRow').forEach(row=>{
   const w=row.querySelector('.pronWord');if(!w)return;
   const note=findNote(w.textContent,id);if(!note)return;
   let box=row.querySelector('.pronNote');
   if(!box){box=document.createElement('div');box.className='pronNote';row.appendChild(box);}
   if(isPlaceholder(box.textContent))box.textContent=note;
 });
}
let queued=false;function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;patch();});}
new MutationObserver(schedule).observe(document.body,{subtree:true,childList:true});
document.addEventListener('DOMContentLoaded',schedule);window.addEventListener('load',schedule);schedule();
})();
