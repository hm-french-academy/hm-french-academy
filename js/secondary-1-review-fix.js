// HM Academy — fixes for 1ère secondaire → 2ème secondaire diagnostic
// Keeps the existing visual design, but makes numbering/question flow LTR and
// persists the one diagnostic attempt to the authenticated student's account.
(async () => {
  const btn = document.getElementById('diagBtn');
  const root = document.getElementById('diag');
  if (!btn || !root) return;

  // The source page is Arabic RTL, while the French question line and its
  // numbering/options must remain visually LTR.
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
    const { data } = await supabase.from('student_diagnostic_attempts')
      .select('grade,result,created_at').eq('user_id', user.id).eq('grade', grade).maybeSingle();
    existing = data;
  } else {
    try { existing = JSON.parse(localStorage.getItem(key) || 'null'); } catch {}
  }

  const showLock = record => {
    const r = record?.result || record || {};
    const score = Number(r.score || 0), total = Number(r.total || 24);
    const pct = total ? Math.round(score / total * 100) : 0;
    document.getElementById('diag').hidden = true;
    btn.hidden = true;
    document.getElementById('diagResult').innerHTML = `<div class="result"><h3>🔒 سبق لك إتمام التشخيص</h3><p>التشخيص محاولة واحدة فقط ${user ? 'على حسابك' : 'على هذا الجهاز'} لهذا الصف.</p><p><b>النتيجة:</b> ${score} / ${total} — <b>${pct}%</b></p><p class="audit">${pct >= 70 ? '✅ نتيجة تشير إلى الجاهزية.' : '⚠️ تحتاج إلى مراجعة إضافية.'}</p></div>`;
  };

  if (existing) { showLock(existing); return; }

  btn.onclick = async () => {
    btn.disabled = true;
    const selected = [];
    for (let i=0;i<24;i++) {
      const input = root.querySelector(`input[name="diag-D${i+1}"]:checked`);
      if (!input) {
        document.getElementById('diagResult').innerHTML = `<div class="result">⚠️ أكمل السؤال رقم ${i+1} قبل تصحيح التشخيص.</div>`;
        btn.disabled = false;
        return;
      }
      selected.push(input.value);
    }
    const score = selected.reduce((n,v,i) => n + (String(v) === answers[i] ? 1 : 0), 0);
    const record = {version:2,target:grade,score,total:24,completedAt:new Date().toISOString()};
    try {
      if (user) {
        const { error } = await supabase.from('student_diagnostic_attempts').insert({user_id:user.id,grade,result:record});
        if (error) {
          if (error.code === '23505') { location.reload(); return; }
          throw error;
        }
      } else {
        localStorage.setItem(key, JSON.stringify(record));
      }
      location.reload();
    } catch (e) {
      console.error(e);
      document.getElementById('diagResult').innerHTML = '<div class="result">⚠️ تعذر حفظ النتيجة الآن. لم يتم إنهاء المحاولة.</div>';
      btn.disabled = false;
    }
  };
})();
