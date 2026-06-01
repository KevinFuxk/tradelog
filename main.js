const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const fs = require('fs')

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    backgroundColor: '#070910',
    icon: path.join(__dirname, 'src', 'icon.png'),
    title: 'TradeLog'
  })

  win.loadFile('src/index.html')
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// ── IPC handlers ──────────────────────────────────────────────
ipcMain.handle('open-csv', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'CSV Files', extensions: ['csv'] }],
    title: 'Select TradingView Export CSV'
  })
  if (canceled || !filePaths[0]) return null
  return fs.readFileSync(filePaths[0], 'utf-8')
})

ipcMain.handle('open-events', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'JSON / JSONL', extensions: ['jsonl', 'json', 'ndjson', 'txt'] }],
    title: 'Select Strategy Events File (events.jsonl)'
  })
  if (canceled || !filePaths[0]) return null
  return fs.readFileSync(filePaths[0], 'utf-8')
})

ipcMain.handle('save-data', async (event, { key, value }) => {
  const filePath = path.join(app.getPath('userData'), `${key}.json`)
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2))
  return true
})

ipcMain.handle('load-data', async (event, { key }) => {
  const filePath = path.join(app.getPath('userData'), `${key}.json`)
  if (!fs.existsSync(filePath)) return null
  try { return JSON.parse(fs.readFileSync(filePath, 'utf-8')) }
  catch { return null }
})

ipcMain.handle('get-user-data-path', () => app.getPath('userData'))
