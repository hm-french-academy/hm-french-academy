// HM Academy — fixes for 1ère secondaire → 2ème secondaire diagnostic
// Keeps the existing visual design, but makes numbering/question flow LTR and
// persists the one diagnostic attempt to the authenticated student's account.
(async () => {
  const btn = document.getElementById('diagBtn');
  const root = document.getElementById('diag');
  if (!btn || !root) return;

  // French questions/options are LTR even though the page shell is Arabic RTL.
  const style = document.createElement('style');
  style.textContent = `
    #diag .q { direction:ltr !important; }
    #diag .qHead { direction:ltr !important; justify-content:flex-start !important; }
    #diag .qNum { direction:ltr !important; unicode-bidi:isolate; }
    #diag .qText { direction:ltr !important; unicode-bidi:plaintext; text-align:left !important; }
    #diag .q label { direction:ltr !important; text-align:left !important; }
  `;
  document.head.appendChild(style);

  const { supabase } = await import('./auth-guard.js');
  const { data: sessionData } = await supabase.auth.getSession();
  const user = sessionData?.session?.user || null;
  const grade = 10;
  const key = 'hmAnnualRevisionAttempt:v1:' + grade;
  const answers = [
    'm’appelle','a','sommes','des','aime','travaille','a','huit','mon','Elle','au','au',
    'ai','aimes','mes','Quelle','a','le','les','sportive','allons','lui','Mon','pas'
  ];

  let existing = null;
  if (user) {
    const { data, error } = await supabase.from('student_diagnostic_attempts')
      .select('grade,result,created_at').eq('user_id', user.id).eq('grade', grade).maybeSingle();
    if (error) console.error('HM diagnostic read:', error);
    existing = data || null;
  } else {
    try { existing = JSON.parse(localStorage.getItem(key) || 'null'); } catch {}
  }

  const resultBox = document.getElementById('diagResult');
  const showLock = record => {
    const r = record?.result || record || {};
    const score = Number(r.score || 0), total = Number(r.total || 24);
    const pct = total ? Math.round(score / total * 100) : 0;
    root.hidden = true;
    btn.hidden = true;
    resultBox.innerHTML = `<div class="result"><h3>🔒 سبق لك إتمام التشخيص</h3><p>التشخيص محاولة واحدة فقط ${user ? 'على حسابك' : 'على هذا الجهاز'} لهذا الصف.</p><p><b>النتيجة:</b> ${score} / ${total} — <b>${pct}%</b></p><p class="audit">${pct >= 70 ? '✅ نتيجة تشير إلى الجاهزية.' : '⚠️ تحتاج إلى مراجعة إضافية.'}</p></div>`;
  };

  if (existing) { showLock(existing); return; }

  // Capture the click so the original inline handler cannot race this module.
  btn.addEventListener('click', async event => {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (btn.dataset.hmBusy === '1') return;
    btn.dataset.hmBusy = '1';
    btn.disabled = true;
    try {
      const selected = [];
      for (let i = 0; i < 24; i++) {
        const input = root.querySelector(`input[name="diag-D${i + 1}"]:checked`);
        if (!input) {
          resultBox.innerHTML = `<div class="result">⚠️ أكمل السؤال رقم ${i + 1} قبل تصحيح التشخيص.</div>`;
          btn.disabled = false;
          btn.dataset.hmBusy = '0';
          return;
        }
        selected.push(input.value);
      }
      const score = selected.reduce((n, v, i) => n + (String(v) === answers[i] ? 1 : 0), 0);
      const record = { version: 2, target: grade, score, total: 24, completedAt: new Date().toISOString() };
      if (user) {
        const { error } = await supabase.from('student_diagnostic_attempts').insert({ user_id: user.id, grade, result: record });
        if (error) {
          if (error.code === '23505') { location.reload(); return; }
          throw error;
        }
      } else {
        localStorage.setItem(key, JSON.stringify(record));
      }
      location.reload();
    } catch (e) {
      console.error('HM diagnostic save:', e);
      resultBox.innerHTML = '<div class="result">⚠️ تعذر حفظ النتيجة الآن. لم يتم إنهاء المحاولة.</div>';
      btn.disabled = false;
      btn.dataset.hmBusy = '0';
    }
  }, true);
})();
