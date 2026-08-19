(()=>{'use strict';
const isG5=()=>/(^|\/)grade-5-lesson\.html$/.test(location.pathname);
function run(){if(!isG5())return;const id=new URLSearchParams(location.search).get('id');if(!id)return;
 const btn=document.getElementById('completeBtn'),msg=document.getElementById('completionMessage');
 if(!btn||btn.dataset.hmGuarded)return;btn.dataset.hmGuarded='1';
 // Completion is synchronized with the shared progress module by audio-player.
 // This guard only restores the visible state after the runtime renders.
 const refresh=()=>{const p=window.HMProgress;if(!p)return;const done=p.get().completedLessons||[];if(done.includes(id)){btn.textContent='✓ الدرس مكتمل';btn.disabled=true;if(msg)msg.textContent='تم إكمال الدرس وحفظ تقدمك في المسار.'}};
 refresh();new MutationObserver(refresh).observe(btn,{childList:true,characterData:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();window.addEventListener('load',run);
})();