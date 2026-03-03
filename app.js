/* ═══════════════════════════════════════════════
   SNOWPRO CORE COF-C03 · STUDY HUB
   app.js  —  UI logic, sidebar, study view, exam
   ═══════════════════════════════════════════════ */

let currentDomain = null;
let currentView   = 'study';
let examQuestions = [];
let currentQ      = 0;
let userAnswers   = {};
let checked       = {};
let examMode      = 'start';

/* ── UTILS ── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function parseMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code>$1</code>');
}
function paragraphs(text) {
  return text.split('\n\n').map(p => `<p>${parseMarkdown(p)}</p>`).join('');
}

/* ── MOBILE SIDEBAR ── */
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('open');
}
function closeSidebar() {
  document.querySelector('.sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
}

/* ── VIEW SWITCHING ── */
function switchView(v) {
  currentView = v;
  document.getElementById('studyView').classList.toggle('active', v === 'study');
  document.getElementById('examView').classList.toggle('active',  v === 'exam');
  document.getElementById('btnStudy').classList.toggle('active',  v === 'study');
  document.getElementById('btnExam').classList.toggle('active',   v === 'exam');
}

/* ── THEME TOGGLE ── */
function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  document.getElementById('icon-sun').style.display = isLight ? 'none' : 'block';
  document.getElementById('icon-moon').style.display = isLight ? 'block' : 'none';
}

/* ── SIDEBAR ── */
function buildSidebar() {
  const list = document.getElementById('sbList');
  list.innerHTML = '';
  DOMAINS.forEach(d => {
    const group = document.createElement('div');
    group.className = 'sb-group';
    group.id = 'sg-' + d.id;

    const hdr = document.createElement('div');
    hdr.className = 'sb-group-hdr';
    hdr.textContent = d.code + ' · ' + d.weight;
    group.appendChild(hdr);

    const item = document.createElement('div');
    item.className = 'sb-item';
    item.id = 'si-' + d.id;
    item.onclick = () => selectDomain(d.id);
    item.innerHTML = '<div class="sb-dot"></div><div class="sb-item-name">' + d.title + '</div>';
    group.appendChild(item);

    d.subdomains.forEach((sub, i) => {
      const si = document.createElement('div');
      si.className = 'sb-item sb-subitem';
      si.id = 'si-' + d.id + '-' + i;
      si.onclick = (e) => { 
        e.stopPropagation();
        selectDomain(d.id); 
        document.querySelectorAll('.sb-subitem').forEach(el => el.classList.remove('active-sub'));
        si.classList.add('active-sub');
        setTimeout(() => scrollToSub(d.id, i), 120); 
      };
      si.innerHTML = '<div class="sb-dot" style="background:var(--white5)"></div><div class="sb-item-name" style="font-size:11.5px;color:var(--white4)">' + sub.name + '</div>';
      group.appendChild(si);
    });

    list.appendChild(group);
  });
}

function filterSidebar(query) {
  const q = query.toLowerCase();
  DOMAINS.forEach(d => {
    const grp   = document.getElementById('sg-' + d.id);
    const match = d.title.toLowerCase().includes(q) || d.subdomains.some(s => s.name.toLowerCase().includes(q));
    grp.style.display = match ? '' : 'none';
  });
}

function selectDomain(id) {
  currentDomain = id;
  document.querySelectorAll('.sb-item').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.sb-subitem').forEach(el => el.classList.remove('active-sub'));
  const el = document.getElementById('si-' + id);
  if (el) el.classList.add('active');
  renderDomain(id);
  if (window.innerWidth <= 768) closeSidebar();
}

