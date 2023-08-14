// ##### EDITOR_WRAPPER.js #####
// For managing multiple sessions/tabs of ace editors
// from one object exposed in main.js. Also exposes
// common operations provided by the ace editor

class EditorWrapper{
    constructor(_container, state, EDITORS){

        this.EDITORS = EDITORS;
        this._container = _container;

        // New editor, find a unique ID for it. At this point, a new editor can only
        // spawn on first page creation or button click, all or no editors should exist
        // by now
        this.ID = 0;
        if(state.id == -1 || state.id == undefined){
            while(this.ID in this.EDITORS){
                this.ID = this.ID + 1;
            }
            state.id = this.ID;
        }else{
            this.ID = state.id;
        }
        this.state = state;

        this.EDITORS[this.ID] = this;

        // Toolbar and editor div always exist, child elements are added or removed from them
        this.HEADER_TOOLBAR_DIV = document.createElement("div");
        //this.HEADER_TOOLBAR_DIV.classList.add("editor_header_toolbar");
        this.generateEditorHeaderToolbar();

        this.EDITOR_DIV = document.createElement("div");
        this.EDITOR_DIV.id = "IDEditorDiv" + this.ID;
        this.EDITOR_DIV.classList.add("editor");
        this._container.element.appendChild(this.EDITOR_DIV);

        this.defaultCode =   "from XRPLib.defaults import *\n\n" +
                             "# available variables frm defaults: left_motor, right_motor, drivetrain,\n" +
                             "#      imu, rangefinder, reflectance, servo_one, boad, webserver\n" +
                             "# Write your code Here\n";

        // If this is the first time loading the website (with the default
        // GoldenLayout setup), load a choice selector between MicroPython
        // and Blockly.
        if(state["value"] == undefined && state.choose){
            this.setTitle("Choose Mode");
            // this.HEADER_TOOLBAR_DIV.innerHTML = "Please choose your Editor preference:";

            var blockly_button = document.createElement("button");
            blockly_button.classList = "uk-button uk-button-secondary uk-width-1-2 uk-height-1-1 uk-text-small";
            blockly_button.innerHTML = '<img src="css/blockly.svg" class="uk-width-1-2"/><p>BLOCKLY</p><p>(visual block editor)<p/>';
            blockly_button.title = "Load a Blockly Editor for visual block-based coding.";
            this.EDITOR_DIV.appendChild(blockly_button);

            var micropython_button = document.createElement("button");
            micropython_button.classList = "uk-button uk-button-secondary uk-width-1-2 uk-height-1-1 uk-text-small";
            micropython_button.innerHTML = '<img src="css/micropython.png" class="uk-width-1-2 micropython-width"/><p>MICRO PYTHON</p><p>(text code editor)</p>';
            micropython_button.title = "Load a MicroPython Editor for normal text-based coding.";
            this.EDITOR_DIV.appendChild(micropython_button);

            const cleanUp = ()=>{
                this.HEADER_TOOLBAR_DIV.innerHTML = "";
                this.EDITOR_DIV.innerHTML = "";
                localStorage.removeItem("EditorTitle" + this.ID);
            };
            micropython_button.onclick = () => {
                cleanUp();
                this.initEditorPanelUI(state["value"]);
                this.updateEditorHeaderBar('micropython', this.ID);
                document.getElementById('IDAddEditorBTN').style.display = "none";
            };
            blockly_button.onclick = () => {
                cleanUp();
                this.state['isBlockly'] = true;
                this.initEditorPanelUI(state["value"]);
                this.updateEditorHeaderBar('blockly', this.ID);
                document.getElementById('IDAddEditorBTN').style.display = "none";
            };
        }else{
            this.initEditorPanelUI(state["value"]);
        }

        // Listen for layout changes and re-fit the editor, also override the default exit button
        this._container._layoutManager.on('stateChanged', () => {
            this.resize();

            // https://github.com/golden-layout/golden-layout/issues/324
            // Remove editor close button functionality and override it
            var oldElem = this._container._tab._closeElement;

            this._container._tab._element.title = this.EDITOR_TITLE.split(" - ")[1];

            if(oldElem != null && oldElem.parentNode != null){
                var newElem = oldElem.cloneNode(true);
                oldElem.parentNode.replaceChild(newElem, oldElem);

                 newElem.onclick = async () =>  {
                    if(this.SAVED_TO_THUMBY == false && ! await window.confirmMessage('You have unsaved changes. Are you sure you want to close this editor?')) {
                        return;
                    }

                    this.closeThisEditor();

                }
            }
        });

        // Used for setting the active editor outside this module, typically for bit map builder
        // these methods are in main.js
        this.onFocus = undefined;
        this.onSaveToThumby = undefined;
        this.onUploadFiles = undefined;
        this.onSaveAsToThumby = undefined;
        this.onFastExecute = undefined;
        this.onEmulate = undefined;
        this.onOpen = undefined;
        this.onConvert = undefined;
        this.onDownloadFile = undefined;
        this.addNewEditor = undefined;

        // Make sure mouse down anywhere on panel focuses the panel
        // Mouse down is used so New Tab, Open Python, etc can allow the focus out.
        this._container.element.addEventListener('mousedown', (event) => {
            this._container.focus();
            this.onFocus();
            console.log("M editor # " + state.id)
        });
        this._container.element.addEventListener('focusin', (event) => {
            this._container.focus();
            this.onFocus();
            console.log("F editor # " + state.id)

        });

        this._container.on('shown', function(){
            console.log("S editor # " + state.id)
        });
        
        // Used to suggest a name for certain operations
        this.FILE_OPTIONS = {
            suggestedName: ".py",
        };

        this.state = {};
        this.state.id = this.ID;
        this._container.setState(this.state);
    }

    generateEditorHeaderToolbar() {
        this.HEADER_TOOLBAR_DIV = document.getElementById("editor_header_toolbar");
    }

