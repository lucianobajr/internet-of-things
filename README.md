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

O kit é composto por uma poderosa placa equipada com um microcontrolador e uma ampla variedade de sensores (Arduino Nano 33 BLE Sense\*). A placa pode detectar movimento, aceleração, rotação, temperatura, umidade, pressão barométrica, sons, gestos, proximidade, cor e intensidade da luz. O kit também inclui um módulo de câmera (OV7675) e um escudo Arduino personalizado para facilitar a conexão de seus componentes e criar seu próprio projeto TinyML exclusivo. Você poderá explorar casos de uso práticos de ML usando algoritmos clássicos e redes neurais profundas desenvolvidas pelo TensorFlow Lite Micro. As possibilidades são limitadas apenas por sua imaginação!

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

## Práticas Arduino

- BLE
  - [Periférico](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/ble-examples/ble-peripheral)
  - [Envio de dados](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/ble-examples/ble-send-data)
  - [Com uso de sensores](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/ble-examples/ble-sensor-environment)
- Machine Learning
  - [Detecção de movimento de container](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/machine-learning/motion-detection)
  - [Detecção de pessoas](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/machine-learning/person-detection)
  - [Detecção de `Yes` ou `No`](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/machine-learning/yes-no-speech-detection)
- Sensores
  - [Gestos e de Cor (`APS-9960`)](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/sensors/APS-9960-FULL-EXAMPLE)
  - [Acelerômetro (`LSM9DS1`)](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/sensors/accelerometer-sensor)
  - [Cor (`APS-9960`)](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/sensors/color-sensor)
  - [Giroscópio (`LSM9DS1`)](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/sensors/gyroscope-sensor)
  - [Magnetômetro (`LSM9DS1`)](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/sensors/magnetometer-sensor)
  - [Microfone (`PDM`)](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/sensors/microfone-sensor)
  - [Pressão (`APDS9960`)](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/sensors/pressure-senor)
  - [Proximidade (`APDS9960`)](https://github.com/lucianobajr/internet-of-things/tree/main/tiny-machine-learning/sensors/proximity-sensor)

## Práticas ESP

- [Prática (1): AWS IOT com MQTT (_Message Queuing Telemetry Transport_)](https://github.com/lucianobajr/internet-of-things/tree/main/ESP32/aws-iot)
- [Prática (2): BLE com Firebase](https://github.com/lucianobajr/internet-of-things/tree/main/ESP32/ble-firebase)
- [Prática (3): Firebase](https://github.com/lucianobajr/internet-of-things/tree/main/ESP32/firebase)
- [Prática (4): Controle de LED](https://github.com/lucianobajr/internet-of-things/tree/main/ESP32/led-control)

# Projetos

## [Motion Detection](https://github.com/lucianobajr/internet-of-things/tree/main/projects/motion)

Este projeto teve como foco a fiscalização de containers de carga, sendo possível classificar o seu status de movimentação entre 4 rótulos:

| LABEL       | LED        |
| ----------- | ---------- |
| IDLE        | -          |
| LIFT        | `VERDE`    |
| TERRESTRIAL | `VERMELHO` |
| MARITIME    | `AZUL`     |

<h1 align="center">
    <img alt="" src="https://user-images.githubusercontent.com/45442173/206489631-b9b302a4-cbe9-407d-aa38-65be1f17a45b.jpeg" />
</h1>

De forma geral, o projeto envolve dois microcontroladores o `ESP32` e o `Arduino nano 33 BLE`. Com o `Arduino nano 33 BLE` foi treinado um modelo de Machine Learning, utilizando o sensor de acelerômetro (`LSM9DS1`) com auxílio da plataforma [Edge Impulse](https://www.edgeimpulse.com/). Com o `ESP32` recebemos o status do container via `Protocolo Bluetooth` vindo do `Arduino nano 33 BLE` e em seguida os dados são enviados para um banco de dados `Realtime` do `Firebase`. Por fim, foi desenvolvido um aplicativo mobile com `React Native` com intuito de fiscalizar/inspecionar todos os containers que contenham o kit  com dois microcontroladores do projeto.

Sendo assim, o fluxo `E2E`, ficou da seguinte forma:

![01-intro](https://user-images.githubusercontent.com/45442173/206337295-52c9d3b6-eb60-40f7-ba1f-ec6844529b0e.png)

O projeto se encontra público pela próprio [Edge Impulse](https://studio.edgeimpulse.com/public/150502/latest) sendo possível ver todo fluxo dês da extração dos dados até o deploy para o `Arduino nano 33 BLE`.

<h1 align="center">
    <img alt="" src="https://user-images.githubusercontent.com/45442173/206332256-a84d7465-7167-4e16-a14e-06e2b05f681e.png" />
</h1>


<h1 align="center">App Mobile</h1>

### :art: [Figma Design](https://www.figma.com/file/MRyeqDH6CvBeIhDBV0RfqW/containres?node-id=0%3A1&t=1CZYdbsfTAjpg4BZ-1)

| Splash Screen | Login | Home | Info
|-----------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------
|<img src="https://user-images.githubusercontent.com/45442173/206336338-df605de4-b178-4086-aec4-d2485f77373a.png" /> | <img src="https://user-images.githubusercontent.com/45442173/206336345-d37802fb-3e95-4d7e-86e2-38c2f949df3d.png" /> | <img src="https://user-images.githubusercontent.com/45442173/206336350-747edab9-4734-461a-a4a2-a98924163705.png" /> | <img src="https://user-images.githubusercontent.com/45442173/206336357-6e7da258-f8f0-43e2-818f-d2243ad6aa3b.png"/>

## [My Replenisher](https://github.com/lucianobajr/internet-of-things/tree/main/projects/my-replenisher)

O My Replenisher é um projeto com foco em informar ao usuário quando os alimentos essenciais de sua casa estão em falta, sendo eles: `arroz`, `feijão`,`açucar` e `café`.

De forma geral, o projeto envolve dois microcontroladores o `ESP32` e o `Arduino nano 33 BLE`. Com o `Arduino nano 33 BLE` foi treinado um modelo de Machine Learning, utilizando a câmera do kit (`OV7675`) com auxílio da plataforma [Edge Impulse](https://www.edgeimpulse.com/), sendo que foi criada uma base com mais de 200 imagens capturadas. Com o `ESP32` recebemos o status dos alimentos via `Protocolo Bluetooth` vindo do `Arduino nano 33 BLE` e em seguida os dados são enviados para um `worker` da `clouflare` utilizando edge computing e o `serverless database upstash` . Por fim, foi desenvolvido um aplicativo mobile com `React Native` que utiliza de uma api feita em `express` com `typescript`,`prisma`, `jwt`, dentre outras tecnologias
com foco na autenticação do usuário para isso, a `api` foi hospedada na plataforma `railway` utilizando um banco de dados relacional `postgreSQL`. Além disso, o app faz uso do `realtime database` do firebase.
O objetivo da aplicação mobile vai além de oferecer ao usuário a fiscalização dos alimentos essenciais. É possível criar com o app listas de compras em tempo real (compartilhadas entre vários usuários), sendo que sempre no topo da lista de forma obrigatória para criação teremos os alimentos essenciais que estão em falta, capturados utilizando as etapas anteriores já explicadas.

Sendo assim, o fluxo E2E, ficou da seguinte forma:

![01-intro (1)](https://user-images.githubusercontent.com/45442173/202305389-16fdfafa-19b2-4a92-84ce-a70a74e3274a.png)

### CloudFlare Workers

A Cloudflare oferece serviços de computação sem servidor por meio do Cloudflare Workers, uma plataforma para a criação e implantação de funções JavaScript que são executadas na rede de borda da Cloudflare. A execução do código na borda, o mais próximo possível do usuário final, ajuda a reduzir a latência e aumentar o desempenho do aplicativo. Cada "Worker' pode modificar e responder às solicitações HTTP.

A edge computing, ou computação de borda, é aquela na qual o processamento acontece no local físico (ou próximo) do usuário ou da fonte de dados. Com o processamento mais próximo, os usuários se beneficiam de serviços mais rápidos e confiáveis, enquanto as empresas usufruem da flexibilidade da cloud computing híbrida. A edge computing é uma das formas como uma empresa pode usar e distribuir um pool de recursos por um grande número de locais.

### Upstash

É um banco de dados em nuvem na memória sem servidor da Upstash Inc, uma empresa com sede na Califórnia.

É um serviço Redis sem servidor. Ele pode ser usado para camada de cache ou como um banco de dados. O legal é que você não precisa gerenciar nenhum servidor de banco de dados ou clusters. É totalmente sem servidor. Você usa e paga apenas o que usar.

Problemas modernos exigem soluções modernas, é exatamente isso que tecnologias Serverless como Upstash fazem.

Uma das grandes vantagens de usar o Upstash sobre outros serviços é o preço por solicitação, você não paga nada com o Upstash se não estiver usando.

### Railway
A Railway é uma plataforma de implantação na qual você pode provisionar a infraestrutura, desenvolver com essa infraestrutura localmente e, em seguida, implantar na nuvem. Este serviço foi utilizado para implantação do backend da aplicação voltado para autenticação dos usuários

### Edge Impulse

O projeto se encontra público pela próprio [Edge Impulse](https://studio.edgeimpulse.com/public/165169/latest) sendo possível ver todo fluxo dês da extração dos dados até o deploy para o `Arduino nano 33 BLE`.

<h1 align="center">
    <img alt="" src="https://user-images.githubusercontent.com/45442173/206332258-6ebd9459-7d42-4d63-b3ba-493abf7f19ec.png" />
</h1>

| LABEL'S                   |
| ------------------------- |
| ALL                       |
| MISSING RICE              |
| MISSING COFFEE            |
| MISSING SUGAR             |
| MISSING BEAN              |
| MISSING RICE COFFEE       |
| MISSING RICE SUGAR        |
| MISSING BEAN COFFEE       |
| MISSING BEAN SUGAR        |
| MISSING COFFEE SUGAR      |
| MISSING RICE BEAN COFFEE  |
| MISSING RICE BEAN SUGAR   |
| MISSING BEAN COFFEE SUGAR |
| NONE                      |


<h1 align="center">App Mobile</h1>

### :art: [Figma Design](https://www.figma.com/file/nUf86toYul61Ofe0sUZ28a/My-Replenisher?node-id=0%3A1&t=PMeg3KbjgeI4VgHu-1)

| Splash Screen | Onboarding | Login | SignUp
|-----------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------
|<img src="https://user-images.githubusercontent.com/45442173/206334811-c2a2d38f-cac9-4c36-ab1f-46a868799d7e.png" /> | <img src="https://user-images.githubusercontent.com/45442173/206334824-a6743b69-47b3-48cc-93ec-7783fa74c327.png" /> | <img src="https://user-images.githubusercontent.com/45442173/206334832-13fcd977-5092-45fe-8461-4d318481dd98.png" /> | <img src="https://user-images.githubusercontent.com/45442173/206334839-595aeb0e-6e58-42e7-a89c-353df298089b.png"/>

| Home | Listas | Criar Lista | Perfil
|-----------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------
|<img src="https://user-images.githubusercontent.com/45442173/206334844-8b333ba6-5128-479e-b6e6-b96119ff1488.png" /> | <img src="https://user-images.githubusercontent.com/45442173/206334898-bbb4af42-dd04-4fb1-bfc9-5815d6b60e74.png" /> | <img src="https://user-images.githubusercontent.com/45442173/206334906-a134ae76-81f1-403c-96f1-042d8fe0fb70.png" /> | <img src="https://user-images.githubusercontent.com/45442173/206334915-1d9d8e38-2cf1-4654-ba33-56b4c08422ce.png"/>