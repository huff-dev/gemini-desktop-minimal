const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const stateFilePath = path.join(app.getPath('userData'), 'window-state.json');

function loadWindowState() {
  try {
    if (fs.existsSync(stateFilePath)) {
      return JSON.parse(fs.readFileSync(stateFilePath, 'utf8'));
    }
  } catch (err) {
    console.error('Failed to load window state:', err);
  }
  return { width: 600, height: 800, isMaximized: false };
}

function saveWindowState(state) {
  try {
    fs.writeFileSync(stateFilePath, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save window state:', err);
  }
}

function createWindow() {
  const windowState = loadWindowState();

  const iconPath = process.platform === 'win32'
    ? path.join(__dirname, '..', 'assets', 'App_icon.ico')
    : path.join(__dirname, '..', 'assets', 'App_icon.png');

  const mainWindow = new BrowserWindow({
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    minWidth: 500,
    minHeight: 500,
    frame: false,
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (windowState.isMaximized) {
    mainWindow.maximize();
  }

  mainWindow.loadFile(path.join(__dirname, 'index.html'));


  const updateState = () => {
    const isMaximized = mainWindow.isMaximized();
    const bounds = isMaximized ? windowState : mainWindow.getBounds();
    saveWindowState({
      ...bounds,
      isMaximized: isMaximized
    });
  };

  mainWindow.on('resize', updateState);
  mainWindow.on('move', updateState);
  mainWindow.on('maximize', updateState);
  mainWindow.on('unmaximize', updateState);

  app.on('web-contents-created', (event, contents) => {
    contents.on('before-input-event', (event, input) => {
      if (input.type === 'keyDown') {
        const isR = input.key.toLowerCase() === 'r';
        const isF5 = input.key === 'F5';
        const isControlOrMeta = input.control || input.meta;

        if ((isControlOrMeta && isR) || isF5) {
          mainWindow.webContents.send('reload-webview');
          event.preventDefault();
        }
      }
    });
  });

  ipcMain.on('window-minimize', () => mainWindow.minimize());
  ipcMain.on('window-maximize', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });
  ipcMain.on('window-close', () => mainWindow.close());
}

app.whenReady().then(() => {
  if (process.platform === 'darwin') {
    app.dock.setIcon(path.join(__dirname, 'App_icon.png'));
  }
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
