// Minimal sparkle interaction inspired by jh3y CodePen LYJMPBL
(function () {
  const button = document.getElementById('contact-button');
  if (!button) return;

  function spawnSparkle(x, y) {
    const s = document.createElement('span');
    s.className = 'sparkle';
    s.style.left = x + 'px';
    s.style.top = y + 'px';
    const angle = Math.random() * Math.PI * 2;
    const dist = 12 + Math.random() * 12;
    s.style.setProperty('--sx', Math.cos(angle) * dist + 'px');
    s.style.setProperty('--sy', Math.sin(angle) * dist + 'px');
    button.appendChild(s);
    s.addEventListener('animationend', () => s.remove());
  }

  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    spawnSparkle(e.clientX - rect.left, e.clientY - rect.top);
  });
})();


