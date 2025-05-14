const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

function createWindow() {
  const display = screen.getPrimaryDisplay();
  const width = 400;
  const height = 600;

  const win = new BrowserWindow({
    width: width,
    height: height,
    x: display.workArea.width - width - 20,
    y: display.workArea.height - height - 20,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    hasShadow: false
  });

  // In development, load from Vite dev server
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173');
    // win.webContents.openDevTools({ mode: 'detach' });
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Make window draggable from any point
  win.setIgnoreMouseEvents(false);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
}); 