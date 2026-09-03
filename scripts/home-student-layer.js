/* HM Academy — homepage student layer
 * Reads the authenticated Supabase session and the existing local HMProgress state.
 * It never fabricates progress and remains hidden for guests.
 */
(function () {
  const state = { initialized: false };
  const gradeNames = {
    3: 'الصف الثالث الابتدائي', 4: 'الصف الرابع الابتدائي', 5: 'الصف الخامس الابتدائي',
    6: 'الصف السادس الابتدائي', 7: 'الصف الأول الإعدادي', 8: 'الصف الثاني الإعدادي',
    9: 'الصف الثالث الإعدادي', 10: 'الصف الأول الثانوي', 11: 'الصف الثاني الثانوي'
  };

  function findProgress() {
    try {
      if (window.HMProgress && typeof window.HMProgress.getState === 'function') return window.HMProgress.getState();
      const raw = localStorage.getItem('hm_progress') || localStorage.getItem('HMProgress');
      return raw ? JSON.parse(raw) : null;
    } catch (_) { return null; }
  }

  function normalizeProgress(p) {
    if (!p || typeof p !== 'object') return null;
    const grade = p.grade || p.currentGrade || p.stage || p.gradeId;
    const lesson = p.lesson || p.currentLesson || p.lessonId;
    const title = p.lessonTitle || p.title || p.currentLessonTitle;
    const percent = Number.isFinite(Number(p.percent)) ? Math.max(0, Math.min(100, Number(p.percent))) :
      (Number.isFinite(Number(p.progress)) ? Math.max(0, Math.min(100, Number(p.progress))) : null);
    if (!grade && !lesson && !title && percent === null) return null;
    return { grade, lesson, title, percent };
  }

  function ensureCard() {
    if (document.getElementById('hm-resume-learning')) return document.getElementById('hm-resume-learning');
    const main = document.querySelector('main.home-pro');
    if (!main) return null;
    const section = document.createElement('section');
    section.id = 'hm-resume-learning';
    section.className = 'home-section hm-resume-section';
    section.innerHTML = '<div class="home-section-head"><div><h2>▶️ أكمل من حيث توقفت</h2><p>رحلتك التعليمية المحفوظة على هذا الجهاز.</p></div></div><div class="hm-resume-card"><div class="hm-resume-copy"><span class="hm-resume-badge">طالب مسجل</span><strong class="hm-resume-title">متابعة التعلّم</strong><span class="hm-resume-meta"></span></div><a class="hm-resume-action" href="dashboard.html">متابعة التعلّم ←</a></div>';
    const first = main.querySelector('.home-section');
    main.insertBefore(section, first || null);
    return section;
  }

  function render(progress) {
    const section = ensureCard();
    if (!section) return;
    const data = normalizeProgress(progress);
    if (!data) { section.remove(); return; }
    const meta = section.querySelector('.hm-resume-meta');
    const title = section.querySelector('.hm-resume-title');
    const action = section.querySelector('.hm-resume-action');
    title.textContent = data.title || (data.lesson ? 'الدرس المحفوظ' : 'استكمل رحلتك التعليمية');
    const gradeText = gradeNames[data.grade] || (data.grade ? `الصف ${data.grade}` : 'آخر نشاط محفوظ');
    meta.textContent = data.percent !== null ? `${gradeText} · التقدم ${data.percent}%` : gradeText;
    action.href = data.lesson ? `dashboard.html?lesson=${encodeURIComponent(data.lesson)}` : 'dashboard.html';
  }

  async function init() {
    if (state.initialized || !window.HMSupabase) return;
    state.initialized = true;
    try {
      const { data } = await window.HMSupabase.auth.getSession();
      if (!data || !data.session || !data.session.user) return;
      render(findProgress());
      window.addEventListener('hm:progresschange', function () { render(findProgress()); });
      window.HMSupabase.auth.onAuthStateChange(function (event, session) {
        if (session && session.user) render(findProgress());
        else { const card = document.getElementById('hm-resume-learning'); if (card) card.remove(); }
      });
    } catch (err) { console.warn('HM Academy: student layer unavailable.', err); }
  }

  window.addEventListener('hm:supabase-ready', init);
  if (window.HMSupabase) init();
})();
