from pathlib import Path

p = Path('grade7-lesson-studio.html')
s = p.read_text(encoding='utf-8')

# 1) Correct audio labels: letters say "نطق الحرف"; words say "استمع"; examples have their own audio button.
old = '''<div class="vocab-actions"><button class="btn" type="button" onclick='speak(${JSON.stringify(String(fr))})'>🔊 الحرف</button>${example?`<button class="btn" type="button" onclick='speak(${JSON.stringify(String(example))})'>🔊 المثال</button>`:''}</div>'''
new = '''<div class="vocab-actions">${/^[A-ZÀ-Ÿ]$/.test(String(fr).trim())?`<button class="btn" type="button" onclick='speak(${JSON.stringify(String(fr))})'>🔊 نطق الحرف</button>`:`<button class="btn" type="button" onclick='speak(${JSON.stringify(String(fr))})'>🔊 استمع</button>`}${example?`<button class="btn" type="button" onclick='speak(${JSON.stringify(String(example))})'>🔊 نطق المثال</button>`:''}</div>'''
if old in s:
    s = s.replace(old, new)

# Keep the visual area clean; do not show labels such as "صورة الكلمة" on every card.
s = s.replace('<span class="visual-kicker">${esc(v.label)}</span>', '')

styles = '''.section-lead{background:#f7faff;border:1px solid #dfe8f5;border-radius:14px;padding:13px;line-height:1.9;margin:10px 0}.concept-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}.concept{background:#fff;border:1px solid #e1e7f0;border-radius:14px;padding:13px;line-height:1.8}.concept b{color:#173a82}.quiz{display:grid;gap:10px}.qbox{background:#fff;border:1px solid #dfe6f1;border-radius:15px;padding:14px}.opts{display:flex;gap:7px;flex-wrap:wrap;margin-top:10px}.opt{border:1px solid #cbd7e8;background:#f8fbff;color:#173a82;border-radius:10px;padding:9px 12px;font-weight:800;cursor:pointer}.result{margin-top:9px;font-weight:800}.gamebox{background:linear-gradient(135deg,#f7fbff,#eefbf8);border:1px solid #d9e8ea;border-radius:15px;padding:15px;line-height:1.9}.review-row{display:flex;gap:8px;flex-wrap:wrap}.review-chip{padding:9px 12px;border-radius:999px;background:#edf3ff;color:#173a82;font-weight:800}'''
if '.section-lead{' not in s:
    s = s.replace('@media(max-width:560px)', styles + '@media(max-width:560px)', 1)

def replace_block(start, end, replacement):
    global s
    a = s.find(start)
    b = s.find(end, a)
    if a == -1 or b == -1:
        return
    s = s[:a] + replacement + s[b:]

