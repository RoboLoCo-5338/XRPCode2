
Blockly.Blocks['xrp_motor_effort'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Motor:")
      .appendField(new Blockly.FieldDropdown([["Left", "1"], ["Right", "2"], ["3", "3"], ["4", "4"]]), "MOTOR")
      .appendField("effort:")
      .appendField(new Blockly.FieldNumber(0.8, -1, 1), 'effortNumber');
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
      .appendField("Motor:")
      .appendField(new Blockly.FieldDropdown([["Left", "1"], ["Right", "2"], ["3", "3"], ["4", "4"]]), "MOTOR")
      .appendField("speed:")
      .appendField(new Blockly.FieldNumber(10), 'speedNumber');
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

Blockly.Blocks['xrp_motor_get_ticks'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Motor:")
      .appendField(new Blockly.FieldDropdown([["Left", "1"], ["Right", "2"], ["3", "3"], ["4", "4"]]), "MOTOR")
      .appendField("Ticks")
    this.setOutput(true, null);
    this.setColour(0);
    this.setTooltip("Get the number of encoder ticks of the selected motor since the last reset");
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
    this.setTooltip("Reset the position and ticks for the selected motor");
    this.setHelpUrl("");
  }
};

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
    this.appendDummyInput()
        .appendField('Turn')
        .appendField(new Blockly.FieldNumber(90, -360, 360), 'angle')
        .appendField("Effort")
        .appendField(new Blockly.FieldNumber(0.5, -1, 1), 'effort');
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
        .setCheck(null)
        .appendField("L:");
    this.appendValueInput("RIGHT")
        .setCheck(null)
        .appendField("R:");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("");
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

Blockly.Blocks['xrp_resetencoders'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Reset Encoders");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_getleftencoder'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Left Encoder");
    this.setOutput(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_getrightencoder'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Right Encoder");
    this.setOutput(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

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

Blockly.Blocks['xrp_encoder'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Encoder:")
      .appendField(new Blockly.FieldTextInput("myEncoder"), "NAME")
      .appendField(new Blockly.FieldDropdown([["GP2", "GP2"], ["GP3", "GP3"], ["GP4", "GP4"], ["GP5", "GP5"]]), "PIN_A")
      .appendField(new Blockly.FieldDropdown([["GP2", "GP2"], ["GP3", "GP3"], ["GP4", "GP4"], ["GP5", "GP5"]]), "PIN_B")
      .appendField("Reversed?")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "REVERSED");
    this.setOutput(true, null);
    this.setColour(65);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_motor'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Motor:")
      .appendField(new Blockly.FieldTextInput("myMotor"), "NAME")
      .appendField(new Blockly.FieldDropdown([["GP8", "GP8"], ["GP9", "GP9"], ["GP10", "GP10"], ["GP11", "GP11"]]), "PIN_A")
      .appendField(new Blockly.FieldDropdown([["GP8", "GP8"], ["GP9", "GP9"], ["GP10", "GP10"], ["GP11", "GP11"]]), "PIN_B")
      .appendField("Reversed?")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "REVERSED");
    this.appendValueInput("ENCODER")
      .setCheck("xrp_encoder")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Encoder");
    this.setOutput(true, null);
    this.setColour(330);
    this.setTooltip("Add encoder block");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_drivebase'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Drivebase:")
      .appendField(new Blockly.FieldTextInput("myDrivebase"), "NAME");
    this.appendValueInput("MOTOR_1")
      .setCheck("xrp_motor")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Motor 1");
    this.appendValueInput("MOTOR_2")
      .setCheck("xrp_motor")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Motor 2");
    this.setOutput(true, null);
    this.setColour(210);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_drivebase_effort'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Set Effort");
    this.appendDummyInput()
      .appendField("Effort 1:")
      .appendField(new Blockly.FieldNumber(0, -1, 1), "EFFORT1")
      .appendField("Effort 2:")
      .appendField(new Blockly.FieldNumber(0, -1, 1), "EFFORT2");
    this.appendValueInput("DRIVEBASE")
      .setCheck("xrp_drivebase")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Drivebase:");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_getpos'] = {
  init: function () {
    this.appendValueInput("MOTOR")
      .setCheck("xrp_motor")
      .appendField("Get Motor Position");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_reset_drivebase'] = {
  init: function () {
    this.appendValueInput("DRIVEBASE")
      .setCheck("xrp_drivebase")
      .appendField("Reset Drivebase Positions");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



Blockly.Blocks['xrp_setencoderpos'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set Encoder Positions");
    this.appendValueInput("LEFT")
        .setCheck(null)
        .appendField("L:");
    this.appendValueInput("RIGHT")
        .setCheck(null)
        .appendField("R:");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['xrp_encoder_counts'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Set Encoder Tick Mode:")
      .appendField(new Blockly.FieldDropdown([["Legacy", "drivetrain._LEGACY_TICKS_PER_REV"], ["New", "drivetrain._NEW_TICKS_PER_REV"]]), "TICKS")
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

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

Blockly.Blocks['xrp_setefforts'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Set Efforts")
      .appendField(new Blockly.FieldNumber(0), "val1");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['xrp_turn'] = {
  init: function () {
    this.appendValueInput("angle")
      .setCheck("Number")
      .appendField("Turn");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



Blockly.Blocks['xrp_straight'] = {
  init: function () {
    this.appendValueInput("dist")
      .setCheck("Number")
      .appendField("Drive Straight");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



Blockly.Blocks['xrp_led_br'] = {
  init: function () {
    this.appendValueInput("brightness")
      .setCheck("Number")
      .appendField("LED Brightness");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['xrp_led_co'] = {
  init: function() {
    this.appendValueInput("color")
        .setCheck(null)
        .appendField("LED Color");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};





