#include <msp430g2553.h>
#include <inttypes.h>

#define RED BIT0
#define GREEN BIT6
#define SWITCH BIT3

uint8_t dado_rx; // define a variavel que recebe os dados da serial

// recebe um caracter pela interface serial. Guarda este valor na variavel 'dado_rx'
// Quando um caracter chega pela interface serial, gera uma interrupcao e armazena na variavel dado_rx
#pragma vector = USCIAB0RX_VECTOR
__interrupt void rx_uart()
{
    dado_rx = UCA0RXBUF;

    if (UCA0RXBUF == 'l')
    {
        P1OUT ^= GREEN;
    }
}

int main(void)
{
    WDTCTL = WDTPW | WDTHOLD; // stop watchdog timer

    UCA0CTL1 |= UCSWRST;
    UCA0CTL1 |= UCSSEL_2; // Seleciona SMCLK como o sinal de clock da interface serial

    UCA0BR0 = 0x68;  // Seleciona taxa de 9600
    UCA0BR1 = 0x00;  // Seleciona taxa de 9600
    UCA0MCTL = 0x02; // Seleciona taxa de 9600

    // Configura pinos de RX e TX
    P1SEL |= BIT1 + BIT2;  // Seleciona a funcao de TX e RX da serial para os pinos P1.1 e P1.2
    P1SEL2 |= BIT1 + BIT2; // Seleciona a funcao de TX e RX da serial para os pinos P1.1 e P1.2

    UCA0CTL1 &= ~UCSWRST; // Retira UART do reset

    // configura interrupcaoes da interface serial (recepcao)
    IE2 |= BIT0;        // Ativa a interrucao da interface serial (recepcao)
    IFG2 &= ~UCA0RXIFG; // limpa o flag de interrupcao da interface serial (recepcao)

    __enable_interrupt(); // habilita as interrupcoes

    while (1)
    {
    }

    return 0;
}