(() => {
  'use strict';
  const qs = new URLSearchParams(location.search);
  const lessonId = qs.get('id');
  if (!lessonId || !lessonId.startsWith('ensemble-')) return;

  const esc = v => String(v ?? '').replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
  const css = `
  .ens-rich{margin-top:14px;padding:0 2px;background:transparent}
  .ens-rich-head{padding:4px 0 14px;border-bottom:1px solid #e5ebf3;display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap}
  .ens-rich-head strong{color:#14264a;font-size:19px}.ens-rich-head span{font-size:12px;color:#64748b}
  .ens-scene{display:grid;grid-template-columns:minmax(220px,.8fr) minmax(0,1.5fr);gap:24px;padding:22px 0 8px;align-items:center}
  .ens-visual{min-height:205px;border-radius:18px;border:1px solid #dbe5f3;background:radial-gradient(circle at 70% 25%,#fff 0,#eef4ff 45%,#e8edf7 100%);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
  .ens-visual:before,.ens-visual:after{content:"";position:absolute;border:1px solid #cbd8eb;border-radius:50%;opacity:.65}.ens-visual:before{width:180px;height:180px;right:-65px;top:-70px}.ens-visual:after{width:120px;height:120px;left:-45px;bottom:-45px}
  .ens-emoji{font-size:76px;filter:drop-shadow(0 10px 12px rgba(20,38,74,.14));z-index:1}.ens-caption{position:absolute;bottom:12px;right:14px;left:14px;text-align:center;color:#526078;font-size:12px;font-weight:800;z-index:2}
  .ens-discovery{padding:0}.ens-kicker{font-size:11px;font-weight:900;color:#7c3aed;letter-spacing:.05em}.ens-discovery h3{font-size:27px;color:#14264a;margin:6px 0 8px}.ens-lead{color:#526078;line-height:1.9;margin:0 0 14px}
  .ens-steps{display:grid;gap:13px;margin-top:8px}.ens-step{display:grid;grid-template-columns:44px minmax(0,1fr);gap:12px;align-items:start;padding-bottom:13px;border-bottom:1px solid #e8edf4}.ens-step:last-child{border-bottom:0;padding-bottom:0}.ens-step-num{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#f0f4fa;color:#2457a5;font-size:13px;font-weight:900}.ens-step h4{margin:0 0 4px;color:#14264a;font-size:16px}.ens-step p{margin:0;color:#526078;line-height:1.8;font-size:13px}.ens-activity{margin-top:17px;padding-top:14px;border-top:1px solid #dfe7f2}.ens-activity h4{margin:0 0 7px;color:#14264a}.ens-choices{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}.ens-choices button{border:1px solid #d7e0ec;background:#fff;border-radius:11px;padding:11px;text-align:right;font-weight:850;cursor:pointer}.ens-choices button.ok{background:#eaf8f2;border-color:#8ed0b6}.ens-choices button.no{background:#fff0f1;border-color:#e9a8ae}.ens-feedback{margin-top:8px;font-weight:800;line-height:1.7;min-height:24px}.ens-video-rich{margin:20px 0 4px;padding:14px 0;border-top:1px solid #e5ebf3}.ens-video-rich a{display:inline-flex;text-decoration:none;font-weight:900;color:#a52f3d;background:#fff;border:1px solid #e7c0c5;border-radius:11px;padding:9px 12px}.ens-video-rich small{display:block;color:#64748b;line-height:1.7;margin-top:7px}
  @media(max-width:700px){.ens-scene{grid-template-columns:1fr;gap:16px}.ens-visual{min-height:175px}.ens-steps{gap:12px}.ens-choices{grid-template-columns:1fr}.ens-discovery h3{font-size:23px}}
  `;
  const st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  const profiles = [
    [/Premiers contacts/i,'👋','موقف استقبال وتعارف','التحية والاسم والوداع','bonjour · salut · à bientôt'],
    [/épeler|alphabet/i,'🔤','بطاقة اسم وحروف','التهجئة وربط الصوت بالكتابة','S-A-R-A · lettre · prénom'],
    [/nombres/i,'🔢','موقف تعارف بالأعداد','الأعداد والعمر','J’ai … ans · 1–12'],
    [/fiche d’identité/i,'🪪','Fiche d’identité','الاسم والجنسية والمدينة','Je suis… · J’habite à…'],
    [/être et avoir/i,'⚖️','اختيار الفعل الصحيح','être أم avoir؟','Je suis… · J’ai…'],
    [/Questions et identité/i,'❓','مقابلة قصيرة','السؤال عن الاسم والعمر والعنوان','Comment… ? · Où… ? · Quel… ?'],
    [/Présenter quelqu’un/i,'🧑‍🤝‍🧑','تعريف صديق','تقديم شخص آخر','Il/Elle s’appelle…'],
    [/Date de naissance/i,'🎂','بطاقة عيد ميلاد','اليوم والشهر وتاريخ الميلاد','né(e) le …'],
    [/Professions et portrait/i,'🧑‍⚕️','بطاقة مهنة','الاسم والمهنة والهوية','Il est… · Elle est…'],
    [/Dans ma classe/i,'🏫','داخل الفصل','أدوات ومرافق الفصل','C’est… · Il y a…'],
    [/Un ou une/i,'📚','أدوات مدرسية','جنس الاسم والأدوات','un · une · des · le · la · les'],
    [/Mon collège/i,'🗺️','جولة داخل المدرسة','الأماكن والمرافق','bibliothèque · cour · classe'],
    [/J’aime/i,'❤️','لوحة تفضيلات','الإعجاب وعدم الإعجاب','J’aime · Je n’aime pas'],
    [/couleurs|matières/i,'🎨','اختيار لون وشيء','الألوان والتفضيلات','rouge · bleu · vert'],
    [/Sondage de classe/i,'📊','استطلاع الصف','سؤال، إجابة، نتيجة','Tu préfères… ? · majorité'],
    [/Je me décris/i,'🪞','مرآة الوصف','وصف المظهر والصفات','Je suis… · J’ai…'],
    [/Ma famille/i,'👨‍👩‍👧‍👦','مشهد عائلي','أفراد الأسرة ووصف شخص','père · mère · frère · sœur'],
    [/Le portrait final/i,'🖼️','Portrait final','دمج الوصف والأسرة في إنتاج واحد','nom · famille · portrait']
  ];
  const profileFor = title => profiles.find(([re])=>re.test(title)) || ['/.*/','🇫🇷','موقف فرنسي','اكتشف اللغة من السياق','Ensemble'];

  function lesson(){
    return fetch('data/ensemble-lesson-bank.json?v=20260908-content',{cache:'no-store'}).then(r=>r.ok?r.json():null).then(bank=>{
      if(!bank) return null;
      const p=lessonId.split('-'); const grade=p[1], moduleKey=`ensemble-${grade}-${p[2]}`;
      const mod=bank.modules?.[moduleKey]; const idx=Math.max(0,Number((p[3]||'l1').replace('l',''))-1);
      return mod?.l?.[idx] ? {b:mod.l[idx],mod} : null;
    });
  }

  function render(x){
    const b=x.b, [re,emoji,caption,focus,mini]=profileFor(b.title);
    const discover=document.getElementById('discover');
    if(discover){
      const vocab=(b.vocab||[]).slice(0,4).join(' · ');
      const model=b.model||'لاحظ الجملة النموذجية في الموقف.';
      discover.innerHTML=`<div class="ens-rich"><div class="ens-rich-head"><strong>🧠 Découverte · اكتشف قبل أن تحفظ</strong><span>${esc(b.title)}</span></div><div class="ens-scene"><div class="ens-visual"><div class="ens-emoji">${emoji}</div><div class="ens-caption">${esc(caption)} · ${esc(focus)}</div></div><div class="ens-discovery"><div class="ens-kicker">DÉCOUVERTE · OBSERVER AVANT DE MÉMORISER</div><h3>${esc(b.title)}</h3><p class="ens-lead">الفكرة ليست أن تحفظ القاعدة من البداية؛ لاحظها في اللغة ثم استخرج منها المعنى والاستعمال.</p><div class="ens-steps"><div class="ens-step"><div class="ens-step-num">01</div><div><h4>Observe</h4><p>ماذا ترى في الموقف؟ من يتحدث؟ وما الجمل المهمة؟<br><strong>${esc(model)}</strong></p></div></div><div class="ens-step"><div class="ens-step-num">02</div><div><h4>Notice</h4><p>ما الكلمة أو التركيب المتكرر؟ وما الذي يتغير؟<br>${esc(mini)} · ${esc(vocab)}</p></div></div><div class="ens-step"><div class="ens-step-num">03</div><div><h4>Rule</h4><p>نحوّل الملاحظة إلى قاعدة بسيطة مرتبطة بالمعنى.<br>${esc(b.target)}</p></div></div><div class="ens-step"><div class="ens-step-num">04</div><div><h4>Try</h4><p>طبّق القاعدة في جملة جديدة مباشرة، ولا تكتفِ بحفظ الكلمات منفصلة.</p></div></div></div><div class="ens-activity"><h4>⚡ جرّب الآن</h4><p class="ens-lead">أي اختيار يعبّر عن طريقة التعلّم في هذا الدرس؟</p><div class="ens-choices"><button data-rich-answer="ok">ألاحظ النموذج ثم أستعمله في موقف جديد</button><button data-rich-answer="no">أحفظ الكلمات منفصلة دون استعمالها</button></div><div class="ens-feedback" data-rich-feedback></div></div></div></div><div class="ens-video-rich"><b>🎬 Video Mission · ${esc(b.title)}</b><small>شاهِد فيديو مرتبطًا بموضوع الدرس، ثم التقط كلمتين أو ثلاثًا سمعتها واستعمل إحداها في جملة.</small><br><a target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent(`français débutant ${b.title} ${focus} ${(b.vocab||[]).slice(0,4).join(' ')}`)}">▶️ افتح فيديو مناسب لهذا الدرس</a></div></div>`;
      discover.querySelectorAll('[data-rich-answer]').forEach(btn=>btn.addEventListener('click',()=>{
        const ok=btn.dataset.richAnswer==='ok'; discover.querySelectorAll('[data-rich-answer]').forEach(x=>x.classList.remove('ok','no')); btn.classList.add(ok?'ok':'no');
        discover.querySelector('[data-rich-feedback]').textContent=ok?'✅ ممتاز: نكتشف الاستعمال من المثال ثم ننقله إلى موقف جديد.':'🔁 جرّب مرة أخرى: الفكرة هنا هي اكتشاف الاستعمال ثم تطبيقه، وليس الحفظ المنفصل.';
      }));
    }
    const before=document.getElementById('videoBefore'), after=document.getElementById('videoAfter');
    if(before) before.textContent=`قبل المشاهدة: توقّع كلمتين أو ثلاثًا ستسمعها من: ${(b.vocab||[]).slice(0,3).join('، ')}.`;
    if(after) after.textContent=`بعد المشاهدة: اكتب جملة واحدة باستعمال النموذج «${b.model||''}».`;
    const hero=document.getElementById('heroVideo');
    if(hero) hero.href=`https://www.youtube.com/results?search_query=${encodeURIComponent(`français débutant ${b.title} ${(b.vocab||[]).slice(0,5).join(' ')}`)}`;
  }

  lesson().then(x=>{if(x) render(x);}).catch(()=>{});
})();
