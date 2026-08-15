// HM Academy — reliable browser French speech runtime
(function(){
  'use strict';
  const DEFAULT_LANG='fr-FR';
  const DEFAULT_RATE=0.84;
  let current=null;

  function voices(){
    try{return window.speechSynthesis?.getVoices?.()||[];}catch(_){return [];}
  }
  function pickVoice(lang){
    const wanted=String(lang||DEFAULT_LANG).toLowerCase();
    const list=voices();
    return list.find(v=>String(v.lang).toLowerCase()===wanted)
      ||list.find(v=>String(v.lang).toLowerCase().startsWith('fr'))
      ||null;
  }
  function state(button,on){
    if(!button)return;
    if(!button.dataset.hmLabel)button.dataset.hmLabel=button.textContent||'🔊';
    button.classList.toggle('playing',!!on);
    button.setAttribute('aria-busy',on?'true':'false');
    button.textContent=on?'⏸️':button.dataset.hmLabel;
  }
  function speak(text,options={}){
    const value=String(text??'').trim();
    if(!value||!('speechSynthesis' in window)||typeof SpeechSynthesisUtterance==='undefined')return Promise.resolve(false);
    const synth=window.speechSynthesis;
    const button=options.button||null;
    const lang=options.lang||DEFAULT_LANG;
    const rate=Math.max(.55,Math.min(1.15,Number(options.rate)||DEFAULT_RATE));
    try{
      if(current){try{current.cancel();}catch(_){} current=null;}
      synth.cancel();
      const u=new SpeechSynthesisUtterance(value);
      u.lang=lang;
      u.rate=rate;
      u.pitch=Number(options.pitch)||1;
      const voice=pickVoice(lang);
      if(voice)u.voice=voice;
      state(button,true);
      return new Promise(resolve=>{
        let settled=false;
        const finish=ok=>{if(settled)return;settled=true;state(button,false);if(current===u)current=null;resolve(ok);};
        u.onend=()=>finish(true);
        u.onerror=()=>finish(false);
        current=u;
        try{synth.resume();}catch(_){}
        synth.speak(u);
        window.setTimeout(()=>{try{if(synth.paused)synth.resume();}catch(_){}},120);
        window.setTimeout(()=>finish(true),Math.max(3000,Math.min(15000,value.length*140+1800)));
      });
    }catch(_){state(button,false);return Promise.resolve(false);}
  }
  function stop(){try{window.speechSynthesis?.cancel?.();}catch(_){} current=null;}

  function applyLessonVisualTheme(){
    const hero=document.querySelector('.hero');
    const art=document.querySelector('.hero-art');
    if(!hero||!art)return;
    const p=new URLSearchParams(location.search);
    const id=p.get('id')||'grade8-u1-l1';
    const themes={
      'grade8-u1-l1':{icon:'🏫',label:'في المدرسة',a:'#173a82',b:'#2563eb',c:'#16a394'},
      'grade8-u1-l2':{icon:'✏️',label:'الأدوات المدرسية',a:'#243b8f',b:'#4169e1',c:'#2aa6a1'},
      'grade8-u1-l3':{icon:'📚',label:'المواد الدراسية',a:'#0f4c81',b:'#1976a8',c:'#22a69a'},
      'grade8-u1-l4':{icon:'💬',label:'التواصل في المدرسة',a:'#45277a',b:'#6c43c5',c:'#238b8b'},
      'grade8-u2-l1':{icon:'🛏️',label:'غرف المنزل',a:'#075e54',b:'#129b8b',c:'#4caf8f'},
      'grade8-u2-l2':{icon:'🛋️',label:'غرف المنزل',a:'#17633b',b:'#2e9b62',c:'#43b883'},
      'grade8-u2-l3':{icon:'🔤',label:'Avoir / Être',a:'#7a4b13',b:'#b87920',c:'#d7a64a'},
      'grade8-u2-l4':{icon:'📍',label:'المكان والملكية',a:'#7a3b12',b:'#c15d24',c:'#d79b3b'},
      'grade8-u3-l1':{icon:'🚆',label:'السفر ووسائل النقل',a:'#39216b',b:'#6d45b8',c:'#2f8f9d'},
      'grade8-u3-l2':{icon:'🧳',label:'أدوات السفر',a:'#51266f',b:'#8847b6',c:'#d05aa0'},
      'grade8-u3-l3':{icon:'🔤',label:'التصريف وأسماء الإشارة',a:'#1f3f73',b:'#3268c8',c:'#4b9bd1'},
      'grade8-u3-l4':{icon:'❓',label:'الاستفهام وحروف الجر',a:'#6b1f52',b:'#b52f82',c:'#d85c8d'}
    };
    const t=themes[id]||themes['grade8-u1-l1'];
    hero.dataset.lessonTheme=id;
    hero.style.background=`linear-gradient(135deg,${t.a},${t.b},${t.c})`;
    hero.style.boxShadow=`0 20px 50px ${t.b}33`;
    art.textContent=t.icon;
    art.setAttribute('aria-label',t.label);
    art.title=t.label;
  }

  window.HMSpeech={speak,stop,pickVoice,refreshVoices:voices};
  try{window.speechSynthesis?.getVoices?.();}catch(_){}
  if('speechSynthesis' in window && 'onvoiceschanged' in window.speechSynthesis){
    window.speechSynthesis.addEventListener('voiceschanged',()=>{try{voices();}catch(_){}},{passive:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applyLessonVisualTheme,{once:true});
  else applyLessonVisualTheme();
})();
