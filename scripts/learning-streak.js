// HM Academy learning streak tracker
(function(){
  window.HMStreak={
    key:'hm_academy_streak',
    get:function(){
      try{return JSON.parse(localStorage.getItem(this.key))||{days:0,last:null}}catch(e){return {days:0,last:null}}
    },
    checkIn:function(){
      const data=this.get();
      const today=new Date().toISOString().slice(0,10);
      if(data.last!==today){
        data.days=(data.last&&this.diff(data.last,today)===1)?data.days+1:1;
        data.last=today;
        localStorage.setItem(this.key,JSON.stringify(data));
      }
      return data;
    },
    diff:function(a,b){return Math.round((new Date(b)-new Date(a))/86400000)}
  };
})();
