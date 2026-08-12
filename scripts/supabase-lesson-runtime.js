// HM Academy Dynamic Supabase Lesson Runtime
(function(){
 async function getClient(){
  if(window.supabase) return window.supabase.createClient(window.HMProductionConfig.supabaseUrl,window.HMProductionConfig.supabaseAnonKey);
  await new Promise(r=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';s.onload=r;s.onerror=r;document.head.appendChild(s);});
  if(!window.supabase||!window.HMProductionConfig)return null;
  return window.supabase.createClient(window.HMProductionConfig.supabaseUrl,window.HMProductionConfig.supabaseAnonKey);
 }
 const valid=(v)=>typeof v==='string' && v.trim() && !/اكتشف|استخدم الجملة|lorem|placeholder/i.test(v);
 function normalizeLesson(data){
  if(window.HMPremiumEngine?.normalizeLesson) return window.HMPremiumEngine.normalizeLesson(data);
  return {...data,sections:Array.isArray(data?.content?.sections)?data.content.sections:[]};
 }
 function validateLesson(data){
  if(window.HMPremiumEngine?.validate) return window.HMPremiumEngine.validate(data);
  return [];
 }
 function renderBlock(s){
  if(s.type==='vocabulary') return `<section class="card"><h2>📚 Vocabulaire</h2><div class="vgrid">${(s.items||[]).filter(i=>valid(i.fr)&&valid(i.ar)).map(i=>`<article class="vcard"><div class="fr">${i.fr}</div><div class="ar">${i.ar}</div><button class="listen" data-audio="${i.audio||''}">🔊</button></article>`).join('')}</div></section>`;
  if(s.type==='dialogue') return `<section class="card"><h2>💬 Dialogue</h2>${(s.lines||[]).filter(l=>valid(l.fr)).map(l=>`<p><b>${l.speaker||''}</b> : ${l.fr}<br>${l.ar||''}</p>`).join('')}</section>`;
  if(s.type==='grammar') return `<section class="card"><h2>📘 Grammaire</h2>${valid(s.text||s.rule)?`<p>${s.text||s.rule}</p>`:''}${valid(s.ar)?`<div class="rule-ar">${s.ar}</div>`:''}</section>`;
  if(s.type==='exercise'||s.type==='assessment') return `<section class="card"><h2>📝 ${s.title||'Évaluation'}</h2>${(s.questions||[]).filter(q=>valid(q.question)).map(q=>`<div class="q"><b>${q.question}</b></div>`).join('')}</section>`;
  if(s.type==='media' && valid(s.url)) return `<section class="card" id="lesson-media"><h2>🎧 Média</h2><p>${s.url}</p></section>`;
  return valid(s.text)?`<section class="card"><h2>${s.title||s.type||'Section'}</h2><p>${s.text}</p></section>`:'';
 }
 function renderSections(content){
  const root=document.getElementById('app'); if(!root)return;
  const box=document.createElement('div');box.id='dynamic-lesson-sections';
  box.innerHTML=(content.sections||[]).map(renderBlock).filter(Boolean).join('');root.appendChild(box);
 }
 async function init(){
  const id=new URLSearchParams(location.search).get('lesson_id')||new URLSearchParams(location.search).get('id');if(!id)return;
  const client=await getClient();if(!client)return;
  const {data,error}=await client.from('lessons').select('*').eq('id',id).single();
  if(error||!data)return console.warn('Lesson load failed',error);
  const lesson=normalizeLesson(data);
  const errors=validateLesson(lesson);
  if(errors.length) console.warn('HM Lesson validation:',errors);
  const app=document.getElementById('app');
  if(app) app.innerHTML=`<section class="card"><h1>${lesson.title||''}</h1><p>${lesson.objective||''}</p><b>⏱ ${lesson.duration||0} min | ⭐ ${lesson.xp_reward||0} XP</b></section>`;
  renderSections(lesson);
  window.HMCurrentLesson=lesson;
  window.dispatchEvent(new CustomEvent('hm:supabase-lesson-ready',{detail:lesson}));
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
