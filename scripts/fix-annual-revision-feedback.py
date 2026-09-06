from pathlib import Path

p = Path('annual-revision-stage.html')
s = p.read_text(encoding='utf-8')

# The renderer gives every radio group a stable name containing the question ID:
#   diag-D01 / practiceQuiz-P04 / finalQuiz-F08
# Never use the shuffled array position to identify a question.
start = s.find('function score(arr,id){')
if start < 0:
    raise SystemExit('Could not locate score()')
end = s.find('function lockScreen(){', start)
if end < 0:
    raise SystemExit('Could not locate lockScreen()')

fn = r'''function questionForBox(arr,box,i){const input=box.querySelector('input[name]');const name=String(input?.name||'');const m=name.match(/(?:^|[-_])([DPF]\d+)$/);const questionId=m?m[1]:'';return arr.find(q=>String(q?.id||'')===questionId)||arr[i]||{};}
function explainQuestion(q){if(q?.explanation||q?.reason||q?.feedback||q?.why)return q.explanation||q.reason||q.feedback||q.why;const text=String(q?.q||q?.question||'').trim(),opts=Array.isArray(q?.options)?q.options:[],answer=opts[q?.answer]??q?.answer,a=String(answer??'').trim();const subject=(text.match(/^(Je|Tu|Il|Elle|On|Nous|Vous|Ils|Elles)\b/i)||[])[1];const etre={Je:'suis',Tu:'es',Il:'est',Elle:'est',On:'est',Nous:'sommes',Vous:'êtes',Ils:'sont',Elles:'sont'};const avoir={Je:'ai',Tu:'as',Il:'a',Elle:'a',On:'a',Nous:'avons',Vous:'avez',Ils:'ont',Elles:'ont'};if(subject&&etre[subject]===a)return 'مع الضمير «'+subject+'» نستخدم تصريف الفعل être «'+a+'»، لذلك تكون الجملة صحيحة بهذه الصيغة.';if(subject&&avoir[subject]===a)return 'مع الضمير «'+subject+'» نستخدم تصريف الفعل avoir «'+a+'»، لذلك تكون الجملة صحيحة بهذه الصيغة.';if(['un','une','des'].includes(a)){if(/trousse|robe|jupe|chemise|veste|cravate|ceinture|gomme|pomme|carotte|maison|classe|table|chaussure|chaussette/i.test(text)&&a==='une')return 'الاسم الوارد في السؤال مؤنث مفرد، لذلك نستخدم أداة التنكير «une».';if(/livre|cahier|stylo|crayon|pantalon|pull|costume|nez|frère|père/i.test(text)&&a==='un')return 'الاسم الوارد في السؤال مذكر مفرد، لذلك نستخدم أداة التنكير «un».';if(a==='des')return 'الاسم المقصود جمع، لذلك نستخدم أداة التنكير «des».';}if(['de','d’','d\''].includes(a))return 'بعد النفي مع avoir تتحول أدوات التنكير أو الجمع إلى «de/d’»، لذلك هذه هي الصيغة الصحيحة.';if(['du','de la','de l’','de l\''].includes(a))return 'هذه الصيغة هي أداة التجزئة المناسبة للاسم في الجملة، لذلك نستخدم «'+a+'».';if(['est','es','sont','suis','êtes','sommes'].includes(a))return 'الإجابة «'+a+'» هي تصريف être الذي يتوافق مع الفاعل في هذه الجملة.';if(['ai','as','a','avons','avez','ont'].includes(a))return 'الإجابة «'+a+'» هي تصريف avoir الذي يتوافق مع الفاعل في هذه الجملة.';if(/féminin|feminin|féminine|مؤنث|femme/i.test(text))return 'السؤال يختبر تحويل الصفة إلى المؤنث؛ لذلك نختار الصيغة المؤنثة الصحيحة «'+a+'».';if(/pluriel|جمع|elles|ils|chaussures|livres|jupes|chaussettes/i.test(text))return 'السؤال يختبر صيغة الجمع، لذلك يجب أن تتوافق الكلمة مع الاسم أو الفاعل الجمع في الجملة.';return 'الإجابة «'+a+'» هي التي تطابق القاعدة أو المعنى الذي يقيسه هذا السؤال.';}
function grade(arr,id,resultId){const root=$(id),out=$(resultId);let n=0,total=arr.length;root.querySelectorAll('.q').forEach((box,i)=>{const q=questionForBox(arr,box,i),selected=box.querySelector('input:checked'),correct=!!selected&&Number(selected.value)===Number(q.answer);box.querySelectorAll('.answer-feedback').forEach(x=>x.remove());box.querySelectorAll('.option').forEach(x=>x.classList.remove('is-correct','is-wrong'));if(selected)selected.closest('.option')?.classList.add(correct?'is-correct':'is-wrong');if(correct){n++;return}const opts=Array.isArray(q.options)?q.options:[],answer=opts[q.answer]??q.answer,reason=explainQuestion(q),div=document.createElement('div');div.className='answer-feedback';div.innerHTML='<div class="feedback-title">'+(selected?'❌ إجابتك غير صحيحة':'⚠️ لم تتم الإجابة')+'</div><div><b>✅ الإجابة الصحيحة:</b> '+esc(answer)+'</div><div><b>💡 لماذا؟</b> '+esc(reason)+'</div>';box.appendChild(div)});const pct=total?Math.round(n/total*100):0;out.innerHTML='<div class="result"><b>النتيجة: '+n+' / '+total+' ('+pct+'%)</b><br>تم التصحيح حسب معرّف السؤال نفسه، حتى بعد خلط الاختيارات.</div>';return n}
function score(arr,id){let n=0;arr.forEach((q,i)=>{const x=document.querySelector('input[name="'+id+'-'+esc(q.id||i)+'"]:checked');if(x&&Number(x.value)===Number(q.answer))n++});return n}
'''
s = s[:start] + fn + s[end:]

# Make all three assessment surfaces use the same ID-safe correction engine.
old_diag = "const n=score(diag,'diag');localStorage.setItem(key,JSON.stringify({version:1,target:g,score:n,total:diag.length,completedAt:new Date().toISOString()}));location.reload()"
new_diag = "const n=grade(diag,'diag','diagResult');localStorage.setItem(key,JSON.stringify({version:1,target:g,score:n,total:diag.length,completedAt:new Date().toISOString()}));$('diagBtn').disabled=true"
if old_diag in s:
    s = s.replace(old_diag, new_diag, 1)
else:
    # Keep the transform idempotent if the diagnostic handler was already patched.
    if "grade(diag,'diag','diagResult')" not in s:
        raise SystemExit('diagnostic submit handler not found')

old_practice = "$('practiceBtn').onclick=()=>{$('practiceResult').innerHTML='<div class=\"result\">النتيجة: '+score(practice,'practiceQuiz')+' / '+practice.length+'</div>'}"
new_practice = "$('practiceBtn').onclick=()=>{grade(practice,'practiceQuiz','practiceResult');$('practiceBtn').disabled=true}"
if old_practice in s:
    s = s.replace(old_practice, new_practice, 1)

old_final = "$('finalBtn').onclick=()=>{$('finalResult').innerHTML='<div class=\"result\">النتيجة: '+score(fin,'finalQuiz')+' / '+fin.length+'</div>'}"
new_final = "$('finalBtn').onclick=()=>{grade(fin,'finalQuiz','finalResult');$('finalBtn').disabled=true}"
if old_final in s:
    s = s.replace(old_final, new_final, 1)

p.write_text(s, encoding='utf-8')
print('Universal annual revision correction: stable question IDs + question-context explanations for grades 4,5,6,8,9')
