//Created using https://www.cssscript.com/multi-select-tree/

class MODMANAGER{
    constructor(){
        //Creates container div
        this.MOD_MANAGER_DIV = document.createElement("div");
        this.MOD_MANAGER_DIV.classList.add("mod_manager");

        //#region Header Div
        this.MOD_MANAGER_HEADER_DIV = document.createElement("div");
        this.MOD_MANAGER_HEADER_DIV.classList = "mod_manager_header uk-label uk-label-danger";
        this.MOD_MANAGER_HEADER_DIV.innerText = "Install or Uninstall Mods";
        this.MOD_MANAGER_DIV.appendChild(this.MOD_MANAGER_HEADER_DIV);
        //#endregion

        //If the page is opened for the first time, the available mods are saved to local storage
        if(localStorage.getItem("availableMods") === null || localStorage.getItem("installedMods") === null){
            localStorage.setItem("availableMods", JSON.stringify(mods));
            localStorage.setItem("installedMods", JSON.stringify([]));
        }

        //#region Selection Divs
        //Creates container div for selecting mods to install
        this.INSTALL_SELECT_LABEL = document.createElement("label");
        this.INSTALL_SELECT_LABEL.innerHTML = "Install Mods";
        this.INSTALL_SELECT_LABEL.className = "name_label";
        this.MOD_MANAGER_DIV.appendChild(this.INSTALL_SELECT_LABEL);

        this.INSTALL_SELECT_DIV = document.createElement("div");
        this.INSTALL_SELECT_DIV.style.marginBottom="80%";
        this.MOD_MANAGER_DIV.appendChild(this.INSTALL_SELECT_DIV);

        //Creates Treeselect for available mods
        this.INSTALL_SELECT = new Treeselect({
            parentHtmlContainer: this.INSTALL_SELECT_DIV,
            options: JSON.parse(localStorage.getItem("availableMods"))
        });
        //#endregion

        //#region Footer Div
        this.MOD_MANAGER_FOOTER_DIV = document.createElement("div");
        this.MOD_MANAGER_FOOTER_DIV.classList.add("mod_manager_footer");
        this.MOD_MANAGER_DIV.appendChild(this.MOD_MANAGER_FOOTER_DIV);

        //Footer Button Container
        this.MOD_MANAGER_FOOTER_BTNS = document.createElement("div");
        this.MOD_MANAGER_FOOTER_BTNS.classList.add("mod_manager_footer_buttons");
        this.MOD_MANAGER_FOOTER_DIV.appendChild(this.MOD_MANAGER_FOOTER_BTNS);

        this.MOD_MANAGER_FOOTER_SAVE_BTN = document.createElement("button");
        this.MOD_MANAGER_FOOTER_SAVE_BTN.classList = "uk-button uk-button-primary uk-width-1-1 uk-height-1-1 uk-text-nowrap";
        this.MOD_MANAGER_FOOTER_SAVE_BTN.textContent = "SAVE";
        this.MOD_MANAGER_FOOTER_SAVE_BTN.onclick = () => (this.WAITING_FOR_USER = 0);
        this.MOD_MANAGER_FOOTER_BTNS.appendChild(this.MOD_MANAGER_FOOTER_SAVE_BTN);

        this.MOD_MANAGER_FOOTER_CANCEL_BTN = document.createElement("button");
        this.MOD_MANAGER_FOOTER_CANCEL_BTN.classList = "uk-button uk-button-primary uk-width-1-1 uk-height-1-1 uk-text-nowrap";
        this.MOD_MANAGER_FOOTER_CANCEL_BTN.textContent = "CANCEL";
        this.MOD_MANAGER_FOOTER_CANCEL_BTN.onclick = () => (this.WAITING_FOR_USER = -1);
        this.MOD_MANAGER_FOOTER_BTNS.appendChild(this.MOD_MANAGER_FOOTER_CANCEL_BTN);
        //#endregion

    }
    show(editorDiv){
        this.INSTALL_SELECT.options=JSON.parse(localStorage.getItem("availableMods"));
        editorDiv.appendChild(this.MOD_MANAGER_DIV);
        this.MOD_MANAGER_DIV.style.display="flex";
    }
    async userExit(){
        this.WAITING_FOR_USER=1;
        while (this.WAITING_FOR_USER == 1){
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        this.MOD_MANAGER_DIV.style.display="none";
        if(this.WAITING_FOR_USER==0){
            console.log(this.INSTALL_SELECT.value);
        }
    }
}
const mods = [
    {
        name: "Sensors",
        value: "Sensors",
        children: [
            {
                name: "A3144 Hall Effect Sensor",
                value: "A3144 Hall Effect Sensor",
                children: []
            }
        ]
    },
    {
        name: "Displays",
        value: "Displays",
        children: [
            {
                name: "Zio Qwiic OLED Display",
                value: "Zio Qwiic OLED Display",
                children: []
            }
        ]
    },
    {
        name: "Audio",
        value: "Audio",
        children: [
            {
                name: "Qwiic Buzzer",
                value: "Qwiic Buzzer",
                children: []
            }
        ]
    }
];
