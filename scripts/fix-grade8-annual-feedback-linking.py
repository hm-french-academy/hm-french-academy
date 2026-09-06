from pathlib import Path

p = Path('annual-revision-stage.html')
s = p.read_text(encoding='utf-8')
start = s.find('function grade(arr,id,resultId){')
end = s.find('function lockScreen(){', start)
if start < 0 or end < 0:
    raise SystemExit('Could not locate grade()')

fn = r'''function grade(arr,id,resultId){const root=$(id),out=$(resultId);const grade8Reasons={
'D01':'السؤال «Comment ça va ?» يسأل عن الحال، لذلك «Ça va bien.» هي الإجابة المناسبة، وليست إجابة عن العمر أو الوقت.',
'D02':'مع الضمير «Je» يكون تصريف الفعل parler هو «parle»، لذلك نقول «Je parle français».',
'D03':'مع الضمير «Je» يكون تصريف الفعل être هو «suis»، لذلك نقول «Je suis élève».',
'D04':'الجملة تتحدث عن العمر، لذلك نحتاج عددًا. «douze» عدد، بينما «rouge» لون و«lundi» يوم.',
'D05':'للتعبير عن الساعة نستخدم «Il est + عدد + heure(s)»، لذلك «Il est huit heures» هي الصياغة الصحيحة.',
'D06':'مع الضمير «Tu» يكون تصريف avoir هو «as»، لذلك السؤال الصحيح هو «Tu as quel âge ?».',
'D07':'«stylo» اسم مذكر مفرد، لذلك أداة التنكير المناسبة هي «un»: «C’est un stylo».',
'D08':'«maison» اسم مؤنث مفرد، لذلك أداة التعريف المناسبة هي «La»: «La maison est grande».',
'D09':'«La pomme» تحتاج صفة لون، و«rouge» لون؛ أما «lundi» فهو يوم و«huit» عدد.',
'D10':'بعد «mars» يأتي «avril» مباشرة في ترتيب الشهور، لذلك «avril» هو الاختيار الصحيح.',
'P01':'في المساء نستخدم التحية «Bonsoir». «Bonjour» للنهار و«Merci» للتعبير عن الشكر.',
'P02':'مع «Nous» يتصرف الفعل parler إلى «parlons»، لذلك نقول «Nous parlons français».',
'P03':'مع الضمير «Vous» يكون تصريف être هو «êtes»، لذلك نقول «Vous êtes élèves».',
'P04':'العدد 20 بالفرنسية هو «vingt». «douze» تعني 12 و«dix» تعني 10.',
'P05':'الوقت 2:30 يعني ساعتين ونصفًا، لذلك نقول «deux heures et demie». «Et quart» تعني وربع.',
'P06':'مع الضمير «Je» يكون تصريف avoir هو «ai»، لذلك نقول «J’ai treize ans».',
'P07':'«gomme» اسم مؤنث مفرد، لذلك أداة التنكير المناسبة هي «une»: «C’est une gomme».',
'P08':'«livre» مذكر مفرد، لذلك الصفة «bleu» تأتي في المذكر المفرد، وليس «bleue» أو «bleus».',
'P09':'«cahiers» جمع، لذلك أداة التعريف المناسبة للجمع هي «Les».',
'P10':'شهر «mars» يقع في فصل الربيع، لذلك «printemps» هو الاختيار الصحيح.',
'F01':'مع الضمير «Tu» يتصرف الفعل parler إلى «parles»، لذلك نقول «Tu parles français».',
'F02':'مع الضمير «Elle» يكون تصريف être هو «est»، لذلك نقول «Elle est élève».',
'F03':'العدد 14 بالفرنسية هو «quatorze». «douze» تعني 12 و«vingt» تعني 20.',
'F04':'الوقت 8:00 يُقال «Il est huit heures»، لذلك «huit» هو العدد المناسب.',
'F05':'مع الضمير «Je» يكون تصريف avoir هو «ai»، لذلك نقول «J’ai 13 ans».',
'F06':'«livres» جمع، لذلك أداة التنكير المناسبة للجمع هي «des»: «Ce sont des livres».',
'F07':'«La pomme» فاكهة، لذلك «rouge» هي الصفة التي تصف لونها، وليست يومًا أو عددًا.',
'F08':'«maison» اسم مؤنث مفرد، لذلك نستخدم «La»: «La maison est grande».',
'F09':'«mars» يأتي في فصل الربيع، لذلك «printemps» هو الاختيار الصحيح.',
'F10':'عندما يقول شخص «Bonjour»، تكون الإجابة المناسبة تحية مقابلة مثل «Bonjour !»، وليس إجابة عن العمر أو الوقت.'};let n=0,total=arr.length;root.querySelectorAll('.q').forEach((box,i)=>{const q=arr[i]||{},selected=box.querySelector('input:checked'),correct=!!selected&&Number(selected.value)===Number(q.answer);box.querySelectorAll('.answer-feedback').forEach(x=>x.remove());box.querySelectorAll('.option').forEach(x=>x.classList.remove('is-correct','is-wrong'));if(selected)selected.closest('.option')?.classList.add(correct?'is-correct':'is-wrong');if(correct){n++;return}const opts=Array.isArray(q.options)?q.options:[],answer=opts[q.answer]??q.answer,reason=g===8?(q.explanation||grade8Reasons[String(q.id||'')]):(q.explanation||q.reason||q.feedback||q.why||explainQuestion(q)),div=document.createElement('div');div.className='answer-feedback';div.innerHTML='<div class="feedback-title">'+(selected?'❌ إجابتك غير صحيحة':'⚠️ لم تتم الإجابة')+'</div><div><b>✅ الإجابة الصحيحة:</b> '+esc(answer)+'</div><div><b>💡 لماذا؟</b> '+esc(reason||'هذا السبب مرتبط مباشرة بمهارة السؤال واختياره الصحيح.')+'</div>';box.appendChild(div)});const pct=total?Math.round(n/total*100):0;out.innerHTML='<div class="result"><b>النتيجة: '+n+' / '+total+' ('+pct+'%)</b><br>تم تصحيح الإجابات، ويظهر أسفل كل إجابة غير صحيحة السبب المرتبط بالسؤال نفسه.</div>';root.querySelectorAll('input,button').forEach(x=>x.disabled=true);return n}
'''
s = s[:start] + fn + s[end:]
p.write_text(s, encoding='utf-8')
print('Grade 8 feedback linking fixed; other grades retain existing fallback')