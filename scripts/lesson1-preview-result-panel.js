// HM Academy Leçon 1 Preview Result Panel
(function(){
  function getResult(){
    try{
      return JSON.parse(localStorage.getItem('hm_lesson1_last_result')||'null');
    }catch(e){return null;}
  }
  function render(target){
    const el=typeof target==='string'?document.querySelector(target):target;
    if(!el)return;
    const data=getResult();
    if(!data){
      el.innerHTML='<p>لم يتم إنهاء الاختبار أو التقييم بعد.</p>';
      return;
    }
    el.innerHTML=`<h3>نتيجة Leçon 1</h3>
    <p>المرحلة: ${data.type==='quiz'?'اختبار تفاعلي':'تقييم نهائي'}</p>
    <p>تم الحفظ: ${new Date(data.syncedAt).toLocaleString()}</p>
    <pre>${JSON.stringify(data.result||{},null,2)}</pre>`;
  }
  window.HMLecon1PreviewResultPanel={render,getResult};
})();
