class MODMANAGER{

    constructor(){
        this.MOD_MANAGER_DIV = document.createElement("div");
        this.MOD_MANAGER_DIV.classList.add("mod_manager");

        this.MOD_MANAGER_HEADER_DIV = document.createElement("div");
        this.MOD_MANAGER_HEADER_DIV.classList = "dir_chooser_header uk-label uk-label-danger";
        this.MOD_MANAGER_HEADER_DIV.innerText = "SAVE: Choose a Directory & Name:";
        this.MOD_MANAGER_DIV.appendChild(this.MOD_MANAGER_HEADER_DIV);

        this.SELECTION_DIV = document.createElement("div");
        this.TREE_SELECT = new Treeselect({
            parentHTMLContainer: 
        })
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