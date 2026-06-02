const { ipcRenderer } = require('electron');

function getEffectiveBackgroundColor(el) {
  while (el) {
    const bg = window.getComputedStyle(el).backgroundColor;
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') return bg;
    el = el.parentElement;
  }
  return 'rgb(255, 255, 255)';
}

function sendTheme() {
  const color = getEffectiveBackgroundColor(document.body);
  ipcRenderer.sendToHost('theme-change', color);
}

window.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver(sendTheme);
  observer.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(sendTheme, 150);
  });
});
