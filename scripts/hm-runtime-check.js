// HM Academy runtime dependency checker
(function(){
  window.HMRuntimeCheck={
    required:['HMProgress','HMLevelSystem','HMStreak','HMRewards'],
    check:function(){
      return this.required.map(k=>({name:k,ready:!!window[k]}));
    }
  };
  window.addEventListener('DOMContentLoaded',function(){
    const missing=HMRuntimeCheck.check().filter(x=>!x.ready);
    if(missing.length) console.warn('HM Academy missing runtime modules:',missing.map(x=>x.name));
  });
})();
