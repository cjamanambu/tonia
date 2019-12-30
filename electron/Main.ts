import { BrowserWindow } from 'electron';
import { createConnection, Connection } from 'typeorm';
import * as url from 'url';
import * as path from 'path';

export default class Main {
    static mainWindow: Electron.BrowserWindow;
    static application: Electron.App;
    static BrowserWindow;
    static connection: Connection;

    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

    private static async onClosed() {
        Main.mainWindow = null;
        await Main.connection.close();
    }

    private static onReadyToShow() {
        Main.mainWindow.show();
    }

    private static async onReady() {
        Main.connection = await createConnection();
        Main.mainWindow = new Main.BrowserWindow({
            width: 800, height: 600,
            fullscreen: true,
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
