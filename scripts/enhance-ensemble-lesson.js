(() => {
  'use strict';
  const qs = new URLSearchParams(location.search);
  const lessonId = qs.get('id');
  if (!lessonId || !lessonId.startsWith('ensemble-')) return;

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>\"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[ch]));
  const speak = (text, rate = 0.9) => {
    if (!('speechSynthesis' in window)) return;
    const clean = String(text || '').replace(/https?:\/\/\S+/g,'').replace(/[•●▪◾◽◼◻→←↔✓✗]/g,' ').replace(/[.,!?;:()\[\]{}<>|/\\]+/g,' ').replace(/\s+/g,' ').trim();
    if (!clean) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = 'fr-FR'; u.rate = rate; u.pitch = 1;
    speechSynthesis.speak(u);
  };

  const css = `
    .hm-book2{border:1px solid #d9e3f1;border-radius:24px;background:linear-gradient(145deg,#fff,#f8fbff);overflow:hidden;box-shadow:0 18px 45px rgba(20,38,74,.08)}
    .hm-book2-head{padding:20px 20px 14px;border-bottom:1px solid #e5ebf3;display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap}
    .hm-book2-head strong{font-size:21px;color:#14264a}.hm-book2-head span{color:#64748b;font-size:13px}
    .hm-book2-progress{height:6px;background:#e7edf5}.hm-book2-progress i{display:block;height:100%;width:16.66%;background:linear-gradient(90deg,#2563eb,#7c3aed);transition:.3s}
    .hm-book2-body{padding:22px}.hm-book2-kicker{font-size:12px;font-weight:900;color:#7c3aed;letter-spacing:.04em;text-transform:uppercase}
    .hm-book2-title{font-size:clamp(27px,6vw,42px);line-height:1.2;color:#14264a;margin:7px 0 10px}.hm-book2-lead{font-size:16px;color:#526078;line-height:1.9}
    .hm-book2-panel{margin-top:17px;border:1px solid #dfe7f2;border-radius:18px;padding:17px;background:#fff}.hm-book2-panel h4{margin:0 0 10px;color:#14264a;font-size:17px}
    .hm-book2-dialogue{display:grid;gap:9px}.hm-book2-line{padding:11px 13px;border-radius:13px;background:#f5f8fd;border:1px solid #e2e8f1;line-height:1.8}.hm-book2-line:nth-child(odd){background:#eef4ff}
    .hm-book2-vocab{display:grid;grid-template-columns:repeat(2,1fr);gap:9px}.hm-book2-word{padding:12px;border:1px solid #e0e7f0;border-radius:14px;background:#fbfdff}.hm-book2-word b{display:block;color:#2457a5;font-size:17px}.hm-book2-word small{display:block;color:#64748b;margin-top:4px;line-height:1.6}
    .hm-book2-rule{background:#f7f3ff;border:1px solid #e5dafa;border-radius:16px;padding:15px;line-height:1.9}.hm-book2-rule b{color:#6d28d9}
    .hm-book2-task{background:linear-gradient(135deg,#f8fbff,#fff7f8);border:1px solid #dbe5f4;border-radius:17px;padding:16px;line-height:1.9}.hm-book2-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}.hm-book2-btn{border:1px solid #bfd2f4;background:#eef4ff;color:#2457a5;border-radius:12px;padding:10px 13px;font-weight:900;cursor:pointer}.hm-book2-btn.primary{background:#14264a;color:#fff;border-color:#14264a}
    .hm-book2-choice{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:11px}.hm-book2-choice button{padding:12px;border-radius:12px;border:1px solid #d9e2ee;background:#fff;text-align:right;font-weight:800;cursor:pointer}.hm-book2-choice button.ok{background:#eaf8f2;border-color:#8ed0b6}.hm-book2-choice button.no{background:#fff0f1;border-color:#e9a8ae}
    .hm-video2{margin-top:16px;border:1px solid #ead7db;border-radius:18px;background:#fff8f8;padding:16px}.hm-video2 a{display:inline-flex;margin-top:9px;text-decoration:none;font-weight:900;color:#a52f3d;background:#fff;border:1px solid #e7c0c5;border-radius:12px;padding:10px 13px}.hm-video2 small{display:block;color:#64748b;line-height:1.7;margin-top:7px}
    @media(max-width:560px){.hm-book2-vocab,.hm-book2-choice{grid-template-columns:1fr}.hm-book2-body{padding:16px}}
  `;
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  async function load(){
    try{
      const [bankRes,currRes] = await Promise.all([
        fetch('data/ensemble-lesson-bank.json?v=20260908',{cache:'no-store'}),
        fetch('data/ensemble-curriculum.json?v=20260908',{cache:'no-store'})
      ]);
      if(!bankRes.ok || !currRes.ok) return;
      const bank = await bankRes.json(); const curriculum = await currRes.json();
      const parts = lessonId.split('-');
      const grade = parts[1], moduleKey = `ensemble-${grade}-${parts[2]}`;
      const lessonIndex = Math.max(0, Number(parts[3]?.replace('l','') || 1)-1);
      const mod = bank.modules?.[moduleKey]; const lesson = mod?.l?.[lessonIndex];
      if(!lesson) return;
      const curGrade = curriculum.grades?.find(g => g.id === `ensemble-${grade}`);
      const curMod = curGrade?.modules?.find(m => m.id === parts[2]);
      render(lesson,mod,curMod);
    }catch(e){ console.warn('HM Ensemble enhancement:',e); }
  }

  function render(b,mod,cur){
    const old = document.getElementById('book');
    if(old){
      const section = document.createElement('section'); section.className='section'; section.id='book';
      section.innerHTML = `<div class="hm-book2"><div class="hm-book2-head"><strong>📖 الكتاب التفاعلي · Interactive Book</strong><span id="hmBookCount">صفحة 1 من 6</span></div><div class="hm-book2-progress"><i id="hmBookBar"></i></div><div class="hm-book2-body"><div id="hmBookBody"></div><div class="hm-book2-actions"><button class="hm-book2-btn" id="hmBookPrev">← السابقة</button><button class="hm-book2-btn primary" id="hmBookNext">الصفحة التالية →</button></div></div></div>`;
      old.replaceWith(section);
      const pages = makePages(b,mod,cur);
      let index=0;
      const body=document.getElementById('hmBookBody'), count=document.getElementById('hmBookCount'), bar=document.getElementById('hmBookBar');
      function paint(){
        const p=pages[index]; body.innerHTML=p.html; count.textContent=`صفحة ${index+1} من 6 · ${p.label}`; bar.style.width=`${((index+1)/6)*100}%`;
        document.getElementById('hmBookPrev').disabled=index===0; document.getElementById('hmBookNext').textContent=index===5?'✓ إنهاء الكتاب':'الصفحة التالية →';
        body.querySelectorAll('[data-speak]').forEach(btn=>btn.addEventListener('click',()=>speak(btn.getAttribute('data-speak'),Number(btn.dataset.rate||.9))));
        body.querySelectorAll('[data-answer]').forEach(btn=>btn.addEventListener('click',()=>{
          const wrap=btn.closest('.hm-book2-panel'); const feedback=wrap.querySelector('[data-feedback]');
          wrap.querySelectorAll('[data-answer]').forEach(x=>x.classList.remove('ok','no'));
          const ok=btn.dataset.answer==='ok'; btn.classList.add(ok?'ok':'no');
          feedback.innerHTML=ok?'✅ ممتاز. لاحظ كيف استخدمت اللغة داخل الموقف.':'❌ ليس بعد. ارجع إلى الجملة النموذجية ثم حاول مرة أخرى.';
        }));
        window.scrollTo({top:section.offsetTop-10,behavior:'smooth'});
      }
      document.getElementById('hmBookPrev').onclick=()=>{if(index>0){index--;paint();}};
      document.getElementById('hmBookNext').onclick=()=>{if(index<5){index++;paint();}else{document.getElementById('hmBookNext').textContent='✓ تم إنهاء الكتاب';}};
      paint();
    }

    const videoLink=document.getElementById('videoLink');
    const videoTitle=document.getElementById('videoTitle');
    if(videoLink){
      const query=encodeURIComponent(`français débutant ${cur?.title||mod?.theme||''} ${b.title} ${b.vocab?.slice(0,3).join(' ')||''}`);
      videoLink.href=`https://www.youtube.com/results?search_query=${query}`;
      videoTitle.textContent=`🎬 ${b.title} · فيديو تعليمي مناسب`;
    }
  }

  function makePages(b,mod,cur){
    const words=(b.vocab||[]).slice(0,6).map(x=>{const a=String(x).split('—');return {fr:a[0]?.trim()||x,ar:a.slice(1).join('—').trim()};});
    const dialogue=String(b.dialogue||'').split(/\s+—\s+|(?=—)/).map(x=>x.trim()).filter(Boolean);
    const dialogueHtml=dialogue.length?dialogue.map(x=>`<div class="hm-book2-line">${escapeHtml(x)}</div>`).join(''):`<div class="hm-book2-line">${escapeHtml(b.dialogue||b.model)}</div>`;
    const grammar=escapeHtml(b.grammar||''); const model=escapeHtml(b.model||'');
    return [
      {label:'Situation',html:`<div class="hm-book2-kicker">PAGE 01 · SITUATION</div><h3 class="hm-book2-title">${escapeHtml(b.title)}</h3><p class="hm-book2-lead">${escapeHtml(b.target)}</p><div class="hm-book2-panel"><h4>🎭 موقف التواصل</h4><div class="hm-book2-dialogue">${dialogueHtml}</div><div class="hm-book2-actions"><button class="hm-book2-btn" data-speak="${escapeHtml(b.dialogue||b.model)}">🔊 استمع</button><button class="hm-book2-btn" data-speak="${escapeHtml(b.dialogue||b.model)}" data-rate="0.65">🐢 ببطء</button></div></div>`},
      {label:'Observe & Notice',html:`<div class="hm-book2-kicker">PAGE 02 · OBSERVE & NOTICE</div><h3 class="hm-book2-title">ماذا تلاحظ؟</h3><p class="hm-book2-lead">قبل حفظ القاعدة، ابحث عن النمط في الحوار.</p><div class="hm-book2-panel"><h4>🔎 Observe</h4><p class="hm-book2-lead">ما الكلمات أو التراكيب التي تتكرر؟ ما الجملة التي تحقق هدف الدرس؟</p><div class="hm-book2-task"><b>جملة التركيز:</b><br><span class="fr">${model}</span></div></div><div class="hm-book2-panel"><h4>💡 Notice</h4><p class="hm-book2-lead">حاول تحديد ما الذي تغيّر عندما تغيّر المتحدث أو المعلومة. هذا هو المفتاح الذي سنبني عليه القاعدة.</p><div class="hm-book2-choice"><button data-answer="ok">أستطيع تحديد النمط</button><button data-answer="no">أحتاج إلى مثال آخر</button></div><div data-feedback class="hm-book2-lead" style="margin-top:9px"></div></div>`},
      {label:'Build',html:`<div class="hm-book2-kicker">PAGE 03 · BUILD</div><h3 class="hm-book2-title">ابنِ اللغة</h3><p class="hm-book2-lead">حوّل ما لاحظته إلى قاعدة قابلة للاستخدام، ثم جرّبها فورًا.</p><div class="hm-book2-rule"><b>قاعدة الدرس</b><br>${grammar}</div><div class="hm-book2-panel"><h4>🧩 النموذج</h4><span class="fr">${model}</span><div class="hm-book2-actions"><button class="hm-book2-btn" data-speak="${model}">🔊 استمع للنموذج</button></div></div><div class="hm-book2-task"><b>تطبيق سريع:</b> ${escapeHtml(b.practice)}</div>`},
      {label:'Vocabulary & Pronunciation',html:`<div class="hm-book2-kicker">PAGE 04 · VOCABULAIRE</div><h3 class="hm-book2-title">الكلمة ليست وحدها</h3><p class="hm-book2-lead">استمع، اقرأ، ثم اربط الكلمة بموقف استعمالها.</p><div class="hm-book2-vocab">${words.map(w=>`<div class="hm-book2-word"><b>${escapeHtml(w.fr)}</b><small>${escapeHtml(w.ar||'')||'كلمة أساسية في الدرس'}</small><button class="hm-book2-btn" style="margin-top:8px" data-speak="${escapeHtml(w.fr)}">🔊 اسمع</button></div>`).join('')}</div><div class="hm-book2-task" style="margin-top:14px"><b>🎙️ Pronunciation:</b> استمع للكلمة ثم كررها بصوتك. لا تتعجل؛ الهدف هو وضوح الصوت والإيقاع.</div>`},
      {label:'Use it',html:`<div class="hm-book2-kicker">PAGE 05 · USE IT</div><h3 class="hm-book2-title">استخدم اللغة بنفسك</h3><p class="hm-book2-lead">الآن نخرج من المثال إلى موقف جديد.</p><div class="hm-book2-panel"><h4>🗣️ Production orale</h4><div class="hm-book2-task">${escapeHtml(b.oral)}</div><div class="hm-book2-actions"><button class="hm-book2-btn" data-speak="${escapeHtml(b.oral)}">🔊 اقرأ المهمة</button></div></div><div class="hm-book2-panel"><h4>✍️ Production écrite</h4><div class="hm-book2-task">${escapeHtml(b.writing)}</div></div>`},
      {label:'Mission finale',html:`<div class="hm-book2-kicker">PAGE 06 · MISSION</div><h3 class="hm-book2-title">🏁 مهمة الصفحة الأخيرة</h3><p class="hm-book2-lead">أثبت أنك تستطيع استعمال ما تعلمته دون نسخ النموذج حرفيًا.</p><div class="hm-book2-task"><b>Mission:</b><br>${escapeHtml(b.challenge)}</div><div class="hm-book2-panel"><h4>✅ قبل أن تنهي</h4><label style="display:block;margin:8px 0"><input type="checkbox"> فهمت المفردات الأساسية.</label><label style="display:block;margin:8px 0"><input type="checkbox"> أستطيع استخدام القاعدة في جملة جديدة.</label><label style="display:block;margin:8px 0"><input type="checkbox"> استطعت قول أو كتابة إنتاج خاص بي.</label></div><div class="hm-video2"><b>🎬 امتداد بصري للدرس</b><small>بعد إنهاء الكتاب، شاهد مادة مرتبطة بعنوان الدرس ثم عد إلى التمرين داخل المنصة.</small><a target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent(`français ${cur?.title||''} ${b.title}`)}">▶️ افتح نتائج الفيديو المخصصة</a></div>`}
    ];
  }
  load();
})();
