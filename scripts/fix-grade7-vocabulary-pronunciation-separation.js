const fs = require('fs');
const path = 'grade7-lesson-studio.html';
let html = fs.readFileSync(path, 'utf8');

const oldPron = "function pronunciationItems(){let p=data?.journeyContent?.pronunciation?.items;if(Array.isArray(p)&&p.length)return p;return vocabularyItems().map(x=>Array.isArray(x)?x[0]:x).filter(Boolean)}";
const newPron = "function pronunciationItems(){if(id==='grade7-u1-l1'){return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')}let p=data?.journeyContent?.pronunciation?.items;if(Array.isArray(p)&&p.length)return p;return vocabularyItems().map(x=>Array.isArray(x)?x[0]:x).filter(Boolean)}function pronunciationCards(a){a=Array.isArray(a)?a:[];return a.length?`<div class=\"grid\">${a.map(letter=>`<article class=\"card source\" style=\"text-align:center\"><div class=\"fr\" style=\"font-size:42px\">${esc(letter)}</div><div class=\"ar\">حرف من الأبجدية الفرنسية</div><div class=\"vocab-actions\"><button class=\"btn\" type=\"button\" onclick='speak(${JSON.stringify(String(letter))})'>🔊 استمع إلى نطق الحرف</button></div></article>`).join('')}</div>`:'<div class=\"notice\">لا توجد عناصر نطق معروضة في هذا القسم حاليًا.</div>'}";

const oldRender = "if(currentSection==='pronunciation')return `<div class=\"card source\"><h2>🎧 النطق</h2><p class=\"muted\">استمع إلى الكلمات والعبارات ثم كررها.</p>${cards(pronunciationItems())}</div>`;";
const newRender = "if(currentSection==='pronunciation')return `<div class=\"card source\"><h2>🎧 النطق</h2><p class=\"muted\">تدرّب على نطق الحروف الفرنسية. هذا القسم مستقل عن بطاقات المفردات.</p>${id==='grade7-u1-l1'?`<div class=\"ok\"><b>الأبجدية الفرنسية</b><br>استمع إلى كل حرف ثم كرره بصوتك.</div>`:''}${pronunciationCards(pronunciationItems())}</div>`;";

if (!html.includes(oldPron)) throw new Error('Expected pronunciationItems function was not found.');
if (!html.includes(oldRender)) throw new Error('Expected pronunciation render block was not found.');
if (html.includes('function pronunciationCards(a)')) throw new Error('Patch already applied.');

html = html.replace(oldPron, newPron).replace(oldRender, newRender);
fs.writeFileSync(path, html);
console.log('Grade 1 vocabulary/pronunciation separation applied.');
