#include <ArduinoBLE.h>

BLEService bleService("180C");

BLEStringCharacteristic ble_time("2A56", BLERead | BLENotify, 13);
BLEBoolCharacteristic ble_on_off("2A57", BLERead | BLEWrite);

long t;

bool measure = true;

void setup() {
  // put your setup code here, to run once:

  Serial.begin(9600);

  if(!BLE.begin()) {
    Serial.println("BLE Failed");
    while(1);
  }

  BLE.setLocalName("Arduino Timer");
  BLE.setAdvertisedService(bleService);
  bleService.addCharacteristic(ble_time);
  bleService.addCharacteristic(ble_on_off);
  BLE.addService(bleService);

  ble_on_off.setEventHandler(BLEWritten, on_off_event);
  ble_on_off.setValue(true);

  Serial.println("Advertising...");
  
  BLE.advertise();

  t = millis();
}

void loop() {
  // put your main code here, to run repeatedly:
  BLEDevice dev = BLE.central();
  if(dev) {
    Serial.println("Device connected");
    while(dev.connected()) {
      if(measure and millis() - t >= 1000) {
        t = millis();
        ble_time.writeValue(String(t) + "ms");   
        Serial.print("Write: ");
        Serial.println(t);
      }
    }
    Serial.println("Device disconnected");
  }
}

void on_off_event(BLEDevice central, BLECharacteristic characteristic) {
  // central wrote new value to characteristic, update LED
  Serial.print("Event: ");
  if (characteristic.value()) {
    measure = true;
  } else {
    measure = false;
  }
  Serial.println(measure);
}