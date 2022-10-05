# IOT (internet of things)

## MSP430


<h1 align="center">
    <img alt="" src="https://user-images.githubusercontent.com/45442173/194090805-a08851a7-d088-4468-9a90-92a0b06acb4a.png" width="300px"/>
</h1>


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