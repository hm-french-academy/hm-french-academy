(function(){
  'use strict';
  function speak(text){
    if(!text||!window.speechSynthesis)return;
    window.speechSynthesis.cancel();
    var u=new SpeechSynthesisUtterance(text);u.lang='fr-FR';u.rate=.82;window.speechSynthesis.speak(u);
  }
  function card(title,fr,ar){return '<div class="g3card"><h3>'+fr+'</h3><p>'+ar+'</p><button class="g3btn speak-l01-fix" data-s="'+fr.replace(/"/g,'&quot;')+'">🔊 استمع</button></div>';}
  function apply(){
    var viewer=document.getElementById('viewer');
    if(!viewer||viewer.children.length<11)return false;
    var panels=viewer.children;
    /* Page 4: make listening/speaking a dialogue-and-response practice, not a vocabulary duplicate. */
    panels[3].innerHTML='<section class="g3panel"><small>04</small><h2>🔊 اسمع وتحدث</h2><p>استمع إلى الحوار، ثم كرر كل جملة بصوتك.</p><div class="dialogue">'+
      '<div class="bubble teacher"><b>👦</b><p>Bonjour ! Comment tu t\'appelles ?</p><button class="g3btn speak-l01-fix" data-s="Bonjour ! Comment tu t\'appelles ?">🔊 استمع</button></div>'+
      '<div class="bubble student"><b>👧</b><p>Je m\'appelle Lina.</p><button class="g3btn speak-l01-fix" data-s="Je m\'appelle Lina.">🔊 استمع</button></div>'+
      '<div class="bubble teacher"><b>👦</b><p>Comment ça va ?</p><button class="g3btn speak-l01-fix" data-s="Comment ça va ?">🔊 استمع</button></div>'+
      '<div class="bubble student"><b>👧</b><p>Ça va bien, merci.</p><button class="g3btn speak-l01-fix" data-s="Ça va bien, merci.">🔊 استمع</button></div>'+
      '<div class="bubble teacher"><b>👦</b><p>Quel âge as-tu ?</p><button class="g3btn speak-l01-fix" data-s="Quel âge as-tu ?">🔊 استمع</button></div>'+
      '<div class="bubble student"><b>👧</b><p>J\'ai neuf ans.</p><button class="g3btn speak-l01-fix" data-s="J\'ai neuf ans.">🔊 استمع</button></div>'+
      '</div><div class="g3card"><h3>🎤 دورك</h3><p>استمع إلى الجملة، ثم حاول تكرارها بنفس النطق.</p><div class="g3choices"><button class="g3btn speak-l01-fix" data-s="Bonjour ! Comment tu t\'appelles ?">1. الاسم</button><button class="g3btn speak-l01-fix" data-s="Comment ça va ?">2. الحال</button><button class="g3btn speak-l01-fix" data-s="Quel âge as-tu ?">3. العمر</button></div></div>'+
      '<div class="g3btn-nav"><button class="g3btn light" data-prev>السابق</button><button class="g3btn" data-next>التالي</button></div></section>';
    /* Page 5: restore bilingual French + Arabic grammar explanation. */
    var grammar=panels[4];
    var bilingual='<div class="g3card"><h3>📘 La règle — القاعدة</h3><p><b>Comment tu t\'appelles ?</b> → <b>Je m\'appelle Lina.</b></p><p>Pour demander le nom, on utilise « Comment tu t\'appelles ? » et on répond « Je m\'appelle… ».</p><p><b>Comment ça va ? / Ça va ?</b> → <b>Ça va bien, merci. / Pas mal. / Ça ne va pas. / Oui, ça va bien.</b></p><p>Pour demander comment va une personne, on peut utiliser les deux questions du cours. Les quatre réponses sont valides dans le contenu source.</p><p><b>Quel âge as-tu ?</b> → <b>J\'ai neuf ans.</b></p><p>Pour demander l’âge, on utilise « Quel âge as-tu ? » et on répond avec « J\'ai… ans. ».</p><hr><p><b>بالعربية:</b> نتعلم في هذا الدرس السؤال عن الاسم والحال والعمر، مع صيغ السؤال والإجابات الواردة في المصدر.</p></div>';
    var old=grammar.querySelector('.g3panel')||grammar;
    var nav=grammar.querySelector('.g3btn-nav');
    var navHtml=nav?nav.outerHTML:'<div class="g3btn-nav"><button class="g3btn light" data-prev>السابق</button><button class="g3btn" data-next>التالي</button></div>';
    grammar.innerHTML='<section class="g3panel"><small>05</small><h2>🧠 القاعدة</h2>'+bilingual+navHtml+'</section>';
    bind();
    return true;
  }
  function bind(){
    document.querySelectorAll('.speak-l01-fix').forEach(function(b){b.onclick=function(e){e.stopPropagation();speak(b.getAttribute('data-s'));};});
    document.querySelectorAll('[data-prev]').forEach(function(b){if(!b.dataset.l01fix){b.dataset.l01fix='1';b.onclick=function(){var p=document.getElementById('viewer').children;var active=Array.prototype.indexOf.call(p,Array.from(p).find(function(x){return !x.hidden;}));var n=Math.max(0,active-1);p[active].hidden=true;p[n].hidden=false;document.querySelectorAll('.step').forEach(function(x,i){x.classList.toggle('active',i===n);});window.scrollTo(0,0);};}});
    document.querySelectorAll('[data-next]').forEach(function(b){if(!b.dataset.l01fix){b.dataset.l01fix='1';b.onclick=function(){var p=document.getElementById('viewer').children;var active=Array.prototype.indexOf.call(p,Array.from(p).find(function(x){return !x.hidden;}));var n=Math.min(p.length-1,active+1);p[active].hidden=true;p[n].hidden=false;document.querySelectorAll('.step').forEach(function(x,i){x.classList.toggle('active',i===n);});window.scrollTo(0,0);};}});
  }
  var tries=0;var timer=setInterval(function(){tries++;if(apply()||tries>100)clearInterval(timer);},100);
})();
