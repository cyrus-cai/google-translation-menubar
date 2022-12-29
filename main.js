const {
    app,
    nativeImage,
    Tray,
    Menu,
    shell,
} = require('electron')
const { menubar } = require("menubar");
const path = require('path')

try {
    require('electron-reloader')(module)
} catch (_) { }


const image = nativeImage.createFromPath(
    path.join(__dirname, `images/newiconTemplate.png`)
);

app.setLoginItemSettings({ openAtLogin: true })

app.on("ready", () => {
    const tray = new Tray(image);

    const mb = menubar({
        index: 'https://translate.google.com/',
        browserWindow: {
            width: 450,
            height: 600,
        },
        tray,
        showOnAllWorkspaces: true,
        preloadWindow: true,
        showDockIcon: false,
        icon: image,
    });


    mb.on("ready", () => {
        const { window } = mb;

        if (process.platform !== "darwin") {
            window.setSkipTaskbar(true);
        } else {
            app.dock.hide();
        }

        const contextMenuTemplate = [
            {
                label: "Quit",
                accelerator: "Command+Q",
                click: () => {
                    app.quit();
                },
            },
            {
                label: "Reload",
                accelerator: "Command+R",
                click: () => {
                    window.reload();
                },
            },
            {
                label: "Open in browser",
                click: () => {
                    shell.openExternal("https://translate.google.com/");
                },
            },
            {
                type: "separator",
            },
            {
                label: "View on GitHub",
                click: () => {
                    shell.openExternal("https://github.com/xii-kii/google-translation-menubar");
                },
            },
        ];

        tray.on("right-click", () => {
            mb.tray.popUpContextMenu(Menu.buildFromTemplate(contextMenuTemplate));
        });
    })

})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
