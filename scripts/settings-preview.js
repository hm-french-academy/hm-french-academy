// HM Academy settings interaction handlers
(function(){
  document.querySelectorAll('[data-setting-action]').forEach(btn=>{
    btn.addEventListener('click', function(){
      const action = this.dataset.settingAction;
      const message = document.getElementById('settings-message');

      if(message){
        message.style.display='block';
        const labels = {
          general:'تم فتح إعدادات الهوية العامة',
          courses:'تم فتح إعدادات المناهج التعليمية',
          content:'تم فتح إعدادات المحتوى والوسائط'
        };
        message.textContent = labels[action] || 'الإعداد متاح قريباً';
      }
    });
  });

  document.querySelectorAll('a[href="#"]').forEach(link=>{
    link.addEventListener('click', function(e){
      e.preventDefault();
      this.textContent='قريباً';
      this.classList.add('disabled');
    });
  });
})();
