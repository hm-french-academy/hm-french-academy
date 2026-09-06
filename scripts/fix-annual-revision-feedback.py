from pathlib import Path

p = Path('annual-revision-stage.html')
s = p.read_text(encoding='utf-8')

if 'function grade(arr,id,resultId)' not in s:
    marker = 'function score(arr,id){'
    start = s.find(marker)
    if start < 0:
        raise SystemExit('annual-revision-stage.html: score() not found')

    grade_fn = r'''function explainQuestion(q){const id=String(q.id||'');const reasons={
'D01':'السؤال «Comment tu t\'appelles ?» يسأل عن الاسم، لذلك نستخدم التعبير «Je m\'appelle + الاسم». «J\'ai 9 ans» للعمر، و«Ça va bien» للحالة.',
'D02':'السؤال «Quel âge as-tu ?» يسأل عن العمر، لذلك نستخدم «J\'ai + العدد + ans». «Je m\'appelle» للاسم، و«Bonjour» للتحية.',
'D03':'السؤال يطلب شيئًا يوجد في الفصل. «Un crayon» من أدوات الفصل، بينما «une banane» طعام و«un lion» حيوان.',
'D04':'كلمة «gomme» مؤنثة في الفرنسية، لذلك نستخدم أداة التعريف المؤنثة «une»: «C\'est une gomme».',
'D05':'«Le lavabo» من الأشياء الموجودة في salle de bains (الحمّام)، بينما «un canapé» للصالون و«un lit» لغرفة النوم.',
'D06':'«La carotte» من الخضروات، لذلك تصنيفها الصحيح هو «un légume»، وليست فاكهة أو حيوانًا.',
'D07':'«Les bananes» جمع مؤنث، والصفة «jaune» توافق الجمع بإضافة s، لذلك «jaunes».',
'D08':'«Confiture» اسم مؤنث مفرد، ومع التعبير عن كمية غير محددة من اسم مؤنث نستخدم «de la»: «Je mange de la confiture».',
'D09':'لتحويل «le tigre» إلى الجمع نستخدم «les»، ونحوّل الاسم إلى الجمع بإضافة s: «les tigres».',
'D10':'«Sami et Ali» اسمان لشخصين مذكرين، أي جمع، لذلك الضمير المناسب هو «Ils».',
'P01':'السؤال عن التحية المناسبة لمعلّم، لذلك «Bonjour !» هي العبارة التي تُستخدم للتحية. العبارتان الأخريان تتعلقان بالسن والاسم.',
'P02':'مع الضمير «Je» نستخدم تصريف الفعل «s\'appeler» بصيغة «m\'appelle»، لذلك نقول «Je m\'appelle Sara».',
'P03':'«Un cahier» من أدوات الدراسة الموجودة في الفصل، بينما «une pomme» فاكهة و«un tigre» حيوان.',
'P04':'«Trousse» اسم مؤنث مفرد، لذلك أداة التعريف المناسبة هي «une»: «C\'est une trousse».',
'P05':'«Un lit» هو الشيء المرتبط بغرفة النوم. «Un lavabo» للحمّام و«un canapé» للصالون.',
'P06':'«Une table» يمكن أن توجد في المطبخ، بينما «une douche» للحمّام و«un lit» لغرفة النوم.',
'P07':'«La pomme» فاكهة، لذلك الإجابة الصحيحة هي «un fruit» وليست خضارًا أو حيوانًا.',
'P08':'«La carotte» خضار، لذلك نستخدم التصنيف «un légume».',
'P09':'«La robe» مؤنث مفرد، لذلك الصفة يجب أن توافقها في الجنس والعدد: «blanche»، وليس «blanc» أو «blanches».',
'P10':'«Les bananes» جمع، لذلك الصفة «jaune» تصبح «jaunes» بإضافة s: «Les bananes sont jaunes».',
'P11':'«Lait» اسم مذكر مفرد، ومع كمية غير محددة نستخدم «du»: «Je bois du lait».',
'P12':'«Confiture» اسم مؤنث مفرد، لذلك نستخدم «de la»: «Je mange de la confiture».',
'P13':'جمع «le lion» يتكوّن باستعمال «les» مع جمع الاسم «lions»: «les lions».',
'P14':'«Sami et Ali» يشيران إلى شخصين، لذلك نستخدم ضمير الجمع المذكر «Ils».',
'P15':'«Le tigre» مذكر مفرد، لذلك الصفة توافقه: «grand». «Grande» مؤنث، و«grandes» جمع مؤنث.',
'F01':'«Ça va ?» سؤال عن الحال، لذلك الإجابة المناسبة هي «Ça va bien, merci.» وليست إجابة عن الاسم أو العمر.',
'F02':'«Livres» جمع، لذلك أداة التعريف غير المحددة المناسبة هي «des»: «Ce sont des livres».',
'F03':'«Un canapé» من أثاث الصالون، بينما «une douche» للحمّام و«un lit» لغرفة النوم.',
'F04':'«Robe» مؤنث مفرد، لذلك يجب أن تأتي الصفة مؤنثة مفردة: «blanche».',
'F05':'«Lait» اسم مذكر مفرد، لذلك نستخدم «du» للتعبير عن كمية غير محددة: «Je bois du lait».',
'F06':'«Sami et Ali» شخصان مذكران، لذلك ضمير الجمع المناسب هو «Ils».',
'F07':'«La carotte» تنتمي إلى فئة الخضروات، لذلك «un légume» هي الفئة الصحيحة.',
'F08':'«Le cahier» مذكر مفرد، واللون «jaune» هنا يجب أن يكون مذكرًا مفردًا، لذلك «Le cahier est jaune».',
'F09':'عند تحويل الجملة إلى الجمع يجب أن تتوافق الأسماء والأفعال والضمائر: «Le lion» تصبح «Les lions»، و«regarde» تصبح «regardent»، و«le chien» تصبح «les chiens».',
'F10':'الجملة تتحدث عن الفطور، و«Je mange du pain» تجمع فعل الأكل مع طعام مناسب. أما «une girafe» و«un lion» فليسا طعامًا.'};return reasons[id]||'هذا الاختيار هو المناسب لأن عناصر الجملة (المفرد/الجمع، المذكر/المؤنث، الفعل، أو معنى المفردة) يجب أن تتوافق مع القاعدة المطلوبة في السؤال.'}
function grade(arr,id,resultId){const root=$(id),out=$(resultId);let n=0,total=arr.length;root.querySelectorAll('.q').forEach((box,i)=>{const q=arr[i]||{},selected=box.querySelector('input:checked');const correct=!!selected&&Number(selected.value)===Number(q.answer);box.querySelectorAll('.answer-feedback').forEach(x=>x.remove());box.querySelectorAll('.option').forEach(x=>x.classList.remove('is-correct','is-wrong'));if(selected){selected.closest('.option')?.classList.add(correct?'is-correct':'is-wrong')}if(correct){n++;return}const opts=Array.isArray(q.options)?q.options:[],answer=opts[q.answer]??q.answer,reason=q.explanation||q.reason||q.feedback||q.why||explainQuestion(q);const div=document.createElement('div');div.className='answer-feedback';div.innerHTML='<div class="feedback-title">'+(selected?'❌ إجابتك غير صحيحة':'⚠️ لم تتم الإجابة')+'</div><div><b>✅ الإجابة الصحيحة:</b> '+esc(answer)+'</div><div><b>💡 لماذا؟</b> '+esc(reason)+'</div>';box.appendChild(div)});const pct=total?Math.round(n/total*100):0;out.innerHTML='<div class="result"><b>النتيجة: '+n+' / '+total+' ('+pct+'%)</b><br>تم تصحيح الإجابات، ويظهر أسفل كل إجابة غير صحيحة السبب المرتبط بالسؤال نفسه.</div>';root.querySelectorAll('input,button').forEach(x=>x.disabled=true);return n}'''
    s = s[:start] + grade_fn + s[start:]

s = s.replace("$('practiceBtn').onclick=()=>{$('practiceResult').innerHTML='<div class=\"result\">النتيجة: '+score(practice,'practiceQuiz')+' / '+practice.length+'</div>'};", "$('practiceBtn').onclick=()=>grade(practice,'practiceQuiz','practiceResult');")
s = s.replace("$('finalBtn').onclick=()=>{$('finalResult').innerHTML='<div class=\"result\">النتيجة: '+score(fin,'finalQuiz')+' / '+fin.length+'</div>'};", "$('finalBtn').onclick=()=>grade(fin,'finalQuiz','finalResult');")

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