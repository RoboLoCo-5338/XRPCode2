//Created using https://www.cssscript.com/multi-select-tree/

class MODMANAGER{
    constructor(editorDiv){
        //Creates container div
        this.MOD_MANAGER_DIV = document.createElement("div");
        this.MOD_MANAGER_DIV.classList.add("mod_manager");

        //Header Div
        this.MOD_MANAGER_HEADER_DIV = document.createElement("div");
        this.MOD_MANAGER_HEADER_DIV.classList = "dir_chooser_header uk-label uk-label-danger";
        this.MOD_MANAGER_HEADER_DIV.innerText = "Install or Uninstall Mods";
        this.MOD_MANAGER_DIV.appendChild(this.MOD_MANAGER_HEADER_DIV);

        //If the page is opened for the first time, the available mods are saved to local storage
        if(localStorage.getItem("availableMods") === null || localStorage.getItem("installedMods") === null){
            localStorage.setItem("availableMods", JSON.stringify(mods));
            localStorage.setItem("installedMods", JSON.stringify([]));
        }

        //Creates container div for selecting mods to install
        this.INSTALL_SELECT_DIV = document.createElement("div");
        this.INSTALL_SELECT_DIV.style.marginBottom="20%"
        this.MOD_MANAGER_DIV.appendChild(this.INSTALL_SELECT_DIV);
        //Creates container div for selecting mods to delete
        this.UNINSTALL_SELECT_DIV = document.createElement("div");
        this.MOD_MANAGER_DIV.appendChild(this.UNINSTALL_SELECT_DIV);
        
        //Creates Treeselect for 
        this.INSTALL_SELECT = new Treeselect({
            parentHtmlContainer: this.INSTALL_SELECT_DIV,
            options: JSON.parse(localStorage.getItem("availableMods"))
        });
        this.UNINSTALL_SELECT = new Treeselect({
            parentHtmlContainer: this.UNINSTALL_SELECT_DIV,
            options: JSON.parse(localStorage.getItem("installedMods"))
        });



        //Testing Code
        editorDiv.appendChild(this.MOD_MANAGER_DIV);
        this.MOD_MANAGER_DIV.style.display="flex";
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