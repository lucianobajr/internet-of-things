#include <ArduinoBLE.h>
#include <WiFi.h>
#include <IOXhop_FirebaseESP32.h>
#include <ArduinoJson.h>

#define UUID "2AF7"

#define WIFI_SSID "mi-phone"
#define WIFI_PASSWORD "12345678"
#define FIREBASE_HOST "https://my-replenisher-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "VXJMK8T8jJzUE47hPTsMWajviYvJyft2fg7p7ByC"

String my_replenisher;

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

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.print("Conectando ao wifi");

  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }

  Serial.println("WIFI Conectado!!");

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
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
      Serial.print("Value: ");
      response = (char *)timeCharacteristic.value();
      my_replenisher = response[0];
      Serial.println(my_replenisher);
      Firebase.setString("/status", my_replenisher);
    }
  }

  Serial.println("Peripheral disconnected");
}