    runXRPCode() {
        let id = localStorage.getItem("activeTabId");
        this.EDITORS[id].onFastExecute(this.getValue());
    }

    closeThisEditor(){
        // Remove this since only needed for editor
        window.removeEventListener("resize", this.windowResizeListener);

        if(Object.keys(this.EDITORS).length == 1){      //this is the last editor, so open the choose file
            this._container.parent.focus();
            document.getElementById("IDAddEditorBTN").click();
        }

        delete this.EDITORS[this.ID];
        this.clearStorage();
        this.hideBlocklyPythonOptions();

        console.log("Cleared info for Editor: " + this._container.title);

        this._container.close();
    }

    hideBlocklyPythonOptions() {
        //document.getElementById("micropython_dropdown").style.display = "none";
        //document.getElementById("blockly_dropdown").style.display = "none";
        //document.getElementById("file_options").style.display = "none";
        //document.getElementById("IDAddEditorBTN").style.display = "block";
    }

    // this method is called after a user clicks to create a new file
    // if new file is.py, show micropython options and if new file is.blocks, show blockly options
    updateEditorHeaderBar(tabFileType, tabId) {
        localStorage.setItem("activeTabId", tabId);
        if (tabFileType == 'blockly') {
            localStorage.setItem("activeTabFileType", "blockly");
            // hide micropython dropdown options since this is a blockly file
            document.getElementById("micropython_dropdown").style.display = "none";
            document.getElementById("blockly_dropdown").style.display = "inline-block";
        } else {
            localStorage.setItem("activeTabFileType", "micropython");
            // hide blockly dropdown options since this is a micropython file
            document.getElementById("blockly_dropdown").style.display = "none";
            document.getElementById("micropython_dropdown").style.display = "inline-block";
        }
    }

