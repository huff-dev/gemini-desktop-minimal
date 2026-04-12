const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
  onReload: (callback) => ipcRenderer.on('reload-webview', callback),
  onUpdateCheck: (callback) => ipcRenderer.on('toggle-update-spinner', (event, isChecking) => callback(isChecking)),
  onUpdateAvailable: (callback) => ipcRenderer.on('update-available', callback),
  downloadUpdate: () => ipcRenderer.send('download-update'),
});
