#include "certs.h"
#include <ArduinoBLE.h>
#include <WiFiClientSecure.h>
#include <MQTTClient.h>
#include <ArduinoJson.h>
#include "WiFi.h"

#define WIFI_SSID "MAXXFIBRA MARCILENE 2.4G"
#define WIFI_PASSWORD "catetoopostosobrehipotenusa"
#define FIREBASE_HOST "https://iot-firebase-dc830-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "9oLATetP7cj2swabTrxFXB37oluPej3dM5rl8cE1"

#define UUID "180C"

// The name of the device. This MUST match up with the name defined in the AWS console
#define DEVICE_NAME "ESP32"

// The MQTTT endpoint for the device (unique for each AWS account but shared amongst devices within the account)
#define AWS_IOT_ENDPOINT "a19obrg5t39m08-ats.iot.us-east-1.amazonaws.com"

// The MQTT topic that this device should publish to
#define AWS_IOT_TOPIC "$aws/things/" DEVICE_NAME "/shadow/update"

// How many times we should attempt to connect to AWS
#define AWS_MAX_RECONNECT_TRIES 50

WiFiClientSecure net = WiFiClientSecure();
MQTTClient client = MQTTClient(256);

long timer;

void connectToWiFi()
{
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  // Only try 15 times to connect to the WiFi
  int retries = 0;
  while (WiFi.status() != WL_CONNECTED && retries < 15)
  {
    delay(500);
    Serial.print(".");
    retries++;
  }

  // If we still couldn't connect to the WiFi, go to deep sleep for a minute and try again.
  if (WiFi.status() != WL_CONNECTED)
  {
    esp_sleep_enable_timer_wakeup(1 * 60L * 1000000L);
    esp_deep_sleep_start();
  }
}

void connectToAWS()
{
  // Configure WiFiClientSecure to use the AWS certificates we generated
  net.setCACert(AWS_CERT_CA);
  net.setCertificate(AWS_CERT_CRT);
  net.setPrivateKey(AWS_CERT_PRIVATE);

  // Connect to the MQTT broker on the AWS endpoint we defined earlier
  client.begin(AWS_IOT_ENDPOINT, 8883, net);

  // Try to connect to AWS and count how many times we retried.
  int retries = 0;
  Serial.print("Connecting to AWS IOT");

  while (!client.connect(DEVICE_NAME) && retries < AWS_MAX_RECONNECT_TRIES)
  {
    Serial.print(".");
    delay(100);
    retries++;
  }

  // Make sure that we did indeed successfully connect to the MQTT broker
  // If not we just end the function and wait for the next loop.
  if (!client.connected())
  {
    Serial.println(" Timeout!");
    return;
  }

  // If we land here, we have successfully connected to AWS!
  // And we can subscribe to topics and send messages.
  Serial.println("Connected!");
}

void sendJsonToAWS(String motion)
{
  StaticJsonDocument<128> jsonDoc;
  JsonObject stateObj = jsonDoc.createNestedObject("state");
  JsonObject reportedObj = stateObj.createNestedObject("reported");

  // Write the temperature & humidity. Here you can use any C++ type (and you can refer to variables)
  reportedObj["temperature"] = 23.76;
  reportedObj["humidity"] = 78.12;
  reportedObj["wifi_strength"] = WiFi.RSSI();
  
  // Create a nested object "location"
  JsonObject locationObj = reportedObj.createNestedObject("location");
  locationObj["name"] = motion;

  Serial.println("Publishing message to AWS...");
  // serializeJson(doc, Serial);
  char jsonBuffer[512];
  serializeJson(jsonDoc, jsonBuffer);

  client.publish(AWS_IOT_TOPIC, jsonBuffer);
}

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

  connectToWiFi();
  connectToAWS();
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

  while (peripheral.connected())
  {
    Serial.print("MOTION DETECTION: ");
    String v = (char *)timeCharacteristic.value();
    Serial.println(v);
    sendJsonToAWS(v);
  }
  Serial.println("Peripheral disconnected");
}