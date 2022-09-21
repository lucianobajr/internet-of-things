#include <msp430g2231.h>

unsigned int tempCalibrated = 0;

// Rotina de configuração do conversor a/d
void ConfigureAdc(void)
{
    ADC10CTL1 = INCH_10 + ADC10DIV_3;
    ADC10CTL0 = SREF_0 + ADC10SHT_3 + REFON + ADC10ON + ADC10IE;
    __delay_cycles(1000);
    ADC10CTL0 |= ENC + ADC10SC;
    __bis_SR_register(CPUOFF + GIE);
    tempCalibrated = ADC10MEM;
}

unsigned int value = 0;

#pragma vector = ADC10_VECTOR
__interrupt void ADC10_ISR(void)
{
    __bic_SR_register_on_exit(CPUOFF);
}

int main(void)
{
    WDTCTL = WDTPW + WDTHOLD; // Desliga Watchdog timer
    P1DIR = 0x01 + 0x40;      // Define pinos 1.0 e 1.6 como saída (0100 0001)
    BCSCTL1 = CALBC1_1MHZ;    // Seleciona fonte de clock
    DCOCTL = CALDCO_1MHZ;     // Configura fonte de clock
    BCSCTL2 &= ~(DIVS_3);     // Demais configurações de clock
    ConfigureAdc();
    __enable_interrupt(); // Habilita interrupções
    while (1)
    {
        __delay_cycles(1000);            // Atraso de 1000 ciclos
        ADC10CTL0 |= ENC + ADC10SC;      // Valor do AD = sensor interno de temp.
        __bis_SR_register(CPUOFF + GIE); // Desliga CPU e habilita interrupções
        value = ADC10MEM;                // Obtem o valor do AD
        if (value > tempCalibrated)
        {
            P1OUT = 0x01;
        }
        else if (value < tempCalibrated)
            P1OUT = 0x40;
    }
}