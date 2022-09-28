#include <msp430g2231.h>

#define RED BIT0
#define GREEN BIT6
#define SWITCH BIT3

int segundos = 0;
void main(void)
{
    WDTCTL = WDTPW + WDTHOLD; // Desliga Watchdog timer
    P1DIR = RED + GREEN;      // Define pinos 1.0 e 1.6 como saída (0100 0001)
    P1REN = SWITCH;             // Habilita pullup/pulldown do pino 1.3 (0000 1000)
    P1OUT = SWITCH;             // Define pullup para o pino 1.3 (0000 1000)

    CCTL0 = CCIE;                   // Habilita interrupção de comparação do timer A
    TACTL = TASSEL_2 + MC_3 + ID_3; // SMCLK = 1 MHz, SMCLK/8 = 125 KHz (8 us)
    CCR0 = 62500;                   // Modo up/down: chega no valor e depois volta
                                    // para zero, portanto cada interrupção acontece
                                    // 2 * 62500 * 8 us = 1 segundo
    _BIS_SR(CPUOFF + GIE);
    while (1);
}
// Timer A0 interrupt service routine
#pragma vector = TIMER0_A0_VECTOR
__interrupt void Timer_A(void)
{
    if ((segundos == 20) | (segundos == 0))
    {
        P1OUT |= RED; // Ativa LED vermelho (P1.0)
        P1OUT &= 0xbf; // Desativa LED verde (P1.6)
        segundos = 0;
    }
    if (segundos == 10)
    {
        P1OUT |= GREEN; // Ativa LED verde (P1.6)
        P1OUT &= 0xfe; // Desativa LED vermelho (P1.0)
    }
    segundos++;
}