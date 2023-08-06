
/*
    This file creates each Block item for Blockly.
    You can set and update the colors here based off the HUE value.
    You can also set tooltips and help Urls.
    Helpful Resource --> https://developers.google.com/blockly/guides/configure/web/appearance/themes
*/

// Individual Motors
Blockly.Blocks['xrp_motor_effort'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Motor:")
      .appendField(new Blockly.FieldDropdown([["Left", "1"], ["Right", "2"], ["3", "3"], ["4", "4"]]), "MOTOR")
      .appendField("Effort:");
    this.appendValueInput("effort")
      .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(352); // crimson
    this.setTooltip("Set the effort for the selected motor");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_motor_speed'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Motor:")
      .appendField(new Blockly.FieldDropdown([["Left", "1"], ["Right", "2"], ["3", "3"], ["4", "4"]]), "MOTOR")
      .appendField("Speed:");
    this.appendValueInput("speed")
      .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(352); // crimson
    this.setTooltip("Set the speed in rotations per minute(RPM) for the selected motor");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_motor_direction'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Motor:")
      .appendField(new Blockly.FieldDropdown([["Left", "1"], ["Right", "2"], ["3", "3"], ["4", "4"]]), "MOTOR")
      .appendField("Direction:")
      .appendField(new Blockly.FieldDropdown([["Reverse", "True"], ["Forward", "False"]]), "DIRECTION");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(352); // crimson
    this.setTooltip("Set the default direction of the selected motor");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_motor_get_speed'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Motor:")
      .appendField(new Blockly.FieldDropdown([["Left", "1"], ["Right", "2"], ["3", "3"], ["4", "4"]]), "MOTOR")
      .appendField("Speed");
    this.setOutput(true, null);
    this.setColour(352); // crimson
    this.setTooltip("Get the speed of the selected motor");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_motor_get_position'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Motor:")
      .appendField(new Blockly.FieldDropdown([["Left", "1"], ["Right", "2"], ["3", "3"], ["4", "4"]]), "MOTOR")
      .appendField("Position");
    this.setOutput(true, null);
    this.setColour(352); // crimson
    this.setTooltip("Get the position (number of revolutions) of the selected motor since the last reset");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_motor_get_count'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Motor:")
      .appendField(new Blockly.FieldDropdown([["Left", "1"], ["Right", "2"], ["3", "3"], ["4", "4"]]), "MOTOR")
      .appendField("Encoder count");
    this.setOutput(true, null);
    this.setColour(352); // crimson
    this.setTooltip("Get the number of encoder count of the selected motor since the last reset");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_motor_reset_position'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Motor:")
      .appendField(new Blockly.FieldDropdown([["Left", "1"], ["Right", "2"], ["3", "3"], ["4", "4"]]), "MOTOR")
      .appendField("Reset encoder")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(352); // crimson
    this.setTooltip("Reset the position and count for the selected motor");
    this.setHelpUrl("");
  }
};

