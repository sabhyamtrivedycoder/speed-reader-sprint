let words = [], currentIdx = 0, isRunning = false, intervalId = null;

function formatWord(w) {
  if (!w) return '';
  const mid = Math.floor(w.length / 3);
  return `${w.slice(0, mid)}<span class="orp">${w[mid]}</span>${w.slice(mid + 1)}`;
}

function tick() {
  if (currentIdx >= words.length) {
    pause();
    document.getElementById('wordDisplay').textContent = 'DONE';
    return;
  }
  document.getElementById('wordDisplay').innerHTML = formatWord(words[currentIdx]);
  currentIdx++;
}

function start() {
  const text = document.getElementById('articleInput').value;
  words = text.trim().split(/\s+/);
  if (words.length === 0) return;
  isRunning = true;
  document.getElementById('toggleBtn').textContent = '⏸ Pause';
  const wpm = parseInt(document.getElementById('wpmSlider').value);
  const ms = (60 / wpm) * 1000;
  intervalId = setInterval(tick, ms);
}

function pause() {
  isRunning = false;
  clearInterval(intervalId); intervalId = null;
  document.getElementById('toggleBtn').textContent = '▶ Resume';
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('wpmSlider').addEventListener('input', (e) => {
    document.getElementById('wpmDisplay').textContent = `${e.target.value} WPM`;
    if (isRunning) { pause(); start(); }
  });
  document.getElementById('toggleBtn').addEventListener('click', () => {
    if (isRunning) pause(); else start();
  });
  document.getElementById('resetBtn').addEventListener('click', () => {
    pause(); currentIdx = 0;
    document.getElementById('wordDisplay').textContent = 'READY';
    document.getElementById('toggleBtn').textContent = '▶ Start Reading';
  });
});
}
if (typeof module !== 'undefined') module.exports = { formatWord };