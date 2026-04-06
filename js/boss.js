// ============================================================
// boss.js
// PyBerry Gaming — Boss Fight Engine
// Depends on: questions.js, main.js, dashboard.js
// ============================================================

// Boss state
let BS = {
    stageIdx:  0,
    questions: [],
    qi:        0,
    playerHP:  100,
    bossHP:    100,
    score:     0,
    answered:  false,
    wrongQs:   []
  };
  
  // ── Launch boss (show intro screen) ─────────────────────────
  function launchBoss(stageIdx) {
    BS.stageIdx = stageIdx;
    const st    = STAGES[stageIdx];
  
    document.getElementById('bi-em').textContent    = st.boss.em;
    document.getElementById('bi-title').textContent = st.boss.title;
    document.getElementById('bi-sub').textContent   =
      `You've completed all ${st.short} lessons! Defeat ${st.boss.name} to advance!`;
  
    document.getElementById('boss-intro').style.display = 'flex';
    go('boss');
  }
  
  // ── Begin the actual fight after intro ──────────────────────
  function beginBoss() {
    document.getElementById('boss-intro').style.display = 'none';
  
    const st   = STAGES[BS.stageIdx];
    const bank = [...QBANK[st.bank]];
  
    // Shuffle all 25 questions, pick first 20
    for (let i = bank.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [bank[i], bank[j]] = [bank[j], bank[i]];
    }
  
    BS.questions = bank.slice(0, 20);
    BS.qi        = 0;
    BS.playerHP  = 100;
    BS.bossHP    = 100;
    BS.score     = 0;
    BS.answered  = false;
    BS.wrongQs   = [];
  
    document.getElementById('boss-nav-stage').textContent  = st.name;
    document.getElementById('boss-stage-name').textContent = st.boss.title;
    document.getElementById('boss-name-label').textContent =
      st.boss.name.replace(/^\S+\s/, '').toUpperCase();
    document.getElementById('boss-em').textContent = st.boss.em;
  
    renderBossQ();
  }
  
  // ── Render current boss question ─────────────────────────────
  function renderBossQ() {
    BS.answered = false;
  
    const q = BS.questions[BS.qi];
    if (!q) return;
  
    document.getElementById('boss-qnum').textContent =
      `Question ${BS.qi + 1} / ${BS.questions.length}`;
  
    // Update HP bars
    const pp = Math.max(0, BS.playerHP);
    const bp = Math.max(0, BS.bossHP);
  
    document.getElementById('php').style.width  = pp + '%';
    document.getElementById('bhp').style.width  = bp + '%';
    document.getElementById('php-num').textContent = pp;
    document.getElementById('bhp-num').textContent = bp;
  
    // Change player HP bar colour based on health
    const phpEl = document.getElementById('php');
    if (pp > 60) {
      phpEl.style.background = 'linear-gradient(90deg,var(--gn),var(--gl))';
    } else if (pp > 30) {
      phpEl.style.background = 'linear-gradient(90deg,#b8860b,var(--yw))';
    } else {
      phpEl.style.background = 'linear-gradient(90deg,var(--rd),var(--rl))';
    }
  
    // Question text
    document.getElementById('boss-qtxt').textContent = q.q;
  
    // Optional context code
    const ctx = document.getElementById('boss-context');
    if (q.ctx) {
      ctx.textContent = q.ctx;
      ctx.classList.add('vis');
    } else {
      ctx.textContent = '';
      ctx.classList.remove('vis');
    }
  
    // Build the code editor
    makeEditor('boss-editor-mount', q.placeholder || '# type your Python code here', 'submitBossA()');
  
    // Reset feedback and Next button
    const fb = document.getElementById('boss-fb');
    fb.className = 'fb-panel';
    fb.innerHTML = '';
    document.getElementById('boss-next').style.display = 'none';
  }
  
  // ── Handle boss answer submission ────────────────────────────
  function submitBossA() {
    if (BS.answered) return;
  
    const userInput = getEditorValue('boss-editor-mount');
  
    // Empty check
    if (!userInput.trim()) {
      setEditorState('boss-editor-mount', 'wrong');
      setTimeout(() => setEditorState('boss-editor-mount', ''), 600);
      return;
    }
  
    BS.answered   = true;
    const q       = BS.questions[BS.qi];
    const correct = checkAnswer(userInput, q);
  
    if (correct) {
      BS.score++;
      BS.bossHP = Math.max(0, BS.bossHP - 5);
      setEditorState('boss-editor-mount', 'correct');
  
      // Player attack animation
      document.getElementById('player-em').style.animation = 'heroAtk .4s ease';
      spawnDmg('-5 HP', '#7ddf95', true);
      setTimeout(() => {
        document.getElementById('player-em').style.animation = 'floatBob 2s ease-in-out infinite';
      }, 500);
  
    } else {
      BS.wrongQs.push({ q, yourA: userInput });
      BS.playerHP = Math.max(0, BS.playerHP - 5);
      setEditorState('boss-editor-mount', 'wrong');
  
      // Boss attack animation
      document.getElementById('boss-em').style.animation    = 'bossAtk .4s ease';
      document.getElementById('player-em').style.animation  = 'dmgFlash .4s ease';
      spawnDmg('-5 HP', '#ff6b7a', false);
      setTimeout(() => {
        document.getElementById('boss-em').style.animation   = 'floatBob 2s ease-in-out infinite';
        document.getElementById('player-em').style.animation = 'floatBob 2s ease-in-out infinite';
      }, 500);
    }
  
    setEditorDisabled('boss-editor-mount', true);
    renderFeedback('boss-fb', correct, q, userInput);
  
    // Show Next button
    const nx = document.getElementById('boss-next');
    nx.style.display = 'block';
    nx.textContent   = BS.qi === BS.questions.length - 1 ? '⚔️ FINAL BLOW!' : 'NEXT ▶';
  }
  
  // ── Damage number float animation ───────────────────────────
  function spawnDmg(txt, color, onBoss) {
    const d = document.createElement('div');
    d.className       = 'boss-dmg';
    d.textContent     = txt;
    d.style.color     = color;
    d.style.top       = '25%';
    d.style.left      = onBoss ? '62%' : '8%';
    document.querySelector('.boss-page').appendChild(d);
    setTimeout(() => d.remove(), 1000);
  }
  
  // ── Move to next boss question or end fight ──────────────────
  function nextBossQ() {
    BS.qi++;
    if (BS.qi < BS.questions.length) {
      renderBossQ();
      return;
    }
    endBoss();
  }
  
  // ── End boss fight — show result screen ─────────────────────
  function endBoss() {
    const pct    = Math.round((BS.score / BS.questions.length) * 100);
    const passed = pct >= 80;
    const st     = STAGES[BS.stageIdx];
  
    document.getElementById('boss-result').style.display = 'flex';
  
    const card = document.getElementById('br-card');
    card.className = passed ? 'br-card' : 'br-card fail';
  
    document.getElementById('br-em').textContent    = passed ? '🏆' : '💔';
    document.getElementById('br-title').textContent = passed
      ? `${st.boss.name} Defeated!`
      : 'The Boss Won...';
  
    const scoreEl = document.getElementById('br-score');
    scoreEl.textContent = `${BS.score}/20 — ${pct}%`;
    scoreEl.className   = passed ? 'br-score' : 'br-score fail';
  
    const btns = document.getElementById('br-btns');
    btns.innerHTML = '';
  
    if (passed) {
      document.getElementById('br-msg').textContent =
        `Incredible! ${pct}% — you proved your ${st.short} mastery! ` +
        (BS.stageIdx < 2 ? 'Next stage unlocked!' : 'You are a TRUE Python Master!') +
        ' 🍓🏆';
  
      // Award badge & advance stage
      if (!D.badges.includes(BS.stageIdx)) D.badges.push(BS.stageIdx);
      D.bossesBeaten++;
      D.xp = Math.min(D.xp + 50, 300);
      if (D.bestBossScore === null || pct > D.bestBossScore) D.bestBossScore = pct;
      if (!D.stagesCleared.includes(BS.stageIdx)) D.stagesCleared.push(BS.stageIdx);
      D.lessonProgress[BS.stageIdx] = 100;
  
      if (BS.stageIdx < 2) {
        D.currentStage  = BS.stageIdx + 1;
        D.currentLesson = 1;
        D.bossUnlocked[BS.stageIdx + 1] = false;
      }
      saveDash();
  
      document.getElementById('br-badges').innerHTML =
        `<span class="br-badge">${BDG_LIST[BS.stageIdx]}</span>` +
        `<span class="br-badge" style="animation-delay:.15s">🏆</span>` +
        `<span class="br-badge" style="animation-delay:.3s">⭐</span>`;
  
      const btn = document.createElement('button');
      btn.className   = 'btn btn-yw';
      btn.textContent = '🎉 Continue!';
      btn.onclick = () => {
        document.getElementById('boss-result').style.display = 'none';
        go('dashboard');
        renderDash();
        showLU(BS.stageIdx);
      };
      btns.appendChild(btn);
  
    } else {
      // Failed
      D.bossRetries++;
      if (D.bestBossScore === null || pct > D.bestBossScore) D.bestBossScore = pct;
      saveDash();
  
      document.getElementById('br-msg').textContent =
        `You scored ${pct}% — need 80% (16/20). Don't give up! ` +
        `Review your mistakes and try again! 🍓`;
      document.getElementById('br-badges').innerHTML = '';
  
      const b1 = document.createElement('button');
      b1.className   = 'btn btn-r';
      b1.textContent = '📚 Review Mistakes';
      b1.onclick = () => {
        document.getElementById('boss-result').style.display = 'none';
        showReview();
      };
  
      const b2 = document.createElement('button');
      b2.className        = 'btn btn-o';
      b2.style.fontSize   = '.55rem';
      b2.textContent      = '🔄 Retry Now';
      b2.onclick = () => {
        document.getElementById('boss-result').style.display = 'none';
        launchBoss(BS.stageIdx);
      };
  
      btns.appendChild(b1);
      btns.appendChild(b2);
    }
  }