    initEditorPanelUI(data) {
    /*
        // Remove all buttons from header toolbar, if they exist
        while(this.HEADER_TOOLBAR_DIV.children.length > 0){
            this.HEADER_TOOLBAR_DIV.removeChild(this.HEADER_TOOLBAR_DIV.children[0]);
        }

        // Remove all buttons from editor div, if they exist
        while(this.EDITOR_DIV.children.length > 0){
            this.EDITOR_DIV.removeChild(this.EDITOR_DIV.children[0]);
        }

        // Remove the editor now since it will need to be reassigned a new parent div
        if(this.ACE_EDITOR) this.ACE_EDITOR.destroy();

        // Binary and code viewer always have file button and dropdown
        this.FILE_BUTTON = document.createElement("button");
        this.FILE_BUTTON.classList = "uk-button-xmenu uk-button-primary uk-height-1-1 uk-text-small uk-text-nowrap";
        this.FILE_BUTTON.textContent = "File\u25BE";
        this.FILE_BUTTON.id = "file_options";
        this.FILE_BUTTON.title = "File operations for PC and XRP";
        //this.HEADER_TOOLBAR_DIV.appendChild(this.FILE_BUTTON);

        this.FILE_DROPDOWN = document.createElement("div");
        this.FILE_DROPDOWN.setAttribute("uk-dropdown", "mode: click; offset: 0; delay-hide: 200");
        this.HEADER_TOOLBAR_DIV.appendChild(this.FILE_DROPDOWN);
        this.FILE_DROPDOWN.addEventListener("mouseleave", () => {
            UIkit.dropdown(this.FILE_DROPDOWN).hide();
        })

        this.FILE_DROPDOWN_UL = document.createElement("div");
        this.FILE_DROPDOWN_UL.classList = "uk-nav uk-dropdown-nav";
        this.FILE_DROPDOWN.appendChild(this.FILE_DROPDOWN_UL);

        var listElem = document.createElement("li");
        this.NEW_FILE_BTN = document.createElement("button");
        this.NEW_FILE_BTN.classList = "uk-button-xmenu uk-button-secondary-xmenu uk-button-small uk-width-1-1";
        this.NEW_FILE_BTN.innerText = "New File";
        this.NEW_FILE_BTN.id = "IDAddEditorBTN_FileDD";
        this.NEW_FILE_BTN.alt = "Add a new file button"
        this.NEW_FILE_BTN.title = "Add a new file";
        this.NEW_FILE_BTN.onclick = () => {
            this.addNewEditor();
        }
        listElem.appendChild(this.NEW_FILE_BTN);
        this.FILE_DROPDOWN_UL.appendChild(listElem);

        var listElem = document.createElement("li");
        this.FS_UPLOAD_BTN = document.createElement("button");
        this.FS_UPLOAD_BTN.classList = "uk-button-xmenu uk-button-secondary-xmenu uk-button-small uk-width-1-1";
        this.FS_UPLOAD_BTN.onclick = () => {
            this.onUploadFiles()
        };
        this.FS_UPLOAD_BTN.disabled = true;
        this.FS_UPLOAD_BTN.innerText = "Upload to XRP";
        this.FS_UPLOAD_BTN.title = "Uploads files to the XRP";
        listElem.appendChild(this.FS_UPLOAD_BTN);
        this.FILE_DROPDOWN_UL.appendChild(listElem);

        var listElem = document.createElement("li");
        this.FILE_EXPORT_BUTTON = document.createElement("button");
        this.FILE_EXPORT_BUTTON.classList = "uk-button-xmenu uk-button-secondary-xmenu uk-button-small uk-width-1-1";
        this.FILE_EXPORT_BUTTON.textContent = "Export to PC";
        this.FILE_EXPORT_BUTTON.title = "Export editor contents to file on PC";
        this.FILE_EXPORT_BUTTON.onclick = () => {
            UIkit.dropdown(this.FILE_DROPDOWN).hide();
            let id = localStorage.getItem("activeTabId");
            this.EDITORS[id].onDownloadFile(this.EDITOR_PATH);;
            console.log('Downloading file for Tab Id: ', id);
        }
        this.FILE_EXPORT_BUTTON.disabled = true;
        listElem.appendChild(this.FILE_EXPORT_BUTTON);
        this.FILE_DROPDOWN_UL.appendChild(listElem);

        listElem = document.createElement("li");
        listElem.classList = "uk-nav-divider";
        this.FILE_DROPDOWN_UL.appendChild(listElem);

        listElem = document.createElement("li");
        this.FILE_SAVE_BUTTON = document.createElement("button");
        this.FILE_SAVE_BUTTON.classList = "uk-button-xmenu uk-button-secondary-xmenu uk-button-small uk-width-1-1";
        this.FILE_SAVE_BUTTON.textContent = "Save to XRP";
        this.FILE_SAVE_BUTTON.title = "Save editor contents to file on XRP (ctrl-s)";
        this.FILE_SAVE_BUTTON.onclick = () => {
            UIkit.dropdown(this.FILE_DROPDOWN).hide();
            let id = localStorage.getItem("activeTabId");
            this.EDITORS[id].onSaveToThumby();
            console.log('Saving File for Tab Id: ', id);
        };
        this.FILE_SAVE_BUTTON.disabled = true;
        listElem.appendChild(this.FILE_SAVE_BUTTON);
        this.FILE_DROPDOWN_UL.appendChild(listElem);

        listElem = document.createElement("li");
        this.FILE_SAVEAS_BUTTON = document.createElement("button");
        this.FILE_SAVEAS_BUTTON.classList = "uk-button-xmenu uk-button-secondary-xmenu uk-button-small uk-width-1-1";
        this.FILE_SAVEAS_BUTTON.textContent = "Save As to XRP";
        this.FILE_SAVEAS_BUTTON.title = "Save editor contents to file on XRP under a specific path";
        this.FILE_SAVEAS_BUTTON.onclick = () => {
            UIkit.dropdown(this.FILE_DROPDOWN).hide();
            let id = localStorage.getItem("activeTabId");
            this.EDITORS[id].onSaveAsToThumby();
            console.log("Saving File as for Tab Id: ", id);
        };
    
        this.FILE_SAVEAS_BUTTON.disabled = true;
        listElem.appendChild(this.FILE_SAVEAS_BUTTON);
        this.FILE_DROPDOWN_UL.appendChild(listElem);
    */
        this.makeBlocklyPythonHeaderOptions();

        var isBlockly = localStorage.getItem("isBlockly" + this.ID) || this.state.isBlockly;

        // WHEN A USER CREATES A NEW TAB, THE FOLLOWING WILL SET THE EDITOR TO BLOCKLY OR MICROPYTHON SETTINGS
        if(data == undefined && (isBlockly == "true" || isBlockly == true)) {
            console.log("INIT BLOCKLY VIEWER");
            localStorage.setItem("isBlockly" + this.ID, true);
            this.turnIntoBlocklyViewer(data);
        }else if(data == undefined){    // No data and not Blockly, new editor with default code
            console.log("INIT CODE VIEWER");
            localStorage.setItem("isBlockly" + this.ID, false);
            this.turnIntoCodeViewer(data);
        }else if(data != undefined){
            // Check if the decoded data contains binary replacement letters (could also check that most characters only equal ascii chars)
            var text = typeof data == "string" ? data : new TextDecoder().decode(new Uint8Array(data));
            //We know there is data, so save it to the localstorage for this editor ID
            localStorage.setItem("EditorValue"+this.ID, text);
            if(text && text.startsWith("{") && text.indexOf('{"blocks":{"') != -1){
                console.log("INIT BLOCKLY VIEWER");
                localStorage.setItem("isBlockly" + this.ID, true);
                if(this.SAVED_TO_THUMBY == undefined){
                    localStorage.setItem("EditorSavedToThumby" + this.ID, true); //it already had text so must be coming from the XRP so already saved
                    this.SAVED_TO_THUMBY = true;
                }

                this.turnIntoBlocklyViewer(text);
            }else{
                console.log("INIT CODE VIEWER");
                localStorage.setItem("isBlockly" + this.ID, false);
                if(this.SAVED_TO_THUMBY == undefined){
                    localStorage.setItem("EditorSavedToThumby" + this.ID, true); //it already had text so must be coming from the XRP so already saved
                    this.SAVED_TO_THUMBY = true;
                }
                this.turnIntoCodeViewer(text);
            }
        }

        // Figure out if editor should take on the last saved title, passed title, or default title
        var lastEditorTitle = localStorage.getItem("EditorTitle" + this.ID);
        if(lastEditorTitle != null){
            this.setTitle(lastEditorTitle);
        }else if(this.state['path'] != undefined){
            this.setTitle('Editor' + this.ID + ' - ' + this.state['path']);
            this.SAVED_TO_THUMBY = true;         // Just opened from thumby, so saved to it
        }else{
            this.setTitle("Editor" + this.ID + ' - ' + this.EDITOR_PATH);
            this.SAVED_TO_THUMBY = undefined;    // For sure not saved to Thumby but also new, keep undefined so can be closed without alert
        }


        // Figure out editor should set the path from last saved, or passed
        var lastEditorPath = localStorage.getItem("EditorPath" + this.ID);
        if(lastEditorPath != null){
            this.EDITOR_PATH = lastEditorPath;
        }else if(this.state['path'] != undefined){
            this.setPath(this.state['path']);
        }


        // Figure out if editor was saved last time or not
        var lastEditorSavedToThumby = localStorage.getItem("EditorSavedToThumby" + this.ID);
        if(lastEditorSavedToThumby != null){
            this.SAVED_TO_THUMBY = (lastEditorSavedToThumby === 'true');
        }
        this.setTitle(this.EDITOR_TITLE); //call again to set the modified icon
    }

