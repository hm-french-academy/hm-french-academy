(function(){const V=[['un mur','حائط'],['un repas','وجبة'],['une maison','منزل'],['une pièce','غرفة'],['une boîte','صندوق'],['une voiture','سيارة'],['un balcon','شرفة'],['un téléphone','تليفون'],['des meubles','أثاث'],['une photo','صورة'],['un bus','أتوبيس'],['un parc','حديقة عامة'],['une gare','محطة قطار'],['un cinéma','سينما'],['un hôpital','مستشفى'],['une école','مدرسة'],['un théâtre','مسرح'],['une clé','مفتاح'],['une chambre','غرفة نوم'],['un salon','غرفة معيشة'],['une cuisine','مطبخ']];const G=[['Je ___ une clé.','ai'],['Tu ___ dans le salon.','es'],['Nous ___ une maison.','avons'],['Vous ___ dans la maison.','êtes'],['Ils ___ une photo.','ont'],['Elle ___ dans sa chambre.','est'],['La maison ___ grande.','est'],['Nous ___ dans le salon.','sommes'],['Tu ___ une voiture.','as'],['Je ___ un téléphone.','ai'],['Vous ___ une clé.','avez'],['Elles ___ dans la maison.','sont'],['Il ___ une photo.','a'],['Nous ___ une chambre.','avons'],['Je ___ dans la cuisine.','suis'],['Ils ___ dans le salon.','sont'],['Elle ___ une photo.','a'],['Vous ___ dans la cuisine.','êtes']];const J=[['J\'ai une chambre.','لدي غرفة.'],['Je suis dans ma chambre.','أنا في غرفتي.'],['Nous avons une maison.','لدينا منزل.'],['Ils sont dans la maison.','هم في المنزل.'],['Il y a des meubles dans la maison.','يوجد أثاث في المنزل.'],['La maison est grande.','المنزل كبير.'],['Tu as une clé.','لديك مفتاح.'],['Vous êtes dans le salon.','أنتم في غرفة المعيشة.'],['Il y a une voiture devant la maison.','توجد سيارة أمام المنزل.'],['J\'ai un téléphone.','لدي هاتف.'],['Elle est dans la cuisine.','هي في المطبخ.'],['Nous avons des meubles.','لدينا أثاث.']];const E=[['J\'ai dans le salon.','Je suis dans le salon.','أنا موجود في غرفة المعيشة.','نستخدم être مع المكان: Je suis.'],['Je suis une clé.','J\'ai une clé.','لدي مفتاح.','نستخدم avoir للتعبير عن الامتلاك.'],['Il a des meubles dans la maison.','Il y a des meubles dans la maison.','يوجد أثاث في المنزل.','Il y a تُستخدم للتعبير عن وجود شيء.'],['Nous est dans la maison.','Nous sommes dans la maison.','نحن في المنزل.','مع nous يأتي être في صورة sommes.'],['Vous avons une maison.','Vous avez une maison.','لديكم منزل.','مع vous يأتي avoir في صورة avez.'],['Tu est dans la cuisine.','Tu es dans la cuisine.','أنت في المطبخ.','مع tu يأتي être في صورة es.'],['Ils a une photo.','Ils ont une photo.','لديهم صورة.','مع ils يأتي avoir في صورة ont.'],['Je sont dans ma chambre.','Je suis dans ma chambre.','أنا في غرفتي.','مع je يأتي être في صورة suis.'],['Elle ont une clé.','Elle a une clé.','لديها مفتاح.','مع elle يأتي avoir في صورة a.'],['Ils est dans le salon.','Ils sont dans le salon.','هم في غرفة المعيشة.','مع ils يأتي être في صورة sont.'],['La maison ont grande.','La maison est grande.','المنزل كبير.','La maison مفرد مؤنث، لذلك نستخدم est.'],['Tu suis une voiture.','Tu as une voiture.','لديك سيارة.','نستخدم avoir للتعبير عن الامتلاك مع tu: as.']];
const modes=[['match','🧩','Memory Match','اختر كلمة بالفرنسية ثم معناها العربي المطابق.'],['catch','🎯','Word Catch','اختر الكلمة الفرنسية المناسبة للمعنى.'],['listen','🎧','Listening Challenge','استمع ثم اختر المعنى.'],['builder','🧱','Sentence Builder','كوّن الجملة من الكلمات بالترتيب.'],['grammar','⚔️','Grammar Duel','صرّف Avoir / Être حسب الفاعل والسياق.'],['error','🔎','Error Detective','صحح الجملة مع الحفاظ على المعنى.'],['sort','🗂️','Avoir / Être / Il y a','حدّد البنية المناسبة للجملة.'],['mastery','⚡','Mastery Mix','جولة شاملة متعددة المهارات.']];
const $=id=>document.getElementById(id),R=a=>a[Math.floor(Math.random()*a.length)];
const sh=a=>{const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b},uniq=a=>[...new Set(a)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let game='',i=0,s=0,locked=false,answer='',why='',decks={},masteryDeck=[];
function draw(key,list){if(!decks[key]||!decks[key].length)decks[key]=sh(list);return decks[key].pop()}
function speak(t){if(!window.speechSynthesis)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='fr-FR';u.rate=.84;speechSynthesis.speak(u)}
function choices(arr,c,map){const options=uniq(arr.map(map).filter(x=>x!==c));return sh([c,...sh(options).slice(0,3)])}
function feedback(ok,good,bad){$('fb').textContent=(ok?'✓ ':'✕ ')+(ok?good:bad);$('fb').style.color=ok?'#159b57':'#d34b4b';if(ok)s++;$('score').textContent=s;$('next').style.display='inline-block'}
function start(g){game=g;i=0;s=0;locked=false;decks[g]=[];if(g==='mastery')masteryDeck=buildMasteryDeck();$('modes').style.display='none';$('play').style.display='block';$('title').textContent=modes.find(x=>x[0]===g)[2];next()}
function options(ops){$('task').innerHTML='<div class="opts">'+ops.map(x=>'<button class="opt" type="button">'+esc(x)+'</button>').join('')+'</div>';document.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{if(locked)return;locked=true;const ok=b.textContent===answer;document.querySelectorAll('.opt').forEach(x=>{if(x.textContent===answer)x.classList.add('good');x.disabled=true});if(!ok)b.classList.add('bad');feedback(ok,game==='error'?'تصحيح صحيح ويحافظ على المعنى. '+why:'إجابة صحيحة! ممتاز.',game==='error'?'هذا الاختيار لا يحافظ على المعنى أو لا يصحح القاعدة.':'ليست الإجابة المطلوبة. راجع معيار السؤال.')})}
function finish(){$('q').innerHTML='<div class="result">🏆<br><strong>انتهت الجولة</strong><div class="summary">نتيجتك: '+s+' / '+i+'<br>أعد اللعب لتجربة ترتيب مختلف دون تكرار داخل الجولة.</div><button class="restart" onclick="window.HMGameStudio.start(window.HMGameStudio.game)">🔄 إعادة الجولة</button></div>';$('task').innerHTML='';$('listen').innerHTML='';$('hint').textContent='';$('fb').textContent='';$('next').style.display='none';$('bar').style.width='100%'}
function buildMasteryDeck(){const bank=[];V.forEach(x=>bank.push({type:'vocab',item:x}));G.forEach(x=>bank.push({type:'grammar',item:x}));J.forEach(x=>bank.push({type:'translation',item:x}));E.forEach(x=>bank.push({type:'error',item:x}));return sh(bank)}
function next(){
 if(i>=12)return finish();
 i++;locked=false;$('num').textContent=i;$('score').textContent=s;$('bar').style.width=((i-1)/12*100)+'%';$('fb').textContent='';$('next').style.display='none';$('listen').innerHTML='';$('task').innerHTML='';$('hint').textContent='';
 let q='',ops=[];
 if(game==='match'){
  const x=draw('match',V),pool=sh(V.filter(v=>v!==x)).slice(0,3),set=sh([x,...pool]);
  $('q').textContent='🧩 خطوة 1: اختر الكلمة الفرنسية، ثم اختر معناها العربي من العمود الآخر.';
  $('hint').textContent='اختيارك الأول لا يُحسب خطأ. ستظهر حوله علامة زرقاء، ثم اختر المعنى.';
  $('task').innerHTML='<div class="match"><div class="match-col">'+set.map(v=>'<button type="button" data-side="fr" data-value="'+esc(v[0])+'">'+esc(v[0])+'</button>').join('')+'</div><div class="match-col">'+sh(set).map(v=>'<button type="button" data-side="ar" data-value="'+esc(v[1])+'">'+esc(v[1])+'</button>').join('')+'</div></div>';
  let first=null,second=null;const buttons=[...document.querySelectorAll('.match button')];
  buttons.forEach(b=>b.onclick=()=>{
   if(locked||b.disabled)return;
   if(!first){first=b;b.classList.add('selected');$('hint').textContent='تم اختيار «'+b.textContent+'». اختر المعنى المطابق من العمود الآخر.';return}
   if(first.dataset.side===b.dataset.side){first.classList.remove('selected');first=b;b.classList.add('selected');$('hint').textContent='تم تغيير الاختيار. اختر الآن من العمود الآخر.';return}
   second=b;
   const fr=first.dataset.side==='fr'?first.dataset.value:second.dataset.value;
   const ar=first.dataset.side==='ar'?first.dataset.value:second.dataset.value;
   const pair=V.find(v=>v[0]===fr);
   if(pair&&pair[1]===ar){locked=true;first.classList.remove('selected');second.classList.remove('selected');first.classList.add('good');second.classList.add('good');buttons.forEach(x=>x.disabled=true);$('hint').textContent='أحسنت! اخترت الكلمة ومعناها الصحيحين.';feedback(true,'مطابقة صحيحة!','')}
   else{first.classList.remove('selected');second.classList.add('bad');$('fb').textContent='هذه ليست المطابقة الصحيحة. المحاولة مستمرة؛ غيّر اختيارك وجرّب مرة أخرى.';$('fb').style.color='#b7791f';setTimeout(()=>second.classList.remove('bad'),550);first=null;second=null}
  });
 }else if(game==='catch'){
  const x=draw('catch',V);q='🎯 اختر الكلمة التي تعني «'+x[1]+'».';answer=x[0];ops=choices(V,answer,v=>v[0]);
 }else if(game==='listen'){
  const x=draw('listen',V);q='🎧 استمع ثم اختر المعنى الصحيح.';answer=x[1];ops=choices(V,answer,v=>v[1]);$('listen').innerHTML='<button class="listen" id="sp">🔊 استمع إلى النطق</button>';$('sp').onclick=()=>speak(x[0]);setTimeout(()=>speak(x[0]),120);
 }else if(game==='grammar'){
  const x=draw('grammar',G);q='⚔️ أكمل الجملة: '+x[0];answer=x[1];ops=sh([answer,...sh(['ai','as','a','avons','avez','ont','suis','es','est','sommes','êtes','sont'].filter(v=>v!==answer)).slice(0,3)]);$('hint').textContent='المعيار: الفاعل + تصريف الفعل المناسب.';
 }else if(game==='error'){
  const x=draw('error',E);q='🔎 الجملة: «'+x[0]+'»<br><strong>اختر التصحيح الذي يحافظ على المعنى المقصود.</strong>';answer=x[1];why=x[3];ops=sh([answer,...sh(E.filter(v=>v[1]!==answer)).slice(0,3).map(v=>v[1])]);$('hint').textContent='المعيار: صحة القاعدة + الحفاظ على المعنى المقصود.';
 }else if(game==='sort'){
  const x=draw('sort',J),type=x[0].startsWith('Il y a')?'Il y a':/( suis | es | est | sommes | êtes | sont )/.test(' '+x[0]+' ')?'Être':'Avoir';q='🗂️ ما البنية المناسبة؟<br>«'+x[0]+'»';answer=type;ops=sh(['Avoir','Être','Il y a']);$('hint').textContent='هل الجملة تعبّر عن امتلاك، مكان/حالة، أم وجود؟';
 }else if(game==='builder'){
  const x=draw('builder',J),tokens=sh(x[0].replace(/[.?!]/g,'').split(' '));$('q').textContent='🧱 كوّن الجملة التي تعبّر عن: «'+x[1]+'»';$('task').innerHTML='<div class="dropzone" id="zone">اضغط الكلمات بالترتيب</div><div class="builder">'+tokens.map((t,n)=>'<button type="button" class="chip" data-index="'+n+'" data-t="'+esc(t)+'">'+esc(t)+'</button>').join('')+'</div><button class="check" id="check">تحقق</button>';let picked=[];document.querySelectorAll('.chip').forEach(b=>b.onclick=()=>{if(locked)return;b.classList.add('used');picked.push(b.dataset.t);$('zone').innerHTML=picked.map(t=>'<span class="chip">'+esc(t)+'</span>').join('')});$('check').onclick=()=>{if(locked)return;locked=true;const ok=picked.join(' ')===x[0].replace(/[.?!]/g,'');feedback(ok,'ترتيب صحيح! ممتاز.','الترتيب غير صحيح. راجع بناء الجملة.')};
 }else{
  const task=masteryDeck.pop();if(!task)return finish();const x=task.item;
  if(task.type==='vocab'){q='⚡ أي كلمة تعني «'+x[1]+'»؟';answer=x[0];ops=choices(V,answer,v=>v[0])}
  else if(task.type==='grammar'){q='⚡ أكمل: '+x[0];answer=x[1];ops=sh([answer,...sh(['ai','as','a','avons','avez','ont','suis','es','est','sommes','êtes','sont'].filter(v=>v!==answer)).slice(0,3)])}
  else if(task.type==='translation'){q='⚡ اختر الترجمة الصحيحة: '+x[0];answer=x[1];ops=choices(J,answer,v=>v[1])}
  else{q='⚡ صحح الجملة مع الحفاظ على معناها:<br>«'+x[0]+'»';answer=x[1];why=x[3];ops=sh([answer,...sh(E.filter(v=>v[1]!==answer)).slice(0,3).map(v=>v[1])])}
 }
 if(game!=='match'&&game!=='builder'){$('q').innerHTML=q;options(ops)}
}
$('next').onclick=next;window.HMGameStudio={start,game};$('modes').innerHTML=modes.map(m=>'<article class="card"><div class="ico">'+m[1]+'</div><h2>'+m[2]+'</h2><p>'+m[3]+'</p><button class="start" data-game="'+m[0]+'">ابدأ الجولة</button></article>').join('');document.querySelectorAll('.start').forEach(b=>b.onclick=()=>start(b.dataset.game))
})();
