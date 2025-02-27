import em from '@$$emscript'
export const $U = em.$declare('COMPOSITE')

export function em$generate() {
    let out = $outfile('adi.distro.max326xx/REGS.hpp')
    out.addFile('../adi.max326xx/adi.distro.max326xx/REGS.hpp.txt')
    out.close()
}

// -------- PERIPHERAL GCR -------- //

export interface GCR_t {
    SYSCTRL: em.$Reg
    RST0: em.$Reg
    CLKCTRL: em.$Reg
    PM: em.$Reg
    PCLKDIV: em.$Reg
    PCLKDIS0: em.$Reg
    MEMCTRL: em.$Reg
    MEMZ: em.$Reg
    SYSST: em.$Reg
    RST1: em.$Reg
    PCLKDIS1: em.$Reg
    EVENTEN: em.$Reg
    REVISION: em.$Reg
    SYSIE: em.$Reg
    ECCERR: em.$Reg
    ECCCED: em.$Reg
    ECCIE: em.$Reg
    ECCADDR: em.$Reg
    BTLELDOCTRL: em.$Reg
    BTLELDODLY: em.$Reg
    GPR: em.$Reg
}

// -------- REGISTER SYSCTRL -------- //

/**
System Control.*/
/**
Boundary Scan TAP enable. When enabled, the JTAG port is conneted to the Boundary Scan TAP instead of the ARM ICE.*/
export const F_GCR_SYSCTRL_BSTAPEN: any = '1'
export const F_GCR_SYSCTRL_BSTAPEN_POS: any = '1'
/**
Flips the Flash bottom and top halves. (Depending on the total flash size, each half is either 256K or 512K). Initiating a flash page flip will cause a flush of both the data buffer on the DCODE bus and the internal instruction buffer.*/
export const F_GCR_SYSCTRL_FLASH_PAGE_FLIP: any = '1'
export const F_GCR_SYSCTRL_FLASH_PAGE_FLIP_POS: any = '1'
export const S_GCR_SYSCTRL_FLASH_PAGE_FLIP_NORMAL: any = '0'
export const V_GCR_SYSCTRL_FLASH_PAGE_FLIP_NORMAL: any = '0'
export const S_GCR_SYSCTRL_FLASH_PAGE_FLIP_SWAPPED: any = '1'
export const V_GCR_SYSCTRL_FLASH_PAGE_FLIP_SWAPPED: any = '1'
/**
Code Cache Flush. This bit is used to flush the code caches and the instruction buffer of the Cortex-M4. */
export const F_GCR_SYSCTRL_ICC0_FLUSH: any = '1'
export const F_GCR_SYSCTRL_ICC0_FLUSH_POS: any = '1'
export const S_GCR_SYSCTRL_ICC0_FLUSH_NORMAL: any = '0'
export const V_GCR_SYSCTRL_ICC0_FLUSH_NORMAL: any = '0'
export const S_GCR_SYSCTRL_ICC0_FLUSH_FLUSH: any = '1'
export const V_GCR_SYSCTRL_ICC0_FLUSH_FLUSH: any = '1'
/**
ROM_DONE status. Used to disable SWD interface during system initialization procedure*/
export const F_GCR_SYSCTRL_ROMDONE: any = '1'
export const F_GCR_SYSCTRL_ROMDONE_POS: any = '1'
/**
Compute ROM Checksum. This bit is self-cleared when calculation is completed. Once set, software clearing this bit is ignored and the bit will remain set until the operation is completed.*/
export const F_GCR_SYSCTRL_CCHK: any = '1'
export const F_GCR_SYSCTRL_CCHK_POS: any = '1'
export const S_GCR_SYSCTRL_CCHK_COMPLETE: any = '0'
export const V_GCR_SYSCTRL_CCHK_COMPLETE: any = '0'
export const S_GCR_SYSCTRL_CCHK_START: any = '1'
export const V_GCR_SYSCTRL_CCHK_START: any = '1'
/**
 Serial Wire Debug Disable. This bit is used to disable the serial wire debug interface This bit is only writeable if (FMV lock word is not programmed) or if (ICE lock word is not programmed and the ROM_DONE bit is not set).*/
export const F_GCR_SYSCTRL_SWD_DIS: any = '1'
export const F_GCR_SYSCTRL_SWD_DIS_POS: any = '1'
/**
ROM Checksum Result. This bit is only valid when CHKRD=1.*/
export const F_GCR_SYSCTRL_CHKRES: any = '1'
export const F_GCR_SYSCTRL_CHKRES_POS: any = '1'
export const S_GCR_SYSCTRL_CHKRES_PASS: any = '0'
export const V_GCR_SYSCTRL_CHKRES_PASS: any = '0'
export const S_GCR_SYSCTRL_CHKRES_FAIL: any = '1'
export const V_GCR_SYSCTRL_CHKRES_FAIL: any = '1'
/**
Operating Voltage Range.*/
export const F_GCR_SYSCTRL_OVR: any = '2'
export const F_GCR_SYSCTRL_OVR_POS: any = '2'

// -------- REGISTER RST0 -------- //

/**
Reset.*/
/**
DMA Reset.*/
export const F_GCR_RST0_DMA: any = '1'
export const F_GCR_RST0_DMA_POS: any = '1'
export const S_GCR_RST0_DMA_RESET_DONE: any = '0'
export const V_GCR_RST0_DMA_RESET_DONE: any = '0'
export const S_GCR_RST0_DMA_BUSY: any = '1'
export const V_GCR_RST0_DMA_BUSY: any = '1'
/**
Watchdog Timer 0 Reset.*/
export const F_GCR_RST0_WDT0: any = '1'
export const F_GCR_RST0_WDT0_POS: any = '1'
/**
GPIO0 Reset. Setting this bit to 1 resets GPIO0 pins to their default states.*/
export const F_GCR_RST0_GPIO0: any = '1'
export const F_GCR_RST0_GPIO0_POS: any = '1'
/**
GPIO1 Reset. Setting this bit to 1 resets GPIO1 pins to their default states.*/
export const F_GCR_RST0_GPIO1: any = '1'
export const F_GCR_RST0_GPIO1_POS: any = '1'
/**
Timer 0 Reset. Setting this bit to 1 resets Timer 0 blocks.*/
export const F_GCR_RST0_TMR0: any = '1'
export const F_GCR_RST0_TMR0_POS: any = '1'
/**
Timer 1 Reset. Setting this bit to 1 resets Timer 1 blocks.*/
export const F_GCR_RST0_TMR1: any = '1'
export const F_GCR_RST0_TMR1_POS: any = '1'
/**
Timer 2 Reset. Setting this bit to 1 resets Timer 2 blocks.*/
export const F_GCR_RST0_TMR2: any = '1'
export const F_GCR_RST0_TMR2_POS: any = '1'
/**
Timer 3 Reset. Setting this bit to 1 resets Timer 3 blocks.*/
export const F_GCR_RST0_TMR3: any = '1'
export const F_GCR_RST0_TMR3_POS: any = '1'
/**
UART 0 Reset. Setting this bit to 1 resets all UART 0 blocks.*/
export const F_GCR_RST0_UART0: any = '1'
export const F_GCR_RST0_UART0_POS: any = '1'
/**
UART 1 Reset. Setting this bit to 1 resets all UART 1 blocks.*/
export const F_GCR_RST0_UART1: any = '1'
export const F_GCR_RST0_UART1_POS: any = '1'
/**
SPI 1 Reset. Setting this bit to 1 resets all SPI 1 blocks.*/
export const F_GCR_RST0_SPI1: any = '1'
export const F_GCR_RST0_SPI1_POS: any = '1'
/**
I2C 0 Reset.*/
export const F_GCR_RST0_I2C0: any = '1'
export const F_GCR_RST0_I2C0_POS: any = '1'
/**
Real Time Clock Reset.*/
export const F_GCR_RST0_RTC: any = '1'
export const F_GCR_RST0_RTC_POS: any = '1'
/**
Semaphore Reset.*/
export const F_GCR_RST0_SMPHR: any = '1'
export const F_GCR_RST0_SMPHR_POS: any = '1'
/**
TRNG Reset. This reset is only available during the manufacture testing phase.*/
export const F_GCR_RST0_TRNG: any = '1'
export const F_GCR_RST0_TRNG_POS: any = '1'
/**
CNN Reset.*/
export const F_GCR_RST0_CNN: any = '1'
export const F_GCR_RST0_CNN_POS: any = '1'
/**
ADC Reset.*/
export const F_GCR_RST0_ADC: any = '1'
export const F_GCR_RST0_ADC_POS: any = '1'
/**
UART2 Reset. Setting this bit to 1 resets all UART 2 blocks.*/
export const F_GCR_RST0_UART2: any = '1'
export const F_GCR_RST0_UART2_POS: any = '1'
/**
Soft Reset. Setting this bit to 1 resets everything except the CPU and the watchdog timer.*/
export const F_GCR_RST0_SOFT: any = '1'
export const F_GCR_RST0_SOFT_POS: any = '1'
/**
Peripheral Reset. Setting this bit to 1 resets all peripherals. The CPU core, the watchdog timer, and all GPIO pins are unaffected by this reset.*/
export const F_GCR_RST0_PERIPH: any = '1'
export const F_GCR_RST0_PERIPH_POS: any = '1'
/**
System Reset. Setting this bit to 1 resets the CPU core and all peripherals, including the watchdog timer.*/
export const F_GCR_RST0_SYS: any = '1'
export const F_GCR_RST0_SYS_POS: any = '1'

// -------- REGISTER CLKCTRL -------- //

