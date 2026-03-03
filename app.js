/* ═══════════════════════════════════════════════
   SNOWPRO CORE COF-C03 · STUDY HUB
   app.js  —  UI logic, sidebar, study view, exam
   ═══════════════════════════════════════════════ */

/* ─────────────────────────────────────────────
   APP STATE
   ───────────────────────────────────────────── */
let currentDomain = null;
let currentView   = 'study';

// Exam state
let examQuestions = [];
let currentQ      = 0;
let userAnswers   = {};
let checked       = {};
let timerInterval = null;
let timeLeft      = 90 * 60;
let examMode      = 'start'; // 'start' | 'active' | 'review' | 'result'


/* ─────────────────────────────────────────────
   UTILS
   ───────────────────────────────────────────── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Convert **bold** and `code` markdown to HTML. */
function parseMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g,       '<code>$1</code>');
}

/** Wrap each double-newline paragraph in <p> tags. */
function paragraphs(text) {
  return text
    .split('\n\n')
    .map(p => `<p>${parseMarkdown(p)}</p>`)
    .join('');
}


/* ─────────────────────────────────────────────
   VIEW SWITCHING
   ───────────────────────────────────────────── */
function switchView(v) {
  currentView = v;
  document.getElementById('studyView').classList.toggle('active', v === 'study');
  document.getElementById('examView').classList.toggle('active',  v === 'exam');
  document.getElementById('btnStudy').classList.toggle('active',  v === 'study');
  document.getElementById('btnExam').classList.toggle('active',   v === 'exam');
}


/* ─────────────────────────────────────────────
   SIDEBAR
   ───────────────────────────────────────────── */
function buildSidebar() {
  const list = document.getElementById('sbList');
  list.innerHTML = '';

  DOMAINS.forEach(d => {
    // Group wrapper
    const group = document.createElement('div');
    group.className = 'sb-group';
    group.id = `sg-${d.id}`;

    // Group header (domain code + weight)
    const hdr = document.createElement('div');
    hdr.className = 'sb-group-hdr';
    hdr.textContent = `${d.code} · ${d.weight}`;
    group.appendChild(hdr);

    // Domain item (main title)
    const item = document.createElement('div');
    item.className = 'sb-item';
    item.id = `si-${d.id}`;
    item.onclick = () => selectDomain(d.id);
    item.innerHTML = `
      <div class="sb-dot"></div>
      <div class="sb-item-name">${d.title}</div>
    `;
    group.appendChild(item);

    // Sub-items (one per subdomain)
    d.subdomains.forEach((sub, i) => {
      const sub_item = document.createElement('div');
      sub_item.className = 'sb-item';
      sub_item.id = `si-${d.id}-${i}`;
      sub_item.style.paddingLeft = '20px';
      sub_item.onclick = () => {
        selectDomain(d.id);
        setTimeout(() => scrollToSub(d.id, i), 120);
      };
      sub_item.innerHTML = `
        <div class="sb-dot" style="background:var(--white5)"></div>
        <div class="sb-item-name" style="font-size:11.5px;color:var(--white4)">${sub.name}</div>
      `;
      group.appendChild(sub_item);
    });

    list.appendChild(group);
  });
}

function filterSidebar(query) {
  const q = query.toLowerCase();
  DOMAINS.forEach(d => {
    const grp   = document.getElementById(`sg-${d.id}`);
    const match = d.title.toLowerCase().includes(q)
               || d.subdomains.some(s => s.name.toLowerCase().includes(q));
    grp.style.display = match ? '' : 'none';
  });
}

function selectDomain(id) {
  currentDomain = id;
  document.querySelectorAll('.sb-item').forEach(el => el.classList.remove('active'));
  document.getElementById(`si-${id}`).classList.add('active');
  renderDomain(id);
}

