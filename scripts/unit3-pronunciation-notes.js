(function(){
  'use strict';
  /* HM Academy — Unit 3 pronunciation notes completion.
     Ensures every vocabulary item in Unit 3 Lessons 1–2 has a useful, student-facing note. */
  const NOTES = {
    'grade8-u3-l1': {
      'le bus':'u تُنطق /y/ تقريبًا مثل «يُ» مع تدوير الشفتين؛ و s النهائية تُنطق /s/.',
      'le train':'ai تُنطق /ɛ̃/ في الصوت الأنفي؛ و n النهائية لا تُنطق كحرف مستقل.',
      "l'avion":'a واضحة، و vi تُنطق /vj/ تقريبًا؛ و on في النهاية صوت أنفي /ɔ̃/.',
      'la voiture':'oi تُنطق /wa/ تقريبًا؛ و u تُنطق /y/؛ و e الأخيرة لا تُنطق.',
      'le métro':'é تُنطق /e/؛ و o واضحة؛ و la/الـ e غير موجودة في النهاية.',
      'le taxi':'x بين الحركات تُنطق /ks/؛ و i تُنطق /i/.',
      'la gare':'g قبل a تُنطق /g/؛ و e الأخيرة لا تُنطق.',
      "l'aéroport":'h في البداية لا تُنطق؛ aéro يبدأ بصوت /ae/ تقريبًا؛ و t النهائية لا تُنطق.',
      'la station':'tion في النهاية تُنطق /sjɔ̃/ تقريبًا؛ و s في البداية تُنطق /s/.',
      "l'arrêt":'الـ r فرنسية /ʁ/؛ و ê تُنطق /ɛ/؛ و t النهائية لا تُنطق.',
      'le billet':'ill تُنطق /j/ تقريبًا؛ و t النهائية لا تُنطق.',
      'le voyage':'oy تُنطق /waj/ تقريبًا؛ و ge في النهاية تُنطق /ʒ/.',
      'un guichet':'gui تُنطق /gi/؛ و ch تُنطق /ʃ/ مثل «ش»؛ و t النهائية لا تُنطق.',
      'une plage':'j تُنطق /ʒ/؛ و e الأخيرة لا تُنطق.',
      'un zoo':'z تُنطق /z/؛ و oo تُنطق /o/ تقريبًا.',
      'un cirque':'c قبل i تُنطق /s/؛ و qu تُنطق /k/؛ و e النهائية لا تُنطق.',
      'un stade':'st تُنطق /stad/؛ و e النهائية لا تُنطق.',
      'un club':'u تُنطق /y/؛ و b النهائية تُنطق.',
      'une pharmacie':'ph تُنطق /f/؛ و c قبل i تُنطق /s/؛ و e الأخيرة لا تُنطق.',
      'un pays':'ay تُنطق /ɛ.i/ تقريبًا؛ و s النهائية لا تُنطق.',
      'une ville':'ill تُنطق /j/ تقريبًا؛ و e الأخيرة لا تُنطق.',
      'un lieu':'ieu تُنطق /jø/ تقريبًا؛ و u في lieu ليست /u/ بل جزء من الصوت المركب /jø/.'
    },
    'grade8-u3-l2': {
      'un passager':'ss بين الحركات تُنطق /s/؛ و er في النهاية تُنطق /e/.',
      'une passagère':'ss تُنطق /s/؛ و ère في النهاية تُنطق /ɛʁ/.',
      'un guichetier':'gui تُنطق /gi/؛ ch تُنطق /ʃ/؛ و ier في النهاية تُنطق تقريبًا /je/.',
      'un billet':'ill تُنطق /j/ تقريبًا؛ و t النهائية لا تُنطق.',
      'un ticket':'ck تُنطق /k/؛ و t النهائية لا تُنطق.',
      'une valise':'s بين حركتين تُنطق /z/؛ و e الأخيرة لا تُنطق.',
      'des horaires':'h في البداية لا تُنطق؛ و oi تُنطق /wa/ تقريبًا؛ و s النهائية لا تُنطق.',
      'un touriste':'ou تُنطق /u/؛ و s بين حركتين تُنطق /z/؛ و e الأخيرة لا تُنطق.',
      'une touriste':'ou تُنطق /u/؛ و s بين حركتين تُنطق /z/؛ و e الأخيرة لا تُنطق.',
      'un pharmacien':'ph تُنطق /f/؛ c قبل i تُنطق /s/؛ و ien في النهاية تُنطق تقريبًا /sjɛ̃/.'
    }
  };
  const norm=s=>String(s||'').trim().toLowerCase().replace(/[’`]/g,"'").replace(/\s+/g,' ');
  const id=()=>new URLSearchParams(location.search).get('id')||'';
  function patch(){
    const notes=NOTES[id()];
    if(!notes) return;
    document.querySelectorAll('.pronRow').forEach(row=>{
      const word=row.querySelector('.pronWord');
      if(!word) return;
      const key=Object.keys(notes).find(k=>norm(k)===norm(word.textContent));
      if(!key) return;
      let box=row.querySelector('.pronNote');
      if(!box){ box=document.createElement('div'); box.className='pronNote'; row.appendChild(box); }
      box.textContent=notes[key];
      box.setAttribute('aria-label','ملاحظة النطق');
    });
  }
  let timer=0;
  function schedule(){
    cancelAnimationFrame(timer);
    timer=requestAnimationFrame(()=>{ patch(); setTimeout(patch,250); setTimeout(patch,800); });
  }
  document.addEventListener('DOMContentLoaded',schedule);
  window.addEventListener('load',schedule);
  new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
})();