/**
Clock Control.*/
/**
Prescaler Select. This 3 bit field sets the system operating frequency by controlling the prescaler that divides the output of the PLL0.*/
export const F_GCR_CLKCTRL_SYSCLK_DIV: any = '3'
export const F_GCR_CLKCTRL_SYSCLK_DIV_POS: any = '3'
export const S_GCR_CLKCTRL_SYSCLK_DIV_DIV1: any = '0'
export const V_GCR_CLKCTRL_SYSCLK_DIV_DIV1: any = '0'
export const S_GCR_CLKCTRL_SYSCLK_DIV_DIV2: any = '1'
export const V_GCR_CLKCTRL_SYSCLK_DIV_DIV2: any = '1'
export const S_GCR_CLKCTRL_SYSCLK_DIV_DIV4: any = '2'
export const V_GCR_CLKCTRL_SYSCLK_DIV_DIV4: any = '2'
export const S_GCR_CLKCTRL_SYSCLK_DIV_DIV8: any = '3'
export const V_GCR_CLKCTRL_SYSCLK_DIV_DIV8: any = '3'
export const S_GCR_CLKCTRL_SYSCLK_DIV_DIV16: any = '4'
export const V_GCR_CLKCTRL_SYSCLK_DIV_DIV16: any = '4'
export const S_GCR_CLKCTRL_SYSCLK_DIV_DIV32: any = '5'
export const V_GCR_CLKCTRL_SYSCLK_DIV_DIV32: any = '5'
export const S_GCR_CLKCTRL_SYSCLK_DIV_DIV64: any = '6'
export const V_GCR_CLKCTRL_SYSCLK_DIV_DIV64: any = '6'
export const S_GCR_CLKCTRL_SYSCLK_DIV_DIV128: any = '7'
export const V_GCR_CLKCTRL_SYSCLK_DIV_DIV128: any = '7'
/**
Clock Source Select. This 3 bit field selects the source for the system clock.*/
export const F_GCR_CLKCTRL_SYSCLK_SEL: any = '3'
export const F_GCR_CLKCTRL_SYSCLK_SEL_POS: any = '3'
export const S_GCR_CLKCTRL_SYSCLK_SEL_ISO: any = '0'
export const V_GCR_CLKCTRL_SYSCLK_SEL_ISO: any = '0'
export const S_GCR_CLKCTRL_SYSCLK_SEL_ERFO: any = '2'
export const V_GCR_CLKCTRL_SYSCLK_SEL_ERFO: any = '2'
export const S_GCR_CLKCTRL_SYSCLK_SEL_INRO: any = '3'
export const V_GCR_CLKCTRL_SYSCLK_SEL_INRO: any = '3'
export const S_GCR_CLKCTRL_SYSCLK_SEL_IPO: any = '4'
export const V_GCR_CLKCTRL_SYSCLK_SEL_IPO: any = '4'
export const S_GCR_CLKCTRL_SYSCLK_SEL_IBRO: any = '5'
export const V_GCR_CLKCTRL_SYSCLK_SEL_IBRO: any = '5'
export const S_GCR_CLKCTRL_SYSCLK_SEL_ERTCO: any = '6'
export const V_GCR_CLKCTRL_SYSCLK_SEL_ERTCO: any = '6'
export const S_GCR_CLKCTRL_SYSCLK_SEL_EXTCLK: any = '7'
export const V_GCR_CLKCTRL_SYSCLK_SEL_EXTCLK: any = '7'
/**
Clock Ready. This read only bit reflects whether the currently selected system clock source is running.*/
export const F_GCR_CLKCTRL_SYSCLK_RDY: any = '1'
export const F_GCR_CLKCTRL_SYSCLK_RDY_POS: any = '1'
export const S_GCR_CLKCTRL_SYSCLK_RDY_BUSY: any = '0'
export const V_GCR_CLKCTRL_SYSCLK_RDY_BUSY: any = '0'
export const S_GCR_CLKCTRL_SYSCLK_RDY_READY: any = '1'
export const V_GCR_CLKCTRL_SYSCLK_RDY_READY: any = '1'
/**
32MHz Crystal Oscillator Enable.*/
export const F_GCR_CLKCTRL_ERFO_EN: any = '1'
export const F_GCR_CLKCTRL_ERFO_EN_POS: any = '1'
export const S_GCR_CLKCTRL_ERFO_EN_DIS: any = '0'
export const V_GCR_CLKCTRL_ERFO_EN_DIS: any = '0'
export const S_GCR_CLKCTRL_ERFO_EN_EN: any = '1'
export const V_GCR_CLKCTRL_ERFO_EN_EN: any = '1'
/**
32 kHz Crystal Oscillator Enable.*/
export const F_GCR_CLKCTRL_ERTCO_EN: any = '1'
export const F_GCR_CLKCTRL_ERTCO_EN_POS: any = '1'
export const S_GCR_CLKCTRL_ERTCO_EN_DIS: any = '0'
export const V_GCR_CLKCTRL_ERTCO_EN_DIS: any = '0'
export const S_GCR_CLKCTRL_ERTCO_EN_EN: any = '1'
export const V_GCR_CLKCTRL_ERTCO_EN_EN: any = '1'
/**
60 MHz High Frequency Internal Reference Clock Enable.*/
export const F_GCR_CLKCTRL_ISO_EN: any = '1'
export const F_GCR_CLKCTRL_ISO_EN_POS: any = '1'
/**
100 MHz High Frequency Internal Reference Clock Enable.*/
export const F_GCR_CLKCTRL_IPO_EN: any = '1'
export const F_GCR_CLKCTRL_IPO_EN_POS: any = '1'
/**
7.3725 MHz High Frequency Internal Reference Clock Enable.*/
export const F_GCR_CLKCTRL_IBRO_EN: any = '1'
export const F_GCR_CLKCTRL_IBRO_EN_POS: any = '1'
/**
7.3725 MHz High Frequency Internal Reference Clock Voltage Select. This register bit is used to select the power supply to the IBRO.*/
export const F_GCR_CLKCTRL_IBRO_VS: any = '1'
export const F_GCR_CLKCTRL_IBRO_VS_POS: any = '1'
export const S_GCR_CLKCTRL_IBRO_VS_VCOR: any = '0'
export const V_GCR_CLKCTRL_IBRO_VS_VCOR: any = '0'
export const S_GCR_CLKCTRL_IBRO_VS_1V: any = '1'
export const V_GCR_CLKCTRL_IBRO_VS_1V: any = '1'
/**
32MHz Crystal Oscillator Ready*/
export const F_GCR_CLKCTRL_ERFO_RDY: any = '1'
export const F_GCR_CLKCTRL_ERFO_RDY_POS: any = '1'
export const S_GCR_CLKCTRL_ERFO_RDY_NOT: any = '0'
export const V_GCR_CLKCTRL_ERFO_RDY_NOT: any = '0'
export const S_GCR_CLKCTRL_ERFO_RDY_READY: any = '1'
export const V_GCR_CLKCTRL_ERFO_RDY_READY: any = '1'
/**
32 kHz Crystal Oscillator Ready*/
export const F_GCR_CLKCTRL_ERTCO_RDY: any = '1'
export const F_GCR_CLKCTRL_ERTCO_RDY_POS: any = '1'
export const S_GCR_CLKCTRL_ERTCO_RDY_NOT: any = '0'
export const V_GCR_CLKCTRL_ERTCO_RDY_NOT: any = '0'
export const S_GCR_CLKCTRL_ERTCO_RDY_READY: any = '1'
export const V_GCR_CLKCTRL_ERTCO_RDY_READY: any = '1'
/**
60 MHz HIRC Ready.*/
export const F_GCR_CLKCTRL_ISO_RDY: any = '1'
export const F_GCR_CLKCTRL_ISO_RDY_POS: any = '1'
/**
100 MHz HIRC Ready.*/
export const F_GCR_CLKCTRL_IPO_RDY: any = '1'
export const F_GCR_CLKCTRL_IPO_RDY_POS: any = '1'
/**
7.3725 MHz HIRC Ready.*/
export const F_GCR_CLKCTRL_IBRO_RDY: any = '1'
export const F_GCR_CLKCTRL_IBRO_RDY_POS: any = '1'
/**
8 kHz Low Frequency Reference Clock Ready.*/
export const F_GCR_CLKCTRL_INRO_RDY: any = '1'
export const F_GCR_CLKCTRL_INRO_RDY_POS: any = '1'

// -------- REGISTER PM -------- //

/**
Power Management.*/
/**
Operating Mode. This two bit field selects the current operating mode for the device. Note that code execution only occurs during ACTIVE mode.*/
export const F_GCR_PM_MODE: any = '4'
export const F_GCR_PM_MODE_POS: any = '4'
export const S_GCR_PM_MODE_ACTIVE: any = '0'
export const V_GCR_PM_MODE_ACTIVE: any = '0'
export const S_GCR_PM_MODE_SLEEP: any = '1'
export const V_GCR_PM_MODE_SLEEP: any = '1'
export const S_GCR_PM_MODE_STANDBY: any = '2'
export const V_GCR_PM_MODE_STANDBY: any = '2'
export const S_GCR_PM_MODE_BACKUP: any = '4'
export const V_GCR_PM_MODE_BACKUP: any = '4'
export const S_GCR_PM_MODE_LPM: any = '8'
export const V_GCR_PM_MODE_LPM: any = '8'
export const S_GCR_PM_MODE_UPM: any = '9'
export const V_GCR_PM_MODE_UPM: any = '9'
export const S_GCR_PM_MODE_POWERDOWN: any = '10'
export const V_GCR_PM_MODE_POWERDOWN: any = '10'
/**
GPIO Wake Up Enable. This bit enables all GPIO pins as potential wakeup sources. Any GPIO configured for wakeup is capable of causing an exit from IDLE or STANDBY modes when this bit is set.*/
export const F_GCR_PM_GPIO_WE: any = '1'
export const F_GCR_PM_GPIO_WE_POS: any = '1'
export const S_GCR_PM_GPIO_WE_DIS: any = '0'
export const V_GCR_PM_GPIO_WE_DIS: any = '0'
export const S_GCR_PM_GPIO_WE_EN: any = '1'
export const V_GCR_PM_GPIO_WE_EN: any = '1'
/**
RTC Alarm Wake Up Enable. This bit enables RTC alarm as wakeup source. If enabled, the desired RTC alarm must be configured via the RTC control registers.*/
export const F_GCR_PM_RTC_WE: any = '1'
export const F_GCR_PM_RTC_WE_POS: any = '1'
/**
WUT Wake Up Enable. This bit enables the Wake-Up Timer as wakeup source. */
export const F_GCR_PM_WUT_WE: any = '1'
export const F_GCR_PM_WUT_WE_POS: any = '1'
/**
AIN COMP Wake Up Enable. This bit enables AIN COMP as wakeup source. */
export const F_GCR_PM_AINCOMP_WE: any = '1'
export const F_GCR_PM_AINCOMP_WE_POS: any = '1'
/**
60 MHz power down. This bit selects the 60 MHz clock power state in DEEPSLEEP mode.*/
export const F_GCR_PM_ISO_PD: any = '1'
export const F_GCR_PM_ISO_PD_POS: any = '1'
export const S_GCR_PM_ISO_PD_ACTIVE: any = '0'
export const V_GCR_PM_ISO_PD_ACTIVE: any = '0'
export const S_GCR_PM_ISO_PD_DEEPSLEEP: any = '1'
export const V_GCR_PM_ISO_PD_DEEPSLEEP: any = '1'
/**
100 MHz power down. This bit selects 100 MHz clock power state in DEEPSLEEP mode. */
export const F_GCR_PM_IPO_PD: any = '1'
export const F_GCR_PM_IPO_PD_POS: any = '1'
/**
7.3725 MHz power down. This bit selects 7.3725 MHz clock power state in DEEPSLEEP mode. */
export const F_GCR_PM_IBRO_PD: any = '1'
export const F_GCR_PM_IBRO_PD_POS: any = '1'
/**
32MHz Oscillator Bypass*/
export const F_GCR_PM_ERFO_BP: any = '1'
export const F_GCR_PM_ERFO_BP_POS: any = '1'

// -------- REGISTER PCLKDIV -------- //

/**
Peripheral Clock Divider.*/
/**
ADC clock Frequency. These bits define the ADC clock frequency. fADC = fPCLK / (ADCFRQ)*/
export const F_GCR_PCLKDIV_ADCFRQ: any = '4'
export const F_GCR_PCLKDIV_ADCFRQ_POS: any = '4'
/**
CNN Clock Divider.*/
export const F_GCR_PCLKDIV_CNNCLKDIV: any = '3'
export const F_GCR_PCLKDIV_CNNCLKDIV_POS: any = '3'
export const S_GCR_PCLKDIV_CNNCLKDIV_DIV2: any = '0'
export const V_GCR_PCLKDIV_CNNCLKDIV_DIV2: any = '0'
export const S_GCR_PCLKDIV_CNNCLKDIV_DIV4: any = '1'
export const V_GCR_PCLKDIV_CNNCLKDIV_DIV4: any = '1'
export const S_GCR_PCLKDIV_CNNCLKDIV_DIV8: any = '2'
export const V_GCR_PCLKDIV_CNNCLKDIV_DIV8: any = '2'
export const S_GCR_PCLKDIV_CNNCLKDIV_DIV16: any = '3'
export const V_GCR_PCLKDIV_CNNCLKDIV_DIV16: any = '3'
export const S_GCR_PCLKDIV_CNNCLKDIV_DIV1: any = '4'
export const V_GCR_PCLKDIV_CNNCLKDIV_DIV1: any = '4'
/**
CNN Clock Select.*/
export const F_GCR_PCLKDIV_CNNCLKSEL: any = '1'
export const F_GCR_PCLKDIV_CNNCLKSEL_POS: any = '1'
export const S_GCR_PCLKDIV_CNNCLKSEL_SYSTEM: any = '0'
export const V_GCR_PCLKDIV_CNNCLKSEL_SYSTEM: any = '0'
export const S_GCR_PCLKDIV_CNNCLKSEL_IBRO60: any = '1'
export const V_GCR_PCLKDIV_CNNCLKSEL_IBRO60: any = '1'

