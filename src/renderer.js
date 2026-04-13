const backBtn = document.getElementById('back');
const forwardBtn = document.getElementById('forward');
const minimizeBtn = document.getElementById('minimize');
const closeBtn = document.getElementById('close');
const updateSpinner = document.getElementById('update-spinner');
const updateBtn = document.getElementById('update-btn');
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

let spinnerStartTime = 0;
const MIN_SPINNER_TIME = 1500;

window.electronAPI.onUpdateCheck((isChecking) => {
  if (isChecking) {
    spinnerStartTime = Date.now();
    updateSpinner.classList.add('checking');
  } else {
    const elapsed = Date.now() - spinnerStartTime;
    const remaining = Math.max(0, MIN_SPINNER_TIME - elapsed);
    
    setTimeout(() => {
      updateSpinner.classList.add('fade-out-spinner');
      setTimeout(() => {
        updateSpinner.classList.remove('checking', 'fade-out-spinner');
      }, 500);
    }, remaining);
  }
});

window.electronAPI.onUpdateAvailable(() => {
  updateSpinner.classList.add('hidden');
  updateBtn.classList.add('available');
});

updateBtn.addEventListener('click', () => {
  updateBtn.classList.remove('available');
  updateSpinner.classList.remove('hidden');
  updateSpinner.classList.add('checking');
  window.electronAPI.downloadUpdate();
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
    
    if (color && color !== header.style.backgroundColor) {
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
      updateSpinner.style.color = iconColor;
      updateBtn.style.color = iconColor;
    }
  } catch (err) {
  }
};

webview.addEventListener('dom-ready', async () => {
  await updateHeaderColor();
  updateNavButtons();
  
  loadingScreen.classList.add('fade-out');
});

webview.addEventListener('ipc-message', (event) => {
  if (event.channel === 'theme-change') {
    updateHeaderColor();
  }
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
