import { ComponentContainer, ComponentItemConfig, GoldenLayout, ItemType, LayoutManager, LayoutConfig } from "../golden-layout/bundle/esm/golden-layout.js";


/*
         VERSION NUMBERS
*/

const showChangelogVersion = 3;  //update all instances of ?version= in the index file to match the version. This is needed for local cache busting
window.latestMicroPythonVersion = [1, 20, 0];


const layoutSaveKey = "layout";

var myLayout = new GoldenLayout(document.getElementById("IDLayoutContainer"));

var DIR = new DIRCHOOSER();
var SAVEAS_ELEMENT = document.getElementById("IDSaveAs")  //element to use with the SaveAs dialog box.

var onExportToEditor = (bytes) => {
    var editorSpriteID = 0;
    var filePath = undefined;
    while(true){
        var increased = false;
        filePath = "/sprite" + editorSpriteID + ".bin";

        for (const [id, editor] of Object.entries(EDITORS)) {
            if(editor.EDITOR_PATH == filePath){
                editorSpriteID = editorSpriteID + 1;
                increased = true;
            }
        }
        if(increased == false){
            break;
        }
    }

    // Find editor with smallest ID, focus it, then add new editor with file contents
    var currentId = Infinity;
    for (const [id, editor] of Object.entries(EDITORS)) {
        currentId = id;
    }
    if(currentId != Infinity){
        EDITORS[currentId]._container.parent.focus();
    }

    // Pass the file contents to the new editor using the state
    var state = {};
    state.value = bytes;
    state.path = filePath;
    myLayout.addComponent('Editor', state, 'Editor');
}

// Show pop-up containing IDE changelog every time showChangelogVersion is increased
// Update version string in index.html and play.html as well to match

let response = await fetch("/lib/package.json");
response = await response.text();
let jresp = JSON.parse(response);
let v = jresp.version
// This should match what is in /lib/XRPLib/version.py as '__version__'
window.latestLibraryVersion = v.split(".");




window.phewList = ["__init__.py","dns.py","logging.py","server.py","template.py"];

window.SHOWMAIN = false;

if(localStorage.getItem(showChangelogVersion) == null){

    console.log("Updates to IDE! Showing changelog...");    // Show message in console
    localStorage.removeItem(showChangelogVersion-1);        // Remove flag from last version

    fetch("CHANGELOG.txt?version=" + showChangelogVersion).then(async (response) => {
        await response.text().then(async (text) => {
            await dialogMessage(marked.parse(text));
        });
    });

    localStorage.setItem(showChangelogVersion, true);       // Set this show not shown on next page load
   // }
}


// Want the dropdown to disappear if mouse leaves it (doesn't disappear if mouse leaves button that starts it though)
//document.getElementById("IDUtilitesDropdown").addEventListener("mouseleave", () => {
//    UIkit.dropdown(document.getElementById("IDUtilitesDropdown")).hide();
//})

var progressBarElem = document.getElementById("IDProgressBar");
var lastMessage = undefined;
window.setPercent = (percent, message) => {
    progressBarElem.style.width = percent + "%";

    if(message != undefined){
        progressBarElem.innerText = message + " " + percent + "%";
        lastMessage = message;
    }else{
        progressBarElem.innerText = lastMessage + " " + Math.round(percent) + "%";
    }
}
window.resetPercentDelay = () => {
    setTimeout(() => {
        progressBarElem.style.width = "0%";
        progressBarElem.innerText = "";
    }, 100);
}

