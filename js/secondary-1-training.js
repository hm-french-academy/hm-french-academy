// HM Academy — repeatable training for 1ère secondaire → 2ème secondaire review.
(function(){
  'use strict';
  function init(){
    const tabs=document.getElementById('tabs');
    const main=document.querySelector('main');
    if(!tabs||!main||document.getElementById('training')) return;

    const ready=document.getElementById('ready');
    const section=document.createElement('section');
    section.id='training';
    section.className='section';
    section.hidden=true;
    section.innerHTML=`
      <h2>🎮 التدريب</h2>
      <p>تدريب مستقل على نفس مهارات المراجعة. يمكنك المحاولة والتكرار دون التأثير على التشخيص.</p>
      <div id="trainingQuiz"></div>
      <button id="trainingBtn" class="btn">تصحيح التدريب</button>
      <button id="trainingReset" class="btn" style="background:#fff;color:#173a82">إعادة التدريب</button>
      <div id="trainingResult"></div>`;
    main.insertBefore(section,ready);

    const b=document.createElement('button');
    b.type='button'; b.dataset.target='training'; b.textContent='🎮 التدريب';
    tabs.insertBefore(b,tabs.querySelector('[data-target="ready"]'));

    const bank=[
      ['T1','Je ___ avec mes amis.',['parle','parles','parlons','parler'],'parle'],
      ['T2','Nous ___ au club de sport.',['allons','allez','vont','vais'],'allons'],
      ['T3','Elle ___ quinze ans.',['a','as','ai','avons'],'a'],
      ['T4','C’est ___ trousse. Elle est à Marie.',['sa','son','ses','leur'],'sa'],
      ['T5','J’aime ___ BD françaises.',['les','le','la','un'],'les'],
      ['T6','Il n’y ___ pas de CDI.',['a','ont','est','sont'],'a'],
      ['T7','___ heure est-il ? — Il est dix heures.',['Quelle','Quel','Quels','Quelles'],'Quelle'],
      ['T8','Mes amis sont sympathiques et ___.',['sportifs','sportive','sportif','sportives'],'sportifs'],
      ['T9','Je ne ___ pas le lundi.',['travaille','travailles','travaillons','travailler'],'travaille'],
      ['T10','Je parle avec Paul et je parle avec ___.',['lui','elle','ils','elles'],'lui'],
      ['T11','Nous avons ___ livres dans la classe.',['des','un','la','le'],'des'],
      ['T12','Demain, je vais ___ cinéma.',['au','à la','aux','en'],'au']
    ];

    function show(id){
      document.querySelectorAll('.section').forEach(s=>s.hidden=true);
      const target=document.getElementById(id); if(target) target.hidden=false;
      tabs.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x.dataset.target===id));
      window.scrollTo(0,0);
    }
    b.addEventListener('click',()=>show('training'));

    function render(){
      const root=document.getElementById('trainingQuiz'); root.innerHTML='';
      bank.forEach((q,i)=>{
        const box=document.createElement('article'); box.className='q';
        const head=document.createElement('div'); head.className='qHead';
        const num=document.createElement('span'); num.className='qNum'; num.textContent=(i+1)+'.';
        const text=document.createElement('span'); text.className='qText'; text.textContent=q[1];
        head.append(num,text); box.append(head);
        const opts=[...q[2]];
        for(let j=opts.length-1;j>0;j--){const k=Math.floor(Math.random()*(j+1));[opts[j],opts[k]]=[opts[k],opts[j]]}
        opts.forEach(o=>{
          const label=document.createElement('label');
          const input=document.createElement('input'); input.type='radio'; input.name='training-'+q[0]; input.value=o;
          label.append(input,document.createTextNode(o)); box.append(label);
        });
        root.append(box);
      });
      document.getElementById('trainingResult').innerHTML='';
    }
    function grade(){
      let score=0, answered=0;
      bank.forEach(q=>{const x=document.querySelector('input[name="training-'+q[0]+'"]:checked');if(x){answered++;if(x.value===q[3])score++}});
      if(answered<bank.length){document.getElementById('trainingResult').innerHTML='<div class="result">⚠️ أكمل أسئلة التدريب أولًا ثم صحح الإجابات.</div>';return;}
      const pct=Math.round(score/bank.length*100);
      document.getElementById('trainingResult').innerHTML='<div class="result"><h3>نتيجتك: '+score+'/'+bank.length+' — '+pct+'%</h3><p>'+(pct>=70?'✅ أداء جيد، يمكنك الانتقال لاختبار الجاهزية.':'💡 راجع النقاط التي أخطأت فيها ثم أعد التدريب.')+'</p></div>';
    }
    document.getElementById('trainingBtn').onclick=grade;
    document.getElementById('trainingReset').onclick=render;
    render();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
