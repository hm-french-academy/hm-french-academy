(function(){'use strict';
/* HM Academy — Unit 2 premium resource presentation.
 * Uses the shared lesson runtime as the single source of truth.
 * This layer improves Files/Games presentation and completes U2 pronunciation rendering.
 */
const CSS=`
.u2-resource-intro{margin-bottom:16px;padding:18px 20px;border:1px solid #dfe6f0;border-radius:22px;background:linear-gradient(135deg,#f8fbff,#fff7fb);box-shadow:0 8px 24px rgba(20,38,74,.06)}
.u2-resource-intro .eyebrow{font-size:12px;font-weight:900;letter-spacing:.04em;color:#e92d83;text-transform:uppercase}.u2-resource-intro h3{margin:5px 0 7px;font-size:23px;color:#14264a}.u2-resource-intro p{margin:0;color:#68758b;line-height:1.8}.u2-resource-steps{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-top:14px}.u2-resource-step{padding:10px 7px;border-radius:14px;background:#fff;border:1px solid #e1e7f0;text-align:center;font-size:12px;font-weight:900;color:#506079}.u2-resource-step b{display:block;font-size:20px;margin-bottom:3px}.u2-resource-step.active{border-color:#e92d83;background:#fff2f8;color:#c51e69}
.u2-file-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px!important}.u2-file-card{position:relative;overflow:hidden;min-height:190px;display:flex;flex-direction:column;justify-content:space-between;border:1px solid #dfe6f0!important;border-radius:22px!important;padding:20px!important;background:#fff!important;box-shadow:0 10px 28px rgba(20,38,74,.08)!important}.u2-file-card:before{content:'';position:absolute;inset:0 0 auto;height:5px;background:linear-gradient(90deg,#e92d83,#2563eb,#16a394)}.u2-file-card .u2-kicker{font-size:12px;font-weight:900;color:#68758b;margin-bottom:5px}.u2-file-card h3{font-size:22px;margin:0 0 8px;color:#14264a}.u2-file-card p{font-size:14px;line-height:1.7;color:#68758b;margin:0 0 15px}.u2-file-card .btn{width:100%;text-align:center;border-radius:13px}.u2-file-card .u2-file-icon{width:50px;height:50px;display:grid;place-items:center;border-radius:15px;background:#f2f5fb;font-size:27px;margin-bottom:13px}.u2-file-card.u2-featured{grid-column:1/-1;background:linear-gradient(135deg,#f8fbff,#fff)!important}.u2-file-card.u2-games{background:linear-gradient(135deg,#fff8fc,#f7fbff)!important}
/* Games now follows the same card rhythm used by the Unit 1 lesson experience. */
.u2-game-center{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px!important}.u2-game-card{min-height:0;border:1px solid #dfe6f0!important;border-radius:20px!important;background:#fff!important;box-shadow:0 7px 20px rgba(20,38,74,.07)!important;padding:18px!important;display:flex;gap:14px;align-items:flex-start}.u2-game-card .gameIcon{width:48px;height:48px;min-width:48px;border-radius:14px;background:#f1f5fc;display:grid;place-items:center;font-size:26px}.u2-game-card h3{margin:0 0 7px;font-size:20px;color:#14264a}.u2-game-card p{margin:0;color:#68758b;line-height:1.7;font-size:14px}.u2-game-card .btn{margin-top:11px}.u2-games-cta{display:flex;justify-content:center;margin-top:15px}.u2-games-cta .btn{min-width:240px;text-align:center;padding:13px 18px;border-radius:14px}
@media(max-width:700px){.u2-resource-steps{grid-template-columns:repeat(5,minmax(75px,1fr));overflow:auto}.u2-file-grid,.u2-game-center{grid-template-columns:1fr!important}.u2-file-card.u2-featured{grid-column:auto}.u2-file-card{min-height:175px}.u2-game-card{padding:17px}.u2-game-card h3{font-size:19px}}
`;
function style(){if(document.getElementById('u2-premium-resource-css'))return;const s=document.createElement('style');s.id='u2-premium-resource-css';s.textContent=CSS;document.head.appendChild(s)}
function labels(){return document.documentElement.dir==='rtl'?{intro:'مسار ملفات الدرس',title:'من التعلّم إلى الإتقان',desc:'اتبع المسار المقترح: تعلّم أولًا، راجع، قيّم نفسك، ثم انتقل إلى الألعاب.',steps:[['📘','التفاعلي'],['📄','المرجع'],['📝','التقييم'],['🎯','اختبار سريع'],['🎮','الألعاب']],open:'ابدأ الآن ↗',ind:'ملف مستقل للدرس'}:{intro:'LESSON RESOURCES',title:'From learning to mastery',desc:'Follow the recommended sequence: learn, review, assess, then practice through games.',steps:[['📘','Interactive'],['📄','Reference'],['📝','Assessment'],['🎯','Quick quiz'],['🎮','Games']],open:'Start now ↗',ind:'Independent lesson resource'}}
function enhanceFiles(){const grid=document.querySelector('#viewer .fileGrid');if(!grid||grid.dataset.u2Styled)return;grid.dataset.u2Styled='1';grid.classList.add('u2-file-grid');const L=labels();const intro=document.createElement('div');intro.className='u2-resource-intro';intro.innerHTML='<div class="eyebrow">'+L.intro+'</div><h3>'+L.title+'</h3><p>'+L.desc+'</p><div class="u2-resource-steps">'+L.steps.map((x,i)=>'<div class="u2-resource-step '+(i===0?'active':'')+'"><b>'+x[0]+'</b>'+x[1]+'</div>').join('')+'</div>';grid.parentNode.insertBefore(intro,grid);
 [...grid.children].forEach((card,i)=>{card.classList.add('u2-file-card');const h=card.querySelector('h3'),p=card.querySelector('p'),a=card.querySelector('a');if(!h||!a)return;const raw=h.textContent.trim();const match=raw.match(/^(..)(?:\s+)(.*)$/);const icon=match?match[1]:raw.slice(0,2);const title=match?match[2]:raw;h.textContent=title;const iconBox=document.createElement('div');iconBox.className='u2-file-icon';iconBox.textContent=icon;card.insertBefore(iconBox,card.firstChild);if(p)p.textContent=L.ind;a.textContent=L.open;if(i===0)card.classList.add('u2-featured');if(i===4)card.classList.add('u2-games')});}
function enhanceGames(){const grid=document.querySelector('#viewer .gameCenter');if(!grid||grid.dataset.u2Styled)return;grid.dataset.u2Styled='1';grid.classList.add('u2-game-center');const cards=[...grid.children],icons=['🧩','🎯','🎤','⚡','📚'];cards.forEach((card,i)=>{card.classList.add('u2-game-card');const old=card.querySelector('span');if(old){const icon=document.createElement('div');icon.className='gameIcon';icon.textContent=icons[i]||'🎮';old.replaceWith(icon)}});const link=grid.nextElementSibling;if(link&&link.tagName==='A'){link.parentNode.classList.add('u2-games-cta');link.textContent=document.documentElement.dir==='rtl'?'🎮 ابدأ مركز الألعاب ↗':'🎮 Open Game Center ↗'}}

/* Lesson 1 pronunciation fallback: the source notes intentionally contain only the first part.
 * Keep the shared JSON untouched and complete the rendered lesson with curriculum-specific notes.
 */
const U2L1_PRON={
 'la maison':'ai في maison تُنطق /ɛ/ تقريبًا؛ و s بين حركتين تُنطق /z/.',
 'la chambre':'ch تُنطق /ʃ/؛ و am قبل b تعطي صوتًا أنفيًا /ɑ̃/.',
 'la porte':'o تُنطق /ɔ/ تقريبًا؛ و e الأخيرة لا تُنطق.',
 'la fenêtre':'ê تُنطق /ɛ/؛ و e الأخيرة صامتة.',
 'le lit':'i تُنطق /i/؛ والكلمة قصيرة من مقطع واحد.',
 "l'armoire":'oi تُنطق /wa/؛ و r فرنسية /ʁ/.',
 'un oreiller':'ou تُنطق /u/؛ و ill تعطي صوت /j/ تقريبًا؛ و er في النهاية لا تُنطق منفصلة.',
 'un bureau':'eau تُنطق /o/؛ و r الأخيرة فرنسية /ʁ/.',
 'une chaise':'ch تُنطق /ʃ/؛ و e الأخيرة لا تُنطق.',
 'une table de chevet':'ch في chevet تُنطق /ʃ/؛ و e النهائية لا تُنطق.',
 'un abat-jour':'ab تُنطق متتابعة؛ و j تُنطق /ʒ/؛ و our في jour تُنطق /uʁ/.',
 'un tapis':'a تُنطق /a/؛ و s النهائية لا تُنطق.',
 'un matelas':'a واضحة؛ و s النهائية لا تُنطق.',
 'un réveil':'é تُنطق /e/؛ و eil في النهاية تُنطق تقريبًا /ɛj/.',
 'un tableau':'eau تُنطق /o/؛ لذلك tableau تنتهي بصوت /o/.',
 'un miroir':'oi تُنطق /wa/؛ و r الأخيرة فرنسية /ʁ/.',
 'un lustre':'u تُنطق /y/؛ و e الأخيرة لا تُنطق.',
 'un rideau':'eau تُنطق /o/؛ و r فرنسية /ʁ/.',
 'le salon':'on في salon صوت أنفي /ɔ̃/؛ و n لا تُنطق منفصلة.',
 'la cuisine':'ui تُنطق تقريبًا /ɥi/؛ و s بين حركتين تُنطق /z/.',
 'la salle de bains':'s في salle تُنطق /s/؛ و ain في bains صوت أنفي /ɛ̃/؛ s الأخيرة لا تُنطق.'
};
function norm(s){return String(s||'').trim().toLowerCase().replace(/[’]/g,"'")}
function enhancePronunciation(){
 const id=new URLSearchParams(location.search).get('id')||'';if(id!=='grade8-u2-l1')return;
 document.querySelectorAll('#viewer .pronRow').forEach(row=>{const w=row.querySelector('.pronWord'),n=row.querySelector('.pronNote');if(!w||!n)return;const key=norm(w.textContent);const note=U2L1_PRON[key];if(note){n.textContent=note;n.dataset.u2PronFixed='1'}});
}
function run(){style();enhanceFiles();enhanceGames();enhancePronunciation()}
function boot(){run();window.addEventListener('hm:lesson-rendered',()=>setTimeout(run,0));const v=document.querySelector('#viewer');if(v)new MutationObserver(()=>setTimeout(run,0)).observe(v,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
