// HM Academy — Unit 2 pronunciation path rebuilt as a standalone activity, modeled on Unit 1.
(function(){
'use strict';
const params=new URLSearchParams(location.search),id=params.get('id')||'';
if(id==='grade8-u2-l1'){
 const target='data/lessons/grade-8/unit-2/pronunciation_challenge_lecon1_unite2.html?v=20260816-u2pron1';
 window.HMSafePronunciationRender=function(){location.href=target;};
 if(window.__hmPronPending){window.__hmPronPending=null;window.HMSafePronunciationRender();}
 return;
}
})();