// -------- REGISTER PCLKDIS0 -------- //

/**
Peripheral Clock Disable.*/
/**
GPIO0 Clock Disable.*/
export const F_GCR_PCLKDIS0_GPIO0: any = '1'
export const F_GCR_PCLKDIS0_GPIO0_POS: any = '1'
export const S_GCR_PCLKDIS0_GPIO0_EN: any = '0'
export const V_GCR_PCLKDIS0_GPIO0_EN: any = '0'
export const S_GCR_PCLKDIS0_GPIO0_DIS: any = '1'
export const V_GCR_PCLKDIS0_GPIO0_DIS: any = '1'
/**
GPIO1 Clock Disable.*/
export const F_GCR_PCLKDIS0_GPIO1: any = '1'
export const F_GCR_PCLKDIS0_GPIO1_POS: any = '1'
/**
DMA Clock Disable.*/
export const F_GCR_PCLKDIS0_DMA: any = '1'
export const F_GCR_PCLKDIS0_DMA_POS: any = '1'
/**
SPI 1 Clock Disable.*/
export const F_GCR_PCLKDIS0_SPI1: any = '1'
export const F_GCR_PCLKDIS0_SPI1_POS: any = '1'
/**
UART 0 Clock Disable.*/
export const F_GCR_PCLKDIS0_UART0: any = '1'
export const F_GCR_PCLKDIS0_UART0_POS: any = '1'
/**
UART 1 Clock Disable.*/
export const F_GCR_PCLKDIS0_UART1: any = '1'
export const F_GCR_PCLKDIS0_UART1_POS: any = '1'
/**
I2C 0 Clock Disable.*/
export const F_GCR_PCLKDIS0_I2C0: any = '1'
export const F_GCR_PCLKDIS0_I2C0_POS: any = '1'
/**
Timer 0 Clock Disable.*/
export const F_GCR_PCLKDIS0_TMR0: any = '1'
export const F_GCR_PCLKDIS0_TMR0_POS: any = '1'
/**
Timer 1 Clock Disable.*/
export const F_GCR_PCLKDIS0_TMR1: any = '1'
export const F_GCR_PCLKDIS0_TMR1_POS: any = '1'
/**
Timer 2 Clock Disable.*/
export const F_GCR_PCLKDIS0_TMR2: any = '1'
export const F_GCR_PCLKDIS0_TMR2_POS: any = '1'
/**
Timer 3 Clock Disable.*/
export const F_GCR_PCLKDIS0_TMR3: any = '1'
export const F_GCR_PCLKDIS0_TMR3_POS: any = '1'
/**
ADC Clock Disable.*/
export const F_GCR_PCLKDIS0_ADC: any = '1'
export const F_GCR_PCLKDIS0_ADC_POS: any = '1'
/**
CNN Clock Disable.*/
export const F_GCR_PCLKDIS0_CNN: any = '1'
export const F_GCR_PCLKDIS0_CNN_POS: any = '1'
/**
I2C 1 Clock Disable.*/
export const F_GCR_PCLKDIS0_I2C1: any = '1'
export const F_GCR_PCLKDIS0_I2C1_POS: any = '1'
/**
Pluse Train Clock Disable.*/
export const F_GCR_PCLKDIS0_PT: any = '1'
export const F_GCR_PCLKDIS0_PT_POS: any = '1'

// -------- REGISTER MEMCTRL -------- //

/**
Memory Clock Control Register.*/
/**
Flash Wait State. These bits define the number of wait-state cycles per Flash data read access. Minimum wait state is 2.*/
export const F_GCR_MEMCTRL_FWS: any = '3'
export const F_GCR_MEMCTRL_FWS_POS: any = '3'
/**
SYSRAM0 ECC Select.*/
export const F_GCR_MEMCTRL_SYSRAM0ECC: any = '1'
export const F_GCR_MEMCTRL_SYSRAM0ECC_POS: any = '1'

// -------- REGISTER MEMZ -------- //

/**
Memory Zeroize Control.*/
/**
System RAM Block 0 Zeroization.*/
export const F_GCR_MEMZ_RAM0: any = '1'
export const F_GCR_MEMZ_RAM0_POS: any = '1'
export const S_GCR_MEMZ_RAM0_NOP: any = '0'
export const V_GCR_MEMZ_RAM0_NOP: any = '0'
export const S_GCR_MEMZ_RAM0_START: any = '1'
export const V_GCR_MEMZ_RAM0_START: any = '1'
/**
System RAM Block 1 Zeroization.*/
export const F_GCR_MEMZ_RAM1: any = '1'
export const F_GCR_MEMZ_RAM1_POS: any = '1'
/**
System RAM Block 2 Zeroization.*/
export const F_GCR_MEMZ_RAM2: any = '1'
export const F_GCR_MEMZ_RAM2_POS: any = '1'
/**
System RAM Block 3 Zeroization.*/
export const F_GCR_MEMZ_RAM3: any = '1'
export const F_GCR_MEMZ_RAM3_POS: any = '1'
/**
System RAM 0 ECC Zeroization.*/
export const F_GCR_MEMZ_SYSRAM0ECC: any = '1'
export const F_GCR_MEMZ_SYSRAM0ECC_POS: any = '1'
/**
Instruction Cachei 0 Zeroization.*/
export const F_GCR_MEMZ_ICC0: any = '1'
export const F_GCR_MEMZ_ICC0_POS: any = '1'
/**
Instruction Cachei 1 Zeroization.*/
export const F_GCR_MEMZ_ICC1: any = '1'
export const F_GCR_MEMZ_ICC1_POS: any = '1'

// -------- REGISTER SYSST -------- //

/**
System Status Register.*/
/**
ARM ICE Lock Status.*/
export const F_GCR_SYSST_ICELOCK: any = '1'
export const F_GCR_SYSST_ICELOCK_POS: any = '1'
export const S_GCR_SYSST_ICELOCK_UNLOCKED: any = '0'
export const V_GCR_SYSST_ICELOCK_UNLOCKED: any = '0'
export const S_GCR_SYSST_ICELOCK_LOCKED: any = '1'
export const V_GCR_SYSST_ICELOCK_LOCKED: any = '1'

// -------- REGISTER RST1 -------- //

/**
Reset 1.*/
/**
I2C1 Reset.*/
export const F_GCR_RST1_I2C1: any = '1'
export const F_GCR_RST1_I2C1_POS: any = '1'
export const S_GCR_RST1_I2C1_RESET_DONE: any = '0'
export const V_GCR_RST1_I2C1_RESET_DONE: any = '0'
export const S_GCR_RST1_I2C1_BUSY: any = '1'
export const V_GCR_RST1_I2C1_BUSY: any = '1'
/**
PT Reset.*/
export const F_GCR_RST1_PT: any = '1'
export const F_GCR_RST1_PT_POS: any = '1'
/**
OWM Reset.*/
export const F_GCR_RST1_OWM: any = '1'
export const F_GCR_RST1_OWM_POS: any = '1'
/**
CRC Reset.*/
export const F_GCR_RST1_CRC: any = '1'
export const F_GCR_RST1_CRC_POS: any = '1'
/**
AES Reset.*/
export const F_GCR_RST1_AES: any = '1'
export const F_GCR_RST1_AES_POS: any = '1'
/**
SPI 0 Reset.*/
export const F_GCR_RST1_SPI0: any = '1'
export const F_GCR_RST1_SPI0_POS: any = '1'
/**
SMPHR Reset.*/
export const F_GCR_RST1_SMPHR: any = '1'
export const F_GCR_RST1_SMPHR_POS: any = '1'
/**
I2S Reset.*/
export const F_GCR_RST1_I2S: any = '1'
export const F_GCR_RST1_I2S_POS: any = '1'
/**
I2C2 Reset.*/
export const F_GCR_RST1_I2C2: any = '1'
export const F_GCR_RST1_I2C2_POS: any = '1'
/**
DVS Reset.*/
export const F_GCR_RST1_DVS: any = '1'
export const F_GCR_RST1_DVS_POS: any = '1'
/**
SIMO Reset.*/
export const F_GCR_RST1_SIMO: any = '1'
export const F_GCR_RST1_SIMO_POS: any = '1'
/**
CPU1 Reset.*/
export const F_GCR_RST1_CPU1: any = '1'
export const F_GCR_RST1_CPU1_POS: any = '1'

// -------- REGISTER PCLKDIS1 -------- //

/**
Peripheral Clock Disable.*/
/**
Bluetooth Clock Disable.*/
export const F_GCR_PCLKDIS1_BTLE: any = '1'
export const F_GCR_PCLKDIS1_BTLE_POS: any = '1'
/**
UART2 Clock Disable.*/
export const F_GCR_PCLKDIS1_UART2: any = '1'
export const F_GCR_PCLKDIS1_UART2_POS: any = '1'
export const S_GCR_PCLKDIS1_UART2_EN: any = '0'
export const V_GCR_PCLKDIS1_UART2_EN: any = '0'
export const S_GCR_PCLKDIS1_UART2_DIS: any = '1'
export const V_GCR_PCLKDIS1_UART2_DIS: any = '1'
/**
TRNG Clock Disable.*/
export const F_GCR_PCLKDIS1_TRNG: any = '1'
export const F_GCR_PCLKDIS1_TRNG_POS: any = '1'
/**
SMPHR Clock Disable.*/
export const F_GCR_PCLKDIS1_SMPHR: any = '1'
export const F_GCR_PCLKDIS1_SMPHR_POS: any = '1'
/**
One-Wire Clock Disable.*/
export const F_GCR_PCLKDIS1_OWM: any = '1'
export const F_GCR_PCLKDIS1_OWM_POS: any = '1'
/**
CRC Clock Disable.*/
export const F_GCR_PCLKDIS1_CRC: any = '1'
export const F_GCR_PCLKDIS1_CRC_POS: any = '1'
/**
AES Clock Disable.*/
export const F_GCR_PCLKDIS1_AES: any = '1'
export const F_GCR_PCLKDIS1_AES_POS: any = '1'
/**
SPI 0 Clock Disable.*/
export const F_GCR_PCLKDIS1_SPI0: any = '1'
export const F_GCR_PCLKDIS1_SPI0_POS: any = '1'
/**
Parallel Camera Interface Clock Disable.*/
export const F_GCR_PCLKDIS1_PCIF: any = '1'
export const F_GCR_PCLKDIS1_PCIF_POS: any = '1'
/**
I2S Clock Disable.*/
export const F_GCR_PCLKDIS1_I2S: any = '1'
export const F_GCR_PCLKDIS1_I2S_POS: any = '1'
/**
I2C2 Clock Disable.*/
export const F_GCR_PCLKDIS1_I2C2: any = '1'
export const F_GCR_PCLKDIS1_I2C2_POS: any = '1'
/**
Watch Dog Timer 0 Clock Disable.*/
export const F_GCR_PCLKDIS1_WDT0: any = '1'
export const F_GCR_PCLKDIS1_WDT0_POS: any = '1'
/**
CPU1 Clock Disable.*/
export const F_GCR_PCLKDIS1_CPU1: any = '1'
export const F_GCR_PCLKDIS1_CPU1_POS: any = '1'

