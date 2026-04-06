// ============================================================
// main.js
// PyBerry Gaming — Shared Helpers, Storage, Constants
// Load this FIRST on every page
// ============================================================

// ── Stage config ─────────────────────────────────────────────
const STAGES = [
  {
    name:  '🌱 Beginner Stage',
    short: 'Beginner',
    boss:  { name: '🍄 Mushroom King',  em: '🍄', title: 'BEGINNER BOSS FIGHT!'      },
    bank:  'beginner'
  },
  {
    name:  '⚡ Intermediate Stage',
    short: 'Intermediate',
    boss:  { name: '🐉 Data Dragon',    em: '🐉', title: 'INTERMEDIATE BOSS FIGHT!'  },
    bank:  'intermediate'
  },
  {
    name:  '👑 Master Stage',
    short: 'Master',
    boss:  { name: '🤖 Python Overlord',em: '🤖', title: 'FINAL BOSS FIGHT!'         },
    bank:  'master'
  }
];

const BDG_LIST  = ['🌱', '⚡', '👑', '💎', '🏆', '⭐'];
const BDG_NAMES = ['Beginner Slayer', 'Speed Coder', 'Master Python', 'Diamond Coder', 'Champion', 'Legend'];

const QUOTES = [
  "Every expert was once a beginner! 🌱",
  "Bugs are undiscovered features! 🍓",
  "One line at a time, you'll get there! 💪",
  "Mistakes prove you're trying! 🍓",
  "The boss is scared of you! 💪⚔️",
  "Code never lies, comments sometimes do! 😄",
  "You're literally coding right now. That's awesome! 🔥"
];

const MOTIV = [
  { t: "🍓 You wrote real code!",  m: "Look at you — an actual Pythonista! 🔥✨" },
  { t: "✨ Incredible!",           m: "Berry is SO proud! 🍓 You're getting better every line!" },
  { t: "💪 Don't stop now!",       m: "You're in the zone! Every line teaches your brain! 🌟" },
  { t: "🏆 Amazing!",              m: "Future-you is already proud of what you're doing! 🍓" }
];

// ── localStorage helpers ──────────────────────────────────────
const UK = 'pyb_users';
const SK = 'pyb_sess';

const getUsers  = () => JSON.parse(localStorage.getItem(UK) || '[]');
const saveUsers = u  => localStorage.setItem(UK, JSON.stringify(u));
const getSess   = () => { const r = localStorage.getItem(SK); return r ? JSON.parse(r) : null; };
const saveSess  = u  => localStorage.setItem(SK, JSON.stringify(u));

// ── Popup helpers ─────────────────────────────────────────────
function showM(t, m) {
  const pti = document.getElementById('pti');
  const pms = document.getElementById('pms');
  const pov = document.getElementById('pov');
  const mpop = document.getElementById('mpop');
  if (pti)  pti.textContent  = t;
  if (pms)  pms.textContent  = m;
  if (pov)  pov.classList.add('on');
  if (mpop) mpop.classList.add('on');
}

function hideM() {
  const pov  = document.getElementById('pov');
  const mpop = document.getElementById('mpop');
  if (pov)  pov.classList.remove('on');
  if (mpop) mpop.classList.remove('on');
}

function showLU(si) {
  const msgs = [
    "You are a LEGEND! 🍓🔥 Stage cleared!",
    "Stage defeated! Your Python skills are REAL! 🌱",
    "That boss never stood a chance! 🏆",
    "CLEARED! 🍓💪 Berry is so happy right now!"
  ];
  const lue  = document.getElementById('lue');
  const lut  = document.getElementById('lut');
  const lum  = document.getElementById('lum');
  const lub  = document.getElementById('lub');
  const lupop = document.getElementById('lupop');
  if (lue)   lue.textContent   = STAGES[si].boss.em;
  if (lut)   lut.textContent   = `${STAGES[si].short} Stage Cleared!`;
  if (lum)   lum.textContent   = msgs[si] || msgs[0];
  if (lub)   lub.textContent   = (BDG_LIST[si] || '🍓').repeat(3);
  if (lupop) lupop.classList.add('on');
}

function hideLU() {
  const lupop = document.getElementById('lupop');
  if (lupop) lupop.classList.remove('on');
}

// ── Animated background (stars + floating emoji) ─────────────
(function initBg() {
  const stars = document.getElementById('stars');
  if (stars) {
    for (let i = 0; i < 100; i++) {
      const e = document.createElement('div');
      e.className = 'star';
      const z = Math.random() * 2.5 + 0.5;
      e.style.cssText = `width:${z}px;height:${z}px;top:${Math.random()*100}%;left:${Math.random()*100}%`;
      e.style.setProperty('--d', (Math.random() * 3 + 2) + 's');
      e.style.animationDelay = Math.random() * 5 + 's';
      stars.appendChild(e);
    }
  }
  const pix = document.getElementById('pix');
  if (pix) {
    ['🍓','🍓','✨','🎮','🍓','⚡','🌟','🍀'].forEach((em, i) => {
      const d = document.createElement('div');
      d.className   = 'px';
      d.textContent = em;
      d.style.left  = Math.random() * 100 + '%';
      d.style.fontSize = (Math.random() * 0.8 + 0.9) + 'rem';
      d.style.setProperty('--d', (Math.random() * 10 + 8) + 's');
      d.style.animationDelay = (i * 1.3) + 's';
      pix.appendChild(d);
    });
  }
})();
