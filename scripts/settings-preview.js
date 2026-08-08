// HM Academy settings preview handlers
(function(){
  document.querySelectorAll('.course .btn').forEach(btn=>{
    if(btn.getAttribute('href') === '#'){
      btn.addEventListener('click', function(e){
        e.preventDefault();
        this.textContent='قريباً';
        this.classList.add('disabled');
      });
    }
  });
})();
