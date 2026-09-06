from pathlib import Path
import re

path = Path('secondary-1-review.html')
s = path.read_text(encoding='utf-8')

E = {
'D1':'«Je m’appelle» هي الصيغة الصحيحة لأن الفاعل «Je» يأخذ الفعل pronominal «s’appeler» بصيغة المتكلم: je m’appelle.',
'D2':'«Paul» مفرد، ومع الفعل avoir نقول «il a». لذلك الجملة الصحيحة: «Paul a quinze ans».',
'D3':'مع «Nous» تصريف être هو «sommes»: «Nous sommes des élèves sympathiques».',
'D4':'«crayons» جمع، وللتعبير عن عدد غير محدد نستخدم أداة الجمع «des»: «des crayons».',
'D5':'مع الفاعل «Je» تصريف aimer هو «aime»: «J’aime le football».',
'D6':'بعد «Je ne» نستخدم تصريف الفعل مع Je: «je travaille»، والنفي الكامل هو «je ne travaille pas».',
'D7':'تركيب الوجود «il y a» ثابت للتعبير عن وجود شيء، لذلك نقول «Il y a vingt élèves».',
'D8':'الساعة 8:00 تُقال «huit heures»، لأن الرقم بعد «Il est» يعبّر عن الساعة.',
'D9':'«livre» مذكر مفرد، والشيء مملوك للمتكلم، لذلك نستخدم possessif «mon»: «mon livre».',
'D10':'«sœur» مؤنث مفرد، والضمير المناسب لها هو «Elle».',
'D11':'مع «stade» المذكر المفرد، «à + le» تصبح «au»: «Nous allons au stade».',
'D12':'مع الرياضة «tennis» نستخدم التركيب «jouer au + sport»: «Je joue au tennis».',
'D13':'العمر في الفرنسية يُعبّر عنه بالفعل avoir؛ مع «Je» نقول «j’ai quatorze ans».',
'D14':'مع «Tu» تصريف aimer هو «aimes»: «Tu aimes le cinéma ?».',
'D15':'«affaires» جمع، والشيء مملوك للمتكلم، لذلك نستخدم «mes» للجمع: «mes affaires».',
'D16':'«heure» مؤنث مفرد، والسؤال عن أي ساعة يبدأ فيها الدرس؛ لذلك نستخدم «Quelle».',
'D17':'النفي لا يغيّر تركيب «il y a»: نقول «Il n’y a pas de CDI».',
'D18':'أيام الأسبوع في الفرنسية تُستعمل عادة مع أداة التعريف «le»: «le lundi».',
'D19':'«BD» هنا جمع، لذلك نستخدم «les»: «J’aime les BD».',
'D20':'«Ma sœur» مؤنث مفرد، لذلك الصفة «sportif» توافق المؤنث وتصبح «sportive».',
'D21':'مع «Nous» تصريف aller هو «allons»: «Nous allons au club de sport».',
'D22':'بعد «avec» نستخدم الضمير المنفصل المناسب للشخص؛ Paul مذكر مفرد، لذلك «lui».',
'D23':'«frère» مذكر مفرد، وملكيته للمتكلم، لذلك «mon frère».',
'D24':'النفي القياسي هو «ne ... pas»: «Je n’aime pas le tennis».',
'F1':'مع «Je» في الفعل pronominal «s’appeler» نقول «je m’appelle»: «Je m’appelle Karim».',
'F2':'العمر يُعبّر عنه بـ avoir، ومع «Elle» التصريف هو «a»: «Elle a quatorze ans».',
'F3':'«maison» مؤنث مفرد، لذلك صفة الملكية مع المتكلم هي «ma»: «Ma maison».',
'F4':'«cahiers» جمع فنستخدم «des»، و«trousse» مؤنث مفرد فنستخدم «une»: «des cahiers et une trousse».',
'F5':'مع «Je» تصريف aimer هو «aime»: «J’aime les BD et les romans».',
'F6':'النفي مع avoir هو «ne ... pas»؛ مع «Nous» تصبح «Nous n’avons pas de contrôle».',
'F7':'وجود شيء يُعبّر عنه بالتركيب الثابت «il y a»: «il y a un CDI».',
'F8':'للتعبير عن وقت محدد نستخدم «à»: «à dix heures».',
'F9':'«livres» جمع، والملكية للمتكلم، لذلك «mes livres».',
'F10':'«mon frère» مذكر مفرد، لذلك الضمير المناسب «Il».',
'F11':'«club» مذكر مفرد، و«à + le» تصبح «au»: «au club de sport».',
'F12':'«Mon frère» مذكر مفرد، لذلك الصفة الصحيحة «sportif».',
'F13':'مع «Je» تصريف aller هو «vais»: «Je vais à l’école».',
'F14':'مع «Vous» تصريف parler هو «parlez»: «Vous parlez français ?».',
'F15':'مع «Nous» تصريف avoir هو «avons»: «Nous avons deux chats».',
'F16':'«matières» جمع مؤنث، والسؤال عن أي مواد؛ لذلك «Quelles».',
'F17':'«heure» مؤنث مفرد، لذلك نقول «une heure».',
'F18':'في عبارة «j’ai du français» نستخدم «du» مع الاسم المذكر غير المعدود/اسم المادة في هذا التركيب.',
'F19':'«musique» مؤنث مفرد، لذلك أداة التعريف هي «la»: «J’aime la musique».',
'F20':'النفي القياسي هو «ne ... pas»: «Elle n’aime pas les jeux vidéo».',
'F21':'«cinéma» مذكر مفرد، لذلك «à + le = au»: «au cinéma».',
'F22':'«ma sœur» مؤنث مفرد، وبعد «avec» نستخدم الضمير المنفصل «elle».',
'F23':'«ami» مذكر مفرد، والملكية للمتكلم، لذلك «mon ami».',
'F24':'«Marie» مؤنث مفرد، لذلك الصفة «sportif» تأخذ صيغة المؤنث «sportive».',
}

