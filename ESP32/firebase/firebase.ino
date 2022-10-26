#include <WiFi.h>         
#include <IOXhop_FirebaseESP32.h>                           
#include <ArduinoJson.h>                   

#define WIFI_SSID "WIFI"                   
#define WIFI_PASSWORD "dener123456"         
#define FIREBASE_HOST "https://iot-firebase-dc830-default-rtdb.firebaseio.com/"    
#define FIREBASE_AUTH "9oLATetP7cj2swabTrxFXB37oluPej3dM5rl8cE1"   

void setup() {
  Serial.begin(9600);
  Serial.println();

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  
  Serial.print("Conectando ao wifi");
  
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  
  Serial.println("Conectado!!");

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

}


void loop() {
  
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
