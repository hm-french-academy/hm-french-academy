(() => {
  'use strict';
  const reviewItems = [
    {id:'greeting',title:'التحية والتعارف',prompt:'اختر العبارة المناسبة عند مقابلة شخص.',choices:[['Bonjour','مرحبًا'],['Au revoir','إلى اللقاء'],['Merci','شكرًا']],answer:'Bonjour'},
    {id:'howareyou',title:'الحال',prompt:'اختر كل الإجابات الصحيحة لسؤال الحال: Comment ça va ?',choices:[['Ça va bien, merci.',''],['Pas mal.',''],['Ça ne va pas.',''],['Oui, ça va bien.','']],answers:['Ça va bien, merci.','Pas mal.','Ça ne va pas.','Oui, ça va bien.']},
    {id:'name',title:'التعارف',prompt:'اختر السؤال الذي تسأل به عن اسم شخص.',choices:[['Comment tu t’appelles ?',''],['Comment ça va ?',''],['Au revoir !','']],answer:'Comment tu t’appelles ?'}
  ];
  function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
  function render(root){
    root.innerHTML=`<section class="smart-review-v2"><div class="sr-head"><span>🧠</span><div><small>مراجعة شخصية</small><h2>مراجعتك الذكية</h2></div></div><p class="sr-intro">سنراجع المهارات التي تحتاج إلى تثبيت، بدل إعادة أسئلة عشوائية من محتوى الدرس.</p><div class="sr-progress" id="sr-progress"></div><div id="sr-card"></div><div class="sr-result" id="sr-result"></div></section>`;
    let i=0,score=0; const card=root.querySelector('#sr-card'), prog=root.querySelector('#sr-progress'), result=root.querySelector('#sr-result');
    function draw(){const x=reviewItems[i];prog.textContent=`مراجعة ${i+1} من ${reviewItems.length}`; const multi=Array.isArray(x.answers);card.innerHTML=`<div class="sr-card"><div class="sr-tag">${esc(x.title)}</div><h3>${esc(x.prompt)}</h3><div class="sr-choices">${x.choices.map((c,n)=>`<button class="sr-choice" data-v="${esc(c[0])}">${esc(c[0])}${c[1]?`<small>${esc(c[1])}</small>`:''}</button>`).join('')}</div><button class="sr-check" id="sr-check">تحقق من إجابتي</button><div class="sr-feedback" id="sr-feedback"></div></div>`;
      const selected=new Set(); card.querySelectorAll('.sr-choice').forEach(b=>b.onclick=()=>{b.classList.toggle('selected');selected.has(b.dataset.v)?selected.delete(b.dataset.v):selected.add(b.dataset.v);});
      card.querySelector('#sr-check').onclick=()=>{const ok=multi?[...selected].length===x.answers.length&&x.answers.every(v=>selected.has(v)):selected.size===1&&selected.has(x.answer); const f=card.querySelector('#sr-feedback'); if(ok){score++;f.textContent='✅ ممتاز! ثبتنا هذه النقطة.';f.className='sr-feedback ok';}else{f.textContent='💡 راجع هذه النقطة ثم جرّب مرة أخرى.';f.className='sr-feedback no';} card.querySelector('#sr-check').disabled=true; setTimeout(()=>{i++;i<reviewItems.length?draw():finish();},650);};}
    function finish(){card.innerHTML='';prog.textContent='اكتملت المراجعة';result.innerHTML=`<div class="sr-done"><h3>أحسنت! 🎉</h3><p>نتيجتك في المراجعة: <strong>${score}/${reviewItems.length}</strong></p><p>${score===reviewItems.length?'أتممت المراجعة بإتقان.':'يمكنك إعادة المراجعة لتثبيت النقاط التي تحتاج إلى تدريب.'}</p><button class="sr-retry" onclick="location.reload()">إعادة المراجعة</button></div>`;}
    draw();
  }
  window.HMGrade3SmartReviewV2={render};
})();
