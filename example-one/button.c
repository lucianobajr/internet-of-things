#include <msp430g2231.h>

#define LED1_MASK 0x01 // valor do pino do led 1
#define BTN_MASK  0b00001000  // valor do pino do botão

int main(void)
{
    volatile int i = 0;

    /* stop watchdog timer */
    WDTCTL = WDTPW | WDTHOLD;

    P1REN = BTN_MASK;
    /* somente saídas */
    P1DIR = LED1_MASK;

    /* leds off */
    P1OUT = 0x00;

    for (;;)
    {
        // solto
        if((P1IN & BTN_MASK )== BTN_MASK){
            P1OUT = 0b00000000;
        }else{
            P1OUT = (LED1_MASK);
        }

    }
}