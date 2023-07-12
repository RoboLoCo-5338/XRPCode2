const PY = Blockly.Python;

Blockly.Python['xrp_straight_effort'] = function (block) {
  PY.definitions_['import_drivetrain'] = 'from XRPLib.differential_drive import DifferentialDrive';
  PY.definitions_[`drietrain_setup`] = `differentialDrive = DifferentialDrive.get_default_differential_drive()`;
  var value_dist = Blockly.Python.valueToCode(block, 'dist', Blockly.Python.ORDER_ATOMIC);
  var value_effort = Blockly.Python.valueToCode(block, 'effort', Blockly.Python.ORDER_ATOMIC);
  var code = `differentialDrive.straight(${value_dist}, ${value_effort})\n`;
  return code;
};

Blockly.Python['xrp_turn_effort'] = function (block) {
  PY.definitions_['import_drivetrain'] = 'from XRPLib.differential_drive import DifferentialDrive';
  PY.definitions_[`drietrain_setup`] = `differentialDrive = DifferentialDrive.get_default_differential_drive()`;
  var value_angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
  var value_effort = Blockly.Python.valueToCode(block, 'effort', Blockly.Python.ORDER_ATOMIC);
  var code = `differentialDrive.turn(${value_angle}, ${value_effort})\n`;
  return code;
};

Blockly.Python['xrp_seteffort'] = function (block) {
  PY.definitions_['import_drivetrain'] = 'from XRPLib.differential_drive import DifferentialDrive';
  PY.definitions_[`drietrain_setup`] = `differentialDrive = DifferentialDrive.get_default_differential_drive()`;
  var value_l = Blockly.Python.valueToCode(block, 'LEFT', Blockly.Python.ORDER_ATOMIC);
  var value_r = Blockly.Python.valueToCode(block, 'RIGHT', Blockly.Python.ORDER_ATOMIC);
  var code = `differentialDrive.set_effort(${value_l}, ${value_r})\n`;
  return code;
};

Blockly.Python['xrp_stop_motors'] = function (block) {
  PY.definitions_['import_drivetrain'] = 'from XRPLib.differential_drive import DifferentialDrive';
  PY.definitions_[`drietrain_setup`] = `differentialDrive = DifferentialDrive.get_default_differential_drive()`;
  var code = `differentialDrive.stop()\n`;
  return code;
};

