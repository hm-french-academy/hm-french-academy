// HM Academy Dynamic Supabase Lesson Runtime
(function(){
  async function getClient(){
    if(window.supabase) return window.supabase.createClient(window.HMProductionConfig.supabaseUrl, window.HMProductionConfig.supabaseAnonKey);
    await new Promise(resolve=>{
      const s=document.createElement('script');
      s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      s.onload=resolve; s.onerror=resolve;
      document.head.appendChild(s);
    });
    if(!window.supabase||!window.HMProductionConfig) return null;
    return window.supabase.createClient(window.HMProductionConfig.supabaseUrl, window.HMProductionConfig.supabaseAnonKey);
  }

  function renderSections(content){
    const root=document.getElementById('app');
    if(!root||!content) return;
    const sections=content.sections||[];
    const box=document.createElement('div');
    box.id='dynamic-lesson-sections';
    box.innerHTML=sections.map(section=>{
      if(section.type==='vocabulary'){
        return `<section class="card"><h2>📚 Vocabulaire</h2><div class="vgrid">${(section.items||[]).map(i=>`<article class="vcard"><div class="fr">${i.fr||''}</div><div class="ar">${i.ar||''}</div><button class="listen">🔊</button></article>`).join('')}</div></section>`;
      }
      return `<section class="card"><h2>${section.title||section.type||'Section'}</h2><p>${section.text||''}</p></section>`;
    }).join('');
    root.appendChild(box);
  }

  async function init(){
    const id=new URLSearchParams(location.search).get('lesson_id')||new URLSearchParams(location.search).get('id');
    if(!id) return;
    const client=await getClient();
    if(!client) return;
    const {data,error}=await client.from('lessons').select('*').eq('id',id).single();
    if(error||!data) return console.warn('Lesson load failed',error);
    const app=document.getElementById('app');
    if(app){
      app.innerHTML=`<section class="card"><h1>${data.title||''}</h1><p>${data.objective||''}</p><b>⏱ ${data.duration||0} min | ⭐ ${data.xp_reward||0} XP</b></section>`;
    }
    renderSections(data.content||{});
    window.HMCurrentLesson=data;
    window.dispatchEvent(new CustomEvent('hm:supabase-lesson-ready',{detail:data}));
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
