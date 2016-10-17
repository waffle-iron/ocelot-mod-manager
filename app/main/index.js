/**
* @Date:   2016-10-16T17:35:54-04:00
* @Last modified time: 2016-10-17T07:56:05-04:00
*/

const config = require('../config')
const fs = require('graceful-fs');
const path = require('path')
const mkdirp = require('mkdirp')
let Datastore = require('nedb')
const {app, BrowserWindow} = require('electron')
let packagePath = null;
const {loadIPC} = require('./ipc')

function mkdirpWErr(path) {
    mkdirp(path, function(err) {
        if (err) console.error(err)
        else console.log('Error Creating: ' + path)
    })
}

if (config.isDevelopment) {
    console.log("development");
    packagePath = config.path.development
} else {
    console.log("production");
    packagePath = config.path.production
}

packagePath = path.join(packagePath, '.ocelot');

mkdirpWErr(packagePath)

db = new Datastore({
    filename: path.join(packagePath, 'database.db'),
    autoload: true
});

var pathThemes = path.join(packagePath, 'themes')

mkdirpWErr(pathThemes)

function init() {
    loadIPC.loadIPC()
    function createWindow() {
        win = new BrowserWindow({width: 800, height: 600})
        var indexHTML = path.join(__dirname, '..')
        win.loadURL(`file://` + indexHTML + `/index.html`)
        win.webContents.openDevTools()
        win.on('closed', () => {
            win = null
        })
    }

    app.on('ready', createWindow)
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    app.on('activate', () => {
        if (win === null) {
            createWindow()
        }
    })
}

init()