var defaultConfig = {
    header:{
        popout: false,
        showCloseIcon: false
    },
    dimensions: {
        borderWidth: 5,
        minItemHeight: 10,
        minItemWidth: 10,
        headerHeight: 20,
        dragProxyWidth: 300,
        dragProxyHeight: 200
    },
    labels: {
        close: 'close',
        maximise: 'maximise',
        minimise: 'minimise',
        popout: 'open in new window'
    },


    content: [{
        type: 'column',
        id: 'rootcolumn',
        content: [{
            type: 'row',
            isClosable: false,
            id: 'rootrow',
            content:[{
                type: 'stack',
                width: 18,
                id: 'justFS',
                content:[{
                    type: 'component',
                    componentName: 'Filesystem',
                    isClosable: false,
                    componentState: { label: 'XRP Files' },
                    title: 'Filesystem',
                    id: "aFilesystem"
                }]
            },{
                type: 'column',
                content:[{
                    type: 'stack',
                    id: "EditorAndShell",
                    content:[{
                        type: 'component',
                        componentName: 'Editor',
                        componentState: { label: 'Editor', editor: undefined, choose: true},
                        title: 'Editor',
                        id: "aEditor"
                    }],
                },
                {
                    type: 'stack',
                    content:[{
                        type: 'component',
                        componentName: 'Shell',
                        isClosable: false,
                        componentState: { label: 'Shell' },
                        title: 'Shell',
                        id: "aShell"
                    }],
                    height: 20
                }]
            }],
        }],
    }],
};


document.getElementById("IDStopBTN").onclick = (event) =>{
    REPL.stop();
}

// Add editor panel to layout
document.getElementById("IDAddEditorBTN").onclick = (event) =>{
    console.log("PAGE: +Editor");
    var id1;
    for (const [id] of Object.entries(EDITORS)) {
        id1 = id;
        break;
        }
    EDITORS[id1]._container.focus();   //make sure the focus is on the editor section.
    myLayout.addComponent('Editor', {"value":undefined, choose:true}, 'Editor');
}

// Return true if a panel with this title exists, false otherwise
function recursiveFindTitle(content, title){
    for(var i=0; i < content.length; i++){
        if(content[i].title != undefined && content[i].title == title){
            return true;
        }
        if(content[i].content != undefined){
            if(recursiveFindTitle(content[i].content, title) == true){
                return true;
            }
        }
    }
    return false;
}


// Fill 'editors' with editor panel from every panel with 'editor' in name
function recursiveFindEditors(content, editors){
    for(var i=0; i < content.length; i++){
        if(content[i].title != undefined && content[i].title.indexOf("Editor") != -1){
            editors.push(content[i]);
        }
        if(content[i].content != undefined){
            recursiveFindEditors(content[i].content, editors);
        }
    }
}

// Setup REPL module
var REPL = new ReplJS();
window.REPL = REPL;


