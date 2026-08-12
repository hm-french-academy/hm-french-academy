(function(){
  'use strict';
  const KEY='hm_academy_analytics_v1', SESSION='hm_academy_session_v1', ENDPOINT_KEY='hm_analytics_endpoint', MAX=1000;
  const now=()=>new Date().toISOString();
  function read(){try{const x=JSON.parse(localStorage.getItem(KEY)||'null');return x&&typeof x==='object'?x:{version:1,events:[]}}catch{return {version:1,events:[]}}}
  function write(d){localStorage.setItem(KEY,JSON.stringify(d));return d}
  function sessionId(){let s=sessionStorage.getItem(SESSION);if(!s){s='s_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,8);sessionStorage.setItem(SESSION,s)}return s}
  function emit(type,data={}){
    const event={id:'e_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,7),type,at:now(),path:location.pathname,page:document.title||'',session:sessionId(),data:{...data}};
    const d=read();d.version=1;d.events=Array.isArray(d.events)?d.events:[];d.events.push(event);if(d.events.length>MAX)d.events=d.events.slice(-MAX);write(d);
    const endpoint=localStorage.getItem(ENDPOINT_KEY)||'';
    if(endpoint){try{fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(event),keepalive:true}).catch(()=>{})}catch{}}
    try{if(window.HMProduction?.isConfigured()) window.HMProduction.track(event)}catch{}
    window.dispatchEvent(new CustomEvent('hm:analytics',{detail:event}));return event;
  }
  function aggregate(days=30){
    const cutoff=Date.now()-days*86400000,events=read().events.filter(e=>new Date(e.at).getTime()>=cutoff),unique=t=>new Set(events.filter(e=>e.type===t).map(e=>e.session)).size;
    const countBy=(type,key)=>{const x={};events.filter(e=>e.type===type).forEach(e=>{const k=e.data?.[key]||'unknown';x[k]=(x[k]||0)+1});return Object.entries(x).sort((a,b)=>b[1]-a[1]).slice(0,8)};
    return {days,events:events.length,pageViews:events.filter(e=>e.type==='page_view').length,sessions:unique('page_view'),registeredStudents:events.filter(e=>e.type==='student_registered').length,lessonStarts:events.filter(e=>e.type==='lesson_start').length,lessonCompletions:events.filter(e=>e.type==='lesson_complete').length,activitiesCompleted:events.filter(e=>e.type==='activity_complete').length,topPages:countBy('page_view','path'),topGames:countBy('activity_complete','activityId'),topLessons:countBy('lesson_start','lessonId')};
  }
  function clear(){localStorage.removeItem(KEY);window.dispatchEvent(new CustomEvent('hm:analytics-cleared'))}
  window.HMAnalytics={key:KEY,emit,read,aggregate,clear,setEndpoint(v){if(v)localStorage.setItem(ENDPOINT_KEY,v);else localStorage.removeItem(ENDPOINT_KEY)},getEndpoint:()=>localStorage.getItem(ENDPOINT_KEY)||''};
  if(!sessionStorage.getItem('hm_page_viewed')){sessionStorage.setItem('hm_page_viewed','1');emit('page_view')}
  try{if(localStorage.getItem('hm_student_profile')&&!localStorage.getItem('hm_registered_analytics')){localStorage.setItem('hm_registered_analytics','1');emit('student_registered')}}catch{}
})();