// -------- REGISTER EVENTEN -------- //

/**
Event Enable Register.*/
/**
Enable DMA event. When this bit is set, a DMA event will cause an RXEV event to wake the CPU from WFE sleep mode.*/
export const F_GCR_EVENTEN_DMA: any = '1'
export const F_GCR_EVENTEN_DMA_POS: any = '1'
/**
Enable RXEV pin event. When this bit is set, a logic high of GPIO1.8 will cause an RXEV event to wake the CPU from WFE sleep mode.*/
export const F_GCR_EVENTEN_RX: any = '1'
export const F_GCR_EVENTEN_RX_POS: any = '1'
/**
Enable TXEV pin event. When this bit is set, TXEV event from the CPU is output to GPIO1.9.*/
export const F_GCR_EVENTEN_TX: any = '1'
export const F_GCR_EVENTEN_TX_POS: any = '1'

// -------- REGISTER REVISION -------- //

/**
Revision Register.*/
/**
Manufacturer Chip Revision.*/
export const F_GCR_REVISION_REVISION: any = '16'
export const F_GCR_REVISION_REVISION_POS: any = '16'

// -------- REGISTER SYSIE -------- //

/**
System Status Interrupt Enable Register.*/
/**
ARM ICE Unlock Interrupt Enable.*/
export const F_GCR_SYSIE_ICEUNLOCK: any = '1'
export const F_GCR_SYSIE_ICEUNLOCK_POS: any = '1'
export const S_GCR_SYSIE_ICEUNLOCK_DIS: any = '0'
export const V_GCR_SYSIE_ICEUNLOCK_DIS: any = '0'
export const S_GCR_SYSIE_ICEUNLOCK_EN: any = '1'
export const V_GCR_SYSIE_ICEUNLOCK_EN: any = '1'

// -------- REGISTER ECCERR -------- //

/**
ECC Error Register*/
/**
ECC System RAM0 Error Flag. Write 1 to clear.*/
export const F_GCR_ECCERR_RAM: any = '1'
export const F_GCR_ECCERR_RAM_POS: any = '1'

// -------- REGISTER ECCCED -------- //

/**
ECC Not Double Error Detect Register*/
/**
ECC System RAM0 Error Flag. Write 1 to clear.*/
export const F_GCR_ECCCED_RAM: any = '1'
export const F_GCR_ECCCED_RAM_POS: any = '1'

// -------- REGISTER ECCIE -------- //

/**
ECC IRQ Enable Register*/
/**
ECC System RAM0 Error Interrup Enable*/
export const F_GCR_ECCIE_RAM: any = '1'
export const F_GCR_ECCIE_RAM_POS: any = '1'

// -------- REGISTER ECCADDR -------- //

/**
ECC Error Address Register*/
/**
ECC Error Address.*/
export const F_GCR_ECCADDR_ECCERRAD: any = '32'
export const F_GCR_ECCADDR_ECCERRAD_POS: any = '32'

// -------- REGISTER BTLELDOCTRL -------- //

/**
BTLE LDO Control Register*/
/**
LDOTX Enable.*/
export const F_GCR_BTLELDOCTRL_LDOTXEN: any = '1'
export const F_GCR_BTLELDOCTRL_LDOTXEN_POS: any = '1'
/**
LDOTX Pull Down.*/
export const F_GCR_BTLELDOCTRL_LDOTXPULLD: any = '1'
export const F_GCR_BTLELDOCTRL_LDOTXPULLD_POS: any = '1'
/**
LDOTX Voltage Setting.*/
export const F_GCR_BTLELDOCTRL_LDOTXVSEL: any = '2'
export const F_GCR_BTLELDOCTRL_LDOTXVSEL_POS: any = '2'
export const S_GCR_BTLELDOCTRL_LDOTXVSEL_0_7: any = '0'
export const V_GCR_BTLELDOCTRL_LDOTXVSEL_0_7: any = '0'
export const S_GCR_BTLELDOCTRL_LDOTXVSEL_0_85: any = '1'
export const V_GCR_BTLELDOCTRL_LDOTXVSEL_0_85: any = '1'
export const S_GCR_BTLELDOCTRL_LDOTXVSEL_0_9: any = '2'
export const V_GCR_BTLELDOCTRL_LDOTXVSEL_0_9: any = '2'
export const S_GCR_BTLELDOCTRL_LDOTXVSEL_1_1: any = '3'
export const V_GCR_BTLELDOCTRL_LDOTXVSEL_1_1: any = '3'
/**
LDORX Enable.*/
export const F_GCR_BTLELDOCTRL_LDORXEN: any = '1'
export const F_GCR_BTLELDOCTRL_LDORXEN_POS: any = '1'
/**
LDOrX Pull Down.*/
export const F_GCR_BTLELDOCTRL_LDORXPULLD: any = '1'
export const F_GCR_BTLELDOCTRL_LDORXPULLD_POS: any = '1'
/**
LDORX Voltage Setting.*/
export const F_GCR_BTLELDOCTRL_LDORXVSEL: any = '2'
export const F_GCR_BTLELDOCTRL_LDORXVSEL_POS: any = '2'
export const S_GCR_BTLELDOCTRL_LDORXVSEL_0_7: any = '0'
export const V_GCR_BTLELDOCTRL_LDORXVSEL_0_7: any = '0'
export const S_GCR_BTLELDOCTRL_LDORXVSEL_0_85: any = '1'
export const V_GCR_BTLELDOCTRL_LDORXVSEL_0_85: any = '1'
export const S_GCR_BTLELDOCTRL_LDORXVSEL_0_9: any = '2'
export const V_GCR_BTLELDOCTRL_LDORXVSEL_0_9: any = '2'
export const S_GCR_BTLELDOCTRL_LDORXVSEL_1_1: any = '3'
export const V_GCR_BTLELDOCTRL_LDORXVSEL_1_1: any = '3'
/**
LDORX Bypass Enable.*/
export const F_GCR_BTLELDOCTRL_LDORXBYP: any = '1'
export const F_GCR_BTLELDOCTRL_LDORXBYP_POS: any = '1'
/**
LDORX Discharge.*/
export const F_GCR_BTLELDOCTRL_LDORXDISCH: any = '1'
export const F_GCR_BTLELDOCTRL_LDORXDISCH_POS: any = '1'
/**
LDOTX Bypass Enable.*/
export const F_GCR_BTLELDOCTRL_LDOTXBYP: any = '1'
export const F_GCR_BTLELDOCTRL_LDOTXBYP_POS: any = '1'
/**
LDOTX Discharge.*/
export const F_GCR_BTLELDOCTRL_LDOTXDISCH: any = '1'
export const F_GCR_BTLELDOCTRL_LDOTXDISCH_POS: any = '1'
/**
LDOTX Enable Delay.*/
export const F_GCR_BTLELDOCTRL_LDOTXENDLY: any = '1'
export const F_GCR_BTLELDOCTRL_LDOTXENDLY_POS: any = '1'
/**
LDORX Enable Delay.*/
export const F_GCR_BTLELDOCTRL_LDORXENDLY: any = '1'
export const F_GCR_BTLELDOCTRL_LDORXENDLY_POS: any = '1'
/**
LDORX Bypass Enable Delay.*/
export const F_GCR_BTLELDOCTRL_LDORXBYPENENDLY: any = '1'
export const F_GCR_BTLELDOCTRL_LDORXBYPENENDLY_POS: any = '1'
/**
LDOTX Bypass Enable Delay.*/
export const F_GCR_BTLELDOCTRL_LDOTXBYPENENDLY: any = '1'
export const F_GCR_BTLELDOCTRL_LDOTXBYPENENDLY_POS: any = '1'

// -------- REGISTER BTLELDODLY -------- //

/**
BTLE LDO Delay Register*/
/**
Bypass Delay Count.*/
export const F_GCR_BTLELDODLY_BYPDLYCNT: any = '8'
export const F_GCR_BTLELDODLY_BYPDLYCNT_POS: any = '8'
/**
LDORX Delay Count.*/
export const F_GCR_BTLELDODLY_LDORXDLYCNT: any = '9'
export const F_GCR_BTLELDODLY_LDORXDLYCNT_POS: any = '9'
/**
LDOTX Delay Count.*/
export const F_GCR_BTLELDODLY_LDOTXDLYCNT: any = '9'
export const F_GCR_BTLELDODLY_LDOTXDLYCNT_POS: any = '9'

// -------- REGISTER GPR -------- //

/**
General Purpose Register.*/

// -------- PERIPHERAL GPIO -------- //

export interface GPIO_t {
    EN0: em.$Reg
    EN0_SET: em.$Reg
    EN0_CLR: em.$Reg
    OUTEN: em.$Reg
    OUTEN_SET: em.$Reg
    OUTEN_CLR: em.$Reg
    OUT: em.$Reg
    OUT_SET: em.$Reg
    OUT_CLR: em.$Reg
    IN: em.$Reg
    INTMODE: em.$Reg
    INTPOL: em.$Reg
    INEN: em.$Reg
    INTEN: em.$Reg
    INTEN_SET: em.$Reg
    INTEN_CLR: em.$Reg
    INTFL: em.$Reg
    INTFL_CLR: em.$Reg
    WKEN: em.$Reg
    WKEN_SET: em.$Reg
    WKEN_CLR: em.$Reg
    DUALEDGE: em.$Reg
    PADCTRL0: em.$Reg
    PADCTRL1: em.$Reg
    EN1: em.$Reg
    EN1_SET: em.$Reg
    EN1_CLR: em.$Reg
    EN2: em.$Reg
    EN2_SET: em.$Reg
    EN2_CLR: em.$Reg
    HYSEN: em.$Reg
    SRSEL: em.$Reg
    DS0: em.$Reg
    DS1: em.$Reg
    PS: em.$Reg
    VSSEL: em.$Reg
}

// -------- REGISTER EN0 -------- //