// Filesystem module
var FS = undefined;
function registerFilesystem(_container, state){
    FS = new FILESYSTEM(_container, state);

    DIR.onRename = (path) => REPL.renameFile(path, prompt("Type a new name: ", path.substring(path.lastIndexOf("/")+1)));
    DIR.onNewFolder = async (fileOrDir, path) => {
        var newFolderName = prompt("Enter the new folder name: ", "NewFolder");
        if(newFolderName != null){
            if(fileOrDir == 1){ // Dir
                await REPL.buildPath(path + "/" + newFolderName);
            }else{              // File
                await REPL.buildPath(path.substring(0, path.lastIndexOf("/")) + "/" + newFolderName);
            }
            await REPL.getOnBoardFSTree();
        }
    }

    FS.onDelete = (path) => REPL.deleteFileOrDir(path);

    //[TODO] - Don't let them pick main.py if it is not turned on
    FS.onRename = (path) => REPL.renameFile(path, prompt("Type a new name: ", path.substring(path.lastIndexOf("/")+1)));
    FS.onFormat = () => REPL.format();
    FS.onUpdate = () => REPL.update();
    FS.onUploadFiles = async () => {
        if(REPL.PORT != undefined){
            console.log("Pick files to upload");
            const fileHandles = await window.showOpenFilePicker({multiple: true});
            if(fileHandles && fileHandles.length > 0){
                var path = await DIR.getPathFromUser(SAVEAS_ELEMENT, true, fileHandles[0].name);
                if(path != undefined){
                    path = path.substring(1,path.lastIndexOf("/")+1);  //strip off the file name to get just the path.
                    REPL.uploadFiles(path, fileHandles);
                }
            }
        }else{
            window.alertMessage("No XRP is connected. Files can not be uploaded. Double-check that the XRP is connected before attempting to upload a file.");
        }
    }
    FS.onRefresh = async () => {
        if(REPL.PORT != undefined){
            window.setPercent(1, "Refreshing filesystem panel");
            await REPL.getOnBoardFSTree();
            window.setPercent(99.8);
            window.resetPercentDelay();
        }else{
            window.alertMessage("No XRP is connected.");
        }
    }
    FS.onOpen = async (filePath) => {
        // Make sure no editors with this file path already exist
        for (const [id, editor] of Object.entries(EDITORS)) {
            if(editor.EDITOR_PATH != undefined
                && editor.EDITOR_PATH == filePath){
                editor._container.parent.focus();
                //[TODO] If file open and no changes, just switch to that window, If open and changes, ask if OK to overwrite changes?
                //       But what if they are using a new XRP with the same file name?
                window.alertMessage("This file is already open in Editor" + id + "! Please close it first");
                return;
            }
        }

        var rawFileBytes = await REPL.getFileContents(filePath);
        if(rawFileBytes == undefined){
            //[TODO] This should report something to the user
            return; // RP2040 was busy
        }
        if(filePath.endsWith(".blocks")){
            var data = new TextDecoder().decode(new Uint8Array(rawFileBytes));
            var lines = data.split('##XRPBLOCKS ');
            rawFileBytes = Array.from(new TextEncoder().encode(lines.slice(-1)[0]));
        }
        // Find editor with smallest ID, focus it, then add new editor with file contents
        var currentId = Infinity;
        for (const [id, editor] of Object.entries(EDITORS)) {
            if(id < currentId && id != this.ID){
                currentId = id;
            }
        }
        if(currentId != Infinity){
            EDITORS[currentId]._container.parent.focus();
        }

        // Pass the file contents to the new editor using the state
        var state = {};
        state.value = rawFileBytes;
        state.path = filePath;
        myLayout.addComponent('Editor', state, 'Editor');
    }
    FS.onNewFolder = async (fileOrDir, path) => {
        var newFolderName = prompt("Enter the new folder name:", "NewFolder");
        if(newFolderName != null){
            if(fileOrDir == 1){ // Dir
                await REPL.buildPath(path + "/" + newFolderName);
            }else{              // File
                await REPL.buildPath(path.substring(0, path.lastIndexOf("/")) + "/" + newFolderName);
            }
            await REPL.getOnBoardFSTree();
        }
    }
    FS.onDownloadFiles = async (fullFilePaths) => {
        await downloadFileFromPath(fullFilePaths);
    }

}

async function downloadFileFromPath(fullFilePaths){
    for(var i=0; i<fullFilePaths.length; i++){
        var startOfFileName = fullFilePaths[i].lastIndexOf('/');
        var fileName = "";
        if(startOfFileName != -1){
            fileName = fullFilePaths[i].substring(startOfFileName+1, fullFilePaths[i].length);
        }else{
            fileName = fullFilePaths[i];
        }

        var fileContents = await REPL.getFileContents(fullFilePaths[i], true);

        window.downloadFileBytes(fileContents, fileName);
    }
}

