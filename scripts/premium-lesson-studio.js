'use strict';
(() => {
  const A = 'assets/lessons/grade8-u1-l1/';
  const ROOT = 'data/lessons/grade-8/unit-1/';
  const id = new URLSearchParams(location.search).get('id') || 'grade8-u1-l1';
  const app = document.getElementById('app');

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
    ['Qu’est-ce qu’il y a sur le bureau ?',['Un cahier et une calculatrice','Un sac à dos et une gomme','Des ciseaux et une règle'],0],
    ['Complète : « Il y a ___ crayon. »',['une','un','des'],1],
    ['Où sont les ciseaux ?',['dans la trousse','sur le tableau','dans le livre'],0]
  ];

  const R = [
    {key:'interactive',icon:'🎬',title:'الشرح التفاعلي',desc:'الرحلة الأساسية للدرس: اكتشاف المفردات، الاستماع، الحوار، القاعدة، والتطبيق.',goal:'افهم المفردات واستعملها في سياق الفصل.',time:'8–12 دقيقة',xp:15,target:'vocab',file:'lesson-1-interactive.html',external:'افتح النسخة الكاملة'},
    {key:'reference',icon:'📖',title:'المرجع التعليمي',desc:'ورقة مراجعة منظمة تجمع الكلمات والقواعد والأمثلة في مكان واحد.',goal:'راجع الدرس بسرعة قبل النشاط أو الاختبار.',time:'3–5 دقائق',xp:8,target:'grammar',file:'reference_lecon1_unite1.html',external:'افتح المرجع'},
    {key:'formal',icon:'🎯',title:'التقييم المستقل',desc:'تقييم رسمي منفصل لقياس الإتقان بعد التعلم، دون كشف الإجابات قبل المحاولة.',goal:'أثبت أنك أتقنت أهداف الدرس.',time:'5–8 دقائق',xp:20,target:'challenge',file:'formal_assessment_lecon1_unite1.html',external:'ابدأ التقييم'},
    {key:'interactive-assessment',icon:'🧠',title:'التقييم التفاعلي',desc:'تحديات قصيرة وسريعة لقياس المفردات والفهم والتطبيق بطريقة تفاعلية.',goal:'اختبر نفسك بطريقة أسرع وأكثر نشاطًا.',time:'4–6 دقائق',xp:12,target:'challenge',file:'interactive_assessment_lecon1_unite1.html',external:'ابدأ التحدي'},
    {key:'games',icon:'🎮',title:'مركز الألعاب',desc:'مساحات تدريب إضافية للمطابقة والذاكرة والمفردات والأنشطة الممتدة.',goal:'ثبّت الكلمات من خلال اللعب والممارسة.',time:'5–10 دقائق',xp:12,target:'practice',file:'lesson-1-games.html',external:'ادخل مركز الألعاب'},
    {key:'pronunciation',icon:'🗣️',title:'تحدي النطق',desc:'تدريب صوتي مرتبط مباشرة بمفردات هذا الدرس، وليس نشاطًا منفصلًا بلا سياق.',goal:'استمع وكرر الكلمات الفرنسية بنطق أوضح.',time:'3–6 دقائق',xp:10,target:'vocab',file:'pronunciation_challenge_lecon1_unite1.html',external:'تدرّب على النطق'}
  ];

  const style = document.createElement('style');
  style.textContent = `
    .resource-grid article{position:relative;min-height:280px;display:flex;flex-direction:column;overflow:hidden}
    .resource-grid article.done{border-color:#6bc89b;background:linear-gradient(180deg,#fff,#f1fbf6)}
    .resource-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
    .resource-icon{font-size:34px;margin-bottom:8px}
    .resource-status{font-size:11px;font-weight:900;padding:6px 9px;border-radius:99px;background:#edf3ff;color:#285aa7;white-space:nowrap}
    .resource-status.done{background:#eaf8f1;color:#16885a}
    .resource-meta{display:flex;gap:7px;flex-wrap:wrap;margin:8px 0}
    .resource-meta span{font-size:11px;font-weight:900;padding:6px 8px;border-radius:99px;background:#f3f6fa;color:#61718a}
    .resource-actions{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:auto}
    .resource-actions button,.resource-actions a{border:0;border-radius:12px;padding:10px 8px;font-weight:900;cursor:pointer;text-align:center;text-decoration:none}
    .resource-start{background:#2364e8;color:#fff}
    .resource-file{background:#edf3ff;color:#285aa7}
    .resource-start.done{background:#16885a}
    .resource-panel{position:fixed;inset:0;background:#102b5766;backdrop-filter:blur(8px);z-index:200;display:none;padding:18px;align-items:center;justify-content:center}
    .resource-panel.open{display:flex}
    .resource-dialog{width:min(720px,100%);max-height:90vh;overflow:auto;background:#fff;border-radius:28px;box-shadow:0 30px 80px #102b5740;padding:24px;direction:rtl}
    .resource-dialog-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px}
    .resource-dialog-icon{width:64px;height:64px;border-radius:20px;background:#edf3ff;display:grid;place-items:center;font-size:34px}
    .resource-close{border:0;background:#f1f4f8;border-radius:12px;padding:9px 12px;font-weight:900;cursor:pointer}
    .resource-goal{padding:15px;border-radius:16px;background:linear-gradient(135deg,#f3f7ff,#eefbf8);margin:16px 0}
    .resource-goal b{color:#173d67}
    .resource-route{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:16px 0}
    .resource-route button{border:1px solid #dfe6ef;background:#fff;border-radius:13px;padding:11px 8px;font-weight:900;cursor:pointer}
    .resource-route button.active{background:#2364e8;color:#fff;border-color:#2364e8}
    .resource-dialog-actions{display:grid;grid-template-columns:1fr 1fr;gap:9px}
    .resource-dialog-actions button,.resource-dialog-actions a{border:0;border-radius:13px;padding:13px;text-align:center;font-weight:900;text-decoration:none;cursor:pointer}
    .resource-primary{background:#e92b82;color:#fff}
    .resource-secondary{background:#edf3ff;color:#285aa7}
    .hub-progress{display:grid;grid-template-columns:1fr auto;gap:15px;align-items:center;padding:15px 17px;border-radius:20px;background:#f4f8ff;border:1px solid #dfe6ef;margin-bottom:14px}
    .hub-progress strong{font-size:25px;color:#2364e8}
    .hub-progress small{color:#68758a;font-weight:800}
    .hub-bar{height:9px;background:#dfe7f4;border-radius:99px;overflow:hidden;margin-top:8px}
    .hub-bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#2364e8,#11a596);transition:.3s}
    @media(max-width:650px){.resource-actions,.resource-dialog-actions{grid-template-columns:1fr}.resource-route{grid-template-columns:1fr}.resource-dialog{padding:18px;border-radius:22px}}
  `;
  document.head.appendChild(style);

  let xp = 0, score = 0;
  const completed = new Set();
  const resourceStateKey = `hm:lesson:${id}:resources`;
  let resourceDone = JSON.parse(localStorage.getItem(resourceStateKey) || '{}');

  const say = text => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text); u.lang='fr-FR'; u.rate=.8;
    window.speechSynthesis.speak(u);
  };
  const add = n => {
    xp += n;
    const e=document.getElementById('xp'), b=document.getElementById('xpbar');
    if(e)e.textContent=xp; if(b)b.style.width=Math.min(100,xp/1.5)+'%';
  };
  const complete = key => { if(!completed.has(key)){completed.add(key);add(3);} };
  const toast = text => { const el=document.getElementById('toast'); if(!el)return; el.textContent=text; el.classList.add('show'); clearTimeout(toast.t); toast.t=setTimeout(()=>el.classList.remove('show'),2200); };
  const markResourceDone = key => {
    if(resourceDone[key]) return;
    resourceDone[key]=true; localStorage.setItem(resourceStateKey,JSON.stringify(resourceDone));
    add((R.find(r=>r.key===key)||{xp:0}).xp); updateHub(); toast('✓ تم تسجيل هذا المورد في رحلة الدرس');
  };

  const resourceCard = r => {
    const done=!!resourceDone[r.key];
    return `<article data-resource="${r.key}" class="${done?'done':''}"><div class="resource-top"><div><div class="resource-icon">${r.icon}</div><b>${r.title}</b></div><span class="resource-status ${done?'done':''}">${done?'✓ مكتمل':`+${r.xp} XP`}</span></div><p>${r.desc}</p><div class="resource-meta"><span>🎯 ${r.goal}</span><span>⏱ ${r.time}</span></div><div class="resource-actions"><button class="resource-start ${done?'done':''}" data-resource-start="${r.key}">${done?'✓ راجع التجربة':'ابدأ التجربة'}</button><a class="resource-file" href="${ROOT+r.file}">${r.external} ↗</a></div></article>`;
  };

  function render(){
    app.innerHTML=`
      <section class="studio-hero"><div class="hero-copy"><span class="unit">UNITÉ 1 · LEÇON 1</span><div class="eyebrow">في المدرسة · Learning Studio</div><h1>في المدرسة</h1><p class="fr-title">Leçon 1 : À l’école</p><p class="sub">رحلة تعليمية كاملة: <b>اكتشف → اسمع → افهم → تفاعل → طبّق → اختبر</b>. المحتوى مرتبط بموضوع الدرس وليس مجرد بطاقات منفصلة.</p><div class="hero-actions"><button class="primary" data-go="vocab">🚀 ابدأ التجربة</button><button class="ghost" data-go="dialogue">🎭 استوديو الحوار</button><button class="ghost" data-go="resources">📚 مركز الدرس</button></div></div><div class="hero-scene"><img src="${A}classroom-scene.svg" alt="مشهد تعليمي داخل الفصل"><button class="scene-play" id="scenePlay">🔊 استمع للمشهد</button></div></section>
      <nav class="journey"><button data-go="vocab">01 · اكتشف</button><button data-go="dialogue">02 · اسمع وتحدث</button><button data-go="grammar">03 · افهم</button><button data-go="practice">04 · طبّق</button><button data-go="challenge">05 · اختبر</button><button data-go="resources">06 · الموارد</button><button data-go="result">07 · أتقنت</button></nav>
      <section class="mission card"><div><span class="eyebrow blue">MISSION · مهمة اليوم</span><h2>مهمتك: تجهيز حقيبتك للفصل بالفرنسية 🎒</h2><p>تعرف على الأدوات، استمع إليها، استخدمها في جمل، ثم أثبت إتقانك في التحدي.</p></div><div class="mission-score"><span id="xp">0</span><small>XP</small><div class="bar"><i id="xpbar"></i></div></div></section>
      <section class="card" id="vocab"><div class="section-head"><div><span class="eyebrow blue">01 · DISCOVER</span><h2>مختبر المفردات · Vocabulaire</h2><p>كل صورة تمثل الكلمة نفسها. <b>اضغط الصورة</b> لسماع النطق، ثم افتح المثال.</p></div><button class="soft" id="speakAll">🔊 اسمع المجموعة</button></div><div class="vgrid">${V.map((v,i)=>`<article class="vcard" data-i="${i}"><button class="visual" aria-label="تشغيل ${v[0]}"><img src="${A+v[2]}" alt="${v[1]}"><span>🎧 اضغط على الصورة</span></button><div class="fr">${v[0]}</div><div class="ar">${v[1]}</div><div class="vactions"><button class="listen">🔊 اسمع</button><button class="exampleBtn">💡 مثال</button></div><div class="example hidden">${v[3]}</div></article>`).join('')}</div></section>
      <section class="card" id="dialogue"><div class="section-head"><div><span class="eyebrow pink">02 · LISTEN & SPEAK</span><h2>استوديو الحوار</h2><p>الموقف: ماذا يوجد على المكتب؟ وماذا يوجد داخل المقلمة؟</p></div></div><div class="dialogue-layout"><div class="dialogue-scene"><img src="${A}classroom-scene.svg" alt="مشهد حوار داخل الفصل"><div class="role-strip"><span>👨‍🏫 Professeur</span><span>🧑‍🎓 Élève</span></div></div><div class="dialogue-list">${D.map((d,i)=>`<button class="line" data-line="${i}"><span>${d[0]}</span><b>${d[1]}</b><i>🔊</i></button>`).join('')}<button class="primary wide" id="playDialogue">▶ استمع للحوار كاملًا</button><button class="soft wide" id="studentRole">🗣️ أنا الطالب — شغّل دوري</button></div></div></section>
      <section class="card" id="grammar"><div class="section-head"><div><span class="eyebrow gold">03 · GRAMMAIRE LAB</span><h2>مختبر «Il y a»</h2><p>نحوّل القاعدة إلى جملة مرتبطة مباشرة بأدوات الفصل.</p></div></div><div class="grammar-layout"><div class="rule-box"><div class="rule-title">🇫🇷 Il y a / Il n’y a pas de</div><p><strong>Il y a</strong> = يوجد / هناك.</p><p><strong>Il n’y a pas de</strong> = لا يوجد / لا توجد.</p><div class="rule-ar">مثال: Il y a un cahier sur le bureau.<br>يوجد كراسٍ على المكتب.</div><button class="soft wide" id="speakRule">🔊 اسمع الأمثلة</button></div><div class="builder"><h3>🧩 ابنِ الجملة</h3><p>كوّن الجملة بالترتيب الصحيح.</p><div class="sentence" id="sentence"></div><div class="tokens">${['Il y a','un cahier','sur','le bureau'].map(x=>`<button data-word="${x}">${x}</button>`).join('')}</div><button class="soft" id="resetSentence">↺ إعادة</button><div id="sentenceFeedback" class="feedback"></div></div></div></section>
      <section class="card" id="practice"><div class="section-head"><div><span class="eyebrow teal">04 · PRACTICE ARENA</span><h2>ساحة «أين توجد؟»</h2><p>اربط صورة الأداة بالكلمة الفرنسية الصحيحة.</p></div></div><div class="match"><div><h3>🖼️ اختر الصورة</h3><div class="match-options" id="mv">${V.slice(0,6).map((v,i)=>`<button data-i="${i}"><img src="${A+v[2]}" alt=""><span>${v[1]}</span></button>`).join('')}</div></div><div><h3>🇫🇷 اختر الكلمة</h3><div class="match-options" id="mw">${V.slice(0,6).map((v,i)=>`<button data-i="${i}">${v[0]}</button>`).sort(()=>Math.random()-.5).join('')}</div></div></div><div id="matchFeedback" class="feedback"></div></section>
      <section class="card" id="challenge"><div class="section-head"><div><span class="eyebrow purple">05 · CHALLENGE</span><h2>التحدي الذكي · 4 أسئلة</h2><p>الإجابة لا تظهر إلا بعد المحاولة.</p></div><div class="score"><span id="score">0</span>/4</div></div><div class="quiz">${Q.map((q,i)=>`<article class="q"><div><span class="qnum">${i+1}</span><b>${q[0]}</b></div><div class="choices">${q[1].map((a,j)=>`<button data-q="${i}" data-a="${j}">${a}</button>`).join('')}</div><div class="feedback" id="fb${i}"></div></article>`).join('')}</div></section>
      <section class="card resources" id="resources"><div class="section-head"><div><span class="eyebrow blue">06 · LESSON HUB</span><h2>مركز ملفات الدرس · Lesson Hub</h2><p>ليست «روابط». كل مورد له <b>هدف + زمن + XP + تجربة داخل الاستوديو + ملف كامل</b>.</p></div></div><div class="hub-progress"><div><strong id="hubDone">0/6</strong><small>موارد مكتملة في رحلة هذا الدرس</small><div class="hub-bar"><i id="hubBar"></i></div></div><span>🏅</span></div><div class="resource-grid">${R.map(resourceCard).join('')}</div></section>
      <section class="card result" id="result"><div class="result-icon">🏆</div><div><span class="eyebrow teal">07 · MAÎTRISE</span><h2>مركز إتقان الدرس</h2><p id="resultText">أكمل الأنشطة والموارد ليظهر تقرير تقدمك هنا.</p><div class="badges"><span>🎧 استماع</span><span>🧰 مفردات</span><span>🧩 قاعدة</span><span>🎯 تطبيق</span><span>📝 اختبار</span></div></div><button class="primary" id="finish">🏁 إنهاء الدرس +50 XP</button></section>
      <div class="resource-panel" id="resourcePanel" aria-hidden="true"><div class="resource-dialog" role="dialog" aria-modal="true"><div class="resource-dialog-head"><div><div class="resource-dialog-icon" id="rpIcon">🎬</div><h2 id="rpTitle">تجربة المورد</h2><p id="rpDesc"></p></div><button class="resource-close" id="rpClose">✕</button></div><div class="resource-goal"><b>🎯 هدف التجربة</b><div id="rpGoal"></div><div class="resource-meta"><span id="rpTime"></span><span id="rpXp"></span></div></div><h3>🧭 أين ستتعلم الآن؟</h3><div class="resource-route" id="rpRoute"></div><div class="resource-dialog-actions"><button class="resource-primary" id="rpComplete">✓ أنجزت هذا المورد</button><button class="resource-secondary" id="rpOpenFile">↗ فتح الملف الكامل</button></div></div></div>`;
    bind(); updateHub();
  }

  function openResource(key){
    const r=R.find(x=>x.key===key); if(!r)return;
    document.getElementById('rpIcon').textContent=r.icon;
    document.getElementById('rpTitle').textContent=r.title;
    document.getElementById('rpDesc').textContent=r.desc;
    document.getElementById('rpGoal').textContent=r.goal;
    document.getElementById('rpTime').textContent=`⏱ ${r.time}`;
    document.getElementById('rpXp').textContent=`⭐ +${r.xp} XP`;
    document.getElementById('rpOpenFile').onclick=()=>{location.href=ROOT+r.file;};
    document.getElementById('rpComplete').onclick=()=>{markResourceDone(r.key);closeResource();};
    const route=[['vocab','🧰 المفردات'],['dialogue','🎭 الحوار'],['grammar','🧩 القاعدة'],['practice','🎯 التطبيق'],['challenge','📝 الاختبار'],['resources','📚 المركز']];
    document.getElementById('rpRoute').innerHTML=route.map(([target,label])=>`<button class="${target===r.target?'active':''}" data-rp-go="${target}">${label}</button>`).join('');
    document.querySelectorAll('[data-rp-go]').forEach(btn=>btn.onclick=()=>{closeResource();document.getElementById(btn.dataset.rpGo)?.scrollIntoView({behavior:'smooth',block:'start'});});
    const panel=document.getElementById('resourcePanel'); panel.classList.add('open'); panel.setAttribute('aria-hidden','false');
  }
  function closeResource(){const panel=document.getElementById('resourcePanel');panel.classList.remove('open');panel.setAttribute('aria-hidden','true');}
  function updateHub(){
    const done=R.filter(r=>resourceDone[r.key]).length;
    const el=document.getElementById('hubDone'),bar=document.getElementById('hubBar');
    if(el)el.textContent=`${done}/6`; if(bar)bar.style.width=`${done/6*100}%`;
    R.forEach(r=>{const card=document.querySelector(`[data-resource="${r.key}"]`);if(!card)return;const status=card.querySelector('.resource-status'),btn=card.querySelector('[data-resource-start]');if(resourceDone[r.key]){card.classList.add('done');status.classList.add('done');status.textContent='✓ مكتمل';btn.classList.add('done');btn.textContent='✓ راجع التجربة';}});
  }

  function bind(){
    document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{document.getElementById(b.dataset.go)?.scrollIntoView({behavior:'smooth',block:'start'});document.querySelectorAll('.journey button').forEach(x=>x.classList.remove('active'));b.classList.add('active');});
    document.querySelectorAll('.visual,.listen').forEach(b=>b.onclick=e=>{e.stopPropagation();const v=V[+b.closest('.vcard').dataset.i];say(v[0]);b.closest('.vcard').classList.add('played');complete('v'+b.closest('.vcard').dataset.i);});
    document.querySelectorAll('.exampleBtn').forEach(b=>b.onclick=()=>b.closest('.vcard').querySelector('.example').classList.toggle('hidden'));
    document.getElementById('speakAll').onclick=()=>{let i=0;(function next(){if(i<V.length){say(V[i++][0]);setTimeout(next,900);}})();add(4);};
    document.getElementById('scenePlay').onclick=()=>{say('À l’école. Il y a un cahier sur le bureau. Il y a un stylo dans la trousse.');add(3);};
    document.querySelectorAll('.line').forEach(b=>b.onclick=()=>{say(D[+b.dataset.line][1]);add(1);});
    document.getElementById('playDialogue').onclick=()=>{let i=0;(function next(){if(i<D.length){say(D[i++][1]);setTimeout(next,1250);}})();add(5);};
    document.getElementById('studentRole').onclick=()=>{[D[1][1],D[3][1],D[5][1]].forEach((t,i)=>setTimeout(()=>say(t),i*1800));add(6);};
    document.getElementById('speakRule').onclick=()=>{say('Il y a un cahier sur le bureau. Il n’y a pas de livre sur la chaise.');add(3);};
    let sentence=[];document.querySelectorAll('.tokens button').forEach(b=>b.onclick=()=>{if(sentence.includes(b.dataset.word))return;sentence.push(b.dataset.word);document.getElementById('sentence').innerHTML=sentence.map(x=>`<button class="chosen">${x}</button>`).join(' ');if(sentence.join(' ')==='Il y a un cahier sur le bureau'){document.getElementById('sentenceFeedback').textContent='✅ ممتاز! جملة صحيحة مرتبطة بموقف الفصل.';add(6);}});
    document.getElementById('resetSentence').onclick=()=>{sentence=[];document.getElementById('sentence').innerHTML='';document.getElementById('sentenceFeedback').textContent='';};
    let a=null,b=null;const check=()=>{if(a===null||b===null)return;const ok=a===b;document.getElementById('matchFeedback').textContent=ok?'✅ تطابق صحيح — استمر!':'↺ ليس هذا التطابق، جرّب مرة أخرى.';if(ok){complete('m'+a);document.querySelectorAll(`#mv [data-i="${a}"],#mw [data-i="${a}"]`).forEach(x=>x.classList.add('matched'));}a=b=null;};
    document.querySelectorAll('#mv button').forEach(x=>x.onclick=()=>{a=+x.dataset.i;x.classList.add('selected');check();});
    document.querySelectorAll('#mw button').forEach(x=>x.onclick=()=>{b=+x.dataset.i;x.classList.add('selected');check();});
    const done={};document.querySelectorAll('.choices button').forEach(x=>x.onclick=()=>{const qi=+x.dataset.q,ai=+x.dataset.a;if(done[qi])return;done[qi]=1;const ok=ai===Q[qi][2];x.classList.add(ok?'correct':'wrong');if(!ok)document.querySelectorAll(`[data-q="${qi}"]`)[Q[qi][2]].classList.add('correct');document.getElementById('fb'+qi).textContent=ok?'✅ إجابة صحيحة.':'💡 الإجابة الصحيحة مميزة.';if(ok){score++;document.getElementById('score').textContent=score;add(5);}complete('q'+qi);});
    document.querySelectorAll('[data-resource-start]').forEach(btn=>btn.onclick=()=>openResource(btn.dataset.resourceStart));
    document.getElementById('rpClose').onclick=closeResource;document.getElementById('resourcePanel').onclick=e=>{if(e.target.id==='resourcePanel')closeResource();};
    document.getElementById('finish').onclick=()=>{add(50);localStorage.setItem('hm:lastLesson',id);localStorage.setItem('hm:lesson1Score',String(score));localStorage.setItem('hm:lesson1Resources',JSON.stringify(resourceDone));if(typeof markLessonComplete==='function')markLessonComplete(id,'lesson-finish','grammar');document.getElementById('resultText').textContent=`🎉 تم تسجيل الإنجاز. نتيجتك ${score}/4 — ${R.filter(r=>resourceDone[r.key]).length}/6 موارد مكتملة — إجمالي XP في هذه الجلسة: ${xp}.`;document.getElementById('finish').disabled=true;document.getElementById('finish').textContent='✓ تم تسجيل الإنجاز';};
  }
  render();
})();
