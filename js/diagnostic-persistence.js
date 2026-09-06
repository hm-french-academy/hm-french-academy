// HM Academy — account-backed diagnostic persistence
// Keeps the existing review UI intact while upgrading authenticated attempts from
// device-only localStorage to Supabase account persistence.
const params = new URLSearchParams(location.search);
const target = Number(params.get('target'));
const paths = {4:'data/reviews/grade-3/review-content-normalized.json',5:'data/reviews/grade-5/review-content.json',6:'data/reviews/grade-6/review-content.json',8:'data/reviews/grade-8/review-content.json',9:'data/reviews/grade-9/review-content.json'};
const key = 'hmAnnualRevisionAttempt:v1:' + target;
const decode = s => { const b=Uint8Array.from(atob(String(s).replace(/\s/g,'')),c=>c.charCodeAt(0)); return new TextDecoder('utf-8').decode(b); };
const deep = v => { let x=v; for(let i=0;i<15&&typeof x==='string';i++){try{x=JSON.parse(x)}catch{return x}} return x; };
async function loadBank(path){for(const u of ['./'+path,'https://raw.githubusercontent.com/hm-french-academy/hm-french-academy/main/'+path]){try{const r=await fetch(u+'?v=20260906-review-feedback',{cache:'no-store'});if(!r.ok)continue;let x=await r.text();try{x=JSON.parse(x)}catch{}if(x?.encoding==='base64')x=decode(x.content);else if(x?.content)x=x.content;x=deep(x);if(x?.diagnostic?.questions)return x}catch{}}throw new Error('diagnostic bank unavailable')}
(async()=>{
  if(!paths[target])return;
  const {supabase}=await import('./auth-guard.js');
  const {data:sessionData}=await supabase.auth.getSession();
  const user=sessionData?.session?.user||null;
  const lock=document.getElementById('diagLock'),wrap=document.getElementById('diagWrap'),result=document.getElementById('diagResult'),btn=document.getElementById('diagBtn');
  if(!lock||!wrap||!result||!btn)return;

  let writingObserver;
  const addWritingAreas=()=>{
    if(target!==9)return;
    let found=0;
    wrap.querySelectorAll('.q').forEach(box=>{
      if(box.querySelector('.writingAnswer'))return;
      const text=box.querySelector('.qText')?.textContent?.trim()||'';
      const isFourPhrases=/^Écris 4 phrases/i.test(text);
      const isInvitation=/^Écris une courte invitation/i.test(text);
      if(!isFourPhrases&&!isInvitation)return;
      const area=document.createElement('textarea');
      area.className='writingAnswer'; area.rows=isFourPhrases?6:5; area.placeholder='اكتب إجابتك هنا…'; area.setAttribute('aria-label','مساحة الإجابة');
      Object.assign(area.style,{display:'block',width:'100%',boxSizing:'border-box',minHeight:isFourPhrases?'170px':'145px',margin:'14px 0 4px',padding:'14px',border:'1px solid #cbd5e1',borderRadius:'14px',background:'#fff',font:'inherit',lineHeight:'1.8',direction:'ltr',textAlign:'left',resize:'vertical'});
      const label=document.createElement('div'); label.textContent='✍️ مساحة الإجابة'; Object.assign(label.style,{fontWeight:'800',color:'#173a82',marginTop:'10px'});
      box.append(label,area); found++;
    });
    if(found>=2)writingObserver?.disconnect();
  };
  if(target===9){writingObserver=new MutationObserver(addWritingAreas);writingObserver.observe(wrap,{childList:true,subtree:true});addWritingAreas();}

  const reasonFor=q=>{
    const t=String(q?.q||q?.question||'').toLowerCase();
    const correct=Array.isArray(q?.options)?String(q.options[Number(q.answer)]??''):'';
    if(/quel mot est un vêtement|vêtement/.test(t))return 'لأن السؤال يطلب اسم قطعة ملابس، والإجابة الصحيحة هي «'+correct+'». ';
    if(/avoir|j'|j’|tu portes|nous .*chemises|vous .*gants/.test(t))return 'لأن الجملة تحتاج التصريف الصحيح للفعل avoir مع الفاعل المستخدم في السؤال.';
    if(/couleur|chemise|chaussures|robe|pantalon|jaune|bleu|blanc|noir|orange/.test(t))return 'لأن الصفة اللونية يجب أن توافق الاسم في الجنس والعدد، مع مراعاة الكلمات غير المتغيرة مثل orange وmarron.';
    if(/être|sont|sommes|est|es|gros|grande|courte|vieux|vieille|adjectif/.test(t))return 'لأن تصريف être يجب أن يطابق الفاعل، والصفة يجب أن توافقه في الجنس والعدد.';
    if(/n'|ne .*pas|n’|de.*pull|n'avons|n'ont/.test(t))return 'لأن النفي في الفرنسية يتكوّن من ne/n’ + الفعل + pas، ومع avoir المنفي نستخدم de/d’ بدل أداة التنكير.';
    if(/famille|père|mère|aime/.test(t))return 'لأن اختيار الفعل وتصريفه يجب أن يطابق الفاعل، والجملة هنا تعبّر عن وصف أو تفضيل العائلة.';
    return 'لأن الإجابة الصحيحة هي الأنسب حسب قاعدة اللغة الفرنسية المطلوبة في السؤال.';
  };
  const injectStyles=()=>{if(document.getElementById('annual-feedback-style'))return;const s=document.createElement('style');s.id='annual-feedback-style';s.textContent='.annualFeedback{margin-top:10px;padding:12px 14px;border-radius:12px;line-height:1.8;background:#f0fdf4;border:1px solid #bbf7d0;color:#166534}.annualFeedback.wrong{background:#fff7ed;border-color:#fed7aa;color:#9a3412}.annualFeedback b{color:#173a82}.annualLockedOptions{pointer-events:none;opacity:.82}.annualCorrectOption{border-color:#22c55e!important;background:#f0fdf4!important}.annualWrongOption{border-color:#ef4444!important;background:#fef2f2!important}';document.head.appendChild(s)};
  injectStyles();
  const showFeedback=(arr,id,lockOptions=false)=>{
    arr.forEach((q,i)=>{
      const box=document.querySelector('#'+CSS.escape(id)+' .q:nth-child('+(i+1)+')');
      if(!box||box.querySelector('.annualFeedback'))return;
      const selected=box.querySelector('input:checked');
      const correctIndex=Number(q.answer);
      const correctText=Array.isArray(q.options)?String(q.options[correctIndex]??''):'';
      const selectedIndex=selected?Number(selected.value):NaN;
      const labels=[...box.querySelectorAll('.option')];
      labels.forEach(l=>{const input=l.querySelector('input');if(!input)return;if(Number(input.value)===correctIndex)l.classList.add('annualCorrectOption');if(selected&&Number(input.value)===selectedIndex&&selectedIndex!==correctIndex)l.classList.add('annualWrongOption')});
      const fb=document.createElement('div');
      const right=selectedIndex===correctIndex;
      fb.className='annualFeedback '+(right?'':'wrong');
      fb.innerHTML=right?'✅ <b>إجابة صحيحة.</b> أحسنت!':'❌ <b>إجابة غير صحيحة.</b><br>الإجابة الصحيحة: <b>'+String(correctText).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))+'</b><br><span>💡 السبب: '+reasonFor(q)+'</span>';
      box.appendChild(fb);
      if(lockOptions)box.classList.add('annualLockedOptions');
    });
  };
  const showLock=record=>{const r=record?.result||record||{},score=Number(r.score??0),total=Number(r.total??0),completedAt=r.completedAt||record?.created_at,pct=total?Math.round(score/total*100):0;wrap.hidden=true;lock.innerHTML='<div class="locked"><h2>🔒 سبق لك إتمام هذه المراجعة</h2><p>هذه المراجعة تسمح <b>بمحاولة واحدة فقط</b> لهذا الصف'+(user?' على حسابك.':' على هذا الجهاز.')+'</p><div class="lockMeta"><div><b>النتيجة</b><br>'+score+' / '+total+'</div><div><b>النسبة</b><br>'+pct+'%</div><div><b>تاريخ المحاولة</b><br>'+(completedAt?new Date(completedAt).toLocaleDateString('ar-EG'):'—')+'</div></div><p>'+(pct>=70?'✅ نتيجة تشير إلى الجاهزية للصف التالي.':'⚠️ تحتاج إلى مراجعة إضافية قبل الانتقال للصف التالي.')+'</p><div class="tip">للحفاظ على نزاهة التشخيص، لا يمكن إعادة فتح الأسئلة بعد الإنهاء.</div></div>';};
  if(user){const {data,error}=await supabase.from('student_diagnostic_attempts').select('grade,result,created_at').eq('user_id',user.id).eq('grade',target).maybeSingle();if(!error&&data){showLock(data);return}}
  else{try{const existing=JSON.parse(localStorage.getItem(key)||'null');if(existing){showLock(existing);return}}catch{}}

  btn.onclick=async()=>{
    btn.disabled=true;
    try{
      const bank=await loadBank(paths[target]),diag=(bank.diagnostic?.questions||[]).filter(q=>q.type!=='writing');
      for(let i=0;i<diag.length;i++){const q=diag[i],input=document.querySelector('input[name="diag-'+CSS.escape(q.id||i)+'"]:checked');if(!input){result.innerHTML='<div class="result">⚠️ أكمل السؤال رقم '+(i+1)+' قبل تصحيح التشخيص.</div>';btn.disabled=false;return}}
      let score=0;for(let i=0;i<diag.length;i++){const q=diag[i],input=document.querySelector('input[name="diag-'+CSS.escape(q.id||i)+'"]:checked');if(input&&Number(input.value)===Number(q.answer))score++}
      showFeedback(diag,'diag',true);
      const record={version:3,target,score,total:diag.length,completedAt:new Date().toISOString()};
      if(user){const {error}=await supabase.from('student_diagnostic_attempts').insert({user_id:user.id,grade:target,result:record});if(error){if(error.code==='23505'){location.reload();return}throw error}}
      else localStorage.setItem(key,JSON.stringify(record));
      result.innerHTML='<div class="result">🎯 تم تصحيح التشخيص: <b>'+score+' / '+diag.length+'</b><br>الإجابات والتفسير ظاهرين أسفل كل سؤال. لا يمكن إعادة المحاولة.</div>';
      btn.textContent='🔒 تم إنهاء التشخيص';
      wrap.querySelectorAll('input').forEach(x=>x.disabled=true);
    }catch(e){console.error('HM diagnostic persistence:',e);result.innerHTML='<div class="result">⚠️ تعذر حفظ نتيجة التشخيص الآن. لم يتم إنهاء المحاولة حتى لا تُفقد نتيجتك. حاول مرة أخرى.</div>';btn.disabled=false}
  };

  const enhanceQuiz=(arr,id,buttonId,resultId)=>{
    const root=document.getElementById(id),button=document.getElementById(buttonId),out=document.getElementById(resultId);if(!root||!button||!out)return;
    button.addEventListener('click',()=>{
      const missing=arr.filter((q,i)=>!root.querySelector('input[name="'+CSS.escape(id+'-'+(q.id||i))+'"]:checked')).length;
      if(missing){out.innerHTML='<div class="result">⚠️ أكمل '+missing+' سؤال/أسئلة قبل التصحيح.</div>';return}
      const n=arr.reduce((s,q,i)=>{const x=root.querySelector('input[name="'+CSS.escape(id+'-'+(q.id||i))+'"]:checked');return s+(x&&Number(x.value)===Number(q.answer)?1:0)},0);
      showFeedback(arr,id,false);
      out.innerHTML='<div class="result">📊 النتيجة: <b>'+n+' / '+arr.length+'</b><br>الإجابة الصحيحة وسببها يظهران أسفل كل سؤال أخطأت فيه.</div>';
    },{once:false});
  };
  try{const bank=await loadBank(paths[target]);enhanceQuiz(Array.isArray(bank.practiceQuestions)?bank.practiceQuestions:[],'practiceQuiz','practiceBtn','practiceResult');enhanceQuiz(bank.finalReadiness?.questions||bank.finalAssessment?.questions||[],'finalQuiz','finalBtn','finalResult')}catch(e){console.warn('HM annual feedback bank:',e)}
})();
