from pathlib import Path
import re

p = Path('annual-revision-stage.html')
s = p.read_text(encoding='utf-8')

# Replace the live page's grade() implementation at build time so the exact
# student-facing annual-revision-stage route receives feedback for every quiz.
start = s.find('function grade(')
if start < 0:
    raise SystemExit('annual-revision-stage.html: function grade( not found')
brace = s.find('{', start)
if brace < 0:
    raise SystemExit('annual-revision-stage.html: grade() opening brace not found')
depth = 0
quote = None
escape = False
end = None
for i in range(brace, len(s)):
    ch = s[i]
    if quote:
        if escape:
            escape = False
        elif ch == '\\':
            escape = True
        elif ch == quote:
            quote = None
        continue
    if ch in "'\"`":
        quote = ch
        continue
    if ch == '{':
        depth += 1
    elif ch == '}':
        depth -= 1
        if depth == 0:
            end = i + 1
            break
if end is None:
    raise SystemExit('annual-revision-stage.html: could not parse grade()')

new_grade = r'''function grade(arr,id,resultId){
 const root=$(id),out=$(resultId);let score=0,answered=0;const feedback=[];
 root.querySelectorAll('.q').forEach((box,i)=>{
   const q=arr[i]||{};const opts=Array.isArray(q.options)?q.options:[];
   const selected=box.querySelector('input:checked,button[aria-pressed="true"],button.selected');
   const value=selected?.value ?? selected?.dataset?.index ?? selected?.dataset?.value ?? '';
   const correct=String(value)===String(q.answer);
   if(selected) answered++;
   box.querySelectorAll('.answer-feedback').forEach(x=>x.remove());
   box.querySelectorAll('.option').forEach(x=>x.classList.remove('is-correct','is-wrong'));
   if(selected){
     const option=selected.closest('.option');
     option?.classList.add(correct?'is-correct':'is-wrong');
   }
   if(correct){score++;return;}
   const answer=opts[q.answer]!==undefined?opts[q.answer]:q.answer;
   const reason=q.explanation||q.reason||q.feedback||q.why||('لأن «'+String(answer)+'» هي الإجابة التي تتفق مع قاعدة السؤال وصياغته.');
   const div=document.createElement('div');div.className='answer-feedback';
   div.innerHTML='<div class="feedback-title">'+(selected?'❌ إجابتك غير صحيحة':'⚠️ لم تتم الإجابة')+'</div><div><b>✅ الإجابة الصحيحة:</b> '+esc(answer)+'</div><div><b>💡 لماذا؟</b> '+esc(reason)+'</div>';
   box.appendChild(div);feedback.push(i+1);
 });
 const total=arr.length,pct=total?Math.round(score/total*100):0;
 out.innerHTML='<div class="result"><b>النتيجة: '+score+' / '+total+' ('+pct+'%)</b><br>تم تصحيح الإجابات، ومع كل إجابة غير صحيحة تظهر الإجابة الصحيحة وسببها أسفل السؤال.</div>';
 root.querySelectorAll('input,button').forEach(x=>x.disabled=true);
}'''
s = s[:start] + new_grade + s[end:]

css = '''<style id="annual-revision-feedback-css">.option.is-correct{border-color:#16a34a!important;background:#f0fdf4!important}.option.is-wrong{border-color:#dc2626!important;background:#fef2f2!important}.answer-feedback{margin-top:10px;padding:13px 15px;border-radius:14px;border:1px solid #cbd5e1;background:#f8fafc;line-height:1.9}.answer-feedback .feedback-title{font-weight:900;margin-bottom:5px}</style>'''
if 'annual-revision-feedback-css' not in s:
    s = s.replace('</head>', css + '</head>', 1)

p.write_text(s, encoding='utf-8')
print('annual revision feedback patch applied')
