const fs = require('fs');

const file = 'grade7-lesson-studio.html';
let html = fs.readFileSync(file, 'utf8');

const start = html.indexOf('const visualFor=term=>{');
const endMarker = '\nfunction vocabCard(x)';
const end = html.indexOf(endMarker, start);
if (start < 0 || end < 0) throw new Error('Could not locate visualFor block in grade7-lesson-studio.html');

const svg = (body, label) => `<svg viewBox="0 0 180 130" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="8" width="164" height="114" rx="22" fill="#fff"/><g stroke="#173a82" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none">${body}</g></svg>`;
const fill = (body, label) => `<svg viewBox="0 0 180 130" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="8" width="164" height="114" rx="22" fill="#fff"/><g stroke="#173a82" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>`;

const illustrations = {
  'A': svg('<path d="M55 98 90 28l35 70M69 72h42"/><path d="M90 28v-8"/>','A'),
  'E': svg('<path d="M65 102V28h55M65 65h42M65 102h55"/><ellipse cx="105" cy="43" rx="18" ry="12"/>','éléphant'),
  'I': svg('<rect x="48" y="25" width="84" height="78" rx="6"/><circle cx="76" cy="50" r="9"/><path d="m58 91 22-25 16 15 12-14 24 24"/>','image'),
  'O': svg('<circle cx="90" cy="65" r="38"/><path d="M90 27c12 5 20 15 23 28M55 84c10 12 25 18 40 18"/>','orange'),
  'U': svg('<path d="M55 30v45c0 24 70 24 70 0V30M70 34v38M110 34v38"/>','uniforme'),
  'Y': svg('<path d="M55 30 90 68l35-38M90 68v40"/>','yoyo'),
  'H': svg('<rect x="58" y="27" width="64" height="76" rx="5"/><path d="M90 27v76M58 65h64"/><path d="M73 103v12M107 103v12"/>','hôpital'),
  'Un pyjama': fill('<path d="M45 35 72 23l18 18 18-18 27 12-13 25-13-7v43H71V53l-13 7z" fill="#dcecff"/><path d="M71 53h38"/>','Un pyjama'),
  'Un pantalon': fill('<path d="M60 28h60l8 76-30-18-30 18z" fill="#dcecff"/><path d="M90 28v58"/>','Un pantalon'),
  'Un taxi': fill('<path d="m42 78 10-34h76l10 34v22H42z" fill="#ffd84d"/><path d="m57 44 8-18h50l8 18M61 54h24M95 54h24"/><circle cx="63" cy="101" r="9" fill="#fff"/><circle cx="117" cy="101" r="9" fill="#fff"/>','Un taxi'),
  'Un domino': fill('<rect x="62" y="22" width="56" height="86" rx="8" fill="#fff"/><path d="M62 65h56"/><circle cx="78" cy="45" r="5" fill="#173a82"/><circle cx="103" cy="45" r="5" fill="#173a82"/><circle cx="90" cy="86" r="5" fill="#173a82"/>','Un domino'),
  'Un canapé': fill('<path d="M48 60v-12c0-13 10-22 23-22h38c13 0 23 9 23 22v12c7 2 10 9 10 17v25H38V77c0-8 3-15 10-17z" fill="#dcecff"/><path d="M48 70h84M64 60h52"/>','Un canapé'),
  'Un téléphone': fill('<rect x="62" y="18" width="56" height="94" rx="11" fill="#dcecff"/><rect x="70" y="29" width="40" height="66" rx="4" fill="#fff"/><circle cx="90" cy="103" r="4" fill="#173a82"/>','Un téléphone'),
  'Un biscuit': fill('<path d="M50 86c-8-21 8-52 36-56 28-4 47 16 44 40-3 28-28 42-52 36-15-4-24-10-28-20z" fill="#f3d39b"/><circle cx="70" cy="58" r="5" fill="#173a82"/><circle cx="101" cy="51" r="5" fill="#173a82"/><circle cx="91" cy="82" r="5" fill="#173a82"/>','Un biscuit'),
  'Un balcon': fill('<path d="M42 40h96v63H42z" fill="#fff"/><path d="M35 103h110M50 55v48M70 55v48M90 55v48M110 55v48M130 55v48M35 55h110"/>','Un balcon'),
  'Un vase': fill('<path d="M72 26h36l-7 20c16 12 20 30 12 47-8 18-36 18-44 0-8-17-4-35 12-47z" fill="#dcecff"/><path d="M72 26h36"/>','Un vase'),
  'Un ascenseur': fill('<rect x="48" y="20" width="84" height="92" rx="5" fill="#fff"/><path d="M60 36h60v58H60z"/><path d="M90 36v58M78 65l12-14 12 14"/>','Un ascenseur'),
  'Une caméra': fill('<path d="M48 43h84v56H48z" fill="#dcecff"/><path d="m62 43 9-14h24l9 14"/><circle cx="90" cy="71" r="19" fill="#fff"/><circle cx="90" cy="71" r="8" fill="#173a82"/>','Une caméra'),
  'Un autobus': fill('<rect x="38" y="28" width="104" height="74" rx="12" fill="#dcecff"/><path d="M48 43h84v31H48z" fill="#fff"/><circle cx="62" cy="105" r="10" fill="#fff"/><circle cx="118" cy="105" r="10" fill="#fff"/><path d="M55 83h18M86 83h18M117 83h10"/>','Un autobus'),
  'Un gilet': fill('<path d="M66 25 90 39l24-14 18 30-13 8v45H61V63l-13-8z" fill="#dcecff"/><path d="M90 39v69M72 48l18 15 18-15"/>','Un gilet'),
  'Une écharpe': fill('<path d="M65 22c0 20 8 28 25 28s25-8 25-28M90 50v58M70 50v58"/><path d="M62 108h56"/>','Une écharpe'),
  'Un bouquet': fill('<path d="M90 102V61M90 74 67 55M90 78l24-24"/><circle cx="67" cy="50" r="13" fill="#ffd6e7"/><circle cx="114" cy="49" r="13" fill="#ffd6e7"/><circle cx="90" cy="40" r="14" fill="#dcecff"/><path d="M70 102h40"/>','Un bouquet'),
  'Une guitare': fill('<path d="M78 29c-12 10-8 25 2 34-13 4-18 16-10 27 8 11 25 8 30-4 4-10-2-19-12-23 11-8 15-23 4-34z" fill="#dcecff"/><path d="M90 29v75M78 29h24"/>','Une guitare'),
  'Une télévision': fill('<rect x="45" y="27" width="90" height="64" rx="7" fill="#dcecff"/><rect x="55" y="37" width="70" height="44" rx="3" fill="#fff"/><path d="M77 103h26M90 91v12"/>','Une télévision'),
  'Une plage': fill('<path d="M38 91c23-19 47-19 70 0s40 19 34 0" fill="#f7e5ad"/><path d="M48 79c14-20 33-27 54-19 15 6 25 17 31 31"/><path d="M55 70c7-7 15-11 24-13M108 61c10 3 17 9 23 18"/>','Une plage'),
  'Une lampe': fill('<path d="M68 27h44l14 31H54z" fill="#dcecff"/><path d="M90 58v37M72 95h36M78 105h24"/>','Une lampe'),
  'Une raquette': fill('<ellipse cx="86" cy="50" rx="27" ry="35" fill="#dcecff"/><path d="m106 78 25 30M72 28l28 44M63 47l47 7M67 66l39-32"/>','Une raquette'),
  'Une radio': fill('<rect x="45" y="35" width="90" height="65" rx="8" fill="#dcecff"/><circle cx="72" cy="68" r="16" fill="#fff"/><path d="M100 55h22M100 68h22M100 81h14M55 30l25-12"/>','Une radio'),
  'Un piano': fill('<path d="M42 32h96v70H42z" fill="#dcecff"/><path d="M42 48h96M56 48v54M70 48v54M84 48v54M98 48v54M112 48v54M126 48v54"/><path d="M63 48v30M91 48v30M119 48v30"/>','Un piano'),
  'Un garage': fill('<path d="M35 100V52l55-30 55 30v48z" fill="#fff"/><path d="M58 100V60h64v40M70 60v40M84 60v40M98 60v40M112 60v40"/>','Un garage'),
  'Un cinéma': fill('<path d="M42 45h96v60H42z" fill="#dcecff"/><path d="M50 45V32h80v13M55 105V87h70v18"/><path d="M62 58h56M62 72h56"/>','Un cinéma'),
  'Un journal': fill('<rect x="45" y="23" width="90" height="86" rx="3" fill="#fff"/><path d="M56 38h68M56 50h68M56 62h30M94 62h30M56 75h68M56 88h45"/>','Un journal')
};

const visualFor=term=>{
  const key=String(term||'').trim();
  if (illustrations[key]) return {icon:illustrations[key],label:'صورة مطابقة للكلمة'};
  return {icon:'🇫🇷',label:'Français'};
};

html = html.slice(0, start) + visualFor.toString() + html.slice(end);
fs.writeFileSync(file, html, 'utf8');
console.log('Patched grade7-lesson-studio.html vocabulary visuals for grade7-u1-l1.');