// Terminal module
var ATERM = undefined;
function registerShell(_container, state){
    ATERM = new ActiveTerminal(_container, state);
    ATERM.onType = (data) => {
        // When the RP2040 is busy with any utility operations where BUSY is set, only allow interrupt key through
        // Allow certain characters through so thumby can pick them up
        if(REPL.BUSY == true){
           return;
        }
        REPL.writeToDevice(data);
    }

    REPL.onData = (data) => ATERM.write(data);
    REPL.onDisconnect = () => {
        ATERM.writeln('\n\r\x1b[1;31m' + "Disconnected" + '\x1b[1;0m');
        ATERM.writeln("Waiting for connection... (click 'Connect XRP')");
        FS.clearToWaiting();
        //FS.removeUpdate();

        FS.disableButtons();
    }
    REPL.onConnect = () => {
        ATERM.writeln('\x1b[1;32m' + "\n\rConnected" + '\x1b[1;0m');

        FS.enableButtons();
    }
    REPL.onFSData = (jsonStrData, fsSizeData) => {
        FS.updateTree(jsonStrData);
        FS.updateStorageBar(fsSizeData);
        DIR.updateTree(jsonStrData);
    };
    REPL.doPrintSeparator = () => {
        ATERM.doPrintSeparator();
    }
    REPL.forceTermNewline = () => {
        ATERM.write("\r\n");
    }
    //REPL.onShowUpdate = () => {FS.showUpdate()};
    REPL.showMicropythonUpdate = async () => {
        if(!REPL.HAS_MICROPYTHON){
            let answer = await confirmMessage("We have detected there is no MicroPython on your XRP.<br>" +
                    "If you think this is incorrect please press CANCEL.<br>" +
                    "If this is correct, please press the reset button while holding down the BOOTSEL button.<br>Then click OK to continue.");
            if(!answer){
                return;
            }
        }

        let answer = await confirmMessage("The MicroPython on your XRP needs to be updated. The new version is " + window.latestMicroPythonVersion[0] + "." + window.latestMicroPythonVersion[1] + "." + window.latestMicroPythonVersion[2] +"<br>Would you like to update now?");
        if(answer){
            await alertMessage("When the <b>Select Folder</b> window comes up, select the <b>RPI-RP2</b> drive when it appears.<br>Next, click on 'Edit Files' and wait for the XRP to connect.<br> This process may take a few seconds.");
            REPL.updateMicroPython();
        }


    };
}

