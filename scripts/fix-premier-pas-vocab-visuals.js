const fs=require('fs');
const path='preparatory-french-starter-v2.html';
let html=fs.readFileSync(path,'utf8');
const css=`.vocab-visual{height:92px;border-radius:14px;margin-bottom:9px;display:grid;place-items:center;background:linear-gradient(135deg,#eef5ff,#f8fbff);border:1px solid #dce5f2;cursor:pointer;transition:.2s;user-select:none}.vocab-visual:hover{transform:translateY(-2px);box-shadow:0 8px 18px #14264a18}.vocab-visual .scene{font-size:46px;line-height:1}.word.has-visual{padding:10px}.word.has-visual strong{margin-top:2px}.visual-button{border:0;background:transparent;padding:0;width:100%;font:inherit;cursor:pointer}`;
if(!html.includes('.vocab-visual{')) html=html.replace('</style>',css+'</style>');
const visuals={
'Bonjour':'👋','Salut':'👋','Merci':'🙏','Bonsoir':'🌙','français':'🇫🇷','famille':'👨‍👩‍👧‍👦','école':'🏫','ami':'🧑‍🤝‍🧑','gâteau':'🍰','piscine':'🏊','croissant':'🥐','café':'☕',
'algèbre':'➗','zéro':'0️⃣','alcool':'🥂','café':'☕','Bonjour !':'👋','Comment ça va ?':'💬','Ça va bien.':'😊','Je m’appelle…':'🙋','J’ai 11 ans.':'🎂','J’aime le français.':'❤️🇫🇷','Au revoir !':'👋'
};
const mapLiteral=JSON.stringify(visuals);
const start=html.indexOf('function wordsHtml(ws){');
const end=html.indexOf('function render(){',start);
if(start<0||end<0) throw new Error('wordsHtml/render anchors not found');
const replacement=`function visualFor(term){const m=${mapLiteral};return m[term]||'✨'}function wordsHtml(ws){return '<div class="filters"><button class="filter active" id="allWords">كل الكلمات</button><button class="filter" id="knownWords">أعرفها ('+state.known.length+')</button><button class="filter" id="reviewWords">أحتاج مراجعة ('+state.review.length+')</button><button class="filter" id="flashBtn">🃏 بطاقات المراجعة</button></div><div class="words" id="wordGrid">'+ws.map((x,n)=>'<div class="word has-visual"><button class="visual-button speak" data-speak="'+x[0].replaceAll('"','&quot;')+'" aria-label="استمع إلى '+x[0].replaceAll('"','&quot;')+'"><div class="vocab-visual"><div class="scene">'+visualFor(x[0])+'</div></div></button><strong>'+x[0]+'</strong><small>'+x[1]+'</small><button class="speak" data-speak="'+x[0].replaceAll('"','&quot;')+'">🔊 استمع</button><div class="actions" style="justify-content:center"><button class="filter know" data-word="'+x[0]+'">✓ أعرفها</button><button class="filter need" data-word="'+x[0]+'">↻ مراجعة</button></div></div>').join('')+'</div>'}`;
html=html.slice(0,start)+replacement+html.slice(end);
fs.writeFileSync(path,html,'utf8');
console.log('Premier Pas vocabulary visuals injected into '+path);
