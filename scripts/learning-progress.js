// HM Academy persistent learning progress
(function(){
  'use strict';
  const DEFAULT={version:2,xp:0,completedLessons:[],completedActivities:[],achievements:[],currentLessonId:null,currentSection:'lesson',lastActivityAt:null};
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
  function write(data){
    const next=normalize(data);
    next.lastActivityAt=new Date().toISOString();
    localStorage.setItem('hm_academy_progress',JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('hm:progress-updated',{detail:next}));
    return next;
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
})();