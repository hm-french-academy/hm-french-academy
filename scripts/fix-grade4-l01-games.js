const fs=require('fs');
const path='grade-4-l01-learning-studio.html';
let html=fs.readFileSync(path,'utf8');
const original=html;

// 1) Make the selected game tab follow the game actually rendered.
html=html.replace(
  '<button class="gameTab ${game.tab===x[0]?\'active\':\'\'}" onclick="setGame(\'${x[0]}\')">',
  '<button class="gameTab ${game.tab===x[0]?\'active\':\'\'}" data-game="${x[0]}" onclick="setGame(\'${x[0]}\')">'
);
html=html.replace(
  "function setGame(t){game={tab:t,score:0,round:0,memory:[],open:[],matched:[],order:[]};renderGame()}",
  "function setGame(t){game={tab:t,score:0,round:0,memory:[],open:[],matched:[],order:[]};document.querySelectorAll('.gameTab').forEach(b=>b.classList.toggle('active',b.dataset.game===t));renderGame()}"
);

// 2) Shuffle Race answers so the correct answer is not always the first choice.
html=html.replace(
  "const x=prompts[game.round%prompts.length];p.innerHTML=`<div class=\"gameScore\">النقاط: ${game.score} / ${game.round}</div><div class=\"gamePrompt fr\">${x[0]}</div><div class=\"cards\">${x[1].map(o=>`<button class=\"choice\" onclick=\"race('${o}','${x[2]}')\">${o}</button>`).join('')}</div><p class=\"feedback\" id=\"gf\"></p>`",
  "const x=prompts[game.round%prompts.length];const opts=[...x[1]].sort(()=>Math.random()-.5);p.innerHTML=`<div class=\"gameScore\">النقاط: ${game.score} / ${game.round}</div><div class=\"gamePrompt fr\">${x[0]}</div><div class=\"cards\">${opts.map(o=>`<button class=\"choice\" onclick=\"race('${o}','${x[2]}')\">${o}</button>`).join('')}</div><p class=\"feedback\" id=\"gf\"></p>`"
);

// 3) Replace drag-only ordering with explicit mobile-friendly up/down controls.
html=html.replace(
  "p.innerHTML=`<div class=\"gameScore\">اسحب البطاقات ورتب الفصول من بداية السنة إلى نهايتها.</div><div class=\"orderList\" id=\"ol\">${game.order.map(k=>{const s=seasons.find(x=>x.k===k);return `<button class=\"orderItem\" draggable=\"true\" data-k=\"${k}\">${s.pic} ${s.fr}</button>`}).join('')}</div><button class=\"btn\" onclick=\"checkOrder()\">تحقق من الترتيب</button><p class=\"feedback\" id=\"gf\"></p>`;",
  "p.innerHTML=`<div class=\"gameScore\">رتّب الفصول من بداية السنة إلى نهايتها.</div><div class=\"orderList\" id=\"ol\">${game.order.map((k,i)=>{const s=seasons.find(x=>x.k===k);return `<div class=\"orderRow\"><button class=\"orderItem\" draggable=\"true\" data-k=\"${k}\">${s.pic} ${s.fr}</button><button class=\"btn light\" type=\"button\" onclick=\"moveOrder(${i},-1)\">↑</button><button class=\"btn light\" type=\"button\" onclick=\"moveOrder(${i},1)\">↓</button></div>`}).join('')}</div><button class=\"btn\" onclick=\"checkOrder()\">تحقق من الترتيب</button><p class=\"feedback\" id=\"gf\"></p>`;"
);
html=html.replace(
  ".orderList{display:grid;gap:9px;max-width:620px;margin:12px auto}.orderItem{",
  ".orderList{display:grid;gap:9px;max-width:620px;margin:12px auto}.orderRow{display:grid;grid-template-columns:1fr auto auto;gap:6px;align-items:center}.orderItem{"
);
html=html.replace(
  "function checkOrder(){document.getElementById('gf').textContent=",
  "function moveOrder(i,d){const j=i+d;if(j<0||j>=game.order.length)return;[game.order[i],game.order[j]]=[game.order[j],game.order[i]];renderGame()}function checkOrder(){document.getElementById('gf').textContent="
);

// Keep the existing drag behavior too, but never allow the game to become drag-only.
if(!html.includes('data-game="race"')) throw new Error('Grade 4 game-tab patch did not apply');
if(!html.includes('const opts=[...x[1]].sort')) throw new Error('Grade 4 race shuffle patch did not apply');
if(!html.includes('function moveOrder')) throw new Error('Grade 4 order controls patch did not apply');
if(html===original) throw new Error('Grade 4 games file was not changed');
fs.writeFileSync(path,html,'utf8');
console.log('Grade 4 Lesson 1 games repaired: active tabs, shuffled race answers, mobile order controls.');