/**
GPIO Function Enable Register. Each bit controls the GPIO_EN setting for one GPIO pin on the associated port.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_EN0_GPIO_EN: any = '32'
export const F_GPIO_EN0_GPIO_EN_POS: any = '32'
export const S_GPIO_EN0_GPIO_EN_ALTERNATE: any = '0'
export const V_GPIO_EN0_GPIO_EN_ALTERNATE: any = '0'
export const S_GPIO_EN0_GPIO_EN_GPIO: any = '1'
export const V_GPIO_EN0_GPIO_EN_GPIO: any = '1'

// -------- REGISTER EN0_SET -------- //

/**
GPIO Set Function Enable Register. Writing a 1 to one or more bits in this register sets the bits in the same positions in GPIO_EN to 1, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_EN0_SET_ALL: any = '32'
export const F_GPIO_EN0_SET_ALL_POS: any = '32'

// -------- REGISTER EN0_CLR -------- //

/**
GPIO Clear Function Enable Register. Writing a 1 to one or more bits in this register clears the bits in the same positions in GPIO_EN to 0, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_EN0_CLR_ALL: any = '32'
export const F_GPIO_EN0_CLR_ALL_POS: any = '32'

// -------- REGISTER OUTEN -------- //

/**
GPIO Output Enable Register. Each bit controls the GPIO_OUT_EN setting for one GPIO pin in the associated port.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_OUTEN_EN: any = '32'
export const F_GPIO_OUTEN_EN_POS: any = '32'
export const S_GPIO_OUTEN_EN_DIS: any = '0'
export const V_GPIO_OUTEN_EN_DIS: any = '0'
export const S_GPIO_OUTEN_EN_EN: any = '1'
export const V_GPIO_OUTEN_EN_EN: any = '1'

// -------- REGISTER OUTEN_SET -------- //

/**
GPIO Output Enable Set Function Enable Register. Writing a 1 to one or more bits in this register sets the bits in the same positions in GPIO_OUT_EN to 1, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_OUTEN_SET_ALL: any = '32'
export const F_GPIO_OUTEN_SET_ALL_POS: any = '32'

// -------- REGISTER OUTEN_CLR -------- //

/**
GPIO Output Enable Clear Function Enable Register. Writing a 1 to one or more bits in this register clears the bits in the same positions in GPIO_OUT_EN to 0, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_OUTEN_CLR_ALL: any = '32'
export const F_GPIO_OUTEN_CLR_ALL_POS: any = '32'

// -------- REGISTER OUT -------- //

/**
GPIO Output Register. Each bit controls the GPIO_OUT setting for one pin in the associated port.  This register can be written either directly, or by using the GPIO_OUT_SET and GPIO_OUT_CLR registers.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_OUT_GPIO_OUT: any = '32'
export const F_GPIO_OUT_GPIO_OUT_POS: any = '32'
export const S_GPIO_OUT_GPIO_OUT_LOW: any = '0'
export const V_GPIO_OUT_GPIO_OUT_LOW: any = '0'
export const S_GPIO_OUT_GPIO_OUT_HIGH: any = '1'
export const V_GPIO_OUT_GPIO_OUT_HIGH: any = '1'

// -------- REGISTER OUT_SET -------- //

/**
GPIO Output Set. Writing a 1 to one or more bits in this register sets the bits in the same positions in GPIO_OUT to 1, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_OUT_SET_GPIO_OUT_SET: any = '32'
export const F_GPIO_OUT_SET_GPIO_OUT_SET_POS: any = '32'
export const S_GPIO_OUT_SET_GPIO_OUT_SET_NO: any = '0'
export const V_GPIO_OUT_SET_GPIO_OUT_SET_NO: any = '0'
export const S_GPIO_OUT_SET_GPIO_OUT_SET_SET: any = '1'
export const V_GPIO_OUT_SET_GPIO_OUT_SET_SET: any = '1'

// -------- REGISTER OUT_CLR -------- //

/**
GPIO Output Clear. Writing a 1 to one or more bits in this register clears the bits in the same positions in GPIO_OUT to 0, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_OUT_CLR_GPIO_OUT_CLR: any = '32'
export const F_GPIO_OUT_CLR_GPIO_OUT_CLR_POS: any = '32'

// -------- REGISTER IN -------- //

/**
GPIO Input Register. Read-only register to read from the logic states of the GPIO pins on this port.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_IN_GPIO_IN: any = '32'
export const F_GPIO_IN_GPIO_IN_POS: any = '32'

// -------- REGISTER INTMODE -------- //

/**
GPIO Interrupt Mode Register. Each bit in this register controls the interrupt mode setting for the associated GPIO pin on this port.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_INTMODE_GPIO_INTMODE: any = '32'
export const F_GPIO_INTMODE_GPIO_INTMODE_POS: any = '32'
export const S_GPIO_INTMODE_GPIO_INTMODE_LEVEL: any = '0'
export const V_GPIO_INTMODE_GPIO_INTMODE_LEVEL: any = '0'
export const S_GPIO_INTMODE_GPIO_INTMODE_EDGE: any = '1'
export const V_GPIO_INTMODE_GPIO_INTMODE_EDGE: any = '1'

// -------- REGISTER INTPOL -------- //

/**
GPIO Interrupt Polarity Register. Each bit in this register controls the interrupt polarity setting for one GPIO pin in the associated port.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_INTPOL_GPIO_INTPOL: any = '32'
export const F_GPIO_INTPOL_GPIO_INTPOL_POS: any = '32'
export const S_GPIO_INTPOL_GPIO_INTPOL_FALLING: any = '0'
export const V_GPIO_INTPOL_GPIO_INTPOL_FALLING: any = '0'
export const S_GPIO_INTPOL_GPIO_INTPOL_RISING: any = '1'
export const V_GPIO_INTPOL_GPIO_INTPOL_RISING: any = '1'

// -------- REGISTER INEN -------- //

/**
GPIO Input Enable*/

// -------- REGISTER INTEN -------- //

/**
GPIO Interrupt Enable Register. Each bit in this register controls the GPIO interrupt enable for the associated pin on the GPIO port.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_INTEN_GPIO_INTEN: any = '32'
export const F_GPIO_INTEN_GPIO_INTEN_POS: any = '32'
export const S_GPIO_INTEN_GPIO_INTEN_DIS: any = '0'
export const V_GPIO_INTEN_GPIO_INTEN_DIS: any = '0'
export const S_GPIO_INTEN_GPIO_INTEN_EN: any = '1'
export const V_GPIO_INTEN_GPIO_INTEN_EN: any = '1'

// -------- REGISTER INTEN_SET -------- //

/**
GPIO Interrupt Enable Set. Writing a 1 to one or more bits in this register sets the bits in the same positions in GPIO_INT_EN to 1, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_INTEN_SET_GPIO_INTEN_SET: any = '32'
export const F_GPIO_INTEN_SET_GPIO_INTEN_SET_POS: any = '32'
export const S_GPIO_INTEN_SET_GPIO_INTEN_SET_NO: any = '0'
export const V_GPIO_INTEN_SET_GPIO_INTEN_SET_NO: any = '0'
export const S_GPIO_INTEN_SET_GPIO_INTEN_SET_SET: any = '1'
export const V_GPIO_INTEN_SET_GPIO_INTEN_SET_SET: any = '1'

// -------- REGISTER INTEN_CLR -------- //

/**
GPIO Interrupt Enable Clear. Writing a 1 to one or more bits in this register clears the bits in the same positions in GPIO_INT_EN to 0, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_INTEN_CLR_GPIO_INTEN_CLR: any = '32'
export const F_GPIO_INTEN_CLR_GPIO_INTEN_CLR_POS: any = '32'
export const S_GPIO_INTEN_CLR_GPIO_INTEN_CLR_NO: any = '0'
export const V_GPIO_INTEN_CLR_GPIO_INTEN_CLR_NO: any = '0'
export const S_GPIO_INTEN_CLR_GPIO_INTEN_CLR_CLEAR: any = '1'
export const V_GPIO_INTEN_CLR_GPIO_INTEN_CLR_CLEAR: any = '1'

// -------- REGISTER INTFL -------- //

/**
GPIO Interrupt Status Register. Each bit in this register contains the pending interrupt status for the associated GPIO pin in this port.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_INTFL_GPIO_INTFL: any = '32'
export const F_GPIO_INTFL_GPIO_INTFL_POS: any = '32'
export const S_GPIO_INTFL_GPIO_INTFL_NO: any = '0'
export const V_GPIO_INTFL_GPIO_INTFL_NO: any = '0'
export const S_GPIO_INTFL_GPIO_INTFL_PENDING: any = '1'
export const V_GPIO_INTFL_GPIO_INTFL_PENDING: any = '1'

// -------- REGISTER INTFL_CLR -------- //

/**
GPIO Status Clear. Writing a 1 to one or more bits in this register clears the bits in the same positions in GPIO_INT_STAT to 0, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_INTFL_CLR_ALL: any = '32'
export const F_GPIO_INTFL_CLR_ALL_POS: any = '32'

// -------- REGISTER WKEN -------- //

/**
GPIO Wake Enable Register. Each bit in this register controls the PMU wakeup enable for the associated GPIO pin in this port.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_WKEN_GPIO_WKEN: any = '32'
export const F_GPIO_WKEN_GPIO_WKEN_POS: any = '32'
export const S_GPIO_WKEN_GPIO_WKEN_DIS: any = '0'
export const V_GPIO_WKEN_GPIO_WKEN_DIS: any = '0'
export const S_GPIO_WKEN_GPIO_WKEN_EN: any = '1'
export const V_GPIO_WKEN_GPIO_WKEN_EN: any = '1'

// -------- REGISTER WKEN_SET -------- //

/**
GPIO Wake Enable Set. Writing a 1 to one or more bits in this register sets the bits in the same positions in GPIO_WAKE_EN to 1, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_WKEN_SET_ALL: any = '32'
export const F_GPIO_WKEN_SET_ALL_POS: any = '32'

// -------- REGISTER WKEN_CLR -------- //

/**
GPIO Wake Enable Clear. Writing a 1 to one or more bits in this register clears the bits in the same positions in GPIO_WAKE_EN to 0, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_WKEN_CLR_ALL: any = '32'
export const F_GPIO_WKEN_CLR_ALL_POS: any = '32'

// -------- REGISTER DUALEDGE -------- //

/**
GPIO Interrupt Dual Edge Mode Register. Each bit in this register selects dual edge mode for the associated GPIO pin in this port.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_DUALEDGE_GPIO_DUALEDGE: any = '32'
export const F_GPIO_DUALEDGE_GPIO_DUALEDGE_POS: any = '32'
export const S_GPIO_DUALEDGE_GPIO_DUALEDGE_NO: any = '0'
export const V_GPIO_DUALEDGE_GPIO_DUALEDGE_NO: any = '0'
export const S_GPIO_DUALEDGE_GPIO_DUALEDGE_EN: any = '1'
export const V_GPIO_DUALEDGE_GPIO_DUALEDGE_EN: any = '1'

// -------- REGISTER PADCTRL0 -------- //

/**
GPIO Input Mode Config 1. Each bit in this register enables the weak pull-up for the associated GPIO pin in this port.*/
/**
The two bits in GPIO_PAD_CFG1 and GPIO_PAD_CFG2 for each GPIO pin work together to determine the pad mode when the GPIO is set to input mode.*/
export const F_GPIO_PADCTRL0_GPIO_PADCTRL0: any = '32'
export const F_GPIO_PADCTRL0_GPIO_PADCTRL0_POS: any = '32'
export const S_GPIO_PADCTRL0_GPIO_PADCTRL0_IMPEDANCE: any = '0'
export const V_GPIO_PADCTRL0_GPIO_PADCTRL0_IMPEDANCE: any = '0'
export const S_GPIO_PADCTRL0_GPIO_PADCTRL0_PU: any = '1'
export const V_GPIO_PADCTRL0_GPIO_PADCTRL0_PU: any = '1'
export const S_GPIO_PADCTRL0_GPIO_PADCTRL0_PD: any = '2'
export const V_GPIO_PADCTRL0_GPIO_PADCTRL0_PD: any = '2'

// -------- REGISTER PADCTRL1 -------- //

/**
GPIO Input Mode Config 2. Each bit in this register enables the weak pull-up for the associated GPIO pin in this port.*/
/**
The two bits in GPIO_PAD_CFG1 and GPIO_PAD_CFG2 for each GPIO pin work together to determine the pad mode when the GPIO is set to input mode.*/
export const F_GPIO_PADCTRL1_GPIO_PADCTRL1: any = '32'
export const F_GPIO_PADCTRL1_GPIO_PADCTRL1_POS: any = '32'
export const S_GPIO_PADCTRL1_GPIO_PADCTRL1_IMPEDANCE: any = '0'
export const V_GPIO_PADCTRL1_GPIO_PADCTRL1_IMPEDANCE: any = '0'
export const S_GPIO_PADCTRL1_GPIO_PADCTRL1_PU: any = '1'
export const V_GPIO_PADCTRL1_GPIO_PADCTRL1_PU: any = '1'
export const S_GPIO_PADCTRL1_GPIO_PADCTRL1_PD: any = '2'
export const V_GPIO_PADCTRL1_GPIO_PADCTRL1_PD: any = '2'

// -------- REGISTER EN1 -------- //

