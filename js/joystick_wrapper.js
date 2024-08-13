// ##### Joystick_WRAPPER.js #####
// Wraps the joystick procedures into a class

class Joystick{


    joysticks = {
        x1: 0.0,
        y1: 0.0,
        x2: 0.0,
        y2: 0.0,
        bA: 0,
        bB: 0,
        bX: 0,
        bY: 0,
        bL: 0,
        bR: 0
    }
 
    //keycodes being used
    left1 = 'KeyA';
    right1 = 'KeyD';
    up1 = 'KeyW';
    down1 = 'KeyS';
    left2 = 'KeyJ';
    right2 = 'KeyL';
    up2 = 'KeyI';
    down2 = 'KeyK';
    buttonA = 'Digit1';
    buttonB = 'Digit2';
    buttonX = 'Digit3';
    buttonY = 'Digit4';
    bumperL = 'Digit5';
    bumperR = 'Digit6';

    listening = false;

    sendPacket = false;

    controllerIndex = 0;

    // Define common objects used within this class right on object init
    // and open a terminal with addon to fit to parent HTML container
    constructor(_container, state){
        // Related to golden-layout
       
        /*
        this._container = _container;

        this.JOY_DIV = document.createElement("div");
        this.JOY_DIV.classList = "joy";
        var JOYBUTTON = document.createElement("button");
        JOYBUTTON.innerHTML = 'Send Info';
        this.JOY_DIV.appendChild(JOYBUTTON);
        var JOYBUTTON2 = document.createElement("button");
        JOYBUTTON2.innerHTML = 'Stop';
        this.JOY_DIV.appendChild(JOYBUTTON2);
        this._container.element.appendChild(this.JOY_DIV);

       JOYBUTTON.onclick = () => {
            this.startPackets();
        };

        JOYBUTTON2.onclick = () => {
            this.stopPackets();
        };

         // Make sure mouse click anywhere on panel focuses the panel
        this._container.element.addEventListener('click', (event) => {
            this._container.focus();
        });
        this._container.element.addEventListener('focusin', (event) => {
            this._container.focus();
        });

        */

        this.intervalID = undefined;
        this.sendAPacket = this.sendAPacket.bind(this);

        // ### CALLBACKS ###
        // Functions defined outside this module but used inside
        this.writeToDevice = undefined;
        this.startListening();
    }
    startPackets(){
        this.startListening();
        this.listening = true;
        this.intervalID = setInterval(this.sendAPacket, 90);
    }

    stopPackets(){
        this.listening = false;
        if(this.intervalID != undefined){
            clearInterval(this.intervalID);
            this.intervalID = undefined;
        }
    }

    async sendAPacket(){
        if(this.sendPacket){
            //if joystick then update the status before sending
            this.updateStatus();
            await this.writeToDevice(JSON.stringify(this.joysticks) + '\r');
        }
    }

    startMovement(keyCode){
        switch(keyCode) {
            case this.left1:
                this.joysticks.x1 = -1.0
                break;
            case this.right1:
                this.joysticks.x1 = 1.0
                break;
            case this.up1:
                this.joysticks.y1 = -1.0
                break;
            case this.down1:
                this.joysticks.y1 = 1.0
                break;
            case this.left2:
                this.joysticks.x2 = -1.0
                break;
            case this.right2:
                this.joysticks.x2 = 1.0
                break;
            case this.up2:
                this.joysticks.y2 = -1.0
                break;
            case this.down2:
                this.joysticks.y2 = 1.0
                break;
            case this.buttonA:
                this.joysticks.bA = 1;
                break;
            case this.buttonB:
                this.joysticks.bB = 1;
                break;
            case this.buttonX:
                this.joysticks.bX = 1;
                break;
            case this.buttonY:
                this.joysticks.bY = 1;
                break;
            case this.bumperL:
                this.joysticks.bL = 1;
                break;
            case this.bumperR:
                this.joysticks.bR = 1;
                break;
        }
    }
    stopMovement(keyCode){
        switch(keyCode) {
            case this.left1:
                this.joysticks.x1 = 0
                break;
            case this.right1:
                this.joysticks.x1 = 0
                break;
            case this.up1:
                this.joysticks.y1 = 0
                break;
            case this.down1:
                this.joysticks.y1 = 0
                break;
            case this.left2:
                this.joysticks.x2 = 0
                break;
            case this.right2:
                this.joysticks.x2 = 0
                break;
            case this.up2:
                this.joysticks.y2 = 0
                break;
            case this.down2:
                this.joysticks.y2 = 0
                break;
            case this.buttonA:
                this.joysticks.bA = 0;
                break;
            case this.buttonB:
                this.joysticks.bB = 0;
                break;
            case this.buttonX:
                this.joysticks.bX = 0;
                break;
            case this.buttonY:
                this.joysticks.bY = 0;
                break;
            case this.bumperL:
                this.joysticks.bL = 0;
                break;
            case this.bumperR:
                this.joysticks.bR = 0;
                break;
        }
    }

    updateStatus() {
        if (this.controllerIndex !== -1) {
            const gamepads = navigator.getGamepads();
            const gamepad = gamepads[this.controllerIndex];
            if (gamepad) {                
                // Assuming at least 4 axis
                this.joysticks.x1 = gamepad.axes[0];
                this.joysticks.y1 = gamepad.axes[1];
                this.joysticks.x2 = gamepad.axes[2];
                this.joysticks.y2 = gamepad.axes[3];
                
                // Assuming at least 6 Buttons
                this.joysticks.bA =  gamepad.buttons[0].value;
                this.joysticks.bB =  gamepad.buttons[0].value;
                this.joysticks.bX =  gamepad.buttons[0].value;
                this.joysticks.bY =  gamepad.buttons[0].value;
                this.joysticks.bL =  gamepad.buttons[0].value;
                this.joysticks.bR =  gamepad.buttons[0].value;

            }
        }
    }

    startJoyPackets(){
        this.startPackets();
        this.sendPacket = true;
    }

    stopJoyPackets(){
        this.stopPackets();
    }

    startListening(){
    // Event listener for keydown events
        document.addEventListener('keydown', (event) => {
            if(this.listening){
                //this.sendPacket = false;
                //event.preventDefault(); // Prevent default scroll behavior
                this.startMovement(event.code);
                //this.sendPacket = true;
            }
        });

        // Event listener for keyup events
        document.addEventListener('keyup', (event) => {
            if(this.listening){
                //this.sendPacket = false;
                //event.preventDefault(); // Prevent default scroll behavior
                this.stopMovement(event.code);
                //this.sendPacket = true;
            }
        });

        window.addEventListener("gamepadconnected", (event) => {
            this.controllerIndex = event.gamepad.index;
        });

        window.addEventListener("gamepaddisconnected", (event) => {
            if (this.controllerIndex === event.gamepad.index) {
                this.controllerIndex = -1;
            }
        });
    }
}
