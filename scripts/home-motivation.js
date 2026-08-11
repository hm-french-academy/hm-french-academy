(function(){
  const messages=[
    {ar:'كل خطوة تخطوها اليوم تقرّبك من النجاح غدًا. لا تنتظر أن تصبح جاهزًا؛ ابدأ، تعلّم، حاول، ثم طوّر نفسك كل يوم.',fr:'Chaque pas que vous faites aujourd’hui vous rapproche de votre réussite de demain. N’attendez pas d’être prêt : commencez, apprenez, essayez et progressez chaque jour.'},
    {ar:'النجاح لا يأتي دفعة واحدة؛ إنه نتيجة محاولات صغيرة تتكرر بإصرار. اجعل تعلّمك اليوم بداية لإنجاز أكبر غدًا.',fr:'La réussite n’arrive pas en un seul jour : elle naît de petits efforts répétés avec persévérance. Faites de votre apprentissage d’aujourd’hui le début d’une plus grande réussite demain.'},
    {ar:'آمن بقدرتك على التعلّم. الخطأ ليس فشلًا، بل خطوة في طريق الإتقان. استمر في السعي، فكل دقيقة تتعلم فيها تصنع فرقًا.',fr:'Croyez en votre capacité d’apprendre. L’erreur n’est pas un échec, mais une étape vers la maîtrise. Continuez vos efforts : chaque minute d’apprentissage fait la différence.'},
    {ar:'لا تقارن بدايتك بنهاية غيرك. ركّز على تقدمك، واحتفل بكل إنجاز صغير، وواصل الطريق حتى تصل إلى هدفك.',fr:'Ne comparez pas votre début au résultat des autres. Concentrez-vous sur vos progrès, célébrez chaque petite victoire et continuez jusqu’à votre objectif.'},
    {ar:'طموحك يستحق العمل، وأحلامك تستحق المحاولة. افتح درسًا، تعلّم كلمة جديدة، واصنع اليوم خطوة نحو مستقبلك.',fr:'Votre ambition mérite vos efforts et vos rêves méritent d’être tentés. Ouvrez une leçon, apprenez un nouveau mot et faites aujourd’hui un pas vers votre avenir.'},
    {ar:'العلم يفتح الأبواب، والاستمرار يقود إلى النجاح. اجعل كل يوم فرصة جديدة لتكون أفضل مما كنت عليه بالأمس.',fr:'Le savoir ouvre les portes et la persévérance mène à la réussite. Faites de chaque jour une nouvelle occasion de devenir meilleur qu’hier.'}
  ];
  function pick(){
    const key='hm_last_motivation';
    const last=Number(localStorage.getItem(key));
    let i=Math.floor(Math.random()*messages.length);
    if(messages.length>1 && i===last)i=(i+1)%messages.length;
    localStorage.setItem(key,String(i));
    return messages[i];
  }
  function mount(){
    const host=document.getElementById('hm-motivation');
    if(!host)return;
    const m=pick();
    host.innerHTML='<div class="hm-motivation-mark">✦</div><div class="hm-motivation-content"><span class="hm-motivation-kicker">رسالة تحفيزية · Message du jour</span><p class="hm-motivation-ar">'+m.ar+'</p><p class="hm-motivation-fr">'+m.fr+'</p><div class="hm-motivation-welcome"><span>مرحبًا بك في</span> <strong>HM Academy</strong><span> · </span><span>Bienvenue sur HM Academy</span></div><div class="hm-motivation-signature"><span class="sig-ar">HM Academy — د. محمد فتحي، المؤسس</span><span class="sig-fr">HM Academy — Dr Mohamed Fathy, Fondateur</span></div></div>';
    const lang=window.HMLanguage?HMLanguage.get():(document.documentElement.lang||'ar');
    host.dataset.language=lang;
    window.addEventListener('hm:languagechange',e=>{host.dataset.language=e.detail.lang});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
