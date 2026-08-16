// HM Academy — isolated pronunciation renderer
// Prevents the legacy in-place tab renderer from locking the lesson page.
(function(){
  'use strict';
  const params=new URLSearchParams(location.search);
  const id=params.get('id')||'grade8-u1-l1';
  const match=id.match(/^grade8-u(\d+)-l(\d+)$/);
  if(!match)return;
  const unit=match[1],lesson=match[2];
  const lessonUrl=`data/lessons/grade-8/unit-${unit}/lesson-${lesson}.json?v=20260816-pron-safe1`;
  const notesUrl='data/lessons/grade-8/pronunciation-notes.json?v=20260816-pron-safe1';
  const esc=s=>String(s??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
  const noteFallback='استمع إلى الكلمة الفرنسية، لاحظ الصوت المميز، ثم كررها بصوتك.';
  const render=async()=>{
    const viewer=document.getElementById('viewer');
    if(!viewer)return;
    try{
      const [lr,nr]=await Promise.all([fetch(lessonUrl,{cache:'no-store'}),fetch(notesUrl,{cache:'no-store'})]);
      if(!lr.ok)throw new Error('HTTP '+lr.status);
      const data=await lr.json();
      const allNotes=nr.ok?await nr.json():{};
      const notes=allNotes[id]||{};
      const vocab=Array.isArray(data.vocabulary)?data.vocabulary:[];
      viewer.innerHTML=`<div class="head"><h2>🎧 النطق</h2></div><div class="content"><div class="note"><b>🎯 طريقة التدريب:</b> ${noteFallback}</div><div class="pronToolbar"><strong>🔊 ${vocab.length} مفردة</strong><button class="btn primary" id="hmSafeAllPron" type="button">استمع إلى الكلمات بالترتيب</button></div><div class="pronList" id="hmSafePronList"></div></div>`;
      const list=document.getElementById('hmSafePronList');
      vocab.forEach((v,i)=>{
        const row=document.createElement('article');row.className='pronRow';
        const num=document.createElement('b');num.textContent=String(i+1);
        const info=document.createElement('div');
        const word=document.createElement('div');word.className='pronWord';word.textContent=v.word||'';
        const example=document.createElement('div');example.className='small';example.textContent=v.example||'';
        info.append(word,example);
        const audio=document.createElement('button');audio.className='audio';audio.type='button';audio.textContent='🔊';audio.title='استمع';audio.setAttribute('aria-label','استمع إلى '+(v.word||''));
        audio.addEventListener('click',()=>window.HMSpeech?.speak?.(v.word||'',{button:audio,lang:'fr-FR',rate:.84}));
        const details=document.createElement('div');
        const ar=document.createElement('div');ar.className='ar';ar.textContent=v.translation||'';
        const pn=document.createElement('div');pn.className='pronNote';
        const strong=document.createElement('b');strong.textContent='💡 النطق: ';
        pn.append(strong,document.createTextNode(notes[v.word]||noteFallback));
        details.append(ar,pn);row.append(num,info,audio,details);list.appendChild(row);
      });
      document.querySelectorAll('#tabs .tab,#journey .step').forEach(b=>b.classList.toggle('active',b.dataset.t==='pronunciation'||b.dataset.j==='pronunciation'));
      const all=document.getElementById('hmSafeAllPron');
      all.addEventListener('click',async()=>{
        all.disabled=true;
        for(const v of vocab){if(window.HMSpeech?.speak)await window.HMSpeech.speak(v.word||'',{button:all,lang:'fr-FR',rate:.84});await new Promise(r=>setTimeout(r,100));}
        all.disabled=false;
      });
      window.scrollTo({top:0,behavior:'smooth'});
    }catch(err){viewer.innerHTML='<div class="error">تعذر تحميل قسم النطق حالياً.<br><small>'+esc(err.message)+'</small></div>';}
  };
  const intercept=e=>{
    const target=e.target?.closest?.('[data-t="pronunciation"],[data-j="pronunciation"]');
    if(!target)return;
    if(!document.getElementById('viewer'))return;
    e.preventDefault();e.stopImmediatePropagation();
    document.querySelectorAll('#tabs .tab,#journey .step').forEach(b=>b.classList.remove('active'));
    target.classList.add('active');
    render();
  };
  document.addEventListener('click',intercept,true);
})();
