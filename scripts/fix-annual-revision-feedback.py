from pathlib import Path

p = Path('annual-revision-stage.html')
s = p.read_text(encoding='utf-8')
start = s.find('function grade(arr,id,resultId){')
end = s.find('function lockScreen(){', start)
if start < 0 or end < 0:
    raise SystemExit('Could not locate grade()')

fn = r'''function grade(arr,id,resultId){const root=$(id),out=$(resultId);let n=0,total=arr.length;root.querySelectorAll('.q').forEach((box,i)=>{const selected=box.querySelector('input:checked'),probe=box.querySelector('input[name]'),name=String((selected||probe)?.name||''),m=name.match(/(?:^|[-_])([DPF]\d+)$/),questionId=m?m[1]:'';const q=arr.find(x=>String(x?.id||'')===questionId)||arr[i]||{},correct=!!selected&&Number(selected.value)===Number(q.answer);box.querySelectorAll('.answer-feedback').forEach(x=>x.remove());box.querySelectorAll('.option').forEach(x=>x.classList.remove('is-correct','is-wrong'));if(selected)selected.closest('.option')?.classList.add(correct?'is-correct':'is-wrong');if(correct){n++;return}const opts=Array.isArray(q.options)?q.options:[],answer=opts[q.answer]??q.answer,reason=q.explanation||q.reason||q.feedback||q.why||('لأن الإجابة الصحيحة «'+String(answer)+'» هي التي تطابق القاعدة أو المعنى الذي يقيسه السؤال.');const div=document.createElement('div');div.className='answer-feedback';div.innerHTML='<div class="feedback-title">'+(selected?'❌ إجابتك غير صحيحة':'⚠️ لم تتم الإجابة')+'</div><div><b>✅ الإجابة الصحيحة:</b> '+esc(answer)+'</div><div><b>💡 لماذا؟</b> '+esc(reason)+'</div>';box.appendChild(div)});const pct=total?Math.round(n/total*100):0;out.innerHTML='<div class="result"><b>النتيجة: '+n+' / '+total+' ('+pct+'%)</b><br>تم تصحيح الإجابات، ويظهر أسفل كل إجابة غير صحيحة السبب المرتبط بالسؤال نفسه.</div>';root.querySelectorAll('input,button').forEach(x=>x.disabled=true);return n}
'''
s = s[:start] + fn + s[end:]

old = "const n=score(diag,'diag');localStorage.setItem(key,JSON.stringify({version:1,target:g,score:n,total:diag.length,completedAt:new Date().toISOString()}));location.reload()"
new = "const n=grade(diag,'diag','diagResult');localStorage.setItem(key,JSON.stringify({version:1,target:g,score:n,total:diag.length,completedAt:new Date().toISOString()}));$('diagBtn').disabled=true"
if old not in s:
    raise SystemExit('diagnostic submit handler not found')
s = s.replace(old, new, 1)
p.write_text(s, encoding='utf-8')
print('universal annual revision correction flow repaired for all mapped stages')
