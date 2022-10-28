#include <ArduinoBLE.h>
#include <WiFi.h>         
#include <IOXhop_FirebaseESP32.h>                           
#include <ArduinoJson.h>                   

#define WIFI_SSID "WIFI"                   
#define WIFI_PASSWORD "dener123456"         
#define FIREBASE_HOST "https://iot-firebase-dc830-default-rtdb.firebaseio.com/"    
#define FIREBASE_AUTH "9oLATetP7cj2swabTrxFXB37oluPej3dM5rl8cE1"   

#define UUID "180C"

long timer;

void setup() {
  Serial.begin(9600);
  while (!Serial);

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

    receive(peripheral);

    // peripheral disconnected, start scanning again
    BLE.scanForUuid(UUID);
  }
}

void receive(BLEDevice peripheral) {
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
  
  // retrieve the LED characteristic
  BLECharacteristic timeCharacteristic = peripheral.characteristic("2A56");

  if (!timeCharacteristic) {
    Serial.println("Peripheral does not have characteristic!");
    peripheral.disconnect();
    return;
  }

  Serial.println("Subscribing to characteristic ...");
  if (!timeCharacteristic.canSubscribe()) {
    Serial.println("characteristic is not subscribable!");
    peripheral.disconnect();
    return;
  } else if (!timeCharacteristic.subscribe()) {
    Serial.println("subscription failed!");
    peripheral.disconnect();
    return;
  } else {
    Serial.println("Subscribed");
  }

  while (peripheral.connected()) {
    if(timeCharacteristic.valueUpdated() and millis() - timer >= 3000) {
      Serial.print("Time: ");
      String v = (char*)timeCharacteristic.value();
      Serial.println(v);

      Firebase.pushString("/tempo/milissegundos", v);
      timer = millis();
    }
  }

  Serial.println("Peripheral disconnected");
}


void test() {
  
//Exemplo da função Get
  Serial.println();
  Serial.print("Dono do quarto: ");
  Serial.print(Firebase.getString("/quarto/dono"));
  Serial.println();
  Serial.print("Luminosidade do quarto: ");
  Serial.print(Firebase.getInt("/quarto/luminosidade"));
  Serial.println();
  Serial.print("Temperatura do quarto: ");
  Serial.print(Firebase.getFloat("/quarto/temperatura"));
  Serial.println();
  Serial.print("O quarto está ocupado: ");
  Serial.print(Firebase.getBool("/quarto/ocupado"));
  Serial.println();
  Serial.print("Luminosidade da sala: ");
  Serial.print(Firebase.getInt("/sala/luminosidade"));
  Serial.println();
  delay(3000);

  
  //Exemplo da função Set


  Firebase.setString("/quarto/dono", "Rebeca");
  Firebase.setInt("/quarto/luminosidade", 300);
  Firebase.setBool("/quarto/ocupado", false);
  Firebase.setFloat("/quarto/temperatura", 24.7);
  Firebase.setInt("/sala/luminosidade", 200);
  delay(3000);
  Firebase.setString("/quarto/dono", "Matteo");
  Firebase.setInt("/quarto/luminosidade", 500);
  Firebase.setBool("/quarto/ocupado", true);
  Firebase.setFloat("/quarto/temperatura", 35.3);
  Firebase.setInt("/sala/luminosidade", 500);
  delay(3000);

//Exemplo da função Push


  Firebase.pushString("/quarto/registro", "Matteo");
  delay(3000);
  Firebase.pushString("/quarto/registro", "Rebeca");
  delay(3000);
  Firebase.pushString("/quarto/registro", "Vanderson");
  delay(3000);
  Firebase.pushString("/quarto/registro", "Raquel");
  delay(3000);
  

}
