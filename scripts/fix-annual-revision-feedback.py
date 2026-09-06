from pathlib import Path

p = Path('annual-revision-stage.html')
s = p.read_text(encoding='utf-8')

# The live annual revision page currently uses renderQuiz()+score(), not grade().
# Insert a real grading layer into that exact student-facing source at build time.
if 'function grade(arr,id,resultId)' not in s:
    marker = 'function score(arr,id){'
    start = s.find(marker)
    if start < 0:
        raise SystemExit('annual-revision-stage.html: score() not found')

    grade_fn = r'''function grade(arr,id,resultId){const root=$(id),out=$(resultId);let n=0,total=arr.length;root.querySelectorAll('.q').forEach((box,i)=>{const q=arr[i]||{},selected=box.querySelector('input:checked');const correct=!!selected&&Number(selected.value)===Number(q.answer);box.querySelectorAll('.answer-feedback').forEach(x=>x.remove());box.querySelectorAll('.option').forEach(x=>x.classList.remove('is-correct','is-wrong'));if(selected){selected.closest('.option')?.classList.add(correct?'is-correct':'is-wrong')}if(correct){n++;return}const opts=Array.isArray(q.options)?q.options:[],answer=opts[q.answer]??q.answer,reason=q.explanation||q.reason||q.feedback||q.why||('لأن «'+String(answer)+'» هي الإجابة التي تتفق مع قاعدة السؤال وصياغته.');const div=document.createElement('div');div.className='answer-feedback';div.innerHTML='<div class="feedback-title">'+(selected?'❌ إجابتك غير صحيحة':'⚠️ لم تتم الإجابة')+'</div><div><b>✅ الإجابة الصحيحة:</b> '+esc(answer)+'</div><div><b>💡 لماذا؟</b> '+esc(reason)+'</div>';box.appendChild(div)});const pct=total?Math.round(n/total*100):0;out.innerHTML='<div class="result"><b>النتيجة: '+n+' / '+total+' ('+pct+'%)</b><br>تم تصحيح الإجابات، وتظهر الإجابة الصحيحة وسببها أسفل كل إجابة غير صحيحة.</div>';root.querySelectorAll('input,button').forEach(x=>x.disabled=true);return n}'''
    s = s[:start] + grade_fn + s[start:]

# Replace the two live training/readiness handlers with the new grading layer.
s = s.replace("$('practiceBtn').onclick=()=>{$('practiceResult').innerHTML='<div class=\"result\">النتيجة: '+score(practice,'practiceQuiz')+' / '+practice.length+'</div>'};", "$('practiceBtn').onclick=()=>grade(practice,'practiceQuiz','practiceResult');")
s = s.replace("$('finalBtn').onclick=()=>{$('finalResult').innerHTML='<div class=\"result\">النتيجة: '+score(fin,'finalQuiz')+' / '+fin.length+'</div>'};", "$('finalBtn').onclick=()=>grade(fin,'finalQuiz','finalResult');")

# Diagnostic is one-attempt only, but feedback must remain visible after submission.
old = "$('diagBtn').onclick=()=>{if(saved)return;const u=diag.filter((q,i)=>!document.querySelector('input[name=\"diag-'+esc(q.id||i)+'\"]:checked')).length;if(u){$('diagResult').innerHTML='<div class=\"result\">⚠️ ما زالت هناك '+u+' أسئلة بدون إجابة.</div>';return}const n=score(diag,'diag');localStorage.setItem(key,JSON.stringify({version:1,target:g,score:n,total:diag.length,completedAt:new Date().toISOString()}));location.reload()};"
new = "$('diagBtn').onclick=()=>{if(saved)return;const u=diag.filter((q,i)=>!document.querySelector('input[name=\"diag-'+esc(q.id||i)+'\"]:checked')).length;if(u){$('diagResult').innerHTML='<div class=\"result\">⚠️ ما زالت هناك '+u+' أسئلة بدون إجابة.</div>';return}const n=grade(diag,'diag','diagResult');localStorage.setItem(key,JSON.stringify({version:1,target:g,score:n,total:diag.length,completedAt:new Date().toISOString()}));$('diagBtn').disabled=true;};"
if old in s:
    s = s.replace(old, new, 1)
else:
    raise SystemExit('annual-revision-stage.html: diagnostic handler not found')

css = '<style id="annual-revision-feedback-css">.option.is-correct{border-color:#16a34a!important;background:#f0fdf4!important}.option.is-wrong{border-color:#dc2626!important;background:#fef2f2!important}.answer-feedback{margin-top:10px;padding:13px 15px;border-radius:14px;border:1px solid #cbd5e1;background:#f8fafc;line-height:1.9}.answer-feedback .feedback-title{font-weight:900;margin-bottom:5px}</style>'
if 'annual-revision-feedback-css' not in s:
    s = s.replace('</head>', css + '</head>', 1)

p.write_text(s, encoding='utf-8')
print('annual revision feedback patch applied')