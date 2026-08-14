/* HM Academy — contextual lesson navigation for standalone lesson pages. */
(function(){
  function init(){
    const nav=document.querySelector('.topnav');
    if(!nav || document.getElementById('hm-context-nav')) return;

    const home=[...nav.querySelectorAll('a')].find(a=>/الرئيسية/.test((a.textContent||'').trim()));
    if(!home) return;

    const tabButtons=[...document.querySelectorAll('.tab')];
    const items=tabButtons.map(b=>({
      id:b.dataset.id,
      label:(b.textContent||'').trim()
    })).filter(x=>x.id);
    const active=document.querySelector('.tab.active')?.dataset.id || items[0]?.id || 'facilities';

    home.textContent='الرئيسية';
    home.href='#';
    home.setAttribute('aria-expanded','false');
    home.setAttribute('aria-controls','hm-context-nav');

    const menu=document.createElement('div');
    menu.id='hm-context-nav';
    menu.className='hm-context-menu';
    menu.setAttribute('role','menu');
    menu.innerHTML=`
      <div class="hm-context-title">التنقل داخل الدرس</div>
      <div class="hm-context-subtitle">انتقل مباشرةً إلى الجزء الذي تريده دون مغادرة الدرس.</div>
      <div class="hm-context-grid">${items.map(x=>`<a class="hm-context-item${x.id===active?' active':''}" href="#" data-context-section="${x.id}">${x.label}</a>`).join('')}</div>
      <div class="hm-context-divider"></div>
      <a class="hm-context-item hm-context-map" href="../../../../grade-8.html#unit-1">🧭 خريطة الوحدة</a>
      <a class="hm-context-item hm-context-home" href="../../../../index.html">⌂ الصفحة الرئيسية للمنصة</a>
    `;
    document.body.appendChild(menu);

    const style=document.createElement('style');
    style.textContent=`
      .hm-context-menu{position:fixed;z-index:9999;top:64px;right:18px;width:min(440px,calc(100vw - 36px));padding:14px;background:#fff;border:1px solid #dfe6f2;border-radius:20px;box-shadow:0 22px 60px rgba(20,38,74,.22);display:none}
      .hm-context-menu.open{display:block;animation:hmContextIn .16s ease-out}
      .hm-context-title{font-weight:900;color:#14264a;font-size:16px;padding:3px 4px 4px}
      .hm-context-subtitle{font-size:12px;color:#68758c;line-height:1.7;padding:0 4px 11px}
      .hm-context-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
      .hm-context-item{display:block;text-decoration:none!important;color:#243b67!important;background:#f7f9fd;border:1px solid #e0e6f0;border-radius:12px;padding:10px 11px;font-weight:900;font-size:13px}
      .hm-context-item:hover,.hm-context-item.active{background:#fff1f7;border-color:#e92d83;color:#c51e6c!important}
      .hm-context-divider{height:1px;background:#e7ebf2;margin:12px 0}
      .hm-context-map{background:#eef5ff}
      .hm-context-home{background:#14264a;color:#fff!important;text-align:center}
      @keyframes hmContextIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
      @media(max-width:650px){.hm-context-menu{top:60px;right:10px;width:calc(100vw - 20px)}.hm-context-grid{grid-template-columns:1fr 1fr}}
    `;
    document.head.appendChild(style);

    function close(){menu.classList.remove('open');home.setAttribute('aria-expanded','false');}
    home.addEventListener('click',function(e){
      e.preventDefault();
      const open=menu.classList.toggle('open');
      home.setAttribute('aria-expanded',String(open));
    });

    menu.addEventListener('click',function(e){
      const link=e.target.closest('[data-context-section]');
      if(!link) return;
      e.preventDefault();
      const id=link.dataset.contextSection;
      const tab=document.querySelector(`.tab[data-id="${CSS.escape(id)}"]`);
      close();
      if(tab){tab.click();window.scrollTo({top:document.querySelector('#tabs')?.offsetTop||0,behavior:'smooth'});}
    });

    document.addEventListener('click',function(e){
      if(!menu.contains(e.target) && !home.contains(e.target)) close();
    });
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});

    // Replace the verbose breadcrumb/back-row with unobtrusive visual context.
    const crumb=document.querySelector('.crumb');
    if(crumb) crumb.style.display='none';
    const back=document.querySelector('.back-row');
    if(back) back.style.display='none';
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
