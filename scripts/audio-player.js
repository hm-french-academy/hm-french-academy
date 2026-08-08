// HM Academy lesson audio controller
(function(){
  function playAudio(src, button){
    if(!src){
      button.textContent='🔊 الصوت غير متوفر حالياً';
      return;
    }
    const audio = new Audio(src);
    audio.play().catch(()=>{
      button.textContent='🔊 تعذر تشغيل الصوت';
    });
  }

  document.addEventListener('click', function(event){
    const button = event.target.closest('[data-audio]');
    if(!button) return;
    playAudio(button.dataset.audio, button);
  });
})();
