from pathlib import Path

p = Path('annual-revision-stage.html')
s = p.read_text(encoding='utf-8')
start = s.find('function grade(arr,id,resultId){')
end = s.find('function lockScreen(){', start)
if start < 0 or end < 0:
    raise SystemExit('Could not locate grade()')

fn = r'''function grade(arr,id,resultId){const root=$(id),out=$(resultId);let n=0,total=arr.length;root.querySelectorAll('.q').forEach((box,i)=>{const selected=box.querySelector('input:checked'),probe=box.querySelector('input[name]'),name=String((selected||probe)?.name||''),m=name.match(/(?:^|[-_])([DPF]\d+)$/),questionId=m?m[1]:'';const q=arr.find(x=>String(x?.id||'')===questionId)||arr[i]||{},correct=!!selected&&Number(selected.value)===Number(q.answer);box.querySelectorAll('.answer-feedback').forEach(x=>x.remove());box.querySelectorAll('.option').forEach(x=>x.classList.remove('is-correct','is-wrong'));if(selected)selected.closest('.option')?.classList.add(correct?'is-correct':'is-wrong');if(correct){n++;return}const opts=Array.isArray(q.options)?q.options:[],answer=opts[q.answer]??q.answer,reason=q.explanation||q.reason||q.feedback||q.why||explainQuestion(q),div=document.createElement('div');div.className='answer-feedback';div.innerHTML='<div class="feedback-title">'+(selected?'❌ إجابتك غير صحيحة':'⚠️ لم تتم الإجابة')+'</div><div><b>✅ الإجابة الصحيحة:</b> '+esc(answer)+'</div><div><b>💡 لماذا؟</b> '+esc(reason||'هذا السبب مرتبط مباشرة بمهارة السؤال واختياره الصحيح.')+'</div>';box.appendChild(div)});const pct=total?Math.round(n/total*100):0;out.innerHTML='<div class="result"><b>النتيجة: '+n+' / '+total+' ('+pct+'%)</b><br>تم تصحيح الإجابات، ويظهر أسفل كل إجابة غير صحيحة السبب المرتبط بالسؤال نفسه.</div>';root.querySelectorAll('input,button').forEach(x=>x.disabled=true);return n}
'''
s = s[:start] + fn + s[end:]
p.write_text(s, encoding='utf-8')
print('annual revision feedback now resolves each question by stable ID for every mapped grade')
