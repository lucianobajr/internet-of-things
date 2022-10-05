#include "msp430g2553.h"
#include <inttypes.h>

uint8_t dado_rx; // define a variavel que recebe os dados da serial

// recebe um caracter pela interface serial. Guarda este valor na variavel 'dado_rx'
// Quando um caracter chega pela interface serial, gera uma interrupcao e armazena na variavel dado_rx
#pragma vector = USCIAB0RX_VECTOR
__interrupt void rx_uart()
{
    dado_rx = UCA0RXBUF;
}

// transmite um caracter pela interface serial
void tx_byte(char dado)
{
    while (!(IFG2 & UCA0TXIFG))
        ;             // espera enquanto a interface serial esta' ocupada (enviando um dado)
    UCA0TXBUF = dado; // inicia a transmissao do dado
}

// transmite uma string pela interface serial, usando a funcao tx_byte();
void tx_frase(char *frase)
{
    int i = 0;
    for (i = 0; *(frase + i); i++) // enquanto nao encontra o fim da string ('\0') transmite o caracter da posicao i
        tx_byte(*(frase + i));
}

void main(void)
{
    // Desativando o watchdog
    WDTCTL = WDTPW + WDTHOLD;

    // Configurando o clock em 1MHz. Ajusta o clock para 1MHz para gerar a temporizacao correta para a interface serial
    BCSCTL1 = CALBC1_1MHZ;
    DCOCTL = CALDCO_1MHZ;

    // Configurando a interface serial em 9600, 8n1
    UCA0CTL1 |= UCSWRST;  // Coloca UART em reset
    UCA0CTL0 = 0x00;      // Sem paridade, bit menos significativo primeiro, 8 bits de dados, 1 stop bit, modo UART, modo assincrono
    UCA0CTL1 |= UCSSEL_2; // Seleciona SMCLK como o sinal de clock da interface serial
    UCA0BR0 = 0x68;       // Seleciona taxa de 9600
    UCA0BR1 = 0x00;       // Seleciona taxa de 9600
    UCA0MCTL = 0x02;      // Seleciona taxa de 9600

    // Configura pinos de RX e TX
    P1SEL |= BIT1 + BIT2;  // Seleciona a funcao de TX e RX da serial para os pinos P1.1 e P1.2
    P1SEL2 |= BIT1 + BIT2; // Seleciona a funcao de TX e RX da serial para os pinos P1.1 e P1.2

    UCA0CTL1 &= ~UCSWRST; // Retira UART do reset

    // configura interrupcaoes da interface serial (recepcao)
    IE2 |= BIT0;        // Ativa a interrucao da interface serial (recepcao)
    IFG2 &= ~UCA0RXIFG; // limpa o flag de interrupcao da interface serial (recepcao)

    __enable_interrupt(); // habilita as interrupcoes

    tx_frase("\n\rEL08D-T11 Microcontroladores 2\n\r"); // envia uma frase de teste

    while (1)
    {
        // este trecho serve apenas de exemplo. Ela fará um eco de cada caracter recebido, ou seja
        // cada caracter que o PC enviar para o MSP será enviado novamente do MSP para o PC

        if (dado_rx != 0) // verifica se existe um caracter a ser transmitido
        {
            tx_byte(dado_rx); // transmite o caracter recebido
            dado_rx = 0;      // 0 significa que nao tem caracter novo recebido
        }
    }
}