/**
GPIO Alternate Function Enable Register. Each bit in this register selects between primary/secondary functions for the associated GPIO pin in this port.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_EN1_GPIO_EN1: any = '32'
export const F_GPIO_EN1_GPIO_EN1_POS: any = '32'
export const S_GPIO_EN1_GPIO_EN1_PRIMARY: any = '0'
export const V_GPIO_EN1_GPIO_EN1_PRIMARY: any = '0'
export const S_GPIO_EN1_GPIO_EN1_SECONDARY: any = '1'
export const V_GPIO_EN1_GPIO_EN1_SECONDARY: any = '1'

// -------- REGISTER EN1_SET -------- //

/**
GPIO Alternate Function Set. Writing a 1 to one or more bits in this register sets the bits in the same positions in GPIO_EN1 to 1, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_EN1_SET_ALL: any = '32'
export const F_GPIO_EN1_SET_ALL_POS: any = '32'

// -------- REGISTER EN1_CLR -------- //

/**
GPIO Alternate Function Clear. Writing a 1 to one or more bits in this register clears the bits in the same positions in GPIO_EN1 to 0, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_EN1_CLR_ALL: any = '32'
export const F_GPIO_EN1_CLR_ALL_POS: any = '32'

// -------- REGISTER EN2 -------- //

/**
GPIO Alternate Function Enable Register. Each bit in this register selects between primary/secondary functions for the associated GPIO pin in this port.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_EN2_GPIO_EN2: any = '32'
export const F_GPIO_EN2_GPIO_EN2_POS: any = '32'
export const S_GPIO_EN2_GPIO_EN2_PRIMARY: any = '0'
export const V_GPIO_EN2_GPIO_EN2_PRIMARY: any = '0'
export const S_GPIO_EN2_GPIO_EN2_SECONDARY: any = '1'
export const V_GPIO_EN2_GPIO_EN2_SECONDARY: any = '1'

// -------- REGISTER EN2_SET -------- //

/**
GPIO Alternate Function 2 Set. Writing a 1 to one or more bits in this register sets the bits in the same positions in GPIO_EN2 to 1, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_EN2_SET_ALL: any = '32'
export const F_GPIO_EN2_SET_ALL_POS: any = '32'

// -------- REGISTER EN2_CLR -------- //

/**
GPIO Wake Alternate Function Clear. Writing a 1 to one or more bits in this register clears the bits in the same positions in GPIO_EN2 to 0, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_EN2_CLR_ALL: any = '32'
export const F_GPIO_EN2_CLR_ALL_POS: any = '32'

// -------- REGISTER HYSEN -------- //

/**
GPIO Input Hysteresis Enable.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_HYSEN_GPIO_HYSEN: any = '32'
export const F_GPIO_HYSEN_GPIO_HYSEN_POS: any = '32'

// -------- REGISTER SRSEL -------- //

/**
GPIO Slew Rate Enable Register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_SRSEL_GPIO_SRSEL: any = '32'
export const F_GPIO_SRSEL_GPIO_SRSEL_POS: any = '32'
export const S_GPIO_SRSEL_GPIO_SRSEL_FAST: any = '0'
export const V_GPIO_SRSEL_GPIO_SRSEL_FAST: any = '0'
export const S_GPIO_SRSEL_GPIO_SRSEL_SLOW: any = '1'
export const V_GPIO_SRSEL_GPIO_SRSEL_SLOW: any = '1'

// -------- REGISTER DS0 -------- //

/**
GPIO Drive Strength  Register. Each bit in this register selects the drive strength for the associated GPIO pin in this port. Refer to the Datasheet for sink/source current of GPIO pins in each mode.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_DS0_GPIO_DS0: any = '32'
export const F_GPIO_DS0_GPIO_DS0_POS: any = '32'
export const S_GPIO_DS0_GPIO_DS0_LD: any = '0'
export const V_GPIO_DS0_GPIO_DS0_LD: any = '0'
export const S_GPIO_DS0_GPIO_DS0_HD: any = '1'
export const V_GPIO_DS0_GPIO_DS0_HD: any = '1'

// -------- REGISTER DS1 -------- //

/**
GPIO Drive Strength 1 Register. Each bit in this register selects the drive strength for the associated GPIO pin in this port. Refer to the Datasheet for sink/source current of GPIO pins in each mode.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_DS1_GPIO_DS1: any = '32'
export const F_GPIO_DS1_GPIO_DS1_POS: any = '32'

// -------- REGISTER PS -------- //

/**
GPIO Pull Select Mode.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_PS_ALL: any = '32'
export const F_GPIO_PS_ALL_POS: any = '32'

// -------- REGISTER VSSEL -------- //

/**
GPIO Voltage Select.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_VSSEL_ALL: any = '32'
export const F_GPIO_VSSEL_ALL_POS: any = '32'

// -------- PERIPHERAL ICC -------- //

export interface ICC_t {
    INFO: em.$Reg
    SZ: em.$Reg
    CTRL: em.$Reg
    INVALIDATE: em.$Reg
}

// -------- REGISTER INFO -------- //

/**
Cache ID Register.*/
/**
Release Number. Identifies the RTL release version.*/
export const F_ICC_INFO_RELNUM: any = '6'
export const F_ICC_INFO_RELNUM_POS: any = '6'
/**
Part Number. This field reflects the value of C_ID_PART_NUMBER configuration parameter.*/
export const F_ICC_INFO_PARTNUM: any = '4'
export const F_ICC_INFO_PARTNUM_POS: any = '4'
/**
Cache ID. This field reflects the value of the C_ID_CACHEID configuration parameter.*/
export const F_ICC_INFO_ID: any = '6'
export const F_ICC_INFO_ID_POS: any = '6'

// -------- REGISTER SZ -------- //

/**
Memory Configuration Register.*/
/**
Cache Size. Indicates total size in Kbytes of cache.*/
export const F_ICC_SZ_CCH: any = '16'
export const F_ICC_SZ_CCH_POS: any = '16'
/**
Main Memory Size. Indicates the total size, in units of 128 Kbytes, of code memory accessible to the cache controller.*/
export const F_ICC_SZ_MEM: any = '16'
export const F_ICC_SZ_MEM_POS: any = '16'

// -------- REGISTER CTRL -------- //

/**
Cache Control and Status Register.*/
/**
Cache Enable. Controls whether the cache is bypassed or is in use. Changing the state of this bit will cause the instruction cache to be flushed and its contents invalidated.*/
export const F_ICC_CTRL_EN: any = '1'
export const F_ICC_CTRL_EN_POS: any = '1'
export const S_ICC_CTRL_EN_DIS: any = '0'
export const V_ICC_CTRL_EN_DIS: any = '0'
export const S_ICC_CTRL_EN_EN: any = '1'
export const V_ICC_CTRL_EN_EN: any = '1'
/**
Cache Ready flag. Cleared by hardware when at any time the cache as a whole is invalidated (including a system reset). When this bit is 0, the cache is effectively in bypass mode (instruction fetches will come from main memory or from the line fill buffer). Set by hardware when the invalidate operation is complete and the cache is ready.*/
export const F_ICC_CTRL_RDY: any = '1'
export const F_ICC_CTRL_RDY_POS: any = '1'
export const S_ICC_CTRL_RDY_NOTREADY: any = '0'
export const V_ICC_CTRL_RDY_NOTREADY: any = '0'
export const S_ICC_CTRL_RDY_READY: any = '1'
export const V_ICC_CTRL_RDY_READY: any = '1'

// -------- REGISTER INVALIDATE -------- //

/**
Invalidate All Registers.*/
/**
Invalidate.*/
export const F_ICC_INVALIDATE_INVALID: any = '32'
export const F_ICC_INVALIDATE_INVALID_POS: any = '32'

// -------- PERIPHERAL LPGCR -------- //

export interface LPGCR_t {
    RST: em.$Reg
    PCLKDIS: em.$Reg
}

// -------- REGISTER RST -------- //

/**
Low Power Reset Register.*/
/**
Low Power GPIO 2 Reset.*/
export const F_LPGCR_RST_GPIO2: any = '1'
export const F_LPGCR_RST_GPIO2_POS: any = '1'
export const S_LPGCR_RST_GPIO2_RESET_DONE: any = '0'
export const V_LPGCR_RST_GPIO2_RESET_DONE: any = '0'
export const S_LPGCR_RST_GPIO2_BUSY: any = '1'
export const V_LPGCR_RST_GPIO2_BUSY: any = '1'
/**
Low Power Watchdog Timer 1 Reset.*/
export const F_LPGCR_RST_WDT1: any = '1'
export const F_LPGCR_RST_WDT1_POS: any = '1'
/**
Low Power Timer 4 Reset.*/
export const F_LPGCR_RST_TMR4: any = '1'
export const F_LPGCR_RST_TMR4_POS: any = '1'
/**
Low Power Timer 5 Reset.*/
export const F_LPGCR_RST_TMR5: any = '1'
export const F_LPGCR_RST_TMR5_POS: any = '1'
/**
Low Power UART 3 Reset.*/
export const F_LPGCR_RST_UART3: any = '1'
export const F_LPGCR_RST_UART3_POS: any = '1'
/**
Low Power Comparator Reset.*/
export const F_LPGCR_RST_LPCOMP: any = '1'
export const F_LPGCR_RST_LPCOMP_POS: any = '1'

// -------- REGISTER PCLKDIS -------- //

/**
Low Power Peripheral Clock Disable Register.*/
/**
Low Power GPIO 2 Clock Disable.*/
export const F_LPGCR_PCLKDIS_GPIO2: any = '1'
export const F_LPGCR_PCLKDIS_GPIO2_POS: any = '1'
export const S_LPGCR_PCLKDIS_GPIO2_EN: any = '0'
export const V_LPGCR_PCLKDIS_GPIO2_EN: any = '0'
export const S_LPGCR_PCLKDIS_GPIO2_DIS: any = '1'
export const V_LPGCR_PCLKDIS_GPIO2_DIS: any = '1'
/**
Low Power Watchdog 1 Clock Disable.*/
export const F_LPGCR_PCLKDIS_WDT1: any = '1'
export const F_LPGCR_PCLKDIS_WDT1_POS: any = '1'
/**
Low Power Timer 4 Clock Disable.*/
export const F_LPGCR_PCLKDIS_TMR4: any = '1'
export const F_LPGCR_PCLKDIS_TMR4_POS: any = '1'
/**
Low Power Timer 5 Clock Disable.*/
export const F_LPGCR_PCLKDIS_TMR5: any = '1'
export const F_LPGCR_PCLKDIS_TMR5_POS: any = '1'
/**
Low Power UART 3 Clock Disable.*/
export const F_LPGCR_PCLKDIS_UART3: any = '1'
export const F_LPGCR_PCLKDIS_UART3_POS: any = '1'
/**
Low Power Comparator Clock Disable.*/
export const F_LPGCR_PCLKDIS_LPCOMP: any = '1'
export const F_LPGCR_PCLKDIS_LPCOMP_POS: any = '1'

// -------- PERIPHERAL RTC -------- //

export interface RTC_t {
    SEC: em.$Reg
    SSEC: em.$Reg
    TODA: em.$Reg
    SSECA: em.$Reg
    CTRL: em.$Reg
    TRIM: em.$Reg
    OSCCTRL: em.$Reg
}

// -------- REGISTER SEC -------- //

/**
RTC Second Counter. This register contains the 32-bit second counter.*/
/**
Seconds Counter.*/
export const F_RTC_SEC_SEC: any = '32'
export const F_RTC_SEC_SEC_POS: any = '32'

// -------- REGISTER SSEC -------- //

