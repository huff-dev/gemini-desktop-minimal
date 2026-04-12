const backBtn = document.getElementById('back');
const forwardBtn = document.getElementById('forward');
const minimizeBtn = document.getElementById('minimize');
const closeBtn = document.getElementById('close');
const webview = document.getElementById('webview');
const header = document.querySelector('header');

const loadingScreen = document.getElementById('loading-screen');

header.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

backBtn.addEventListener('click', () => {
  if (webview.canGoBack()) {
    webview.goBack();
  }
});

forwardBtn.addEventListener('click', () => {
  if (webview.canGoForward()) {
    webview.goForward();
  }
});

minimizeBtn.addEventListener('click', () => {
  window.electronAPI.minimize();
});

closeBtn.addEventListener('click', () => {
  window.electronAPI.close();
});

window.electronAPI.onReload(() => {
  webview.reload();
});

function getBrightness(rgb) {
  const match = rgb.match(/\d+/g);
  if (!match) return 0;
  const [r, g, b] = match.map(Number);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

const updateNavButtons = () => {
  backBtn.style.opacity = webview.canGoBack() ? '1' : '0.5';
  backBtn.style.cursor = webview.canGoBack() ? 'pointer' : 'default';
  
  forwardBtn.style.opacity = webview.canGoForward() ? '1' : '0.5';
  forwardBtn.style.cursor = webview.canGoForward() ? 'pointer' : 'default';
};

const updateHeaderColor = async () => {
  try {
    const color = await webview.executeJavaScript(`
      (() => {
        function getEffectiveBackgroundColor(el) {
          while (el) {
            const bg = window.getComputedStyle(el).backgroundColor;
            if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') return bg;
            el = el.parentElement;
          }
          return 'rgb(255, 255, 255)';
        }
        return getEffectiveBackgroundColor(document.body);
      })()
    `);
    
    if (color) {
      header.style.backgroundColor = color;
      webview.insertCSS(`
        bard-sidenav.mystuff-side-nav-update {
          background-color: ${color} !important;
        }

        mat-sidenav.mystuff-side-nav-update {
          background-color: ${color} !important;
          border-radius: 0px;
        }
      `);
      const brightness = getBrightness(color);
      const iconColor = brightness > 128 ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)';
      minimizeBtn.style.color = iconColor;
      closeBtn.style.color = iconColor;
      backBtn.style.color = iconColor;
      forwardBtn.style.color = iconColor;
    }
  } catch (err) {
  }
};

webview.addEventListener('dom-ready', async () => {
  await updateHeaderColor();
  updateNavButtons();
  
  loadingScreen.classList.add('fade-out');
});

webview.addEventListener('did-finish-load', () => {
  updateHeaderColor();
  updateNavButtons();
});
webview.addEventListener('did-navigate', () => {
  updateHeaderColor();
  updateNavButtons();
});
webview.addEventListener('did-navigate-in-page', () => {
  updateHeaderColor();
  updateNavButtons();
});

setInterval(() => {
  updateHeaderColor();
  updateNavButtons();
}, 2000);
