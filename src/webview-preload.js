const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver(() => {
    ipcRenderer.sendToHost('theme-change');
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] });
});