# Ensure every embedded scored question has a dedicated explanation.
ids = re.findall(r"\['([DF]\d+)'", s)
missing = sorted(set(ids) - set(E))
if missing:
    raise SystemExit(f'Missing secondary-1 explanations: {missing}')

marker = "const finalQ=["
if marker not in s:
    raise SystemExit('finalQ marker not found')

feedback_js = "const hmQuestionFeedback=" + repr(E).replace("'", '"') + ";\n"
# repr is safe for the current Arabic/ASCII values after JSON-like conversion; normalize JS quotes.
feedback_js = "const hmQuestionFeedback=" + __import__('json').dumps(E, ensure_ascii=False) + ";\n"
if 'const hmQuestionFeedback=' not in s:
    s = s.replace(marker, feedback_js + marker, 1)

old = re.search(r"function grade\(arr,id,out\)\{.*?\n(?=document\.querySelectorAll\('\[data-target\]'\))", s, re.S)
if not old:
    raise SystemExit('grade function block not found')

new = '''function grade(arr,id,out){let score=0;const rows=[];arr.forEach((q,i)=>{const x=document.querySelector('input[name="'+id+'-'+q[0]+'"]:checked');const ok=!!x&&x.value===q[3];if(ok)score++;rows.push('<div class="answer-feedback" style="margin:10px 0;padding:12px;border:1px solid #dbe4ef;border-radius:12px;background:#fff"><b>'+((i+1)+'.')+'</b> '+(ok?'✅ إجابة صحيحة':'❌ إجابة غير صحيحة')+(x?' — إجابتك: <b>'+x.value+'</b>':' — ⚠️ لم تتم الإجابة')+'<br>✅ الإجابة الصحيحة: <b>'+q[3]+'</b><br>💡 لماذا؟ '+(hmQuestionFeedback[q[0]]||'لا يوجد تفسير مخصص لهذا السؤال.')+'</div>')});const pct=Math.round(score/arr.length*100);$(out).innerHTML='<div class="result"><h3>النتيجة: '+score+'/'+arr.length+' — '+pct+'%</h3><p>'+(pct>=70?'✅ جاهز للانتقال إلى الصف الثاني.':'⚠️ تحتاج إلى مراجعة إضافية.')+'</p>'+rows.join('')+'</div>'}
'''
s = s[:old.start()] + new + s[old.end():]
path.write_text(s, encoding='utf-8')
print(f'Applied {len(E)} question-specific explanations to secondary-1 review')
'''
