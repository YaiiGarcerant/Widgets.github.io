const wrapper = document.getElementById('wrapper');
const panels = document.querySelectorAll('.panel');
const banner = document.getElementById('banner');
const indicator = document.getElementById("progress-indicator");
const totalItems = panels.length;


const topUI = document.getElementById("top-ui");
const bannerEl = document.getElementById("banner");



let currentIndex = 0;
let locked = false;

const ANIMATION_TIME = 500;
const SWIPE_THRESHOLD = 60;

let startX = 0;
let startY = 0;

const root = document.documentElement;

function updateProgress() {
  const width = 100 / totalItems;
  const left = width * currentIndex;

  indicator.style.opacity = "1";
  indicator.style.width = width + "%";
  indicator.style.left = left + "%";
}


function updateLayout() {
  if (currentIndex === 0) {
    // banner oculto
    root.style.setProperty('--banner-y', '-90%');
  } else {
    // banner visible
    root.style.setProperty('--banner-y', '0px');
  }

  updateProgress();
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

/* Pointer swipe */
window.addEventListener('pointerdown', e => {
  if (locked) return;
  startX = e.clientX;
  startY = e.clientY;
});

window.addEventListener('pointerup', e => {
  if (locked) return;

  const diffX = startX - e.clientX;
  const diffY = startY - e.clientY;

  // Solo horizontal
  if (Math.abs(diffX) <= Math.abs(diffY)) return;
  if (Math.abs(diffX) < SWIPE_THRESHOLD) return;

  move(diffX > 0 ? 1 : -1);
});

/* Bloquear scroll */
window.addEventListener(
  'wheel',
  e => e.preventDefault(),
  { passive: false }
);

/* Init */
updateLayout();
