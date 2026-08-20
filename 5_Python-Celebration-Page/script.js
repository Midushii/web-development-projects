const lines = [
  {
    text: '<span class="cmt"># loading achievement...</span>',
    speed: 20
  },
  {
    text: '<span class="kw">import</span> pride',
    speed: 15
  },
  {
    text: '',
    speed: 5
  },
  {
    text: '<span class="kw">for</span> concept <span class="kw">in</span> [<span class="str">"loops"</span>, <span class="str">"functions"</span>, <span class="str">"classes"</span>, <span class="str">"debugging"</span>]:',
    speed: 10
  },
  {
    text: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">master</span>(concept) <span class="cmt"># ✓</span>',
    speed: 15
  },
  {
    text: '',
    speed: 5
  },
  {
    text: '<span class="fn">print</span>(<span class="str">f"Congrats!! You finished the Python course 🐍🎉"</span>)',
    speed: 8
  }
];

const typed = document.getElementById("typed");
const badge = document.getElementById("badgeRow");
const runButton = document.getElementById("runBtn");

function wait(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function typeSequence() {
  typed.innerHTML = "";
  badge.classList.remove("show");

  for (const line of lines) {
    if (typed.innerHTML) {
      typed.innerHTML += "<br>";
    }

    typed.innerHTML += line.text;

    await wait(line.speed * 12);
  }

  await wait(250);

  badge.classList.add("show");
  burst(1);
}

runButton.addEventListener("click", typeSequence);

window.addEventListener("load", typeSequence);


// Confetti
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const confettiColors = [
  "#4b8bbe",
  "#ffd43b",
  "#4caf7d",
  "#e6e6f0"
];

let particles = [];

function burst(scale = 1) {
  const amount = Math.floor(90 * scale);

  for (let i = 0; i < amount; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 120,
      y: canvas.height * 0.35,

      vx: (Math.random() - 0.5) * 9,
      vy: Math.random() * -9 - 3,

      gravity: 0.28,

      size: Math.random() * 6 + 4,

      color:
        confettiColors[
          Math.floor(Math.random() * confettiColors.length)
        ],

      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 14,

      life: 140 + Math.random() * 40
    });
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.vy += particle.gravity;

    particle.x += particle.vx;
    particle.y += particle.vy;

    particle.rotation += particle.rotationSpeed;
    particle.life--;

    ctx.save();

    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.rotation * Math.PI / 180);

    ctx.fillStyle = particle.color;
    ctx.fillRect(
      -particle.size / 2,
      -particle.size / 2,
      particle.size,
      particle.size * 0.6
    );

    ctx.restore();
  });

  particles = particles.filter(
    particle =>
      particle.life > 0 &&
      particle.y < canvas.height + 40
  );

  requestAnimationFrame(animateConfetti);
}

animateConfetti();