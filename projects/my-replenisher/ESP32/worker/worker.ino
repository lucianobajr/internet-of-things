#include <WiFi.h>
#include <ArduinoJson.h>
#include "HTTPClient.h"

#define UUID "2AF7"

#define WIFI_SSID "mi-phone"
#define WIFI_PASSWORD "12345678"

String serverName = "https://worker.luciano-alcantara.workers.dev";

void setup()
{
    Serial.begin(9600);
    while (!Serial)
        ;
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    Serial.print("Conectando ao wifi");

    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(300);
    }

    Serial.println("WIFI Conectado!!");
}

void loop()
{

        if (WiFi.status() == WL_CONNECTED)
        {

            HTTPClient http;

            String serverPath = serverName + "/change-value";

            http.begin(serverPath.c_str());
            http.addHeader("Content-Type", "application/json");

            StaticJsonBuffer<128> jsonDoc;
            JsonObject valueObj = jsonDoc.createNestedObject("value");
            valueObj["value"] = 1;

            int httpResponseCode = http.PUT(valueObj);

            if (httpResponseCode > 0)
            {

                String response = http.getString();

                Serial.println(httpResponseCode);
                Serial.println(response);
            }
            else
            {

                Serial.print("Error on sending PUT Request: ");
                Serial.println(httpResponseCode);
            }

            http.end();
        }
        else
        {
            Serial.println("Error in WiFi connection");
        }

        delay(10000);
    
}
