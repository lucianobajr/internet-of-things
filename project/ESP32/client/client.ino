#include <ArduinoBLE.h>

#define UUID "180C"

String motion;

void setup()
{
  Serial.begin(9600);
  while (!Serial)
    ;

  // initialize the Bluetooth® Low Energy hardware
  BLE.begin();

  Serial.println("Bluetooth® Low Energy Central - control");

  // start scanning for peripherals
  BLE.scanForUuid(UUID);
}

void loop()
{
  // check if a peripheral has been discovered
  BLEDevice peripheral = BLE.available();

  if (peripheral)
  {
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

    receive(peripheral);

    // peripheral disconnected, start scanning again
    BLE.scanForUuid(UUID);
  }
}

void receive(BLEDevice peripheral)
{
  // connect to the peripheral
  Serial.println("Connecting ...");

  if (peripheral.connect())
  {
    Serial.println("Connected");
  }
  else
  {
    Serial.println("Failed to connect!");
    return;
  }

  // discover peripheral attributes
  Serial.println("Discovering attributes ...");
  if (peripheral.discoverAttributes())
  {
    Serial.println("Attributes discovered");
  }
  else
  {
    Serial.println("Attribute discovery failed!");
    peripheral.disconnect();
    return;
  }

  // retrieve the LED characteristic
  BLECharacteristic timeCharacteristic = peripheral.characteristic("2A56");

  if (!timeCharacteristic)
  {
    Serial.println("Peripheral does not have characteristic!");
    peripheral.disconnect();
    return;
  }

  Serial.println("Subscribing to characteristic ...");
  if (!timeCharacteristic.canSubscribe())
  {
    Serial.println("characteristic is not subscribable!");
    peripheral.disconnect();
    return;
  }
  else if (!timeCharacteristic.subscribe())
  {
    Serial.println("subscription failed!");
    peripheral.disconnect();
    return;
  }
  else
  {
    Serial.println("Subscribed");
  }

  String response = "";

  while (peripheral.connected())
  {
    if (timeCharacteristic.valueUpdated())
    {
      Serial.print("Motion Detection: ");
      response = (char *)timeCharacteristic.value();
      set_motion(response[0] - '0');
      Serial.println(motion);
    }
  }

  Serial.println("Peripheral disconnected");
}

void set_motion(int option){
  switch (option)
    {
    case 0:
        motion = "IDLE";
        break;

    case 1:
        motion = "LIFT";
        break;

    case 2:
        motion = "MARITIME";
        break;

    case 3:
        motion = "TERRESTRIAL";
        break;
    }
}
