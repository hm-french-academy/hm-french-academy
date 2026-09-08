(() => {
  'use strict';
  const qs = new URLSearchParams(location.search);
  const lessonId = qs.get('id');
  if (!lessonId || !lessonId.startsWith('ensemble-')) return;

  const esc = v => String(v ?? '').replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
  const css = `
  .ens-rich{border:1px solid #dce5f2;border-radius:22px;background:linear-gradient(145deg,#fff,#f8fbff);overflow:hidden;margin-top:14px}
  .ens-rich-head{padding:17px 18px;border-bottom:1px solid #e5ebf3;display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap}
  .ens-rich-head strong{color:#14264a;font-size:19px}.ens-rich-head span{font-size:12px;color:#64748b}
  .ens-scene{display:grid;grid-template-columns:1fr 1.15fr;gap:14px;padding:18px}
  .ens-visual{min-height:220px;border-radius:19px;border:1px solid #dbe5f3;background:radial-gradient(circle at 70% 25%,#fff 0,#eef4ff 45%,#e8edf7 100%);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
  .ens-visual:before,.ens-visual:after{content:"";position:absolute;border:1px solid #cbd8eb;border-radius:50%;opacity:.65}.ens-visual:before{width:180px;height:180px;right:-65px;top:-70px}.ens-visual:after{width:120px;height:120px;left:-45px;bottom:-45px}
  .ens-emoji{font-size:76px;filter:drop-shadow(0 10px 12px rgba(20,38,74,.14));z-index:1}.ens-caption{position:absolute;bottom:12px;right:14px;left:14px;text-align:center;color:#526078;font-size:12px;font-weight:800;z-index:2}
  .ens-discovery{padding:18px}.ens-kicker{font-size:11px;font-weight:900;color:#7c3aed;letter-spacing:.05em}.ens-discovery h3{font-size:27px;color:#14264a;margin:6px 0 8px}.ens-lead{color:#526078;line-height:1.9;margin:0 0 12px}
  .ens-observe{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.ens-card{border:1px solid #dfe7f2;border-radius:15px;background:#fff;padding:13px}.ens-card b{display:block;color:#2457a5;margin-bottom:6px}.ens-card p{margin:0;color:#526078;line-height:1.7;font-size:13px}
  .ens-activity{margin-top:13px;border:1px solid #dfe7f2;border-radius:16px;padding:15px;background:#fff}.ens-activity h4{margin:0 0 7px;color:#14264a}.ens-choices{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}.ens-choices button{border:1px solid #d7e0ec;background:#fff;border-radius:11px;padding:11px;text-align:right;font-weight:850;cursor:pointer}.ens-choices button.ok{background:#eaf8f2;border-color:#8ed0b6}.ens-choices button.no{background:#fff0f1;border-color:#e9a8ae}.ens-feedback{margin-top:8px;font-weight:800;line-height:1.7;min-height:24px}.ens-video-rich{margin:0 18px 18px;border:1px solid #ead7db;border-radius:18px;background:#fff8f8;padding:15px}.ens-video-rich a{display:inline-flex;text-decoration:none;font-weight:900;color:#a52f3d;background:#fff;border:1px solid #e7c0c5;border-radius:11px;padding:9px 12px}.ens-video-rich small{display:block;color:#64748b;line-height:1.7;margin-top:7px}
  @media(max-width:700px){.ens-scene{grid-template-columns:1fr}.ens-observe{grid-template-columns:1fr}.ens-choices{grid-template-columns:1fr}}
  `;
  const st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  const profiles = [
    [/Premiers contacts/i,'👋','موقف استقبال وتعارف','التحية والاسم والوداع','bonjour · salut · à bientôt'],
    [/épeler|alphabet/i,'🔤','بطاقة اسم وحروف','التهجئة وربط الصوت بالكتابة','S-A-R-A · lettre · prénom'],
    [/nombres|salut/i,'🔢','بطاقة تعريف رقمية','الأعداد والعمر والتحية','J’ai … ans · 1–12'],
    [/fiche d’identité/i,'🪪','Fiche d’identité','الاسم والجنسية والمدينة','Je suis… · J’habite à…'],
    [/être et avoir/i,'⚖️','اختيار الفعل الصحيح','être أم avoir؟','Je suis… · J’ai…'],
    [/Questions et identité/i,'❓','مقابلة قصيرة','السؤال عن الاسم والعمر والعنوان','Comment… ? · Où… ? · Quel… ?'],
    [/Présenter quelqu’un/i,'🧑‍🤝‍🧑','تعريف صديق','تقديم شخص آخر','Il/Elle s’appelle…'],
    [/Date de naissance/i,'🎂','بطاقة عيد ميلاد','اليوم والشهر وتاريخ الميلاد','né(e) le …'],
    [/Professions et portrait/i,'🧑‍⚕️','بطاقة مهنة','الاسم والمهنة والهوية','Il est… · Elle est…'],
    [/Dans ma classe/i,'🏫','داخل الفصل','أدوات ومرافق الفصل','C’est… · Il y a…'],
    [/Un ou une/i,'📚','سلة أدوات مدرسية','جنس الاسم والأدوات','un · une · des · le · la · les'],
    [/Mon collège/i,'🗺️','خريطة المدرسة','الأماكن والمرافق','bibliothèque · cour · classe'],
    [/J’aime/i,'❤️','لوحة تفضيلات','الإعجاب وعدم الإعجاب','J’aime · Je n’aime pas'],
    [/couleurs|matières/i,'🎨','اختيار لون وشيء','الألوان والتفضيلات','rouge · bleu · vert'],
    [/Sondage de classe/i,'📊','استطلاع الصف','سؤال، إجابة، نتيجة','Tu préfères… ? · majorité'],
    [/Je me décris/i,'🪞','مرآة الوصف','وصف المظهر والصفات','Je suis… · J’ai…'],
    [/Ma famille/i,'👨‍👩‍👧‍👦','شجرة عائلة','أفراد الأسرة ووصف شخص','père · mère · frère · sœur'],
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
      discover.innerHTML=`<div class="ens-rich"><div class="ens-rich-head"><strong>🧠 Découverte guidée · ${esc(b.title)}</strong><span>مشهد + ملاحظة + نشاط فوري</span></div><div class="ens-scene"><div class="ens-visual"><div class="ens-emoji">${emoji}</div><div class="ens-caption">${esc(caption)} · ${esc(focus)}</div></div><div class="ens-discovery"><div class="ens-kicker">DÉCOUVERTE · OBSERVER AVANT DE MÉMORISER</div><h3>${esc(b.title)}</h3><p class="ens-lead">${esc(b.target)}</p><div class="ens-observe"><div class="ens-card"><b>👀 Observe</b><p>${esc(b.model||'لاحظ الجملة النموذجية في الموقف.')}</p></div><div class="ens-card"><b>🔎 Repère</b><p>${esc(mini)}<br>${esc((b.vocab||[]).slice(0,2).join(' · '))}</p></div><div class="ens-card"><b>💡 Hypothèse</b><p>ما الذي تغيّر؟ وما الذي بقي ثابتًا؟ حاول صياغة القاعدة قبل كشفها.</p></div></div><div class="ens-activity"><h4>⚡ نشاط الاكتشاف</h4><p class="ens-lead">أي اختيار يطابق هدف الدرس أكثر؟</p><div class="ens-choices"><button data-rich-answer="ok">أستخدم النموذج داخل موقف مشابه</button><button data-rich-answer="no">أحفظ الكلمات منفصلة فقط</button></div><div class="ens-feedback" data-rich-feedback></div></div></div></div><div class="ens-video-rich"><b>🎬 Video Mission · ${esc(b.title)}</b><small>الفيديو المقترح مرتبط بعنوان الدرس وكلماته الأساسية، وليس فيديو عامًا ثابتًا. شاهده ثم التقط 2–3 كلمات سمعتها.</small><br><a target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent(`français débutant ${b.title} ${focus} ${(b.vocab||[]).slice(0,4).join(' ')}`)}">▶️ افتح فيديو مناسب لهذا الدرس</a></div></div>`;
      discover.querySelectorAll('[data-rich-answer]').forEach(btn=>btn.addEventListener('click',()=>{
        const ok=btn.dataset.richAnswer==='ok'; discover.querySelectorAll('[data-rich-answer]').forEach(x=>x.classList.remove('ok','no')); btn.classList.add(ok?'ok':'no');
        discover.querySelector('[data-rich-feedback]').textContent=ok?'✅ ممتاز: الهدف هو نقل اللغة من المثال إلى موقف جديد.':'🔁 جرّب مرة أخرى: الدرس لا يكتفي بحفظ المفردة؛ نستخدمها داخل موقف.';
      }));
    }
    const before=document.getElementById('videoBefore'), after=document.getElementById('videoAfter');
    if(before) before.textContent=`قبل المشاهدة: توقّع 2 كلمة ستسمعها من: ${(b.vocab||[]).slice(0,3).join('، ')}.`;
    if(after) after.textContent=`بعد المشاهدة: اكتب جملة واحدة باستعمال النموذج «${b.model||''}».`;
    const hero=document.getElementById('heroVideo');
    if(hero) hero.href=`https://www.youtube.com/results?search_query=${encodeURIComponent(`français débutant ${b.title} ${(b.vocab||[]).slice(0,5).join(' ')}`)}`;
  }

  lesson().then(x=>{if(x) render(x);}).catch(()=>{});
})();
