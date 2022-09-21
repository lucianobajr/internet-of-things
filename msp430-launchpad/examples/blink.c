#include <msp430g2231.h>

#define LED1_MASK 0x01 // valor do pino do led 1
#define LED2_MASK 0x40 // valor do pino do led 2

int main(void)
{
    volatile int i = 0;
    volatile int j = 0;

    /* stop watchdog timer */
    WDTCTL = WDTPW | WDTHOLD;

    /* set P1 direction */
    P1DIR = LED1_MASK | LED2_MASK;

    /* leds off */
    P1OUT = 0x00;

    for (;;)
    {

        /* toggle leds */
        P1OUT ^= (LED1_MASK | LED2_MASK);

        /* delay */
        for (i = 0; i < 10000; i++)
        {
            for (j = 0; j < 10; j++);
        }
    }
}