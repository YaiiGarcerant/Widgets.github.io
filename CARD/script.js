let i = 0, n = 4, x = 0, y = 0;
const root = document.documentElement;

const update = () => {
  root.style.setProperty('--i', i);
  root.dataset.i = i;
};

const move = d => {
  i = Math.max(0, Math.min(n-1, i+d));
  update();
};

onpointerdown = e => (x=e.clientX, y=e.clientY);
onpointerup = e => {
  const dx = x - e.clientX, dy = y - e.clientY;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60)
    move(dx > 0 ? 1 : -1);
};

update();
