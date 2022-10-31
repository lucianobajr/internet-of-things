/* Edge Impulse ingestion SDK
 * Copyright (c) 2022 EdgeImpulse Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

/* Includes ---------------------------------------------------------------- */
#include <motion-classification_inferencing.h>
#include <Arduino_LSM9DS1.h> //Click here to get the library: http://librarymanager/All#Arduino_LSM9DS1
#include <ArduinoBLE.h>

BLEService bleService("180C");

BLEStringCharacteristic ble_time("2A56", BLERead | BLENotify, 13);
BLEBoolCharacteristic ble_on_off("2A57", BLERead | BLEWrite);

/* Constant defines -------------------------------------------------------- */
#define CONVERT_G_TO_MS2 9.80665f
#define MAX_ACCEPTED_RANGE 2.0f // starting 03/2022, models are generated setting range to +-2, but this example use Arudino library which set range to +-4g. If you are using an older model, ignore this value and use 4.0f instead

/*
 ** NOTE: If you run into TFLite arena allocation issue.
 **
 ** This may be due to may dynamic memory fragmentation.
 ** Try defining "-DEI_CLASSIFIER_ALLOCATION_STATIC" in boards.local.txt (create
 ** if it doesn't exist) and copy this file to
 ** `<ARDUINO_CORE_INSTALL_PATH>/arduino/hardware/<mbed_core>/<core_version>/`.
 **
 ** See
 ** (https://support.arduino.cc/hc/en-us/articles/360012076960-Where-are-the-installed-cores-located-)
 ** to find where Arduino installs cores on your machine.
 **
 ** If the problem persists then there's not enough memory for this model and application.
 */

long t;

bool measure = true;

/* Private variables ------------------------------------------------------- */
static bool debug_nn = false; // Set this to true to see e.g. features generated from the raw signal

/**
 * @brief      Arduino setup function
 */
void setup()
{
    // put your setup code here, to run once:
    Serial.begin(9600);
    // comment out the below line to cancel the wait for USB connection (needed for native USB)
    while (!Serial)
        ;
    Serial.println("Edge Impulse Inferencing Demo");

    pinMode(LED_BUILTIN, OUTPUT);
    pinMode(LEDR, OUTPUT);
    pinMode(LEDG, OUTPUT);
    pinMode(LEDB, OUTPUT);

    // Ensure the LED is off by default
    digitalWrite(LED_BUILTIN, LOW);
    digitalWrite(LEDR, HIGH);
    digitalWrite(LEDG, HIGH);
    digitalWrite(LEDB, HIGH);

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
        ble_time.writeValue("IDLE");
        break;

    case 1:
        turn_off_leds();
        ble_time.writeValue("LIFT");
        digitalWrite(LEDG, LOW);
        break;

    case 2:
        turn_off_leds();
        ble_time.writeValue("MARITIME");
        digitalWrite(LEDB, LOW);
        break;

    case 3:
        turn_off_leds();
        ble_time.writeValue("TERRESTRIAL");
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

/**
 * @brief      Get data and run inferencing
 *
 * @param[in]  debug  Get debug info if true
 */
void loop()
{
    BLEDevice dev = BLE.central();
    if (dev)
    {
        Serial.println("Device connected");

        while (dev.connected())
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
        }
    }

#if EI_CLASSIFIER_HAS_ANOMALY == 1
    ei_printf("    anomaly score: %.3f\n", result.anomaly);
#endif
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
