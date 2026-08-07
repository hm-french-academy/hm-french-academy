document.addEventListener('DOMContentLoaded', () => {
  const progressBars = document.querySelectorAll('[data-progress]');
  progressBars.forEach((bar) => {
    const value = Number(bar.getAttribute('data-progress') || '0');
    bar.style.width = `${Math.max(0, Math.min(100, value))}%`;
  });
});