/**
RTC Sub-second Counter. This counter increments at 256Hz. RTC_SEC is incremented when this register rolls over from 0xFF to 0x00.*/
/**
Sub-Seconds Counter (12-bit).*/
export const F_RTC_SSEC_SSEC: any = '12'
export const F_RTC_SSEC_SSEC_POS: any = '12'

// -------- REGISTER TODA -------- //

/**
Time-of-day Alarm.*/
/**
Time-of-day Alarm.*/
export const F_RTC_TODA_TOD_ALARM: any = '20'
export const F_RTC_TODA_TOD_ALARM_POS: any = '20'

// -------- REGISTER SSECA -------- //

/**
RTC sub-second alarm.  This register contains the reload value for the sub-second alarm.*/
/**
This register contains the reload value for the sub-second alarm.*/
export const F_RTC_SSECA_SSEC_ALARM: any = '32'
export const F_RTC_SSECA_SSEC_ALARM_POS: any = '32'

// -------- REGISTER CTRL -------- //

/**
RTC Control Register.*/
/**
Real Time Clock Enable. This bit enables the Real Time Clock. This bit can only be written when WE=1 and BUSY =0. Change to this bit is effective only after BUSY is cleared from 1 to 0.*/
export const F_RTC_CTRL_EN: any = '1'
export const F_RTC_CTRL_EN_POS: any = '1'
export const S_RTC_CTRL_EN_DIS: any = '0'
export const V_RTC_CTRL_EN_DIS: any = '0'
export const S_RTC_CTRL_EN_EN: any = '1'
export const V_RTC_CTRL_EN_EN: any = '1'
/**
Alarm Time-of-Day Interrupt Enable. Change to this bit is effective only after BUSY is cleared from 1 to 0.*/
export const F_RTC_CTRL_TOD_ALARM_IE: any = '1'
export const F_RTC_CTRL_TOD_ALARM_IE_POS: any = '1'
export const S_RTC_CTRL_TOD_ALARM_IE_DIS: any = '0'
export const V_RTC_CTRL_TOD_ALARM_IE_DIS: any = '0'
export const S_RTC_CTRL_TOD_ALARM_IE_EN: any = '1'
export const V_RTC_CTRL_TOD_ALARM_IE_EN: any = '1'
/**
Alarm Sub-second Interrupt Enable.  Change to this bit is effective only after BUSY is cleared from 1 to 0.*/
export const F_RTC_CTRL_SSEC_ALARM_IE: any = '1'
export const F_RTC_CTRL_SSEC_ALARM_IE_POS: any = '1'
export const S_RTC_CTRL_SSEC_ALARM_IE_DIS: any = '0'
export const V_RTC_CTRL_SSEC_ALARM_IE_DIS: any = '0'
export const S_RTC_CTRL_SSEC_ALARM_IE_EN: any = '1'
export const V_RTC_CTRL_SSEC_ALARM_IE_EN: any = '1'
/**
RTC Busy. This bit is set to 1 by hardware when changes to RTC registers required a synchronized version of the register to be in place.  This bit is automatically cleared by hardware.*/
export const F_RTC_CTRL_BUSY: any = '1'
export const F_RTC_CTRL_BUSY_POS: any = '1'
export const S_RTC_CTRL_BUSY_IDLE: any = '0'
export const V_RTC_CTRL_BUSY_IDLE: any = '0'
export const S_RTC_CTRL_BUSY_BUSY: any = '1'
export const V_RTC_CTRL_BUSY_BUSY: any = '1'
/**
RTC Ready. This bit is set to 1 by hardware when the RTC count registers update.  It can be cleared to 0 by software at any time. It will also be cleared to 0 by hardware just prior to an update of the RTC count register.*/
export const F_RTC_CTRL_RDY: any = '1'
export const F_RTC_CTRL_RDY_POS: any = '1'
export const S_RTC_CTRL_RDY_BUSY: any = '0'
export const V_RTC_CTRL_RDY_BUSY: any = '0'
export const S_RTC_CTRL_RDY_READY: any = '1'
export const V_RTC_CTRL_RDY_READY: any = '1'
/**
RTC Ready Interrupt Enable.*/
export const F_RTC_CTRL_RDY_IE: any = '1'
export const F_RTC_CTRL_RDY_IE_POS: any = '1'
export const S_RTC_CTRL_RDY_IE_DIS: any = '0'
export const V_RTC_CTRL_RDY_IE_DIS: any = '0'
export const S_RTC_CTRL_RDY_IE_EN: any = '1'
export const V_RTC_CTRL_RDY_IE_EN: any = '1'
/**
Time-of-Day Alarm Interrupt Flag.  This alarm is qualified as wake-up source to the processor.*/
export const F_RTC_CTRL_TOD_ALARM: any = '1'
export const F_RTC_CTRL_TOD_ALARM_POS: any = '1'
export const S_RTC_CTRL_TOD_ALARM_INACTIVE: any = '0'
export const V_RTC_CTRL_TOD_ALARM_INACTIVE: any = '0'
export const S_RTC_CTRL_TOD_ALARM_PENDING: any = '1'
export const V_RTC_CTRL_TOD_ALARM_PENDING: any = '1'
/**
Sub-second Alarm Interrupt Flag. This alarm is qualified as wake-up source to the processor.*/
export const F_RTC_CTRL_SSEC_ALARM: any = '1'
export const F_RTC_CTRL_SSEC_ALARM_POS: any = '1'
export const S_RTC_CTRL_SSEC_ALARM_INACTIVE: any = '0'
export const V_RTC_CTRL_SSEC_ALARM_INACTIVE: any = '0'
export const S_RTC_CTRL_SSEC_ALARM_PENDING: any = '1'
export const V_RTC_CTRL_SSEC_ALARM_PENDING: any = '1'
/**
Square Wave Output Enable.*/
export const F_RTC_CTRL_SQW_EN: any = '1'
export const F_RTC_CTRL_SQW_EN_POS: any = '1'
export const S_RTC_CTRL_SQW_EN_INACTIVE: any = '0'
export const V_RTC_CTRL_SQW_EN_INACTIVE: any = '0'
export const S_RTC_CTRL_SQW_EN_PENDING: any = '1'
export const V_RTC_CTRL_SQW_EN_PENDING: any = '1'
/**
Frequency Output Selection. When SQE=1, these bits specify the output frequency on the SQW pin.*/
export const F_RTC_CTRL_SQW_SEL: any = '2'
export const F_RTC_CTRL_SQW_SEL_POS: any = '2'
export const S_RTC_CTRL_SQW_SEL_FREQ1HZ: any = '0'
export const V_RTC_CTRL_SQW_SEL_FREQ1HZ: any = '0'
export const S_RTC_CTRL_SQW_SEL_FREQ512HZ: any = '1'
export const V_RTC_CTRL_SQW_SEL_FREQ512HZ: any = '1'
export const S_RTC_CTRL_SQW_SEL_FREQ4KHZ: any = '2'
export const V_RTC_CTRL_SQW_SEL_FREQ4KHZ: any = '2'
export const S_RTC_CTRL_SQW_SEL_CLKDIV8: any = '3'
export const V_RTC_CTRL_SQW_SEL_CLKDIV8: any = '3'
/**
Asynchronous Counter Read Enable.*/
export const F_RTC_CTRL_RD_EN: any = '1'
export const F_RTC_CTRL_RD_EN_POS: any = '1'
/**
Write Enable. This register bit serves as a protection mechanism against unintentional writes to critical RTC bits.*/
export const F_RTC_CTRL_WR_EN: any = '1'
export const F_RTC_CTRL_WR_EN_POS: any = '1'
export const S_RTC_CTRL_WR_EN_INACTIVE: any = '0'
export const V_RTC_CTRL_WR_EN_INACTIVE: any = '0'
export const S_RTC_CTRL_WR_EN_PENDING: any = '1'
export const V_RTC_CTRL_WR_EN_PENDING: any = '1'

// -------- REGISTER TRIM -------- //

/**
RTC Trim Register.*/
/**
RTC Trim. This register contains the 2's complement value that specifies the trim resolution. Each increment or decrement of the bit adds or subtracts 1ppm at each 4KHz clock value, with a maximum correction of +/- 127ppm.*/
export const F_RTC_TRIM_TRIM: any = '8'
export const F_RTC_TRIM_TRIM_POS: any = '8'
/**
VBAT Timer Value. When RTC is running off of VBAT, this field is incremented every 32 seconds.*/
export const F_RTC_TRIM_VRTC_TMR: any = '24'
export const F_RTC_TRIM_VRTC_TMR_POS: any = '24'

// -------- REGISTER OSCCTRL -------- //

/**
RTC Oscillator Control Register.*/
/**
RTC Crystal Bypass*/
export const F_RTC_OSCCTRL_BYPASS: any = '1'
export const F_RTC_OSCCTRL_BYPASS_POS: any = '1'
/**
RTC 32kHz Square Wave Output*/
export const F_RTC_OSCCTRL_SQW_32K: any = '1'
export const F_RTC_OSCCTRL_SQW_32K_POS: any = '1'

// -------- PERIPHERAL UART -------- //

export interface UART_t {
    CTRL: em.$Reg
    STATUS: em.$Reg
    INT_EN: em.$Reg
    INT_FL: em.$Reg
    CLKDIV: em.$Reg
    OSR: em.$Reg
    TXPEEK: em.$Reg
    PNR: em.$Reg
    FIFO: em.$Reg
    DMA: em.$Reg
    WKEN: em.$Reg
    WKFL: em.$Reg
}

// -------- REGISTER CTRL -------- //