replace_block(
    "if(currentSection==='grammar')",
    "if(currentSection==='conversation')",
    '''if(currentSection==='grammar'){let trans=[['Un pyjama','بيجاما'],['Un pantalon','بنطلون'],['Un taxi','تاكسي'],['Un téléphone','تليفون'],['Une guitare','جيتار'],['Une télévision','تليفزيون']];return `<div class="card enrich"><h2>📘 القاعدة اللغوية في هذا الدرس</h2><div class="section-lead"><b>Les mots transparents — الكلمات الشفافة</b><br>هي كلمات فرنسية يسهل على المتعلم التعرف على معناها لأن شكلها أو أصلها قريب من كلمة يعرفها في لغته. في هذا الدرس نستخدمها كبوابة أولى لقراءة الفرنسية بثقة، مع الانتباه إلى أن النطق الفرنسي قد يختلف عن النطق العربي.</div><div class="concept-grid"><div class="concept"><b>🎯 لماذا نتعلمها؟</b><br>لتكوين رصيد سريع من الكلمات التي يمكن للطالب فهمها والتعرف عليها من أول لقاء.</div><div class="concept"><b>🔎 ماذا ألاحظ؟</b><br>أقارن شكل الكلمة بالمعنى الذي أعرفه، ثم أستمع إلى نطقها الفرنسي الصحيح بدل الاعتماد على شكلها فقط.</div><div class="concept"><b>🗣️ قاعدة مهمة</b><br>تشابه الكتابة لا يعني أن النطق متطابق؛ لذلك نقرأ الكلمة ونستمع إليها معًا.</div></div><h3>أمثلة حقيقية من الدرس</h3>${list(trans)}</div>`}'''
)
replace_block(
    "if(currentSection==='conversation')",
    "if(currentSection==='practice')",
    '''if(currentSection==='conversation'){return `<div class="card source"><h2>💬 التطبيق الشفهي</h2><div class="section-lead">لا يحتوي المصدر على حوار مستقل، لذلك نحول عناصر الدرس نفسها إلى تدريب شفهي دون إضافة حوار خارج المحتوى.</div><div class="concept-grid"><div class="concept"><b>1️⃣ الحرف → المثال</b><br>يظهر الحرف مثل <b>A</b>، ثم يقول الطالب المثال المرتبط به: <b>arbre</b>.</div><div class="concept"><b>2️⃣ المثال → الحرف</b><br>استمع إلى الكلمة ثم حاول تذكر الحرف الذي تبدأ به.</div><div class="concept"><b>3️⃣ الكلمات الشفافة</b><br>اقرأ كلمة مثل <b>Un téléphone</b>، ثم استمع إلى نطقها وكررها.</div></div><div class="vocab-actions"><button class="btn" type="button" onclick='speak("A")'>🔊 A</button><button class="btn" type="button" onclick='speak("arbre")'>🔊 arbre</button><button class="btn" type="button" onclick='speak("Un téléphone")'>🔊 Un téléphone</button></div></div>`}'''
)
replace_block(
    "if(currentSection==='practice')",
    "if(currentSection==='video')",
    '''if(currentSection==='practice'){let qs=Array.isArray(data.embeddedPractice)?data.embeddedPractice:[];return `<div class="card source"><h2>✍️ التدريب</h2><div class="section-lead">تدريب مستخرج من محتوى الدرس نفسه، مع تصحيح فوري. لا يضيف أسئلة من خارج المصدر.</div><div class="quiz">${qs.map((q,i)=>`<div class="qbox"><b>${i+1}. ${esc(q.q)}</b><div class="opts">${(q.options||[]).map(o=>`<button class="opt" type="button" data-answer="${esc(q.answer)}" data-value="${esc(o)}">${esc(o)}</button>`).join('')}</div><div class="result" aria-live="polite"></div></div>`).join('')}</div></div>`}'''
)
replace_block(
    "if(currentSection==='games')",
    "if(currentSection==='smart-review')",
    '''if(currentSection==='games'){let games=[['🔤 تعرّف على الحرف','استمع إلى حرف ثم اختر المثال الصحيح من كلمات الدرس.'],['🔊 اسمع واختر','استمع إلى كلمة شفافة ثم اخترها من القائمة.'],['🧩 طابق','طابق الكلمات الشفافة مع معانيها العربية من نفس قائمة الدرس.']];return `<div class="card enrich"><h2>🎮 مركز الألعاب</h2><div class="section-lead">الألعاب هنا مبنية على عناصر الدرس الفعلية: الأبجدية، الحروف المتحركة، والكلمات الشفافة.</div><div class="concept-grid">${games.map(g=>`<div class="gamebox"><h3>${g[0]}</h3><p>${g[1]}</p><button class="btn" type="button" onclick='speak("${g[0].includes("الحرف")?"A":"Un téléphone"}")'>🔊 ابدأ بالاستماع</button></div>`).join('')}</div></div>`}'''
)
replace_block(
    "if(currentSection==='smart-review')",
    "if(currentSection==='assessment')",
    '''if(currentSection==='smart-review'){let chips=['A → arbre','E → éléphant','I → image','O → orange','U → uniforme','Y → yoyo','H → hôpital','Un pyjama','Un téléphone','Une guitare','Un cinéma'];return `<div class="card enrich"><h2>🧠 المراجعة الذكية</h2><div class="section-lead">مراجعة مركزة على أهداف الدرس الفعلية قبل التقييم: الأبجدية، الحروف المتحركة، والكلمات الشفافة.</div><div class="review-row">${chips.map(x=>`<button class="review-chip" type="button" onclick='speak(${JSON.stringify(x.includes('→')?x.split(' → ')[1]:x)})'>${esc(x)} 🔊</button>`).join('')}</div></div>`}'''
)
replace_block(
    "if(currentSection==='assessment')",
    "if(currentSection==='progress')",
    '''if(currentSection==='assessment'){let a=data.formalAssessment;return `<div class="card source"><h2>🏆 التقييم</h2>${a?`<div class="ok">التقييم الرسمي للمصدر: <b>${esc(a.sourceDeclaredTotal)} سؤالًا</b>.</div><div class="section-lead">نطاق التقييم مأخوذ من بنية التقييم الأصلية: اختيار الإجابة، إكمال الكلمات، اكتشاف المختلف، الربط بالكلمة/الصورة، كتابة الحروف أو الكلمات، صواب أو خطأ، وتصنيف الكلمات.</div>${list((a.sourceExerciseStructure||[]).map(x=>`${x.title} — ${x.items} عنصر`))}`:'<div class="notice">بيانات التقييم الرسمي غير متاحة في ملف الدرس.</div>'}</div>`}'''
)

# Interactive correction for the source-derived practice questions.
if "closest('.opt')" not in s:
    s = s.replace("load().catch(e=>{console.error(e);", "document.addEventListener('click',e=>{let b=e.target.closest('.opt');if(!b)return;let box=b.closest('.qbox'),out=box.querySelector('.result');let ok=b.dataset.value===b.dataset.answer;out.textContent=ok?'✅ إجابة صحيحة':'❌ ليست الإجابة الصحيحة — حاول مرة أخرى';out.style.color=ok?'#17854a':'#b42318'});load().catch(e=>{console.error(e);", 1)

p.write_text(s, encoding='utf-8')
