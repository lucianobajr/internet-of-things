#include <msp430g2231.h>

#define RED BIT0
#define GREEN BIT6
#define SWITCH BIT3
#define SWITCH_PRESSED 0x00

int count = 0;
void main(void)
{

    WDTCTL = WDTPW + WDTHOLD; // Desliga Watchdog timer
    P1DIR = 0x01 + 0x40;      // Define pinos 1.0 e 1.6 como saída (0100 0001)
    P1REN = 0x08;             // Habilita pullup/pulldown do pino 1.3 (0000 1000)
    P1OUT = 0x08;             // Define pullup para o pino 1.3 (0000 1000)
    P1IE = 0x08;              // Habilita interrupção no pino 1.3 (00001000)
    P1IFG = 0x00;             // Zera flag de interrupção da porta 1 (00000000)
    _BIS_SR(GIE);             // Entra em modo de baixo consumo e habilita// interrupções
    P1OUT |= 0x40;            // Ativa LED verde (P1.6)
    while (1);

}

#pragma vector = PORT1_VECTOR // Rotina de tratamento de interrupção da porta 1
__interrupt void Port_1(void)
{
    __delay_cycles(500000); // Gera um atraso
    count++;                // Incrementa a varíavel de contagem
    if (count == 5)
    {
        P1OUT &= 0xbf; // Desativa LED verde (P1.6)
        P1OUT |= 0x01; // Ativa LED vermelho (P1.0)
    }
    P1IFG &= 0x08; // Zera flag de interrupção do bit 1.3 (00001000)
}