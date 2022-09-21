#include <msp430g2231.h>

#define SWITCH BIT3
#define SWITCH_PRESSED 0x00

#define RED BIT0

int main(void)
{
    /* stop watchdog timer */
    WDTCTL = WDTPW | WDTHOLD;

    /* Setting up Switch */
    P1DIR &= ~SWITCH; // Set the switch pin to input
    P1REN |= SWITCH;  // Use an internal resistor
    P1OUT |= SWITCH;  // The internal resistor is pullup

    /* Setting up Launchpad LEDs */
    P1DIR |= RED;   // Launchpad LEDs for output
    P1OUT &= ~RED;  // Red LED off at startup

    while (1)
    {
        if ((P1IN & SWITCH) == SWITCH_PRESSED)
        {
            /* Hang until the switch is released. */
            while ((P1IN & SWITCH) == SWITCH_PRESSED);

            P1OUT ^= RED; // Toggle Launchpad LEDs
        }
    }

    return 0;
}