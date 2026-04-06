/* ============================================
   login.js — Pygame 🎮
   Connected to PocketBase
   Author: Nur Myra Qistina
   ============================================ */

   const PB_URL = 'http://127.0.0.1:8090';

   // ── Stars + floating emojis ──────────────────
   function generateStars() {
     const container = document.getElementById('stars');
     if (!container) return;
     for (let i = 0; i < 100; i++) {
       const star = document.createElement('div');
       star.className = 'star';
       const size = Math.random() * 2.5 + 0.5;
       star.style.width  = size + 'px';
       star.style.height = size + 'px';
       star.style.top    = Math.random() * 100 + '%';
       star.style.left   = Math.random() * 100 + '%';
       star.style.setProperty('--dur', (Math.random() * 3 + 2) + 's');
       star.style.animationDelay = Math.random() * 5 + 's';
       container.appendChild(star);
     }
   }
   
   function generatePixels() {
     const emojis    = ['🍓', '🍓', '✨', '🎮', '🍓', '⚡', '🌟', '🍓'];
     const container = document.getElementById('pixels');
     if (!container) return;
     emojis.forEach((emoji, i) => {
       const p = document.createElement('div');
       p.className    = 'pixel-deco';
       p.textContent  = emoji;
       p.style.left   = Math.random() * 100 + '%';
       p.style.fontSize = (Math.random() * 0.8 + 0.9) + 'rem';
       p.style.setProperty('--d', (Math.random() * 10 + 8) + 's');
       p.style.animationDelay = (i * 1.3) + 's';
       container.appendChild(p);
     });
   }
   
   // ── Password toggle ──────────────────────────
   function setupPasswordToggle(btnId, inputId) {
     const btn   = document.getElementById(btnId);
     const input = document.getElementById(inputId);
     if (!btn || !input) return;
     btn.addEventListener('click', () => {
       const isHidden  = input.type === 'password';
       input.type      = isHidden ? 'text' : 'password';
       btn.textContent = isHidden ? '🙈' : '👁️';
     });
   }
   
   // ── Shake helper ─────────────────────────────
   function shake(el) {
     el.style.animation = 'none';
     el.offsetHeight;
     el.style.animation   = 'shake 0.4s ease';
     el.style.borderColor = '#e8294a';
     el.style.boxShadow   = '0 0 0 3px rgba(232,41,74,0.3)';
     setTimeout(() => {
       el.style.borderColor = '';
       el.style.boxShadow   = '';
     }, 1500);
   }
   
   // ── Show / hide error ─────────────────────────
   function showError(msg) {
     let el = document.getElementById('loginError');
     if (!el) {
       el = document.createElement('div');
       el.id = 'loginError';
       el.style.cssText = `
         color:#ff6b7a; font-size:0.82rem; font-weight:800;
         text-align:center; margin-top:0.5rem; padding:0.5rem;
         background:rgba(232,41,74,0.1); border-radius:8px;
         border:1px solid rgba(232,41,74,0.3);
       `;
       const btn = document.getElementById('loginBtn');
       if (btn) btn.parentNode.insertBefore(el, btn.nextSibling);
     }
     el.textContent   = msg;
     el.style.display = 'block';
   }
   
   function hideError() {
     const el = document.getElementById('loginError');
     if (el) el.style.display = 'none';
   }
   
   // ── LOGIN ─────────────────────────────────────
   function setupLogin() {
     const btn     = document.getElementById('loginBtn');
     const emailEl = document.getElementById('email');
     const passEl  = document.getElementById('password');
     if (!btn) return;
   
     btn.addEventListener('click', doLogin);
     [emailEl, passEl].forEach(el => {
       if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
     });
   }
   
   async function doLogin() {
     const emailEl = document.getElementById('email');
     const passEl  = document.getElementById('password');
     const btn     = document.getElementById('loginBtn');
   
     hideError();
   
     const email = emailEl.value.trim();
     const pass  = passEl.value;
   
     if (!email) { shake(emailEl); showError('❌ Please enter your email!'); return; }
     if (!pass)  { shake(passEl);  showError('❌ Please enter your password!'); return; }
   
     btn.textContent = '⏳ LOADING...';
     btn.disabled    = true;
   
     try {
       // Authenticate with PocketBase
       const res = await fetch(PB_URL + '/api/collections/users/auth-with-password', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ identity: email, password: pass })
       });
   
       const data = await res.json();
   
       if (!res.ok) {
         btn.textContent = '▶ LOGIN';
         btn.disabled    = false;
         shake(emailEl);
         showError('❌ Wrong email or password! Try again. 🍓');
         return;
       }
   
       // Save session to localStorage
       localStorage.setItem('pyb_sess', JSON.stringify({
         id:       data.record.id,
         email:    data.record.email,
         username: data.record.name || data.record.email.split('@')[0],
         token:    data.token,
         gd:       data.record.gamedata || {}
       }));
   
       btn.textContent = '✅ SUCCESS!';
       setTimeout(() => { window.location.href = 'dashboard.html'; }, 500);
   
     } catch (err) {
       btn.textContent = '▶ LOGIN';
       btn.disabled    = false;
       showError('❌ Cannot connect to server. Is PocketBase running? 🍓');
     }
   }
   
   // ── Shake keyframes ───────────────────────────
   const shakeStyle = document.createElement('style');
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
   
   // ── Init ──────────────────────────────────────
   document.addEventListener('DOMContentLoaded', () => {
      
   
     generateStars();
     generatePixels();
     setupPasswordToggle('togglePw', 'password');
     setupLogin();
   });