// Editor module
var EDITORS = {};
var LAST_ACTIVE_EDITOR = undefined; // Each editor will set this to themselves on focus, bitmap builder uses this
function registerEditor(_container, state){
    var editor = new EditorWrapper(_container, state, EDITORS);
    editor.onFocus = () => {LAST_ACTIVE_EDITOR = editor};
    editor.onSaveToThumby = async () => {
        // Warn user when trying to save and no Thumby is connected
        if(REPL.DISCONNECT == true){
            window.alertMessage("No XRP is connected. Any changes made were not saved. Double-check that the XRP is connected before attempting to save the program.");
            return;
        }
        // Not sure that this code will ever happen.
        if(editor.EDITOR_PATH == undefined || editor.EDITOR_PATH == ""){
            if(editor.EDITOR_TITLE == "Choose Mode"){
                //pass
            }
            else{
                console.log('Pick a folder');
                var path = await DIR.getPathFromUser(SAVEAS_ELEMENT);
                if(path != undefined){
                    // Make sure no editors with this file path already exist
                    for (const [id, editor] of Object.entries(EDITORS)) {
                        if(editor.EDITOR_PATH == path){
                            editor._container.parent.focus();
                            this.alertMessage("This file is already open in Editor" + id + "! Please close it first");
                            return;
                        }
                    }

                    editor.setPath(path);
                    editor.setSaved();
                    editor.updateTitleSaved();
                    editor.onSaveToThumby();
                }
            }
        }else{
            //check if name is untitled
            if(editor.EDITOR_TITLE.search("untitled") != -1){
                await editor.onSaveAsToThumby();
                return;
            }
            console.log('Saved');
            editor.setSaved();
            editor.updateTitleSaved();

            if(editor.isBlockly){
                var blockData = editor.getValue() + '\n\n\n## ' + getTimestamp() + '\n##XRPBLOCKS ' + editor.getBlockData();
                var busy = await REPL.uploadFile(
                    editor.EDITOR_PATH, blockData, true, false);
                if(busy != true){
                    await REPL.getOnBoardFSTree();
                }
            }else{
                var busy = await REPL.uploadFile(editor.EDITOR_PATH, editor.getValue(), true, false);
                if(busy != true){
                    await REPL.getOnBoardFSTree();
                }
            }
        }
    }
    editor.onSaveAsToThumby = async () => {
        console.log('Pick a folder');
        var path = await DIR.getPathFromUser(SAVEAS_ELEMENT, false, editor.EDITOR_TITLE.split('/').at(-1));
        if(path != undefined){
            if(path == "/main.py" && window.SHOWMAIN == false){
                window.alertMessage("You can not save a file named 'main.py'<br>Please save again and select a different name");
                return;
            }
            editor.setPath(path);
            editor.setSaved();
            editor.updateTitleSaved();
            await editor.onSaveToThumby();
        }
    }
    editor.onFastExecute = async (lines) => {
        if(REPL.DISCONNECT == true){
            window.alertMessage("No XRP is connected. Double-check that the XRP is connected before attempting to run the program.");
            return;
        }
        if(REPL.BUSY) {
            window.alertMessage("Another program is already running. Stop that program first and then press RUN again.");
            return;
        }

        //handel any special hidden settings
        var data = editor.getValue();
        if(data.startsWith("#XRPSETTING")){
            var setting = data.split("#XRPSETTING")[1];
            setting = setting.trimEnd();
            switch(setting){
                case "-localstorage":
                    localStorage.clear();
                    break;
                case "+main":
                    window.SHOWMAIN = true;
                    FS.onRefresh();
                    break;
                case "-main":
                    window.SHOWMAIN = false;
                    FS.onRefresh();
                    break;
                case "+changelog":
                    fetch("CHANGELOG.txt?version=" + Math.floor(Math.random() * (100 - 1) + 1)).then(async (response) => {
                        await response.text().then(async (text) => {
                            await dialogMessage(marked.parse(text));
                        });
                    });
                    break;
                default:
                    break;
            }
            return;
        }


        //check if power switch is on.
        if(! await REPL.isPowerSwitchOn()) {
            if(! await window.confirmMessage("The power switch on the XRP is not on. Motors and Servos will not work.<br>Turn on the switch before continuing." +
                    "<br><img src='/images/XRP_Controller-Power.jpg' width=300>")){
                return;
            }
        }

        //save all unsaved files
        for (const [id, editor] of Object.entries(EDITORS)) {
            if(!editor.SAVED_TO_THUMBY) {
                await editor.onSaveToThumby();
            }
        }
        // update the main file so if they unplug the robot and turn it on it will execute this program.
        lines = await REPL.updateMainFile(editor.EDITOR_PATH); //replaces the lines with the main file.
        ATERM.TERM.scrollToBottom();
        await REPL.executeLines(lines);
    }
    editor.onConvert = async (oldPath, data, ID) => {
        if(REPL.DISCONNECT == true){
            window.alertMessage("This program can not be converted because no XRP is connected. Double-check that the XRP is connected before attempting to convert the program.");
            return;
        }
        if(REPL.BUSY) {
            window.alertMessage("Another program is already running. Stop that program first before attempting to convert your program.");
            return;
        }
            //move the file to trash
            //open a new file editor with a .py extension
            //force a save
        await REPL.buildPath("/trash"); //make sure the trash directory is there.
        await REPL.renameFile(oldPath, "/trash" + oldPath);

        //close the window
        var ed = EDITORS[ID];
        ed.clearStorage();
        ed._container.close();
        delete EDITORS[ID];
        //bring the focus back to the editors
        for (const [id] of Object.entries(EDITORS)) {
            var id1 = id;
            break;
            }
        EDITORS[id1]._container.focus();   //make sure the focus is on the editor section.

        var newFile = oldPath.replace(".blocks", ".py");
        var state = {};
        state.value = data;
        state.path = newFile;
        await myLayout.addComponent('Editor', state, 'Editor');
        //save the new file.
        for (const [id, ed] of Object.entries(EDITORS)) {
            if(ed.EDITOR_PATH == newFile){
                ed.onSaveToThumby();
            }
            }
    }

    editor.onDownloadFile = async (fullFilePath) => {

        await downloadFileFromPath([fullFilePath]);
    }

    EDITORS[editor.ID] = editor;
}



