const { app, BrowserWindow, Menu } = require('electron');
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280, height: 720,
    title: 'حرکت بدن',
    icon: __dirname + '/icon.png',
    backgroundColor: '#93C572',
    autoHideMenuBar: true,
    webPreferences: { autoplayPolicy: 'no-user-gesture-required' }
  });
  Menu.setApplicationMenu(null);
  win.maximize();
  win.loadFile('index.html');
  // F11: full screen on/off, Esc: leave full screen
  win.webContents.on('before-input-event', (e, i) => {
    if (i.type !== 'keyDown') return;
    if (i.key === 'F11') win.setFullScreen(!win.isFullScreen());
    if (i.key === 'Escape' && win.isFullScreen()) win.setFullScreen(false);
  });
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
