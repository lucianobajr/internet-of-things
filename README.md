# IOT (internet of things)

## MSP430

Os MSP430 são microcontroladores RISC de 16 bits voltados para aplicações de baixo consumo de energia. São fabricados pela Texas Instruments e estão disponíveis em quatro famílias básicas: 1xx - voltados para aplicações gerais (1 a 60kb de memória flash e 128 a 10240 bytes de memória RAM)

<h1 align="center">
    <img alt="" src="https://user-images.githubusercontent.com/45442173/194091347-d173c958-dc73-4803-93d3-4e10e9e5b5d0.png" width="400px"/>
</h1>

### Características

- Arquitetura Von Neumann, RISC
- 16 KB de memória Flash
- 512 Bytes de memória RAM
- 24 GPIOs
- 2 Timers de 16 bits
- Módulos ADC e comparadores
- UART, SPI, I2C

### Práticas

 - Prática (1): Troca de leds por E/S => versão diferente de implementação (../examples/switch_leds.c)
 - Prática (2): E/S por interrupção
 - Prática (3): Semáforo usando temporizador
 - Prática (4): Conversor Analógico Digital
 - Prática (5): Comunicação Serial com Teclado ([art-communication](https://www.xanthium.in/Serial-Communication-MSP430-UART-USCI_A))

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


### Firebase - ESP32

- [Configuração do ESP32 na Arduino IDE e comunicação com Firebase](https://www.youtube.com/watch?v=_ADdFH2K7SI&t=1393s&ab_channel=ma%CF%80eo)

### Firebase - ESP32

- [AZURE IOT](https://internet-of-things.azureiotcentral.com/devices)


### AWS IOT - ESP32

- [Configuração Projeto](https://how2electronics.com/connecting-esp32-to-amazon-aws-iot-core-using-mqtt/)
- [Conectar ESP32 com AWS IOT](https://capsistema.com.br/index.php/2021/02/08/conecte-o-esp32-ao-aws-iot-com-codigo-arduino/)
- [AWS IOT MQTT com ReactJS](https://www.serverlessguru.com/blog/part-one-serverless-real-time-reactjs-app-aws-iot-mqtt)
- [AWS IOT MQTT com React Native](https://roger-espinoza-996.medium.com/connection-mqtt-react-native-aws-iot-core-ac569eb606aa)