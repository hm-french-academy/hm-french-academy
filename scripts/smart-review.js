// HM Academy Smart Review — lesson-aware vocabulary review.
(function(){
 const KEY='hm_smart_review';
 function read(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return {}}}
 function write(x){localStorage.setItem(KEY,JSON.stringify(x))}
 function mark(word,correct,lessonId){const d=read(),k=String(lessonId||'global')+'::'+String(word);const s=d[k]||{word:String(word),lessonId:lessonId||'global',seen:0,correct:0,wrong:0,next:0};s.seen++;correct?s.correct++:s.wrong++;s.next=Date.now()+(correct?3:0)*86400000;d[k]=s;write(d);return s}
 function select(words,limit,lessonId){const d=read(),now=Date.now();return (words||[]).map((w,i)=>{const key=typeof w==='string'?w:w.word,s=d[(lessonId||'global')+'::'+key]||{seen:0,correct:0,wrong:0,next:0};return{w,index:i,score:s.wrong*6+(s.seen?1:3)+(s.next<=now?4:0)}}).sort((a,b)=>b.score-a.score).slice(0,limit||8).map(x=>x.w)}
 window.HMSmartReview={mark,select,stats:read};
})();