    makeBlocklyPythonHeaderOptions() {
        // hide top header NEW FILE button since NEW FILE will now be in the FILE dropdown menu
        //document.getElementById('IDAddEditorBTN').style.display = "none";

        var listElem = document.createElement("li");
        listElem.classList = "uk-nav-divider";

         // Make the editor area
         if (!this.BLOCKLY_DIV) {
            this.BLOCKLY_DIV = document.createElement("div");
            this.BLOCKLY_DIV.style.position = "absolute";
        }
        this.EDITOR_DIV.appendChild(this.BLOCKLY_DIV);

        var listElem = document.createElement("li");
        listElem.classList = "uk-nav-divider";
/*
         // BLOCKLY DROPDOWN OPTIONS
         this.BLOCKLY_BUTTON = document.createElement("button");
         this.BLOCKLY_BUTTON.classList = "uk-button-xmenu uk-button-primary uk-height-1-1 uk-text-small uk-text-nowrap view-options";
         this.BLOCKLY_BUTTON.textContent = "View\u25BE";
         this.BLOCKLY_BUTTON.id = "blockly_dropdownx";
         this.BLOCKLY_BUTTON.title = "Operations for Blockly files";
         this.BLOCKLY_BUTTON.onclick = () => {
            for (const [id, editor] of Object.entries(this.EDITORS)) {
                if(this.EDITORS[id]._container._tab._element.className.includes("lm_focused")){
                    console.log("active is " + id);
                    localStorage.setItem("activeTabId", id);
                    if(this.EDITORS[id].isBlockly){
                        this.EDITORS[id].BLOCKLY_BUTTON.style.display = "block";
                        this.EDITORS[id].VIEW_BUTTON.style.display = "none";
                        //this.EDITORS[id].VIEW_DROPDOWN.style.display = "inline-block";
                    }
                    else{
                        //this.EDITORS[id].BLOCKLY_BUTTON.style.display = "none";
                        //this.EDITORS[id].VIEW_BUTTON.style.display = "block";
                        //this.EDITORS[id].VIEW_DROPDOWN.style.display = "inline-block";
                        document.getElementById("file_options").style.display = "block";
                        document.getElementById("blockly_dropdown").style.display = "none";
                        document.getElementById("micropython_dropdown").style.display = "inline-block";
                    }
                }
            }
        }
         this.HEADER_TOOLBAR_DIV.appendChild(this.BLOCKLY_BUTTON);

         this.BLOCKLY_DROPDOWN = document.createElement("div");
         this.BLOCKLY_DROPDOWN.setAttribute("uk-dropdown", "mode: click; offset: 0; delay-hide: 200");
         this.HEADER_TOOLBAR_DIV.appendChild(this.BLOCKLY_DROPDOWN);
         this.BLOCKLY_DROPDOWN.addEventListener("mouseleave", () => {
             UIkit.dropdown(this.BLOCKLY_DROPDOWN).hide();
         })

         this.BLOCKLY_DROPDOWN_UL = document.createElement("ul");
         this.BLOCKLY_DROPDOWN_UL.classList = "uk-nav uk-dropdown-nav uk-dark";
         this.BLOCKLY_DROPDOWN.appendChild(this.BLOCKLY_DROPDOWN_UL);

        listElem = document.createElement("li");
        this.OPEN_PYTHON = document.createElement("button");
        this.OPEN_PYTHON.classList = "uk-button-xmenu uk-button-secondary-xmenu uk-button-small uk-width-1-1";
        this.OPEN_PYTHON.textContent = "View MicroPython";
        this.OPEN_PYTHON.title = "View the micropython code generated from this Blockly";
        this.OPEN_PYTHON.onclick = (ev) => {
            document.getElementById("view-python-button").onclick = (ev) => {
                this.opAce.destroy();
            };
            this.opAce = ace.edit("view-python-ace");
            this.opAce.session.setMode("ace/mode/python");
            this.opAce.setReadOnly(true);
            this.opAce.setTheme("ace/theme/tomorrow_night_bright");
            let id = localStorage.getItem("activeTabId");
            this.opAce.setValue(this.EDITORS[id].getValue(), 1);
            UIkit.modal(document.getElementById("view-python-code")).show();
        };
        listElem.appendChild(this.OPEN_PYTHON);
        this.BLOCKLY_DROPDOWN_UL.appendChild(listElem);

        listElem = document.createElement("li");
        this.CONVERT_PYTHON = document.createElement("button");
        this.CONVERT_PYTHON.classList = "uk-button-xmenu uk-button-secondary-xmenu uk-button-small uk-width-1-1";
        this.CONVERT_PYTHON.textContent = "Convert To MicroPython";
        this.CONVERT_PYTHON.title = "Convert this blocks program to a micropython program";
        this.CONVERT_PYTHON.disabled = true;
        this.CONVERT_PYTHON.onclick = async (ev) => {
            //ask if OK to do
            //call onConvert in main.js
            if(! await window.confirmMessage("This will convert your Blocks program to a Python program.<br> Your Blocks program will be put in the trash<br>and a new python program will be created.<br>Are you sure you want to continue?")){
                return;
            }
            let id = localStorage.getItem("activeTabId");
            this.onConvert(this.EDITOR_PATH, this.EDITORS[id].getValue(), id);
        };
        listElem.appendChild(this.CONVERT_PYTHON);
        this.BLOCKLY_DROPDOWN_UL.appendChild(listElem);

        // MICROPYTHON DROPDOWN OPTIONS
        this.VIEW_BUTTON = document.createElement("button");
        this.VIEW_BUTTON.classList = "uk-button-xmenu uk-button-primary uk-height-1-1 uk-text-small uk-text-nowrap view-options";
        this.VIEW_BUTTON.id = "micropython_dropdownx";
        this.VIEW_BUTTON.textContent = "View\u25BE";
        this.VIEW_BUTTON.title = "Operations for MicroPython files";
        this.VIEW_BUTTON.onclick = () => {
            for (const [id, editor] of Object.entries(this.EDITORS)) {
                if(this.EDITORS[id]._container._tab._element.className.includes("lm_focused")){
                    console.log("active is " + id);
                    localStorage.setItem("activeTabId", id);
                    if(this.EDITORS[id].isBlockly){
                        this.EDITORS[id].BLOCKLY_BUTTON.style.display = "block";
                        this.EDITORS[id].VIEW_BUTTON.style.display = "none";
                        this.EDITORS[id].BLOCKLY_DROPDOWN.style.display = "inline-block";
                    }
                    else{
                        //this.EDITORS[id].BLOCKLY_BUTTON.style.display = "none";
                        //this.EDITORS[id].VIEW_BUTTON.style.display = "block";
                        //this.EDITORS[id].VIEW_DROPDOWN.style.display = "inline-block";
                        document.getElementById("file_options").style.display = "block";
                        document.getElementById("blockly_dropdown").style.display = "none";
                        document.getElementById("micropython_dropdown").style.display = "inline-block";
                    }


                }
            }
        }
        //this.HEADER_TOOLBAR_DIV.appendChild(this.VIEW_BUTTON);

        this.VIEW_DROPDOWN = document.createElement("div");
        this.VIEW_DROPDOWN.setAttribute("uk-dropdown", "mode: click; offset: 0; delay-hide: 200");
        this.HEADER_TOOLBAR_DIV.appendChild(this.VIEW_DROPDOWN);
        this.VIEW_DROPDOWN.addEventListener("mouseleave", () => {
            UIkit.dropdown(this.VIEW_DROPDOWN).hide();
        })

        this.VIEW_DROPDOWN_UL = document.createElement("ul");
        this.VIEW_DROPDOWN_UL.classList = "uk-nav uk-dropdown-nav uk-dark";
        this.VIEW_DROPDOWN.appendChild(this.VIEW_DROPDOWN_UL);

        listElem = document.createElement("li");
        this.VIEW_INC_FONT_BUTTON = document.createElement("button");
        this.VIEW_INC_FONT_BUTTON.classList = "uk-button-xmenu uk-button-secondary-xmenu uk-button-small uk-width-1-1";
        this.VIEW_INC_FONT_BUTTON.textContent = "Increase Font";
        this.VIEW_INC_FONT_BUTTON.title = "Increase editor font size";
        this.VIEW_INC_FONT_BUTTON.onclick = () => {
            let id = localStorage.getItem("activeTabId");
            this.EDITORS[id].increaseFontSize();
        };
        listElem.appendChild(this.VIEW_INC_FONT_BUTTON);
        this.VIEW_DROPDOWN_UL.appendChild(listElem);

        listElem = document.createElement("li");
        this.VIEW_DEC_FONT_BUTTON = document.createElement("button");
        this.VIEW_DEC_FONT_BUTTON.classList = "uk-button-xmenu uk-button-secondary-xmenu uk-button-small uk-width-1-1";
        this.VIEW_DEC_FONT_BUTTON.textContent = "Decrease Font";
        this.VIEW_DEC_FONT_BUTTON.title = "Decrease editor font size";
        this.VIEW_DEC_FONT_BUTTON.onclick = () => {
            let id = localStorage.getItem("activeTabId");
            this.EDITORS[id].decreaseFontSize();
        };
        listElem.appendChild(this.VIEW_DEC_FONT_BUTTON);
        this.VIEW_DROPDOWN_UL.appendChild(listElem);

        listElem = document.createElement("li");
        this.VIEW_RESET_FONT_BUTTON = document.createElement("button");
        this.VIEW_RESET_FONT_BUTTON.classList = "uk-button-xmenu uk-button-secondary-xmenu uk-button-small uk-width-1-1";
        this.VIEW_RESET_FONT_BUTTON.textContent = "Reset Font Size";
        this.VIEW_RESET_FONT_BUTTON.title = "Reset font to default";
        this.VIEW_RESET_FONT_BUTTON.onclick = () => {
            UIkit.dropdown(this.VIEW_DROPDOWN).hide();
            let id = localStorage.getItem("activeTabId");
            this.EDITORS[id].resetFontSize();
        };
        listElem.appendChild(this.VIEW_RESET_FONT_BUTTON);
        this.VIEW_DROPDOWN_UL.appendChild(listElem);

        listElem = document.createElement("li");
        this.VIEW_AUTOCOMPLETE_BUTTON = document.createElement("button");
        this.VIEW_AUTOCOMPLETE_BUTTON.classList = "uk-button-xmenu uk-button-secondary-xmenu uk-button-small uk-width-1-1";
        this.VIEW_AUTOCOMPLETE_BUTTON.textContent = "Turn live autocomplete ...";
        this.VIEW_AUTOCOMPLETE_BUTTON.title = "When turned off, basic autocomplete can be accessed using left-ctrl + space. Affects all editors";
        this.VIEW_AUTOCOMPLETE_BUTTON.onclick = () => {
            UIkit.dropdown(this.VIEW_DROPDOWN).hide();
            let id = localStorage.getItem("activeTabId");
            this.EDITORS[id].toggleAutocompleteStateForAll();
        };
        listElem.appendChild(this.VIEW_AUTOCOMPLETE_BUTTON);
        this.VIEW_DROPDOWN_UL.appendChild(listElem);
*/
    }

