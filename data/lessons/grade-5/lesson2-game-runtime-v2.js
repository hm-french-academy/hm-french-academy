/* Lesson 2 Game Center — deterministic state, answer locking, per-game reset. */
(function(){'use strict';
 const state={game:null,index:0,score:0,answered:false};
 window.HMGrade5L02Game={state,reset(){state.game=null;state.index=0;state.score=0;state.answered=false;}};
})();
