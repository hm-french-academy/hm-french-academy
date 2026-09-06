import json
from pathlib import Path

path = Path('data/reviews/grade-3/review-content-normalized.json')
outer = json.loads(path.read_text(encoding='utf-8'))
data = json.loads(outer['content'])

E = {
'D01':'السؤال «Comment tu t\'appelles ?» يسأل عن اسم الشخص. الصيغة الصحيحة للإجابة هي «Je m\'appelle + الاسم»، لذلك «Je m\'appelle Sara.» هي الإجابة المناسبة، وليست جملة العمر أو الحال.',
'D02':'السؤال «Quel âge as-tu ?» يسأل عن العمر. في الفرنسية نستخدم الفعل avoir للتعبير عن العمر: «J\'ai 9 ans.»، وليس «Je m\'appelle…» أو «Bonjour !».',
'D03':'السؤال عن شيء موجود في الفصل «Dans la classe». «un crayon» من أدوات المدرسة التي توجد في الفصل، بينما «une banane» فاكهة و«un lion» حيوان.',
'D04':'كلمة «gomme» اسم مؤنث مفرد، لذلك نستخدم أداة التنكير «une»: «C\'est une gomme.» أما «un» للمذكر المفرد و«des» للجمع.',
'D05':'السؤال عن شيء موجود في الحمّام. «un lavabo» هو حوض الغسيل، وهو من مفردات الحمّام؛ أما «un canapé» و«un lit» فليسا من مفردات الحمّام الأساسية في هذا الدرس.',
'D06':'«La carotte» (الجزر) من الخضروات، لذلك تصنيفها الصحيح هو «un légume». «un fruit» للفاكهة و«un animal» للحيوان.',
'D07':'«Les bananes» جمع مؤنث، واللون صفة يجب أن يوافق الاسم في العدد والجنس. الصيغة المناسبة هي «jaunes»، أي مؤنث جمع من «jaune».',
'D08':'«confiture» اسم مؤنث مفرد، ومع فعل الأكل نستخدم أداة التجزئة «de la»: «Je mange de la confiture.»',
'D09':'لتحويل «le tigre» إلى الجمع نغيّر أداة التعريف إلى «les» ونضيف «s» إلى الاسم: «les tigres».',
'D10':'«Sami et Ali» شخصان مذكران، أي جمع؛ لذلك نستخدم ضمير الجمع المذكر «Ils»، وليس «Il» للمفرد أو «Elle» للمفرد المؤنث.',
'P01':'«Bonjour !» هي تحية مناسبة لمخاطبة الأستاذ. «J\'ai 9 ans» للتعبير عن العمر، و«Je m\'appelle Sara» للتعريف بالاسم.',
'P02':'مع الضمير «Je» نقول «Je m\'appelle» عند ذكر الاسم. «t\'appelles» تأتي مع «Tu»، و«s\'appelle» مع «Il/Elle».',
'P03':'«un cahier» (كراسة) من أدوات المدرسة الموجودة في الفصل، بينما «une pomme» فاكهة و«un tigre» حيوان.',
'P04':'«trousse» اسم مؤنث مفرد، لذلك نستخدم «une»: «C\'est une trousse.»',
'P05':'«un lit» (سرير) من مفردات غرفة النوم، بينما «un lavabo» للحمّام و«un canapé» لغرفة الجلوس.',
'P06':'«une table» يمكن أن توجد في المطبخ وهي من مفردات أثاثه، بينما «une douche» للحمّام و«un lit» لغرفة النوم.',
'P07':'«La pomme» (التفاحة) من الفواكه، لذلك الإجابة «un fruit».',
'P08':'«La carotte» (الجزر) من الخضروات، لذلك الإجابة «un légume»، وليست فاكهة أو لونًا.',
'P09':'«La robe» اسم مؤنث مفرد، لذلك يجب أن تتوافق الصفة «blanc» معه وتصبح «blanche»: «La robe est blanche.»',
'P10':'«Les bananes» جمع مؤنث، لذلك يجب أن يأتي اللون في صيغة الجمع «jaunes»، وليس المفرد «jaune».',
'P11':'«lait» اسم مذكر مفرد، ومع أداة التجزئة نستخدم «du» = «de + le»: «Je bois du lait.»',
'P12':'«confiture» اسم مؤنث مفرد، لذلك نستخدم أداة التجزئة «de la»: «Je mange de la confiture.»',
'P13':'جمع «le lion» هو «les lions»: تتحول أداة التعريف من «le» إلى «les» ويأخذ الاسم علامة الجمع «s».',
'P14':'«Sami et Ali» جمع مذكر، لذلك ضمير الفاعل المناسب هو «Ils».',
'P15':'«Le tigre» مذكر مفرد، لذلك الصفة «grand» تأتي في المذكر المفرد. لا نستخدم «grande» للمؤنث أو «grandes» للجمع.',
'F01':'«Ça va ?» سؤال عن الحال، والإجابة المناسبة هي «Ça va bien, merci.» أما «J\'ai 9 ans» فهي للعمر و«Je m\'appelle Sara» للاسم.',
'F02':'«livres» جمع، لذلك نستخدم أداة التعريف غير المحددة للجمع «des»: «Ce sont des livres.»',
'F03':'«le salon» هو غرفة الجلوس، ومن أثاثها «un canapé». «une douche» للحمّام و«un lit» لغرفة النوم.',
'F04':'«La robe» مؤنث مفرد، لذلك يجب أن تتوافق الصفة «blanc» معها في المؤنث المفرد: «blanche».',
'F05':'«lait» مذكر مفرد، لذلك أداة التجزئة الصحيحة هي «du»: «Je bois du lait au petit-déjeuner.»',
'F06':'«Sami et Ali» اسمان لشخصين مذكرين، لذلك نستخدم «Ils» لضمير الجمع المذكر.',
'F07':'«La carotte» هي الجزر، وتصنيفها «un légume» (خضار)، وليست حيوانًا أو ملابس.',
'F08':'«Le cahier» مذكر مفرد، لذلك الصفة «jaune» تأتي بصيغة المفرد المذكر. كلمة «jaunes» جمع، و«jaunee» صيغة غير صحيحة.',
'F09':'عند تحويل الجملة إلى الجمع يتغير الفاعل «Le lion» إلى «Les lions»، والفعل «regarde» إلى «regardent»، والمفعول «le chien» إلى «les chiens». لذلك «Les lions regardent les chiens.» هي الصيغة الصحيحة.',
'F10':'«Je mange du pain» جملة صحيحة عن الفطور: «pain» مذكر مفرد ويأتي مع أداة التجزئة «du». أما «girafe» و«lion» فليسا طعامًا أو شرابًا في هذا السياق.'
}

for section in ('diagnostic',):
    for q in data.get(section, {}).get('questions', []):
        if q.get('id') in E: q['explanation'] = E[q['id']]
for q in data.get('practiceQuestions', []):
    if q.get('id') in E: q['explanation'] = E[q['id']]
for q in data.get('finalReadiness', {}).get('questions', []):
    if q.get('id') in E: q['explanation'] = E[q['id']]

all_ids = [q.get('id') for q in data.get('diagnostic',{}).get('questions',[]) + data.get('practiceQuestions',[]) + data.get('finalReadiness',{}).get('questions',[])]
missing = [i for i in all_ids if i not in E]
if missing: raise SystemExit(f'Missing Grade 4 explanations: {missing}')
data.setdefault('quality', {})['questionSpecificExplanations'] = True
outer['content'] = json.dumps(data, ensure_ascii=False, separators=(',', ':'))
outer['sha'] = ''
path.write_text(json.dumps(outer, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