    turnIntoBlocklyViewer(data) {
        localStorage.setItem("activeTabId", this.ID);
        localStorage.setItem("activeTabFileType", "blockly");
        // hide micropython dropdown options since this is a blockly file
        document.getElementById("micropython_dropdown").style.display = "none";
        document.getElementById("blockly_dropdown").style.display = "inline-block";

        this.isBlockly = true;
        if (this.ACE_EDITOR) this.ACE_EDITOR.destroy();

        if(this.BLOCKLY_WORKSPACE && data != undefined){
            console.log("loaded workspace early notice");
            this.LOADING_BLOCKLY = true; //let the onchange event know that we are loading
            Blockly.serialization.workspaces.load(JSON.parse(data), this.BLOCKLY_WORKSPACE);
        }

        // This must run after the Editor is added to the DOM document
        // otherwise Blockly will refuse to initialise itself.
        this._container.addEventListener("show", ()=>{this.setupBlockly(data)});
        if(document.body.contains(this.BLOCKLY_DIV)){
            this.setupBlockly(data);
        }
    }

    setupBlockly(data) {

        if (!this.BLOCKLY_WORKSPACE) {

            this.BLOCKLY_WORKSPACE = Blockly.inject(this.BLOCKLY_DIV,{
                toolbox: blocklyToolbox,
                move:{
                    scrollbars: {horizontal: true, vertical: true},
                    drag: true,
                    wheel: true},
                zoom:{controls: true, wheel: false,
                    startScale: 1, maxScale: 1, minScale: 0.1, scaleSpeed: 1.2,
                pinch: false},
                trashcan: true
            });

            // Saving of editor state
            this.BLOCKLY_WORKSPACE.addChangeListener((e)=>{
                if(e.type == Blockly.Events.FINISHED_LOADING){
                    this.LOADING_BLOCKLY = false;
                    return;
                }
                if(this.LOADING_BLOCKLY){return}
                if(e.type == Blockly.Events.VIEWPORT_CHANGE || e.isUiEvent){return}
                localStorage.setItem("EditorValue" + this.ID, JSON.stringify(
                    Blockly.serialization.workspaces.save(this.BLOCKLY_WORKSPACE)));
                if(this.SAVED_TO_THUMBY == true || this.SAVED_TO_THUMBY == undefined){
                    if(this.EDITOR_PATH != undefined){
                        this.setTitle("Editor" + this.ID + ' - *' + this.EDITOR_PATH);
                    }else{
                        this.setTitle("*Editor" + this.ID);
                    }

                    this.SAVED_TO_THUMBY = false;
                    localStorage.setItem("EditorSavedToThumby" + this.ID, this.SAVED_TO_THUMBY);
                    this.setTitle(this.EDITOR_TITLE); //call again to set the modified icon
                }
            });

            //blocklyRegister(this.BLOCKLY_WORKSPACE);
            // Ctrl+s / Cmd+s (Save)
            this.BLOCKLY_DIV.onkeydown = (e) => {
              if((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
                  && e.keyCode == 83) {
                let id = localStorage.getItem("activeTabId");
                this.EDITORS[id].onSaveToThumby();
                console.log("Saving File for Tab Id: ", id);
                e.preventDefault();
              }
            };
            this.BLOCKLY_WORKSPACE.onSaveToThumby = this.onSaveToThumby;

            // Restoring of editor state
            var lastEditorValue = localStorage.getItem("EditorValue" + this.ID);
            if(data != undefined){
                this.LOADING_BLOCKLY = true; //let the onchange event know that we are loading
                Blockly.serialization.workspaces.load(JSON.parse(data), this.BLOCKLY_WORKSPACE);
            }else if(lastEditorValue != null){
                this.LOADING_BLOCKLY = true; //let the onchange event know that we are loading
                Blockly.serialization.workspaces.load(JSON.parse(lastEditorValue), this.BLOCKLY_WORKSPACE);
            }else{
                // When adding default editors, give them a path but make each unique by looking at all other open editors
                this.setPath("/untitled-" + this.ID + ".blocks");
                this.setTitle("Editor" + this.ID + ' - *' + this.EDITOR_PATH);

            }
            // Ensure all Blockly editors have a path set. Let's keep it simple for the <3n00bs<3
        }
        this.resize();
        this.BLOCKLY_WORKSPACE.zoomToFit();
        this.BLOCKLY_WORKSPACE.scrollCenter();

    }

    turnIntoCodeViewer(data){

        // Listen for window resize event and re-fit terminal
        this.windowResizeListener = window.addEventListener('resize', this.resize.bind(this));

        // Init the ace editor
        this.ACE_EDITOR = ace.edit(this.EDITOR_DIV);

        this.ACE_EDITOR.session.setMode("ace/mode/python");
        this.ACE_EDITOR.setKeyboardHandler("ace/keyboard/vscode");

        localStorage.setItem("activeTabId", this.ID);
        localStorage.setItem("activeTabFileType", "micropython");
        // hide micropython dropdown options since this is a blockly file
        document.getElementById("blockly_dropdown").style.display = "none";
        document.getElementById("micropython_dropdown").style.display = "inline-block";

        this.setThemeDark();

        this.resize();

        this.INSERT_RESTORE = false;

        // Save value when changes made and edit the title
        this.ACE_EDITOR.session.on('change', (event) => {
            localStorage.setItem("EditorValue" + this.ID, this.ACE_EDITOR.getValue());

            // The first change is always an insert, don't change saved  to thumby flag for first change
            if(this.INSERT_RESTORE == true){
                if(this.SAVED_TO_THUMBY == true || this.SAVED_TO_THUMBY == undefined){
                    if(this.EDITOR_PATH != undefined){
                        this.setTitle("Editor" + this.ID + ' - ' + this.EDITOR_PATH);
                    }else{
                        this.setTitle("*Editor" + this.ID);
                    }
                    this.SAVED_TO_THUMBY = false;
                    localStorage.setItem("EditorSavedToThumby" + this.ID, this.SAVED_TO_THUMBY);
                    this.setTitle(this.EDITOR_TITLE); //call again to set the modified icon
                }
            }else{
                this.INSERT_RESTORE = true;
            }
        });


        // Figure out if the editor should take on stored code, passed, code, or use default code
        var lastEditorValue = localStorage.getItem("EditorValue" + this.ID);
        if(data != undefined){
            this.ACE_EDITOR.setValue(data, 1);
        }else if(lastEditorValue != null){
            this.ACE_EDITOR.setValue(lastEditorValue, 1);
        }else{
            this.ACE_EDITOR.setValue(this.defaultCode, 1);

            this.setPath("/untitled-" + this.ID + ".py");
            this.setTitle("Editor" + this.ID + ' - ' + this.EDITOR_PATH);
        }

        // Make it so you can't undo the code paste into the editor
        this.ACE_EDITOR.session.getUndoManager().reset();

        // Set the font size based on what's saved, if it exists
        var lastEditorFontSize = localStorage.getItem("EditorFontSize" + this.ID);
        this.FONT_SIZE = 10;
        if(lastEditorFontSize != null){
            this.FONT_SIZE = lastEditorFontSize;
        }

        // Get live autocomplete state, true if 'true' or undefined, affects all editors
        this.AUTOCOMPLETE_STATE = (localStorage.getItem("EditorAutocompleteState") === 'true' || localStorage.getItem("EditorAutocompleteState") == undefined);
        this.setAutocompleteButtonText();

        // Set the options that were restored
        this.ACE_EDITOR.setOptions({
            fontSize: this.FONT_SIZE.toString() + "pt",
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: this.AUTOCOMPLETE_STATE,
            enableSnippets: true
        });

        // When the editor has focus capture ctrl-s and do save file function
        this.ACE_EDITOR.commands.addCommand({
            name: 'SaveCurrentTab',
            bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
            exec: () => {
                let id = localStorage.getItem("activeTabId");
                this.EDITORS[id].onSaveToThumby();
                console.log('Saving File for Tab Id: ', id);
            },
            readOnly: true
        });
    }

    disableMenuItems(){
        this.CONVERT_PYTHON.disabled = true;
        this.FS_UPLOAD_BTN.disabled = true;
        this.FILE_EXPORT_BUTTON.disabled = true;
        this.FILE_SAVE_BUTTON.disabled = true;
        this.FILE_SAVEAS_BUTTON.disabled = true;
    }

    enableMenuItems(){
        this.CONVERT_PYTHON.disabled = false;
        this.FS_UPLOAD_BTN.disabled = false;
        this.FILE_EXPORT_BUTTON.disabled = false;
        this.FILE_SAVE_BUTTON.disabled = false;
        this.FILE_SAVEAS_BUTTON.disabled = false;
    }
    checkAllEditorsForPath(path){
        for(const [editorID, editorWrapper] of Object.entries(this.EDITORS)){
            if(editorWrapper.EDITOR_PATH != undefined
                && editorWrapper.EDITOR_PATH.replace(/\.blocks$/, '.py') == path.replace(/\.blocks$/, '.py')
                && editorWrapper.ID != this.ID){
                return true;
            }
        }
        return false;
    }

    // Need special function for this since constructor would come before onOpen def
    useOnOpen() {
        this.onOpen(this);
    }

    setAutocompleteButtonText(){
        if(this.AUTOCOMPLETE_STATE){
            document.getElementById("IDViewAutoComplete").textContent = "Turn live autocomplete OFF";
        }else{
            document.getElementById("IDViewAutoComplete").textContent = "Turn live autocomplete ON";
        }
    }

    setAutocompleteState(state){
        this.ACE_EDITOR.setOptions({
            enableLiveAutocompletion: state,
            enableSnippets: state
        });
        this.AUTOCOMPLETE_STATE = state;
        this.setAutocompleteButtonText();
    }

    toggleAutocompleteStateForAll(){
        if(this.AUTOCOMPLETE_STATE){
            this.AUTOCOMPLETE_STATE = false;
        }else{
            this.AUTOCOMPLETE_STATE = true;
        }

        localStorage.setItem("EditorAutocompleteState", this.AUTOCOMPLETE_STATE);

        // Apply to all editors, even this one
        //[TODO] This should proably only apply to this editor since that is the way fonts work
        for (const [id, editor] of Object.entries(this.EDITORS)) {
            if(!editor.isBlockly) {
                editor.setAutocompleteState(this.AUTOCOMPLETE_STATE);
            }
        }
    }

    setPath(path){
        this.EDITOR_PATH = path;
        localStorage.setItem("EditorPath" + this.ID, this.EDITOR_PATH);
        this.setTitle("Editor" + this.ID + ' - ' + this.EDITOR_PATH);
    }

    compiledPath(){
        if(this.isBlockly){
            return this.EDITOR_PATH.replace(/\.blocks$/, '.py')
        }
        return this.EDITOR_PATH;
    }

    setSaved(){
        this.SAVED_TO_THUMBY = true;
        localStorage.setItem("EditorSavedToThumby" + this.ID, this.SAVED_TO_THUMBY);
    }

    updateTitleSaved(){
        if(this.SAVED_TO_THUMBY == true){
            if(this.EDITOR_PATH != undefined){
                this.setTitle("Editor" + this.ID + ' - ' + this.EDITOR_PATH);
            }else{
                this.setTitle("Editor" + this.ID);
            }
            localStorage.setItem("EditorSavedToThumby" + this.ID, this.SAVED_TO_THUMBY);
        }
    }


    setThemeLight() {
        localStorage.setItem("lastTheme", "light"); // set theme to light
        if(this.ACE_EDITOR){
            this.ACE_EDITOR.setTheme("ace/theme/chrome");
        }
    }

    setThemeDark() {
        localStorage.setItem("lastTheme", "dark"); // set theme to dark
        if(this.ACE_EDITOR){
            this.ACE_EDITOR.setTheme("ace/theme/tomorrow_night_bright");
        }
    }

    setTheme(theme){
        if(this.ACE_EDITOR){
            this.ACE_EDITOR.setTheme(`ace/theme/${theme}`);
        }
    }

    setTitle(title){
        var t = title.split('/').at(-1);
        if(!this.SAVED_TO_THUMBY){
            t = t + " \u2022";
        }
        this._container.setTitle(t);

        // Make the tab title show the full path
        if(this._container._tab != undefined){
            this._container._tab._element.title = this.EDITOR_TITLE.split(" - ")[1];
        }

        this.EDITOR_TITLE = title;
        localStorage.setItem("EditorTitle" + this.ID, title);
    }


    // Needs to be called when editor closed otherwise edits that are spawned again will take on the stored data
    clearStorage(){
        console.log("Removed editor local storage");
        localStorage.removeItem("EditorEMUCheck" + this.ID);
        localStorage.removeItem("EditorValue" + this.ID);
        localStorage.removeItem("EditorTitle" + this.ID);
        localStorage.removeItem("EditorPath" + this.ID);
        localStorage.removeItem("EditorFontSize" + this.ID);
        localStorage.removeItem("EditorSavedToThumby" + this.ID);
        localStorage.removeItem("isBlockly" + this.ID);
    }


    async resize(){
        if(this.ACE_EDITOR != undefined) this.ACE_EDITOR.resize();

        if(this.isBlockly && this.BLOCKLY_WORKSPACE){
            // Position blocklyDiv over blocklyArea.
            if(this.EDITOR_DIV.clientWidth){
                this.BLOCKLY_DIV.style.width = this.EDITOR_DIV.clientWidth + 'px';
            }
            if(this.EDITOR_DIV.clientHeight){
                this.BLOCKLY_DIV.style.height = this.EDITOR_DIV.clientHeight + 'px';
            }
          Blockly.svgResize(this.BLOCKLY_WORKSPACE);
        }
    }


    increaseFontSize(){
        this.FONT_SIZE++;
        this.ACE_EDITOR.setOptions({
            fontSize: this.FONT_SIZE.toString() + "pt",
        });
        localStorage.setItem("EditorFontSize" + this.ID, this.FONT_SIZE);
    }
    decreaseFontSize(){
        if(this.FONT_SIZE - 1 > 0){
            this.FONT_SIZE--;
            this.ACE_EDITOR.setOptions({
                fontSize: this.FONT_SIZE.toString() + "pt",
            });
            localStorage.setItem("EditorFontSize" + this.ID, this.FONT_SIZE);
        }
    }
    resetFontSize(){
        this.FONT_SIZE = 10;
        this.ACE_EDITOR.setOptions({
            fontSize: this.FONT_SIZE.toString() + "pt",
        });
        localStorage.setItem("EditorFontSize" + this.ID, this.FONT_SIZE);
    }


    async openFileContents(contents){
        if(this.SAVED_TO_THUMBY == false && ! await window.confirmMessage('You have unsaved changes. Are you sure you want to overwrite this editor?')) {
            return;
        }
        this.ACE_EDITOR.setValue(contents, 1);
    }


    // Opens a new tab with contents of local file from PC
    async openFile(){
        if(this.SAVED_TO_THUMBY == false && ! await window.confirmMessage('You have unsaved changes. Are you sure you want to overwrite this editor?')) {
            return;
        }

        let fileHandle;
        try{
            [fileHandle] = await window.showOpenFilePicker(this.FILE_OPTIONS);
        }catch(err){
            return;
        }

        const file = await fileHandle.getFile();
        var data = await file.arrayBuffer();

        this.CURRENT_FILE_NAME = file.name;

        this.SAVED_TO_THUMBY = false;
        localStorage.setItem("EditorSavedToThumby" + this.ID, false); //We just imported from the PC, so not saved yet.

        this.initEditorPanelUI(data);

        // Make sure the hover title is set
        this.setTitle("Editor" + this.ID + ' - ' + this.EDITOR_PATH);

        return file.name;
    }



    // Block data as a JSON string, or null
    getBlockData(){
        if(!this.isBlockly){
          return null;
        }
        return JSON.stringify(Blockly.serialization.workspaces.save(this.BLOCKLY_WORKSPACE));
    }

    // Fix anything Blockly did that wouldn't work for MicroPython
    blockly_fix_for_micropython(code){
        return code.replace("from numbers import Number\n", "Number = int\n");
    }

    // Expose common Ace editor operation
    getValue(){
        if(this.isBlockly){
            return (this.blockly_fix_for_micropython(
                  Blockly.Python.workspaceToCode(this.BLOCKLY_WORKSPACE))
                   );
        }else{
            return this.ACE_EDITOR.getValue();
        }
    }

    // Expose common Ace editor operation
    setValue(value, index){
        return this.ACE_EDITOR.setValue(value, index);
    }

    // Wrapper for the ACE editor insert function, used for exporting custom bitmaps to editor
    insert(str){
        if(this.isBlockly){
            const sel = Blockly.getSelected();
            if(sel && (sel.type == 'load_sprite' || sel.type == 'load_anim_sprite')){
                sel.data = str;
                // Save the changed state of the workspace
                localStorage.setItem("EditorValue" + this.ID, JSON.stringify(
                    Blockly.serialization.workspaces.save(this.BLOCKLY_WORKSPACE)));
                updateImageFromSprite(sel);
            }
            else{
                alert("Please select a [load sprite] block.")
            }
        }else{
            this.ACE_EDITOR.insert(str);
        }
    }

    // Wrapper for ACE editor getSelectedText function, used for getting custom bitmaps from editor
    getSelectedText(){
        if(this.isBlockly){
            const sel = Blockly.getSelected();
            return (sel && (sel.type == 'load_sprite' || sel.type == 'load_anim_sprite') ? sel.data : "NO BLOCK");
        }else{
            return this.ACE_EDITOR.getSelectedText();
        }
    };

}
