/*
  Arduino Nano 33 BLE Getting Started
  BLE peripheral with a simple Hello World greeting service that can be viewed
  on a mobile phone
  Adapted from Arduino BatteryMonitor example
*/

#include <ArduinoBLE.h>

static const char* greeting = "Hello World!";

BLEService greetingService("180C");  // User defined service

BLEStringCharacteristic greetingCharacteristic("2A56",BLERead, 13); // remote clients will only be able to read this


float temp;
int tempPin = 0;
void setup() {
  Serial.begin(9600);    // initialize serial communication
  while (!Serial);

  pinMode(LED_BUILTIN, OUTPUT); // initialize the built-in LED pin

  if (!BLE.begin()) {   // initialize BLE
    Serial.println("starting BLE failed!");
    while (1);
  }

  BLE.setLocalName("Nano33BLE");  // Set name for connection
  BLE.setAdvertisedService(greetingService); // Advertise service
  greetingService.addCharacteristic(greetingCharacteristic); // Add characteristic to service
  BLE.addService(greetingService); // Add service
  greetingCharacteristic.setValue(greeting); // Set greeting string

  BLE.advertise();  // Start advertising
  Serial.print("Peripheral device MAC: ");
  Serial.println(BLE.address());
  Serial.println("Waiting for connections...");
}

void loop() {
  BLEDevice central = BLE.central();  // Wait for a BLE central to connect

  // if a central is connected to the peripheral:
  if (central) {
    Serial.print("Connected to central MAC: ");
    // print the central's BT address:
    Serial.println(central.address());
    // turn on the LED to indicate the connection:
    digitalWrite(LED_BUILTIN, HIGH);
   

    while (central.connected()){
    // read temperature 
    temp = analogRead(tempPin);
    temp = temp* 0.48828125;
    //converting analogue to temperature equivalent 
    Serial.print("Temperature =");
    Serial.print(temp);
    Serial.print("C");
    Serial.println();

    greetingCharacteristic.writeValue("Temp =" + String(temp) + "C");
        // Setting BLE Service Advertisment
    BLE.setAdvertisedService(greetingService);
    
    // Adding the service to the BLE stack
    BLE.addService(greetingService);

    // Start advertising
    BLE.advertise();
    
    delay(1000);
    } // keep looping while connected
    
    
    // when the central disconnects, turn off the LED:
    digitalWrite(LED_BUILTIN, LOW);
    Serial.print("Disconnected from central MAC: ");
    Serial.println(central.address());
  }     }
