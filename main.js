const {
    app,
    nativeImage,
    Tray,
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
    const tray = new Tray(image);
    menubar({
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
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