function scrollToSub(domId, subIdx) {
  const el = document.getElementById('sub-' + domId + '-' + subIdx);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ── DOMAIN RENDERER ── */
function renderDomain(id) {
  const d = DOMAINS.find(x => x.id === id);
  if (!d) return;
  const wrap = document.getElementById('studyContent');

  const topicChips = d.topics.map(t => '<span class="topic-chip">' + t + '</span>').join('');

  const tipsHtml = d.tips.map(t =>
    '<div class="tip-item">' +
      '<div class="tip-icon"><svg viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>' +
      '<div class="tip-text">' + t.text + '</div>' +
    '</div>'
  ).join('');

  const subHtml = d.subdomains.map((sub, i) =>
    '<div class="subtopic-card" id="sub-' + id + '-' + i + '">' +
      '<div class="subtopic-name">' + sub.name + '</div>' +
      '<ul class="subtopic-list">' + sub.items.map(item => '<li>' + item + '</li>').join('') + '</ul>' +
    '</div>'
  ).join('');

  wrap.innerHTML =
    '<div class="fade-up">' +
      '<div class="module-header">' +
        '<div class="module-domain">' + d.code + ' · ' + d.weight + ' of exam</div>' +
        '<div class="module-title">' + d.title + '</div>' +
        '<div class="module-meta">' +
          '<span class="meta-tag">' + d.subdomains.length + ' subdomains</span>' +
          '<span class="meta-tag">' + d.topics.length + ' key topics</span>' +
          '<span class="meta-tag">' + d.tips.length + ' exam tips</span>' +
        '</div>' +
      '</div>' +
      '<div class="section"><div class="section-title">Summary</div><div class="summary-block">' + paragraphs(d.summary) + '</div></div>' +
      '<div class="section"><div class="section-title">Subdomains &amp; Topics</div><div class="subtopic-grid">' + subHtml + '</div></div>' +
      '<div class="section"><div class="section-title">Key Topics &amp; Keywords</div><div class="topics-grid">' + topicChips + '</div></div>' +
      '<div class="section"><div class="section-title">Exam Tips</div><div class="tip-list">' + tipsHtml + '</div></div>' +
    '</div>';

  document.getElementById('studyView').scrollTop = 0;
}

/* ── EXAM START ── */
function startExam() {
  examQuestions = shuffle(ALL_QUESTIONS);
  currentQ    = 0;
  userAnswers = {};
  checked     = {};
  examMode    = 'active';
  document.getElementById('examStart').style.display     = 'none';
  document.getElementById('examResult').style.display    = 'none';
  document.getElementById('examQuestions').style.display = 'flex';
  renderQuestion();
}

function resetExam() {
  document.getElementById('examResult').style.display    = 'none';
  document.getElementById('examQuestions').style.display = 'none';
  document.getElementById('examStart').style.display     = 'flex';
  examMode = 'start';
}

/* ── QUESTION RENDERER ── */
function renderQuestion() {
  const total     = examQuestions.length;
  const q         = examQuestions[currentQ];
  const isMulti   = !!q.multi;
  const ua        = userAnswers[currentQ] || [];
  const isChecked = !!checked[currentQ];
  const isLast    = currentQ === total - 1;

  document.getElementById('examProg').style.width = ((currentQ / total) * 100) + '%';
  document.getElementById('examStat').textContent = (currentQ + 1) + ' / ' + total;

  document.getElementById('btnPrev').disabled        = currentQ === 0;
  document.getElementById('btnNext').style.display   = isLast ? 'none' : '';
  document.getElementById('btnFinish').style.display = isLast ? ''     : 'none';
  document.getElementById('btnCheck').style.display  = isChecked ? 'none' : '';
  document.getElementById('btnCheck').disabled       = ua.length === 0;

  const answered = Object.keys(userAnswers).length;
  const chkd     = Object.keys(checked).length;
  document.getElementById('actionInfo').textContent = answered + ' answered · ' + chkd + ' checked';

  const optsHtml = q.opts.map((opt, i) => {
    let cls = 'q-opt';
    if (ua.includes(i)) cls += ' selected';
    if (isChecked) {
      if      ( q.ans.includes(i) &&  ua.includes(i)) cls += ' correct-ans';
      else if (!q.ans.includes(i) &&  ua.includes(i)) cls += ' wrong-ans';
      else if ( q.ans.includes(i) && !ua.includes(i)) cls += ' show-correct';
    }
    return '<div class="' + cls + '" onclick="toggleOption(' + i + ')">' +
      '<div class="q-opt-letter">' + String.fromCharCode(65 + i) + '</div>' +
      '<div class="q-opt-text">' + opt + '</div>' +
    '</div>';
  }).join('');

  const expHtml = isChecked
    ? '<div class="q-explanation show"><span class="exp-label">Explanation</span>' + q.explanation + '</div>'
    : '<div class="q-explanation"></div>';

  document.getElementById('examBody').innerHTML =
    '<div class="q-card fade-up">' +
      '<div class="q-head">' +
        '<span class="q-num">Q' + (currentQ + 1) + '</span>' +
        '<span class="q-domain">' + q.domain + '</span>' +
        (isMulti ? '<span class="q-multi-badge">Select Multiple</span>' : '') +
      '</div>' +
      '<div class="q-text">' + q.text + '</div>' +
      '<div class="q-options">' + optsHtml + '</div>' +
      expHtml +
    '</div>';
}

/* ── INTERACTIONS ── */
function toggleOption(idx) {
  if (checked[currentQ]) return;
  const q = examQuestions[currentQ];
  if (!userAnswers[currentQ]) userAnswers[currentQ] = [];
  const ua  = userAnswers[currentQ];
  const pos = ua.indexOf(idx);
  if (q.multi) {
    pos >= 0 ? ua.splice(pos, 1) : ua.push(idx);
  } else {
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

function nextQ() { if (currentQ < examQuestions.length - 1) { currentQ++; renderQuestion(); } }
function prevQ() { if (currentQ > 0) { currentQ--; renderQuestion(); } }

/* ── FINISH & RESULTS ── */
function finishExam() {
  examMode = 'result';
  const domainStats = {};
  DOMAINS.forEach(d => { domainStats[d.code] = { correct: 0, total: 0 }; });
  let correct = 0;

  examQuestions.forEach((q, i) => {
    const ua      = userAnswers[i] || [];
    const domCode = (DOMAINS.find(d => d.id === 'd' + q.domain[1]) || {}).code || q.domain;
    if (!domainStats[domCode]) domainStats[domCode] = { correct: 0, total: 0 };
    domainStats[domCode].total++;
    const isCorrect = q.ans.every(a => ua.includes(a)) && ua.every(a => q.ans.includes(a));
    if (isCorrect) { correct++; domainStats[domCode].correct++; }
  });

  const total  = examQuestions.length;
  const pct    = Math.round((correct / total) * 100);
  const pass   = pct >= 75;
  const scaled = Math.round(pct * 10);

  document.getElementById('examQuestions').style.display = 'none';
  document.getElementById('examResult').style.display    = 'flex';
  document.getElementById('resultTitle').textContent     = pass ? 'You Passed! 🎉' : 'Keep Practicing';

  const ring = document.getElementById('resultRing');
  ring.className = 'result-score-ring ' + (pass ? 'result-pass' : 'result-fail');
  document.getElementById('resultPct').textContent   = pct + '%';
  document.getElementById('resultLabel').textContent = pass ? 'PASSED' : 'FAILED';

  document.getElementById('resultStats').innerHTML =
    '<div class="gate-stat"><div class="gate-stat-val">' + correct + '</div><div class="gate-stat-label">Correct</div></div>' +
    '<div class="gate-stat"><div class="gate-stat-val">' + (total - correct) + '</div><div class="gate-stat-label">Wrong</div></div>' +
    '<div class="gate-stat"><div class="gate-stat-val">' + scaled + '</div><div class="gate-stat-label">Scaled Score</div></div>' +
    '<div class="gate-stat"><div class="gate-stat-val">' + (pass ? '✓ Pass' : '✗ Fail') + '</div><div class="gate-stat-label">Result</div></div>';

  document.getElementById('domainBreakdown').innerHTML = DOMAINS.map(d => {
    const stat = domainStats[d.code] || { correct: 0, total: 0 };
    const p    = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
    return '<div class="domain-row">' +
      '<div class="domain-name">' + d.code + '</div>' +
      '<div class="domain-bar-wrap"><div class="domain-bar-fill" style="width:' + p + '%"></div></div>' +
      '<div class="domain-pct">' + p + '%</div>' +
    '</div>';
  }).join('');
}

function reviewExam() {
  examMode = 'review';
  document.getElementById('examResult').style.display    = 'none';
  document.getElementById('examQuestions').style.display = 'flex';
  examQuestions.forEach((_, i) => { checked[i] = true; });
  currentQ = 0;
  renderQuestion();
}

/* ── INIT ── */
buildSidebar();
selectDomain('d1');
var _qc = document.getElementById('totalQCount');
if (_qc) _qc.textContent = ALL_QUESTIONS.length;