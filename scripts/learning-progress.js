// HM Academy persistent learning progress
(function(){
  'use strict';
  const DEFAULT={version:2,xp:0,completedLessons:[],completedActivities:[],achievements:[],currentLessonId:null,currentSection:'lesson',lastActivityAt:null};
  let syncReady=false;
  let syncTimer=null;
  let applyingRemote=false;

  function normalize(raw){
    const d=raw&&typeof raw==='object'?raw:{};
    return {
      ...DEFAULT,
      ...d,
      xp:Number(d.xp)||0,
      completedLessons:Array.isArray(d.completedLessons)?[...new Set(d.completedLessons.filter(Boolean))]:[],
      completedActivities:Array.isArray(d.completedActivities)?[...new Set(d.completedActivities.filter(Boolean))]:[],
      achievements:Array.isArray(d.achievements)?[...new Set(d.achievements.filter(Boolean))]:[],
      version:2
    };
  }

  function read(){
    try{return normalize(JSON.parse(localStorage.getItem('hm_academy_progress')||'null'));}
    catch(e){return {...DEFAULT};}
  }

  function writeLocal(data, touch=true){
    const next=normalize(data);
    if(touch) next.lastActivityAt=new Date().toISOString();
    localStorage.setItem('hm_academy_progress',JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('hm:progress-updated',{detail:next}));
    if(touch && syncReady && !applyingRemote) queueSync(next);
    return next;
  }

  function write(data){ return writeLocal(data,true); }

  async function getSession(){
    try{
      if(!window.HMSupabase) return null;
      const {data,error}=await window.HMSupabase.auth.getSession();
      if(error) throw error;
      return data&&data.session?data.session:null;
    }catch(e){
      console.warn('HM Academy: Supabase session unavailable.',e);
      return null;
    }
  }

  async function pushProgress(progress){
    try{
      const session=await getSession();
      if(!session||!session.user||!window.HMSupabase) return;
      await window.HMSupabase.from('student_progress').upsert({
        user_id:session.user.id,
        progress:normalize(progress),
        updated_at:new Date().toISOString()
      },{onConflict:'user_id'});
    }catch(e){
      console.warn('HM Academy: progress sync failed.',e);
    }
  }

  function queueSync(progress){
    clearTimeout(syncTimer);
    syncTimer=setTimeout(function(){pushProgress(progress);},350);
  }

  async function hydrateFromSupabase(){
    const session=await getSession();
    if(!session||!session.user||!window.HMSupabase) return;
    try{
      const {data,error}=await window.HMSupabase
        .from('student_progress')
        .select('progress,updated_at')
        .eq('user_id',session.user.id)
        .maybeSingle();
      if(error) throw error;

      const local=read();
      if(!data||!data.progress){
        syncReady=true;
        if(local.lastActivityAt) await pushProgress(local);
        return;
      }

      const remote=normalize(data.progress);
      const localTime=local.lastActivityAt?Date.parse(local.lastActivityAt):0;
      const remoteTime=remote.lastActivityAt?Date.parse(remote.lastActivityAt):Date.parse(data.updated_at||'')||0;

      applyingRemote=true;
      if(localTime>remoteTime){
        localStorage.setItem('hm_academy_progress',JSON.stringify(local));
        window.dispatchEvent(new CustomEvent('hm:progress-updated',{detail:local}));
      }else{
        localStorage.setItem('hm_academy_progress',JSON.stringify(remote));
        window.dispatchEvent(new CustomEvent('hm:progress-updated',{detail:remote}));
      }
      applyingRemote=false;
      syncReady=true;
      if(localTime>remoteTime) await pushProgress(local);
    }catch(e){
      applyingRemote=false;
      syncReady=true;
      console.warn('HM Academy: could not restore cloud progress.',e);
    }
  }

  async function initCloudSync(){
    if(!window.HMSupabase) return;
    try{
      const {data}=await window.HMSupabase.auth.getSession();
      if(data&&data.session) await hydrateFromSupabase();
      window.HMSupabase.auth.onAuthStateChange(function(event,session){
        if(session&&session.user){
          syncReady=false;
          hydrateFromSupabase();
        }else{
          syncReady=false;
          clearTimeout(syncTimer);
        }
      });
    }catch(e){console.warn('HM Academy: cloud progress init failed.',e);}
  }

  window.HMProgress={
    storageKey:'hm_academy_progress',
    get:read,
    save:write,
    addXP(amount=0){const d=read();d.xp+=Number(amount)||0;return write(d);},
    startLesson(id){const d=read();d.currentLessonId=id||d.currentLessonId;d.currentSection='lesson';return write(d);},
    setSection(section){const d=read();d.currentSection=section||'lesson';return write(d);},
    completeActivity(id,xp=20){const d=read();if(id&&!d.completedActivities.includes(id)){d.completedActivities.push(id);d.xp+=Number(xp)||0;}return write(d);},
    completeLesson(id,xp=50){const d=read();if(id&&!d.completedLessons.includes(id)){d.completedLessons.push(id);d.xp+=Number(xp)||0;}d.currentLessonId=id||d.currentLessonId;d.currentSection='lesson';return write(d);},
    addAchievement(id){const d=read();if(id&&!d.achievements.includes(id))d.achievements.push(id);return write(d);},
    summary(){const d=read();return {xp:d.xp,lessons:d.completedLessons.length,activities:d.completedActivities.length,achievements:d.achievements.length,currentLessonId:d.currentLessonId,currentSection:d.currentSection};}
  };

  window.addEventListener('hm:supabase-ready',initCloudSync);
  if(window.HMSupabase) initCloudSync();
})();