Blockly.Python['xrp_servo_deg'] = function (block) {
  PY.definitions_['import_servo'] = 'from XRPLib.servo import Servo';
  PY.definitions_[`servo_setup`] = `servo1 = Servo.get_default_servo()`;
  var value_degrees = Blockly.Python.valueToCode(block, 'degrees', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = `servo1.set_angle(${value_degrees})\n`;
  return code;
};

Blockly.Python['xrp_resetencoders'] = function (block) {
  PY.definitions_['import_drivetrain'] = 'from XRPLib.differential_drive import DifferentialDrive';
  PY.definitions_[`drietrain_setup`] = `differentialDrive = DifferentialDrive.get_default_differential_drive()`;
  var value_degrees = Blockly.Python.valueToCode(block, 'degrees', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = `differentialDrive.reset_encoder_position()\n`;
  return code;
};

Blockly.Python['xrp_getleftencoder'] = function (block) {
  PY.definitions_['import_drivetrain'] = 'from XRPLib.differential_drive import DifferentialDrive';
  PY.definitions_[`drietrain_setup`] = `differentialDrive = DifferentialDrive.get_default_differential_drive()`;
  var code = `differentialDrive.get_left_encoder_position()`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['xrp_getrightencoder'] = function (block) {
  PY.definitions_['import_drivetrain'] = 'from XRPLib.differential_drive import DifferentialDrive';
  PY.definitions_[`drietrain_setup`] = `differentialDrive = DifferentialDrive.get_default_differential_drive()`;
  var code = `differentialDrive.get_right_encoder_position()`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['xrp_getsonardist'] = function (block) {
  PY.definitions_['import_rangefinder'] = 'from XRPLib.rangefinder import Rangefinder';
  PY.definitions_[`rangefinder_setup`] = `rangefinder = Rangefinder.get_default_rangefinder()`;
  var code = `rangefinder.distance()`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['xrp_l_refl'] = function (block) {
  PY.definitions_['import_reflectance'] = 'from XRPLib.reflectance import Reflectance';
  PY.definitions_[`reflectance_setup`] = `reflectance = Reflectance.get_default_reflectance()`;
  // TODO: Assemble Python into code variable.
  var code = `reflectance.get_left()`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['xrp_r_refl'] = function (block) {
  PY.definitions_['import_reflectance'] = 'from XRPLib.reflectance import Reflectance';
  PY.definitions_[`reflectance_setup`] = `reflectance = Reflectance.get_default_reflectance()`;
  // TODO: Assemble Python into code variable.
  var code = `reflectance.get_right()`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['xrp_yaw'] = function (block) {
  PY.definitions_['import_imu'] = 'from XRPLib.imu import IMU';
  PY.definitions_[`imu_setup`] = `imu = IMU.get_default_imu()\nimu.calibrate(1)`;
  // TODO: Assemble Python into code variable.
  var code = `imu.get_yaw()`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['xrp_roll'] = function (block) {
  PY.definitions_['import_imu'] = 'from XRPLib.imu import IMU';
  PY.definitions_[`imu_setup`] = `imu = IMU.get_default_imu()\nimu.calibrate(1)`;
  // TODO: Assemble Python into code variable.
  var code = `imu.get_roll()`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['xrp_pitch'] = function (block) {
  PY.definitions_['import_imu'] = 'from XRPLib.imu import IMU';
  PY.definitions_[`imu_setup`] = `imu = IMU.get_default_imu()\nimu.calibrate(1)`;
  // TODO: Assemble Python into code variable.
  var code = `imu.get_pitch()`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['xrp_led_on'] = function (block) {
  PY.definitions_['import_board'] = 'from XRPLib.board import Board';
  PY.definitions_[`board_setup`] = `board = Board.get_default_board()`;
  // TODO: Assemble Python into code variable.
  var code = `board.led_on()\n`;
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

Blockly.Python['xrp_led_off'] = function (block) {
  PY.definitions_['import_board'] = 'from XRPLib.board import Board';
  PY.definitions_[`board_setup`] = `board = Board.get_default_board()`;
  // TODO: Assemble Python into code variable.
  var code = `board.led_off()\n`;
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

Blockly.Python['xrp_button_pressed'] = function (block) {
  PY.definitions_['import_board'] = 'from XRPLib.board import Board';
  PY.definitions_[`board_setup`] = `board = Board.get_default_board()`;
  // TODO: Assemble Python into code variable.
  var code = `board.is_button_pressed()`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['xrp_sleep'] = function (block) {
  PY.definitions_['import_time'] = 'import time';
  var number_time = block.getFieldValue('TIME');
  // TODO: Assemble Python into code variable.
  var code = `time.sleep(${number_time})\n`;
  return code;
};

Blockly.Python['xrp_encoder'] = function (block) {
  PY.definitions_['import_encoder'] = 'import encoder';
  var text_name = block.getFieldValue('NAME');
  var dropdown_pin_a = block.getFieldValue('PIN_A');
  var dropdown_pin_b = block.getFieldValue('PIN_B');
  var checkbox_reversed = block.getFieldValue('REVERSED') === 'TRUE';
  var code = `enc.encoder(a=board${dropdown_pin_a}, b=board.${dropdown_pin_a}, ticksPerRev=144, doFlip=${checkbox_reversed ? 'True' : 'False'})`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['xrp_motor'] = function (block) {
  var text_name = block.getFieldValue('NAME');
  var dropdown_pin_a = block.getFieldValue('PIN_A');
  var dropdown_pin_b = block.getFieldValue('PIN_B');
  var checkbox_reversed = block.getFieldValue('REVERSED') === 'TRUE';
  var value_encoder = Blockly.Python.valueToCode(block, 'ENCODER', Blockly.Python.ORDER_ATOMIC);
  var code = `em.encoded_motor(${value_encoder}, board.${dropdown_pin_a}, board.${dropdown_pin_b}, ${text_name}, doFlip=${checkbox_reversed ? 'True' : 'False'})`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['xrp_drivebase'] = function (block) {
  var text_name = block.getFieldValue('NAME');
  var value_motor_1 = Blockly.Python.valueToCode(block, 'MOTOR_1', Blockly.Python.ORDER_ATOMIC);
  var value_motor_2 = Blockly.Python.valueToCode(block, 'MOTOR_2', Blockly.Python.ORDER_ATOMIC);
  // var value_motor_1 = block.inputList[0].connection.targetBlock().getFieldValue('NAME');
  // var value_motor_2 = block.inputList[1].connection.targetBlock().getFieldValue('NAME');
  var code = `drv.drive(${value_motor_1}, ${value_motor_2})`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['xrp_drivebase_effort'] = function (block) {
  var number_effort1 = block.getFieldValue('EFFORT1');
  var number_effort2 = block.getFieldValue('EFFORT2');
  var value_drivebase = Blockly.Python.valueToCode(block, 'DRIVEBASE', Blockly.Python.ORDER_ATOMIC);
  var code = `${value_drivebase}.setEffort(${number_effort1}, ${number_effort2})\n`;;
  return code;
};

Blockly.Python['xrp_getpos'] = function (block) {
  // Get the name of the connect motor block
  var value_name = Blockly.Python.valueToCode(block, 'MOTOR', Blockly.Python.ORDER_ATOMIC);
  var code = `${value_name}.getPos()`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['xrp_reset_drivebase'] = function (block) {
  var value_drivebase = Blockly.Python.valueToCode(block, 'DRIVEBASE', Blockly.Python.ORDER_ATOMIC);
  var code = `${value_drivebase}.setPos()\n`;
  return code;
};

// ---- NEWER LIB -------


Blockly.Python['xrp_setencoderpos'] = function (block) {
  var value_l = Blockly.Python.valueToCode(block, 'LEFT', Blockly.Python.ORDER_ATOMIC);
  var value_r = Blockly.Python.valueToCode(block, 'RIGHT', Blockly.Python.ORDER_ATOMIC);
  var code = `differentialDrive.set_encoder_position(${value_l}, ${value_r})\n`;
  return code;
};

Blockly.Python['xrp_encoder_counts'] = function (block) {
  var ticks = block.getFieldValue('TICKS');
  var code = `differentialDrive._set_encoder_ticks_per_rev(${ticks})\n`;
  return code;
};

Blockly.Python['xrp_setefforts'] = function (block) {
  var number_val1 = block.getFieldValue('val1');
  // TODO: Assemble Python into code variable.
  var code = `differentialDrive.set_effort(${number_val1})\n`;
  return code;
};


Blockly.Python['xrp_turn'] = function (block) {
//  PY.definitions_['import_drivetrain'] = 'from XRPLib.differential_drive import DifferentialDrive';
//  PY.definitions_[`drietrain_setup`] = `differentialDrive = DifferentialDrive.get_default_differential_drive()`;
  var value_angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = `differentialDrive.turn(${value_angle})\n`;
  return code;
};


Blockly.Python['xrp_straight'] = function (block) {
  var value_dist = Blockly.Python.valueToCode(block, 'dist', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = `differentialDrive.straight(${value_dist})\n`;
  return code;
};


Blockly.Python['xrp_led_br'] = function (block) {
  var value_brightness = Blockly.Python.valueToCode(block, 'brightness', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = `led.set_brightness(${value_brightness})\n`;
  return code;
};

Blockly.Python['xrp_led_co'] = function (block) {
  var value_color_hex = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
  var code = `led.set_color(${value_color_hex})\n`;
  return code;
};

