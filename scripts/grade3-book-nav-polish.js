(()=>{'use strict';
const icons=['◉','⌕','◇','◆','◌','➤','◒','▣','♟','★','✓'];
const names=['البداية','اكتشف','المفردات','القاعدة','المحادثة','حان دورك','اسمع وتحدث','الوسائط','مركز الألعاب','التقييم','بعد الرحلة'];
let busy=false;
function polish(){
  if(busy)return;
  const j=document.getElementById('journey');
  if(!j)return;
  busy=true;
  const buttons=[...j.querySelectorAll('button')];
  buttons.forEach((b,i)=>{
    const n=names[i]||b.textContent.replace(/^\S+\s*/,'');
    const active=b.classList.contains('active')||b.getAttribute('aria-current')==='step';
    b.textContent='';
    b.className='book-step'+(active?' active':'');
    const badge=document.createElement('span');
    badge.className='book-step-icon';
    badge.textContent=icons[i]||'•';
    const label=document.createElement('span');
    label.className='book-step-label';
    label.textContent=n;
    b.append(badge,label);
    b.setAttribute('aria-label',n);
    if(active)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');
  });
  j.classList.add('book-chapter-rail');
  busy=false;
}
const style=document.createElement('style');
style.textContent='.book-chapter-rail{display:flex!important;align-items:center;gap:10px!important;padding:12px 14px!important;overflow-x:auto!important;scrollbar-width:none!important;background:rgba(255,255,255,.94)!important;border-bottom:1px solid #e7edf3!important}.book-chapter-rail::-webkit-scrollbar{display:none}.book-step{flex:0 0 auto;display:inline-flex;align-items:center;gap:7px;border:1px solid #e2e8ef!important;background:#f8fafc!important;color:#536078!important;border-radius:16px!important;padding:7px 10px!important;font-weight:900!important;cursor:pointer!important;box-shadow:0 2px 7px rgba(23,50,77,.05);transition:transform .18s,box-shadow .18s,background .18s,color .18s}.book-step:hover{transform:translateY(-1px);box-shadow:0 6px 14px rgba(23,50,77,.1)}.book-step.active{background:#17324d!important;color:#fff!important;border-color:#17324d!important;box-shadow:0 7px 16px rgba(23,50,77,.2)}.book-step-icon{width:28px;height:28px;border-radius:10px;display:grid;place-items:center;background:#eaf3f9;color:#17324d;font-size:15px;font-weight:900}.book-step.active .book-step-icon{background:rgba(255,255,255,.18);color:#fff}.book-step-label{font-size:13px;white-space:nowrap}@media(max-width:650px){.book-step{padding:6px 8px!important;border-radius:14px!important}.book-step-icon{width:25px;height:25px;border-radius:8px;font-size:14px}.book-step-label{font-size:12px}}';
document.head.appendChild(style);
const obs=new MutationObserver(()=>{if(!busy)requestAnimationFrame(polish)});
obs.observe(document.getElementById('journey')||document.documentElement,{subtree:true,childList:true});
polish();
})();