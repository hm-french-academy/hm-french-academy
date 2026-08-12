(function(){
  'use strict';
  const CONFIG_PATH='data/production-config.js';
  let client=null, loading=null, visitorSessionId=null;
  const loadScript=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)});
  async function init(){
    if(loading)return loading;
    loading=(async()=>{
      if(!window.HMProductionConfig){try{await loadScript(CONFIG_PATH)}catch{return null}}
      const c=window.HMProductionConfig||{};
      if(!c.enabled||!c.supabaseUrl||!c.supabaseAnonKey)return null;
      if(!window.supabase) await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');
      if(!window.supabase) return null;
      client=window.supabase.createClient(c.supabaseUrl,c.supabaseAnonKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
      return client;
    })().catch(()=>null);
    return loading;
  }
  async function db(){return client||await init()}
  async function user(){const c=await db();if(!c)return null;const r=await c.auth.getUser();return r.data?.user||null}
  async function signUp({email,password,fullName,levelCode}){const c=await db();if(!c)throw new Error('production_not_configured');return c.auth.signUp({email,password,options:{data:{full_name:fullName,level_code:levelCode}}})}
  async function signIn(email,password){const c=await db();if(!c)throw new Error('production_not_configured');return c.auth.signInWithPassword({email,password})}
  async function signOut(){const c=await db();if(c)return c.auth.signOut()}
  async function saveProgress(payload){const c=await db();if(!c)return null;const r=await c.rpc('save_lesson_progress',payload);if(r.error)throw r.error;return r.data}
  async function recordActivity(payload){const c=await db();const u=await user();if(!c||!u)return null;const r=await c.from('activity_attempts').insert({...payload,user_id:u.id});if(r.error)throw r.error;return r.data}
  async function recordAssessment(payload){const c=await db();const u=await user();if(!c||!u)return null;const r=await c.from('assessment_attempts').insert({...payload,user_id:u.id});if(r.error)throw r.error;return r.data}
  async function ensureVisitorSession(){
    const c=await db();if(!c||visitorSessionId)return visitorSessionId;
    const key='hm_prod_visitor_session';const cached=sessionStorage.getItem(key);if(cached){visitorSessionId=cached;return cached}
    let anon=localStorage.getItem('hm_anon_id');if(!anon){anon='a_'+(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+'_'+Math.random().toString(36).slice(2));localStorage.setItem('hm_anon_id',anon)}
    const nav=navigator;const ref=document.referrer?new URL(document.referrer).hostname:null;
    const r=await c.from('visitor_sessions').insert({anonymous_id:anon,device_type:/Mobi|Android/i.test(nav.userAgent)?'mobile':'desktop',browser_family:nav.userAgentData?.brands?.[0]?.brand||'unknown',os_family:nav.platform||'unknown',language:navigator.language,referrer_domain:ref,landing_path:location.pathname}).select('id').single();
    if(!r.error&&r.data){visitorSessionId=r.data.id;sessionStorage.setItem(key,visitorSessionId)}
    return visitorSessionId;
  }
  async function track(event){
    const c=await db();if(!c)return;
    try{const u=await user();const sid=await ensureVisitorSession();await c.from('analytics_events').insert({session_id:sid||null,user_id:u?.id||null,event_type:event.type,path:event.path||location.pathname,page_title:event.page||document.title,lesson_id:event.data?.lessonId||null,course_id:event.data?.courseId||null,activity_id:event.data?.activityId||null,duration_seconds:event.data?.durationSeconds||null,event_data:event.data||{}})}catch(e){console.debug('HM production analytics skipped',e)}
  }
  async function adminOverview(days=30){const c=await db();if(!c)throw new Error('production_not_configured');const r=await c.rpc('admin_overview',{p_days:days});if(r.error)throw r.error;return r.data}
  async function adminStudents(){const c=await db();if(!c)throw new Error('production_not_configured');const r=await c.from('admin_student_summary').select('*').order('last_active_at',{ascending:false});if(r.error)throw r.error;return r.data||[]}
  window.HMProduction={init,db,user,signUp,signIn,signOut,saveProgress,recordActivity,recordAssessment,track,adminOverview,adminStudents,isConfigured:()=>!!(window.HMProductionConfig?.enabled&&window.HMProductionConfig?.supabaseUrl&&window.HMProductionConfig?.supabaseAnonKey)};
  init();
})();