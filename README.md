# IOT (internet of things)

## MSP430

 - Prática (1): Troca de leds por E/S => versão diferente de implementação (../examples/switch_leds.c)
 - Prática (2): E/S por interrupção
 - Prática (3): Semáforo usando temporizador
 - Prática (4): Conversor Analógico Digital

### Instalação  MSP430 

    $ sudo apt-get install msp430-libc mspdebug msp430mcu binutils-msp430 gcc-msp430 gdb-msp430

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