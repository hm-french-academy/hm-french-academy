// HM Academy — safe UI fixes for 1ère secondaire → 2ème secondaire annual review.
// Adds the missing standalone training tab and keeps diagnostic fixes independent.
(function () {
  'use strict';

  const practice = [
    ['P1','Tu ___ français avec tes amis.',['parles','parle','parlons','parler'],'parles'],
    ['P2','Ma sœur ___ quinze ans.',['a','as','ai','avons'],'a'],
    ['P3','Nous ___ au cinéma samedi.',['allons','allez','vont','vais'],'allons'],
    ['P4','Je parle avec Marie. Je parle avec ___.',['elle','lui','ils','elles'],'elle'],
    ['P5','Ce sont ___ cahiers.',['mes','ma','mon','moi'],'mes'],
    ['P6','___ heure commence le cours ?',['Quelle','Quel','Quels','Quelles'],'Quelle'],
    ['P7','Il n’y ___ pas de bibliothèque.',['a','ont','est','sont'],'a'],
    ['P8','J’aime ___ musique française.',['la','le','les','un'],'la'],
    ['P9','Mon frère est grand et ___.',['sportif','sportive','sportifs','sportives'],'sportif'],
    ['P10','Je ne ___ pas le tennis.',['aime','aimes','aimons','aimer'],'aime']
  ];

  function esc(value) {
    return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }

  function addStyles() {
    if (document.getElementById('hm-secondary1-training-style')) return;
    const style = document.createElement('style');
    style.id = 'hm-secondary1-training-style';
    style.textContent = `
      #hm-training-panel .hm-training-hero{padding:16px;border-radius:16px;background:#f8fbff;border:1px solid #dce8f7;margin-bottom:14px}
      #hm-training-panel .hm-training-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:14px 0}
      #hm-training-panel .hm-training-stat{padding:12px;border-radius:13px;background:#f7f9fc;border:1px solid #e2e8f0;text-align:center;font-weight:700}
      #hm-training-panel .hm-training-stat b{display:block;font-size:20px;color:#2563eb}
      #hm-training-panel .hm-tq{padding:15px;margin:11px 0;border:1px solid #e2e8f0;border-radius:15px;direction:ltr}
      #hm-training-panel .hm-tq-head{display:grid;grid-template-columns:auto minmax(0,1fr);gap:10px;align-items:start;margin-bottom:9px}
      #hm-training-panel .hm-tq-num{padding:4px 8px;border-radius:999px;background:#eef2f7;color:#52627a;font-size:13px;font-weight:900}
      #hm-training-panel .hm-tq-text{font-size:18px;font-weight:800;line-height:1.7;text-align:left}
      #hm-training-panel .hm-tq label{display:flex;gap:7px;align-items:center;padding:9px;border-radius:9px;cursor:pointer;direction:ltr;text-align:left}
      #hm-training-panel .hm-tq label:hover{background:#f4f7fb}
      #hm-training-panel .hm-training-result{margin-top:15px;padding:15px;border-radius:15px;background:#f4f8ff}
      @media(max-width:700px){#hm-training-panel .hm-training-stats{grid-template-columns:1fr}.hm-training-tab{font-size:14px}}
    `;
    document.head.appendChild(style);
  }

  function buildTraining() {
    const tabs = document.getElementById('tabs');
    if (!tabs || document.getElementById('hm-training-panel')) return;

    const readyTab = tabs.querySelector('[data-target="ready"]');
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'hm-training-tab';
    tab.dataset.target = 'hm-training-panel';
    tab.textContent = '🎮 التدريب';
    tabs.insertBefore(tab, readyTab || null);

    const ready = document.getElementById('ready');
    if (!ready || !ready.parentNode) return;
    const panel = document.createElement('section');
    panel.id = 'hm-training-panel';
    panel.className = 'section';
    panel.hidden = true;
    panel.innerHTML = `
      <div class="hm-training-hero">
        <h2>🎮 التدريب</h2>
        <p>تدريب مستقل عن التشخيص والجاهزية، مع تصحيح فوري للنتيجة.</p>
        <div class="hm-training-stats">
          <div class="hm-training-stat"><b>10</b>أسئلة</div>
          <div class="hm-training-stat"><b>100%</b>تصحيح فوري</div>
          <div class="hm-training-stat"><b>70%</b>هدف مقترح</div>
        </div>
      </div>
      <div id="hm-training-quiz"></div>
      <button type="button" id="hm-training-check" class="btn">تصحيح التدريب</button>
      <div id="hm-training-result"></div>
    `;
    ready.parentNode.insertBefore(panel, ready);

    const quiz = panel.querySelector('#hm-training-quiz');
    practice.forEach((q, i) => {
      const box = document.createElement('article');
      box.className = 'hm-tq';
      const options = [...q[2]];
      for (let j = options.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [options[j], options[k]] = [options[k], options[j]];
      }
      box.innerHTML = `<div class="hm-tq-head"><span class="hm-tq-num">${i + 1}.</span><span class="hm-tq-text">${esc(q[1])}</span></div>`;
      options.forEach(option => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `hm-training-${q[0]}`;
        input.value = option;
        label.append(input, document.createTextNode(option));
        box.appendChild(label);
      });
      quiz.appendChild(box);
    });

    panel.querySelector('#hm-training-check').addEventListener('click', () => {
      let score = 0;
      practice.forEach(q => {
        const selected = panel.querySelector(`input[name="hm-training-${q[0]}"]:checked`);
        if (selected && selected.value === q[3]) score++;
      });
      const pct = Math.round(score / practice.length * 100);
      panel.querySelector('#hm-training-result').innerHTML = `<div class="hm-training-result"><h3>النتيجة: ${score}/${practice.length} — ${pct}%</h3><p>${pct >= 70 ? '✅ أداء جيد. يمكنك الانتقال إلى الجاهزية.' : '⚠️ تحتاج إلى تدريب إضافي على هذه المهارات.'}</p></div>`;
    });

    tab.addEventListener('click', () => showTraining());
    addStyles();
  }

  function showTraining() {
    document.querySelectorAll('.section').forEach(section => section.hidden = true);
    const panel = document.getElementById('hm-training-panel');
    if (panel) panel.hidden = false;
    document.querySelectorAll('#tabs button').forEach(button => button.classList.toggle('active', button.dataset.target === 'hm-training-panel'));
    window.scrollTo(0, 0);
  }

  function applyDiagnosticFixes() {
    const root = document.getElementById('diag');
    if (!root) return;
    const style = document.createElement('style');
    style.textContent = `
      #diag .q { direction:ltr !important; }
      #diag .qHead { direction:ltr !important; display:grid !important; grid-template-columns:auto minmax(0,1fr) !important; justify-content:initial !important; align-items:start !important; }
      #diag .qNum { direction:ltr !important; unicode-bidi:isolate; grid-column:1 !important; grid-row:1 !important; }
      #diag .qText { direction:ltr !important; unicode-bidi:plaintext; text-align:left !important; grid-column:2 !important; grid-row:1 !important; min-width:0; }
      #diag .q label { direction:ltr !important; text-align:left !important; }
    `;
    document.head.appendChild(style);
    const questions = root.querySelectorAll('.q');
    const d8 = questions[7] && questions[7].querySelector('.qText');
    const d22 = questions[21] && questions[21].querySelector('.qText');
    if (d8) d8.textContent = 'À 8h00, quelle heure est-il ? — Il est ___ heures exactement.';
    if (d22) d22.textContent = 'Je parle avec Paul. Je parle avec ___.';
  }

  function init() {
    applyDiagnosticFixes();
    buildTraining();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
