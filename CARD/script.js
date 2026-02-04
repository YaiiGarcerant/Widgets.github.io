const wrapper = document.getElementById('wrapper');
const panels = document.querySelectorAll('.panel');
const banner = document.getElementById('banner');

let currentIndex = 0;
let locked = false;
const ANIMATION_TIME = 800;
const SWIPE_THRESHOLD = 60;

let startX = 0;
let startY = 0;

/* Sincronizar layout */
function updateLayout() {
  if (currentIndex === 0) {
    banner.classList.remove('visible');
    panels.forEach(p => p.classList.remove('with-banner'));
  } else {
    banner.classList.add('visible');
    panels.forEach((p, i) => {
      if (i > 0) p.classList.add('with-banner');
    });
  }
}

/* Movimiento 1 sección */
function move(direction) {
  if (locked) return;

  const next = currentIndex + direction;
  if (next < 0 || next >= panels.length) return;

  locked = true;
  currentIndex = next;

  // 🔥 TODO se mueve junto
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
