/* ============================================
   register.js — Pygame 🎮
   Connected to PocketBase
   Author: Nur Myra Qistina
   ============================================ */

   const PB_URL = 'http://127.0.0.1:8090';

   function generateStars() {
     const container = document.getElementById('stars');
     if (!container) return;
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
     const emojis    = ['🍓', '🍓', '✨', '🎉', '🍓', '⚡', '🌟', '🎮'];
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
   
   function setupPasswordStrength() {
     const input = document.getElementById('password');
     const fill  = document.getElementById('strengthFill');
     const label = document.getElementById('strengthLabel');
     if (!input || !fill || !label) return;
   
     input.addEventListener('input', () => {
       const val = input.value;
       let score = 0;
       if (val.length >= 8)          score++;
       if (/[A-Z]/.test(val))        score++;
       if (/[0-9]/.test(val))        score++;
       if (/[^A-Za-z0-9]/.test(val)) score++;
   
       const levels = [
         { pct:'0%',   color:'',        text:'' },
         { pct:'25%',  color:'#e8294a', text:'🔴 Too weak' },
         { pct:'50%',  color:'#ffd166', text:'🟡 Okay' },
         { pct:'75%',  color:'#ff8fa3', text:'🟠 Good' },
         { pct:'100%', color:'#7ddf95', text:'🟢 Strong!' }
       ];
   
       const lvl = levels[score] || levels[0];
       fill.style.width      = val.length === 0 ? '0%' : lvl.pct;
       fill.style.background = lvl.color;
       label.textContent     = val.length === 0 ? '' : lvl.text;
       label.style.color     = lvl.color;
     });
   }
   
   function setupPasswordMatch() {
     const pw      = document.getElementById('password');
     const confirm = document.getElementById('confirm');
     const label   = document.getElementById('matchLabel');
     if (!pw || !confirm || !label) return;
   
     function check() {
       if (!confirm.value) { label.textContent = ''; return; }
       if (pw.value === confirm.value) {
         label.textContent = '✅ Passwords match!';
         label.style.color = '#7ddf95';
       } else {
         label.textContent = '❌ Passwords do not match';
         label.style.color = '#e8294a';
       }
     }
     confirm.addEventListener('input', check);
     pw.addEventListener('input', check);
   }
   
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
   
   function showError(msg) {
     let el = document.getElementById('regError');
     if (!el) {
       el = document.createElement('div');
       el.id = 'regError';
       el.style.cssText = `
         color:#ff6b7a; font-size:0.82rem; font-weight:800;
         text-align:center; margin-top:0.5rem; padding:0.5rem;
         background:rgba(232,41,74,0.1); border-radius:8px;
         border:1px solid rgba(232,41,74,0.3);
       `;
       const btn = document.getElementById('registerBtn');
       if (btn) btn.parentNode.insertBefore(el, btn.nextSibling);
     }
     el.textContent   = msg;
     el.style.display = 'block';
   }
   
   function hideError() {
     const el = document.getElementById('regError');
     if (el) el.style.display = 'none';
   }
   
   async function doRegister() {
     hideError();
   
     const emailEl = document.getElementById('email');
     const userEl  = document.getElementById('username');
     const passEl  = document.getElementById('password');
     const confEl  = document.getElementById('confirm');
     const termsEl = document.getElementById('terms');
     const btn     = document.getElementById('registerBtn');
   
     let valid = true;
     if (!emailEl.value.trim()) { shake(emailEl); valid = false; }
     if (!userEl.value.trim())  { shake(userEl);  valid = false; }
     if (!passEl.value.trim())  { shake(passEl);  valid = false; }
     if (!confEl.value.trim())  { shake(confEl);  valid = false; }
     if (!valid) { showError('❌ Please fill in all fields!'); return; }
   
     if (passEl.value !== confEl.value) {
       shake(confEl);
       showError('❌ Passwords do not match!');
       return;
     }
   
     if (passEl.value.length < 8) {
       shake(passEl);
       showError('❌ Password must be at least 8 characters!');
       return;
     }
   
     if (termsEl && !termsEl.checked) {
       showError('🍓 Please agree to the Terms & Conditions first!');
       return;
     }
   
     btn.textContent = '⏳ CREATING...';
     btn.disabled    = true;
   
     try {
       // Register in PocketBase
       const res = await fetch(PB_URL + '/api/collections/users/records', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           email:           emailEl.value.trim(),
           name:            userEl.value.trim(),
           password:        passEl.value,
           passwordConfirm: confEl.value,
           gamedata:        {}
         })
       });
   
       const data = await res.json();
   
       if (!res.ok) {
         btn.textContent = '▶ REGISTER';
         btn.disabled    = false;
         if (data.data && data.data.email) {
           shake(emailEl);
           showError('❌ Email already registered! Please login instead.');
         } else {
           showError('❌ Registration failed. Please try again.');
         }
         return;
       }
   
       // Auto-login after register
       const loginRes = await fetch(PB_URL + '/api/collections/users/auth-with-password', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ identity: emailEl.value.trim(), password: passEl.value })
       });
   
       const loginData = await loginRes.json();
   
       if (loginRes.ok) {
         localStorage.setItem('pyb_sess', JSON.stringify({
           id:       loginData.record.id,
           email:    loginData.record.email,
           username: loginData.record.name || loginData.record.email.split('@')[0],
           token:    loginData.token,
           gd:       {}
         }));
       }
   
       btn.textContent = '✅ WELCOME!';
       sessionStorage.setItem('newUser', 'true');
       setTimeout(() => { window.location.href = 'quiz.html'; }, 600);
   
     } catch (err) {
       btn.textContent = '▶ REGISTER';
       btn.disabled    = false;
       showError('❌ Cannot connect to server. Is PocketBase running? 🍓');
     }
   }
   
   function setupRegister() {
     const btn = document.getElementById('registerBtn');
     if (!btn) return;
     btn.addEventListener('click', doRegister);
   }
   
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
   
   document.addEventListener('DOMContentLoaded', () => {
     generateStars();
     generatePixels();
     setupPasswordToggle('togglePw',      'password');
     setupPasswordToggle('toggleConfirm', 'confirm');
     setupPasswordStrength();
     setupPasswordMatch();
     setupRegister();
   });
