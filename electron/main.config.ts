import * as path from 'path';

export const BROWSER_WINDOW_OPTIONS = {
  width: 1000, height: 800,
  fullscreen: true,
  autoHideMenuBar: true,
  show: false,
  webPreferences: {
      nodeIntegration: true
  }
};

export const RENDERER_FILE = {
  pathname: path.join(__dirname, `/../../dist/index.html`),
  protocol: 'file:',
  slashes: true
};
