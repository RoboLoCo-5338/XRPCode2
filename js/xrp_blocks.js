

// Individual Motors
Blockly.Blocks['xrp_motor_effort'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Motor:")
      .appendField(new Blockly.FieldDropdown([["Left", "1"], ["Right", "2"], ["3", "3"], ["4", "4"]]), "MOTOR")
      .appendField("effort:")
      this.appendValueInput("effort")
        .setCheck("Number")
    this.setInputsInline(true)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);  
    this.setColour(0);
    this.setTooltip("Set the effort for the selected motor");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_motor_speed'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Motor")
      .appendField(new Blockly.FieldDropdown([["Left", "1"], ["Right", "2"], ["3", "3"], ["4", "4"]]), "MOTOR")
      .appendField("Speed")
      this.appendValueInput("speed")
        .setCheck("Number")
    this.setInputsInline(true)  
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);  
    this.setColour(0);
    this.setTooltip("Set the speed in RPM for the selected motor");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_motor_get_speed'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Motor:")
      .appendField(new Blockly.FieldDropdown([["Left", "1"], ["Right", "2"], ["3", "3"], ["4", "4"]]), "MOTOR")
      .appendField("Speed")
    this.setOutput(true, null);
    this.setColour(0);
    this.setTooltip("Get the speed of the selected motor");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_motor_direction'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Motor:")
      .appendField(new Blockly.FieldDropdown([["Left", "1"], ["Right", "2"], ["3", "3"], ["4", "4"]]), "MOTOR")
      .appendField("direction:")
      .appendField(new Blockly.FieldDropdown([["Reverse", "True"], ["Forward", "False"]]), "DIRECTION");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);  
    this.setColour(0);
    this.setTooltip("Set the default direction of the selected motor");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_motor_get_position'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Motor:")
      .appendField(new Blockly.FieldDropdown([["Left", "1"], ["Right", "2"], ["3", "3"], ["4", "4"]]), "MOTOR")
      .appendField("Position")
    this.setOutput(true, null);
    this.setColour(0);
    this.setTooltip("Get the position (number of revolutions) of the selected motor since the last reset");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_motor_get_count'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Motor:")
      .appendField(new Blockly.FieldDropdown([["Left", "1"], ["Right", "2"], ["3", "3"], ["4", "4"]]), "MOTOR")
      .appendField("Encoder count")
    this.setOutput(true, null);
    this.setColour(0);
    this.setTooltip("Get the number of encoder count of the selected motor since the last reset");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_motor_reset_position'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Motor:")
      .appendField(new Blockly.FieldDropdown([["Left", "1"], ["Right", "2"], ["3", "3"], ["4", "4"]]), "MOTOR")
      .appendField("Reset Encoder")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);  
    this.setColour(0);
    this.setTooltip("Reset the position and count for the selected motor");
    this.setHelpUrl("");
  }
};

