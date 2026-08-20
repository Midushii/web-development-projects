// ---------- Toast ----------
function showToast(msg, duration = 2600) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => t.classList.remove('show'), duration);
}

// ---------- Floating petals ----------
function initPetals(count = 16) {
  const field = document.createElement('div');
  field.className = 'petal-field';
  field.setAttribute('aria-hidden', 'true');
  const emojis = ['🌸', '🩷', '✨', '🎀'];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.left = Math.random() * 100 + 'vw';
    p.style.fontSize = (14 + Math.random() * 14) + 'px';
    p.style.animationDuration = (10 + Math.random() * 12) + 's';
    p.style.animationDelay = (-Math.random() * 20) + 's';
    field.appendChild(p);
  }
  document.body.prepend(field);
}

// ---------- Nav highlight ----------
function highlightNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
}

// ---------- Gentle music-box style ambient tune (fully generated, no copyrighted audio) ----------
const MusicBox = (() => {
  let ctx = null;
  let playing = false;
  let stepTimer = null;
  let masterGain = null;

  // A simple, soothing pentatonic music-box melody (procedurally generated — original, not any real song)
  const melody = [
    659.25, 783.99, 880.00, 987.77, 880.00, 783.99,
    659.25, 587.33, 523.25, 587.33, 659.25, 783.99,
    880.00, 987.77, 1046.50, 987.77, 880.00, 783.99,
    659.25, 587.33, 523.25, 493.88, 523.25, 587.33
  ];
  let step = 0;

  function ensureCtx() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = ctx.createGain();
      masterGain.gain.value = 0.18;
      masterGain.connect(ctx.destination);
    }
  }

  function pluck(freq) {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    const overtone = ctx.createOscillator();
    overtone.type = 'sine';
    overtone.frequency.value = freq * 2;
    const overtoneGain = ctx.createGain();
    overtoneGain.gain.value = 0.12;

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.5, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

    osc.connect(gain);
    overtone.connect(overtoneGain);
    overtoneGain.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    overtone.start(now);
    osc.stop(now + 1.2);
    overtone.stop(now + 1.2);
  }

  function tick() {
    if (!playing) return;
    pluck(melody[step % melody.length]);
    step++;
    stepTimer = setTimeout(tick, 420);
  }

  return {
    toggle() {
      ensureCtx();
      if (ctx.state === 'suspended') ctx.resume();
      playing = !playing;
      if (playing) { tick(); }
      else { clearTimeout(stepTimer); }
      return playing;
    },
    isPlaying() { return playing; },
    stop() {
      playing = false;
      clearTimeout(stepTimer);
    }
  };
})();

// ---------- Little "pop" sound for interactions ----------
function playPop(freq = 440) {
  try {
    const ctx = playPop._ctx || (playPop._ctx = new (window.AudioContext || window.webkitAudioContext)());
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.6, now + 0.18);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  } catch (e) { /* audio not available, ignore */ }
}

document.addEventListener('DOMContentLoaded', () => {
  initPetals();
  highlightNav();
});
