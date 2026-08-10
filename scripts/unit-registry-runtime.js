// HM Academy Unit Registry Runtime
(function(){
  function createUnit(id,title,lessons){
    return {
      id:id,
      title:title,
      lessons:lessons||[],
      tracking:true,
      beta:true
    };
  }
  function getProgress(unit){
    return (unit.lessons||[]).map(l=>({id:l.id,ready:true}));
  }
  window.HMUnitRegistry={createUnit,getProgress};
})();
