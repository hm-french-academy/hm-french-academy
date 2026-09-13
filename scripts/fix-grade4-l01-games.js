const fs=require('fs');
const path='grade-4-l01-learning-studio.html';
let html=fs.readFileSync(path,'utf8');
const original=html;

// Production-only repair for the embedded Grade 4 Lesson 1 game center.
// Keep the lesson content/layout unchanged; repair only game interaction/state.
const patch=`<script>
(function(){
  const originalRenderGame=window.renderGame;
  const originalSetGame=window.setGame;
  if(typeof originalRenderGame!=='function'||typeof originalSetGame!=='function'){
    throw new Error('Grade 4 game runtime functions not found');
  }

  function currentGame(){
    try{return typeof game!=='undefined'?game:null}catch(_){return null}}

  function syncTabs(tab){
    document.querySelectorAll('.gameTab').forEach(b=>{
      const m=b.getAttribute('onclick')||'';
      b.classList.toggle('active',m.includes("setGame('"+tab+"')"));
    });
  }

  function bindRaceAnswers(){
    const state=currentGame();
    const panel=document.getElementById('gamePanel');
    if(!state||state.tab!=='race'||!panel)return;
    const cards=panel.querySelector('.cards');
    const prompt=prompts[state.round%prompts.length];
    if(!cards||!prompt)return;

    // Shuffle each question once; the correct answer is no longer fixed in position 1.
    [...cards.children].sort(()=>Math.random()-.5).forEach(b=>cards.appendChild(b));

    const buttons=[...cards.querySelectorAll('.choice')];
    buttons.forEach(b=>{
      b.removeAttribute('onclick');
      b.addEventListener('click',()=>{
        const s=currentGame();
        if(!s||s.tab!=='race'||b.disabled)return;
        const feedback=panel.querySelector('#gf');
        const answer=b.textContent.trim();
        const correct=prompt[2];
        buttons.forEach(x=>x.disabled=true);
        if(answer===correct){
          b.classList.add('correct');
          s.score++;
          if(feedback)feedback.textContent='✅ إجابة صحيحة!';
        }else{
          b.classList.add('wrong');
          const right=buttons.find(x=>x.textContent.trim()===correct);
          if(right)right.classList.add('correct');
          if(feedback)feedback.textContent='❌ الإجابة الصحيحة: '+correct;
        }
        setTimeout(()=>{
          const now=currentGame();
          if(!now||now.tab!=='race')return;
          now.round++;
          if(now.round>=prompts.length){
            panel.innerHTML='<div class="gameScore">🎉 أحسنت! النتيجة: '+now.score+' / '+prompts.length+'</div><button type="button" class="btn" id="raceAgain">إعادة اللعبة</button>';
            const again=document.getElementById('raceAgain');
            if(again)again.onclick=()=>{now.score=0;now.round=0;window.renderGame();};
          }else{
            window.renderGame();
          }
        },650);
      },{once:true});
    });
  }

  function bindTabs(){
    document.querySelectorAll('.gameTab').forEach(b=>{
      if(b.dataset.hmBound==='1')return;
      b.dataset.hmBound='1';
      b.addEventListener('click',e=>{
        e.preventDefault();
        e.stopImmediatePropagation();
        const m=b.getAttribute('onclick')||'';
        const hit=m.match(/setGame\\('([^']+)'\\)/);
        if(!hit)return;
        originalSetGame(hit[1]);
        syncTabs(hit[1]);
      },true);
    });
  }

  window.setGame=function(tab){
    originalSetGame(tab);
    syncTabs(tab);
    bindTabs();
  };

  window.renderGame=function(){
    originalRenderGame();
    const state=currentGame();
    if(!state)return;
    syncTabs(state.tab);
    bindTabs();
    bindRaceAnswers();
  };

  // Re-render once after the lesson creates the embedded game center.
  setTimeout(()=>{
    const state=currentGame();
    if(state)window.renderGame();
  },0);
})();
</script>`;

const marker='</body>';
if(!html.includes(marker)) throw new Error('Grade 4 Lesson 1 closing body marker not found');
html=html.replace(marker,patch+marker);
if(html===original) throw new Error('Grade 4 games file was not changed');
fs.writeFileSync(path,html,'utf8');
console.log('Grade 4 Lesson 1 games repaired: clickable race answers, shuffled choices, and synchronized active game tabs.');
