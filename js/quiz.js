/* ============================================
   quiz.js — PyBerry Gaming
   🍓 Strawberry Gaming Theme
   Author: Nur Myra Qistina
   ============================================ */

// ═══════════════════════════════════════════
// 15 QUESTIONS — Easy → Medium → Hard
// ═══════════════════════════════════════════
const questions = [
    // ── BEGINNER (Q1–Q5) ─────────────────────
    {
      level: 'beginner',
      text: 'Which of the following is the correct way to print "Hello, World!" in Python?',
      code: null,
      options: [
        'print("Hello, World!")',
        'echo("Hello, World!")',
        'console.log("Hello, World!")',
        'printf("Hello, World!")'
      ],
      answer: 0
    },
    {
      level: 'beginner',
      text: 'What data type is the value 42 in Python?',
      code: null,
      options: ['str', 'float', 'int', 'bool'],
      answer: 2
    },
    {
      level: 'beginner',
      text: 'How do you create a variable called "name" with the value "Berry" in Python?',
      code: null,
      options: [
        'var name = "Berry"',
        'name = "Berry"',
        'string name = "Berry"',
        'let name = "Berry"'
      ],
      answer: 1
    },
    {
      level: 'beginner',
      text: 'What is the output of this code?',
      code: 'x = 5\ny = 3\nprint(x + y)',
      options: ['53', '8', '5 + 3', 'Error'],
      answer: 1
    },
    {
      level: 'beginner',
      text: 'Which symbol is used for single-line comments in Python?',
      code: null,
      options: ['//', '/* */', '#', '--'],
      answer: 2
    },
  
    // ── INTERMEDIATE (Q6–Q10) ─────────────────
    {
      level: 'inter',
      text: 'What will this code output?',
      code: 'fruits = ["🍓", "🍊", "🍋"]\nprint(fruits[1])',
      options: ['🍓', '🍊', '🍋', 'Error'],
      answer: 1
    },
    {
      level: 'inter',
      text: 'What does the "len()" function do in Python?',
      code: null,
      options: [
        'Converts a value to a string',
        'Returns the length of an object',
        'Deletes a variable',
        'Loops through a list'
      ],
      answer: 1
    },
    {
      level: 'inter',
      text: 'What is the output of this code?',
      code: 'for i in range(3):\n    print(i)',
      options: ['1 2 3', '0 1 2 3', '0 1 2', '1 2'],
      answer: 2
    },
    {
      level: 'inter',
      text: 'Which of the following correctly defines a function in Python?',
      code: null,
      options: [
        'function greet():',
        'def greet():',
        'define greet():',
        'func greet():'
      ],
      answer: 1
    },
    {
      level: 'inter',
      text: 'What is the output of this code?',
      code: 'x = 10\nif x > 5:\n    print("Big")\nelse:\n    print("Small")',
      options: ['Small', 'Big', 'Error', 'Nothing'],
      answer: 1
    },
  
    // ── ADVANCED (Q11–Q15) ────────────────────
    {
      level: 'advanced',
      text: 'What does this list comprehension produce?',
      code: 'result = [x**2 for x in range(1, 5)]\nprint(result)',
      options: [
        '[1, 2, 3, 4]',
        '[1, 4, 9, 16]',
        '[2, 4, 6, 8]',
        '[0, 1, 4, 9]'
      ],
      answer: 1
    },
    {
      level: 'advanced',
      text: 'What is the output of this code?',
      code: 'def add(a, b=10):\n    return a + b\n\nprint(add(5))',
      options: ['5', '10', '15', 'Error'],
      answer: 2
    },
    {
      level: 'advanced',
      text: 'Which method is used to remove and return the last item from a list?',
      code: null,
      options: ['.remove()', '.delete()', '.pop()', '.discard()'],
      answer: 2
    },
    {
      level: 'advanced',
      text: 'What will this code output?',
      code: 'my_dict = {"a": 1, "b": 2, "c": 3}\nprint(list(my_dict.keys()))',
      options: [
        '[1, 2, 3]',
        '["a", "b", "c"]',
        '{a, b, c}',
        'Error'
      ],
      answer: 1
    },
    {
      level: 'advanced',
      text: 'What does this lambda function do?',
      code: 'square = lambda x: x * x\nprint(square(4))',
      options: ['Prints 4', 'Prints 8', 'Prints 16', 'Error'],
      answer: 2
    }
  ];
  
  // ═══════════════════════════════════════════
  // STATE
  // ═══════════════════════════════════════════
  let currentQ = 0;
  let score    = 0;
  let answered = false;
  
  // ═══════════════════════════════════════════
  // BACKGROUND EFFECTS
  // ═══════════════════════════════════════════
  function generateStars() {
    const container = document.getElementById('stars');
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = Math.random() * 2.5 + 0.5;
      star.style.width          = size + 'px';
      star.style.height         = size + 'px';
      star.style.top            = Math.random() * 100 + '%';
      star.style.left           = Math.random() * 100 + '%';
      star.style.setProperty('--dur', (Math.random() * 3 + 2) + 's');
      star.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(star);
    }
  }
  
  function generatePixels() {
    const emojis = ['🍓', '🍓', '✨', '🎮', '🍓', '⚡', '🌟', '🍀'];
    const container = document.getElementById('pixels');
    emojis.forEach((emoji, i) => {
      const p = document.createElement('div');
      p.className      = 'pixel-deco';
      p.textContent    = emoji;
      p.style.left     = Math.random() * 100 + '%';
      p.style.fontSize = (Math.random() * 0.8 + 0.9) + 'rem';
      p.style.setProperty('--d', (Math.random() * 10 + 8) + 's');
      p.style.animationDelay = (i * 1.3) + 's';
      container.appendChild(p);
    });
  }
  
  // ═══════════════════════════════════════════
  // SCREEN SWITCHER
  // ═══════════════════════════════════════════
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }
  
  // ═══════════════════════════════════════════
  // RENDER QUESTION
  // ═══════════════════════════════════════════
  function renderQuestion() {
    answered = false;
    const q     = questions[currentQ];
    const total = questions.length;
    const pct   = (currentQ / total) * 100;
  
    // Counter + progress bar
    document.getElementById('qCounter').textContent     = `Question ${currentQ + 1} / ${total}`;
    document.getElementById('progressFill').style.width = pct + '%';
    document.getElementById('berryTrail').style.marginLeft = `calc(${pct}% - 10px)`;
  
    // Difficulty badge
    const badge  = document.getElementById('diffBadge');
    const labels = {
      beginner: '🌱 Beginner',
      inter:    '⚡ Intermediate',
      advanced: '🔥 Advanced'
    };
    badge.textContent = labels[q.level];
    badge.className   = 'diff-badge ' + q.level;
  
    // Question text
    document.getElementById('questionText').textContent = q.text;
  
    // Code block — only visible if question has code
    const codeEl = document.getElementById('codeBlock');
    if (q.code) {
      codeEl.textContent = q.code;
      codeEl.classList.add('visible');
    } else {
      codeEl.textContent = '';
      codeEl.classList.remove('visible');
    }
  
    // Build option buttons
    const grid = document.getElementById('optionsGrid');
    grid.innerHTML = '';
    q.options.forEach((opt, i) => {
      const btn       = document.createElement('button');
      btn.className   = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => selectAnswer(i));
      grid.appendChild(btn);
    });
  
    // Hide next button until an answer is chosen
    document.getElementById('nextBtn').style.display = 'none';
  }
  
  // ═══════════════════════════════════════════
  // SELECT ANSWER
  // ═══════════════════════════════════════════
  function selectAnswer(index) {
    if (answered) return;
    answered = true;
  
    const q       = questions[currentQ];
    const buttons = document.querySelectorAll('.option-btn');
  
    // Disable all + highlight correct / wrong
    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.answer)                    btn.classList.add('correct');
      if (i === index && index !== q.answer) btn.classList.add('wrong');
    });
  
    // Increment score if correct
    if (index === q.answer) score++;
  
    // Show next / results button
    const nextBtn         = document.getElementById('nextBtn');
    nextBtn.style.display = 'inline-flex';
    nextBtn.textContent   = currentQ === questions.length - 1
      ? 'SEE RESULTS 🍓'
      : 'NEXT ▶';
  }
  
  // ═══════════════════════════════════════════
  // NEXT QUESTION
  // ═══════════════════════════════════════════
  function nextQuestion() {
    currentQ++;
    if (currentQ < questions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  }
  
  // ═══════════════════════════════════════════
  // SHOW RESULT
  // ═══════════════════════════════════════════
  function showResult() {
    showScreen('screen-result');
  
    document.getElementById('scoreNum').textContent = score;
  
    // ── Determine level based on score ──
    let level, levelClass, emoji, title, msg, badges, confetti;
  
    if (score <= 5) {
      level      = '🌱 BEGINNER';
      levelClass = 'beginner';
      emoji      = '🍓';
      title      = 'Congratulations!';
      msg        = 'Aww, look at you taking the very first step! 🍓 You\'re a <strong>fresh little strawberry seed</strong> just starting to sprout! Don\'t worry — every Python master started exactly where you are right now. Your adventure begins at <strong>Beginner Level</strong>, where we\'ll plant the seeds of coding knowledge together! 🌱✨';
      badges     = ['🌱', '🍓', '🎮', '⭐'];
      confetti   = ['🍓', '🌱', '✨', '🍓', '💚', '🌟'];
  
    } else if (score <= 10) {
      level      = '⚡ INTERMEDIATE';
      levelClass = 'inter';
      emoji      = '🍓';
      title      = 'Congratulations!';
      msg        = 'Ooh, not bad at all, smarty! 🍓 You\'re a <strong>half-ripe strawberry</strong> — sweet, getting there, and absolutely full of potential! You clearly know your way around Python but there\'s still some juicy knowledge ahead! Starting at <strong>Intermediate Level</strong>. Let\'s get even sweeter! 🍓⚡';
      badges     = ['⚡', '🍓', '🏆', '🌟', '🎮'];
      confetti   = ['🍓', '⚡', '✨', '🏆', '💛', '🌟'];
  
    } else {
      level      = '🔥 ADVANCED';
      levelClass = 'advanced';
      emoji      = '🍓';
      title      = 'Congratulations!';
      msg        = 'WOAH, hold on — are you secretly a Python genius?! 🍓🔥 You\'re a <strong>perfectly ripe, glowing red strawberry</strong> sitting right at the top of the patch! You blew through those questions like a total pro! Starting at <strong>Advanced Level</strong> because clearly, you are built different! 🏆✨';
      badges     = ['🔥', '🏆', '🍓', '💎', '⭐', '🌟'];
      confetti   = ['🍓', '🔥', '✨', '🏆', '❤️', '💎'];
    }
  
    // ── Populate result screen ──
    document.getElementById('resultEmoji').textContent = emoji;
    document.getElementById('resultTitle').textContent = title;
    document.getElementById('resultMsg').innerHTML     = msg;
  
    const levelEl       = document.getElementById('resultLevel');
    levelEl.textContent = level;
    levelEl.className   = 'result-level ' + levelClass;
  
    // Confetti row
    const confettiRow     = document.getElementById('confettiRow');
    confettiRow.innerHTML = confetti.map(e => `<span>${e}</span>`).join('');
  
    // Badges with staggered pop animation
    const badgesEl     = document.getElementById('resultBadges');
    badgesEl.innerHTML = badges.map((b, i) =>
      `<span class="badge" style="animation-delay:${0.5 + i * 0.1}s">${b}</span>`
    ).join('');
  
    // Result label
    const labelEl       = document.getElementById('resultLabel');
    labelEl.textContent = score >= 11
      ? '🏆 AMAZING RESULT!'
      : score >= 6
        ? '🌟 GREAT JOB!'
        : '🍓 YOU DID IT!';
  }
  
  // ═══════════════════════════════════════════
  // SHAKE KEYFRAMES (injected dynamically)
  // ═══════════════════════════════════════════
  const shakeStyle       = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%       { transform: translateX(-6px); }
      40%       { transform: translateX(6px); }
      60%       { transform: translateX(-4px); }
      80%       { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(shakeStyle);
  
  // ═══════════════════════════════════════════
  // INIT — runs when DOM is ready
  // ═══════════════════════════════════════════
  document.addEventListener('DOMContentLoaded', () => {
    generateStars();
    generatePixels();
  
    // ── Start button ──
    document.getElementById('startBtn').addEventListener('click', () => {
      showScreen('screen-quiz');
      renderQuestion();
    });
  
    // ── Next / See Results button ──
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
  
    // ── Let's Begin! button — redirects to dashboard ──
    document.getElementById('beginBtn').addEventListener('click', () => {
      window.location.href = 'dashboard.html';
    });
  
    // ── Retake quiz link — resets everything ──
    document.getElementById('retryLink').addEventListener('click', (e) => {
      e.preventDefault();
      currentQ = 0;
      score    = 0;
      answered = false;
      showScreen('screen-intro');
    });
  });