// DriveTrain
Blockly.Blocks['xrp_straight_effort'] = {
  init: function () {
    this.appendValueInput("dist")
      .setCheck("Number")
      .appendField("Drive Straight");
    this.appendValueInput("effort")
      .setCheck("Number")
      .appendField("Effort");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_turn_effort'] = {
  init: function () {
    this.appendValueInput("degrees")
      .setCheck("Number")
      .appendField("Turn");
    this.appendValueInput("effort")
      .setCheck("Number")
      .appendField("Effort");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_seteffort'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set Effort");
    this.appendValueInput("LEFT")
        .setCheck("Number")
        .appendField("Left");
    this.appendValueInput("RIGHT")
        .setCheck("Number")
        .appendField("Right");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_speed'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Set Speed");
    this.appendValueInput("LEFT")
      .setCheck(null)
      .appendField("Left");
    this.appendValueInput("RIGHT")
      .setCheck(null)
      .appendField("Right");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);  
    this.setColour(0);
    this.setTooltip("Set the speed in RPM for the motors");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_stop_motors'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Stop Motors");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_resetencoders'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Reset Encoders");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(0);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_getleftencoder'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Left Encoder");
    this.setOutput(true, null);
    this.setColour(0);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_getrightencoder'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Right Encoder");
    this.setOutput(true, null);
    this.setColour(0);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Servo
Blockly.Blocks['xrp_servo_deg'] = {
  init: function () {
    this.appendValueInput("degrees")
      .setCheck("Number")
      .appendField('Set Servo1 \xB0:');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Sonar
Blockly.Blocks['xrp_getsonardist'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Sonar Distance");
    this.setOutput(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

//reflectance
Blockly.Blocks['xrp_l_refl'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Left Reflectance");
    this.setOutput(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_r_refl'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Right Reflectance");
    this.setOutput(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

//Gyro
Blockly.Blocks['xrp_yaw'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Yaw");
    this.setOutput(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("The amount the robot has turned left or right from center");
  }
};

Blockly.Blocks['xrp_roll'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Roll");
    this.setOutput(true, null);
    this.setColour(60);
    this.setTooltip("The amount of tipping to the left or right");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_pitch'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Pitch");
    this.setOutput(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("The amount the front of the robot is tilting up or down");
  }
};

//Accelerometer 
Blockly.Blocks['xrp_acc_x'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("acc_x");
    this.setOutput(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("The acceleration in the X direction");
  }
};

Blockly.Blocks['xrp_acc_y'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("acc_y");
    this.setOutput(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("The acceleration in the Y direction");
  }
};

Blockly.Blocks['xrp_acc_z'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("acc_z");
    this.setOutput(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("The acceleration in the Z direction");
  }
};

//Control Board
Blockly.Blocks['xrp_led_on'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("LED on");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_led_off'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("LED off");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_button_pressed'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("User Button");
    this.setOutput(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_wait_for_button_press'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Wait for Button Press");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

//Web Server
Blockly.Blocks['xrp_ws_forward_button'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Web Forward Button  Function")
      .appendField(new Blockly.FieldDropdown(generateFunctionNames), "NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_ws_back_button'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Web Back Button  Function")
      .appendField(new Blockly.FieldDropdown(generateFunctionNames), "NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_ws_left_button'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Web Left Button  Function")
      .appendField(new Blockly.FieldDropdown(generateFunctionNames), "NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_ws_right_button'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Web Right Button  Function")
      .appendField(new Blockly.FieldDropdown(generateFunctionNames), "NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_ws_stop_button'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Web Stop Button  Function")
      .appendField(new Blockly.FieldDropdown(generateFunctionNames), "NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_ws_add_button'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Web Add Button  Name")
      .appendField( new Blockly.FieldTextInput("name"),"TEXT")
      .appendField("Function")
      .appendField(new Blockly.FieldDropdown(generateFunctionNames), "NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_ws_log_data'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Web Log Data");
    this.appendValueInput("log_name")
      .appendField("Label")
      .setCheck("String");
    this.appendValueInput("DATA")
      .appendField("Data");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_ws_start_server'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Start Web Server ID");
    this.appendValueInput("id")
      .setCheck("Number")
    this.setInputsInline(true)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

//Logic
Blockly.Blocks['xrp_sleep'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Sleep")
      .appendField(new Blockly.FieldNumber(0, 0), "TIME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(200);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

var fake_funcs = null;  
function generateFunctionNames() {

  if(fake_funcs != null){
    return fake_funcs;
  }
  // Get a list of all the function definition blocks.
  var blocks = Blockly.getMainWorkspace().getAllBlocks();
  var functionDefinitions = blocks.filter(block => block.type === 'procedures_defnoreturn');

  // Generate the dropdown options.
  var dropdownOptions = functionDefinitions.map(functionDef => {
    var functionName = functionDef.getFieldValue('NAME');
    return [functionName, functionName];
  });

  if(dropdownOptions.length == 0){
    dropdownOptions = [["",""]];
  }
  return dropdownOptions;
}

/*
  This is a fix for a problem with the way that workspaces are loaded. When working with a workspace that is doing webserver
  many of the calls take a function as an input. We create a list of functions and allow the user to select one. But, when a saved
  serialization is reloaded the functions available are only those that were loaded before the block that included the function.
  If the function needed has not been loaded yet, then the list will not included it and the block will show a different selected
  function. To solve this when the workspace is serialized it calls our saveFn and we save out the list. Then when we reload the 
  workspace we can fake out the full list of functions during our loadFn. Since our IDE always saves the workspace to localstorage
  whenever there is a change, we also reset the fake_funcs back to null and we are back to using live functions.
*/
Blockly.serialization.registry.register(
  'ws_function_list',  // Name
  {
    save: saveFn,      // Save function
    load: loadFn,      // Load function
    clear: clearFn,    // Clear function
    priority: 100,      // Priority
  });

function saveFn(ws){
  fake_funcs = null;
  return generateFunctionNames(); //save off the state off all the functions
}
function loadFn(state, ws){
  fake_funcs = state;
}
function clearFn(){
}