/**
Control register*/
/**
This field specifies the depth of receive FIFO for interrupt generation (value 0 and > 16 are ignored) */
export const F_UART_CTRL_RX_THD_VAL: any = '4'
export const F_UART_CTRL_RX_THD_VAL_POS: any = '4'
/**
Parity Enable*/
export const F_UART_CTRL_PAR_EN: any = '1'
export const F_UART_CTRL_PAR_EN_POS: any = '1'
/**
when PAREN=1 selects odd or even parity odd is 1 even is 0*/
export const F_UART_CTRL_PAR_EO: any = '1'
export const F_UART_CTRL_PAR_EO_POS: any = '1'
/**
Selects parity based on 1s or 0s count (when PAREN=1) */
export const F_UART_CTRL_PAR_MD: any = '1'
export const F_UART_CTRL_PAR_MD_POS: any = '1'
/**
CTS Sampling Disable */
export const F_UART_CTRL_CTS_DIS: any = '1'
export const F_UART_CTRL_CTS_DIS_POS: any = '1'
/**
Flushes the TX FIFO buffer. This bit is automatically cleared by hardware when flush is completed.*/
export const F_UART_CTRL_TX_FLUSH: any = '1'
export const F_UART_CTRL_TX_FLUSH_POS: any = '1'
/**
Flushes the RX FIFO buffer. This bit is automatically cleared by hardware when flush is completed.*/
export const F_UART_CTRL_RX_FLUSH: any = '1'
export const F_UART_CTRL_RX_FLUSH_POS: any = '1'
/**
Selects UART character size*/
export const F_UART_CTRL_CHAR_SIZE: any = '2'
export const F_UART_CTRL_CHAR_SIZE_POS: any = '2'
export const S_UART_CTRL_CHAR_SIZE_5BITS: any = '0'
export const V_UART_CTRL_CHAR_SIZE_5BITS: any = '0'
export const S_UART_CTRL_CHAR_SIZE_6BITS: any = '1'
export const V_UART_CTRL_CHAR_SIZE_6BITS: any = '1'
export const S_UART_CTRL_CHAR_SIZE_7BITS: any = '2'
export const V_UART_CTRL_CHAR_SIZE_7BITS: any = '2'
export const S_UART_CTRL_CHAR_SIZE_8BITS: any = '3'
export const V_UART_CTRL_CHAR_SIZE_8BITS: any = '3'
/**
Selects the number of stop bits that will be generated*/
export const F_UART_CTRL_STOPBITS: any = '1'
export const F_UART_CTRL_STOPBITS_POS: any = '1'
/**
Enables/disables hardware flow control*/
export const F_UART_CTRL_HFC_EN: any = '1'
export const F_UART_CTRL_HFC_EN_POS: any = '1'
/**
Hardware Flow Control RTS Mode*/
export const F_UART_CTRL_RTSDC: any = '1'
export const F_UART_CTRL_RTSDC_POS: any = '1'
/**
Baud clock enable*/
export const F_UART_CTRL_BCLKEN: any = '1'
export const F_UART_CTRL_BCLKEN_POS: any = '1'
/**
To select the UART clock source for the UART engine (except APB registers). Secondary clock (used for baud rate generator) can be asynchronous from APB clock.*/
export const F_UART_CTRL_BCLKSRC: any = '2'
export const F_UART_CTRL_BCLKSRC_POS: any = '2'
export const S_UART_CTRL_BCLKSRC_PERIPHERAL_CLOCK: any = '0'
export const V_UART_CTRL_BCLKSRC_PERIPHERAL_CLOCK: any = '0'
export const S_UART_CTRL_BCLKSRC_EXTERNAL_CLOCK: any = '1'
export const V_UART_CTRL_BCLKSRC_EXTERNAL_CLOCK: any = '1'
export const S_UART_CTRL_BCLKSRC_CLK2: any = '2'
export const V_UART_CTRL_BCLKSRC_CLK2: any = '2'
export const S_UART_CTRL_BCLKSRC_CLK3: any = '3'
export const V_UART_CTRL_BCLKSRC_CLK3: any = '3'
/**
Data/Parity bit frame error detection enable*/
export const F_UART_CTRL_DPFE_EN: any = '1'
export const F_UART_CTRL_DPFE_EN_POS: any = '1'
/**
Baud clock Ready read only bit*/
export const F_UART_CTRL_BCLKRDY: any = '1'
export const F_UART_CTRL_BCLKRDY_POS: any = '1'
/**
UART Clock Auto Gating mode*/
export const F_UART_CTRL_UCAGM: any = '1'
export const F_UART_CTRL_UCAGM_POS: any = '1'
/**
Fractional Division Mode*/
export const F_UART_CTRL_FDM: any = '1'
export const F_UART_CTRL_FDM_POS: any = '1'
/**
RX Dual Edge Sampling Mode*/
export const F_UART_CTRL_DESM: any = '1'
export const F_UART_CTRL_DESM_POS: any = '1'

// -------- REGISTER STATUS -------- //

/**
Status register*/
/**
Read-only flag indicating the UART transmit status*/
export const F_UART_STATUS_TX_BUSY: any = '1'
export const F_UART_STATUS_TX_BUSY_POS: any = '1'
/**
Read-only flag indicating the UART receiver status*/
export const F_UART_STATUS_RX_BUSY: any = '1'
export const F_UART_STATUS_RX_BUSY_POS: any = '1'
/**
Read-only flag indicating the RX FIFO state*/
export const F_UART_STATUS_RX_EM: any = '1'
export const F_UART_STATUS_RX_EM_POS: any = '1'
/**
Read-only flag indicating the RX FIFO state*/
export const F_UART_STATUS_RX_FULL: any = '1'
export const F_UART_STATUS_RX_FULL_POS: any = '1'
/**
Read-only flag indicating the TX FIFO state*/
export const F_UART_STATUS_TX_EM: any = '1'
export const F_UART_STATUS_TX_EM_POS: any = '1'
/**
Read-only flag indicating the TX FIFO state*/
export const F_UART_STATUS_TX_FULL: any = '1'
export const F_UART_STATUS_TX_FULL_POS: any = '1'
/**
Indicates the number of bytes currently in the RX FIFO (0-RX FIFO_ELTS) */
export const F_UART_STATUS_RX_LVL: any = '4'
export const F_UART_STATUS_RX_LVL_POS: any = '4'
/**
Indicates the number of bytes currently in the TX FIFO (0-TX FIFO_ELTS) */
export const F_UART_STATUS_TX_LVL: any = '4'
export const F_UART_STATUS_TX_LVL_POS: any = '4'

// -------- REGISTER INT_EN -------- //

/**
Interrupt Enable control register*/
/**
Enable Interrupt For RX Frame Error*/
export const F_UART_INT_EN_RX_FERR: any = '1'
export const F_UART_INT_EN_RX_FERR_POS: any = '1'
/**
Enable Interrupt For RX Parity Error*/
export const F_UART_INT_EN_RX_PAR: any = '1'
export const F_UART_INT_EN_RX_PAR_POS: any = '1'
/**
Enable Interrupt For CTS signal change Error*/
export const F_UART_INT_EN_CTS_EV: any = '1'
export const F_UART_INT_EN_CTS_EV_POS: any = '1'
/**
Enable Interrupt For RX FIFO Overrun Error*/
export const F_UART_INT_EN_RX_OV: any = '1'
export const F_UART_INT_EN_RX_OV_POS: any = '1'
/**
Enable Interrupt For RX FIFO reaches the number of bytes configured by RXTHD*/
export const F_UART_INT_EN_RX_THD: any = '1'
export const F_UART_INT_EN_RX_THD_POS: any = '1'
/**
Enable Interrupt For TX FIFO has half empty*/
export const F_UART_INT_EN_TX_HE: any = '1'
export const F_UART_INT_EN_TX_HE_POS: any = '1'

// -------- REGISTER INT_FL -------- //

/**
Interrupt status flags Control register*/
/**
Flag for RX Frame Error Interrupt.*/
export const F_UART_INT_FL_RX_FERR: any = '1'
export const F_UART_INT_FL_RX_FERR_POS: any = '1'
/**
Flag for RX Parity Error interrupt*/
export const F_UART_INT_FL_RX_PAR: any = '1'
export const F_UART_INT_FL_RX_PAR_POS: any = '1'
/**
Flag for CTS signal change interrupt (hardware flow control disabled) */
export const F_UART_INT_FL_CTS_EV: any = '1'
export const F_UART_INT_FL_CTS_EV_POS: any = '1'
/**
Flag for RX FIFO Overrun interrupt*/
export const F_UART_INT_FL_RX_OV: any = '1'
export const F_UART_INT_FL_RX_OV_POS: any = '1'
/**
Flag for interrupt when RX FIFO reaches the number of bytes configured by the RXTHD field*/
export const F_UART_INT_FL_RX_THD: any = '1'
export const F_UART_INT_FL_RX_THD_POS: any = '1'
/**
Flag for interrupt when TX FIFO is half empty*/
export const F_UART_INT_FL_TX_HE: any = '1'
export const F_UART_INT_FL_TX_HE_POS: any = '1'

// -------- REGISTER CLKDIV -------- //

/**
Clock Divider register*/
/**
Baud rate divisor value*/
export const F_UART_CLKDIV_CLKDIV: any = '20'
export const F_UART_CLKDIV_CLKDIV_POS: any = '20'

// -------- REGISTER OSR -------- //

/**
Over Sampling Rate register*/
/**
OSR*/
export const F_UART_OSR_OSR: any = '3'
export const F_UART_OSR_OSR_POS: any = '3'

// -------- REGISTER TXPEEK -------- //

/**
TX FIFO Output Peek register*/
/**
Read TX FIFO next data. Reading from this field does not affect the contents of TX FIFO. Note that the parity bit is available from this field.*/
export const F_UART_TXPEEK_DATA: any = '8'
export const F_UART_TXPEEK_DATA_POS: any = '8'

// -------- REGISTER PNR -------- //

/**
 Pin register*/
/**
Current sampled value of CTS IO*/
export const F_UART_PNR_CTS: any = '1'
export const F_UART_PNR_CTS_POS: any = '1'
/**
This bit controls the value to apply on the RTS IO. If set to 1, the RTS IO is set to high level. If set to 0, the RTS IO is set to low level.*/
export const F_UART_PNR_RTS: any = '1'
export const F_UART_PNR_RTS_POS: any = '1'

// -------- REGISTER FIFO -------- //

/**
FIFO Read/Write register*/
/**
Load/unload location for TX and RX FIFO buffers.*/
export const F_UART_FIFO_DATA: any = '8'
export const F_UART_FIFO_DATA_POS: any = '8'
/**
Parity error flag for next byte to be read from FIFO.*/
export const F_UART_FIFO_RX_PAR: any = '1'
export const F_UART_FIFO_RX_PAR_POS: any = '1'

// -------- REGISTER DMA -------- //

/**
DMA Configuration register*/
/**
TX FIFO Level DMA Trigger If the TX FIFO level is less than this value, then the TX FIFO DMA interface will send a signal to system DMA to notify that TX FIFO is ready to receive data from memory.*/
export const F_UART_DMA_TX_THD_VAL: any = '4'
export const F_UART_DMA_TX_THD_VAL_POS: any = '4'
/**
TX DMA channel enable*/
export const F_UART_DMA_TX_EN: any = '1'
export const F_UART_DMA_TX_EN_POS: any = '1'
/**
Rx FIFO Level DMA Trigger If the RX FIFO level is greater than this value, then the RX FIFO DMA interface will send a signal to the system DMA to notify that RX FIFO has characters to transfer to memory.*/
export const F_UART_DMA_RX_THD_VAL: any = '4'
export const F_UART_DMA_RX_THD_VAL_POS: any = '4'
/**
RX DMA channel enable*/
export const F_UART_DMA_RX_EN: any = '1'
export const F_UART_DMA_RX_EN_POS: any = '1'

// -------- REGISTER WKEN -------- //

/**
Wake up enable Control register*/
/**
Wake-Up Enable for RX FIFO Not Empty*/
export const F_UART_WKEN_RX_NE: any = '1'
export const F_UART_WKEN_RX_NE_POS: any = '1'
/**
Wake-Up Enable for RX FIFO Full*/
export const F_UART_WKEN_RX_FULL: any = '1'
export const F_UART_WKEN_RX_FULL_POS: any = '1'
/**
Wake-Up Enable for RX FIFO Threshold Met*/
export const F_UART_WKEN_RX_THD: any = '1'
export const F_UART_WKEN_RX_THD_POS: any = '1'

// -------- REGISTER WKFL -------- //

/**
Wake up Flags register*/
/**
Wake-Up Flag for RX FIFO Not Empty*/
export const F_UART_WKFL_RX_NE: any = '1'
export const F_UART_WKFL_RX_NE_POS: any = '1'
/**
Wake-Up Flag for RX FIFO Full*/
export const F_UART_WKFL_RX_FULL: any = '1'
export const F_UART_WKFL_RX_FULL_POS: any = '1'
/**
Wake-Up Flag for RX FIFO Threshold Met*/
export const F_UART_WKFL_RX_THD: any = '1'
export const F_UART_WKFL_RX_THD_POS: any = '1'

// -------- INSTANCES -------- //

export const GCR = {} as GCR_t
export const GPIO0 = {} as GPIO_t
export const GPIO1 = {} as GPIO_t
export const GPIO2 = {} as GPIO_t
export const GPIO3 = {} as GPIO_t
export const ICC0 = {} as ICC_t
export const LPGCR = {} as LPGCR_t
export const RTC = {} as RTC_t
export const UART0 = {} as UART_t
export const UART3 = {} as UART_t
export const GPIO = [] as GPIO_t[]
export const UART = [] as UART_t[]
