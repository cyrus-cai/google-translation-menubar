const {
    app,
    BrowserView,
    BrowserWindow,
    nativeImage,
    Tray,
    Menu,
    globalShortcut,
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


app.on("ready", () => {
    //menubar icon
    const tray = new Tray(image);

    const mb = menubar({
        browserWindow: {
            width: 450,
            height: 550,
        },
        tray,
        showOnAllWorkspaces: true,
        preloadWindow: true,
        showDockIcon: false,
        icon: image,
    });

    mb.on("ready", () => {
        const { window } = mb;

        const menu = new Menu();
        Menu.setApplicationMenu(menu);

        if (process.platform !== "darwin") {
            window.setSkipTaskbar(true);
        } else {
            app.dock.hide();
        }

        if (process.platform !== "darwin") {
            window.setSkipTaskbar(true);
        } else {
            app.dock.hide();
        }

        const contextMenuTemplate = [
            // add links to github repo and vince's twitter
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
                    shell.openExternal("https://chat.openai.com/chat");
                },
            },
            {
                type: "separator",
            },
            {
                label: "View on GitHub",
                click: () => {
                    shell.openExternal("https://github.com/vincelwt/chatgpt-mac");
                },
            },
            {
                label: "Author on Twitter",
                click: () => {
                    shell.openExternal("https://twitter.com/vincelwt");
                },
            },
        ];

        // const createWindow = () => {
        //     const win = new BrowserWindow({
        //         width: 800,
        //         height: 600,
        //     })
        //     const view = new BrowserView()
        //     win.setBrowserView(view)
        //     view.setBounds({ x: 0, y: 0, width: 800, height: 800, })
        //     win.on('resize', () => {
        //         view.setBounds({ x: 0, y: 0, width: win.getContentSize()[0], height: win.getContentSize()[1] });
        //     });
        //     view.webContents.loadURL('https://translate.google.com/?hl=zh-CN')
        // }
    })

    if (process.platform == "darwin") {
        // restore focus to previous app on hiding
        mb.on("after-hide", () => {
            mb.app.hide();
        });
    }

})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
