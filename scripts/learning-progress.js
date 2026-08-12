// HM Academy persistent learning progress
(function(){
  'use strict';
  const DEFAULT={version:3,xp:0,completedLessons:[],completedActivities:[],visitedLessons:[],lessonVisits:{},achievements:[],currentLessonId:null,currentSection:'lesson',lastActivityAt:null,lastVisitedAt:null};
  function normalize(raw){
    const d=raw&&typeof raw==='object'?raw:{};
    const visits=d.lessonVisits&&typeof d.lessonVisits==='object'?d.lessonVisits:{};
    return {
      ...DEFAULT,
      ...d,
      xp:Number(d.xp)||0,
      completedLessons:Array.isArray(d.completedLessons)?[...new Set(d.completedLessons.filter(Boolean))]:[],
      completedActivities:Array.isArray(d.completedActivities)?[...new Set(d.completedActivities.filter(Boolean))]:[],
      visitedLessons:Array.isArray(d.visitedLessons)?[...new Set(d.visitedLessons.filter(Boolean))]:[],
      lessonVisits:visits,
      achievements:Array.isArray(d.achievements)?[...new Set(d.achievements.filter(Boolean))]:[],
      version:3
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
    startLesson(id){
      const d=read();
      const lessonId=id||d.currentLessonId;
      if(lessonId){
        if(!d.visitedLessons.includes(lessonId))d.visitedLessons.push(lessonId);
        d.lessonVisits[lessonId]=Number(d.lessonVisits[lessonId]||0)+1;
        d.lastVisitedAt=new Date().toISOString();
      }
      d.currentLessonId=lessonId||d.currentLessonId;
      d.currentSection='lesson';
      return write(d);
    },
    setSection(section){const d=read();d.currentSection=section||'lesson';return write(d);},
    completeActivity(id,xp=20){const d=read();if(id&&!d.completedActivities.includes(id)){d.completedActivities.push(id);d.xp+=Number(xp)||0;}return write(d);},
    completeLesson(id,xp=50){const d=read();if(id&&!d.completedLessons.includes(id)){d.completedLessons.push(id);d.xp+=Number(xp)||0;}d.currentLessonId=id||d.currentLessonId;d.currentSection='lesson';if(id&&!d.visitedLessons.includes(id))d.visitedLessons.push(id);return write(d);},
    addAchievement(id){const d=read();if(id&&!d.achievements.includes(id))d.achievements.push(id);return write(d);},
    summary(){const d=read();return {xp:d.xp,lessons:d.completedLessons.length,visitedLessons:d.visitedLessons.length,activities:d.completedActivities.length,achievements:d.achievements.length,currentLessonId:d.currentLessonId,currentSection:d.currentSection};}
  };
})();