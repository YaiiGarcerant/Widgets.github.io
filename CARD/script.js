const wrapper = document.getElementById('wrapper');
const panels = document.querySelectorAll('.panel');
const banner = document.getElementById('banner');
const progressWrapper = document.getElementById('progress-wrapper');
const progressBar = document.getElementById('progress-bar');

let currentIndex = 0;
let locked = false;

const ANIMATION_TIME = .5;
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



function updateLayout() {
  steps.forEach((step, i) => {
    step.classList.toggle('active', i === currentIndex);
  });

  if (currentIndex === 0) {
    banner.classList.remove('visible');
    progressWrapper.classList.remove('below-banner');
    panels.forEach(p => p.classList.remove('with-banner'));
  } else {
    banner.classList.add('visible');
    progressWrapper.classList.add('below-banner');
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
