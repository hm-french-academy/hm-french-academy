// HM Academy — account-backed diagnostic persistence
// Keeps the existing review UI intact while upgrading authenticated attempts from
// device-only localStorage to Supabase account persistence.
const params = new URLSearchParams(location.search);
const target = Number(params.get('target'));
const paths = {4:'data/reviews/grade-3/review-content-normalized.json',5:'data/reviews/grade-5/review-content.json',6:'data/reviews/grade-6/review-content.json',8:'data/reviews/grade-8/review-content.json',9:'data/reviews/grade-9/review-content.json'};
const key = 'hmAnnualRevisionAttempt:v1:' + target;

const decode = s => {
  const b = Uint8Array.from(atob(String(s).replace(/\s/g,'')), c => c.charCodeAt(0));
  return new TextDecoder('utf-8').decode(b);
};
const deep = v => {
  let x = v;
  for (let i=0;i<15 && typeof x==='string';i++) { try { x = JSON.parse(x); } catch { return x; } }
  return x;
};
async function loadBank(path) {
  for (const u of ['./'+path, 'https://raw.githubusercontent.com/hm-french-academy/hm-french-academy/main/'+path]) {
    try {
      const r = await fetch(u + '?v=20260903-auth-diagnostic', {cache:'no-store'});
      if (!r.ok) continue;
      let x = await r.text();
      try { x = JSON.parse(x); } catch {}
      if (x?.encoding === 'base64') x = decode(x.content);
      else if (x?.content) x = x.content;
      x = deep(x);
      if (x?.diagnostic?.questions) return x;
    } catch {}
  }
  throw new Error('diagnostic bank unavailable');
}

(async () => {
  if (!paths[target]) return;
  const { supabase } = await import('./auth-guard.js');
  const { data: sessionData } = await supabase.auth.getSession();
  const user = sessionData?.session?.user || null;
  const lock = document.getElementById('diagLock');
  const wrap = document.getElementById('diagWrap');
  const result = document.getElementById('diagResult');
  const btn = document.getElementById('diagBtn');
  if (!lock || !wrap || !result || !btn) return;

  let existing = null;
  if (user) {
    const { data, error } = await supabase
      .from('student_diagnostic_attempts')
      .select('grade,result,created_at')
      .eq('user_id', user.id)
      .eq('grade', target)
      .maybeSingle();
    if (!error) existing = data;
  } else {
    try { existing = JSON.parse(localStorage.getItem(key) || 'null'); } catch {}
  }

  const showLock = record => {
    const score = Number(record?.score ?? record?.result?.score ?? 0);
    const total = Number(record?.total ?? record?.result?.total ?? 0);
    const completedAt = record?.completedAt || record?.created_at || record?.result?.completedAt;
    const pct = total ? Math.round(score / total * 100) : 0;
    wrap.hidden = true;
    lock.innerHTML = '<div class="locked"><h2>🔒 سبق لك إتمام هذه المراجعة</h2>' +
      '<p>هذه المراجعة تسمح <b>بمحاولة واحدة فقط</b> لهذا الصف' + (user ? ' على حسابك.' : ' على هذا الجهاز.') + '</p>' +
      '<div class="lockMeta"><div><b>النتيجة</b><br>'+score+' / '+total+'</div>' +
      '<div><b>النسبة</b><br>'+pct+'%</div><div><b>تاريخ المحاولة</b><br>' +
      (completedAt ? new Date(completedAt).toLocaleDateString('ar-EG') : '—') +
      '</div></div><p>'+(pct>=70?'✅ نتيجة تشير إلى الجاهزية للصف التالي.':'⚠️ تحتاج إلى مراجعة إضافية قبل الانتقال للصف التالي.')+'</p>' +
      '<div class="tip">للحفاظ على نزاهة التشخيص، لا يمكن إعادة فتح الأسئلة بعد الإنهاء.</div></div>';
  };

  if (existing) {
    showLock(existing);
    return;
  }

  // Replace the original local-only submit handler with an account-aware one.
  btn.onclick = async () => {
    btn.disabled = true;
    try {
      const bank = await loadBank(paths[target]);
      const diag = bank.diagnostic?.questions || [];
      let score = 0;
      for (let i=0;i<diag.length;i++) {
        const q = diag[i];
        if (q.type === 'writing') continue;
        const input = document.querySelector('input[name="diag-'+CSS.escape(q.id || i)+'"]:checked');
        if (input && Number(input.value) === Number(q.answer)) score++;
      }
      const record = {version:2,target:target,score,total:diag.length,completedAt:new Date().toISOString()};
      if (user) {
        const { error } = await supabase.from('student_diagnostic_attempts').insert({
          user_id:user.id, grade:target, result:record
        });
        if (error) {
          if (error.code === '23505') {
            location.reload();
            return;
          }
          throw error;
        }
      } else {
        localStorage.setItem(key, JSON.stringify(record));
      }
      location.reload();
    } catch (e) {
      console.error('HM diagnostic persistence:', e);
      result.innerHTML = '<div class="result">⚠️ تعذر حفظ نتيجة التشخيص الآن. لم يتم إنهاء المحاولة حتى لا تُفقد نتيجتك. حاول مرة أخرى.</div>';
      btn.disabled = false;
    }
  };
})();
