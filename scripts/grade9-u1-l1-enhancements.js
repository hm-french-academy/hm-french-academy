(function(){
  'use strict';
  function boot(){
    var panel=document.getElementById('panel');
    if(!panel||typeof window.go!=='function') return;

    var vocab=[
      ['le football','كرة القدم','⚽','Je joue au football.'],['le ping-pong','تنس الطاولة','🏓','Je joue au ping-pong.'],['le karaté','الكاراتيه','🥋','Je pratique le karaté.'],['le cyclisme / le vélo','ركوب الدراجات','🚴','Je fais du vélo.'],['la boxe','الملاكمة','🥊','Je pratique la boxe.'],['la natation','السباحة','🏊','Je fais de la natation.'],['le tennis','التنس','🎾','Je joue au tennis.'],['le basket-ball','كرة السلة','🏀','Je joue au basket-ball.'],['le volley-ball','الكرة الطائرة','🏐','Je joue au volley-ball.'],["l'équitation",'الفروسية','🏇',"Je fais de l'équitation."],["l'escrime",'المبارزة','🤺',"Je pratique l'escrime."],['le ski','التزلج','⛷️','Je fais du ski.'],['le judo','الجودو','🥋','Je pratique le judo.'],['le rugby','الرجبي','🏉','Je joue au rugby.'],['la pêche','صيد السمك','🎣','Je pratique la pêche.'],['la voile','الإبحار','⛵','Je fais de la voile.'],['la gymnastique','الجمباز','🤸','Je fais de la gymnastique.'],['les échecs','الشطرنج','♟️','Je joue aux échecs.'],['la marche','المشي','🚶','Je fais de la marche.'],['la randonnée','التنزه','🥾','Je fais de la randonnée.']
    ];
    var notes={
      'le football':'le: e في football تُنطق مثل «أُ/و» خفيفة، و ll لا تُنطق كحرفين منفصلين.',
      'le ping-pong':'ping: in صوت أنفي؛ و pong: on صوت أنفي.',
      'le karaté':'é في النهاية صوت /e/ واضح مثل «إيه».',
      'le cyclisme / le vélo':'cy في cyclisme تبدأ بصوت /si/؛ و é في vélo صوت /e/.',
      'la boxe':'x في boxe تُنطق /ks/؛ و e النهائية لا تُنطق.',
      'la natation':'tion في النهاية تُنطق تقريبًا /sjɔ̃/، و a الأخيرة ليست صوتًا مستقلًا.',
      'le tennis':'e الأولى قصيرة؛ و s بين الحركتين تُنطق /s/ هنا.',
      'le basket-ball':'a واضحة، و t النهائية في basket تُسمع.',
      'le volley-ball':'y تعطي صوتًا قريبًا من /j/، و ball تُنطق في المقطع الأخير.',
      "l'équitation":'l’ جزء من النطق المتصل، و équ تُنطق /e.ki/ تقريبًا؛ qu تُنطق /k/، و tion في النهاية صوت أنفي.',
      "l'escrime":'l’ لا تُنطق كلمة مستقلة؛ es في البداية /ɛs/، و cr /kʁ/، و e النهائية لا تُنطق.',
      'le ski':'sk تُنطق متتابعة /sk/، و i صوت /i/.',
      'le judo':'j تُنطق /ʒ/ مثل ج الفرنسية، و o النهائية واضحة.',
      'le rugby':'r فرنسية /ʁ/، و u في المقطع الأول صوت فرنسي خاص.',
      'la pêche':'ê تُنطق /ɛ/، و ch تُنطق /ʃ/ مثل «ش».',
      'la voile':'oi تُنطق /wa/ تقريبًا، و e النهائية لا تُنطق.',
      'la gymnastique':'gy تُنطق /ʒi/، و que في النهاية /k/.',
      'les échecs':'les تُوصل بالاسم، و ch تُنطق /ʃ/، و s النهائية لا تُنطق.',
      'la marche':'ch تُنطق /ʃ/ مثل «ش»، و e النهائية لا تُنطق.',
      'la randonnée':'an و on أصوات أنفية، و é في البداية صوت /e/.'
    };
    var conv=[
      ['Sara','Quel sport pratiques-tu ?','ما الرياضة التي تمارسها؟','Quel sport pratiques-tu ?'],
      ['Adam','Je pratique le football.','أنا أمارس كرة القدم.','Je pratique le football.'],
      ['Sara',"Qu'est-ce que tu préfères ?",'ماذا تفضل؟',"Qu'est-ce que tu préfères ?"],
      ['Adam','Je préfère le tennis.','أفضل التنس.','Je préfère le tennis.'],
      ['Sara','Où pratiques-tu ton sport préféré ?','أين تمارس رياضتك المفضلة؟','Où pratiques-tu ton sport préféré ?'],
      ['Adam','Je le pratique au club.','أمارسها في النادي.','Je le pratique au club.'],
      ['Sara','Tu fais du sport ?','هل تمارس الرياضة؟','Tu fais du sport ?'],
      ['Adam','Oui, je fais de la natation.','نعم، أمارس السباحة.','Oui, je fais de la natation.']
    ];
    var esc=function(s){return String(s??'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};

    // Keep the existing page/runtime, but replace only the requested learning sections.
    var originalSpeak=window.speak;
    window.speak=function(text){
      var s=String(text||'').trim();
      if(!s||!window.speechSynthesis||!window.SpeechSynthesisUtterance){if(typeof originalSpeak==='function')return originalSpeak(text);return;}
      try{
        speechSynthesis.cancel();
        if(speechSynthesis.paused)speechSynthesis.resume();
        var u=new SpeechSynthesisUtterance(s);
        u.lang='fr-FR';u.rate=.78;u.pitch=1;u.volume=1;
        var voices=speechSynthesis.getVoices();
        var voice=voices.find(function(v){return /^fr[-_]FR$/i.test(v.lang)})||voices.find(function(v){return /^fr[-_]/i.test(v.lang)});
        if(voice)u.voice=voice;
        speechSynthesis.speak(u);
      }catch(e){try{if(typeof originalSpeak==='function')originalSpeak(text)}catch(_){}}
    };

    function button(text,cls){return '<button type="button" class="btn '+(cls||'primary')+'" data-tts="'+encodeURIComponent(text)+'">🔊 '+(cls==='secondary'?'نطق المثال':'استمع')+'</button>'}
    function attachSpeech(){
      panel.querySelectorAll('[data-tts]').forEach(function(b){
        b.onclick=function(){window.speak(decodeURIComponent(b.getAttribute('data-tts')||''));};
      });
    }

    function renderVocab(){
      panel.innerHTML='<h2>🖼️ المفردات</h2><p>تعلم الكلمة مع معناها ومثالها، ويمكنك الاستماع إلى <b>الكلمة</b> أو <b>المثال</b> من نفس البطاقة.</p><div class="cards">'+vocab.map(function(x){return '<article class="card"><div class="sport-art">'+x[2]+'</div><div class="fr">'+esc(x[0])+'</div><div class="ar">'+esc(x[1])+'</div><div class="example">'+esc(x[3])+'</div>'+button(x[0],'primary')+button(x[3],'secondary')+'</article>'}).join('')+'</div>';
      attachSpeech();
    }
    function renderPron(){
      panel.innerHTML='<h2>🎧 النطق</h2><p>هنا نركز على الأصوات التي قد تسبب صعوبة، مع <b>ملاحظة نطق خاصة بكل كلمة</b> بدل الملاحظة العامة.</p><div class="pron-grid">'+vocab.map(function(x){return '<article class="pron-card"><div class="fr">'+esc(x[0])+'</div><div class="ar">'+esc(x[1])+'</div><div class="note"><b>💡 ملاحظة النطق:</b><br>'+esc(notes[x[0]])+'</div>'+button(x[0],'primary')+'</article>'}).join('')+'</div>';
      attachSpeech();
    }
    function renderGrammar(){
      panel.innerHTML='<h2>📘 القواعد: أدوات التعريف مع أسماء الرياضات</h2><p>قبل أن نستخدم الرياضة في الجملة، نحدد <b>جنس الاسم وعدده</b> ثم نختار أداة التعريف المناسبة.</p><div class="grammar-grid"><div class="formula"><b>le</b><p>مع الاسم المذكر المفرد.</p><strong>le football · le tennis · le judo</strong><br><small>مثال: Je pratique <b>le</b> football.</small></div><div class="formula"><b>la</b><p>مع الاسم المؤنث المفرد.</p><strong>la natation · la boxe · la voile</strong><br><small>مثال: Je fais de <b>la</b> natation.</small></div><div class="formula"><b>l'</b><p>قبل الاسم المفرد الذي يبدأ بحرف متحرك.</p><strong>l'équitation · l'escrime</strong><br><small>مثال: Je pratique <b>l'</b>escrime.</small></div><div class="formula"><b>les</b><p>مع الاسم الجمع.</p><strong>les échecs</strong><br><small>مثال: Je joue aux <b>échecs</b>.</small></div></div><div class="contrast"><div class="yes"><b>✅ كيف أختار؟</b><br>مذكر مفرد → <b>le</b><br>مؤنث مفرد → <b>la</b><br>مفرد يبدأ بحرف متحرك → <b>l'</b><br>جمع → <b>les</b></div><div class="no"><b>📌 لا تخلط بين أدوات التعريف والنكرة</b><br><b>le / la / l' / les</b> أدوات تعريف.<br><b>un / une / des</b> أدوات نكرة.</div></div><div class="note" style="margin-top:14px"><b>⭐ قاعدة الدرس:</b> لا تحفظ الأداة منفصلة عن الكلمة؛ احفظ الاسم مع أداته: <b>le football</b>، <b>la natation</b>، <b>l'équitation</b>، <b>les échecs</b>.</div>';
    }
    function renderConv(){
      panel.innerHTML='<h2>💬 المحادثة</h2><p>استمع إلى كل سطر على حدة، ثم حاول تكراره بنفس الإيقاع.</p><div class="dialogue-wrap">'+conv.map(function(x){return '<article class="dialogue-card '+x[0].toLowerCase()+'"><div class="speaker">'+x[0]+'</div><div class="line-fr">'+esc(x[1])+'</div><div class="line-ar">'+esc(x[2])+'</div>'+button(x[3],'primary')+'</article>'}).join('')+'</div><div class="note" style="margin-top:14px"><b>🎯 جرّب أنت:</b> أجب شفهيًا عن «Quel sport pratiques-tu ?» ثم قارن إجابتك بالحوار.</div>';
      attachSpeech();
    }
    var practice=[
      ['اختر أداة التعريف الصحيحة: ___ boxe',['la','le','les','l’'],0],
      ['اختر الجملة الصحيحة.',['Je pratique le football.','Je pratique la football.','Je pratique les football.','Je pratique l’ football.'],0],
      ['اختر الأداة المناسبة: ___ escrime',["l’",'la','le','les'],0],
      ['أي اسم رياضة جاء بصيغة الجمع؟',['les échecs','la boxe','le tennis','l’équitation'],0],
      ['اختر الجملة الصحيحة.',['Je fais de la natation.','Je fais du natation.','Je fais de l’ natation.','Je fais des natation.'],0],
      ['اختر أداة التعريف الصحيحة: ___ voile',['la','le','l’','les'],0]
    ];
    var review=[
      ['اختر الأداة المناسبة: ___ équitation',["l’",'la','le'],0],
      ['اختر الجملة الصحيحة.',['Je pratique le football.','Je pratique la football.','Je pratique les football.'],0],
      ['اختر الأداة المناسبة: ___ échecs',['les','le','la'],0],
      ['أكمل: Je fais ___ natation.',['de la','du','de l’'],0],
      ['أكمل: Je joue ___ tennis.',['au','à la','aux'],0],
      ['أكمل: Je pratique ___ escrime.',["l’",'la','le'],0]
    ];
    function makeChoices(arr,cls,handler){return arr.map(function(o,i){return '<button type="button" class="'+cls+'" data-correct="'+(i===0?'true':'false')+'">'+o+'</button>'}).join('')}
    function renderPractice(){
      panel.innerHTML='<h2>🎯 التدريب</h2><p>تدريب مستقل من <b>6 أسئلة</b>. اختر إجابتك ثم شاهد التصحيح فورًا.</p>'+practice.map(function(q,i){var opts=q[1].map(function(v,j){return {v:v,c:j===q[2]}}).sort(function(){return Math.random()-.5});return '<article class="task" style="margin-top:12px"><h3>'+q[0]+'</h3><div class="options">'+opts.map(function(o){return '<button type="button" class="option" data-pr="'+i+'" data-correct="'+o.c+'">'+o.v+'</button>'}).join('')+'</div><div class="feedback"></div></article>'}).join('');
      panel.querySelectorAll('[data-pr]').forEach(function(b){b.onclick=function(){var card=b.closest('.task');if(card.dataset.done)return;card.dataset.done='1';card.querySelectorAll('.option').forEach(function(x){x.disabled=true;if(x.dataset.correct==='true')x.classList.add('correct')});var ok=b.dataset.correct==='true';if(!ok)b.classList.add('wrong');card.querySelector('.feedback').textContent=ok?'✅ إجابة صحيحة!':'❌ ليست الإجابة الصحيحة. راجع القاعدة ثم انتقل للسؤال التالي.';};});
    }
    function renderReview(){
      panel.innerHTML='<h2>🧠 المراجعة الذكية</h2><p>مراجعة قصيرة قبل التقييم. كل سؤال يقيس نقطة مختلفة من الدرس.</p><div class="result"><strong id="reviewScore">0 / 0</strong><p>نتيجتك الحالية في المراجعة.</p></div>'+review.map(function(q,i){var opts=q[1].map(function(v,j){return {v:v,c:j===q[2]}}).sort(function(){return Math.random()-.5});return '<article class="review-box" style="margin-top:12px"><h3>'+q[0]+'</h3><div class="choice-grid">'+opts.map(function(o){return '<button type="button" class="choice" data-rv="'+i+'" data-correct="'+o.c+'">'+o.v+'</button>'}).join('')+'</div><div class="feedback"></div></article>'}).join('');
      var score=0,done=0;panel.querySelectorAll('[data-rv]').forEach(function(b){b.onclick=function(){var card=b.closest('.review-box');if(card.dataset.done)return;card.dataset.done='1';done++;var ok=b.dataset.correct==='true';if(ok)score++;card.querySelectorAll('.choice').forEach(function(x){x.disabled=true;if(x.dataset.correct==='true')x.classList.add('correct')});if(!ok)b.classList.add('wrong');card.querySelector('.feedback').textContent=ok?'✅ إجابة صحيحة!':'❌ إجابة غير صحيحة. راجع القاعدة ثم انتقل للسؤال التالي.';var s=document.getElementById('reviewScore');if(s)s.textContent=score+' / '+done;};});
    }
    var assess=[
      ['أي جملة صحيحة؟',['Je pratique le judo.','Je pratique la judo.','Je pratique l’ judo.','Je pratique les judo.'],0],
      ['اختر الأداة المناسبة قبل «natation».',['la','le','l’','les'],0],
      ['أي اسم يحتاج إلى l’؟',['équitation','football','boxe','échecs'],0],
      ['أي اختيار صحيح مع «échecs»؟',['les échecs','le échecs','la échecs','l’ échecs'],0],
      ['اختر الجملة الصحيحة.',['Je fais de la voile.','Je fais du voile.','Je fais de l’ voile.','Je fais des voile.'],0],
      ['أي أداة تناسب «tennis»؟',['le','la','l’','les'],0],
      ['اختر الجملة الصحيحة.',["Je pratique l’escrime.",'Je pratique la escrime.','Je pratique le escrime.','Je pratique les escrime.'],0],
      ['أي اختيار يمثل اسمًا مؤنثًا مفردًا؟',['la pêche','le rugby','les échecs','l’escrime'],0],
      ['اختر الأداة الصحيحة: ___ gymnastique',['la','le','l’','les'],0],
      ['أي جملة صحيحة؟',['Je joue au football.','Je joue à la football.','Je joue aux football.','Je joue de football.'],0]
    ];
    function renderAssessment(){
      panel.innerHTML='<h2>🏆 التقييم النهائي</h2><p>تقييم من <b>10 عناصر</b> كما في النسخة المستقرة للدرس.</p><div class="result"><strong id="assessmentScore">0 / 0</strong><p>أجب عن العناصر لتظهر نتيجتك.</p><div class="progress"><i id="assessmentBar"></i></div></div><div class="assessment-grid" style="margin-top:12px">'+assess.map(function(q,i){var opts=q[1].map(function(v,j){return {v:v,c:j===q[2]}}).sort(function(){return Math.random()-.5});return '<article class="assessment-card"><h3>'+(i+1)+'. '+q[0]+'</h3><div class="options">'+opts.map(function(o){return '<button type="button" class="option" data-as="'+i+'" data-correct="'+o.c+'">'+o.v+'</button>'}).join('')+'</div><div class="feedback"></div></article>'}).join('')+'</div>';
      var score=0,done=0;panel.querySelectorAll('[data-as]').forEach(function(b){b.onclick=function(){var card=b.closest('.assessment-card');if(card.dataset.done)return;card.dataset.done='1';done++;var ok=b.dataset.correct==='true';if(ok)score++;card.querySelectorAll('.option').forEach(function(x){x.disabled=true;if(x.dataset.correct==='true')x.classList.add('correct')});if(!ok)b.classList.add('wrong');card.querySelector('.feedback').textContent=ok?'✅ صحيح':'❌ الإجابة الصحيحة موضحة باللون الأخضر.';document.getElementById('assessmentScore').textContent=score+' / '+done;document.getElementById('assessmentBar').style.width=(done/10*100)+'%';};});
    }

    var originalGo=window.go;
    if(originalGo.__safeEnhancementWrapped)return;
    function goEnhanced(i){
      originalGo(i);
      setTimeout(function(){
        if(i===1)renderVocab();
        else if(i===2)renderPron();
        else if(i===3)renderGrammar();
        else if(i===4)renderConv();
        else if(i===6)renderPractice();
        else if(i===8)renderReview();
        else if(i===9)renderAssessment();
      },0);
    }
    goEnhanced.__safeEnhancementWrapped=true;
    window.go=goEnhanced;

    // Ensure direct links such as ?section=... still open the requested section.
    var q=new URLSearchParams(location.search),section=q.get('section');
    var map={vocab:1,pron:2,grammar:3,conv:4,practice:6,review:8,assessment:9};
    if(section&&map[section]!=null)goEnhanced(map[section]);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
