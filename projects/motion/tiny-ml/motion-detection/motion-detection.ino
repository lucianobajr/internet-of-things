#include <ArduinoBLE.h>
#include <motion-classification_inferencing.h>
#include <Arduino_LSM9DS1.h>

/* Constant defines -------------------------------------------------------- */
#define CONVERT_G_TO_MS2 9.80665f
#define MAX_ACCEPTED_RANGE 2.0f

BLEService bleService("180C");

BLEStringCharacteristic ble_time("2A56", BLERead | BLENotify, 13);
BLEBoolCharacteristic ble_on_off("2A57", BLERead | BLEWrite);

String data;

bool measure = true;

/* Private variables ------------------------------------------------------- */
static bool debug_nn = false; // Set this to true to see e.g. features generated from the raw signal

void setup()
{
    // put your setup code here, to run once:

    Serial.begin(9600);

    if (!BLE.begin())
    {
        Serial.println("BLE Failed");
        while (1)
            ;
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

    data = "0";

    pinMode(LED_BUILTIN, OUTPUT);
    pinMode(LEDR, OUTPUT);
    pinMode(LEDG, OUTPUT);
    pinMode(LEDB, OUTPUT);

    // Ensure the LED is off by default
    digitalWrite(LED_BUILTIN, LOW);
    digitalWrite(LEDR, HIGH);
    digitalWrite(LEDG, HIGH);
    digitalWrite(LEDB, HIGH);

    if (!IMU.begin())
    {
        ei_printf("Failed to initialize IMU!\r\n");
    }
    else
    {
        ei_printf("IMU initialized\r\n");
    }

    if (EI_CLASSIFIER_RAW_SAMPLES_PER_FRAME != 3)
    {
        ei_printf("ERR: EI_CLASSIFIER_RAW_SAMPLES_PER_FRAME should be equal to 3 (the 3 sensor axes)\n");
        return;
    }
}

void turn_off_leds()
{
    digitalWrite(LEDR, HIGH);
    digitalWrite(LEDG, HIGH);
    digitalWrite(LEDB, HIGH);
}

/*
 * IDLE        [0] => ALL OFF
 * LIFT        [1] => Green ON
 * MARITIME    [2] => Blue ON
 * TERRESTRIAL [3] => Red ON
 */

void turn_on_leds(int pred_index)
{
    switch (pred_index)
    {
    case 0:
        turn_off_leds();
        data = "0";
        break;

    case 1:
        turn_off_leds();
        data = "1";
        digitalWrite(LEDG, LOW);
        break;

    case 2:
        turn_off_leds();
        data = "2";
        digitalWrite(LEDB, LOW);
        break;

    case 3:
        turn_off_leds();
        data = "3";
        digitalWrite(LEDR, LOW);
        break;
    }
}

/**
 * @brief Return the sign of the number
 *
 * @param number
 * @return int 1 if positive (or 0) -1 if negative
 */
float ei_get_sign(float number)
{
    return (number >= 0.0) ? 1.0 : -1.0;
}

void loop()
{
    // put your main code here, to run repeatedly:
    BLEDevice dev = BLE.central();
    if (dev)
    {
        Serial.println("Device connected");
        while (dev.connected())
        {
            if (measure)
            {

                ei_printf("\nStarting inferencing in 2 seconds...\n");

                delay(2000);

                ei_printf("Sampling...\n");

                // Allocate a buffer here for the values we'll read from the IMU
                float buffer[EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE] = {0};

                for (size_t ix = 0; ix < EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE; ix += 3)
                {
                    // Determine the next tick (and then sleep later)
                    uint64_t next_tick = micros() + (EI_CLASSIFIER_INTERVAL_MS * 1000);

                    IMU.readAcceleration(buffer[ix], buffer[ix + 1], buffer[ix + 2]);

                    for (int i = 0; i < 3; i++)
                    {
                        if (fabs(buffer[ix + i]) > MAX_ACCEPTED_RANGE)
                        {
                            buffer[ix + i] = ei_get_sign(buffer[ix + i]) * MAX_ACCEPTED_RANGE;
                        }
                    }

                    buffer[ix + 0] *= CONVERT_G_TO_MS2;
                    buffer[ix + 1] *= CONVERT_G_TO_MS2;
                    buffer[ix + 2] *= CONVERT_G_TO_MS2;

                    delayMicroseconds(next_tick - micros());
                }

                // Turn the raw buffer in a signal which we can the classify
                signal_t signal;
                int err = numpy::signal_from_buffer(buffer, EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE, &signal);
                if (err != 0)
                {
                    ei_printf("Failed to create signal from buffer (%d)\n", err);
                    return;
                }

                // Run the classifier
                ei_impulse_result_t result = {0};

                err = run_classifier(&signal, &result, debug_nn);
                if (err != EI_IMPULSE_OK)
                {
                    ei_printf("ERR: Failed to run classifier (%d)\n", err);
                    return;
                }

                // print the predictions
                ei_printf("Predictions ");
                ei_printf("(DSP: %d ms., Classification: %d ms., Anomaly: %d ms.)",
                          result.timing.dsp, result.timing.classification, result.timing.anomaly);
                ei_printf(": \n");

                int pred_index = 0;
                float pred_value = result.classification[0].value;

                for (size_t ix = 0; ix < EI_CLASSIFIER_LABEL_COUNT; ix++)
                {
                    ei_printf("    %s: %.5f\n", result.classification[ix].label, result.classification[ix].value);

                    if (result.classification[ix].value > pred_value)
                    {
                        pred_index = ix;
                        pred_value = result.classification[ix].value;
                    }
                }
                turn_on_leds(pred_index);

#if EI_CLASSIFIER_HAS_ANOMALY == 1
                ei_printf("    anomaly score: %.3f\n", result.anomaly);
#endif

                ble_time.writeValue(data);
            }
        }
        Serial.println("Device disconnected");
    }
}

void on_off_event(BLEDevice central, BLECharacteristic characteristic)
{
    // central wrote new value to characteristic, update LED
    Serial.print("Event: ");
    if (characteristic.value())
    {
        measure = true;
    }
    else
    {
        measure = false;
    }
    Serial.println(measure);
}

#if !defined(EI_CLASSIFIER_SENSOR) || EI_CLASSIFIER_SENSOR != EI_CLASSIFIER_SENSOR_ACCELEROMETER
#error "Invalid model for current sensor"
#endif
