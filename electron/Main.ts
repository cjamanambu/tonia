import { BrowserWindow } from 'electron';
import * as url from 'url';
import * as path from 'path';

export default class Main {
    static mainWindow: Electron.BrowserWindow;
    static application: Electron.App;
    static BrowserWindow;

    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

    private static onClosed() {
        Main.mainWindow = null;
    }

    private static onReadyToShow() {
        Main.mainWindow.show();
    }

    private static onReady() {
        Main.mainWindow = new Main.BrowserWindow({
            width: 800, height: 600,
            show: false,
            webPreferences: {
                nodeIntegration: true
            }
        });

        Main.mainWindow.loadURL(
            url.format({
                pathname: path.join(__dirname, `/../../dist/index.html`),
                protocol: 'file:',
                slashes: true
            })
        );

        Main.mainWindow.once('ready-to-show', Main.onReadyToShow);
        Main.mainWindow.on('closed', Main.onClosed);
    }

    public static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
    }
}
