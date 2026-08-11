(function(){
  const messages=[
    {cat:'ambition',ar:'كل خطوة تخطوها اليوم تقرّبك من النجاح غدًا. لا تنتظر أن تصبح جاهزًا؛ ابدأ، تعلّم، حاول، ثم طوّر نفسك كل يوم.',fr:'Chaque pas que vous faites aujourd’hui vous rapproche de votre réussite de demain. N’attendez pas d’être prêt : commencez, apprenez, essayez et progressez chaque jour.'},
    {cat:'ambition',ar:'طموحك يستحق العمل، وأحلامك تستحق المحاولة. اجعل يومك بداية حقيقية نحو المستقبل الذي تتمنى الوصول إليه.',fr:'Votre ambition mérite vos efforts et vos rêves méritent d’être tentés. Faites de votre journée un véritable premier pas vers l’avenir que vous souhaitez construire.'},
    {cat:'ambition',ar:'لا تجعل حجم الهدف يخيفك؛ قسّمه إلى خطوات صغيرة، وابدأ بالخطوة التي تستطيع القيام بها الآن.',fr:'Ne laissez pas la grandeur de votre objectif vous arrêter. Divisez-le en petites étapes et commencez par celle que vous pouvez accomplir maintenant.'},
    {cat:'ambition',ar:'لكل إنجاز كبير بداية بسيطة. ابدأ اليوم، فالمستقبل يُبنى من القرارات الصغيرة التي تتخذها الآن.',fr:'Toute grande réussite commence simplement. Commencez aujourd’hui : l’avenir se construit avec les petites décisions que vous prenez maintenant.'},
    {cat:'effort',ar:'النجاح لا يأتي دفعة واحدة؛ إنه نتيجة محاولات صغيرة تتكرر بإصرار. استمر حتى تصبح محاولاتك إنجازات.',fr:'La réussite n’arrive pas en un seul jour : elle naît de petits efforts répétés avec persévérance. Continuez jusqu’à transformer vos efforts en réussites.'},
    {cat:'effort',ar:'ما تكرره اليوم بإصرار، ستتقنه غدًا. لا تبحث عن الكمال من المحاولة الأولى؛ ابحث عن التقدم.',fr:'Ce que vous répétez aujourd’hui avec persévérance, vous le maîtriserez demain. Ne cherchez pas la perfection dès le premier essai : cherchez le progrès.'},
    {cat:'effort',ar:'حتى عندما يكون التقدم بطيئًا، فأنت تتقدم. لا تتوقف بسبب يوم صعب؛ عد إلى الطريق وواصل.',fr:'Même lorsque les progrès semblent lents, vous avancez. Ne vous arrêtez pas à cause d’une journée difficile : reprenez votre chemin et continuez.'},
    {cat:'effort',ar:'الإنجاز لا يحتاج إلى يوم مثالي؛ يحتاج إلى طالب يقرر أن يستمر رغم الظروف.',fr:'La réussite ne demande pas une journée parfaite ; elle demande un élève qui choisit de continuer malgré les difficultés.'},
    {cat:'confidence',ar:'آمن بقدرتك على التعلّم. الخطأ ليس فشلًا، بل خطوة في طريق الإتقان.',fr:'Croyez en votre capacité d’apprendre. L’erreur n’est pas un échec, mais une étape vers la maîtrise.'},
    {cat:'confidence',ar:'لا تقارن بدايتك بنهاية غيرك. قارن نفسك بما كنت عليه بالأمس، واحتفل بكل تقدم تحققه.',fr:'Ne comparez pas votre début au résultat des autres. Comparez-vous à la personne que vous étiez hier et célébrez chaque progrès.'},
    {cat:'confidence',ar:'إذا أخطأت، تعلّم. إذا تعثرت، ابدأ من جديد. وإذا نجحت، واصل التطور. هذه هي رحلة التعلّم.',fr:'Si vous vous trompez, apprenez. Si vous trébuchez, recommencez. Et si vous réussissez, continuez à progresser. C’est cela, le chemin de l’apprentissage.'},
    {cat:'confidence',ar:'قد لا تعرف كل الإجابات الآن، وهذا طبيعي. المهم أن تملك الشجاعة لتتعلمها.',fr:'Vous ne connaissez peut-être pas encore toutes les réponses, et c’est normal. L’essentiel est d’avoir le courage de les apprendre.'},
    {cat:'learning',ar:'العلم يفتح الأبواب، والاستمرار يقود إلى النجاح. اجعل كل يوم فرصة جديدة لتكون أفضل مما كنت عليه بالأمس.',fr:'Le savoir ouvre les portes et la persévérance mène à la réussite. Faites de chaque jour une occasion de devenir meilleur qu’hier.'},
    {cat:'learning',ar:'كل كلمة جديدة تتعلمها توسّع عالمك. لا تستهِن بما تتعلمه اليوم؛ قد يصبح غدًا جزءًا من نجاحك.',fr:'Chaque nouveau mot que vous apprenez élargit votre monde. Ne sous-estimez pas ce que vous apprenez aujourd’hui : cela peut devenir une partie de votre réussite demain.'},
    {cat:'learning',ar:'التعلم رحلة، وليس سباقًا. خذ وقتك، افهم، طبّق، ثم انتقل إلى الخطوة التالية.',fr:'Apprendre est un voyage, pas une course. Prenez votre temps, comprenez, pratiquez, puis passez à l’étape suivante.'},
    {cat:'learning',ar:'اسأل، جرّب، أخطئ، صحّح، ثم جرّب مرة أخرى. بهذه الطريقة تتحول المعرفة إلى مهارة.',fr:'Posez des questions, essayez, faites des erreurs, corrigez-les, puis recommencez. C’est ainsi que la connaissance devient une compétence.'},
    {cat:'french',ar:'تعلم الفرنسية لا يعني حفظ الكلمات فقط؛ بل اكتشاف لغة وثقافة وطريقة جديدة للتعبير عن نفسك.',fr:'Apprendre le français, ce n’est pas seulement mémoriser des mots : c’est découvrir une langue, une culture et une nouvelle façon de vous exprimer.'},
    {cat:'french',ar:'كل كلمة فرنسية جديدة خطوة نحو طلاقة أكبر. Pratiquez chaque jour et laissez votre confiance grandir.',fr:'Chaque nouveau mot français est un pas vers plus d’aisance. Pratiquez chaque jour et laissez votre confiance grandir.'},
    {cat:'french',ar:'لا تخف من التحدث بالفرنسية بسبب الخطأ. الخطأ جزء طبيعي من الطريق إلى النطق الأفضل.',fr:'N’ayez pas peur de parler français à cause des erreurs. L’erreur fait naturellement partie du chemin vers une meilleure expression.'},
    {cat:'french',ar:'Aujourd’hui, apprenez un mot. Demain, utilisez-le. Avec le temps, vous construirez une vraie maîtrise du français.',fr:'Aujourd’hui, apprenez un mot. Demain, utilisez-le. Avec le temps, vous construirez une vraie maîtrise du français.'},
    {cat:'discipline',ar:'الوقت الذي تستثمره في نفسك لا يضيع. خصص كل يوم وقتًا صغيرًا للتعلم، وستندهش من أثر الاستمرار.',fr:'Le temps que vous investissez en vous-même n’est jamais perdu. Consacrez chaque jour un peu de temps à apprendre et vous serez surpris par les résultats de la régularité.'},
    {cat:'discipline',ar:'لا تنتظر الحماس كي تبدأ؛ ابدأ أولًا، وسيأتي الحماس مع رؤية تقدمك.',fr:'N’attendez pas la motivation pour commencer. Commencez d’abord, et la motivation viendra en voyant vos progrès.'},
    {cat:'discipline',ar:'خطط لدرس اليوم، أنجزه، ثم امنح نفسك شعور الرضا لأنك التزمت بما وعدت به نفسك.',fr:'Planifiez votre leçon du jour, accomplissez-la, puis soyez fier d’avoir tenu la promesse faite à vous-même.'},
    {cat:'discipline',ar:'القليل المنتظم أقوى من الكثير المتقطع. اجعل التعلم عادة، وستصبح النتائج جزءًا من حياتك.',fr:'Un petit effort régulier est plus puissant qu’un grand effort occasionnel. Faites de l’apprentissage une habitude et les résultats suivront.'},
    {cat:'success',ar:'النجاح ليس لحظة تصل إليها، بل رحلة تبنيها كل يوم بقراراتك وعملك وصبرك.',fr:'La réussite n’est pas un moment où vous arrivez, mais un chemin que vous construisez chaque jour par vos choix, vos efforts et votre patience.'},
    {cat:'success',ar:'احتفل بإنجازاتك الصغيرة؛ فهي الأدلة التي تخبرك أنك تتحرك في الاتجاه الصحيح.',fr:'Célébrez vos petites réussites : elles sont les preuves que vous avancez dans la bonne direction.'},
    {cat:'success',ar:'قد تكون الخطوة التي تقوم بها اليوم صغيرة، لكنها قد تكون بداية قصة نجاح كبيرة.',fr:'Le pas que vous faites aujourd’hui est peut-être petit, mais il peut être le début d’une grande histoire de réussite.'},
    {cat:'success',ar:'لا تبحث فقط عن نتيجة سريعة؛ ابنِ أساسًا قويًا. ما تتعلمه بإتقان يبقى معك طويلًا.',fr:'Ne cherchez pas seulement un résultat rapide : construisez des bases solides. Ce que vous maîtrisez vraiment vous accompagne longtemps.'},
    {cat:'welcome',ar:'مرحبًا بك في HM Academy. هنا تبدأ خطوة جديدة في رحلتك نحو المعرفة والتميز.',fr:'Bienvenue sur HM Academy. Ici commence une nouvelle étape de votre parcours vers la connaissance et l’excellence.'},
    {cat:'welcome',ar:'أهلًا بك في HM Academy. افتح درسًا، ابدأ التعلم، ودع كل يوم يقربك من هدفك.',fr:'Bienvenue sur HM Academy. Ouvrez une leçon, commencez à apprendre et laissez chaque journée vous rapprocher de votre objectif.'},
    {cat:'welcome',ar:'مرحبًا بك من جديد. رحلتك التعليمية مستمرة، وكل زيارة للمنصة فرصة جديدة للتقدم.',fr:'Bienvenue à nouveau. Votre parcours d’apprentissage continue, et chaque visite de la plateforme est une nouvelle occasion de progresser.'},
    {cat:'welcome',ar:'HM Academy ترحب بك. تعلّم اليوم، تطور غدًا، واصنع مستقبلك بخطوات ثابتة.',fr:'HM Academy vous souhaite la bienvenue. Apprenez aujourd’hui, progressez demain et construisez votre avenir pas à pas.'}
  ];
  function pick(){
    const key='hm_motivation_history_v2';
    let history=[];try{history=JSON.parse(localStorage.getItem(key)||'[]')}catch(e){}
    const recent=new Set(history.slice(-12));
    let pool=messages.map((_,i)=>i).filter(i=>!recent.has(i));
    if(!pool.length){history=[];pool=messages.map((_,i)=>i)}
    const i=pool[Math.floor(Math.random()*pool.length)];
    history.push(i);if(history.length>12)history=history.slice(-12);localStorage.setItem(key,JSON.stringify(history));return messages[i];
  }
  function mount(){
    const host=document.getElementById('hm-motivation');if(!host)return;const m=pick();
    host.innerHTML='<div class="hm-motivation-mark">✦</div><div class="hm-motivation-content"><span class="hm-motivation-kicker">رسالة تحفيزية · Message du jour</span><p class="hm-motivation-ar">'+m.ar+'</p><p class="hm-motivation-fr">'+m.fr+'</p><div class="hm-motivation-welcome"><span>مرحبًا بك في</span> <strong>HM Academy</strong><span> · </span><span>Bienvenue sur HM Academy</span></div><div class="hm-motivation-signature"><span class="sig-ar">HM Academy — الأستاذ حاتم المرسي، المؤسس</span><span class="sig-fr">HM Academy — Monsieur Hatem ElMorsi, Fondateur</span></div></div>';
    host.dataset.language=window.HMLanguage?HMLanguage.get():(document.documentElement.lang||'ar');window.addEventListener('hm:languagechange',e=>{host.dataset.language=e.detail.lang});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
