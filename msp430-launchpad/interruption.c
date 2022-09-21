#include <msp430g2231.h>

#define SWITCH BIT3
#define SWITCH_PRESSED 0x00

#define RED BIT0
#define GREEN BIT6

int main(void)
{
    /* stop watchdog timer */
    WDTCTL = WDTPW | WDTHOLD;

    P1DIR = RED; // Define se o bit é entrada ou saída
    P1REN = SWITCH; // Habilita resistor de pull-up
    P1OUT = SWITCH; // Define estado inicial do port1

    P1IE = SWITCH; // Habilita a interrupção p/ P1.3
    P1IES = SWITCH; // Definição da borda subida/descida
    P1IFG = SWITCH_PRESSED;
    
    __enable_interrupt(); // Habilita as interrupções

    while (1){}
}

#pragma vector = PORT1_VECTOR
__interrupt void Port_1(void){
    P1OUT ^= RED; // Troca o estado do led
    P1IFG = SWITCH_PRESSED; // Zera a flag
}