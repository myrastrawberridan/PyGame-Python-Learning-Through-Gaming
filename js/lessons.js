// ============================================================
// lesson.js
// PyBerry Gaming — Lesson Engine
// Depends on: questions.js, main.js
// ============================================================

// Lesson state
let LS = {
    stageIdx:  0,
    lessonNum: 0,
    questions: [],
    qi:        0,
    score:     0,
    answered:  false,
    wrongQs:   []
  };
  
  // ── Start a lesson ──────────────────────────────────────────
  function startLesson(stageIdx, lessonNum) {
    const safeStage  = Math.max(0, Math.min(2, stageIdx  ?? D.currentStage));
    const safeLesson = Math.max(1, Math.min(25, lessonNum ?? D.currentLesson));
  
    LS = {
      stageIdx:  safeStage,
      lessonNum: safeLesson,
      questions: [],
      qi:        0,
      score:     0,
      answered:  false,
      wrongQs:   []
    };
  
    // Pick 5 questions for this lesson (cycle through the bank)
    const bank  = QBANK[STAGES[safeStage].bank];
    const start = ((safeLesson - 1) * 5) % bank.length;
    for (let i = 0; i < 5; i++) {
      LS.questions.push(bank[(start + i) % bank.length]);
    }
  
    const st = STAGES[safeStage];
    document.getElementById('lesson-nav-lbl').textContent   = `📚 ${st.short} Lesson ${safeLesson}`;
    document.getElementById('lesson-nav-stage').textContent = st.name;
  
    go('lesson');
    renderLessonQ();
  }
  
  // ── Render the current question ─────────────────────────────
  function renderLessonQ() {
    LS.answered = false;
  
    const q   = LS.questions[LS.qi];
    if (!q) return;
    const tot = LS.questions.length;
  
    // Progress bar
    const pct = Math.round((LS.lessonNum / 25) * 100);
    document.getElementById('lp-pct').textContent    = `Lesson ${LS.lessonNum} / 25`;
    document.getElementById('lp-fill').style.width   = pct + '%';
    document.getElementById('lp-qnum').textContent   = `Question ${LS.qi + 1} of ${tot}`;
  
    // Difficulty badge
    const diffs = ['easy', 'easy', 'med', 'med', 'hard'];
    const dlbls = ['🌱 Easy', '🌱 Easy', '⚡ Medium', '⚡ Medium', '🔥 Hard'];
    const dEl   = document.getElementById('lp-diff');
    dEl.textContent  = dlbls[LS.qi] || '🌱 Easy';
    dEl.className    = 'lp-diff ' + (diffs[LS.qi] || 'easy');
  
    // Question text
    document.getElementById('lp-qtxt').textContent = q.q;
  
    // Optional context code block
    const ctx = document.getElementById('lp-context');
    if (q.ctx) {
      ctx.textContent = q.ctx;
      ctx.classList.add('vis');
    } else {
      ctx.textContent = '';
      ctx.classList.remove('vis');
    }
  
    // Build the code editor
    makeEditor('lp-editor-mount', q.placeholder || '# type your Python code here', 'submitLessonA()');
  
    // Reset feedback panel and Next button
    const fb = document.getElementById('lp-fb');
    fb.className = 'fb-panel';
    fb.innerHTML = '';
    document.getElementById('lp-next').style.display = 'none';
  }
  
  // ── Handle answer submission ─────────────────────────────────
  function submitLessonA() {
    if (LS.answered) return;
  
    const userInput = getEditorValue('lp-editor-mount');
  
    // Empty check
    if (!userInput.trim()) {
      setEditorState('lp-editor-mount', 'wrong');
      setTimeout(() => setEditorState('lp-editor-mount', ''), 600);
      return;
    }
  
    LS.answered = true;
    const q       = LS.questions[LS.qi];
    const correct = checkAnswer(userInput, q);
  
    if (correct) {
      LS.score++;
      setEditorState('lp-editor-mount', 'correct');
    } else {
      LS.wrongQs.push({ q, yourA: userInput });
      setEditorState('lp-editor-mount', 'wrong');
    }
  
    setEditorDisabled('lp-editor-mount', true);
    renderFeedback('lp-fb', correct, q, userInput);
  
    // Show Next button
    const nx    = document.getElementById('lp-next');
    nx.style.display = 'block';
    nx.textContent   = LS.qi === LS.questions.length - 1 ? 'FINISH LESSON ✓' : 'NEXT ▶';
  }
  
  // ── Move to next question or finish ─────────────────────────
  function nextLessonQ() {
    LS.qi++;
    if (LS.qi < LS.questions.length) {
      renderLessonQ();
      return;
    }
    finishLesson();
  }
  
  // ── Finish lesson and return to dashboard ───────────────────
  function finishLesson() {
    D.lessonsCompleted++;
    D.xp = Math.min(D.xp + 10, 300);
    D.lessonProgress[LS.stageIdx] = Math.min(Math.round((LS.lessonNum / 25) * 100), 100);
  
    // Advance lesson counter only if this was the current active lesson
    if (LS.lessonNum < 25) {
      if (LS.stageIdx === D.currentStage && LS.lessonNum === D.currentLesson) {
        D.currentLesson++;
      }
    } else {
      // All 25 done — unlock the boss for this stage
      if (LS.stageIdx === D.currentStage) {
        D.bossUnlocked[D.currentStage] = true;
        D.lessonProgress[D.currentStage] = 100;
      }
    }
  
    saveDash();
    go('dashboard');
    renderDash();
  
    if (D.bossUnlocked[D.currentStage] && !D.stagesCleared.includes(D.currentStage)) {
      setTimeout(() =>
        showM('🎉 All Lessons Done!',
          `Boss Fight UNLOCKED! ⚔️ Defeat ${STAGES[D.currentStage].boss.name} to advance!`
        ), 500);
    } else {
      const m = MOTIV[Math.floor(Math.random() * MOTIV.length)];
      setTimeout(() => showM(m.t, m.m), 400);
    }
  }
