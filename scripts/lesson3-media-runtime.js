/* HM Academy — Unit 3 Lesson 3 media section */
(function(){'use strict';
const ID='grade8-u3-l3';
function isTarget(){return new URLSearchParams(location.search).get('id')===ID}
function renderVideo(){if(!isTarget())return;const tabs=document.getElementById('tabs');const viewer=document.getElementById('viewer');if(!tabs||!viewer)return;let b=tabs.querySelector('[data-t="video"]');if(!b){b=document.createElement('button');b.className='tab';b.dataset.t='video';b.textContent='🎬 الفيديو';tabs.appendChild(b);b.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');viewer.innerHTML='<div style="padding:18px"><h2 style="margin-top:0">🎬 فيديو الدرس</h2><p style="color:#5f6d83">شرح أدوات الإشارة: ce, cet, cette, ces</p><div style="position:relative;width:100%;padding-top:56.25%;border-radius:20px;overflow:hidden;background:#101827"><iframe src="https://www.youtube.com/embed/BISbaFN1TIQ?rel=0&modestbranding=1" title="Ce, cet, cette, ces | French Demonstrative Adjectives" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;web-share" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe></div><p style="margin-bottom:0;color:#68758b;font-size:13px">فيديو خارجي تعليمي متوافق مع موضوع الدرس.</p></div>'}}
}
function hook(){renderVideo();const t=document.getElementById('tabs');if(t&&!t.dataset.hmVideoObserver){new MutationObserver(renderVideo).observe(t,{childList:true,subtree:true});t.dataset.hmVideoObserver='1'}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',hook,{once:true});else hook();
})();