function scrollToSub(domId, subIdx) {
  const el = document.getElementById(`sub-${domId}-${subIdx}`);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


/* ─────────────────────────────────────────────
   STUDY VIEW — DOMAIN RENDERER
   ───────────────────────────────────────────── */
function renderDomain(id) {
  const d = DOMAINS.find(x => x.id === id);
  if (!d) return;

  const wrap = document.getElementById('studyContent');

  // --- Build sub-sections HTML ---
  const topicChips = d.topics
    .map(t => `<span class="topic-chip">${t}</span>`)
    .join('');

  const tipsHtml = d.tips
    .map(t => `
      <div class="tip-item">
        <div class="tip-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="3"
               stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div class="tip-text">${t.text}</div>
      </div>`)
    .join('');

  const subHtml = d.subdomains
    .map((sub, i) => `
      <div class="subtopic-card" id="sub-${id}-${i}">
        <div class="subtopic-name">${sub.name}</div>
        <ul class="subtopic-list">
          ${sub.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>`)
    .join('');

  // --- Render ---
  wrap.innerHTML = `
    <div class="fade-up">

      <div class="module-header">
        <div class="module-domain">${d.code} · ${d.weight} of exam</div>
        <div class="module-title">${d.title}</div>
        <div class="module-meta">
          <span class="meta-tag">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            ${d.subdomains.length} subdomains
          </span>
          <span class="meta-tag">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            ${d.topics.length} key topics
          </span>
          <span class="meta-tag">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8"  x2="12"    y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            ${d.tips.length} exam tips
          </span>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Summary</div>
        <div class="summary-block">${paragraphs(d.summary)}</div>
      </div>

      <div class="section">
        <div class="section-title">Subdomains &amp; Topics</div>
        <div class="subtopic-grid">${subHtml}</div>
      </div>

      <div class="section">
        <div class="section-title">Key Topics &amp; Keywords</div>
        <div class="topics-grid">${topicChips}</div>
      </div>

      <div class="section">
        <div class="section-title">Exam Tips</div>
        <div class="tip-list">${tipsHtml}</div>
      </div>

    </div>`;

  document.getElementById('studyView').scrollTop = 0;
}


/* ─────────────────────────────────────────────
   EXAM  —  START / TIMER
   ───────────────────────────────────────────── */
function startExam() {
  examQuestions = shuffle(ALL_QUESTIONS);
  currentQ    = 0;
  userAnswers = {};
  checked     = {};
  timeLeft    = 90 * 60;
  examMode    = 'active';

  document.getElementById('examStart').style.display  = 'none';
  document.getElementById('examResult').style.display = 'none';

  const qSection = document.getElementById('examQuestions');
  qSection.style.display = 'flex';

  // Reset timer display
  const timerEl = document.getElementById('examTimer');
  timerEl.textContent = '90:00';
  timerEl.style.background = '';
  timerEl.classList.remove('warn');

  startTimer();
  renderQuestion();
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    const m  = Math.floor(timeLeft / 60);
    const s  = timeLeft % 60;
    const el = document.getElementById('examTimer');
    el.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    el.classList.toggle('warn', timeLeft < 600);
    if (timeLeft <= 0) { clearInterval(timerInterval); finishExam(); }
  }, 1000);
}

function resetExam() {
  document.getElementById('examResult').style.display = 'none';
  document.getElementById('examStart').style.display  = 'flex';
  examMode = 'start';
}


/* ─────────────────────────────────────────────
   EXAM  —  QUESTION RENDERER
   ───────────────────────────────────────────── */
function renderQuestion() {
  const total     = examQuestions.length;
  const pct       = (currentQ / total) * 100;
  const q         = examQuestions[currentQ];
  const isMulti   = !!q.multi;
  const ua        = userAnswers[currentQ] || [];
  const isChecked = !!checked[currentQ];
  const isLast    = currentQ === total - 1;

  // Header stats
  document.getElementById('examProg').style.width = pct + '%';
  document.getElementById('examStat').textContent  = `${currentQ + 1} / ${total}`;

  // Button states
  document.getElementById('btnPrev').disabled         = currentQ === 0;
  document.getElementById('btnNext').style.display    = isLast  ? 'none' : '';
  document.getElementById('btnFinish').style.display  = isLast  ? ''     : 'none';
  document.getElementById('btnCheck').style.display   = isChecked ? 'none' : '';
  document.getElementById('btnCheck').disabled        = ua.length === 0;

  // Footer info
  const answered = Object.keys(userAnswers).length;
  const chkd     = Object.keys(checked).length;
  document.getElementById('actionInfo').textContent =
    `${answered} answered · ${chkd} checked`;

  // Build option HTML
  const optsHtml = q.opts.map((opt, i) => {
    let cls = 'q-opt';
    if (ua.includes(i)) cls += ' selected';
    if (isChecked) {
      if      ( q.ans.includes(i) &&  ua.includes(i)) cls += ' correct-ans';
      else if (!q.ans.includes(i) &&  ua.includes(i)) cls += ' wrong-ans';
      else if ( q.ans.includes(i) && !ua.includes(i)) cls += ' show-correct';
    }
    const letter = String.fromCharCode(65 + i);
    return `
      <div class="${cls}" onclick="toggleOption(${i})">
        <div class="q-opt-letter">${letter}</div>
        <div class="q-opt-text">${opt}</div>
      </div>`;
  }).join('');

  // Explanation (only after checking)
  const expHtml = isChecked
    ? `<div class="q-explanation show">
         <span class="exp-label">Explanation</span>
         ${q.explanation}
       </div>`
    : `<div class="q-explanation"></div>`;

  document.getElementById('examBody').innerHTML = `
    <div class="q-card fade-up">
      <div class="q-head">
        <span class="q-num">Q${currentQ + 1}</span>
        <span class="q-domain">${q.domain}</span>
        ${isMulti ? '<span class="q-multi-badge">Select Multiple</span>' : ''}
      </div>
      <div class="q-text">${q.text}</div>
      <div class="q-options">${optsHtml}</div>
      ${expHtml}
    </div>`;
}