// DriveTrain
Blockly.Blocks['xrp_straight_effort'] = {
  init: function () {
    this.appendValueInput("dist")
      .setCheck("Number")
      .appendField("Straight")
      .appendField("cm:");
    this.appendValueInput("effort")
      .setCheck("Number")
      .appendField("Effort:");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(10); // orange
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_turn_effort'] = {
  init: function () {
    this.appendValueInput("degrees")
      .setCheck("Number")
      .appendField("Turn  Deg:");
    this.appendValueInput("effort")
      .setCheck("Number")
      .appendField("Effort:");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(10); // orange
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_seteffort'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Set effort");
    this.appendValueInput("LEFT")
      .setCheck("Number")
      .appendField("Left:");
    this.appendValueInput("RIGHT")
      .setCheck("Number")
      .appendField("Right:");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(10); // orange
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_speed'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Set speed");
    this.appendValueInput("LEFT")
      .setCheck(null)
      .appendField("Left:");
    this.appendValueInput("RIGHT")
      .setCheck(null)
      .appendField("Right:");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(10); // orange
    this.setTooltip("Set the speed in RPM for the motors");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_stop_motors'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Stop motors");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(10); // orange
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_resetencoders'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Reset encoders");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(10); // orange
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_getleftencoder'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Left encoder");
    this.setOutput(true, null);
    this.setColour(10); // orange
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_getrightencoder'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Right encoder");
    this.setOutput(true, null);
    this.setColour(10); // orange
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Servo
Blockly.Blocks['xrp_servo_deg'] = {
  init: function () {
    this.appendValueInput("degrees")
      .setCheck("Number")
      .appendField('Servo1  Deg:');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300); // light purple
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_servo2_deg'] = {
  init: function () {
    this.appendValueInput("degrees")
      .setCheck("Number")
      .appendField('Servo2  Deg:');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300); // light purple
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Sensors - Sonar
Blockly.Blocks['xrp_getsonardist'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Sonar distance");
    this.setOutput(true, null);
    this.setColour(90); // soft green
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

//Sensors - Reflectance
Blockly.Blocks['xrp_l_refl'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Left reflectance");
    this.setOutput(true, null);
    this.setColour(90); // soft green
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_r_refl'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Right reflectance");
    this.setOutput(true, null);
    this.setColour(90); // soft green
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

//Sensors - Gyro
Blockly.Blocks['xrp_yaw'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Yaw");
    this.setOutput(true, null);
    this.setColour(90); // soft green
    this.setTooltip("");
    this.setHelpUrl("The amount the robot has turned left or right from center");
  }
};

Blockly.Blocks['xrp_roll'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Roll");
    this.setOutput(true, null);
    this.setColour(90); // soft green
    this.setTooltip("The amount of tipping to the left or right");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_pitch'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Pitch");
    this.setOutput(true, null);
    this.setColour(90); // soft green
    this.setTooltip("");
    this.setHelpUrl("The amount the front of the robot is tilting up or down");
  }
};

//Sensors - Accelerometer
Blockly.Blocks['xrp_acc_x'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Acc_x");
    this.setOutput(true, null);
    this.setColour(90); // soft green
    this.setTooltip("");
    this.setHelpUrl("The acceleration in the X direction");
  }
};

Blockly.Blocks['xrp_acc_y'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Acc_y");
    this.setOutput(true, null);
    this.setColour(90); // soft green
    this.setTooltip("");
    this.setHelpUrl("The acceleration in the Y direction");
  }
};

Blockly.Blocks['xrp_acc_z'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Acc_z");
    this.setOutput(true, null);
    this.setColour(90); // soft green
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
    this.setColour(150); // darker teal
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
    this.setColour(150); // darker teal
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// "User Button"
Blockly.Blocks['xrp_button_pressed'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("User button");
    this.setOutput(true, null);
    this.setColour(150); // darker teal
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// "Wait for Button Press"
Blockly.Blocks['xrp_wait_for_button_press'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Wait for button press");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(150); // darker teal
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

//Web Server
Blockly.Blocks['xrp_ws_forward_button'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Web forward button")
    this.appendStatementInput('func')
      .appendField('Function:');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190); // turquoise
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_ws_back_button'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Web back button")
    this.appendStatementInput('func')
      .appendField('Function:');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190); // turquoise
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_ws_left_button'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Web left button")
    this.appendStatementInput('func')
      .appendField('Function:'); this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190); // turquoise
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_ws_right_button'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Web right button")
    this.appendStatementInput('func')
      .appendField('Function:'); this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190); // turquoise
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_ws_stop_button'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Web stop button")
    this.appendStatementInput('func')
      .appendField('Function:'); this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190); // turquoise
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_ws_add_button'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Web add button  Name:")
      .appendField(new Blockly.FieldTextInput("name"), "TEXT")
    this.appendStatementInput('func')
      .appendField('Function:');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190); // turquoise
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_ws_log_data'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Web log data");
    this.appendValueInput("log_name")
      .appendField("Label:")
      .setCheck("String");
    this.appendValueInput("DATA")
      .appendField("Data:");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190); // turquoise
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_ws_start_server'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Start web server");
    this.appendValueInput("server_ssid")
      .appendField("Name:")
      .setCheck("String");
    this.appendValueInput("server_pwd")
      .appendField("Password:")
      .setCheck("String");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190); // turquoise
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Logic
Blockly.Blocks['xrp_sleep'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Sleep:")
      .appendField(new Blockly.FieldNumber(0.5,0), "TIME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(200); // slate blue
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// OTHER BLOCK COLORS - These colors can be found in the xrp_blockly_toolbox1.js file
// BLOCK TYPE --> COLOR
// Loops --> grass green
// Math --> indigo
// Text --> sea foam green
// Lists --> eggplant purple
// Variables --> grey
// Functions --> medium purple
