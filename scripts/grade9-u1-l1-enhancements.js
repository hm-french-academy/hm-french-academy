(function(){
  'use strict';
  function enhance(){
    var panel=document.getElementById('panel');
    if(!panel) return;
    function renderPractice(){
      var qs=[
        ['اختر أداة التعريف الصحيحة: ___ boxe',['le','la','les'],'la'],
        ['اختر أداة التعريف الصحيحة: ___ échecs',['le','la','les'],'les'],
        ['اختر الجملة الصحيحة.',['Je fais de la natation.','Je fais du natation.','Je fais de le natation.'],'Je fais de la natation.'],
        ['اختر الجملة الصحيحة.',['Je pratique le football.','Je pratique la football.','Je pratique les football.'],'Je pratique le football.'],
        ['اختر الجملة الصحيحة.',['Je joue au tennis.','Je joue à le tennis.','Je joue du tennis.'],'Je joue au tennis.'],
        ['اختر أداة التعريف الصحيحة: ___ escrime',["l’","la","le"],"l’"]
      ];
      panel.innerHTML='<h2>🎯 التدريب</h2><p>تدريب قصير من 6 أسئلة. اختر الإجابة ثم راجع التصحيح فورًا.</p>'+qs.map(function(q,i){return '<article class="task" style="margin-top:12px"><h3>'+q[0]+'</h3><div class="options">'+q[1].map(function(o){return '<button class="option" type="button" data-q="'+i+'" data-a="'+encodeURIComponent(o)+'">'+o+'</button>'}).join('')+'</div><div class="feedback" id="pf'+i+'"></div></article>'}).join('');
      panel.querySelectorAll('[data-q]').forEach(function(b){b.onclick=function(){var i=Number(b.dataset.q),a=decodeURIComponent(b.dataset.a),correct=qs[i][2],box=document.getElementById('pf'+i);panel.querySelectorAll('[data-q="'+i+'"]').forEach(function(x){x.disabled=true;x.classList.remove('correct','wrong')});b.classList.add(a===correct?'correct':'wrong');box.textContent=a===correct?'✅ إجابة صحيحة!':'❌ ليست الإجابة الصحيحة — راجع القاعدة ثم حاول في السؤال التالي.';}});
    }
    function renderAssessment(){
      var items=[
        ['le football','le'],['la natation','la'],["l'équitation",'l’'],['les échecs','les'],['la boxe','la'],['le tennis','le'],['l’escrime','l’'],['le judo','le'],['la voile','la'],['le rugby','le'],
        ['Je ___ du ski.',['fais','pratique','joue'],'fais'],['Je ___ le football.',['fais','pratique','joue'],'joue'],['Je ___ le karaté.',['fais','pratique','joue'],'pratique'],['Je ___ au tennis.',['fais','pratique','joue'],'joue'],['Je ___ de la natation.',['fais','pratique','joue'],'fais'],['Je ___ la boxe.',['fais','pratique','joue'],'pratique'],['Je ___ aux échecs.',['fais','pratique','joue'],'joue'],['Je ___ de la voile.',['fais','pratique','joue'],'fais'],['Je ___ le judo.',['fais','pratique','joue'],'pratique'],['Je ___ au rugby.',['fais','pratique','joue'],'joue']
      ];
      var html='<h2>🏆 التقييم النهائي</h2><p>تقييم الدرس من 20 عنصرًا: 10 عناصر في أدوات التعريف و10 في استخدام الأفعال مع الرياضات.</p><div class="assessment-grid">';
      items.forEach(function(x,i){if(i<10){html+='<article class="assessment-card"><h3>'+(i+1)+'. اختر الأداة المناسبة: <span dir="ltr">'+x[0]+'</span></h3><div class="options">'+['le','la','l’','les'].map(function(o){return '<button class="option" data-as="'+i+'" data-v="'+o+'">'+o+'</button>'}).join('')+'</div><div class="feedback" id="af'+i+'"></div></article>'}else{html+='<article class="assessment-card"><h3>'+(i+1)+'. '+x[0]+'</h3><div class="options">'+x[1].map(function(o){return '<button class="option" data-as="'+i+'" data-v="'+o+'">'+o+'</button>'}).join('')+'</div><div class="feedback" id="af'+i+'"></div></article>'}});
      html+='</div><div class="result" style="margin-top:14px"><strong id="ascore">0 / 20</strong><p id="amsg">أجب عن العناصر لتظهر نتيجتك.</p></div>';panel.innerHTML=html;
      var score=0,answered={};
      panel.querySelectorAll('[data-as]').forEach(function(b){b.onclick=function(){var i=Number(b.dataset.as);if(answered[i])return;answered[i]=1;var v=b.dataset.v,correct=i<10?items[i][1]:items[i][2],ok=v===correct;b.classList.add(ok?'correct':'wrong');if(ok)score++;panel.querySelectorAll('[data-as="'+i+'"]').forEach(function(x){x.disabled=true});document.getElementById('af'+i).textContent=ok?'✅ صحيح':'❌ الإجابة الصحيحة: '+correct;document.getElementById('ascore').textContent=score+' / 20';document.getElementById('amsg').textContent=Object.keys(answered).length===20?(score>=17?'🏆 ممتاز!':score>=12?'👏 جيد جدًا، راجع الأخطاء مرة أخرى.':'📘 راجع القواعد والمفردات ثم أعد المحاولة.'):'أكمل بقية عناصر التقييم.';}});
    }
    function renderProgress(){
      panel.innerHTML='<h2>📈 التقدم</h2><div class="result"><strong>رحلة التعلم مكتملة البنية</strong><p>مررت على المفردات والنطق والقواعد والمحادثة والفيديو والتدريب والألعاب والمراجعة والتقييم.</p><div class="progress" style="margin:15px 0"><i style="width:100%"></i></div><p class="small">التقدم المحلي محفوظ على هذا الجهاز. لا يعتمد هذا الدرس على تحميل ملف JSON خارجي أثناء التشغيل.</p></div>';
    }
    function hook(){
      var oldGo=window.go;
      if(typeof oldGo!=='function'||oldGo.__enhanced)return;
      function wrapped(i){oldGo(i);setTimeout(function(){if(i===6)renderPractice();else if(i===9)renderAssessment();else if(i===11)renderProgress();},0)}
      wrapped.__enhanced=true;window.go=wrapped;
      var originalRender=window.render;
      if(typeof originalRender==='function'){
        window.render=function(){originalRender.apply(this,arguments);setTimeout(function(){},0)};
      }
      var params=new URLSearchParams(location.search),section=params.get('section');
      if(section){var map={practice:6,assessment:9,progress:11};if(map[section]!=null)wrapped(map[section]);}
    }
    hook();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enhance,{once:true});else enhance();
})();
