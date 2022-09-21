#include <msp430g2231.h>

#define RED BIT0
#define GREEN BIT6
#define SWITCH BIT3
#define SWITCH_PRESSED 0x00

int count = 0;
void main(void)
{
    WDTCTL = WDTPW + WDTHOLD; // Desliga Watchdog timer
    P1DIR = RED + GREEN;      // Define pinos 1.0 e 1.6 como saída (0100 0001)
    P1REN = SWITCH;             // Habilita pullup/pulldown do pino 1.3 (0000 1000)
    P1OUT = SWITCH;             // Define pullup para o pino 1.3 (0000 1000)
    P1IE = SWITCH;              // Habilita interrupção no pino 1.3 (00001000)
    P1IFG = SWITCH_PRESSED;             // Zera flag de interrupção da porta 1 (00000000)
    _BIS_SR(GIE);             // Entra em modo de baixo consumo e habilita 
    // interrupções
    P1OUT |= GREEN;            // Ativa LED verde (P1.6)
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
        P1OUT |= RED; // Ativa LED vermelho (P1.0)
    }
    P1IFG = SWITCH_PRESSED; // Zera flag de interrupção do bit 1.3 (00001000)
}