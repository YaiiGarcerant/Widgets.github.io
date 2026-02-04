const wrapper = document.getElementById('wrapper');
const panels = document.querySelectorAll('.panel');

let currentIndex = 0;
let locked = false;
const ANIMATION_TIME = 800;
const SWIPE_THRESHOLD = 60;

let startX = 0;
let startY = 0;

/* Movimiento único */
function move(direction) {
  if (locked) return;

  const next = currentIndex + direction;
  if (next < 0 || next >= panels.length) return;

  locked = true;
  currentIndex = next;

  wrapper.style.transform = `translateX(-${currentIndex * 100}vw)`;

  setTimeout(() => {
    locked = false;
  }, ANIMATION_TIME);
}

/* 🧠 POINTER EVENTS = UN SOLO SISTEMA */
window.addEventListener('pointerdown', (e) => {
  if (locked) return;

  startX = e.clientX;
  startY = e.clientY;
});

window.addEventListener('pointerup', (e) => {
  if (locked) return;

  const diffX = startX - e.clientX;
  const diffY = startY - e.clientY;

  // SOLO horizontal
  if (Math.abs(diffX) <= Math.abs(diffY)) return;
  if (Math.abs(diffX) < SWIPE_THRESHOLD) return;

  move(diffX > 0 ? 1 : -1);
});

/* ⛔ Bloqueo total del wheel (trackpad inercia) */
window.addEventListener(
  'wheel',
  (e) => {
    e.preventDefault();
  },
  { passive: false }
);