// Register Golden layout panels
myLayout.registerComponentConstructor("Filesystem", registerFilesystem);
myLayout.registerComponentConstructor("Editor", registerEditor);
myLayout.registerComponentConstructor("Shell", registerShell);


// Restore from previous layout if it exists, otherwise default
var savedLayout = localStorage.getItem(layoutSaveKey);
if(savedLayout != null){
    console.log("Restored layout from previous state");
    myLayout.loadLayout(LayoutConfig.fromResolved(JSON.parse( savedLayout )));
}else{
    console.log("Restored layout to default state");
    myLayout.loadLayout(defaultConfig);
}


// Resize layout on browser window resize
window.addEventListener('resize', () => {
    console.log("Window and layout resized");
    myLayout.updateSize(window.width, window.height);
    localStorage.setItem(layoutSaveKey, JSON.stringify( myLayout.saveLayout() )); // Save layout to browser every time size/layout changes
});


// Save layout when a component is moved to a new position or one is closed
myLayout.on('stateChanged', function(stack){
    localStorage.setItem(layoutSaveKey, JSON.stringify( myLayout.saveLayout() )); // Save layout to browser every time size/layout changes
});


// Run through all editors and focus them since overflow text wrap will happen and make everything ugly.
// Editors should be the only panels with long enough names to cause this problem
for (const [id, editor] of Object.entries(EDITORS)) {
    editor._container.focus();
}


// Used to turn ASCII into hex string that is typical for Python
// https://stackoverflow.com/questions/33920230/how-to-convert-string-from-ascii-to-hexadecimal-in-javascript-or-jquery/33920309#33920309
// can use delim = '\\x' for Python like hex/byte string (fails for unicode characters)
String.prototype.convertToHex = function (delim) {
    return this.split("").map(function(c) {
        return ("0" + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(delim || "");
};

/**
 * Return the timestamp in fixed format
 * @returns {String}    Timestamp in format [YYYY-MM-DD HH:MM:SS]
 * @see https://stackoverflow.com/a/67705873
 */
function getTimestamp() {
    const pad = (n, s = 2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
    const d = new Date();

    return `[${pad(d.getFullYear(), 4)}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}]`;
}

async function alertMessage(message){
    await UIkit.modal.alert(message).then(function () {
        console.log('Alert closed.');
    });
}
window.alertMessage = alertMessage;

var CONFIRM  = false;

async function confirmMessage(message){
    await UIkit.modal.confirm(message).then(function () {
        CONFIRM = true;
    }, function () {
        CONFIRM = false;
    });
    return CONFIRM;
}
window.confirmMessage = confirmMessage;

async function dialogMessage(message){
    
    let elm = document.createElement("div");
    elm.setAttribute("uk-modal","");
    let elm2 = document.createElement("div");
    elm2.classList = "uk-modal-dialog uk-margin-auto-vertical";
    elm.appendChild(elm2);

    let elm3 = document.createElement("button");
    elm3.classList = "uk-modal-close-default";
    elm3.setAttribute("uk-close","");
    elm2.appendChild(elm3);

    elm3 = document.createElement("div");
    elm3.classList = "uk-modal-body";
    elm3.setAttribute("uk-overflow-auto","");
    elm3.innerHTML = marked.parse(message);
    elm2.appendChild(elm3);
    await UIkit.modal(elm).show();
}

async function downloadFile(filePath) {
    let response = await fetch(filePath);

    if(response.status != 200) {
        throw new Error("Server Error");
    }

    // read response stream as text
    return await response.text();

}
window.downloadFile = downloadFile;


function downloadFileBytes(data, fileName){
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    var blob = new Blob([new Uint8Array(data).buffer], {type: "octet/stream"});
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}
window.downloadFileBytes = downloadFileBytes;


async function sleep(tenms){

    var tenmsCount = 0;

    while (true) {
        tenmsCount = tenmsCount + 1;
        if(tenmsCount >= tenms){
            return;
        }
        await new Promise(resolve => setTimeout(resolve, 10));
    }
}
window.sleep = sleep;
