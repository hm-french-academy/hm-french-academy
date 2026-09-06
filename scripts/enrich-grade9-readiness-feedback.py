import json
from pathlib import Path

path = Path('data/reviews/grade-9/review-content.json')
raw = json.loads(path.read_text(encoding='utf-8'))
wrapped = isinstance(raw, dict) and 'content' in raw
if wrapped:
    data = json.loads(raw['content'])
else:
    data = raw

E = {
'D1':'«Dans la trousse» تعني «في المقلمة»، ومن أدواتها «un crayon» (قلم رصاص). أما «un avion» فهو طائرة، و«un canapé» أريكة، و«un passeport» جواز سفر؛ لذلك لا تناسب السياق.',
'D2':'عند السفر بالطائرة نذهب إلى «l\'aéroport» (المطار). أما «la cuisine» فالمطبخ، و«la chambre» غرفة النوم، و«la classe» الفصل.',
'D3':'التعبير الثابت عن وجود شيء هو «Il y a». لذلك نقول «Il y a un livre sur la table»، ولا نستبدل «Il» بضمير آخر.',
'D4':'«chambre» اسم مؤنث مفرد، لذلك نستخدم أداة الملكية «ma»: «C\'est ma chambre». «mon» للمذكر المفرد و«mes» للجمع.',
'D5':'مع اسم الدولة «la France» نستخدم حرف الجر «en» للدلالة على الذهاب إليها: «Je vais en France».',
'D6':'«lait» اسم مذكر مفرد، ومع الطعام أو الشراب غير المحدد نستخدم أداة التجزئة «du»: «Je bois du lait».',
'D7':'بعد النفي «ne ... pas» تتحول أداة التجزئة إلى «de/d\'». لذلك نقول «Nous ne mangeons pas de viande»، وليس «de la viande».',
'D8':'لقبول الدعوة نستخدم تعبيرًا مثل «Avec plaisir !» أي «بكل سرور». «Désolé !» تعني الاعتذار/الرفض، وباقي الاختيارات لا تقبل دعوة.',
'D9':'للسؤال عن التاريخ أو موعد المناسبة نستخدم «Quand ?» أي «متى؟». «Où ?» للمكان و«Qui ?» للشخص.',
'D10':'في النفي تتحول «du lait» إلى «de lait»: «Je ne bois pas de lait». القاعدة هي ne + الفعل + pas، ومع النفي تتحول أداة التجزئة إلى «de/d\'».',
'D11':'الإجابة المطلوبة أربع جمل عن الأكل والشرب خلال اليوم. يجب استخدام مفردات الطعام المناسبة وتراكيب مثل «Je mange...» و«Je bois...» مع أدوات التجزئة الصحيحة بحسب الاسم.',
'D12':'الدعوة القصيرة يجب أن تتضمن المناسبة (anniversaire)، والمخاطَب، وعبارة الدعوة مثل «Je t\'invite...»، مع معلومات مناسبة عن الوقت أو المكان.',
'P01':'«cahier» مذكر مفرد فيأخذ «un»، بينما «trousse» مؤنث مفرد فتأخذ «une»: «un cahier et une trousse».',
'P02':'التعبير الصحيح عن وجود شيء هو «Il y a»، لذلك نختار «Il».',
'P03':'«chambre» مؤنث مفرد، ومع المتكلم نستخدم «ma»: «Ma chambre est petite».',
'P04':'«Les chambres» جمع، لذلك الصفة «propre» يجب أن تكون في الجمع «propres».',
'P05':'«France» مؤنث، ومع أسماء الدول المؤنثة نستخدم «en»: «Nous allons en France».',
'P06':'«valise» مؤنث مفرد، لذلك أداة الإشارة المناسبة هي «Cette»: «Cette valise est lourde».',
'P07':'«salade» مؤنث مفرد، لذلك أداة التجزئة هي «de la»: «Je mange de la salade».',
'P08':'الجملة منفية «ne ... pas»، لذلك تتحول «du lait» إلى «de lait»: «Je ne bois pas de lait».',
'P09':'الفاعل «Je» يأخذ الفعل «inviter» في المضارع بصيغة «invite»: «Je t\'invite à mon anniversaire».',
'P10':'«Quand ?» تُستخدم للسؤال عن الوقت أو التاريخ؛ لذلك هي المناسبة للسؤال عن موعد المناسبة.',
'F1':'«cahier» مذكر مفرد فيأخذ «un»، و«trousse» مؤنث مفرد فتأخذ «une». لذلك «un cahier et une trousse» هي المطابقة الصحيحة.',
'F2':'«chambre» مؤنث مفرد لذلك «ma»، و«fenêtres» جمع لذلك «mes»: «Ma chambre est grande et mes fenêtres sont ouvertes».',
'F3':'نقول «en France» لأن فرنسا اسم دولة مؤنث، ونقول «en avion» مع وسيلة السفر بالطائرة. لذلك «en / en» هي الصيغة الصحيحة.',
'F4':'«café» و«pain» اسمان مذكران مفردان، لذلك نستخدم «du» مع كل منهما: «du café et du pain».',
'F5':'في النفي تتحول أداة التجزئة «de la» إلى «de»: «Nous ne mangeons pas de ...».',
'F6':'«billet» مذكر مفرد، لذلك أداة الإشارة هي «Ce»: «Ce billet est à moi». «Cette» للمؤنث المفرد و«Ces» للجمع.',
'F7':'السؤال عن التاريخ يستخدم «Quand est l\'anniversaire ?». «Où» للسؤال عن المكان، و«Comment» عن الكيفية، و«Qui» عن الشخص.',
'F8':'المطلوب خمس جمل مترابطة عن وجبة، ويُراعى فيها مفردات الطعام، واستخدام أدوات التجزئة «du / de la / des»، وتصريف الأفعال بصورة صحيحة.',
'F9':'المطلوب دعوة من خمس جمل لعيد الميلاد، ويجب أن توضح الدعوة المناسبة وتستخدم تركيبًا صحيحًا مثل «Je t\'invite à mon anniversaire»، مع تفاصيل مناسبة.',
'F10':'يُقيَّم النص وفق المطلوب في السؤال: وضوح الفكرة، صحة المفردات والتراكيب، واستخدام قواعد الوحدة المرتبطة بالمناسبة أو الطعام بحسب السؤال.'
}

sections = [data.get('diagnostic', {}).get('questions', []), data.get('practiceQuestions', []), data.get('finalReadiness', {}).get('questions', [])]
all_questions = [q for group in sections for q in group]
missing = []
for q in all_questions:
    qid = str(q.get('id', ''))
    if qid not in E:
        missing.append(qid)
    else:
        q['explanation'] = E[qid]
if missing:
    raise SystemExit(f'Missing Grade 9 explanations: {missing}')

data.setdefault('quality', {})['questionSpecificExplanations'] = True

if wrapped:
    raw['content'] = json.dumps(data, ensure_ascii=False, separators=(',', ':'))
    path.write_text(json.dumps(raw, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
else:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

print(f'Grade 9 readiness: {len(all_questions)} questions enriched with source-specific explanations')
