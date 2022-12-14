#include <msp430g2231.h>

#define SWITCH BIT3
#define SWITCH_PRESSED 0x00

#define RED BIT0
#define GREEN BIT6

int count = 0;

int main(void)
{
    /* stop watchdog timer */
    WDTCTL = WDTPW | WDTHOLD;

    P1DIR |= RED + GREEN; // Define se o bit é entrada ou saída
    P1REN = SWITCH;       // Habilita resistor de pull-up
    P1OUT |= GREEN;       // Green LED lit at startup
    P1OUT &= ~RED;        // Red LED off at startup

    P1IE = SWITCH;  // Habilita a interrupção p/ P1.3
    P1IES = SWITCH; // Definição da borda subida/descida
    P1IFG = SWITCH_PRESSED;

    __enable_interrupt(); // Habilita as interrupções

    while (1)
    {
    }
}

#pragma vector = PORT1_VECTOR
__interrupt void Port_1(void)
{
    count++;

    if (count % 5 == 0)
    {
        P1OUT ^= GREEN | RED; // Troca o estado do led
        __delay_cycles(120000);
    }

    // P1IFG = SWITCH_PRESSED; // Zera a flag
}