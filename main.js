const {app, BrowserWindow, Menu, shell, ipcMain, dialog} = require("electron");
const path = require("path");
const fs = require("fs");
const os = require("os");
const crypto = require("crypto-js");

let win;

let createWindow = () => {
    console.log("electron wurde gestartet");
    win = new BrowserWindow({
        width: 500,
        height: 500,
        resizable: true,
        webPreferences: {
            nodeIntegration: true,
            devTools: true
        },
        icon: __dirname + "/www/bilder/icon.png"
    });
    win.loadFile("index.html");
}

app.on("ready", createWindow);

const home = os.homedir();
const pathToFolder = path.join(home, "drag_drop");

ipcMain.on("encryptData", (event, objpath, name, pass) => {

    let objContent = fs.readFileSync(objpath).toString();
    const encObj = crypto.AES.encrypt(objContent, pass).toString();
    
    fs.writeFileSync(path.join(pathToFolder, name + ".secret"), encObj);
    shell.openExternal(pathToFolder);
    console.log( "data wurde encrypted");
});
ipcMain.on("decryptData", (event, objpath, name, pass) => {
    let objContent = fs.readFileSync(objpath).toString();
    let decObj = crypto.AES.decrypt(objContent, pass).toString(crypto.enc.Utf8);

    let lastName = name.replace(".secret","");
    fs.writeFileSync(path.join(pathToFolder,  lastName), decObj);
    console.log("data wurde decrypted");
});


