/* ─────────────────────────────────────────────
   EXAM  —  INTERACTIONS
   ───────────────────────────────────────────── */
function toggleOption(idx) {
  if (checked[currentQ]) return; // locked after checking
  const q = examQuestions[currentQ];

  if (!userAnswers[currentQ]) userAnswers[currentQ] = [];
  const ua  = userAnswers[currentQ];
  const pos = ua.indexOf(idx);

  if (q.multi) {
    // Toggle selection in multi-select
    pos >= 0 ? ua.splice(pos, 1) : ua.push(idx);
  } else {
    // Single select: replace
    userAnswers[currentQ] = [idx];
  }

  document.getElementById('btnCheck').disabled = userAnswers[currentQ].length === 0;
  renderQuestion();
}

function checkAnswer() {
  if (!userAnswers[currentQ] || userAnswers[currentQ].length === 0) return;
  checked[currentQ] = true;
  renderQuestion();
}

function nextQ() {
  if (currentQ < examQuestions.length - 1) { currentQ++; renderQuestion(); }
}

function prevQ() {
  if (currentQ > 0) { currentQ--; renderQuestion(); }
}


/* ─────────────────────────────────────────────
   EXAM  —  FINISH & RESULTS
   ───────────────────────────────────────────── */
function finishExam() {
  clearInterval(timerInterval);
  examMode = 'result';

  // Tally scores per domain
  const domainStats = {};
  DOMAINS.forEach(d => { domainStats[d.code] = { correct: 0, total: 0 }; });

  let correct = 0;

  examQuestions.forEach((q, i) => {
    const ua       = userAnswers[i] || [];
    // Map D1..D5 → Domain 1..5
    const domCode  = DOMAINS.find(d => d.id === `d${q.domain[1]}`)?.code || q.domain;
    if (!domainStats[domCode]) domainStats[domCode] = { correct: 0, total: 0 };

    domainStats[domCode].total++;
    const isCorrect = q.ans.every(a => ua.includes(a)) && ua.every(a => q.ans.includes(a));
    if (isCorrect) { correct++; domainStats[domCode].correct++; }
  });

  const total  = examQuestions.length;
  const pct    = Math.round((correct / total) * 100);
  const pass   = pct >= 75;
  const scaled = Math.round(pct * 10); // approximate out of 1000

  // Show result screen
  document.getElementById('examQuestions').style.display = 'none';
  const result = document.getElementById('examResult');
  result.style.display = 'flex';

  document.getElementById('resultTitle').textContent = pass ? 'You Passed! 🎉' : 'Keep Practicing';

  const ring = document.getElementById('resultRing');
  ring.className = 'result-score-ring ' + (pass ? 'result-pass' : 'result-fail');
  document.getElementById('resultPct').textContent   = pct + '%';
  document.getElementById('resultLabel').textContent = pass ? 'PASSED' : 'FAILED';

  document.getElementById('resultStats').innerHTML = `
    <div class="gate-stat"><div class="gate-stat-val">${correct}</div><div class="gate-stat-label">Correct</div></div>
    <div class="gate-stat"><div class="gate-stat-val">${total - correct}</div><div class="gate-stat-label">Wrong</div></div>
    <div class="gate-stat"><div class="gate-stat-val">${scaled}</div><div class="gate-stat-label">Scaled Score</div></div>
    <div class="gate-stat"><div class="gate-stat-val">${pass ? '✓ Pass' : '✗ Fail'}</div><div class="gate-stat-label">Result</div></div>`;

  document.getElementById('domainBreakdown').innerHTML = DOMAINS.map(d => {
    const stat = domainStats[d.code] || { correct: 0, total: 0 };
    const p    = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
    return `
      <div class="domain-row">
        <div class="domain-name">${d.code}</div>
        <div class="domain-bar-wrap">
          <div class="domain-bar-fill" style="width:${p}%"></div>
        </div>
        <div class="domain-pct">${p}%</div>
      </div>`;
  }).join('');
}

function reviewExam() {
  examMode = 'review';
  document.getElementById('examResult').style.display = 'none';

  const qSection = document.getElementById('examQuestions');
  qSection.style.display = 'flex';

  // Mark all questions as checked so answers are visible
  examQuestions.forEach((_, i) => { checked[i] = true; });
  currentQ = 0;

  const timerEl = document.getElementById('examTimer');
  timerEl.textContent       = 'REVIEW';
  timerEl.style.background  = 'var(--black5)';

  renderQuestion();
}


/* ─────────────────────────────────────────────
   INIT
   ───────────────────────────────────────────── */
buildSidebar();
selectDomain('d1');
