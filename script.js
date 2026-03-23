// ---------------------- REFERÊNCIAS ----------------------
const intro = document.getElementById("intro");
const questionSection = document.getElementById("questionSection");
const revealSection = document.getElementById("revealSection");

const loveContainer = document.getElementById("loveContainer");
const loveStage = document.getElementById("loveStage");
const startBtn = document.getElementById("startBtn");
const heart = document.getElementById("heartText");
const darkOverlay = document.getElementById("darkOverlay");

const pandaWrap = document.getElementById("pandaWrap");
const questionBox = document.getElementById("questionBox");
const yes1 = document.getElementById("yes1");
const yes2 = document.getElementById("yes2");
const revealContent = document.getElementById("revealContent");

let clickCount = 0;
let heartCenter = null;

const bgCanvas = document.getElementById("bgCanvas");
const bgCtx = bgCanvas.getContext("2d");

const particleCanvas = document.getElementById("particleCanvas");
const pCtx = particleCanvas.getContext("2d");

const bgDots = [];
const particles = [];

// ---------------------- CANVAS ----------------------
function resizeCanvas() {
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// ---------------------- FUNDO ----------------------
function createBackgroundDots() {
  bgDots.length = 0;

  for (let i = 0; i < 60; i++) {
    bgDots.push({
      x: Math.random() * bgCanvas.width,
      y: Math.random() * bgCanvas.height,
      size: Math.random() * 2,
      speedY: Math.random() * 0.3 + 0.05,
      alpha: Math.random() * 0.3 + 0.05
    });
  }
}
createBackgroundDots();

function drawBackground() {
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

  for (const dot of bgDots) {
    dot.y += dot.speedY;

    if (dot.y > bgCanvas.height) {
      dot.y = 0;
      dot.x = Math.random() * bgCanvas.width;
    }

    bgCtx.globalAlpha = dot.alpha;
    bgCtx.beginPath();
    bgCtx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
    bgCtx.fillStyle = "#9fd9ff";
    bgCtx.fill();
  }

  bgCtx.globalAlpha = 1;
  requestAnimationFrame(drawBackground);
}
drawBackground();

// ---------------------- CORAÇÃO ----------------------
function saveHeartCenter() {
  const rect = heartShell.getBoundingClientRect();
  heartCenter = {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
}

// 💥 PARTICULAS MELHORADAS
function createHeartParticles() {
  particles.length = 0;

  const colors = ["#6ec7ff", "#4f90ff", "#bfe7ff", "#ffffff"];

  for (let i = 0; i < 500; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 7 + 1;

    particles.push({
      x: heartCenter.x,
      y: heartCenter.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 4 + 1,
      alpha: 1,
      decay: Math.random() * 0.01 + 0.008,
      color: colors[Math.floor(Math.random() * colors.length)],
      gravity: 0.06
    });
  }
}

function animateParticles() {
  pCtx.fillStyle = "rgba(0,0,0,0.08)";
  pCtx.fillRect(0, 0, particleCanvas.width, particleCanvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];

    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;

    p.alpha -= p.decay;

    if (p.alpha <= 0) {
      particles.splice(i, 1);
      continue;
    }

    pCtx.globalAlpha = p.alpha;

    pCtx.beginPath();
    pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

    pCtx.shadowBlur = 20;
    pCtx.shadowColor = p.color;

    pCtx.fillStyle = p.color;
    pCtx.fill();
  }

  pCtx.globalAlpha = 1;
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ---------------------- ANIMAÇÃO PRINCIPAL ----------------------
startBtn.addEventListener("click", () => {
  startBtn.style.opacity = "0";
  startBtn.style.pointerEvents = "none";

  // 1. letras se juntam
  loveContainer.classList.add("joined");

  // 2. coração aparece 💙
setTimeout(() => {
  heart.classList.remove("hidden");
  heart.classList.add("show");
}, 1400);

  // 3. muda pra azul 💙


  // 4. letras somem (FORÇADO)
setTimeout(() => {
  loveContainer.classList.add("fade-out");
  loveContainer.style.opacity = "0";
}, 2000);
  // 5. explosão
  setTimeout(() => {
   const rect = heart.getBoundingClientRect();
heartCenter = {
  x: rect.left + rect.width / 2,
  y: rect.top + rect.height / 2
};

heart.style.opacity = "0";
heart.style.transform = "translate(-50%, -50%) scale(1.4)";
    createHeartParticles();

    darkOverlay.classList.add("active");
    loveStage.classList.add("outro-zoom");
  }, 3200);

  // 6. próxima tela
  setTimeout(() => {
    intro.classList.remove("active");
    questionSection.classList.add("active");

    requestAnimationFrame(() => {
      questionBox.classList.add("show");
    });
  }, 4200);
});

// ---------------------- BOTÕES ----------------------
function animateYesButton(button) {
  button.classList.remove("yes-pulse");
  void button.offsetWidth;
  button.classList.add("yes-pulse");

  questionBox.classList.remove("scene-pullback");
  void questionBox.offsetWidth;
  questionBox.classList.add("scene-pullback");
}

function handleYesClick(event) {
  const clickedButton = event.currentTarget;
  clickCount++;

  animateYesButton(clickedButton);

  if (clickCount >= 2) {
    setTimeout(() => {
      pandaWrap.classList.add("to-corner");
    }, 200);

    setTimeout(() => {
      questionSection.classList.remove("active");
      revealSection.classList.add("active");

      requestAnimationFrame(() => {
        revealContent.classList.add("show");
      });
    }, 1200);
  }
}

yes1.addEventListener("click", handleYesClick);
yes2.addEventListener("click", handleYesClick);
