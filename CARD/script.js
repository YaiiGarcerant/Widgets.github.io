const wrapper = document.getElementById('wrapper');
const panels = document.querySelectorAll('.panel');
const banner = document.getElementById('banner');
const progressWrapper = document.getElementById('progress-wrapper');
const progressBar = document.getElementById('progress-bar');

let currentIndex = 0;
let locked = false;

const ANIMATION_TIME = 500;
const SWIPE_THRESHOLD = 60;

let startX = 0;
let startY = 0;

const progressSteps = document.getElementById('progress-steps');

/* Crear segmentos */
panels.forEach(() => {
  const step = document.createElement('div');
  step.className = 'progress-step';
  progressSteps.appendChild(step);
});

const steps = document.querySelectorAll('.progress-step');

const root = document.documentElement;

function updateLayout() {
  // Progreso segmentado
  steps.forEach((step, i) => {
    step.classList.toggle('active', i === currentIndex);
  });

  if (currentIndex === 0) {
    // Banner fuera + progress arriba
    root.style.setProperty('--banner-y', '-100%');
    root.style.setProperty('--progress-y', '0px');

    panels.forEach(p => p.classList.remove('with-banner'));
  } else {
    // Banner entra + progress se desliza debajo
    root.style.setProperty('--banner-y', '0px');
    root.style.setProperty('--progress-y', '70px');

    panels.forEach((p, i) => {
      if (i > 0) p.classList.add('with-banner');
    });
  }
}


/* Movimiento controlado */
function move(direction) {
  if (locked) return;

  const next = currentIndex + direction;
  if (next < 0 || next >= panels.length) return;

  locked = true;
  currentIndex = next;

  updateLayout();
  wrapper.style.transform = `translateX(-${currentIndex * 100}vw)`;

  setTimeout(() => locked = false, ANIMATION_TIME);
}

/* Pointer events */
window.addEventListener('pointerdown', e => {
  if (locked) return;
  startX = e.clientX;
  startY = e.clientY;
});

window.addEventListener('pointerup', e => {
  if (locked) return;

  const diffX = startX - e.clientX;
  const diffY = startY - e.clientY;

  if (Math.abs(diffX) <= Math.abs(diffY)) return;
  if (Math.abs(diffX) < SWIPE_THRESHOLD) return;

  move(diffX > 0 ? 1 : -1);
});

/* Bloqueo scroll */
window.addEventListener(
  'wheel',
  e => e.preventDefault(),
  { passive: false }
);

/* Init */
updateLayout();
