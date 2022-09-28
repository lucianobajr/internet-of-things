#include <msp430g2231.h>

#define RED BIT0
#define GREEN BIT6
#define SWITCH BIT3

int main(void)
{
    int count = 0;
    WDTCTL = WDTPW + WDTHOLD; // Desliga Watchdog timer
    P1DIR = RED + GREEN;      // Define pinos 1.0 e 1.6 como saída (0100 0001)
    P1REN = SWITCH;           // Habilita pullup/pulldown do pino 1.3 (0000 1000)
    P1OUT = SWITCH;           // Define pullup para o pino 1.3 (0000 1000
    while (1)
    {
        if ((P1IN & SWITCH) == 0) // Verifica se pino 1.3 está em nível lógico 0
            count = count + 1;    // Incrementa variável count
        if (count % 2 == 0)
        {                  // Se o valor de count é par
            P1OUT |= RED;  // Ativa LED vermelho (P1.0)
            P1OUT &= 0xbf; // Desativa LED verde (P1.6)
        }
        else
        {
            P1OUT |= GREEN; // Ativa LED verde (P1.6)
            P1OUT &= 0xfe;  // Desativa LED vermelho (P1.0)
        }
    }
}