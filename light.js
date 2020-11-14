const hap = require("hap-nodejs");

const Accessory = hap.Accessory;
const Characteristic = hap.Characteristic;
const CharacteristicEventTypes = hap.CharacteristicEventTypes;
const Service = hap.Service;

// optionally set a different storage location with code below
// hap.HAPStorage.setCustomStoragePath("...");

var accUUID = hap.uuid.generate('hap-nodejs:accessories:switch');
var accessory = exports.accessory = new Accessory("Switch", accUUID);


accessory.username = "1A:AA:AA:AA:AA:AA";
accessory.pincode = "031-45-154";

let displayName = "Multiple Buttons";

const labelService = new Service.ServiceLabel(displayName)

labelService.getCharacteristic(Characteristic.ServiceLabelNamespace)
  .setValue(Characteristic.ServiceLabelNamespace.ARABIC_NUMERALS)
  accessory.addService(labelService)

const button1Service = new Service.StatelessProgrammableSwitch('Button 1', 1)
button1Service.getCharacteristic(Characteristic.ProgrammableSwitchEvent)
  .setProps({
    minValue: Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS,
    maxValue: Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS
  })
button1Service.getCharacteristic(Characteristic.ServiceLabelIndex)
  .setValue(1)
  accessory.addService(button1Service)

const button2Service = new Service.StatelessProgrammableSwitch('Button 2', 2)
button2Service.getCharacteristic(Characteristic.ProgrammableSwitchEvent)
  .setProps({
    minValue: Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS,
    maxValue: Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS
  })
button2Service.getCharacteristic(Characteristic.ServiceLabelIndex)
  .setValue(2)

accessory.addService(button2Service)

// once everything is set up, we publish the accessory. Publish should always be the last step!
accessory.publish({
  username: "18:51:07:F4:BC:8A",
  pincode: "678-90-876",
  port: 47129,
  category: hap.Categories.LIGHTBULB, // value here defines the symbol shown in the pairing screen
});

console.log("Accessory setup finished!");


function pressButton1(arg) {
    button1Service.getCharacteristic(Characteristic.ProgrammableSwitchEvent).setValue(Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS);
    setTimeout(pressButton2, 3000);
}

function pressButton2(arg) {
    button2Service.getCharacteristic(Characteristic.ProgrammableSwitchEvent).setValue(Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS);
    setTimeout(pressButton1, 3000);
}

pressButton1();



