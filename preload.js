const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  openCSV: () => ipcRenderer.invoke('open-csv'),
  openEvents: () => ipcRenderer.invoke('open-events'),
  save: (key, value) => ipcRenderer.invoke('save-data', { key, value }),
  load: (key) => ipcRenderer.invoke('load-data', { key }),
  getUserDataPath: () => ipcRenderer.invoke('get-user-data-path')
})
