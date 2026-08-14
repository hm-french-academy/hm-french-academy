// HM Academy Smart Review — selects vocabulary from learning evidence.
(function(){
 const KEY='hm_smart_review';
 function read(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return {}}}
 function write(x){localStorage.setItem(KEY,JSON.stringify(x))}
 function mark(word,correct){const d=read(),k=String(word);const s=d[k]||{seen:0,correct:0,wrong:0,next:0};s.seen++;correct?s.correct++:s.wrong++;s.next=Date.now()+(correct?3:0)*86400000;d[k]=s;write(d)}
 function select(words,limit){const d=read(),now=Date.now();return (words||[]).map((w,i)=>{const key=typeof w==='string'?w:w.word,s=d[key]||{seen:0,correct:0,wrong:0,next:0};return{w,index:i,score:s.wrong*5+(s.seen?1:3)+(s.next<=now?4:0)}}).sort((a,b)=>b.score-a.score).slice(0,limit||8).map(x=>x.w)}
 window.HMSmartReview={mark,select,stats:read};
})();