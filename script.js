const intro = document.getElementById("intro");
const questionSection = document.getElementById("questionSection");
const revealSection = document.getElementById("revealSection");

const loveContainer = document.getElementById("loveContainer");
const startBtn = document.getElementById("startBtn");
const heartText = document.getElementById("heartText");
const darkOverlay = document.getElementById("darkOverlay");

const pandaWrap = document.getElementById("pandaWrap");
const questionBox = document.getElementById("questionBox");
const yes1 = document.getElementById("yes1");
const yes2 = document.getElementById("yes2");

const girlPhoto = document.getElementById("girlPhoto");

let clickCount = 0;

startBtn.addEventListener("click", () => {
  startBtn.style.opacity = "0";
  startBtn.style.pointerEvents = "none";

  loveContainer.classList.add("joined");

  setTimeout(() => {
    heartText.classList.remove("hidden");
    heartText.classList.add("show");

    loveContainer.style.opacity = "0";
  }, 1300);

  setTimeout(() => {
    explodeHeart();
    darkOverlay.classList.add("active");
  }, 2400);

  setTimeout(() => {
    intro.classList.remove("active");
    questionSection.classList.add("active");
    questionBox.classList.add("show");
  }, 3400);
});

function handleYesClick() {
  clickCount++;

  questionBox.classList.add("zooming");

  setTimeout(() => {
    questionBox.classList.remove("zooming");
  }, 900);

  if (clickCount >= 2) {
    pandaWrap.classList.add("to-corner");

    setTimeout(() => {
      questionSection.classList.remove("active");
      revealSection.classList.add("active");
      document.querySelector(".reveal-content").classList.add("show");
    }, 1200);
  }
}

yes1.addEventListener("click", handleYesClick);
yes2.addEventListener("click", handleYesClick);

/* partículas */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function explodeHeart() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  for (let i = 0; i < 120; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 5 + 1;

    particles.push({
      x: centerX,
      y: centerY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 4 + 1,
      alpha: 1
    });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, index) => {
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.015;

    ctx.globalAlpha = Math.max(p.alpha, 0);
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "#ff4d88";
    ctx.fill();

    if (p.alpha <= 0) {
      particles.splice(index, 1);
    }
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(animateParticles);
}

animateParticles();
