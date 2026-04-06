// ============================================================
// review.js
// PyBerry Gaming — Review Page Engine
// Depends on: questions.js, boss.js
// ============================================================

// ── Show review page with all wrong answers ──────────────────
function showReview() {
    document.getElementById('rev-stage-lbl').textContent = STAGES[BS.stageIdx].name;
  
    const list = document.getElementById('rev-list');
    list.innerHTML = '';
  
    if (!BS.wrongQs.length) {
      list.innerHTML = `
        <div style="text-align:center;color:var(--gl);font-size:1rem;
                    font-weight:800;padding:2rem">
          ✅ You answered everything correctly! Just retry! 🍓
        </div>`;
      go('review');
      return;
    }
  
    BS.wrongQs.forEach((item, i) => {
      const reasons = getWrongReasons(item.yourA, item.q);
  
      const div = document.createElement('div');
      div.className           = 'review-item';
      div.style.animationDelay = (i * 0.08) + 's';
  
      div.innerHTML = `
        <div class="ri-top">
          <span class="ri-icon">❌</span>
          <p class="ri-qtxt">${escHtml(item.q.q)}</p>
        </div>
  
        ${item.q.ctx
          ? `<pre class="ri-ctx-code">${escHtml(item.q.ctx)}</pre>`
          : ''}
  
        <div class="ri-section">
          <div class="ri-section-lbl">❌ Your code:</div>
          <div class="ri-your-code">${escHtml(item.yourA || '(nothing typed)')}</div>
        </div>
  
        <div class="ri-section" style="margin-top:.5rem">
          <div class="ri-section-lbl">✅ Correct answer:</div>
          <div class="ri-correct-code">${escHtml(item.q.answer[0])}</div>
        </div>
  
        <div class="ri-reasons">
          ${reasons.map(r => `<div class="ri-reason">${r}</div>`).join('')}
        </div>
  
        <div class="ri-explain">💡 ${escHtml(item.q.exp)}</div>`;
  
      list.appendChild(div);
    });
  
    go('review');
  }
  
  // ── Retry the boss fight from review page ───────────────────
  function retryBoss() {
    go('boss');
    launchBoss(BS.stageIdx);
  }
