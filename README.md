# IOT (internet of things)

- [Microcontroladores](#microcontroladores)
    - [MSP430](#msp430)
    - [Arduino Tiny Machine Learning Kit](#arduino-tiny-machine-learning-kit)
    - [ESP32](#esp32)
- [Práticas](#práticas)
    - [Práticas MSP](#práticas-msp)
    - [Práticas ESP](#práticas-esp)
    - [Práticas Arduino](#práticas-arduino)
- [Projetos](#projetos)
    - [Motion Detection](#motion-detection)
    - [My Replenisher](#my-replenisher)

# Microcontroladores

Um microcontrolador é um circuito integrado compacto projetado para controlar uma operação específica em um sistema embarcado. Um microcontrolador típico inclui um processador, memória e periféricos de entrada/saída (E/S) em um único chip.

Às vezes chamados de controlador embarcado ou unidade de microcontrolador (MCU), os microcontroladores são encontrados em veículos, robôs, máquinas de escritório, dispositivos médicos, transceptores de rádio móveis, máquinas de venda automática e eletrodomésticos, entre outros dispositivos. Eles são essencialmente computadores pessoais (PCs) em miniatura simples projetados para controlar pequenos recursos de um componente maior, sem um sistema operacional (SO) front-end complexo.

## MSP430

Os MSP430 são microcontroladores RISC de 16 bits voltados para aplicações de baixo consumo de energia. São fabricados pela Texas Instruments e estão disponíveis em quatro famílias básicas: 1xx - voltados para aplicações gerais (1 a 60kb de memória flash e 128 a 10240 bytes de memória RAM)

<h1 align="center">
    <img alt="" src="https://user-images.githubusercontent.com/45442173/194091347-d173c958-dc73-4803-93d3-4e10e9e5b5d0.png" width="400px"/>
</h1>

### Especificação

- Arquitetura Von Neumann, RISC
- 16 KB de memória Flash
- 512 Bytes de memória RAM
- 24 GPIOs
- 2 Timers de 16 bits
- Módulos ADC e comparadores
- UART, SPI, I2C

### Instalação Compilador MSP430 

    $ sudo apt-get install msp430-libc mspdebug msp430mcu binutils-msp430 gcc-msp430 gdb-msp430

### Instalação Putty

    $ sudo apt-get install putty

### Para compilar

    $ msp430-gcc -Os -mmcu=msp430g2231 blink.c -o blink.elf
    $ msp430-gcc -Os -mmcu=msp430g2553 test.c -o test.elf

### Agora conecte a Launchpad na USB da sua máquina
    $ dmesg

### Para gravar na Launchpad basta chamar a ferramenta mspdebug
    $ sudo mspdebug rf2500

### Primeiro programe o arquivo elf gerado:
    $ prog blink.elf

### Execute a aplicação
    $ run

## Arduino Tiny Machine Learning Kit

O Tiny Machine Learning Kit, combinado com os emocionantes cursos TinyML Applications e Deploying TinyML on Microcontrollers, que fazem parte da especialização Tiny Machine Learning (TinyML) da EdX, fornecerão todas as ferramentas necessárias para dar vida às suas visões de ML!

O kit é composto por uma poderosa placa equipada com um microcontrolador e uma ampla variedade de sensores (Arduino Nano 33 BLE Sense*). A placa pode detectar movimento, aceleração, rotação, temperatura, umidade, pressão barométrica, sons, gestos, proximidade, cor e intensidade da luz. O kit também inclui um módulo de câmera (OV7675) e um escudo Arduino personalizado para facilitar a conexão de seus componentes e criar seu próprio projeto TinyML exclusivo. Você poderá explorar casos de uso práticos de ML usando algoritmos clássicos e redes neurais profundas desenvolvidas pelo TensorFlow Lite Micro. As possibilidades são limitadas apenas por sua imaginação!

<h1 align="center">
    <img alt="" src="https://user-images.githubusercontent.com/45442173/195163535-c851c183-80a6-4f4b-972f-614b276b511a.png" width="400px"/>
</h1>

### Especificações Técnicas

- 1 placa Arduino Nano 33 BLE Sense
- 1 câmera OV7675
- 1 Arduino Tiny Machine Learning Shield
- 1 cabo USB A para Micro USB

### Arduino nano 33 BLE

<h1 align="center">
    <img alt="" src="https://user-images.githubusercontent.com/45442173/195472473-20f7be5f-7b75-4ee1-b20e-9d8cc6b80b77.jpg" width="600px"/>
</h1>

- Sensor de Gestos e de Cor `APDS-9960`
- Sensor de umidade e temperatura digital capacitivo `HTS221`
- O `LPS22HB` é um sensor de pressão absoluta piezoresistivo ultracompacto que funciona como um barômetro de saída digital
- Permite que você leia os valores do acelerômetro, magnetômetro e giroscópio da IMU `LSM9DS1` em seu Arduino Nano 33 BLE Sense.
- Uso de microfones `PDM` para o Arduino Zero / Adafruit Feather M0 (processador SAMD21).


## ESP32

<h1 align="center">
    <img alt="" src="https://user-images.githubusercontent.com/45442173/206322490-fc91a43e-a3d7-4584-99d3-255732715754.png" width="400px"/>
</h1>


O ESP32 é um pequeno microcontrolador desenvolvido com a capacidade de proporcionar comunicação sem fio através do Wifi e através do próprio sistema Bluetooth. Ele pode funcionar como um sistema autônomo completo ou como um dispositivo escravo para um MCU host, reduzindo a sobrecarga da pilha de comunicação no processador principal do aplicativo. O ESP32 pode interagir com outros sistemas para fornecer funcionalidade Wi-Fi e Bluetooth por meio de suas interfaces SPI/SDIO ou I2C/UART.

### Especificação
- Protocolo WI-FI: 802.11 b/g/n (802.11n, até 150 mbps);
- Faixa de frequência 2.4 - 2.5 GHz;
- Protocolo Bluetooth: compatível com os padrões de bluetooth v4.2 br/edr e ble;
- Tensão de entrada: 3 - 3,6 V;


### Firebase - ESP32

- [Configuração do ESP32 na Arduino IDE e comunicação com Firebase](https://www.youtube.com/watch?v=_ADdFH2K7SI&t=1393s&ab_channel=ma%CF%80eo)

### Firebase - ESP32

- [AZURE IOT](https://internet-of-things.azureiotcentral.com/devices)


### AWS IOT - ESP32

- [Configuração Projeto](https://how2electronics.com/connecting-esp32-to-amazon-aws-iot-core-using-mqtt/)
- [Conectar ESP32 com AWS IOT](https://capsistema.com.br/index.php/2021/02/08/conecte-o-esp32-ao-aws-iot-com-codigo-arduino/)
- [AWS IOT MQTT com ReactJS](https://www.serverlessguru.com/blog/part-one-serverless-real-time-reactjs-app-aws-iot-mqtt)
- [AWS IOT MQTT com React Native](https://roger-espinoza-996.medium.com/connection-mqtt-react-native-aws-iot-core-ac569eb606aa)

# Práticas

## Práticas MSP

- [Prática (1): Troca de leds por E/S => versão diferente de implementação (../examples/switch_leds.c)](https://github.com/lucianobajr/internet-of-things/blob/main/msp430-launchpad/practices/first.c)
- [Prática (2): E/S por interrupção](https://github.com/lucianobajr/internet-of-things/blob/main/msp430-launchpad/practices/second.c)
- [Prática (3): Semáforo usando temporizador](https://github.com/lucianobajr/internet-of-things/blob/main/msp430-launchpad/practices/third.c)
- [Prática (4): Conversor Analógico Digital](https://github.com/lucianobajr/internet-of-things/blob/main/msp430-launchpad/practices/fourth.c)
- [Prática (5): Comunicação Serial com Teclado](https://github.com/lucianobajr/internet-of-things/blob/main/msp430-launchpad/practices/serial_comunnication.c) ([art-communication](https://www.xanthium.in/Serial-Communication-MSP430-UART-USCI_A))

## Práticas ESP

- BLE
    - [Periférico](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/ble-examples/ble-peripheral)
    - [Envio de dados](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/ble-examples/ble-send-data)
    - [Com uso de sensores](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/ble-examples/ble-sensor-environment)
- Machine Learning
    - [Detecção de movimento de container](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/machine-learning/motion-detection)
    - [Detecção de pessoas](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/machine-learning/person-detection)
    - [Detecção de `Yes` ou `No`](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/machine-learning/yes-no-speech-detection)
- Sensores
    - [Gestos e de Cor (`APS-9960`)](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/sensors/APS-9960-FULL-EXAMPLE )
    - [Acelerômetro (`LSM9DS1`)](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/sensors/accelerometer-sensor)
    - [Cor (`APS-9960`)](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/sensors/color-sensor)
    - [Giroscópio (`LSM9DS1`)](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/sensors/gyroscope-sensor)
    - [Magnetômetro (`LSM9DS1`)](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/sensors/magnetometer-sensor)
    - [Microfone (`PDM`)](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/sensors/microfone-sensor)
    - [Pressão (`APDS9960`)](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/sensors/pressure-senor)
    - [Proximidade (`APDS9960`)](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/sensors/proximity-sensor)


## Práticas Arduino

- [Prática (1): AWS IOT com MQTT (*Message Queuing Telemetry Transport*)](https://github.com/lucianobajr/internet-of-things/tree/main/ESP32/aws-iot)
- [Prática (2): BLE com Firebase](https://github.com/lucianobajr/internet-of-things/tree/main/ESP32/ble-firebase)
- [Prática (3): Firebase](https://github.com/lucianobajr/internet-of-things/tree/main/ESP32/firebase)
- [Prática (4): Controle de LED](https://github.com/lucianobajr/internet-of-things/tree/main/ESP32/led-control)

# Projetos

## [Motion Detection](https://github.com/lucianobajr/internet-of-things/tree/main/projects/motion)

<h1 align="center">
    <img alt="" src="https://user-images.githubusercontent.com/45442173/206332256-a84d7465-7167-4e16-a14e-06e2b05f681e.png" />
</h1>

## [My Replenisher](https://github.com/lucianobajr/internet-of-things/tree/main/projects/my-replenisher)

<h1 align="center">
    <img alt="" src="https://user-images.githubusercontent.com/45442173/206332258-6ebd9459-7d42-4d63-b3ba-493abf7f19ec.png" />
</h1>