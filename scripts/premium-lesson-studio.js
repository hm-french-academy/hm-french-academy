'use strict';
(() => {
  const A = 'assets/lessons/grade8-u1-l1/';
  const ROOT = 'data/lessons/grade-8/unit-1/';
  const id = new URLSearchParams(location.search).get('id') || 'grade8-u1-l1';
  const app = document.getElementById('app');
  if (!app) return;

  const V = [
    ['un stylo','قلم جاف','pen.svg','J’ai un stylo.'],
    ['un crayon','قلم رصاص','pencil.svg','J’écris avec un crayon.'],
    ['une gomme','استيكة','eraser.svg','J’ai une gomme.'],
    ['une règle','مسطرة','ruler.svg','La règle est sur la table.'],
    ['un tube de colle','أنبوبة لاصق','glue.svg','J’ai un tube de colle.'],
    ['un taille-crayon','براية','sharpener.svg','Le taille-crayon est dans la trousse.'],
    ['un cahier','كراسة','notebook.svg','Le cahier est sur le bureau.'],
    ['un livre','كتاب','book.svg','Le livre est dans le sac.'],
    ['un sac à dos','شنطة ظهر','backpack.svg','Le livre est dans le sac à dos.'],
    ['une calculatrice','آلة حاسبة','calculator.svg','La calculatrice est sur le bureau.'],
    ['des ciseaux','مقص','scissors.svg','Les ciseaux sont dans la trousse.'],
    ['une trousse','مقلمة','pencil-case.svg','La trousse est dans le sac à dos.']
  ];

  const D = [
    ['Professeur','Bonjour ! Bienvenue dans la classe.'],
    ['Élève','Bonjour, monsieur !'],
    ['Professeur','Qu’est-ce qu’il y a sur le bureau ?'],
    ['Élève','Il y a un cahier et une calculatrice.'],
    ['Professeur','Et dans la trousse ?'],
    ['Élève','Il y a un stylo, un crayon et des ciseaux.']
  ];

  const Q = [
    ['Que signifie « une trousse » ?',['سبورة','مقلمة','مسطرة'],1],
    ['Qu’est-ce qu’il y a sur le bureau ?',['Un cahier et une calculatrice','Un sac à dos et une gomme','Des ciseaux et une règle'],0,'desk'],
    ['Complète : « Il y a ___ crayon. »',['une','un','des'],1],
    ['Où sont les ciseaux ?',['dans la trousse','sur le tableau','dans le livre'],0]
  ];

  const R = [
    {key:'interactive',icon:'🎬',title:'الشرح التفاعلي',desc:'المسار الأساسي للدرس: اكتشاف المفردات، الاستماع، الحوار، القاعدة، ثم التطبيق داخل سياق الفصل.',goal:'افهم المفردات واستعملها في موقف حقيقي.',time:'8–12 دقيقة',xp:15,target:'vocab',file:'lesson-1-interactive.html',external:'افتح التجربة الكاملة'},
    {key:'reference',icon:'📖',title:'المرجع التعليمي',desc:'مرجع سريع ومنظم للكلمات والقاعدة والأمثلة للمراجعة قبل الاختبار.',goal:'راجع الدرس في دقائق.',time:'3–5 دقائق',xp:8,target:'grammar',file:'reference_lecon1_unite1.html',external:'افتح المرجع'},
    {key:'formal',icon:'🎯',title:'التقييم المستقل',desc:'تقييم رسمي منفصل لقياس الإتقان بعد التعلم دون كشف الإجابات قبل المحاولة.',goal:'أثبت إتقانك لأهداف الدرس.',time:'5–8 دقائق',xp:20,target:'challenge',file:'formal_assessment_lecon1_unite1.html',external:'ابدأ التقييم'},
    {key:'interactive-assessment',icon:'🧠',title:'التقييم التفاعلي',desc:'تحديات قصيرة للمفردات والفهم والتطبيق بطريقة سريعة وممتعة.',goal:'اختبر نفسك دون ملل.',time:'4–6 دقائق',xp:12,target:'challenge',file:'interactive_assessment_lecon1_unite1.html',external:'ابدأ التحدي'},
    {key:'games',icon:'🎮',title:'مركز الألعاب',desc:'مطابقة وذاكرة وأنشطة ممتدة لتثبيت المفردات من خلال اللعب.',goal:'حوّل التدريب إلى لعبة.',time:'5–10 دقائق',xp:12,target:'practice',file:'lesson-1-games.html',external:'ادخل مركز الألعاب'},
    {key:'pronunciation',icon:'🗣️',title:'تحدي النطق',desc:'تدريب صوتي مرتبط مباشرة بمفردات هذا الدرس ومواقفه.',goal:'استمع وكرر بنطق أوضح.',time:'3–6 دقائق',xp:10,target:'vocab',file:'pronunciation_challenge_lecon1_unite1.html',external:'تدرّب على النطق'}
  ];

  const style = document.createElement('style');
  style.textContent = `
    .premium-v4{--pv-navy:#102b57;--pv-blue:#2364e8;--pv-pink:#e92b82;--pv-teal:#10a596;--pv-gold:#f1b43d;--pv-line:#dfe6ef;--pv-muted:#6b788c;--pv-bg:#f7f9fd}
    .premium-v4 .studio-hero{grid-template-columns:1fr 1fr;min-height:470px;padding:26px;gap:24px;background:linear-gradient(135deg,#0e2b65 0%,#2364e8 52%,#12a596 100%);border-radius:34px;box-shadow:0 28px 70px #183b8130}
    .premium-v4 .hero-copy{display:flex;flex-direction:column;justify-content:center;padding:10px 8px}
    .premium-v4 .studio-hero h1{font-size:clamp(48px,6.5vw,78px);margin:8px 0 0;letter-spacing:-1px}
    .premium-v4 .fr-title{font-size:25px;margin:10px 0;color:#fff}
    .premium-v4 .sub{font-size:17px;line-height:2.05;max-width:680px}
    .premium-v4 .hero-scene{min-height:410px;padding:12px;border-radius:30px;background:#ffffff16;border:1px solid #ffffff28;box-shadow:inset 0 1px #fff2}
    .premium-v4 .hero-scene img{width:100%;height:100%;object-fit:contain;border-radius:24px;display:block}
    .premium-v4 .scene-play{position:absolute;bottom:22px;left:22px;border:0;border-radius:14px;background:#fff;color:#173b70;padding:12px 16px;font-weight:900;cursor:pointer;box-shadow:0 12px 30px #102b5730}
    .premium-v4 .journey{margin:18px 0;padding:7px;top:4px}
    .premium-v4 .mission{border-top:4px solid var(--pv-pink)}
    .premium-v4 .section-head{margin-bottom:22px}
    .premium-v4 .section-head h2{font-size:30px}
    .premium-v4 .vgrid{grid-template-columns:repeat(4,1fr);gap:16px}
    .premium-v4 .vcard{padding:10px;border-radius:23px;position:relative;transition:.22s;box-shadow:0 8px 24px #102b5707}
    .premium-v4 .vcard:hover{transform:translateY(-6px);box-shadow:0 20px 42px #102b5715}
    .premium-v4 .vcard.played{border-color:#7bcfa9;background:linear-gradient(#fff,#f4fcf8)}
    .premium-v4 .visual{height:170px;border-radius:18px;background:linear-gradient(145deg,#eef5ff,#fff4fa);overflow:hidden}
    .premium-v4 .visual img{width:72%;height:72%;object-fit:contain;transition:.2s}
    .premium-v4 .visual:hover img{transform:scale(1.08) rotate(-2deg)}
    .premium-v4 .visual:after{content:'🔊';position:absolute;right:10px;top:10px;width:31px;height:31px;border-radius:50%;display:grid;place-items:center;background:#fff;color:#2364e8;font-size:14px;box-shadow:0 7px 16px #102b5720}
    .premium-v4 .tap{display:none!important}
    .premium-v4 .fr{font-size:19px;margin-top:13px}
    .premium-v4 .ar{font-size:15px}
    .premium-v4 .vactions button{min-width:92px;transition:.15s}
    .premium-v4 .vactions button:hover{transform:translateY(-2px)}
    .premium-v4 .listen{background:var(--pv-pink)}
    .premium-v4 .example{background:#f4f8ff;border:1px solid #e1e8f2;line-height:1.8;text-align:center;direction:ltr}
    .premium-v4 .example small{display:block;direction:rtl;color:#315da3;margin-top:3px}
    .premium-v4 .dialogue-layout{grid-template-columns:1.05fr .95fr;align-items:stretch}
    .premium-v4 .dialogue-scene{min-height:450px;padding:0;background:#eaf2ff;border:1px solid #d9e5f5;box-shadow:inset 0 1px #fff;display:flex;align-items:center;justify-content:center}
    .premium-v4 .dialogue-scene img{width:100%;height:100%;object-fit:cover;border-radius:23px;display:block}
    .premium-v4 .dialogue-list{padding:5px 0}
    .premium-v4 .line{grid-template-columns:110px 1fr 38px;min-height:62px;transition:.16s;border-color:#e2e8f1}
    .premium-v4 .line:hover,.premium-v4 .line.active{border-color:#2364e8;background:#f3f7ff;transform:translateX(-3px)}
    .premium-v4 .line.active{box-shadow:0 8px 22px #2364e81c}
    .premium-v4 .line i{font-style:normal;font-size:18px;color:#2364e8}
    .premium-v4 .role-strip{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
    .premium-v4 .role-chip{border:0;border-radius:99px;padding:9px 13px;background:#fff;color:#285aa7;font-weight:900;cursor:pointer;box-shadow:0 7px 20px #102b5710}
    .premium-v4 .role-chip.active{background:#2364e8;color:#fff}
    .premium-v4 .grammar-layout{grid-template-columns:1fr 1fr}
    .premium-v4 .rule-box{background:linear-gradient(145deg,#fff9e9,#fff);border-color:#f0d38d}
    .premium-v4 .rule-example{margin-top:12px;padding:13px 15px;border-radius:16px;background:#eef4ff;border:1px solid #dce7f8;direction:ltr;text-align:left;line-height:1.9;cursor:pointer;transition:.15s}
    .premium-v4 .rule-example:hover{transform:translateY(-2px);box-shadow:0 9px 22px #102b5710}
    .premium-v4 .rule-example strong{display:block;font-size:17px}
    .premium-v4 .rule-example span{display:block;direction:rtl;text-align:right;color:#315da3;font-size:14px;font-weight:800}
    .premium-v4 .builder{background:linear-gradient(145deg,#fff,#f6f9ff)}
    .premium-v4 .sentence{min-height:62px;display:flex;align-items:center;gap:5px;flex-wrap:wrap;direction:ltr;text-align:left;padding:9px}
    .premium-v4 .tokens{gap:8px;direction:ltr}
    .premium-v4 .tokens button.used{opacity:.35;pointer-events:none;transform:none}
    .premium-v4 .chosen{cursor:pointer;background:#eaf8f1;color:#156b49;border:1px solid #b9e2ce}
    .premium-v4 .match{grid-template-columns:1fr 1fr}
    .premium-v4 .match-options{grid-template-columns:repeat(2,1fr)}
    .premium-v4 .match-options button{background:linear-gradient(#fff,#fbfcff);transition:.16s}
    .premium-v4 .match-options button:hover{transform:translateY(-3px);box-shadow:0 12px 24px #102b5712}
    .premium-v4 .match-options button.selected{outline:3px solid #2364e825;background:#f0f5ff}
    .premium-v4 .match-options button.matched{background:#eaf8f1;border-color:#6bc89b}
    .premium-v4 .match-options img{width:70px;height:54px;object-fit:contain}
    .premium-v4 .desk-question{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:14px;padding:14px;border-radius:18px;background:#f6f9ff;border:1px solid #e1e8f2}
    .premium-v4 .desk-question img{width:100%;height:105px;object-fit:contain;border-radius:14px;background:#fff}
    .premium-v4 .q{transition:.15s}
    .premium-v4 .q:hover{box-shadow:0 10px 25px #102b570b}
    .premium-v4 .q.has-image{grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr;gap:15px;align-items:center}
    .premium-v4 .choices button{transition:.15s}
    .premium-v4 .choices button:hover{transform:translateY(-2px)}
    .premium-v4 .choices button.correct{box-shadow:inset 4px 0 #43a975}
    .premium-v4 .choices button.wrong{box-shadow:inset 4px 0 #e96a7c}
    .premium-v4 .resource-grid article{min-height:300px;border-radius:22px;transition:.2s}
    .premium-v4 .resource-grid article:hover{transform:translateY(-4px);box-shadow:0 18px 35px #102b5713}
    .premium-v4 .resource-icon{width:58px;height:58px;border-radius:18px;display:grid;place-items:center;background:linear-gradient(145deg,#edf4ff,#fff1f7);font-size:29px}
    .premium-v4 .resource-primary{background:var(--pv-pink)}
    .premium-v4 .resource-start{background:var(--pv-blue)}
    .premium-v4 .resource-file{background:#eef4ff}
    .premium-v4 .resource-dialog{border:1px solid #e0e7f0}
    .premium-v4 .toast-premium{position:fixed;bottom:24px;left:50%;transform:translate(-50%,25px);opacity:0;pointer-events:none;z-index:500;background:#102b57;color:#fff;padding:12px 18px;border-radius:99px;font-weight:900;box-shadow:0 15px 35px #102b5740;transition:.25s}
    .premium-v4 .toast-premium.show{opacity:1;transform:translate(-50%,0)}
    @media(max-width:950px){.premium-v4 .studio-hero,.premium-v4 .dialogue-layout,.premium-v4 .grammar-layout{grid-template-columns:1fr}.premium-v4 .vgrid{grid-template-columns:repeat(3,1fr)}.premium-v4 .hero-scene{min-height:330px}.premium-v4 .q.has-image{grid-template-columns:1fr}}
    @media(max-width:650px){.premium-v4 .vgrid{grid-template-columns:repeat(2,1fr)}.premium-v4 .vcard .visual{height:135px}.premium-v4 .match,.premium-v4 .quiz{grid-template-columns:1fr}.premium-v4 .match-options{grid-template-columns:repeat(2,1fr)}.premium-v4 .desk-question{grid-template-columns:1fr}.premium-v4 .dialogue-scene{min-height:330px}.premium-v4 .hero-scene{min-height:270px}.premium-v4 .studio-hero{padding:18px}.premium-v4 .studio-hero h1{font-size:48px}}
  `;
  document.head.appendChild(style);
  app.classList.add('premium-v4');

  let xp = 0, score = 0, speechRun = 0;
  const completed = new Set();
  const resourceStateKey = `hm:lesson:${id}:resources`;
  let resourceDone = {};
  try { resourceDone = JSON.parse(localStorage.getItem(resourceStateKey) || '{}'); } catch (_) {}

  const toast = text => {
    let el = document.querySelector('.toast-premium');
    if (!el) { el=document.createElement('div'); el.className='toast-premium'; document.body.appendChild(el); }
    el.textContent=text; el.classList.add('show'); clearTimeout(toast.t); toast.t=setTimeout(()=>el.classList.remove('show'),2200);
  };
  const pickVoice = () => {
    if (!('speechSynthesis' in window)) return null;
    const voices = speechSynthesis.getVoices();
    return voices.find(v=>/^fr(-|_)/i.test(v.lang)) || voices.find(v=>/French/i.test(v.name)) || voices[0] || null;
  };
  const speak = (text, onEnd) => {
    if (!('speechSynthesis' in window)) { if(onEnd) onEnd(); return; }
    const u = new SpeechSynthesisUtterance(text); u.lang='fr-FR'; u.rate=.86; u.pitch=1; u.volume=1;
    const v=pickVoice(); if(v) u.voice=v;
    u.onend=()=>onEnd&&onEnd(); u.onerror=()=>onEnd&&onEnd(); speechSynthesis.speak(u);
  };
  const sequence = (items, delay=280, onStep) => {
    speechRun += 1; const run=speechRun;
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    let i=0;
    const next=()=>{ if(run!==speechRun || i>=items.length)return; const item=items[i]; if(onStep)onStep(i,item); i+=1; speak(item.text,()=>setTimeout(next,delay)); };
    next();
  };
  const add = n => { xp+=n; const e=document.getElementById('xp'),b=document.getElementById('xpbar'); if(e)e.textContent=xp; if(b)b.style.width=Math.min(100,xp/1.5)+'%'; };
  const complete = key => { if(!completed.has(key)){completed.add(key);add(3);} };
  const markResourceDone = key => { if(resourceDone[key])return; resourceDone[key]=true;localStorage.setItem(resourceStateKey,JSON.stringify(resourceDone));add((R.find(r=>r.key===key)||{xp:0}).xp);updateHub();toast('✓ تم تسجيل المورد ضمن رحلة الدرس'); };
  const resourceCard = r => { const done=!!resourceDone[r.key]; return `<article data-resource="${r.key}" class="${done?'done':''}"><div class="resource-top"><div><div class="resource-icon">${r.icon}</div><b>${r.title}</b></div><span class="resource-status ${done?'done':''}">${done?'✓ مكتمل':`+${r.xp} XP`}</span></div><p>${r.desc}</p><div class="resource-meta"><span>🎯 ${r.goal}</span><span>⏱ ${r.time}</span></div><div class="resource-actions"><button class="resource-start ${done?'done':''}" data-resource-start="${r.key}">${done?'✓ راجع التجربة':'ابدأ التجربة'}</button><a class="resource-file" href="${ROOT+r.file}">${r.external} ↗</a></div></article>`; };

  const render = () => {
    app.innerHTML=`
      <section class="studio-hero"><div class="hero-copy"><span class="unit">UNITÉ 1 · LEÇON 1</span><div class="eyebrow">في المدرسة · Learning Studio</div><h1>في المدرسة</h1><p class="fr-title">Leçon 1 : À l’école</p><p class="sub">رحلة تعليمية كاملة: <b>اكتشف → اسمع → افهم → تفاعل → طبّق → اختبر</b>. كل نشاط مرتبط بالموقف الحقيقي للدرس.</p><div class="hero-actions"><button class="primary" data-go="vocab">🚀 ابدأ التجربة</button><button class="ghost" data-go="dialogue">🎭 استوديو الحوار</button><button class="ghost" data-go="resources">📚 مركز الدرس</button></div></div><div class="hero-scene"><img src="${A}classroom-scene.svg" alt="حوار تفاعلي داخل الفصل"><button class="scene-play" id="scenePlay">🔊 اسمع المشهد</button></div></section>
      <nav class="journey"><button data-go="vocab">01 · اكتشف</button><button data-go="dialogue">02 · اسمع وتحدث</button><button data-go="grammar">03 · افهم</button><button data-go="practice">04 · طبّق</button><button data-go="challenge">05 · اختبر</button><button data-go="resources">06 · الموارد</button><button data-go="result">07 · أتقنت</button></nav>
      <section class="mission card"><div><span class="eyebrow blue">MISSION · مهمة اليوم</span><h2>مهمتك: تجهيز حقيبتك للفصل بالفرنسية 🎒</h2><p>تعرف على الأدوات، اسمعها، استعملها في جمل، ثم أثبت إتقانك.</p></div><div class="mission-score"><span id="xp">0</span><small>XP</small><div class="bar"><i id="xpbar"></i></div></div></section>
      <section class="card" id="vocab"><div class="section-head"><div><span class="eyebrow blue">01 · DISCOVER</span><h2>مختبر المفردات · Vocabulaire</h2><p>الصورة تمثل الكلمة نفسها. <b>اضغط الصورة لسماع النطق</b>، ثم افتح المثال لترى استخدامها في جملة.</p></div><button class="soft" id="speakAll">🔊 اسمع المجموعة</button></div><div class="vgrid">${V.map((v,i)=>`<article class="vcard" data-i="${i}"><button class="visual" aria-label="استمع إلى ${v[0]}"><img src="${A+v[2]}" alt="${v[1]}"></button><div class="fr">${v[0]}</div><div class="ar">${v[1]}</div><div class="vactions"><button class="listen">🔊 استمع</button><button class="exampleBtn">💡 مثال</button></div><div class="example hidden"><b>${v[3]}</b><small></small></div></article>`).join('')}</div></section>
      <section class="card" id="dialogue"><div class="section-head"><div><span class="eyebrow pink">02 · LISTEN & SPEAK</span><h2>استوديو الحوار</h2><p>مشهد واحد واضح، شخصيتان ثابتتان، وكل جملة قابلة للاستماع منفردة أو ضمن الحوار الكامل.</p></div><button class="soft" id="playDialogueTop">▶ الحوار كاملًا</button></div><div class="dialogue-layout"><div><div class="dialogue-scene"><img src="${A}classroom-scene.svg" alt="تلميذ وتلميذة داخل الفصل"></div><div class="role-strip"><button class="role-chip" data-role="teacher">👨‍🏫 استمع إلى الأستاذ</button><button class="role-chip" data-role="student">🧑‍🎓 استمع إلى التلميذ</button></div></div><div class="dialogue-list">${D.map((d,i)=>`<button class="line" data-line="${i}"><span>${d[0]}</span><b>${d[1]}</b><i>🔊</i></button>`).join('')}<button class="primary wide" id="playDialogue">▶ استمع للحوار كاملًا</button><button class="soft wide" id="studentRole">🗣️ دور التلميذ — اسمع جُملي فقط</button></div></div></section>
      <section class="card" id="grammar"><div class="section-head"><div><span class="eyebrow gold">03 · GRAMMAIRE LAB</span><h2>مختبر «Il y a»</h2><p>القاعدة مكتوبة كاملة، ثم نحولها إلى بناء جملة حقيقي بدل عرض مثال محفوظ.</p></div></div><div class="grammar-layout"><div class="rule-box"><div class="rule-title">🇫🇷 Il y a / Il n’y a pas de</div><p><strong>Il y a</strong> = يوجد / هناك.</p><p><strong>Il n’y a pas de</strong> = لا يوجد / لا توجد.</p><div class="rule-example" data-say="Il y a un cahier sur le bureau."><strong>🔊 Il y a un cahier sur le bureau.</strong><span>يوجد دفتر على المكتب.</span></div><div class="rule-example" data-say="Il n’y a pas de livre sur la chaise."><strong>🔊 Il n’y a pas de livre sur la chaise.</strong><span>لا يوجد كتاب على الكرسي.</span></div></div><div class="builder"><h3>🧩 ابنِ الجملة</h3><p>الكلمات تظهر بترتيب عشوائي. اخترها لتكوين الجملة الصحيحة.</p><div class="sentence" id="sentence"></div><div class="tokens" id="tokens"></div><button class="soft" id="resetSentence">↺ إعادة الترتيب</button><div id="sentenceFeedback" class="feedback"></div></div></div></section>
      <section class="card" id="practice"><div class="section-head"><div><span class="eyebrow teal">04 · PRACTICE ARENA</span><h2>ساحة «أين توجد؟»</h2><p>اختر صورة الأداة ثم اختر الكلمة الفرنسية المطابقة. لا يكفي أن تعرف الكلمة؛ اربطها بصورتها.</p></div></div><div class="match"><div><h3>🖼️ اختر الصورة</h3><div class="match-options" id="mv">${V.slice(0,6).map((v,i)=>`<button data-i="${i}"><img src="${A+v[2]}" alt="${v[1]}"><span>${v[1]}</span></button>`).join('')}</div></div><div><h3>🇫🇷 اختر الكلمة</h3><div class="match-options" id="mw">${V.slice(0,6).map((v,i)=>`<button data-i="${i}">${v[0]}</button>`).sort(()=>Math.random()-.5).join('')}</div></div></div><div id="matchFeedback" class="feedback"></div></section>
      <section class="card" id="challenge"><div class="section-head"><div><span class="eyebrow purple">05 · CHALLENGE</span><h2>التحدي الذكي · 4 أسئلة</h2><p>كل سؤال مصمم بإجابة محددة، والصورة تُستخدم عندما تكون الصورة هي الدليل الأفضل.</p></div><div class="score"><span id="score">0</span>/4</div></div><div class="quiz">${Q.map((q,i)=>`<article class="q ${q[4]?'has-image':''}"><div><div><span class="qnum">${i+1}</span><b>${q[0]}</b></div>${q[4]?`<div class="desk-question"><img src="${A}notebook.svg" alt="كراسة"><img src="${A}calculator.svg" alt="آلة حاسبة"></div>`:''}</div><div><div class="choices">${q[1].map((a,j)=>`<button data-q="${i}" data-a="${j}">${a}</button>`).join('')}</div><div class="feedback" id="fb${i}"></div></div></article>`).join('')}</div></section>
      <section class="card resources" id="resources"><div class="section-head"><div><span class="eyebrow blue">06 · LESSON HUB</span><h2>مركز ملفات الدرس · Lesson Hub</h2><p>كل ملف له <b>هدف + زمن + XP + مدخل تفاعلي + ملف كامل</b>، حتى لا تكون الملفات مجرد روابط.</p></div></div><div class="hub-progress"><div><strong id="hubDone">0/6</strong><small>موارد مكتملة في رحلة هذا الدرس</small><div class="hub-bar"><i id="hubBar"></i></div></div><span>🏅</span></div><div class="resource-grid">${R.map(resourceCard).join('')}</div></section>
      <section class="card result" id="result"><div class="result-icon">🏆</div><div><span class="eyebrow teal">07 · MAÎTRISE</span><h2>مركز إتقان الدرس</h2><p id="resultText">أكمل الأنشطة والموارد ليظهر تقرير تقدمك هنا.</p><div class="badges"><span>🎧 استماع</span><span>🧰 مفردات</span><span>🧩 قاعدة</span><span>🎯 تطبيق</span><span>📝 اختبار</span></div></div><button class="primary" id="finish">🏁 إنهاء الدرس +50 XP</button></section>
      <div class="resource-panel" id="resourcePanel" aria-hidden="true"><div class="resource-dialog" role="dialog" aria-modal="true"><div class="resource-dialog-head"><div><div class="resource-dialog-icon" id="rpIcon">🎬</div><h2 id="rpTitle">تجربة المورد</h2><p id="rpDesc"></p></div><button class="resource-close" id="rpClose">✕</button></div><div class="resource-goal"><b>🎯 هدف التجربة</b><div id="rpGoal"></div><div class="resource-meta"><span id="rpTime"></span><span id="rpXp"></span></div></div><h3>🧭 اذهب مباشرة إلى الجزء المرتبط</h3><div class="resource-route" id="rpRoute"></div><div class="resource-dialog-actions"><button class="resource-primary" id="rpComplete">✓ أنجزت هذا المورد</button><button class="resource-secondary" id="rpOpenFile">↗ فتح الملف الكامل</button></div></div></div>`;
    initSentence(); bind(); updateHub();
  };

  function initSentence(){
    const tokens=['Il y a','un cahier','sur','le bureau'];
    const shuffled=[...tokens].sort(()=>Math.random()-.5);
    const box=document.getElementById('tokens'); if(!box)return;
    box.innerHTML=shuffled.map(w=>`<button data-word="${w}">${w}</button>`).join('');
    box.querySelectorAll('button').forEach(btn=>btn.onclick=()=>{
      if(btn.classList.contains('used'))return; btn.classList.add('used');
      const chosen=document.createElement('button'); chosen.className='chosen'; chosen.textContent=btn.dataset.word; chosen.dataset.word=btn.dataset.word;
      chosen.onclick=()=>{btn.classList.remove('used');chosen.remove();checkSentence();};
      document.getElementById('sentence').appendChild(chosen); checkSentence();
    });
    document.getElementById('sentence').innerHTML=''; document.getElementById('sentenceFeedback').textContent='';
  }
  function checkSentence(){const words=[...document.querySelectorAll('#sentence .chosen')].map(x=>x.dataset.word);const fb=document.getElementById('sentenceFeedback');if(words.join(' ')==='Il y a un cahier sur le bureau'){fb.textContent='✅ ممتاز! بنيت جملة صحيحة من كلمات عشوائية.';add(6);complete('sentence');}else if(words.length===4)fb.textContent='↺ الترتيب غير صحيح. اضغط على كلمة في الجملة لإعادتها ثم جرّب.';else fb.textContent='';}
  function openResource(key){const r=R.find(x=>x.key===key);if(!r)return;document.getElementById('rpIcon').textContent=r.icon;document.getElementById('rpTitle').textContent=r.title;document.getElementById('rpDesc').textContent=r.desc;document.getElementById('rpGoal').textContent=r.goal;document.getElementById('rpTime').textContent=`⏱ ${r.time}`;document.getElementById('rpXp').textContent=`⭐ +${r.xp} XP`;document.getElementById('rpOpenFile').onclick=()=>location.href=ROOT+r.file;document.getElementById('rpComplete').onclick=()=>{markResourceDone(r.key);closeResource();};const route=[['vocab','🧰 المفردات'],['dialogue','🎭 الحوار'],['grammar','🧩 القاعدة'],['practice','🎯 التطبيق'],['challenge','📝 الاختبار'],['resources','📚 المركز']];document.getElementById('rpRoute').innerHTML=route.map(([t,l])=>`<button class="${t===r.target?'active':''}" data-rp-go="${t}">${l}</button>`).join('');document.querySelectorAll('[data-rp-go]').forEach(btn=>btn.onclick=()=>{closeResource();document.getElementById(btn.dataset.rpGo)?.scrollIntoView({behavior:'smooth',block:'start'});});const p=document.getElementById('resourcePanel');p.classList.add('open');p.setAttribute('aria-hidden','false');}
  function closeResource(){const p=document.getElementById('resourcePanel');p.classList.remove('open');p.setAttribute('aria-hidden','true');}
  function updateHub(){const done=R.filter(r=>resourceDone[r.key]).length;const el=document.getElementById('hubDone'),bar=document.getElementById('hubBar');if(el)el.textContent=`${done}/6`;if(bar)bar.style.width=`${done/6*100}%`;R.forEach(r=>{const c=document.querySelector(`[data-resource="${r.key}"]`);if(!c)return;const s=c.querySelector('.resource-status'),b=c.querySelector('[data-resource-start]');if(resourceDone[r.key]){c.classList.add('done');s.classList.add('done');s.textContent='✓ مكتمل';b.classList.add('done');b.textContent='✓ راجع التجربة';}});}

  function bind(){
    document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{document.getElementById(b.dataset.go)?.scrollIntoView({behavior:'smooth',block:'start'});document.querySelectorAll('.journey button').forEach(x=>x.classList.remove('active'));document.querySelectorAll(`.journey [data-go="${b.dataset.go}"]`).forEach(x=>x.classList.add('active'));});
    document.querySelectorAll('.visual,.listen').forEach(b=>b.onclick=e=>{e.stopPropagation();const v=V[+b.closest('.vcard').dataset.i];speechRun++;if('speechSynthesis'in window)speechSynthesis.cancel();speak(v[0]);b.closest('.vcard').classList.add('played');complete('v'+b.closest('.vcard').dataset.i);});
    document.querySelectorAll('.exampleBtn').forEach(b=>b.onclick=e=>{e.stopPropagation();const box=b.closest('.vcard').querySelector('.example');box.classList.toggle('hidden');b.textContent=box.classList.contains('hidden')?'💡 مثال':'✕ أغلق المثال';});
    document.getElementById('speakAll').onclick=()=>{sequence(V.map(v=>({text:v[0]})),220);add(4);};
    document.getElementById('scenePlay').onclick=()=>{sequence(D.map(d=>({text:d[1]})),300);add(3);};
    document.querySelectorAll('.line').forEach(b=>b.onclick=()=>{document.querySelectorAll('.line').forEach(x=>x.classList.remove('active'));b.classList.add('active');const i=+b.dataset.line;sequence([{text:D[i][1]}],0);complete('dialogue'+i);});
    const playDialogue=()=>sequence(D.map(d=>({text:d[1]})),320,(i)=>{document.querySelectorAll('.line').forEach(x=>x.classList.remove('active'));document.querySelector(`.line[data-line="${i}"]`)?.classList.add('active');});
    document.getElementById('playDialogue').onclick=()=>{playDialogue();add(5);}; document.getElementById('playDialogueTop').onclick=()=>{document.getElementById('dialogue').scrollIntoView({behavior:'smooth'});playDialogue();};
    document.getElementById('studentRole').onclick=()=>{sequence(D.filter(d=>d[0]==='Élève').map(d=>({text:d[1]})),350);add(4);};
    document.querySelectorAll('[data-role]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-role]').forEach(x=>x.classList.remove('active'));b.classList.add('active');const role=b.dataset.role==='teacher'?'Professeur':'Élève';sequence(D.filter(d=>d[0]===role).map(d=>({text:d[1]})),320);});
    document.querySelectorAll('.rule-example').forEach(b=>b.onclick=()=>{speechRun++;if('speechSynthesis'in window)speechSynthesis.cancel();speak(b.dataset.say);complete('rule-audio');});
    document.getElementById('resetSentence').onclick=initSentence;
    let left=null,right=null;const clearSelection=()=>document.querySelectorAll('#mv button,#mw button').forEach(x=>x.classList.remove('selected'));
    const check=()=>{if(left===null||right===null)return;const ok=left===right;document.getElementById('matchFeedback').textContent=ok?'✅ تطابق صحيح — أحسنت!':'↺ ليس هذا التطابق، جرّب مرة أخرى.';if(ok){document.querySelectorAll(`#mv [data-i="${left}"],#mw [data-i="${left}"]`).forEach(x=>{x.classList.remove('selected');x.classList.add('matched');x.disabled=true;});complete('match'+left);}else setTimeout(clearSelection,350);left=right=null;};
    document.querySelectorAll('#mv button').forEach(x=>x.onclick=()=>{if(x.disabled)return;left=+x.dataset.i;x.classList.add('selected');check();});document.querySelectorAll('#mw button').forEach(x=>x.onclick=()=>{if(x.disabled)return;right=+x.dataset.i;x.classList.add('selected');check();});
    const done={};document.querySelectorAll('.choices button').forEach(x=>x.onclick=()=>{const qi=+x.dataset.q,ai=+x.dataset.a;if(done[qi])return;done[qi]=1;const ok=ai===Q[qi][2];x.classList.add(ok?'correct':'wrong');if(!ok)document.querySelectorAll(`[data-q="${qi}"]`)[Q[qi][2]].classList.add('correct');document.getElementById('fb'+qi).textContent=ok?'✅ إجابة صحيحة.':'💡 الإجابة الصحيحة مميزة.';if(ok){score++;document.getElementById('score').textContent=score;add(5);}complete('q'+qi);});
    document.querySelectorAll('[data-resource-start]').forEach(btn=>btn.onclick=()=>openResource(btn.dataset.resourceStart));document.getElementById('rpClose').onclick=closeResource;document.getElementById('resourcePanel').onclick=e=>{if(e.target.id==='resourcePanel')closeResource();};
    document.getElementById('finish').onclick=()=>{add(50);localStorage.setItem('hm:lastLesson',id);localStorage.setItem('hm:lesson1Score',String(score));localStorage.setItem('hm:lesson1Resources',JSON.stringify(resourceDone));if(typeof markLessonComplete==='function')markLessonComplete(id,'lesson-finish','grammar');document.getElementById('resultText').textContent=`🎉 تم تسجيل الإنجاز. نتيجتك ${score}/4 — ${R.filter(r=>resourceDone[r.key]).length}/6 موارد مكتملة — إجمالي XP في هذه الجلسة: ${xp}.`;document.getElementById('finish').disabled=true;document.getElementById('finish').textContent='✓ تم تسجيل الإنجاز';};
  }

  render();
})();