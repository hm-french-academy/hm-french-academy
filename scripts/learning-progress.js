// HM Academy persistent learning progress
(function(){
  'use strict';
  const DEFAULT={version:4,xp:0,completedLessons:[],completedActivities:[],visitedLessons:[],lessonVisits:{},achievements:[],currentLessonId:null,currentSection:'lesson',lastActivityAt:null,lastVisitedAt:null};
  function normalize(raw){const d=raw&&typeof raw==='object'?raw:{};const visits=d.lessonVisits&&typeof d.lessonVisits==='object'?d.lessonVisits:{};return {...DEFAULT,...d,xp:Number(d.xp)||0,completedLessons:Array.isArray(d.completedLessons)?[...new Set(d.completedLessons.filter(Boolean))]:[],completedActivities:Array.isArray(d.completedActivities)?[...new Set(d.completedActivities.filter(Boolean))]:[],visitedLessons:Array.isArray(d.visitedLessons)?[...new Set(d.visitedLessons.filter(Boolean))]:[],lessonVisits:visits,achievements:Array.isArray(d.achievements)?[...new Set(d.achievements.filter(Boolean))]:[],version:4}}
  function read(){try{return normalize(JSON.parse(localStorage.getItem('hm_academy_progress')||'null'))}catch{return {...DEFAULT}}}
  function write(data){const next=normalize(data);next.lastActivityAt=new Date().toISOString();localStorage.setItem('hm_academy_progress',JSON.stringify(next));window.dispatchEvent(new CustomEvent('hm:progress-updated',{detail:next}));return next}
  function track(type,data){try{window.HMAnalytics?.emit?.(type,data)}catch{}}
  window.HMProgress={
    storageKey:'hm_academy_progress',get:read,save:write,
    addXP(amount=0){const d=read();const n=Number(amount)||0;d.xp+=n;if(n)track('xp_earned',{amount:n});return write(d)},
    startLesson(id){const d=read(),lessonId=id||d.currentLessonId;if(lessonId){const first=!d.visitedLessons.includes(lessonId);if(first)d.visitedLessons.push(lessonId);d.lessonVisits[lessonId]=Number(d.lessonVisits[lessonId]||0)+1;d.lastVisitedAt=new Date().toISOString();track('lesson_start',{lessonId,firstVisit:first,visitNumber:d.lessonVisits[lessonId]})}d.currentLessonId=lessonId||d.currentLessonId;d.currentSection='lesson';return write(d)},
    setSection(section){const d=read();d.currentSection=section||'lesson';track('lesson_section',{lessonId:d.currentLessonId,section:d.currentSection});return write(d)},
    completeActivity(id,xp=20){const d=read();if(id&&!d.completedActivities.includes(id)){d.completedActivities.push(id);const n=Number(xp)||0;d.xp+=n;track('activity_complete',{lessonId:d.currentLessonId,activityId:id,xp:n})}return write(d)},
    completeLesson(id,xp=50){const d=read(),first=id&&!d.completedLessons.includes(id);if(first){d.completedLessons.push(id);const n=Number(xp)||0;d.xp+=n;track('lesson_complete',{lessonId:id,xp:n})}d.currentLessonId=id||d.currentLessonId;d.currentSection='lesson';if(id&&!d.visitedLessons.includes(id))d.visitedLessons.push(id);return write(d)},
    addAchievement(id){const d=read();if(id&&!d.achievements.includes(id)){d.achievements.push(id);track('achievement_unlocked',{achievementId:id})}return write(d)},
    summary(){const d=read();return {xp:d.xp,lessons:d.completedLessons.length,visitedLessons:d.visitedLessons.length,activities:d.completedActivities.length,achievements:d.achievements.length,currentLessonId:d.currentLessonId,currentSection:d.currentSection}}
  };
})();
