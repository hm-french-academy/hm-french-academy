(function(){
  'use strict';
  function speakDirect(text){
    var s=String(text||'').trim();
    if(!s)return;
    var synth=window.speechSynthesis;
    if(!synth||!window.SpeechSynthesisUtterance)return;
    try{
      synth.cancel();
      if(synth.paused)synth.resume();
      var u=new SpeechSynthesisUtterance(s);
      u.lang='fr-FR';
      u.rate=.78;
      u.pitch=1;
      u.volume=1;
      var voices=synth.getVoices();
      var v=voices.find(function(x){return /^fr[-_]FR$/i.test(x.lang)})||voices.find(function(x){return /^fr[-_]/i.test(x.lang)});
      if(v)u.voice=v;
      synth.speak(u);
    }catch(e){}
  }
  function patchSpeech(){
    if(!window.speechSynthesis||!window.SpeechSynthesisUtterance)return;
    window.speak=speakDirect;
    var synth=window.speechSynthesis;
    if(!synth.getVoices().length){
      var once=function(){synth.removeEventListener('voiceschanged',once);};
      synth.addEventListener('voiceschanged',once);
    }
  }
  patchSpeech();
  function loadEnhancements(){
    if(document.querySelector('script[data-grade9-enhancements]')) return;
    var s=document.createElement('script');
    s.src='scripts/grade9-u1-l1-enhancements.js?v=20260911-5';
    s.defer=false;
    s.setAttribute('data-grade9-enhancements','1');
    s.onload=function(){setTimeout(patchSpeech,50);setTimeout(patchSpeech,300);setTimeout(patchSpeech,900);};
    document.head.appendChild(s);
  }
  function boot(){
    patchSpeech();
    var nav=document.getElementById('nav'), panel=document.getElementById('panel');
    if(!nav||!panel) return;
    if(typeof window.go==='function' && typeof window.speak==='function'){
      loadEnhancements();
      setTimeout(patchSpeech,500);
      setTimeout(patchSpeech,1500);
      return;
    }
    if(nav.children.length && panel.innerHTML.trim()) return;
    var steps=[['🚀','البداية'],['🖼️','المفردات'],['🎧','النطق'],['📘','القواعد'],['💬','المحادثة'],['🎬','الفيديو'],['🎯','التدريب'],['🎮','الألعاب'],['🧠','المراجعة الذكية'],['🏆','التقييم'],['📁','ملفات الدرس'],['📈','التقدم']];
    var vocab=[['le football','كرة القدم','⚽','Je joue au football.'],['le ping-pong','تنس الطاولة','🏓','Je joue au ping-pong.'],['le karaté','الكاراتيه','🥋','Je pratique le karaté.'],['le cyclisme / le vélo','ركوب الدراجات','🚴','Je fais du vélo.'],['la boxe','الملاكمة','🥊','Je pratique la boxe.'],['la natation','السباحة','🏊','Je fais de la natation.'],['le tennis','التنس','🎾','Je joue au tennis.'],['le basket-ball','كرة السلة','🏀','Je joue au basket-ball.'],['le volley-ball','الكرة الطائرة','🏐','Je joue au volley-ball.'],["l'équitation",'الفروسية','🏇',"Je fais de l'équitation."],["l'escrime",'المبارزة','🤺',"Je pratique l'escrime."],['le ski','التزلج','⛷️','Je fais du ski.'],['le judo','الجودو','🥋','Je pratique le judo.'],['le rugby','الرجبي','🏉','Je joue au rugby.'],['la pêche','صيد السمك','🎣','Je pratique la pêche.'],['la voile','الإبحار','⛵','Je fais de la voile.'],['la gymnastique','الجمباز','🤸','Je fais de la gymnastique.'],['les échecs','الشطرنج','♟️','Je joue aux échecs.'],['la marche','المشي','🚶','Je fais de la marche.'],['la randonnée','التنزه','🥾','Je fais de la randonnée.']];
    var idx=0;
    function esc(s){return String(s).replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]});}
    function speak(t){patchSpeech();speakDirect(t)}
    function render(){
      nav.innerHTML=steps.map(function(s,i){return '<button class="'+(i===idx?'active':'')+'" data-step="'+i+'">'+s[0]+' '+s[1]+'</button>'}).join('');
      nav.querySelectorAll('button').forEach(function(b){b.onclick=function(){idx=Number(b.dataset.step);render()}});
      var h='';
      if(idx===0)h='<h2>🚀 ضربة البداية</h2><p>في هذا الدرس سنكتشف أسماء الرياضات، ثم نتعلم أدوات التعريف ونطبقها في جمل ومواقف بسيطة.</p><div class="note"><b>🎯 هدف الدرس</b><br>التعرف على أسماء الرياضات واستخدام <b>le / la / l\' / les</b> بصورة صحيحة.</div>';
      if(idx===1)h='<h2>🖼️ المفردات</h2><p>استمع إلى الكلمة أو المثال من نفس البطاقة.</p><div class="cards">'+vocab.map(function(x){return '<article class="card"><div class="sport-art">'+x[2]+'</div><div class="fr">'+esc(x[0])+'</div><div class="ar">'+esc(x[1])+'</div><div class="example">'+esc(x[3])+'</div><button class="btn primary" type="button" data-s="'+encodeURIComponent(x[0])+'">🔊 نطق الكلمة</button><button class="btn secondary" type="button" data-s="'+encodeURIComponent(x[3])+'">▶ نطق المثال</button></article>'}).join('')+'</div>';
      if(idx===2)h='<h2>🎧 النطق</h2><p>استمع إلى الكلمات وراجع أصواتها الفرنسية.</p><div class="pron-grid">'+vocab.map(function(x){return '<article class="pron-card"><div class="fr">'+esc(x[0])+'</div><div class="ar">'+esc(x[1])+'</div><div class="note"><b>💡 ملاحظة:</b><br>انتبه إلى نطق الحروف الفرنسية المتحركة والأصوات الأنفية.</div><button class="btn primary" type="button" data-s="'+encodeURIComponent(x[0])+'">🔊 استمع للكلمة</button></article>'}).join('')+'</div>';
      if(idx===3)h='<h2>📘 القواعد: أدوات التعريف</h2><div class="grammar-grid"><div class="formula"><b>le</b><p>للاسم المذكر المفرد.</p><strong>le football · le tennis · le judo</strong></div><div class="formula"><b>la</b><p>للاسم المؤنث المفرد.</p><strong>la natation · la boxe · la voile</strong></div><div class="formula"><b>l\'</b><p>قبل الاسم المفرد الذي يبدأ بحرف متحرك.</p><strong>l'équitation · l'escrime</strong></div><div class="formula"><b>les</b><p>للاسم الجمع.</p><strong>les échecs</strong></div></div>';
      if(idx===4)h='<h2>💬 المحادثة</h2><p>اقرأ الحوار ثم استمع إلى السطر الذي تريد سماعه.</p><div class="dialogue-wrap"><article class="dialogue-card sara"><div class="speaker">Sara</div><div class="line-fr">Quel sport pratiques-tu ?</div><div class="line-ar">ما الرياضة التي تمارسها؟</div><button class="btn primary" type="button" data-s="'+encodeURIComponent('Quel sport pratiques-tu ?')+'">🔊 استمع</button></article><article class="dialogue-card adam"><div class="speaker">Adam</div><div class="line-fr">Je pratique le football.</div><div class="line-ar">أنا أمارس كرة القدم.</div><button class="btn primary" type="button" data-s="'+encodeURIComponent('Je pratique le football.')+'">🔊 استمع</button></article></div>';
      if(idx===5)h='<h2>🎬 شاهد وتعلّم</h2><p>شاهد الفيديو المرتبط بموضوع الرياضات.</p><div class="video"><iframe src="https://www.youtube.com/embed/pnmoexHphZ0" title="Apprendre les sports en français" allowfullscreen></iframe></div>';
      if(idx===6)h='<h2>🎯 التدريب</h2><div class="task"><h3>اختر أداة التعريف الصحيحة: ___ boxe</h3><div class="options"><button class="option" onclick="this.parentNode.parentNode.querySelector(\'.feedback\').textContent=\'❌ حاول مرة أخرى.\'">le</button><button class="option" onclick="this.parentNode.parentNode.querySelector(\'.feedback\').textContent=\'✅ إجابة صحيحة!\'">la</button><button class="option" onclick="this.parentNode.parentNode.querySelector(\'.feedback\').textContent=\'❌ حاول مرة أخرى.\'">les</button></div><div class="feedback"></div></div>';
      if(idx===7)h='<h2>🎮 الألعاب</h2><div class="game-launch"><div style="font-size:52px">🎮</div><h3>مركز الألعاب · Les sports</h3><p>ألعاب المفردات وأدوات التعريف والنطق.</p><a href="grade9-u1-l1-games.html">🚀 فتح مركز الألعاب</a></div>';
      if(idx===8)h='<h2>🧠 المراجعة الذكية</h2><div class="review-box"><h3>اختر الأداة المناسبة: ___ équitation</h3><div class="choice-grid"><button class="choice" onclick="this.parentNode.parentNode.querySelector(\'.feedback\').textContent=\'✅ إجابة صحيحة!\'">l’</button><button class="choice" onclick="this.parentNode.parentNode.querySelector(\'.feedback\').textContent=\'❌ ليست الإجابة الصحيحة.\'">la</button><button class="choice" onclick="this.parentNode.parentNode.querySelector(\'.feedback\').textContent=\'❌ ليست الإجابة الصحيحة.\'">le</button></div><div class="feedback"></div></div>';
      if(idx===9)h='<h2>🏆 التقييم النهائي</h2><p>ابدأ بتطبيق ما تعلمته في أسئلة الدرس.</p><div class="result"><strong>جاهز للتقييم</strong><p>راجع المفردات والقواعد ثم انتقل إلى التقييم.</p></div>';
      if(idx===10)h='<h2>📁 ملفات الدرس</h2><div class="file-grid"><a class="file-card" href="#" data-step="1"><span>🧠</span>المفردات<small>مفردات Les sports مع الأمثلة.</small></a><a class="file-card" href="#" data-step="3"><span>📘</span>القواعد<small>أدوات التعريف مع أسماء الرياضات.</small></a><a class="file-card" href="grade9-u1-l1-games.html"><span>🎮</span>مركز الألعاب<small>الألعاب المستقلة للدرس.</small></a></div>';
      if(idx===11)h='<h2>📈 التقدم</h2><div class="result"><strong>رحلة التعلم</strong><p>تم تشغيل وضع الاسترداد المستقل للدرس.</p></div>';
      panel.innerHTML=h;
      panel.querySelectorAll('[data-s]').forEach(function(b){b.onclick=function(){speak(decodeURIComponent(b.getAttribute('data-s')||''))}});
      panel.querySelectorAll('[data-step]').forEach(function(b){if(b.closest('#nav'))return;b.onclick=function(e){e.preventDefault();idx=Number(b.getAttribute('data-step'));render()}});
    }
    render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
