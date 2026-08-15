(function(){
  'use strict';
  const KEY='hm-font-size';
  const allowed={small:'0.9',medium:'1',large:'1.15',xlarge:'1.3'};
  function apply(value){
    const v=allowed[value]?value:'medium';
    document.documentElement.dataset.hmFontSize=v;
    document.documentElement.style.setProperty('--hm-font-scale',allowed[v]);
    try{localStorage.setItem(KEY,v)}catch(e){}
    document.dispatchEvent(new CustomEvent('hm:fontsizechange',{detail:{size:v}}));
    return v;
  }
  function current(){
    try{return localStorage.getItem(KEY)||'medium'}catch(e){return 'medium'}
  }
  window.HMFontSize={apply,current,allowed};
  apply(current());
})();
