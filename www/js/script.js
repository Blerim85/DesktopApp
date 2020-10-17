const {ipcRenderer} = require("electron");
const $ = require("jquery");
const ddFile = document.getElementById("drag-file");
const pass = document.querySelector(".pass");
let obj;
let buttonpress;

ddFile.addEventListener("drop", (e) => {
    e.preventDefault();
    e.stopPropagation();

    for (let f of e.dataTransfer.files) {
        console.log("the files you dragged: ", f);
        document.querySelector("#drag-file").innerHTML = "Deine Datei++ : " + f.name;
        obj = f;
    }
});


ddFile.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.stopPropagation();
});

$("#drag-form-id").on("submit", (e) => {
    console.log(e );
    e.preventDefault();
    e.stopPropagation();
    let objName = obj.name;
    let objPath = obj.path; 

    console.log(buttonpress);
    if (buttonpress === "encrypt") {
        ipcRenderer.send("encryptData", objPath, objName, pass.value);
    }
    if (buttonpress === "decrypt") {
        ipcRenderer.send("decryptData", objPath, objName, pass.value);
    }
    document.querySelector("#passwort").value = "";
    document.querySelector(".ddfeld").innerHTML = "Drag your File here+++";

});
$("#btn-encrypt").on("click", (e) => {
    buttonpress = "encrypt"; 
})
$("#btn-decrypt").on("click", (e) => {
    buttonpress = "decrypt"; 
});

















