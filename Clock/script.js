function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const timeString = `${hours}:${minutes}`;

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = now.toLocaleDateString('en-US', options);

  document.getElementById('time').textContent = timeString;
  document.getElementById('date').textContent = dateString;
}

setInterval(updateTime, 1000);
updateTime();  // Initial call to set the clock immediately
