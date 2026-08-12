'use strict';
(() => {
  const apply = () => {
    const root = document.querySelector('#app.premium-v4');
    if (!root) return setTimeout(apply, 80);
    const q = root.querySelector('.q.has-image .desk-question');
    if (q) q.innerHTML = '<img src="assets/lessons/grade8-u1-l1/desk-question.svg" alt="مكتب عليه كراسة وآلة حاسبة">';
    const examples = root.querySelectorAll('.vcard .example');
    const ar = ['لدي قلمًا جافًا.','أكتب بقلم رصاص.','لدي ممحاة.','المسطرة على الطاولة.','لدي أنبوبة لاصق.','البراية داخل المقلمة.','الكراسة على المكتب.','الكتاب داخل الحقيبة.','الكتاب داخل حقيبة الظهر.','الآلة الحاسبة على المكتب.','المقص داخل المقلمة.','المقلمة داخل حقيبة الظهر.'];
    examples.forEach((el,i)=>{ const small=el.querySelector('small'); if(small) small.textContent=ar[i]||''; });
  };
  apply();
})();