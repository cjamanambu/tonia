// App
import { BrowserWindow } from 'electron';
import { BROWSER_WINDOW_OPTIONS, RENDERER_FILE } from './main.config';
import * as url from 'url';

// server
import { server } from './src/server';

export default class Main {
    static mainWindow: Electron.BrowserWindow;
    static application: Electron.App;
    static BrowserWindow: any;

    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

    private static async onClosed() {
        Main.mainWindow = null;
        await server.closeDBConnection();
    }

    private static onReadyToShow() {
        Main.mainWindow.show();
    }

    private static async onReady() {
        Main.mainWindow = new Main.BrowserWindow(BROWSER_WINDOW_OPTIONS);
        Main.mainWindow.loadURL(url.format(RENDERER_FILE));
        Main.mainWindow.once('ready-to-show', Main.onReadyToShow);
        Main.mainWindow.on('closed', Main.onClosed);
    }

    public static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        server.listen();
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
    }
}
