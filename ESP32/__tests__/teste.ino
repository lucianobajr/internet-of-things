/*
  LED Control

  This example scans for Bluetooth® Low Energy peripherals until one with the advertised service
  "19b10000-e8f2-537e-4f6c-d104768a1214" UUID is found. Once discovered and connected,
  it will remotely control the Bluetooth® Low Energy peripheral's LED, when the button is pressed or released.

  The circuit:
  - Arduino MKR WiFi 1010, Arduino Uno WiFi Rev2 board, Arduino Nano 33 IoT,
    Arduino Nano 33 BLE, or Arduino Nano 33 BLE Sense board.
  - Button with pull-up resistor connected to pin 2.

  You can use it with another board that is compatible with this library and the
  Peripherals -> LED example.

  This example code is in the public domain.
*/

#include <ArduinoBLE.h>

String timer;

void setup() {
  Serial.begin(9600);
  while (!Serial);

  // initialize the Bluetooth® Low Energy hardware
  BLE.begin();

  Serial.println("Bluetooth® Low Energy Central - Read values");

  // start scanning for peripherals
  BLE.scanForUuid("180c");
}

void loop() {
  // check if a peripheral has been discovered
  BLEDevice peripheral = BLE.available();

  if (peripheral) {
    // discovered a peripheral, print out address, local name, and advertised service
    Serial.print("Found ");
    Serial.print(peripheral.address());
    Serial.print(" '");
    Serial.print(peripheral.localName());
    Serial.print("' ");
    Serial.print(peripheral.advertisedServiceUuid());
    Serial.println();

    // stop scanning
    BLE.stopScan();

    read_values(peripheral);

    // peripheral disconnected, start scanning again
    BLE.scanForUuid("180c");
  }
}

void read_values(BLEDevice peripheral) {
  // connect to the peripheral
  Serial.println("Connecting ...");

  if (peripheral.connect()) {
    Serial.println("Connected");
  } else {
    Serial.println("Failed to connect!");
    return;
  }

  // discover peripheral attributes
  Serial.println("Discovering attributes ...");
  if (peripheral.discoverAttributes()) {
    Serial.println("Attributes discovered");
  } else {
    Serial.println("Attribute discovery failed!");
    peripheral.disconnect();
    return;
  }

  BLEStringCharacteristic timerCharacteristic = (BLEStringCharacteristic) peripheral.characteristic("2A56");

  if (!timerCharacteristic) {
    Serial.println("Peripheral does not have LED characteristic!");
    peripheral.disconnect();
    return;
  }

  while (peripheral.connected()) {
    // while the peripheral is connected

    if(timerCharacteristic.valueUpdated()) {
        Serial.print("value: ");
        timer = timerCharacteristic.value();
        Serial.println(timer);
    }
  }

  Serial.println("Peripheral disconnected");
}
