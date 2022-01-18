const { app, BrowserWindow } = require("electron")
const path = require("path")
app.allowRendererProcessReuse = false

let win
const config = require("./config.json")
const renderScale = config.renderScale
const winSize = config.winSize

function createWindow() {
	win = new BrowserWindow({
		icon: path.join(__dirname, 'assets/icons/png/256x256.png'),
		width: parseInt(winSize[0] * renderScale),
		height: parseInt(winSize[1] * renderScale),
		frame: false,
		// alwaysOnTop: true,
		resizable: false,
		// transparent: true,
		webPreferences: {
			// transparent: true,
			preload: path.join(__dirname, "preload.js"),
			nodeIntegration: true,
			enableRemoteModule: true,
			contextIsolation: false,
		},
	})
	win.setAspectRatio(winSize[0])

	win.loadFile("src/index.html")

	win.on("closed", () => {
		win = null
	})
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit()
	}
})

app.on("activate", () => {
	if (win === null) {
		createWindow()
	}
})
