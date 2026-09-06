const fs=require('fs');
const path='grade-4-l01-learning-studio.html';
let html=fs.readFileSync(path,'utf8');
const original=html;

// Patch at runtime instead of depending on fragile minified source fragments.
const patch=`<script>
(function(){
  const __renderGame=window.renderGame;
  const __setGame=window.setGame;
  if(typeof __renderGame!=='function'||typeof __setGame!=='function') throw new Error('Grade 4 game runtime functions not found');

  window.setGame=function(t){
    __setGame(t);
    document.querySelectorAll('.gameTab').forEach(b=>{
      const m=b.getAttribute('onclick')||'';
      b.classList.toggle('active',m.includes("setGame('"+t+"')"));
    });
  };

  window.renderGame=function(){
    __renderGame();
    const p=document.getElementById('gamePanel');
    if(!p)return;

    // Race: randomize visible choices so the correct answer is not always first.
    if(window.game&&game.tab==='race'){
      const cards=p.querySelector('.cards');
      if(cards){[...cards.children].sort(()=>Math.random()-.5).forEach(b=>cards.appendChild(b));}
    }

    // Order: add explicit ↑/↓ controls so touch/mobile users are not dependent on drag-and-drop.
    if(window.game&&game.tab==='order'){
      const list=document.getElementById('ol');
      if(list){
        [...list.querySelectorAll('.orderItem')].forEach((item,i)=>{
          if(item.parentElement.classList.contains('orderRow'))return;
          const row=document.createElement('div');
          row.className='orderRow';
          row.style.cssText='display:grid;grid-template-columns:1fr auto auto;gap:6px;align-items:center';
          item.replaceWith(row);row.appendChild(item);
          [-1,1].forEach(d=>{
            const b=document.createElement('button');
            b.type='button';b.className='btn light';b.textContent=d<0?'↑':'↓';
            b.onclick=()=>{const j=i+d;if(j<0||j>=game.order.length)return;[game.order[i],game.order[j]]=[game.order[j],game.order[i]];window.renderGame();};
            row.appendChild(b);
          });
        });
      }
    }

    // Always synchronize the visible active tab after a render.
    if(window.game)document.querySelectorAll('.gameTab').forEach(b=>{
      const m=b.getAttribute('onclick')||'';
      b.classList.toggle('active',m.includes("setGame('"+game.tab+"')"));
    });
  };

  // CSS for the mobile-friendly order rows.
  const style=document.createElement('style');
  style.textContent='.orderRow{display:grid;grid-template-columns:1fr auto auto;gap:6px;align-items:center}.orderRow .orderItem{min-width:0}';
  document.head.appendChild(style);

  // Initial game render is already called by the page; refresh the tab state once.
  setTimeout(()=>{if(window.game)window.renderGame();},0);
})();
</script>`;

const marker='</body>';
if(!html.includes(marker)) throw new Error('Grade 4 Lesson 1 closing body marker not found');
html=html.replace(marker,patch+marker);
if(html===original) throw new Error('Grade 4 games file was not changed');
fs.writeFileSync(path,html,'utf8');
console.log('Grade 4 Lesson 1 games repaired: active tabs, shuffled race answers, mobile order controls.');
