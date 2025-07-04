import '@$$emscript'
export const $U = $declare('COMPOSITE')

export function em$generate() {
    let out = $outfile('adi.distro.max326xx/REGS.hpp')
    out.addFile('../adi.max326xx/adi.distro.max326xx/REGS.hpp.txt')
    out.close()
}

// -------- PERIPHERAL GCR -------- //

export interface GCR_t {
    SYSCTRL: $Reg
    RST0: $Reg
    CLKCTRL: $Reg
    PM: $Reg
    PCLKDIV: $Reg
    PCLKDIS0: $Reg
    MEMCTRL: $Reg
    MEMZ: $Reg
    SYSST: $Reg
    RST1: $Reg
    PCLKDIS1: $Reg
    EVENTEN: $Reg
    REVISION: $Reg
    SYSIE: $Reg
    ECCERR: $Reg
    ECCCED: $Reg
    ECCIE: $Reg
    ECCADDR: $Reg
    BTLELDOCTRL: $Reg
    BTLELDODLY: $Reg
    GPR: $Reg
}

// -------- REGISTER SYSCTRL -------- //

/**
System Control.*/
/**
Boundary Scan TAP enable. When enabled, the JTAG port is conneted to the Boundary Scan TAP instead of the ARM ICE.*/
export const F_GCR_SYSCTRL_BSTAPEN_POS = 1
export const F_GCR_SYSCTRL_BSTAPEN = 0x1 << F_GCR_SYSCTRL_BSTAPEN_POS
/**
Flips the Flash bottom and top halves. (Depending on the total flash size, each half is either 256K or 512K). Initiating a flash page flip will cause a flush of both the data buffer on the DCODE bus and the internal instruction buffer.*/
export const F_GCR_SYSCTRL_FLASH_PAGE_FLIP_POS = 4
export const F_GCR_SYSCTRL_FLASH_PAGE_FLIP = 0x1 << F_GCR_SYSCTRL_FLASH_PAGE_FLIP_POS
export const V_GCR_SYSCTRL_FLASH_PAGE_FLIP_NORMAL = 0
export const S_GCR_SYSCTRL_FLASH_PAGE_FLIP_NORMAL = 0 << F_GCR_SYSCTRL_FLASH_PAGE_FLIP_POS
export const V_GCR_SYSCTRL_FLASH_PAGE_FLIP_SWAPPED = 1
export const S_GCR_SYSCTRL_FLASH_PAGE_FLIP_SWAPPED = 1 << F_GCR_SYSCTRL_FLASH_PAGE_FLIP_POS
/**
Code Cache Flush. This bit is used to flush the code caches and the instruction buffer of the Cortex-M4. */
export const F_GCR_SYSCTRL_ICC0_FLUSH_POS = 6
export const F_GCR_SYSCTRL_ICC0_FLUSH = 0x1 << F_GCR_SYSCTRL_ICC0_FLUSH_POS
export const V_GCR_SYSCTRL_ICC0_FLUSH_NORMAL = 0
export const S_GCR_SYSCTRL_ICC0_FLUSH_NORMAL = 0 << F_GCR_SYSCTRL_ICC0_FLUSH_POS
export const V_GCR_SYSCTRL_ICC0_FLUSH_FLUSH = 1
export const S_GCR_SYSCTRL_ICC0_FLUSH_FLUSH = 1 << F_GCR_SYSCTRL_ICC0_FLUSH_POS
/**
ROM_DONE status. Used to disable SWD interface during system initialization procedure*/
export const F_GCR_SYSCTRL_ROMDONE_POS = 12
export const F_GCR_SYSCTRL_ROMDONE = 0x1 << F_GCR_SYSCTRL_ROMDONE_POS
/**
Compute ROM Checksum. This bit is self-cleared when calculation is completed. Once set, software clearing this bit is ignored and the bit will remain set until the operation is completed.*/
export const F_GCR_SYSCTRL_CCHK_POS = 13
export const F_GCR_SYSCTRL_CCHK = 0x1 << F_GCR_SYSCTRL_CCHK_POS
export const V_GCR_SYSCTRL_CCHK_COMPLETE = 0
export const S_GCR_SYSCTRL_CCHK_COMPLETE = 0 << F_GCR_SYSCTRL_CCHK_POS
export const V_GCR_SYSCTRL_CCHK_START = 1
export const S_GCR_SYSCTRL_CCHK_START = 1 << F_GCR_SYSCTRL_CCHK_POS
/**
 Serial Wire Debug Disable. This bit is used to disable the serial wire debug interface This bit is only writeable if (FMV lock word is not programmed) or if (ICE lock word is not programmed and the ROM_DONE bit is not set).*/
export const F_GCR_SYSCTRL_SWD_DIS_POS = 14
export const F_GCR_SYSCTRL_SWD_DIS = 0x1 << F_GCR_SYSCTRL_SWD_DIS_POS
/**
ROM Checksum Result. This bit is only valid when CHKRD=1.*/
export const F_GCR_SYSCTRL_CHKRES_POS = 15
export const F_GCR_SYSCTRL_CHKRES = 0x1 << F_GCR_SYSCTRL_CHKRES_POS
export const V_GCR_SYSCTRL_CHKRES_PASS = 0
export const S_GCR_SYSCTRL_CHKRES_PASS = 0 << F_GCR_SYSCTRL_CHKRES_POS
export const V_GCR_SYSCTRL_CHKRES_FAIL = 1
export const S_GCR_SYSCTRL_CHKRES_FAIL = 1 << F_GCR_SYSCTRL_CHKRES_POS
/**
Operating Voltage Range.*/
export const F_GCR_SYSCTRL_OVR_POS = 16
export const F_GCR_SYSCTRL_OVR = 0x3 << F_GCR_SYSCTRL_OVR_POS

// -------- REGISTER RST0 -------- //

/**
Reset.*/
/**
DMA Reset.*/
export const F_GCR_RST0_DMA_POS = 0
export const F_GCR_RST0_DMA = 0x1 << F_GCR_RST0_DMA_POS
export const V_GCR_RST0_DMA_RESET_DONE = 0
export const S_GCR_RST0_DMA_RESET_DONE = 0 << F_GCR_RST0_DMA_POS
export const V_GCR_RST0_DMA_BUSY = 1
export const S_GCR_RST0_DMA_BUSY = 1 << F_GCR_RST0_DMA_POS
/**
Watchdog Timer 0 Reset.*/
export const F_GCR_RST0_WDT0_POS = 1
export const F_GCR_RST0_WDT0 = 0x1 << F_GCR_RST0_WDT0_POS
/**
GPIO0 Reset. Setting this bit to 1 resets GPIO0 pins to their default states.*/
export const F_GCR_RST0_GPIO0_POS = 2
export const F_GCR_RST0_GPIO0 = 0x1 << F_GCR_RST0_GPIO0_POS
/**
GPIO1 Reset. Setting this bit to 1 resets GPIO1 pins to their default states.*/
export const F_GCR_RST0_GPIO1_POS = 3
export const F_GCR_RST0_GPIO1 = 0x1 << F_GCR_RST0_GPIO1_POS
/**
Timer 0 Reset. Setting this bit to 1 resets Timer 0 blocks.*/
export const F_GCR_RST0_TMR0_POS = 5
export const F_GCR_RST0_TMR0 = 0x1 << F_GCR_RST0_TMR0_POS
/**
Timer 1 Reset. Setting this bit to 1 resets Timer 1 blocks.*/
export const F_GCR_RST0_TMR1_POS = 6
export const F_GCR_RST0_TMR1 = 0x1 << F_GCR_RST0_TMR1_POS
/**
Timer 2 Reset. Setting this bit to 1 resets Timer 2 blocks.*/
export const F_GCR_RST0_TMR2_POS = 7
export const F_GCR_RST0_TMR2 = 0x1 << F_GCR_RST0_TMR2_POS
/**
Timer 3 Reset. Setting this bit to 1 resets Timer 3 blocks.*/
export const F_GCR_RST0_TMR3_POS = 8
export const F_GCR_RST0_TMR3 = 0x1 << F_GCR_RST0_TMR3_POS
/**
UART 0 Reset. Setting this bit to 1 resets all UART 0 blocks.*/
export const F_GCR_RST0_UART0_POS = 11
export const F_GCR_RST0_UART0 = 0x1 << F_GCR_RST0_UART0_POS
/**
UART 1 Reset. Setting this bit to 1 resets all UART 1 blocks.*/
export const F_GCR_RST0_UART1_POS = 12
export const F_GCR_RST0_UART1 = 0x1 << F_GCR_RST0_UART1_POS
/**
SPI 1 Reset. Setting this bit to 1 resets all SPI 1 blocks.*/
export const F_GCR_RST0_SPI1_POS = 13
export const F_GCR_RST0_SPI1 = 0x1 << F_GCR_RST0_SPI1_POS
/**
I2C 0 Reset.*/
export const F_GCR_RST0_I2C0_POS = 16
export const F_GCR_RST0_I2C0 = 0x1 << F_GCR_RST0_I2C0_POS
/**
Real Time Clock Reset.*/
export const F_GCR_RST0_RTC_POS = 17
export const F_GCR_RST0_RTC = 0x1 << F_GCR_RST0_RTC_POS
/**
Semaphore Reset.*/
export const F_GCR_RST0_SMPHR_POS = 22
export const F_GCR_RST0_SMPHR = 0x1 << F_GCR_RST0_SMPHR_POS
/**
TRNG Reset. This reset is only available during the manufacture testing phase.*/
export const F_GCR_RST0_TRNG_POS = 24
export const F_GCR_RST0_TRNG = 0x1 << F_GCR_RST0_TRNG_POS
/**
CNN Reset.*/
export const F_GCR_RST0_CNN_POS = 25
export const F_GCR_RST0_CNN = 0x1 << F_GCR_RST0_CNN_POS
/**
ADC Reset.*/
export const F_GCR_RST0_ADC_POS = 26
export const F_GCR_RST0_ADC = 0x1 << F_GCR_RST0_ADC_POS
/**
UART2 Reset. Setting this bit to 1 resets all UART 2 blocks.*/
export const F_GCR_RST0_UART2_POS = 28
export const F_GCR_RST0_UART2 = 0x1 << F_GCR_RST0_UART2_POS
/**
Soft Reset. Setting this bit to 1 resets everything except the CPU and the watchdog timer.*/
export const F_GCR_RST0_SOFT_POS = 29
export const F_GCR_RST0_SOFT = 0x1 << F_GCR_RST0_SOFT_POS
/**
Peripheral Reset. Setting this bit to 1 resets all peripherals. The CPU core, the watchdog timer, and all GPIO pins are unaffected by this reset.*/
export const F_GCR_RST0_PERIPH_POS = 30
export const F_GCR_RST0_PERIPH = 0x1 << F_GCR_RST0_PERIPH_POS
/**
System Reset. Setting this bit to 1 resets the CPU core and all peripherals, including the watchdog timer.*/
export const F_GCR_RST0_SYS_POS = 31
export const F_GCR_RST0_SYS = 0x1 << F_GCR_RST0_SYS_POS

// -------- REGISTER CLKCTRL -------- //

/**
Clock Control.*/
/**
Prescaler Select. This 3 bit field sets the system operating frequency by controlling the prescaler that divides the output of the PLL0.*/
export const F_GCR_CLKCTRL_SYSCLK_DIV_POS = 6
export const F_GCR_CLKCTRL_SYSCLK_DIV = 0x7 << F_GCR_CLKCTRL_SYSCLK_DIV_POS
export const V_GCR_CLKCTRL_SYSCLK_DIV_DIV1 = 0
export const S_GCR_CLKCTRL_SYSCLK_DIV_DIV1 = 0 << F_GCR_CLKCTRL_SYSCLK_DIV_POS
export const V_GCR_CLKCTRL_SYSCLK_DIV_DIV2 = 1
export const S_GCR_CLKCTRL_SYSCLK_DIV_DIV2 = 1 << F_GCR_CLKCTRL_SYSCLK_DIV_POS
export const V_GCR_CLKCTRL_SYSCLK_DIV_DIV4 = 2
export const S_GCR_CLKCTRL_SYSCLK_DIV_DIV4 = 2 << F_GCR_CLKCTRL_SYSCLK_DIV_POS
export const V_GCR_CLKCTRL_SYSCLK_DIV_DIV8 = 3
export const S_GCR_CLKCTRL_SYSCLK_DIV_DIV8 = 3 << F_GCR_CLKCTRL_SYSCLK_DIV_POS
export const V_GCR_CLKCTRL_SYSCLK_DIV_DIV16 = 4
export const S_GCR_CLKCTRL_SYSCLK_DIV_DIV16 = 4 << F_GCR_CLKCTRL_SYSCLK_DIV_POS
export const V_GCR_CLKCTRL_SYSCLK_DIV_DIV32 = 5
export const S_GCR_CLKCTRL_SYSCLK_DIV_DIV32 = 5 << F_GCR_CLKCTRL_SYSCLK_DIV_POS
export const V_GCR_CLKCTRL_SYSCLK_DIV_DIV64 = 6
export const S_GCR_CLKCTRL_SYSCLK_DIV_DIV64 = 6 << F_GCR_CLKCTRL_SYSCLK_DIV_POS
export const V_GCR_CLKCTRL_SYSCLK_DIV_DIV128 = 7
export const S_GCR_CLKCTRL_SYSCLK_DIV_DIV128 = 7 << F_GCR_CLKCTRL_SYSCLK_DIV_POS
/**
Clock Source Select. This 3 bit field selects the source for the system clock.*/
export const F_GCR_CLKCTRL_SYSCLK_SEL_POS = 9
export const F_GCR_CLKCTRL_SYSCLK_SEL = 0x7 << F_GCR_CLKCTRL_SYSCLK_SEL_POS
export const V_GCR_CLKCTRL_SYSCLK_SEL_ISO = 0
export const S_GCR_CLKCTRL_SYSCLK_SEL_ISO = 0 << F_GCR_CLKCTRL_SYSCLK_SEL_POS
export const V_GCR_CLKCTRL_SYSCLK_SEL_ERFO = 2
export const S_GCR_CLKCTRL_SYSCLK_SEL_ERFO = 2 << F_GCR_CLKCTRL_SYSCLK_SEL_POS
export const V_GCR_CLKCTRL_SYSCLK_SEL_INRO = 3
export const S_GCR_CLKCTRL_SYSCLK_SEL_INRO = 3 << F_GCR_CLKCTRL_SYSCLK_SEL_POS
export const V_GCR_CLKCTRL_SYSCLK_SEL_IPO = 4
export const S_GCR_CLKCTRL_SYSCLK_SEL_IPO = 4 << F_GCR_CLKCTRL_SYSCLK_SEL_POS
export const V_GCR_CLKCTRL_SYSCLK_SEL_IBRO = 5
export const S_GCR_CLKCTRL_SYSCLK_SEL_IBRO = 5 << F_GCR_CLKCTRL_SYSCLK_SEL_POS
export const V_GCR_CLKCTRL_SYSCLK_SEL_ERTCO = 6
export const S_GCR_CLKCTRL_SYSCLK_SEL_ERTCO = 6 << F_GCR_CLKCTRL_SYSCLK_SEL_POS
export const V_GCR_CLKCTRL_SYSCLK_SEL_EXTCLK = 7
export const S_GCR_CLKCTRL_SYSCLK_SEL_EXTCLK = 7 << F_GCR_CLKCTRL_SYSCLK_SEL_POS
/**
Clock Ready. This read only bit reflects whether the currently selected system clock source is running.*/
export const F_GCR_CLKCTRL_SYSCLK_RDY_POS = 13
export const F_GCR_CLKCTRL_SYSCLK_RDY = 0x1 << F_GCR_CLKCTRL_SYSCLK_RDY_POS
export const V_GCR_CLKCTRL_SYSCLK_RDY_BUSY = 0
export const S_GCR_CLKCTRL_SYSCLK_RDY_BUSY = 0 << F_GCR_CLKCTRL_SYSCLK_RDY_POS
export const V_GCR_CLKCTRL_SYSCLK_RDY_READY = 1
export const S_GCR_CLKCTRL_SYSCLK_RDY_READY = 1 << F_GCR_CLKCTRL_SYSCLK_RDY_POS
/**
32MHz Crystal Oscillator Enable.*/
export const F_GCR_CLKCTRL_ERFO_EN_POS = 16
export const F_GCR_CLKCTRL_ERFO_EN = 0x1 << F_GCR_CLKCTRL_ERFO_EN_POS
export const V_GCR_CLKCTRL_ERFO_EN_DIS = 0
export const S_GCR_CLKCTRL_ERFO_EN_DIS = 0 << F_GCR_CLKCTRL_ERFO_EN_POS
export const V_GCR_CLKCTRL_ERFO_EN_EN = 1
export const S_GCR_CLKCTRL_ERFO_EN_EN = 1 << F_GCR_CLKCTRL_ERFO_EN_POS
/**
32 kHz Crystal Oscillator Enable.*/
export const F_GCR_CLKCTRL_ERTCO_EN_POS = 17
export const F_GCR_CLKCTRL_ERTCO_EN = 0x1 << F_GCR_CLKCTRL_ERTCO_EN_POS
export const V_GCR_CLKCTRL_ERTCO_EN_DIS = 0
export const S_GCR_CLKCTRL_ERTCO_EN_DIS = 0 << F_GCR_CLKCTRL_ERTCO_EN_POS
export const V_GCR_CLKCTRL_ERTCO_EN_EN = 1
export const S_GCR_CLKCTRL_ERTCO_EN_EN = 1 << F_GCR_CLKCTRL_ERTCO_EN_POS
/**
60 MHz High Frequency Internal Reference Clock Enable.*/
export const F_GCR_CLKCTRL_ISO_EN_POS = 18
export const F_GCR_CLKCTRL_ISO_EN = 0x1 << F_GCR_CLKCTRL_ISO_EN_POS
/**
100 MHz High Frequency Internal Reference Clock Enable.*/
export const F_GCR_CLKCTRL_IPO_EN_POS = 19
export const F_GCR_CLKCTRL_IPO_EN = 0x1 << F_GCR_CLKCTRL_IPO_EN_POS
/**
7.3725 MHz High Frequency Internal Reference Clock Enable.*/
export const F_GCR_CLKCTRL_IBRO_EN_POS = 20
export const F_GCR_CLKCTRL_IBRO_EN = 0x1 << F_GCR_CLKCTRL_IBRO_EN_POS
/**
7.3725 MHz High Frequency Internal Reference Clock Voltage Select. This register bit is used to select the power supply to the IBRO.*/
export const F_GCR_CLKCTRL_IBRO_VS_POS = 21
export const F_GCR_CLKCTRL_IBRO_VS = 0x1 << F_GCR_CLKCTRL_IBRO_VS_POS
export const V_GCR_CLKCTRL_IBRO_VS_VCOR = 0
export const S_GCR_CLKCTRL_IBRO_VS_VCOR = 0 << F_GCR_CLKCTRL_IBRO_VS_POS
export const V_GCR_CLKCTRL_IBRO_VS_1V = 1
export const S_GCR_CLKCTRL_IBRO_VS_1V = 1 << F_GCR_CLKCTRL_IBRO_VS_POS
/**
32MHz Crystal Oscillator Ready*/
export const F_GCR_CLKCTRL_ERFO_RDY_POS = 24
export const F_GCR_CLKCTRL_ERFO_RDY = 0x1 << F_GCR_CLKCTRL_ERFO_RDY_POS
export const V_GCR_CLKCTRL_ERFO_RDY_NOT = 0
export const S_GCR_CLKCTRL_ERFO_RDY_NOT = 0 << F_GCR_CLKCTRL_ERFO_RDY_POS
export const V_GCR_CLKCTRL_ERFO_RDY_READY = 1
export const S_GCR_CLKCTRL_ERFO_RDY_READY = 1 << F_GCR_CLKCTRL_ERFO_RDY_POS
/**
32 kHz Crystal Oscillator Ready*/
export const F_GCR_CLKCTRL_ERTCO_RDY_POS = 25
export const F_GCR_CLKCTRL_ERTCO_RDY = 0x1 << F_GCR_CLKCTRL_ERTCO_RDY_POS
export const V_GCR_CLKCTRL_ERTCO_RDY_NOT = 0
export const S_GCR_CLKCTRL_ERTCO_RDY_NOT = 0 << F_GCR_CLKCTRL_ERTCO_RDY_POS
export const V_GCR_CLKCTRL_ERTCO_RDY_READY = 1
export const S_GCR_CLKCTRL_ERTCO_RDY_READY = 1 << F_GCR_CLKCTRL_ERTCO_RDY_POS
/**
60 MHz HIRC Ready.*/
export const F_GCR_CLKCTRL_ISO_RDY_POS = 26
export const F_GCR_CLKCTRL_ISO_RDY = 0x1 << F_GCR_CLKCTRL_ISO_RDY_POS
/**
100 MHz HIRC Ready.*/
export const F_GCR_CLKCTRL_IPO_RDY_POS = 27
export const F_GCR_CLKCTRL_IPO_RDY = 0x1 << F_GCR_CLKCTRL_IPO_RDY_POS
/**
7.3725 MHz HIRC Ready.*/
export const F_GCR_CLKCTRL_IBRO_RDY_POS = 28
export const F_GCR_CLKCTRL_IBRO_RDY = 0x1 << F_GCR_CLKCTRL_IBRO_RDY_POS
/**
8 kHz Low Frequency Reference Clock Ready.*/
export const F_GCR_CLKCTRL_INRO_RDY_POS = 29
export const F_GCR_CLKCTRL_INRO_RDY = 0x1 << F_GCR_CLKCTRL_INRO_RDY_POS

// -------- REGISTER PM -------- //

/**
Power Management.*/
/**
Operating Mode. This two bit field selects the current operating mode for the device. Note that code execution only occurs during ACTIVE mode.*/
export const F_GCR_PM_MODE_POS = 0
export const F_GCR_PM_MODE = 0xf << F_GCR_PM_MODE_POS
export const V_GCR_PM_MODE_ACTIVE = 0
export const S_GCR_PM_MODE_ACTIVE = 0 << F_GCR_PM_MODE_POS
export const V_GCR_PM_MODE_SLEEP = 1
export const S_GCR_PM_MODE_SLEEP = 1 << F_GCR_PM_MODE_POS
export const V_GCR_PM_MODE_STANDBY = 2
export const S_GCR_PM_MODE_STANDBY = 2 << F_GCR_PM_MODE_POS
export const V_GCR_PM_MODE_BACKUP = 4
export const S_GCR_PM_MODE_BACKUP = 4 << F_GCR_PM_MODE_POS
export const V_GCR_PM_MODE_LPM = 8
export const S_GCR_PM_MODE_LPM = 8 << F_GCR_PM_MODE_POS
export const V_GCR_PM_MODE_UPM = 9
export const S_GCR_PM_MODE_UPM = 9 << F_GCR_PM_MODE_POS
export const V_GCR_PM_MODE_POWERDOWN = 10
export const S_GCR_PM_MODE_POWERDOWN = 10 << F_GCR_PM_MODE_POS
/**
GPIO Wake Up Enable. This bit enables all GPIO pins as potential wakeup sources. Any GPIO configured for wakeup is capable of causing an exit from IDLE or STANDBY modes when this bit is set.*/
export const F_GCR_PM_GPIO_WE_POS = 4
export const F_GCR_PM_GPIO_WE = 0x1 << F_GCR_PM_GPIO_WE_POS
export const V_GCR_PM_GPIO_WE_DIS = 0
export const S_GCR_PM_GPIO_WE_DIS = 0 << F_GCR_PM_GPIO_WE_POS
export const V_GCR_PM_GPIO_WE_EN = 1
export const S_GCR_PM_GPIO_WE_EN = 1 << F_GCR_PM_GPIO_WE_POS
/**
RTC Alarm Wake Up Enable. This bit enables RTC alarm as wakeup source. If enabled, the desired RTC alarm must be configured via the RTC control registers.*/
export const F_GCR_PM_RTC_WE_POS = 5
export const F_GCR_PM_RTC_WE = 0x1 << F_GCR_PM_RTC_WE_POS
/**
WUT Wake Up Enable. This bit enables the Wake-Up Timer as wakeup source. */
export const F_GCR_PM_WUT_WE_POS = 7
export const F_GCR_PM_WUT_WE = 0x1 << F_GCR_PM_WUT_WE_POS
/**
AIN COMP Wake Up Enable. This bit enables AIN COMP as wakeup source. */
export const F_GCR_PM_AINCOMP_WE_POS = 9
export const F_GCR_PM_AINCOMP_WE = 0x1 << F_GCR_PM_AINCOMP_WE_POS
/**
60 MHz power down. This bit selects the 60 MHz clock power state in DEEPSLEEP mode.*/
export const F_GCR_PM_ISO_PD_POS = 15
export const F_GCR_PM_ISO_PD = 0x1 << F_GCR_PM_ISO_PD_POS
export const V_GCR_PM_ISO_PD_ACTIVE = 0
export const S_GCR_PM_ISO_PD_ACTIVE = 0 << F_GCR_PM_ISO_PD_POS
export const V_GCR_PM_ISO_PD_DEEPSLEEP = 1
export const S_GCR_PM_ISO_PD_DEEPSLEEP = 1 << F_GCR_PM_ISO_PD_POS
/**
100 MHz power down. This bit selects 100 MHz clock power state in DEEPSLEEP mode. */
export const F_GCR_PM_IPO_PD_POS = 16
export const F_GCR_PM_IPO_PD = 0x1 << F_GCR_PM_IPO_PD_POS
/**
7.3725 MHz power down. This bit selects 7.3725 MHz clock power state in DEEPSLEEP mode. */
export const F_GCR_PM_IBRO_PD_POS = 17
export const F_GCR_PM_IBRO_PD = 0x1 << F_GCR_PM_IBRO_PD_POS
/**
32MHz Oscillator Bypass*/
export const F_GCR_PM_ERFO_BP_POS = 20
export const F_GCR_PM_ERFO_BP = 0x1 << F_GCR_PM_ERFO_BP_POS

// -------- REGISTER PCLKDIV -------- //

/**
Peripheral Clock Divider.*/
/**
ADC clock Frequency. These bits define the ADC clock frequency. fADC = fPCLK / (ADCFRQ)*/
export const F_GCR_PCLKDIV_ADCFRQ_POS = 10
export const F_GCR_PCLKDIV_ADCFRQ = 0xf << F_GCR_PCLKDIV_ADCFRQ_POS
/**
CNN Clock Divider.*/
export const F_GCR_PCLKDIV_CNNCLKDIV_POS = 14
export const F_GCR_PCLKDIV_CNNCLKDIV = 0x7 << F_GCR_PCLKDIV_CNNCLKDIV_POS
export const V_GCR_PCLKDIV_CNNCLKDIV_DIV2 = 0
export const S_GCR_PCLKDIV_CNNCLKDIV_DIV2 = 0 << F_GCR_PCLKDIV_CNNCLKDIV_POS
export const V_GCR_PCLKDIV_CNNCLKDIV_DIV4 = 1
export const S_GCR_PCLKDIV_CNNCLKDIV_DIV4 = 1 << F_GCR_PCLKDIV_CNNCLKDIV_POS
export const V_GCR_PCLKDIV_CNNCLKDIV_DIV8 = 2
export const S_GCR_PCLKDIV_CNNCLKDIV_DIV8 = 2 << F_GCR_PCLKDIV_CNNCLKDIV_POS
export const V_GCR_PCLKDIV_CNNCLKDIV_DIV16 = 3
export const S_GCR_PCLKDIV_CNNCLKDIV_DIV16 = 3 << F_GCR_PCLKDIV_CNNCLKDIV_POS
export const V_GCR_PCLKDIV_CNNCLKDIV_DIV1 = 4
export const S_GCR_PCLKDIV_CNNCLKDIV_DIV1 = 4 << F_GCR_PCLKDIV_CNNCLKDIV_POS
/**
CNN Clock Select.*/
export const F_GCR_PCLKDIV_CNNCLKSEL_POS = 17
export const F_GCR_PCLKDIV_CNNCLKSEL = 0x1 << F_GCR_PCLKDIV_CNNCLKSEL_POS
export const V_GCR_PCLKDIV_CNNCLKSEL_SYSTEM = 0
export const S_GCR_PCLKDIV_CNNCLKSEL_SYSTEM = 0 << F_GCR_PCLKDIV_CNNCLKSEL_POS
export const V_GCR_PCLKDIV_CNNCLKSEL_IBRO60 = 1
export const S_GCR_PCLKDIV_CNNCLKSEL_IBRO60 = 1 << F_GCR_PCLKDIV_CNNCLKSEL_POS

// -------- REGISTER PCLKDIS0 -------- //

/**
Peripheral Clock Disable.*/
/**
GPIO0 Clock Disable.*/
export const F_GCR_PCLKDIS0_GPIO0_POS = 0
export const F_GCR_PCLKDIS0_GPIO0 = 0x1 << F_GCR_PCLKDIS0_GPIO0_POS
export const V_GCR_PCLKDIS0_GPIO0_EN = 0
export const S_GCR_PCLKDIS0_GPIO0_EN = 0 << F_GCR_PCLKDIS0_GPIO0_POS
export const V_GCR_PCLKDIS0_GPIO0_DIS = 1
export const S_GCR_PCLKDIS0_GPIO0_DIS = 1 << F_GCR_PCLKDIS0_GPIO0_POS
/**
GPIO1 Clock Disable.*/
export const F_GCR_PCLKDIS0_GPIO1_POS = 1
export const F_GCR_PCLKDIS0_GPIO1 = 0x1 << F_GCR_PCLKDIS0_GPIO1_POS
/**
DMA Clock Disable.*/
export const F_GCR_PCLKDIS0_DMA_POS = 5
export const F_GCR_PCLKDIS0_DMA = 0x1 << F_GCR_PCLKDIS0_DMA_POS
/**
SPI 1 Clock Disable.*/
export const F_GCR_PCLKDIS0_SPI1_POS = 6
export const F_GCR_PCLKDIS0_SPI1 = 0x1 << F_GCR_PCLKDIS0_SPI1_POS
/**
UART 0 Clock Disable.*/
export const F_GCR_PCLKDIS0_UART0_POS = 9
export const F_GCR_PCLKDIS0_UART0 = 0x1 << F_GCR_PCLKDIS0_UART0_POS
/**
UART 1 Clock Disable.*/
export const F_GCR_PCLKDIS0_UART1_POS = 10
export const F_GCR_PCLKDIS0_UART1 = 0x1 << F_GCR_PCLKDIS0_UART1_POS
/**
I2C 0 Clock Disable.*/
export const F_GCR_PCLKDIS0_I2C0_POS = 13
export const F_GCR_PCLKDIS0_I2C0 = 0x1 << F_GCR_PCLKDIS0_I2C0_POS
/**
Timer 0 Clock Disable.*/
export const F_GCR_PCLKDIS0_TMR0_POS = 15
export const F_GCR_PCLKDIS0_TMR0 = 0x1 << F_GCR_PCLKDIS0_TMR0_POS
/**
Timer 1 Clock Disable.*/
export const F_GCR_PCLKDIS0_TMR1_POS = 16
export const F_GCR_PCLKDIS0_TMR1 = 0x1 << F_GCR_PCLKDIS0_TMR1_POS
/**
Timer 2 Clock Disable.*/
export const F_GCR_PCLKDIS0_TMR2_POS = 17
export const F_GCR_PCLKDIS0_TMR2 = 0x1 << F_GCR_PCLKDIS0_TMR2_POS
/**
Timer 3 Clock Disable.*/
export const F_GCR_PCLKDIS0_TMR3_POS = 18
export const F_GCR_PCLKDIS0_TMR3 = 0x1 << F_GCR_PCLKDIS0_TMR3_POS
/**
ADC Clock Disable.*/
export const F_GCR_PCLKDIS0_ADC_POS = 23
export const F_GCR_PCLKDIS0_ADC = 0x1 << F_GCR_PCLKDIS0_ADC_POS
/**
CNN Clock Disable.*/
export const F_GCR_PCLKDIS0_CNN_POS = 25
export const F_GCR_PCLKDIS0_CNN = 0x1 << F_GCR_PCLKDIS0_CNN_POS
/**
I2C 1 Clock Disable.*/
export const F_GCR_PCLKDIS0_I2C1_POS = 28
export const F_GCR_PCLKDIS0_I2C1 = 0x1 << F_GCR_PCLKDIS0_I2C1_POS
/**
Pluse Train Clock Disable.*/
export const F_GCR_PCLKDIS0_PT_POS = 29
export const F_GCR_PCLKDIS0_PT = 0x1 << F_GCR_PCLKDIS0_PT_POS

// -------- REGISTER MEMCTRL -------- //

/**
Memory Clock Control Register.*/
/**
Flash Wait State. These bits define the number of wait-state cycles per Flash data read access. Minimum wait state is 2.*/
export const F_GCR_MEMCTRL_FWS_POS = 0
export const F_GCR_MEMCTRL_FWS = 0x7 << F_GCR_MEMCTRL_FWS_POS
/**
SYSRAM0 ECC Select.*/
export const F_GCR_MEMCTRL_SYSRAM0ECC_POS = 16
export const F_GCR_MEMCTRL_SYSRAM0ECC = 0x1 << F_GCR_MEMCTRL_SYSRAM0ECC_POS

// -------- REGISTER MEMZ -------- //

/**
Memory Zeroize Control.*/
/**
System RAM Block 0 Zeroization.*/
export const F_GCR_MEMZ_RAM0_POS = 0
export const F_GCR_MEMZ_RAM0 = 0x1 << F_GCR_MEMZ_RAM0_POS
export const V_GCR_MEMZ_RAM0_NOP = 0
export const S_GCR_MEMZ_RAM0_NOP = 0 << F_GCR_MEMZ_RAM0_POS
export const V_GCR_MEMZ_RAM0_START = 1
export const S_GCR_MEMZ_RAM0_START = 1 << F_GCR_MEMZ_RAM0_POS
/**
System RAM Block 1 Zeroization.*/
export const F_GCR_MEMZ_RAM1_POS = 1
export const F_GCR_MEMZ_RAM1 = 0x1 << F_GCR_MEMZ_RAM1_POS
/**
System RAM Block 2 Zeroization.*/
export const F_GCR_MEMZ_RAM2_POS = 2
export const F_GCR_MEMZ_RAM2 = 0x1 << F_GCR_MEMZ_RAM2_POS
/**
System RAM Block 3 Zeroization.*/
export const F_GCR_MEMZ_RAM3_POS = 3
export const F_GCR_MEMZ_RAM3 = 0x1 << F_GCR_MEMZ_RAM3_POS
/**
System RAM 0 ECC Zeroization.*/
export const F_GCR_MEMZ_SYSRAM0ECC_POS = 4
export const F_GCR_MEMZ_SYSRAM0ECC = 0x1 << F_GCR_MEMZ_SYSRAM0ECC_POS
/**
Instruction Cachei 0 Zeroization.*/
export const F_GCR_MEMZ_ICC0_POS = 5
export const F_GCR_MEMZ_ICC0 = 0x1 << F_GCR_MEMZ_ICC0_POS
/**
Instruction Cachei 1 Zeroization.*/
export const F_GCR_MEMZ_ICC1_POS = 6
export const F_GCR_MEMZ_ICC1 = 0x1 << F_GCR_MEMZ_ICC1_POS

// -------- REGISTER SYSST -------- //

/**
System Status Register.*/
/**
ARM ICE Lock Status.*/
export const F_GCR_SYSST_ICELOCK_POS = 0
export const F_GCR_SYSST_ICELOCK = 0x1 << F_GCR_SYSST_ICELOCK_POS
export const V_GCR_SYSST_ICELOCK_UNLOCKED = 0
export const S_GCR_SYSST_ICELOCK_UNLOCKED = 0 << F_GCR_SYSST_ICELOCK_POS
export const V_GCR_SYSST_ICELOCK_LOCKED = 1
export const S_GCR_SYSST_ICELOCK_LOCKED = 1 << F_GCR_SYSST_ICELOCK_POS

// -------- REGISTER RST1 -------- //

/**
Reset 1.*/
/**
I2C1 Reset.*/
export const F_GCR_RST1_I2C1_POS = 0
export const F_GCR_RST1_I2C1 = 0x1 << F_GCR_RST1_I2C1_POS
export const V_GCR_RST1_I2C1_RESET_DONE = 0
export const S_GCR_RST1_I2C1_RESET_DONE = 0 << F_GCR_RST1_I2C1_POS
export const V_GCR_RST1_I2C1_BUSY = 1
export const S_GCR_RST1_I2C1_BUSY = 1 << F_GCR_RST1_I2C1_POS
/**
PT Reset.*/
export const F_GCR_RST1_PT_POS = 1
export const F_GCR_RST1_PT = 0x1 << F_GCR_RST1_PT_POS
/**
OWM Reset.*/
export const F_GCR_RST1_OWM_POS = 7
export const F_GCR_RST1_OWM = 0x1 << F_GCR_RST1_OWM_POS
/**
CRC Reset.*/
export const F_GCR_RST1_CRC_POS = 9
export const F_GCR_RST1_CRC = 0x1 << F_GCR_RST1_CRC_POS
/**
AES Reset.*/
export const F_GCR_RST1_AES_POS = 10
export const F_GCR_RST1_AES = 0x1 << F_GCR_RST1_AES_POS
/**
SPI 0 Reset.*/
export const F_GCR_RST1_SPI0_POS = 11
export const F_GCR_RST1_SPI0 = 0x1 << F_GCR_RST1_SPI0_POS
/**
SMPHR Reset.*/
export const F_GCR_RST1_SMPHR_POS = 16
export const F_GCR_RST1_SMPHR = 0x1 << F_GCR_RST1_SMPHR_POS
/**
I2S Reset.*/
export const F_GCR_RST1_I2S_POS = 19
export const F_GCR_RST1_I2S = 0x1 << F_GCR_RST1_I2S_POS
/**
I2C2 Reset.*/
export const F_GCR_RST1_I2C2_POS = 20
export const F_GCR_RST1_I2C2 = 0x1 << F_GCR_RST1_I2C2_POS
/**
DVS Reset.*/
export const F_GCR_RST1_DVS_POS = 24
export const F_GCR_RST1_DVS = 0x1 << F_GCR_RST1_DVS_POS
/**
SIMO Reset.*/
export const F_GCR_RST1_SIMO_POS = 25
export const F_GCR_RST1_SIMO = 0x1 << F_GCR_RST1_SIMO_POS
/**
CPU1 Reset.*/
export const F_GCR_RST1_CPU1_POS = 31
export const F_GCR_RST1_CPU1 = 0x1 << F_GCR_RST1_CPU1_POS

// -------- REGISTER PCLKDIS1 -------- //

/**
Peripheral Clock Disable.*/
/**
Bluetooth Clock Disable.*/
export const F_GCR_PCLKDIS1_BTLE_POS = 0
export const F_GCR_PCLKDIS1_BTLE = 0x1 << F_GCR_PCLKDIS1_BTLE_POS
/**
UART2 Clock Disable.*/
export const F_GCR_PCLKDIS1_UART2_POS = 1
export const F_GCR_PCLKDIS1_UART2 = 0x1 << F_GCR_PCLKDIS1_UART2_POS
export const V_GCR_PCLKDIS1_UART2_EN = 0
export const S_GCR_PCLKDIS1_UART2_EN = 0 << F_GCR_PCLKDIS1_UART2_POS
export const V_GCR_PCLKDIS1_UART2_DIS = 1
export const S_GCR_PCLKDIS1_UART2_DIS = 1 << F_GCR_PCLKDIS1_UART2_POS
/**
TRNG Clock Disable.*/
export const F_GCR_PCLKDIS1_TRNG_POS = 2
export const F_GCR_PCLKDIS1_TRNG = 0x1 << F_GCR_PCLKDIS1_TRNG_POS
/**
SMPHR Clock Disable.*/
export const F_GCR_PCLKDIS1_SMPHR_POS = 9
export const F_GCR_PCLKDIS1_SMPHR = 0x1 << F_GCR_PCLKDIS1_SMPHR_POS
/**
One-Wire Clock Disable.*/
export const F_GCR_PCLKDIS1_OWM_POS = 13
export const F_GCR_PCLKDIS1_OWM = 0x1 << F_GCR_PCLKDIS1_OWM_POS
/**
CRC Clock Disable.*/
export const F_GCR_PCLKDIS1_CRC_POS = 14
export const F_GCR_PCLKDIS1_CRC = 0x1 << F_GCR_PCLKDIS1_CRC_POS
/**
AES Clock Disable.*/
export const F_GCR_PCLKDIS1_AES_POS = 15
export const F_GCR_PCLKDIS1_AES = 0x1 << F_GCR_PCLKDIS1_AES_POS
/**
SPI 0 Clock Disable.*/
export const F_GCR_PCLKDIS1_SPI0_POS = 16
export const F_GCR_PCLKDIS1_SPI0 = 0x1 << F_GCR_PCLKDIS1_SPI0_POS
/**
Parallel Camera Interface Clock Disable.*/
export const F_GCR_PCLKDIS1_PCIF_POS = 18
export const F_GCR_PCLKDIS1_PCIF = 0x1 << F_GCR_PCLKDIS1_PCIF_POS
/**
I2S Clock Disable.*/
export const F_GCR_PCLKDIS1_I2S_POS = 23
export const F_GCR_PCLKDIS1_I2S = 0x1 << F_GCR_PCLKDIS1_I2S_POS
/**
I2C2 Clock Disable.*/
export const F_GCR_PCLKDIS1_I2C2_POS = 24
export const F_GCR_PCLKDIS1_I2C2 = 0x1 << F_GCR_PCLKDIS1_I2C2_POS
/**
Watch Dog Timer 0 Clock Disable.*/
export const F_GCR_PCLKDIS1_WDT0_POS = 27
export const F_GCR_PCLKDIS1_WDT0 = 0x1 << F_GCR_PCLKDIS1_WDT0_POS
/**
CPU1 Clock Disable.*/
export const F_GCR_PCLKDIS1_CPU1_POS = 31
export const F_GCR_PCLKDIS1_CPU1 = 0x1 << F_GCR_PCLKDIS1_CPU1_POS

// -------- REGISTER EVENTEN -------- //

/**
Event Enable Register.*/
/**
Enable DMA event. When this bit is set, a DMA event will cause an RXEV event to wake the CPU from WFE sleep mode.*/
export const F_GCR_EVENTEN_DMA_POS = 0
export const F_GCR_EVENTEN_DMA = 0x1 << F_GCR_EVENTEN_DMA_POS
/**
Enable RXEV pin event. When this bit is set, a logic high of GPIO1.8 will cause an RXEV event to wake the CPU from WFE sleep mode.*/
export const F_GCR_EVENTEN_RX_POS = 1
export const F_GCR_EVENTEN_RX = 0x1 << F_GCR_EVENTEN_RX_POS
/**
Enable TXEV pin event. When this bit is set, TXEV event from the CPU is output to GPIO1.9.*/
export const F_GCR_EVENTEN_TX_POS = 2
export const F_GCR_EVENTEN_TX = 0x1 << F_GCR_EVENTEN_TX_POS

// -------- REGISTER REVISION -------- //

/**
Revision Register.*/
/**
Manufacturer Chip Revision.*/
export const F_GCR_REVISION_REVISION_POS = 0
export const F_GCR_REVISION_REVISION = 0xffff << F_GCR_REVISION_REVISION_POS

// -------- REGISTER SYSIE -------- //

/**
System Status Interrupt Enable Register.*/
/**
ARM ICE Unlock Interrupt Enable.*/
export const F_GCR_SYSIE_ICEUNLOCK_POS = 0
export const F_GCR_SYSIE_ICEUNLOCK = 0x1 << F_GCR_SYSIE_ICEUNLOCK_POS
export const V_GCR_SYSIE_ICEUNLOCK_DIS = 0
export const S_GCR_SYSIE_ICEUNLOCK_DIS = 0 << F_GCR_SYSIE_ICEUNLOCK_POS
export const V_GCR_SYSIE_ICEUNLOCK_EN = 1
export const S_GCR_SYSIE_ICEUNLOCK_EN = 1 << F_GCR_SYSIE_ICEUNLOCK_POS

// -------- REGISTER ECCERR -------- //

/**
ECC Error Register*/
/**
ECC System RAM0 Error Flag. Write 1 to clear.*/
export const F_GCR_ECCERR_RAM_POS = 0
export const F_GCR_ECCERR_RAM = 0x1 << F_GCR_ECCERR_RAM_POS

// -------- REGISTER ECCCED -------- //

/**
ECC Not Double Error Detect Register*/
/**
ECC System RAM0 Error Flag. Write 1 to clear.*/
export const F_GCR_ECCCED_RAM_POS = 0
export const F_GCR_ECCCED_RAM = 0x1 << F_GCR_ECCCED_RAM_POS

// -------- REGISTER ECCIE -------- //

/**
ECC IRQ Enable Register*/
/**
ECC System RAM0 Error Interrup Enable*/
export const F_GCR_ECCIE_RAM_POS = 0
export const F_GCR_ECCIE_RAM = 0x1 << F_GCR_ECCIE_RAM_POS

// -------- REGISTER ECCADDR -------- //

/**
ECC Error Address Register*/
/**
ECC Error Address.*/
export const F_GCR_ECCADDR_ECCERRAD_POS = 0
export const F_GCR_ECCADDR_ECCERRAD = 0xffffffff << F_GCR_ECCADDR_ECCERRAD_POS

// -------- REGISTER BTLELDOCTRL -------- //

/**
BTLE LDO Control Register*/
/**
LDOTX Enable.*/
export const F_GCR_BTLELDOCTRL_LDOTXEN_POS = 0
export const F_GCR_BTLELDOCTRL_LDOTXEN = 0x1 << F_GCR_BTLELDOCTRL_LDOTXEN_POS
/**
LDOTX Pull Down.*/
export const F_GCR_BTLELDOCTRL_LDOTXPULLD_POS = 1
export const F_GCR_BTLELDOCTRL_LDOTXPULLD = 0x1 << F_GCR_BTLELDOCTRL_LDOTXPULLD_POS
/**
LDOTX Voltage Setting.*/
export const F_GCR_BTLELDOCTRL_LDOTXVSEL_POS = 2
export const F_GCR_BTLELDOCTRL_LDOTXVSEL = 0x3 << F_GCR_BTLELDOCTRL_LDOTXVSEL_POS
export const V_GCR_BTLELDOCTRL_LDOTXVSEL_0_7 = 0
export const S_GCR_BTLELDOCTRL_LDOTXVSEL_0_7 = 0 << F_GCR_BTLELDOCTRL_LDOTXVSEL_POS
export const V_GCR_BTLELDOCTRL_LDOTXVSEL_0_85 = 1
export const S_GCR_BTLELDOCTRL_LDOTXVSEL_0_85 = 1 << F_GCR_BTLELDOCTRL_LDOTXVSEL_POS
export const V_GCR_BTLELDOCTRL_LDOTXVSEL_0_9 = 2
export const S_GCR_BTLELDOCTRL_LDOTXVSEL_0_9 = 2 << F_GCR_BTLELDOCTRL_LDOTXVSEL_POS
export const V_GCR_BTLELDOCTRL_LDOTXVSEL_1_1 = 3
export const S_GCR_BTLELDOCTRL_LDOTXVSEL_1_1 = 3 << F_GCR_BTLELDOCTRL_LDOTXVSEL_POS
/**
LDORX Enable.*/
export const F_GCR_BTLELDOCTRL_LDORXEN_POS = 4
export const F_GCR_BTLELDOCTRL_LDORXEN = 0x1 << F_GCR_BTLELDOCTRL_LDORXEN_POS
/**
LDOrX Pull Down.*/
export const F_GCR_BTLELDOCTRL_LDORXPULLD_POS = 5
export const F_GCR_BTLELDOCTRL_LDORXPULLD = 0x1 << F_GCR_BTLELDOCTRL_LDORXPULLD_POS
/**
LDORX Voltage Setting.*/
export const F_GCR_BTLELDOCTRL_LDORXVSEL_POS = 6
export const F_GCR_BTLELDOCTRL_LDORXVSEL = 0x3 << F_GCR_BTLELDOCTRL_LDORXVSEL_POS
export const V_GCR_BTLELDOCTRL_LDORXVSEL_0_7 = 0
export const S_GCR_BTLELDOCTRL_LDORXVSEL_0_7 = 0 << F_GCR_BTLELDOCTRL_LDORXVSEL_POS
export const V_GCR_BTLELDOCTRL_LDORXVSEL_0_85 = 1
export const S_GCR_BTLELDOCTRL_LDORXVSEL_0_85 = 1 << F_GCR_BTLELDOCTRL_LDORXVSEL_POS
export const V_GCR_BTLELDOCTRL_LDORXVSEL_0_9 = 2
export const S_GCR_BTLELDOCTRL_LDORXVSEL_0_9 = 2 << F_GCR_BTLELDOCTRL_LDORXVSEL_POS
export const V_GCR_BTLELDOCTRL_LDORXVSEL_1_1 = 3
export const S_GCR_BTLELDOCTRL_LDORXVSEL_1_1 = 3 << F_GCR_BTLELDOCTRL_LDORXVSEL_POS
/**
LDORX Bypass Enable.*/
export const F_GCR_BTLELDOCTRL_LDORXBYP_POS = 8
export const F_GCR_BTLELDOCTRL_LDORXBYP = 0x1 << F_GCR_BTLELDOCTRL_LDORXBYP_POS
/**
LDORX Discharge.*/
export const F_GCR_BTLELDOCTRL_LDORXDISCH_POS = 9
export const F_GCR_BTLELDOCTRL_LDORXDISCH = 0x1 << F_GCR_BTLELDOCTRL_LDORXDISCH_POS
/**
LDOTX Bypass Enable.*/
export const F_GCR_BTLELDOCTRL_LDOTXBYP_POS = 10
export const F_GCR_BTLELDOCTRL_LDOTXBYP = 0x1 << F_GCR_BTLELDOCTRL_LDOTXBYP_POS
/**
LDOTX Discharge.*/
export const F_GCR_BTLELDOCTRL_LDOTXDISCH_POS = 11
export const F_GCR_BTLELDOCTRL_LDOTXDISCH = 0x1 << F_GCR_BTLELDOCTRL_LDOTXDISCH_POS
/**
LDOTX Enable Delay.*/
export const F_GCR_BTLELDOCTRL_LDOTXENDLY_POS = 12
export const F_GCR_BTLELDOCTRL_LDOTXENDLY = 0x1 << F_GCR_BTLELDOCTRL_LDOTXENDLY_POS
/**
LDORX Enable Delay.*/
export const F_GCR_BTLELDOCTRL_LDORXENDLY_POS = 13
export const F_GCR_BTLELDOCTRL_LDORXENDLY = 0x1 << F_GCR_BTLELDOCTRL_LDORXENDLY_POS
/**
LDORX Bypass Enable Delay.*/
export const F_GCR_BTLELDOCTRL_LDORXBYPENENDLY_POS = 14
export const F_GCR_BTLELDOCTRL_LDORXBYPENENDLY = 0x1 << F_GCR_BTLELDOCTRL_LDORXBYPENENDLY_POS
/**
LDOTX Bypass Enable Delay.*/
export const F_GCR_BTLELDOCTRL_LDOTXBYPENENDLY_POS = 15
export const F_GCR_BTLELDOCTRL_LDOTXBYPENENDLY = 0x1 << F_GCR_BTLELDOCTRL_LDOTXBYPENENDLY_POS

// -------- REGISTER BTLELDODLY -------- //

/**
BTLE LDO Delay Register*/
/**
Bypass Delay Count.*/
export const F_GCR_BTLELDODLY_BYPDLYCNT_POS = 0
export const F_GCR_BTLELDODLY_BYPDLYCNT = 0xff << F_GCR_BTLELDODLY_BYPDLYCNT_POS
/**
LDORX Delay Count.*/
export const F_GCR_BTLELDODLY_LDORXDLYCNT_POS = 8
export const F_GCR_BTLELDODLY_LDORXDLYCNT = 0x1ff << F_GCR_BTLELDODLY_LDORXDLYCNT_POS
/**
LDOTX Delay Count.*/
export const F_GCR_BTLELDODLY_LDOTXDLYCNT_POS = 20
export const F_GCR_BTLELDODLY_LDOTXDLYCNT = 0x1ff << F_GCR_BTLELDODLY_LDOTXDLYCNT_POS

// -------- REGISTER GPR -------- //

/**
General Purpose Register.*/

// -------- PERIPHERAL GPIO -------- //

export interface GPIO_t {
    EN0: $Reg
    EN0_SET: $Reg
    EN0_CLR: $Reg
    OUTEN: $Reg
    OUTEN_SET: $Reg
    OUTEN_CLR: $Reg
    OUT: $Reg
    OUT_SET: $Reg
    OUT_CLR: $Reg
    IN: $Reg
    INTMODE: $Reg
    INTPOL: $Reg
    INEN: $Reg
    INTEN: $Reg
    INTEN_SET: $Reg
    INTEN_CLR: $Reg
    INTFL: $Reg
    INTFL_CLR: $Reg
    WKEN: $Reg
    WKEN_SET: $Reg
    WKEN_CLR: $Reg
    DUALEDGE: $Reg
    PADCTRL0: $Reg
    PADCTRL1: $Reg
    EN1: $Reg
    EN1_SET: $Reg
    EN1_CLR: $Reg
    EN2: $Reg
    EN2_SET: $Reg
    EN2_CLR: $Reg
    HYSEN: $Reg
    SRSEL: $Reg
    DS0: $Reg
    DS1: $Reg
    PS: $Reg
    VSSEL: $Reg
}

// -------- REGISTER EN0 -------- //

/**
GPIO Function Enable Register. Each bit controls the GPIO_EN setting for one GPIO pin on the associated port.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_EN0_GPIO_EN_POS = 0
export const F_GPIO_EN0_GPIO_EN = 0xffffffff << F_GPIO_EN0_GPIO_EN_POS
export const V_GPIO_EN0_GPIO_EN_ALTERNATE = 0
export const S_GPIO_EN0_GPIO_EN_ALTERNATE = 0 << F_GPIO_EN0_GPIO_EN_POS
export const V_GPIO_EN0_GPIO_EN_GPIO = 1
export const S_GPIO_EN0_GPIO_EN_GPIO = 1 << F_GPIO_EN0_GPIO_EN_POS

// -------- REGISTER EN0_SET -------- //

/**
GPIO Set Function Enable Register. Writing a 1 to one or more bits in this register sets the bits in the same positions in GPIO_EN to 1, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_EN0_SET_ALL_POS = 0
export const F_GPIO_EN0_SET_ALL = 0xffffffff << F_GPIO_EN0_SET_ALL_POS

// -------- REGISTER EN0_CLR -------- //

/**
GPIO Clear Function Enable Register. Writing a 1 to one or more bits in this register clears the bits in the same positions in GPIO_EN to 0, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_EN0_CLR_ALL_POS = 0
export const F_GPIO_EN0_CLR_ALL = 0xffffffff << F_GPIO_EN0_CLR_ALL_POS

// -------- REGISTER OUTEN -------- //

/**
GPIO Output Enable Register. Each bit controls the GPIO_OUT_EN setting for one GPIO pin in the associated port.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_OUTEN_EN_POS = 0
export const F_GPIO_OUTEN_EN = 0xffffffff << F_GPIO_OUTEN_EN_POS
export const V_GPIO_OUTEN_EN_DIS = 0
export const S_GPIO_OUTEN_EN_DIS = 0 << F_GPIO_OUTEN_EN_POS
export const V_GPIO_OUTEN_EN_EN = 1
export const S_GPIO_OUTEN_EN_EN = 1 << F_GPIO_OUTEN_EN_POS

// -------- REGISTER OUTEN_SET -------- //

/**
GPIO Output Enable Set Function Enable Register. Writing a 1 to one or more bits in this register sets the bits in the same positions in GPIO_OUT_EN to 1, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_OUTEN_SET_ALL_POS = 0
export const F_GPIO_OUTEN_SET_ALL = 0xffffffff << F_GPIO_OUTEN_SET_ALL_POS

// -------- REGISTER OUTEN_CLR -------- //

/**
GPIO Output Enable Clear Function Enable Register. Writing a 1 to one or more bits in this register clears the bits in the same positions in GPIO_OUT_EN to 0, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_OUTEN_CLR_ALL_POS = 0
export const F_GPIO_OUTEN_CLR_ALL = 0xffffffff << F_GPIO_OUTEN_CLR_ALL_POS

// -------- REGISTER OUT -------- //

/**
GPIO Output Register. Each bit controls the GPIO_OUT setting for one pin in the associated port.  This register can be written either directly, or by using the GPIO_OUT_SET and GPIO_OUT_CLR registers.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_OUT_GPIO_OUT_POS = 0
export const F_GPIO_OUT_GPIO_OUT = 0xffffffff << F_GPIO_OUT_GPIO_OUT_POS
export const V_GPIO_OUT_GPIO_OUT_LOW = 0
export const S_GPIO_OUT_GPIO_OUT_LOW = 0 << F_GPIO_OUT_GPIO_OUT_POS
export const V_GPIO_OUT_GPIO_OUT_HIGH = 1
export const S_GPIO_OUT_GPIO_OUT_HIGH = 1 << F_GPIO_OUT_GPIO_OUT_POS

// -------- REGISTER OUT_SET -------- //

/**
GPIO Output Set. Writing a 1 to one or more bits in this register sets the bits in the same positions in GPIO_OUT to 1, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_OUT_SET_GPIO_OUT_SET_POS = 0
export const F_GPIO_OUT_SET_GPIO_OUT_SET = 0xffffffff << F_GPIO_OUT_SET_GPIO_OUT_SET_POS
export const V_GPIO_OUT_SET_GPIO_OUT_SET_NO = 0
export const S_GPIO_OUT_SET_GPIO_OUT_SET_NO = 0 << F_GPIO_OUT_SET_GPIO_OUT_SET_POS
export const V_GPIO_OUT_SET_GPIO_OUT_SET_SET = 1
export const S_GPIO_OUT_SET_GPIO_OUT_SET_SET = 1 << F_GPIO_OUT_SET_GPIO_OUT_SET_POS

// -------- REGISTER OUT_CLR -------- //

/**
GPIO Output Clear. Writing a 1 to one or more bits in this register clears the bits in the same positions in GPIO_OUT to 0, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_OUT_CLR_GPIO_OUT_CLR_POS = 0
export const F_GPIO_OUT_CLR_GPIO_OUT_CLR = 0xffffffff << F_GPIO_OUT_CLR_GPIO_OUT_CLR_POS

// -------- REGISTER IN -------- //

/**
GPIO Input Register. Read-only register to read from the logic states of the GPIO pins on this port.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_IN_GPIO_IN_POS = 0
export const F_GPIO_IN_GPIO_IN = 0xffffffff << F_GPIO_IN_GPIO_IN_POS

// -------- REGISTER INTMODE -------- //

/**
GPIO Interrupt Mode Register. Each bit in this register controls the interrupt mode setting for the associated GPIO pin on this port.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_INTMODE_GPIO_INTMODE_POS = 0
export const F_GPIO_INTMODE_GPIO_INTMODE = 0xffffffff << F_GPIO_INTMODE_GPIO_INTMODE_POS
export const V_GPIO_INTMODE_GPIO_INTMODE_LEVEL = 0
export const S_GPIO_INTMODE_GPIO_INTMODE_LEVEL = 0 << F_GPIO_INTMODE_GPIO_INTMODE_POS
export const V_GPIO_INTMODE_GPIO_INTMODE_EDGE = 1
export const S_GPIO_INTMODE_GPIO_INTMODE_EDGE = 1 << F_GPIO_INTMODE_GPIO_INTMODE_POS

// -------- REGISTER INTPOL -------- //

/**
GPIO Interrupt Polarity Register. Each bit in this register controls the interrupt polarity setting for one GPIO pin in the associated port.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_INTPOL_GPIO_INTPOL_POS = 0
export const F_GPIO_INTPOL_GPIO_INTPOL = 0xffffffff << F_GPIO_INTPOL_GPIO_INTPOL_POS
export const V_GPIO_INTPOL_GPIO_INTPOL_FALLING = 0
export const S_GPIO_INTPOL_GPIO_INTPOL_FALLING = 0 << F_GPIO_INTPOL_GPIO_INTPOL_POS
export const V_GPIO_INTPOL_GPIO_INTPOL_RISING = 1
export const S_GPIO_INTPOL_GPIO_INTPOL_RISING = 1 << F_GPIO_INTPOL_GPIO_INTPOL_POS

// -------- REGISTER INEN -------- //

/**
GPIO Input Enable*/

// -------- REGISTER INTEN -------- //

/**
GPIO Interrupt Enable Register. Each bit in this register controls the GPIO interrupt enable for the associated pin on the GPIO port.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_INTEN_GPIO_INTEN_POS = 0
export const F_GPIO_INTEN_GPIO_INTEN = 0xffffffff << F_GPIO_INTEN_GPIO_INTEN_POS
export const V_GPIO_INTEN_GPIO_INTEN_DIS = 0
export const S_GPIO_INTEN_GPIO_INTEN_DIS = 0 << F_GPIO_INTEN_GPIO_INTEN_POS
export const V_GPIO_INTEN_GPIO_INTEN_EN = 1
export const S_GPIO_INTEN_GPIO_INTEN_EN = 1 << F_GPIO_INTEN_GPIO_INTEN_POS

// -------- REGISTER INTEN_SET -------- //

/**
GPIO Interrupt Enable Set. Writing a 1 to one or more bits in this register sets the bits in the same positions in GPIO_INT_EN to 1, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_INTEN_SET_GPIO_INTEN_SET_POS = 0
export const F_GPIO_INTEN_SET_GPIO_INTEN_SET = 0xffffffff << F_GPIO_INTEN_SET_GPIO_INTEN_SET_POS
export const V_GPIO_INTEN_SET_GPIO_INTEN_SET_NO = 0
export const S_GPIO_INTEN_SET_GPIO_INTEN_SET_NO = 0 << F_GPIO_INTEN_SET_GPIO_INTEN_SET_POS
export const V_GPIO_INTEN_SET_GPIO_INTEN_SET_SET = 1
export const S_GPIO_INTEN_SET_GPIO_INTEN_SET_SET = 1 << F_GPIO_INTEN_SET_GPIO_INTEN_SET_POS

// -------- REGISTER INTEN_CLR -------- //

/**
GPIO Interrupt Enable Clear. Writing a 1 to one or more bits in this register clears the bits in the same positions in GPIO_INT_EN to 0, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_INTEN_CLR_GPIO_INTEN_CLR_POS = 0
export const F_GPIO_INTEN_CLR_GPIO_INTEN_CLR = 0xffffffff << F_GPIO_INTEN_CLR_GPIO_INTEN_CLR_POS
export const V_GPIO_INTEN_CLR_GPIO_INTEN_CLR_NO = 0
export const S_GPIO_INTEN_CLR_GPIO_INTEN_CLR_NO = 0 << F_GPIO_INTEN_CLR_GPIO_INTEN_CLR_POS
export const V_GPIO_INTEN_CLR_GPIO_INTEN_CLR_CLEAR = 1
export const S_GPIO_INTEN_CLR_GPIO_INTEN_CLR_CLEAR = 1 << F_GPIO_INTEN_CLR_GPIO_INTEN_CLR_POS

// -------- REGISTER INTFL -------- //

/**
GPIO Interrupt Status Register. Each bit in this register contains the pending interrupt status for the associated GPIO pin in this port.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_INTFL_GPIO_INTFL_POS = 0
export const F_GPIO_INTFL_GPIO_INTFL = 0xffffffff << F_GPIO_INTFL_GPIO_INTFL_POS
export const V_GPIO_INTFL_GPIO_INTFL_NO = 0
export const S_GPIO_INTFL_GPIO_INTFL_NO = 0 << F_GPIO_INTFL_GPIO_INTFL_POS
export const V_GPIO_INTFL_GPIO_INTFL_PENDING = 1
export const S_GPIO_INTFL_GPIO_INTFL_PENDING = 1 << F_GPIO_INTFL_GPIO_INTFL_POS

// -------- REGISTER INTFL_CLR -------- //

/**
GPIO Status Clear. Writing a 1 to one or more bits in this register clears the bits in the same positions in GPIO_INT_STAT to 0, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_INTFL_CLR_ALL_POS = 0
export const F_GPIO_INTFL_CLR_ALL = 0xffffffff << F_GPIO_INTFL_CLR_ALL_POS

// -------- REGISTER WKEN -------- //

/**
GPIO Wake Enable Register. Each bit in this register controls the PMU wakeup enable for the associated GPIO pin in this port.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_WKEN_GPIO_WKEN_POS = 0
export const F_GPIO_WKEN_GPIO_WKEN = 0xffffffff << F_GPIO_WKEN_GPIO_WKEN_POS
export const V_GPIO_WKEN_GPIO_WKEN_DIS = 0
export const S_GPIO_WKEN_GPIO_WKEN_DIS = 0 << F_GPIO_WKEN_GPIO_WKEN_POS
export const V_GPIO_WKEN_GPIO_WKEN_EN = 1
export const S_GPIO_WKEN_GPIO_WKEN_EN = 1 << F_GPIO_WKEN_GPIO_WKEN_POS

// -------- REGISTER WKEN_SET -------- //

/**
GPIO Wake Enable Set. Writing a 1 to one or more bits in this register sets the bits in the same positions in GPIO_WAKE_EN to 1, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_WKEN_SET_ALL_POS = 0
export const F_GPIO_WKEN_SET_ALL = 0xffffffff << F_GPIO_WKEN_SET_ALL_POS

// -------- REGISTER WKEN_CLR -------- //

/**
GPIO Wake Enable Clear. Writing a 1 to one or more bits in this register clears the bits in the same positions in GPIO_WAKE_EN to 0, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_WKEN_CLR_ALL_POS = 0
export const F_GPIO_WKEN_CLR_ALL = 0xffffffff << F_GPIO_WKEN_CLR_ALL_POS

// -------- REGISTER DUALEDGE -------- //

/**
GPIO Interrupt Dual Edge Mode Register. Each bit in this register selects dual edge mode for the associated GPIO pin in this port.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_DUALEDGE_GPIO_DUALEDGE_POS = 0
export const F_GPIO_DUALEDGE_GPIO_DUALEDGE = 0xffffffff << F_GPIO_DUALEDGE_GPIO_DUALEDGE_POS
export const V_GPIO_DUALEDGE_GPIO_DUALEDGE_NO = 0
export const S_GPIO_DUALEDGE_GPIO_DUALEDGE_NO = 0 << F_GPIO_DUALEDGE_GPIO_DUALEDGE_POS
export const V_GPIO_DUALEDGE_GPIO_DUALEDGE_EN = 1
export const S_GPIO_DUALEDGE_GPIO_DUALEDGE_EN = 1 << F_GPIO_DUALEDGE_GPIO_DUALEDGE_POS

// -------- REGISTER PADCTRL0 -------- //

/**
GPIO Input Mode Config 1. Each bit in this register enables the weak pull-up for the associated GPIO pin in this port.*/
/**
The two bits in GPIO_PAD_CFG1 and GPIO_PAD_CFG2 for each GPIO pin work together to determine the pad mode when the GPIO is set to input mode.*/
export const F_GPIO_PADCTRL0_GPIO_PADCTRL0_POS = 0
export const F_GPIO_PADCTRL0_GPIO_PADCTRL0 = 0xffffffff << F_GPIO_PADCTRL0_GPIO_PADCTRL0_POS
export const V_GPIO_PADCTRL0_GPIO_PADCTRL0_IMPEDANCE = 0
export const S_GPIO_PADCTRL0_GPIO_PADCTRL0_IMPEDANCE = 0 << F_GPIO_PADCTRL0_GPIO_PADCTRL0_POS
export const V_GPIO_PADCTRL0_GPIO_PADCTRL0_PU = 1
export const S_GPIO_PADCTRL0_GPIO_PADCTRL0_PU = 1 << F_GPIO_PADCTRL0_GPIO_PADCTRL0_POS
export const V_GPIO_PADCTRL0_GPIO_PADCTRL0_PD = 2
export const S_GPIO_PADCTRL0_GPIO_PADCTRL0_PD = 2 << F_GPIO_PADCTRL0_GPIO_PADCTRL0_POS

// -------- REGISTER PADCTRL1 -------- //

/**
GPIO Input Mode Config 2. Each bit in this register enables the weak pull-up for the associated GPIO pin in this port.*/
/**
The two bits in GPIO_PAD_CFG1 and GPIO_PAD_CFG2 for each GPIO pin work together to determine the pad mode when the GPIO is set to input mode.*/
export const F_GPIO_PADCTRL1_GPIO_PADCTRL1_POS = 0
export const F_GPIO_PADCTRL1_GPIO_PADCTRL1 = 0xffffffff << F_GPIO_PADCTRL1_GPIO_PADCTRL1_POS
export const V_GPIO_PADCTRL1_GPIO_PADCTRL1_IMPEDANCE = 0
export const S_GPIO_PADCTRL1_GPIO_PADCTRL1_IMPEDANCE = 0 << F_GPIO_PADCTRL1_GPIO_PADCTRL1_POS
export const V_GPIO_PADCTRL1_GPIO_PADCTRL1_PU = 1
export const S_GPIO_PADCTRL1_GPIO_PADCTRL1_PU = 1 << F_GPIO_PADCTRL1_GPIO_PADCTRL1_POS
export const V_GPIO_PADCTRL1_GPIO_PADCTRL1_PD = 2
export const S_GPIO_PADCTRL1_GPIO_PADCTRL1_PD = 2 << F_GPIO_PADCTRL1_GPIO_PADCTRL1_POS

// -------- REGISTER EN1 -------- //

/**
GPIO Alternate Function Enable Register. Each bit in this register selects between primary/secondary functions for the associated GPIO pin in this port.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_EN1_GPIO_EN1_POS = 0
export const F_GPIO_EN1_GPIO_EN1 = 0xffffffff << F_GPIO_EN1_GPIO_EN1_POS
export const V_GPIO_EN1_GPIO_EN1_PRIMARY = 0
export const S_GPIO_EN1_GPIO_EN1_PRIMARY = 0 << F_GPIO_EN1_GPIO_EN1_POS
export const V_GPIO_EN1_GPIO_EN1_SECONDARY = 1
export const S_GPIO_EN1_GPIO_EN1_SECONDARY = 1 << F_GPIO_EN1_GPIO_EN1_POS

// -------- REGISTER EN1_SET -------- //

/**
GPIO Alternate Function Set. Writing a 1 to one or more bits in this register sets the bits in the same positions in GPIO_EN1 to 1, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_EN1_SET_ALL_POS = 0
export const F_GPIO_EN1_SET_ALL = 0xffffffff << F_GPIO_EN1_SET_ALL_POS

// -------- REGISTER EN1_CLR -------- //

/**
GPIO Alternate Function Clear. Writing a 1 to one or more bits in this register clears the bits in the same positions in GPIO_EN1 to 0, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_EN1_CLR_ALL_POS = 0
export const F_GPIO_EN1_CLR_ALL = 0xffffffff << F_GPIO_EN1_CLR_ALL_POS

// -------- REGISTER EN2 -------- //

/**
GPIO Alternate Function Enable Register. Each bit in this register selects between primary/secondary functions for the associated GPIO pin in this port.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_EN2_GPIO_EN2_POS = 0
export const F_GPIO_EN2_GPIO_EN2 = 0xffffffff << F_GPIO_EN2_GPIO_EN2_POS
export const V_GPIO_EN2_GPIO_EN2_PRIMARY = 0
export const S_GPIO_EN2_GPIO_EN2_PRIMARY = 0 << F_GPIO_EN2_GPIO_EN2_POS
export const V_GPIO_EN2_GPIO_EN2_SECONDARY = 1
export const S_GPIO_EN2_GPIO_EN2_SECONDARY = 1 << F_GPIO_EN2_GPIO_EN2_POS

// -------- REGISTER EN2_SET -------- //

/**
GPIO Alternate Function 2 Set. Writing a 1 to one or more bits in this register sets the bits in the same positions in GPIO_EN2 to 1, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_EN2_SET_ALL_POS = 0
export const F_GPIO_EN2_SET_ALL = 0xffffffff << F_GPIO_EN2_SET_ALL_POS

// -------- REGISTER EN2_CLR -------- //

/**
GPIO Wake Alternate Function Clear. Writing a 1 to one or more bits in this register clears the bits in the same positions in GPIO_EN2 to 0, without affecting other bits in that register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_EN2_CLR_ALL_POS = 0
export const F_GPIO_EN2_CLR_ALL = 0xffffffff << F_GPIO_EN2_CLR_ALL_POS

// -------- REGISTER HYSEN -------- //

/**
GPIO Input Hysteresis Enable.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_HYSEN_GPIO_HYSEN_POS = 0
export const F_GPIO_HYSEN_GPIO_HYSEN = 0xffffffff << F_GPIO_HYSEN_GPIO_HYSEN_POS

// -------- REGISTER SRSEL -------- //

/**
GPIO Slew Rate Enable Register.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_SRSEL_GPIO_SRSEL_POS = 0
export const F_GPIO_SRSEL_GPIO_SRSEL = 0xffffffff << F_GPIO_SRSEL_GPIO_SRSEL_POS
export const V_GPIO_SRSEL_GPIO_SRSEL_FAST = 0
export const S_GPIO_SRSEL_GPIO_SRSEL_FAST = 0 << F_GPIO_SRSEL_GPIO_SRSEL_POS
export const V_GPIO_SRSEL_GPIO_SRSEL_SLOW = 1
export const S_GPIO_SRSEL_GPIO_SRSEL_SLOW = 1 << F_GPIO_SRSEL_GPIO_SRSEL_POS

// -------- REGISTER DS0 -------- //

/**
GPIO Drive Strength  Register. Each bit in this register selects the drive strength for the associated GPIO pin in this port. Refer to the Datasheet for sink/source current of GPIO pins in each mode.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_DS0_GPIO_DS0_POS = 0
export const F_GPIO_DS0_GPIO_DS0 = 0xffffffff << F_GPIO_DS0_GPIO_DS0_POS
export const V_GPIO_DS0_GPIO_DS0_LD = 0
export const S_GPIO_DS0_GPIO_DS0_LD = 0 << F_GPIO_DS0_GPIO_DS0_POS
export const V_GPIO_DS0_GPIO_DS0_HD = 1
export const S_GPIO_DS0_GPIO_DS0_HD = 1 << F_GPIO_DS0_GPIO_DS0_POS

// -------- REGISTER DS1 -------- //

/**
GPIO Drive Strength 1 Register. Each bit in this register selects the drive strength for the associated GPIO pin in this port. Refer to the Datasheet for sink/source current of GPIO pins in each mode.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_DS1_GPIO_DS1_POS = 0
export const F_GPIO_DS1_GPIO_DS1 = 0xffffffff << F_GPIO_DS1_GPIO_DS1_POS

// -------- REGISTER PS -------- //

/**
GPIO Pull Select Mode.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_PS_ALL_POS = 0
export const F_GPIO_PS_ALL = 0xffffffff << F_GPIO_PS_ALL_POS

// -------- REGISTER VSSEL -------- //

/**
GPIO Voltage Select.*/
/**
Mask of all of the pins on the port.*/
export const F_GPIO_VSSEL_ALL_POS = 0
export const F_GPIO_VSSEL_ALL = 0xffffffff << F_GPIO_VSSEL_ALL_POS

// -------- PERIPHERAL ICC -------- //

export interface ICC_t {
    INFO: $Reg
    SZ: $Reg
    CTRL: $Reg
    INVALIDATE: $Reg
}

// -------- REGISTER INFO -------- //

/**
Cache ID Register.*/
/**
Release Number. Identifies the RTL release version.*/
export const F_ICC_INFO_RELNUM_POS = 0
export const F_ICC_INFO_RELNUM = 0x3f << F_ICC_INFO_RELNUM_POS
/**
Part Number. This field reflects the value of C_ID_PART_NUMBER configuration parameter.*/
export const F_ICC_INFO_PARTNUM_POS = 6
export const F_ICC_INFO_PARTNUM = 0xf << F_ICC_INFO_PARTNUM_POS
/**
Cache ID. This field reflects the value of the C_ID_CACHEID configuration parameter.*/
export const F_ICC_INFO_ID_POS = 10
export const F_ICC_INFO_ID = 0x3f << F_ICC_INFO_ID_POS

// -------- REGISTER SZ -------- //

/**
Memory Configuration Register.*/
/**
Cache Size. Indicates total size in Kbytes of cache.*/
export const F_ICC_SZ_CCH_POS = 0
export const F_ICC_SZ_CCH = 0xffff << F_ICC_SZ_CCH_POS
/**
Main Memory Size. Indicates the total size, in units of 128 Kbytes, of code memory accessible to the cache controller.*/
export const F_ICC_SZ_MEM_POS = 16
export const F_ICC_SZ_MEM = 0xffff << F_ICC_SZ_MEM_POS

// -------- REGISTER CTRL -------- //

/**
Cache Control and Status Register.*/
/**
Cache Enable. Controls whether the cache is bypassed or is in use. Changing the state of this bit will cause the instruction cache to be flushed and its contents invalidated.*/
export const F_ICC_CTRL_EN_POS = 0
export const F_ICC_CTRL_EN = 0x1 << F_ICC_CTRL_EN_POS
export const V_ICC_CTRL_EN_DIS = 0
export const S_ICC_CTRL_EN_DIS = 0 << F_ICC_CTRL_EN_POS
export const V_ICC_CTRL_EN_EN = 1
export const S_ICC_CTRL_EN_EN = 1 << F_ICC_CTRL_EN_POS
/**
Cache Ready flag. Cleared by hardware when at any time the cache as a whole is invalidated (including a system reset). When this bit is 0, the cache is effectively in bypass mode (instruction fetches will come from main memory or from the line fill buffer). Set by hardware when the invalidate operation is complete and the cache is ready.*/
export const F_ICC_CTRL_RDY_POS = 16
export const F_ICC_CTRL_RDY = 0x1 << F_ICC_CTRL_RDY_POS
export const V_ICC_CTRL_RDY_NOTREADY = 0
export const S_ICC_CTRL_RDY_NOTREADY = 0 << F_ICC_CTRL_RDY_POS
export const V_ICC_CTRL_RDY_READY = 1
export const S_ICC_CTRL_RDY_READY = 1 << F_ICC_CTRL_RDY_POS

// -------- REGISTER INVALIDATE -------- //

/**
Invalidate All Registers.*/
/**
Invalidate.*/
export const F_ICC_INVALIDATE_INVALID_POS = 0
export const F_ICC_INVALIDATE_INVALID = 0xffffffff << F_ICC_INVALIDATE_INVALID_POS

// -------- PERIPHERAL LPGCR -------- //

export interface LPGCR_t {
    RST: $Reg
    PCLKDIS: $Reg
}

// -------- REGISTER RST -------- //

/**
Low Power Reset Register.*/
/**
Low Power GPIO 2 Reset.*/
export const F_LPGCR_RST_GPIO2_POS = 0
export const F_LPGCR_RST_GPIO2 = 0x1 << F_LPGCR_RST_GPIO2_POS
export const V_LPGCR_RST_GPIO2_RESET_DONE = 0
export const S_LPGCR_RST_GPIO2_RESET_DONE = 0 << F_LPGCR_RST_GPIO2_POS
export const V_LPGCR_RST_GPIO2_BUSY = 1
export const S_LPGCR_RST_GPIO2_BUSY = 1 << F_LPGCR_RST_GPIO2_POS
/**
Low Power Watchdog Timer 1 Reset.*/
export const F_LPGCR_RST_WDT1_POS = 1
export const F_LPGCR_RST_WDT1 = 0x1 << F_LPGCR_RST_WDT1_POS
/**
Low Power Timer 4 Reset.*/
export const F_LPGCR_RST_TMR4_POS = 2
export const F_LPGCR_RST_TMR4 = 0x1 << F_LPGCR_RST_TMR4_POS
/**
Low Power Timer 5 Reset.*/
export const F_LPGCR_RST_TMR5_POS = 3
export const F_LPGCR_RST_TMR5 = 0x1 << F_LPGCR_RST_TMR5_POS
/**
Low Power UART 3 Reset.*/
export const F_LPGCR_RST_UART3_POS = 4
export const F_LPGCR_RST_UART3 = 0x1 << F_LPGCR_RST_UART3_POS
/**
Low Power Comparator Reset.*/
export const F_LPGCR_RST_LPCOMP_POS = 6
export const F_LPGCR_RST_LPCOMP = 0x1 << F_LPGCR_RST_LPCOMP_POS

// -------- REGISTER PCLKDIS -------- //

/**
Low Power Peripheral Clock Disable Register.*/
/**
Low Power GPIO 2 Clock Disable.*/
export const F_LPGCR_PCLKDIS_GPIO2_POS = 0
export const F_LPGCR_PCLKDIS_GPIO2 = 0x1 << F_LPGCR_PCLKDIS_GPIO2_POS
export const V_LPGCR_PCLKDIS_GPIO2_EN = 0
export const S_LPGCR_PCLKDIS_GPIO2_EN = 0 << F_LPGCR_PCLKDIS_GPIO2_POS
export const V_LPGCR_PCLKDIS_GPIO2_DIS = 1
export const S_LPGCR_PCLKDIS_GPIO2_DIS = 1 << F_LPGCR_PCLKDIS_GPIO2_POS
/**
Low Power Watchdog 1 Clock Disable.*/
export const F_LPGCR_PCLKDIS_WDT1_POS = 1
export const F_LPGCR_PCLKDIS_WDT1 = 0x1 << F_LPGCR_PCLKDIS_WDT1_POS
/**
Low Power Timer 4 Clock Disable.*/
export const F_LPGCR_PCLKDIS_TMR4_POS = 2
export const F_LPGCR_PCLKDIS_TMR4 = 0x1 << F_LPGCR_PCLKDIS_TMR4_POS
/**
Low Power Timer 5 Clock Disable.*/
export const F_LPGCR_PCLKDIS_TMR5_POS = 3
export const F_LPGCR_PCLKDIS_TMR5 = 0x1 << F_LPGCR_PCLKDIS_TMR5_POS
/**
Low Power UART 3 Clock Disable.*/
export const F_LPGCR_PCLKDIS_UART3_POS = 4
export const F_LPGCR_PCLKDIS_UART3 = 0x1 << F_LPGCR_PCLKDIS_UART3_POS
/**
Low Power Comparator Clock Disable.*/
export const F_LPGCR_PCLKDIS_LPCOMP_POS = 6
export const F_LPGCR_PCLKDIS_LPCOMP = 0x1 << F_LPGCR_PCLKDIS_LPCOMP_POS

// -------- PERIPHERAL MCR -------- //

export interface MCR_t {
    ECCEN: $Reg
    IPO_MTRIM: $Reg
    OUTEN: $Reg
    CMP_CTRL: $Reg
    CTRL: $Reg
    GPIO3_CTRL: $Reg
}

// -------- REGISTER ECCEN -------- //

/**
ECC Enable Register*/
/**
ECC System RAM0 Enable.*/
export const F_MCR_ECCEN_RAM0_POS = 0
export const F_MCR_ECCEN_RAM0 = 0x1 << F_MCR_ECCEN_RAM0_POS
export const V_MCR_ECCEN_RAM0_DIS = 0
export const S_MCR_ECCEN_RAM0_DIS = 0 << F_MCR_ECCEN_RAM0_POS
export const V_MCR_ECCEN_RAM0_EN = 1
export const S_MCR_ECCEN_RAM0_EN = 1 << F_MCR_ECCEN_RAM0_POS

// -------- REGISTER IPO_MTRIM -------- //

/**
IPO Manual Register*/
/**
Manual Trim Value.*/
export const F_MCR_IPO_MTRIM_MTRIM_POS = 0
export const F_MCR_IPO_MTRIM_MTRIM = 0xff << F_MCR_IPO_MTRIM_MTRIM_POS
/**
Trim Range Select.*/
export const F_MCR_IPO_MTRIM_TRIM_RANGE_POS = 8
export const F_MCR_IPO_MTRIM_TRIM_RANGE = 0x1 << F_MCR_IPO_MTRIM_TRIM_RANGE_POS

// -------- REGISTER OUTEN -------- //

/**
Output Enable Register*/
/**
Square Wave Output Enable.*/
export const F_MCR_OUTEN_SQWOUT_EN_POS = 0
export const F_MCR_OUTEN_SQWOUT_EN = 0x1 << F_MCR_OUTEN_SQWOUT_EN_POS
/**
Power Down Output Enable.*/
export const F_MCR_OUTEN_PDOWN_OUT_EN_POS = 1
export const F_MCR_OUTEN_PDOWN_OUT_EN = 0x1 << F_MCR_OUTEN_PDOWN_OUT_EN_POS

// -------- REGISTER CMP_CTRL -------- //

/**
Comparator Control Register.*/
/**
Comparator Enable.*/
export const F_MCR_CMP_CTRL_EN_POS = 0
export const F_MCR_CMP_CTRL_EN = 0x1 << F_MCR_CMP_CTRL_EN_POS
/**
Polarity Select*/
export const F_MCR_CMP_CTRL_POL_POS = 5
export const F_MCR_CMP_CTRL_POL = 0x1 << F_MCR_CMP_CTRL_POL_POS
/**
IRQ Enable.*/
export const F_MCR_CMP_CTRL_INT_EN_POS = 6
export const F_MCR_CMP_CTRL_INT_EN = 0x1 << F_MCR_CMP_CTRL_INT_EN_POS
/**
Comparator Output State.*/
export const F_MCR_CMP_CTRL_OUT_POS = 14
export const F_MCR_CMP_CTRL_OUT = 0x1 << F_MCR_CMP_CTRL_OUT_POS
/**
IRQ Flag*/
export const F_MCR_CMP_CTRL_INT_FL_POS = 15
export const F_MCR_CMP_CTRL_INT_FL = 0x1 << F_MCR_CMP_CTRL_INT_FL_POS

// -------- REGISTER CTRL -------- //

/**
Miscellaneous Control Register.*/
/**
INRO Enable.*/
export const F_MCR_CTRL_INRO_EN_POS = 2
export const F_MCR_CTRL_INRO_EN = 0x1 << F_MCR_CTRL_INRO_EN_POS
/**
ERTCO Enable.*/
export const F_MCR_CTRL_ERTCO_EN_POS = 3
export const F_MCR_CTRL_ERTCO_EN = 0x1 << F_MCR_CTRL_ERTCO_EN_POS
/**
SIMO Clock Scaling Enable.*/
export const F_MCR_CTRL_SIMO_CLKSCL_EN_POS = 8
export const F_MCR_CTRL_SIMO_CLKSCL_EN = 0x1 << F_MCR_CTRL_SIMO_CLKSCL_EN_POS
/**
SIMO System Reset Disable.*/
export const F_MCR_CTRL_SIMO_RSTD_POS = 9
export const F_MCR_CTRL_SIMO_RSTD = 0x1 << F_MCR_CTRL_SIMO_RSTD_POS

// -------- REGISTER GPIO3_CTRL -------- //

/**
GPIO3 Pin Control Register.*/
/**
GPIO3 Pin 0 Data Output.*/
export const F_MCR_GPIO3_CTRL_P30_DO_POS = 0
export const F_MCR_GPIO3_CTRL_P30_DO = 0x1 << F_MCR_GPIO3_CTRL_P30_DO_POS
/**
GPIO3 Pin 0 Output Enable.*/
export const F_MCR_GPIO3_CTRL_P30_OE_POS = 1
export const F_MCR_GPIO3_CTRL_P30_OE = 0x1 << F_MCR_GPIO3_CTRL_P30_OE_POS
/**
GPIO3 Pin 0 Pull-up Enable.*/
export const F_MCR_GPIO3_CTRL_P30_PE_POS = 2
export const F_MCR_GPIO3_CTRL_P30_PE = 0x1 << F_MCR_GPIO3_CTRL_P30_PE_POS
/**
GPIO3 Pin 0 Input Status.*/
export const F_MCR_GPIO3_CTRL_P30_IN_POS = 3
export const F_MCR_GPIO3_CTRL_P30_IN = 0x1 << F_MCR_GPIO3_CTRL_P30_IN_POS
/**
GPIO3 Pin 1 Data Output.*/
export const F_MCR_GPIO3_CTRL_P31_DO_POS = 4
export const F_MCR_GPIO3_CTRL_P31_DO = 0x1 << F_MCR_GPIO3_CTRL_P31_DO_POS
/**
GPIO3 Pin 1 Output Enable.*/
export const F_MCR_GPIO3_CTRL_P31_OE_POS = 5
export const F_MCR_GPIO3_CTRL_P31_OE = 0x1 << F_MCR_GPIO3_CTRL_P31_OE_POS
/**
GPIO3 Pin 1 Pull-up Enable.*/
export const F_MCR_GPIO3_CTRL_P31_PE_POS = 6
export const F_MCR_GPIO3_CTRL_P31_PE = 0x1 << F_MCR_GPIO3_CTRL_P31_PE_POS
/**
GPIO3 Pin 1 Input Status.*/
export const F_MCR_GPIO3_CTRL_P31_IN_POS = 7
export const F_MCR_GPIO3_CTRL_P31_IN = 0x1 << F_MCR_GPIO3_CTRL_P31_IN_POS

// -------- PERIPHERAL PWRSEQ -------- //

export interface PWRSEQ_t {
    LPCN: $Reg
    LPWKST0: $Reg
    LPWKEN0: $Reg
    LPWKST1: $Reg
    LPWKEN1: $Reg
    LPWKST2: $Reg
    LPWKEN2: $Reg
    LPWKST3: $Reg
    LPWKEN3: $Reg
    LPPWST: $Reg
    LPPWEN: $Reg
    VBTLEPD: $Reg
    GP0: $Reg
    GP1: $Reg
}

// -------- REGISTER LPCN -------- //

/**
Low Power Control Register.*/
/**
System RAM retention in BACKUP mode. These two bits are used in conjuction with RREGEN bit. */
export const F_PWRSEQ_LPCN_RAMRET0_POS = 0
export const F_PWRSEQ_LPCN_RAMRET0 = 0x1 << F_PWRSEQ_LPCN_RAMRET0_POS
export const V_PWRSEQ_LPCN_RAMRET0_DIS = 0
export const S_PWRSEQ_LPCN_RAMRET0_DIS = 0 << F_PWRSEQ_LPCN_RAMRET0_POS
export const V_PWRSEQ_LPCN_RAMRET0_EN = 1
export const S_PWRSEQ_LPCN_RAMRET0_EN = 1 << F_PWRSEQ_LPCN_RAMRET0_POS
/**
System RAM retention in BACKUP mode. These two bits are used in conjuction with RREGEN bit. */
export const F_PWRSEQ_LPCN_RAMRET1_POS = 1
export const F_PWRSEQ_LPCN_RAMRET1 = 0x1 << F_PWRSEQ_LPCN_RAMRET1_POS
export const V_PWRSEQ_LPCN_RAMRET1_DIS = 0
export const S_PWRSEQ_LPCN_RAMRET1_DIS = 0 << F_PWRSEQ_LPCN_RAMRET1_POS
export const V_PWRSEQ_LPCN_RAMRET1_EN = 1
export const S_PWRSEQ_LPCN_RAMRET1_EN = 1 << F_PWRSEQ_LPCN_RAMRET1_POS
/**
System RAM retention in BACKUP mode. These two bits are used in conjuction with RREGEN bit. */
export const F_PWRSEQ_LPCN_RAMRET2_POS = 2
export const F_PWRSEQ_LPCN_RAMRET2 = 0x1 << F_PWRSEQ_LPCN_RAMRET2_POS
export const V_PWRSEQ_LPCN_RAMRET2_DIS = 0
export const S_PWRSEQ_LPCN_RAMRET2_DIS = 0 << F_PWRSEQ_LPCN_RAMRET2_POS
export const V_PWRSEQ_LPCN_RAMRET2_EN = 1
export const S_PWRSEQ_LPCN_RAMRET2_EN = 1 << F_PWRSEQ_LPCN_RAMRET2_POS
/**
System RAM retention in BACKUP mode. These two bits are used in conjuction with RREGEN bit. */
export const F_PWRSEQ_LPCN_RAMRET3_POS = 3
export const F_PWRSEQ_LPCN_RAMRET3 = 0x1 << F_PWRSEQ_LPCN_RAMRET3_POS
export const V_PWRSEQ_LPCN_RAMRET3_DIS = 0
export const S_PWRSEQ_LPCN_RAMRET3_DIS = 0 << F_PWRSEQ_LPCN_RAMRET3_POS
export const V_PWRSEQ_LPCN_RAMRET3_EN = 1
export const S_PWRSEQ_LPCN_RAMRET3_EN = 1 << F_PWRSEQ_LPCN_RAMRET3_POS
/**
Low Power Mode APB Clock Select.*/
export const F_PWRSEQ_LPCN_LPMCLKSEL_POS = 8
export const F_PWRSEQ_LPCN_LPMCLKSEL = 0x1 << F_PWRSEQ_LPCN_LPMCLKSEL_POS
/**
Low Power Mode Clock Select.*/
export const F_PWRSEQ_LPCN_LPMFAST_POS = 9
export const F_PWRSEQ_LPCN_LPMFAST = 0x1 << F_PWRSEQ_LPCN_LPMFAST_POS
/**
Bandgap OFF. This controls the System Bandgap in DeepSleep mode.*/
export const F_PWRSEQ_LPCN_BG_DIS_POS = 11
export const F_PWRSEQ_LPCN_BG_DIS = 0x1 << F_PWRSEQ_LPCN_BG_DIS_POS
export const V_PWRSEQ_LPCN_BG_DIS_ON = 0
export const S_PWRSEQ_LPCN_BG_DIS_ON = 0 << F_PWRSEQ_LPCN_BG_DIS_POS
export const V_PWRSEQ_LPCN_BG_DIS_OFF = 1
export const S_PWRSEQ_LPCN_BG_DIS_OFF = 1 << F_PWRSEQ_LPCN_BG_DIS_POS
/**
Low Power Wakeup Status Register Clear*/
export const F_PWRSEQ_LPCN_LPWKST_CLR_POS = 31
export const F_PWRSEQ_LPCN_LPWKST_CLR = 0x1 << F_PWRSEQ_LPCN_LPWKST_CLR_POS

// -------- REGISTER LPWKST0 -------- //

/**
Low Power I/O Wakeup Status Register 0. This register indicates the low power wakeup status for GPIO0.*/
/**
Wakeup IRQ flags (write ones to clear). One or more of these bits will be set when the corresponding dedicated GPIO pin (s) transition (s) from low to high or high to low. If GPIO wakeup source is selected, using PM.GPIOWKEN register, and the corresponding bit is also selected in LPWKEN register, an interrupt will be gnerated to wake up the CPU from a low power mode.*/
export const F_PWRSEQ_LPWKST0_WAKEST_POS = 0
export const F_PWRSEQ_LPWKST0_WAKEST = 0x1 << F_PWRSEQ_LPWKST0_WAKEST_POS

// -------- REGISTER LPWKEN0 -------- //

/**
Low Power I/O Wakeup Enable Register 0. This register enables low power wakeup functionality for GPIO0.*/
/**
Enable wakeup. These bits allow wakeup from the corresponding GPIO pin (s) on transition (s) from low to high or high to low when PM.GPIOWKEN is set. Wakeup status is indicated in PPWKST register.*/
export const F_PWRSEQ_LPWKEN0_WAKEEN_POS = 0
export const F_PWRSEQ_LPWKEN0_WAKEEN = 0x7fffffff << F_PWRSEQ_LPWKEN0_WAKEEN_POS

// -------- REGISTER LPWKST1 -------- //

/**
Low Power I/O Wakeup Status Register 1. This register indicates the low power wakeup status for GPIO1.*/

// -------- REGISTER LPWKEN1 -------- //

/**
Low Power I/O Wakeup Enable Register 1. This register enables low power wakeup functionality for GPIO1.*/

// -------- REGISTER LPWKST2 -------- //

/**
Low Power I/O Wakeup Status Register 2. This register indicates the low power wakeup status for GPIO2.*/

// -------- REGISTER LPWKEN2 -------- //

/**
Low Power I/O Wakeup Enable Register 2. This register enables low power wakeup functionality for GPIO2.*/

// -------- REGISTER LPWKST3 -------- //

/**
Low Power I/O Wakeup Status Register 3. This register indicates the low power wakeup status for GPIO3.*/

// -------- REGISTER LPWKEN3 -------- //

/**
Low Power I/O Wakeup Enable Register 3. This register enables low power wakeup functionality for GPIO3.*/

// -------- REGISTER LPPWST -------- //

/**
Low Power Peripheral Wakeup Status Register.*/
/**
Analog Input Comparator Wakeup Flag.*/
export const F_PWRSEQ_LPPWST_AINCOMP0_POS = 4
export const F_PWRSEQ_LPPWST_AINCOMP0 = 0x1 << F_PWRSEQ_LPPWST_AINCOMP0_POS
/**
Backup Mode Wakeup Flag.*/
export const F_PWRSEQ_LPPWST_BACKUP_POS = 16
export const F_PWRSEQ_LPPWST_BACKUP = 0x1 << F_PWRSEQ_LPPWST_BACKUP_POS
/**
Reset Detected Wakeup Flag.*/
export const F_PWRSEQ_LPPWST_RESET_POS = 17
export const F_PWRSEQ_LPPWST_RESET = 0x1 << F_PWRSEQ_LPPWST_RESET_POS

// -------- REGISTER LPPWEN -------- //

/**
Low Power Peripheral Wakeup Enable Register.*/
/**
 AINCOMP0 Wakeup Enable. This bit allows wakeup from the AINCOMP0.*/
export const F_PWRSEQ_LPPWEN_AINCOMP0_POS = 4
export const F_PWRSEQ_LPPWEN_AINCOMP0 = 0x1 << F_PWRSEQ_LPPWEN_AINCOMP0_POS
/**
 WDT0 Wakeup Enable. This bit allows wakeup from the WDT0.*/
export const F_PWRSEQ_LPPWEN_WDT0_POS = 8
export const F_PWRSEQ_LPPWEN_WDT0 = 0x1 << F_PWRSEQ_LPPWEN_WDT0_POS
/**
 WDT1 Wakeup Enable. This bit allows wakeup from the WDT1.*/
export const F_PWRSEQ_LPPWEN_WDT1_POS = 9
export const F_PWRSEQ_LPPWEN_WDT1 = 0x1 << F_PWRSEQ_LPPWEN_WDT1_POS
/**
 CPU1 Wakeup Enable. This bit allows wakeup from the CPU1.*/
export const F_PWRSEQ_LPPWEN_CPU1_POS = 10
export const F_PWRSEQ_LPPWEN_CPU1 = 0x1 << F_PWRSEQ_LPPWEN_CPU1_POS
/**
 TMR0 Wakeup Enable. This bit allows wakeup from the TMR0.*/
export const F_PWRSEQ_LPPWEN_TMR0_POS = 11
export const F_PWRSEQ_LPPWEN_TMR0 = 0x1 << F_PWRSEQ_LPPWEN_TMR0_POS
/**
 TMR1 Wakeup Enable. This bit allows wakeup from the TMR1.*/
export const F_PWRSEQ_LPPWEN_TMR1_POS = 12
export const F_PWRSEQ_LPPWEN_TMR1 = 0x1 << F_PWRSEQ_LPPWEN_TMR1_POS
/**
 TMR2 Wakeup Enable. This bit allows wakeup from the TMR2.*/
export const F_PWRSEQ_LPPWEN_TMR2_POS = 13
export const F_PWRSEQ_LPPWEN_TMR2 = 0x1 << F_PWRSEQ_LPPWEN_TMR2_POS
/**
 TMR3 Wakeup Enable. This bit allows wakeup from the TMR3.*/
export const F_PWRSEQ_LPPWEN_TMR3_POS = 14
export const F_PWRSEQ_LPPWEN_TMR3 = 0x1 << F_PWRSEQ_LPPWEN_TMR3_POS
/**
 TMR4 Wakeup Enable. This bit allows wakeup from the TMR4.*/
export const F_PWRSEQ_LPPWEN_TMR4_POS = 15
export const F_PWRSEQ_LPPWEN_TMR4 = 0x1 << F_PWRSEQ_LPPWEN_TMR4_POS
/**
 TMR5 Wakeup Enable. This bit allows wakeup from the TMR5.*/
export const F_PWRSEQ_LPPWEN_TMR5_POS = 16
export const F_PWRSEQ_LPPWEN_TMR5 = 0x1 << F_PWRSEQ_LPPWEN_TMR5_POS
/**
 UART0 Wakeup Enable. This bit allows wakeup from the UART0.*/
export const F_PWRSEQ_LPPWEN_UART0_POS = 17
export const F_PWRSEQ_LPPWEN_UART0 = 0x1 << F_PWRSEQ_LPPWEN_UART0_POS
/**
 UART1 Wakeup Enable. This bit allows wakeup from the UART1.*/
export const F_PWRSEQ_LPPWEN_UART1_POS = 18
export const F_PWRSEQ_LPPWEN_UART1 = 0x1 << F_PWRSEQ_LPPWEN_UART1_POS
/**
 UART2 Wakeup Enable. This bit allows wakeup from the UART2.*/
export const F_PWRSEQ_LPPWEN_UART2_POS = 19
export const F_PWRSEQ_LPPWEN_UART2 = 0x1 << F_PWRSEQ_LPPWEN_UART2_POS
/**
 UART3 Wakeup Enable. This bit allows wakeup from the UART3.*/
export const F_PWRSEQ_LPPWEN_UART3_POS = 20
export const F_PWRSEQ_LPPWEN_UART3 = 0x1 << F_PWRSEQ_LPPWEN_UART3_POS
/**
 I2C0 Wakeup Enable. This bit allows wakeup from the I2C0.*/
export const F_PWRSEQ_LPPWEN_I2C0_POS = 21
export const F_PWRSEQ_LPPWEN_I2C0 = 0x1 << F_PWRSEQ_LPPWEN_I2C0_POS
/**
 I2C1 Wakeup Enable. This bit allows wakeup from the I2C1.*/
export const F_PWRSEQ_LPPWEN_I2C1_POS = 22
export const F_PWRSEQ_LPPWEN_I2C1 = 0x1 << F_PWRSEQ_LPPWEN_I2C1_POS
/**
 I2C2 Wakeup Enable. This bit allows wakeup from the I2C2.*/
export const F_PWRSEQ_LPPWEN_I2C2_POS = 23
export const F_PWRSEQ_LPPWEN_I2C2 = 0x1 << F_PWRSEQ_LPPWEN_I2C2_POS
/**
 I2S Wakeup Enable. This bit allows wakeup from the I2S.*/
export const F_PWRSEQ_LPPWEN_I2S_POS = 24
export const F_PWRSEQ_LPPWEN_I2S = 0x1 << F_PWRSEQ_LPPWEN_I2S_POS
/**
 SPI1 Wakeup Enable. This bit allows wakeup from the SPI1.*/
export const F_PWRSEQ_LPPWEN_SPI1_POS = 25
export const F_PWRSEQ_LPPWEN_SPI1 = 0x1 << F_PWRSEQ_LPPWEN_SPI1_POS
/**
 LPCMP Wakeup Enable. This bit allows wakeup from the LPCMP.*/
export const F_PWRSEQ_LPPWEN_LPCMP_POS = 26
export const F_PWRSEQ_LPPWEN_LPCMP = 0x1 << F_PWRSEQ_LPPWEN_LPCMP_POS

// -------- REGISTER VBTLEPD -------- //

/**
Low-Power VBTLE Power Down Register.*/
/**
Power Down SIMO VREGO_D.*/
export const F_PWRSEQ_VBTLEPD_BTLE_POS = 1
export const F_PWRSEQ_VBTLEPD_BTLE = 0x1 << F_PWRSEQ_VBTLEPD_BTLE_POS

// -------- REGISTER GP0 -------- //

/**
General Purpose Register 0*/

// -------- REGISTER GP1 -------- //

/**
General Purpose Register 1*/

// -------- PERIPHERAL RTC -------- //

export interface RTC_t {
    SEC: $Reg
    SSEC: $Reg
    TODA: $Reg
    SSECA: $Reg
    CTRL: $Reg
    TRIM: $Reg
    OSCCTRL: $Reg
}

// -------- REGISTER SEC -------- //

/**
RTC Second Counter. This register contains the 32-bit second counter.*/
/**
Seconds Counter.*/
export const F_RTC_SEC_SEC_POS = 0
export const F_RTC_SEC_SEC = 0xffffffff << F_RTC_SEC_SEC_POS

// -------- REGISTER SSEC -------- //

/**
RTC Sub-second Counter. This counter increments at 256Hz. RTC_SEC is incremented when this register rolls over from 0xFF to 0x00.*/
/**
Sub-Seconds Counter (12-bit).*/
export const F_RTC_SSEC_SSEC_POS = 0
export const F_RTC_SSEC_SSEC = 0xfff << F_RTC_SSEC_SSEC_POS

// -------- REGISTER TODA -------- //

/**
Time-of-day Alarm.*/
/**
Time-of-day Alarm.*/
export const F_RTC_TODA_TOD_ALARM_POS = 0
export const F_RTC_TODA_TOD_ALARM = 0xfffff << F_RTC_TODA_TOD_ALARM_POS

// -------- REGISTER SSECA -------- //

/**
RTC sub-second alarm.  This register contains the reload value for the sub-second alarm.*/
/**
This register contains the reload value for the sub-second alarm.*/
export const F_RTC_SSECA_SSEC_ALARM_POS = 0
export const F_RTC_SSECA_SSEC_ALARM = 0xffffffff << F_RTC_SSECA_SSEC_ALARM_POS

// -------- REGISTER CTRL -------- //

/**
RTC Control Register.*/
/**
Real Time Clock Enable. This bit enables the Real Time Clock. This bit can only be written when WE=1 and BUSY =0. Change to this bit is effective only after BUSY is cleared from 1 to 0.*/
export const F_RTC_CTRL_EN_POS = 0
export const F_RTC_CTRL_EN = 0x1 << F_RTC_CTRL_EN_POS
export const V_RTC_CTRL_EN_DIS = 0
export const S_RTC_CTRL_EN_DIS = 0 << F_RTC_CTRL_EN_POS
export const V_RTC_CTRL_EN_EN = 1
export const S_RTC_CTRL_EN_EN = 1 << F_RTC_CTRL_EN_POS
/**
Alarm Time-of-Day Interrupt Enable. Change to this bit is effective only after BUSY is cleared from 1 to 0.*/
export const F_RTC_CTRL_TOD_ALARM_IE_POS = 1
export const F_RTC_CTRL_TOD_ALARM_IE = 0x1 << F_RTC_CTRL_TOD_ALARM_IE_POS
export const V_RTC_CTRL_TOD_ALARM_IE_DIS = 0
export const S_RTC_CTRL_TOD_ALARM_IE_DIS = 0 << F_RTC_CTRL_TOD_ALARM_IE_POS
export const V_RTC_CTRL_TOD_ALARM_IE_EN = 1
export const S_RTC_CTRL_TOD_ALARM_IE_EN = 1 << F_RTC_CTRL_TOD_ALARM_IE_POS
/**
Alarm Sub-second Interrupt Enable.  Change to this bit is effective only after BUSY is cleared from 1 to 0.*/
export const F_RTC_CTRL_SSEC_ALARM_IE_POS = 2
export const F_RTC_CTRL_SSEC_ALARM_IE = 0x1 << F_RTC_CTRL_SSEC_ALARM_IE_POS
export const V_RTC_CTRL_SSEC_ALARM_IE_DIS = 0
export const S_RTC_CTRL_SSEC_ALARM_IE_DIS = 0 << F_RTC_CTRL_SSEC_ALARM_IE_POS
export const V_RTC_CTRL_SSEC_ALARM_IE_EN = 1
export const S_RTC_CTRL_SSEC_ALARM_IE_EN = 1 << F_RTC_CTRL_SSEC_ALARM_IE_POS
/**
RTC Busy. This bit is set to 1 by hardware when changes to RTC registers required a synchronized version of the register to be in place.  This bit is automatically cleared by hardware.*/
export const F_RTC_CTRL_BUSY_POS = 3
export const F_RTC_CTRL_BUSY = 0x1 << F_RTC_CTRL_BUSY_POS
export const V_RTC_CTRL_BUSY_IDLE = 0
export const S_RTC_CTRL_BUSY_IDLE = 0 << F_RTC_CTRL_BUSY_POS
export const V_RTC_CTRL_BUSY_BUSY = 1
export const S_RTC_CTRL_BUSY_BUSY = 1 << F_RTC_CTRL_BUSY_POS
/**
RTC Ready. This bit is set to 1 by hardware when the RTC count registers update.  It can be cleared to 0 by software at any time. It will also be cleared to 0 by hardware just prior to an update of the RTC count register.*/
export const F_RTC_CTRL_RDY_POS = 4
export const F_RTC_CTRL_RDY = 0x1 << F_RTC_CTRL_RDY_POS
export const V_RTC_CTRL_RDY_BUSY = 0
export const S_RTC_CTRL_RDY_BUSY = 0 << F_RTC_CTRL_RDY_POS
export const V_RTC_CTRL_RDY_READY = 1
export const S_RTC_CTRL_RDY_READY = 1 << F_RTC_CTRL_RDY_POS
/**
RTC Ready Interrupt Enable.*/
export const F_RTC_CTRL_RDY_IE_POS = 5
export const F_RTC_CTRL_RDY_IE = 0x1 << F_RTC_CTRL_RDY_IE_POS
export const V_RTC_CTRL_RDY_IE_DIS = 0
export const S_RTC_CTRL_RDY_IE_DIS = 0 << F_RTC_CTRL_RDY_IE_POS
export const V_RTC_CTRL_RDY_IE_EN = 1
export const S_RTC_CTRL_RDY_IE_EN = 1 << F_RTC_CTRL_RDY_IE_POS
/**
Time-of-Day Alarm Interrupt Flag.  This alarm is qualified as wake-up source to the processor.*/
export const F_RTC_CTRL_TOD_ALARM_POS = 6
export const F_RTC_CTRL_TOD_ALARM = 0x1 << F_RTC_CTRL_TOD_ALARM_POS
export const V_RTC_CTRL_TOD_ALARM_INACTIVE = 0
export const S_RTC_CTRL_TOD_ALARM_INACTIVE = 0 << F_RTC_CTRL_TOD_ALARM_POS
export const V_RTC_CTRL_TOD_ALARM_PENDING = 1
export const S_RTC_CTRL_TOD_ALARM_PENDING = 1 << F_RTC_CTRL_TOD_ALARM_POS
/**
Sub-second Alarm Interrupt Flag. This alarm is qualified as wake-up source to the processor.*/
export const F_RTC_CTRL_SSEC_ALARM_POS = 7
export const F_RTC_CTRL_SSEC_ALARM = 0x1 << F_RTC_CTRL_SSEC_ALARM_POS
export const V_RTC_CTRL_SSEC_ALARM_INACTIVE = 0
export const S_RTC_CTRL_SSEC_ALARM_INACTIVE = 0 << F_RTC_CTRL_SSEC_ALARM_POS
export const V_RTC_CTRL_SSEC_ALARM_PENDING = 1
export const S_RTC_CTRL_SSEC_ALARM_PENDING = 1 << F_RTC_CTRL_SSEC_ALARM_POS
/**
Square Wave Output Enable.*/
export const F_RTC_CTRL_SQW_EN_POS = 8
export const F_RTC_CTRL_SQW_EN = 0x1 << F_RTC_CTRL_SQW_EN_POS
export const V_RTC_CTRL_SQW_EN_INACTIVE = 0
export const S_RTC_CTRL_SQW_EN_INACTIVE = 0 << F_RTC_CTRL_SQW_EN_POS
export const V_RTC_CTRL_SQW_EN_PENDING = 1
export const S_RTC_CTRL_SQW_EN_PENDING = 1 << F_RTC_CTRL_SQW_EN_POS
/**
Frequency Output Selection. When SQE=1, these bits specify the output frequency on the SQW pin.*/
export const F_RTC_CTRL_SQW_SEL_POS = 9
export const F_RTC_CTRL_SQW_SEL = 0x3 << F_RTC_CTRL_SQW_SEL_POS
export const V_RTC_CTRL_SQW_SEL_FREQ1HZ = 0
export const S_RTC_CTRL_SQW_SEL_FREQ1HZ = 0 << F_RTC_CTRL_SQW_SEL_POS
export const V_RTC_CTRL_SQW_SEL_FREQ512HZ = 1
export const S_RTC_CTRL_SQW_SEL_FREQ512HZ = 1 << F_RTC_CTRL_SQW_SEL_POS
export const V_RTC_CTRL_SQW_SEL_FREQ4KHZ = 2
export const S_RTC_CTRL_SQW_SEL_FREQ4KHZ = 2 << F_RTC_CTRL_SQW_SEL_POS
export const V_RTC_CTRL_SQW_SEL_CLKDIV8 = 3
export const S_RTC_CTRL_SQW_SEL_CLKDIV8 = 3 << F_RTC_CTRL_SQW_SEL_POS
/**
Asynchronous Counter Read Enable.*/
export const F_RTC_CTRL_RD_EN_POS = 14
export const F_RTC_CTRL_RD_EN = 0x1 << F_RTC_CTRL_RD_EN_POS
/**
Write Enable. This register bit serves as a protection mechanism against unintentional writes to critical RTC bits.*/
export const F_RTC_CTRL_WR_EN_POS = 15
export const F_RTC_CTRL_WR_EN = 0x1 << F_RTC_CTRL_WR_EN_POS
export const V_RTC_CTRL_WR_EN_INACTIVE = 0
export const S_RTC_CTRL_WR_EN_INACTIVE = 0 << F_RTC_CTRL_WR_EN_POS
export const V_RTC_CTRL_WR_EN_PENDING = 1
export const S_RTC_CTRL_WR_EN_PENDING = 1 << F_RTC_CTRL_WR_EN_POS

// -------- REGISTER TRIM -------- //

/**
RTC Trim Register.*/
/**
RTC Trim. This register contains the 2's complement value that specifies the trim resolution. Each increment or decrement of the bit adds or subtracts 1ppm at each 4KHz clock value, with a maximum correction of +/- 127ppm.*/
export const F_RTC_TRIM_TRIM_POS = 0
export const F_RTC_TRIM_TRIM = 0xff << F_RTC_TRIM_TRIM_POS
/**
VBAT Timer Value. When RTC is running off of VBAT, this field is incremented every 32 seconds.*/
export const F_RTC_TRIM_VRTC_TMR_POS = 8
export const F_RTC_TRIM_VRTC_TMR = 0xffffff << F_RTC_TRIM_VRTC_TMR_POS

// -------- REGISTER OSCCTRL -------- //

/**
RTC Oscillator Control Register.*/
/**
RTC Crystal Bypass*/
export const F_RTC_OSCCTRL_BYPASS_POS = 4
export const F_RTC_OSCCTRL_BYPASS = 0x1 << F_RTC_OSCCTRL_BYPASS_POS
/**
RTC 32kHz Square Wave Output*/
export const F_RTC_OSCCTRL_SQW_32K_POS = 5
export const F_RTC_OSCCTRL_SQW_32K = 0x1 << F_RTC_OSCCTRL_SQW_32K_POS

// -------- PERIPHERAL SIMO -------- //

export interface SIMO_t {
    VREGO_A: $Reg
    VREGO_B: $Reg
    VREGO_C: $Reg
    VREGO_D: $Reg
    IPKA: $Reg
    IPKB: $Reg
    MAXTON: $Reg
    ILOAD_A: $Reg
    ILOAD_B: $Reg
    ILOAD_C: $Reg
    ILOAD_D: $Reg
    BUCK_ALERT_THR_A: $Reg
    BUCK_ALERT_THR_B: $Reg
    BUCK_ALERT_THR_C: $Reg
    BUCK_ALERT_THR_D: $Reg
    BUCK_OUT_READY: $Reg
    ZERO_CROSS_CAL_A: $Reg
    ZERO_CROSS_CAL_B: $Reg
    ZERO_CROSS_CAL_C: $Reg
    ZERO_CROSS_CAL_D: $Reg
}

// -------- REGISTER VREGO_A -------- //

/**
Buck Voltage Regulator A Control Register*/
/**
Regulator Output Voltage Setting*/
export const F_SIMO_VREGO_A_VSETA_POS = 0
export const F_SIMO_VREGO_A_VSETA = 0x7f << F_SIMO_VREGO_A_VSETA_POS
/**
Regulator Output Range Set*/
export const F_SIMO_VREGO_A_RANGEA_POS = 7
export const F_SIMO_VREGO_A_RANGEA = 0x1 << F_SIMO_VREGO_A_RANGEA_POS
export const V_SIMO_VREGO_A_RANGEA_LOW = 0
export const S_SIMO_VREGO_A_RANGEA_LOW = 0 << F_SIMO_VREGO_A_RANGEA_POS
export const V_SIMO_VREGO_A_RANGEA_HIGH = 1
export const S_SIMO_VREGO_A_RANGEA_HIGH = 1 << F_SIMO_VREGO_A_RANGEA_POS

// -------- REGISTER VREGO_B -------- //

/**
Buck Voltage Regulator B Control Register*/
/**
Regulator Output Voltage Setting*/
export const F_SIMO_VREGO_B_VSETB_POS = 0
export const F_SIMO_VREGO_B_VSETB = 0x7f << F_SIMO_VREGO_B_VSETB_POS
/**
Regulator Output Range Set*/
export const F_SIMO_VREGO_B_RANGEB_POS = 7
export const F_SIMO_VREGO_B_RANGEB = 0x1 << F_SIMO_VREGO_B_RANGEB_POS
export const V_SIMO_VREGO_B_RANGEB_LOW = 0
export const S_SIMO_VREGO_B_RANGEB_LOW = 0 << F_SIMO_VREGO_B_RANGEB_POS
export const V_SIMO_VREGO_B_RANGEB_HIGH = 1
export const S_SIMO_VREGO_B_RANGEB_HIGH = 1 << F_SIMO_VREGO_B_RANGEB_POS

// -------- REGISTER VREGO_C -------- //

/**
Buck Voltage Regulator C Control Register*/
/**
Regulator Output Voltage Setting*/
export const F_SIMO_VREGO_C_VSETC_POS = 0
export const F_SIMO_VREGO_C_VSETC = 0x7f << F_SIMO_VREGO_C_VSETC_POS
/**
Regulator Output Range Set*/
export const F_SIMO_VREGO_C_RANGEC_POS = 7
export const F_SIMO_VREGO_C_RANGEC = 0x1 << F_SIMO_VREGO_C_RANGEC_POS
export const V_SIMO_VREGO_C_RANGEC_LOW = 0
export const S_SIMO_VREGO_C_RANGEC_LOW = 0 << F_SIMO_VREGO_C_RANGEC_POS
export const V_SIMO_VREGO_C_RANGEC_HIGH = 1
export const S_SIMO_VREGO_C_RANGEC_HIGH = 1 << F_SIMO_VREGO_C_RANGEC_POS

// -------- REGISTER VREGO_D -------- //

/**
Buck Voltage Regulator D Control Register*/
/**
Regulator Output Voltage Setting*/
export const F_SIMO_VREGO_D_VSETD_POS = 0
export const F_SIMO_VREGO_D_VSETD = 0x7f << F_SIMO_VREGO_D_VSETD_POS
/**
Regulator Output Range Set*/
export const F_SIMO_VREGO_D_RANGED_POS = 7
export const F_SIMO_VREGO_D_RANGED = 0x1 << F_SIMO_VREGO_D_RANGED_POS
export const V_SIMO_VREGO_D_RANGED_LOW = 0
export const S_SIMO_VREGO_D_RANGED_LOW = 0 << F_SIMO_VREGO_D_RANGED_POS
export const V_SIMO_VREGO_D_RANGED_HIGH = 1
export const S_SIMO_VREGO_D_RANGED_HIGH = 1 << F_SIMO_VREGO_D_RANGED_POS

// -------- REGISTER IPKA -------- //

/**
High Side FET Peak Current VREGO_A/VREGO_B Register*/
/**
Voltage Regulator Peak Current Setting*/
export const F_SIMO_IPKA_IPKSETA_POS = 0
export const F_SIMO_IPKA_IPKSETA = 0xf << F_SIMO_IPKA_IPKSETA_POS
/**
Voltage Regulator Peak Current Setting*/
export const F_SIMO_IPKA_IPKSETB_POS = 4
export const F_SIMO_IPKA_IPKSETB = 0xf << F_SIMO_IPKA_IPKSETB_POS

// -------- REGISTER IPKB -------- //

/**
High Side FET Peak Current VREGO_C/VREGO_D Register*/
/**
Voltage Regulator Peak Current Setting*/
export const F_SIMO_IPKB_IPKSETC_POS = 0
export const F_SIMO_IPKB_IPKSETC = 0xf << F_SIMO_IPKB_IPKSETC_POS
/**
Voltage Regulator Peak Current Setting*/
export const F_SIMO_IPKB_IPKSETD_POS = 4
export const F_SIMO_IPKB_IPKSETD = 0xf << F_SIMO_IPKB_IPKSETD_POS

// -------- REGISTER MAXTON -------- //

/**
Maximum High Side FET Time On Register*/
/**
Sets the maximum on time for the high side FET, each increment represents 500ns*/
export const F_SIMO_MAXTON_TONSET_POS = 0
export const F_SIMO_MAXTON_TONSET = 0xf << F_SIMO_MAXTON_TONSET_POS

// -------- REGISTER ILOAD_A -------- //

/**
Buck Cycle Count VREGO_A Register*/
/**
Number of buck cycles that occur within the cycle clock*/
export const F_SIMO_ILOAD_A_ILOADA_POS = 0
export const F_SIMO_ILOAD_A_ILOADA = 0xff << F_SIMO_ILOAD_A_ILOADA_POS

// -------- REGISTER ILOAD_B -------- //

/**
Buck Cycle Count VREGO_B Register*/
/**
Number of buck cycles that occur within the cycle clock*/
export const F_SIMO_ILOAD_B_ILOADB_POS = 0
export const F_SIMO_ILOAD_B_ILOADB = 0xff << F_SIMO_ILOAD_B_ILOADB_POS

// -------- REGISTER ILOAD_C -------- //

/**
Buck Cycle Count VREGO_C Register*/
/**
Number of buck cycles that occur within the cycle clock*/
export const F_SIMO_ILOAD_C_ILOADC_POS = 0
export const F_SIMO_ILOAD_C_ILOADC = 0xff << F_SIMO_ILOAD_C_ILOADC_POS

// -------- REGISTER ILOAD_D -------- //

/**
Buck Cycle Count VREGO_D Register*/
/**
Number of buck cycles that occur within the cycle clock*/
export const F_SIMO_ILOAD_D_ILOADD_POS = 0
export const F_SIMO_ILOAD_D_ILOADD = 0xff << F_SIMO_ILOAD_D_ILOADD_POS

// -------- REGISTER BUCK_ALERT_THR_A -------- //

/**
Buck Cycle Count Alert VERGO_A Register*/
/**
Threshold for ILOADA to generate the BUCK_ALERT*/
export const F_SIMO_BUCK_ALERT_THR_A_BUCKTHRA_POS = 0
export const F_SIMO_BUCK_ALERT_THR_A_BUCKTHRA = 0xff << F_SIMO_BUCK_ALERT_THR_A_BUCKTHRA_POS

// -------- REGISTER BUCK_ALERT_THR_B -------- //

/**
Buck Cycle Count Alert VERGO_B Register*/
/**
Threshold for ILOADB to generate the BUCK_ALERT*/
export const F_SIMO_BUCK_ALERT_THR_B_BUCKTHRB_POS = 0
export const F_SIMO_BUCK_ALERT_THR_B_BUCKTHRB = 0xff << F_SIMO_BUCK_ALERT_THR_B_BUCKTHRB_POS

// -------- REGISTER BUCK_ALERT_THR_C -------- //

/**
Buck Cycle Count Alert VERGO_C Register*/
/**
Threshold for ILOADC to generate the BUCK_ALERT*/
export const F_SIMO_BUCK_ALERT_THR_C_BUCKTHRC_POS = 0
export const F_SIMO_BUCK_ALERT_THR_C_BUCKTHRC = 0xff << F_SIMO_BUCK_ALERT_THR_C_BUCKTHRC_POS

// -------- REGISTER BUCK_ALERT_THR_D -------- //

/**
Buck Cycle Count Alert VERGO_D Register*/
/**
Threshold for ILOADD to generate the BUCK_ALERT*/
export const F_SIMO_BUCK_ALERT_THR_D_BUCKTHRD_POS = 0
export const F_SIMO_BUCK_ALERT_THR_D_BUCKTHRD = 0xff << F_SIMO_BUCK_ALERT_THR_D_BUCKTHRD_POS

// -------- REGISTER BUCK_OUT_READY -------- //

/**
Buck Regulator Output Ready Register*/
/**
When set, indicates that the output voltage has reached its regulated value*/
export const F_SIMO_BUCK_OUT_READY_BUCKOUTRDYA_POS = 0
export const F_SIMO_BUCK_OUT_READY_BUCKOUTRDYA = 0x1 << F_SIMO_BUCK_OUT_READY_BUCKOUTRDYA_POS
export const V_SIMO_BUCK_OUT_READY_BUCKOUTRDYA_NOTRDY = 0
export const S_SIMO_BUCK_OUT_READY_BUCKOUTRDYA_NOTRDY = 0 << F_SIMO_BUCK_OUT_READY_BUCKOUTRDYA_POS
export const V_SIMO_BUCK_OUT_READY_BUCKOUTRDYA_RDY = 1
export const S_SIMO_BUCK_OUT_READY_BUCKOUTRDYA_RDY = 1 << F_SIMO_BUCK_OUT_READY_BUCKOUTRDYA_POS
/**
When set, indicates that the output voltage has reached its regulated value*/
export const F_SIMO_BUCK_OUT_READY_BUCKOUTRDYB_POS = 1
export const F_SIMO_BUCK_OUT_READY_BUCKOUTRDYB = 0x1 << F_SIMO_BUCK_OUT_READY_BUCKOUTRDYB_POS
/**
When set, indicates that the output voltage has reached its regulated value*/
export const F_SIMO_BUCK_OUT_READY_BUCKOUTRDYC_POS = 2
export const F_SIMO_BUCK_OUT_READY_BUCKOUTRDYC = 0x1 << F_SIMO_BUCK_OUT_READY_BUCKOUTRDYC_POS
/**
When set, indicates that the output voltage has reached its regulated value*/
export const F_SIMO_BUCK_OUT_READY_BUCKOUTRDYD_POS = 3
export const F_SIMO_BUCK_OUT_READY_BUCKOUTRDYD = 0x1 << F_SIMO_BUCK_OUT_READY_BUCKOUTRDYD_POS

// -------- REGISTER ZERO_CROSS_CAL_A -------- //

/**
Zero Cross Calibration VERGO_A Register*/
/**
Zero Cross Calibrartion Value VREGO_A*/
export const F_SIMO_ZERO_CROSS_CAL_A_ZXCALA_POS = 0
export const F_SIMO_ZERO_CROSS_CAL_A_ZXCALA = 0xf << F_SIMO_ZERO_CROSS_CAL_A_ZXCALA_POS

// -------- REGISTER ZERO_CROSS_CAL_B -------- //

/**
Zero Cross Calibration VERGO_B Register*/
/**
Zero Cross Calibrartion Value VREGO_B*/
export const F_SIMO_ZERO_CROSS_CAL_B_ZXCALB_POS = 0
export const F_SIMO_ZERO_CROSS_CAL_B_ZXCALB = 0xf << F_SIMO_ZERO_CROSS_CAL_B_ZXCALB_POS

// -------- REGISTER ZERO_CROSS_CAL_C -------- //

/**
Zero Cross Calibration VERGO_C Register*/
/**
Zero Cross Calibrartion Value VREGO_C*/
export const F_SIMO_ZERO_CROSS_CAL_C_ZXCALC_POS = 0
export const F_SIMO_ZERO_CROSS_CAL_C_ZXCALC = 0xf << F_SIMO_ZERO_CROSS_CAL_C_ZXCALC_POS

// -------- REGISTER ZERO_CROSS_CAL_D -------- //

/**
Zero Cross Calibration VERGO_D Register*/
/**
Zero Cross Calibrartion Value VREGO_D*/
export const F_SIMO_ZERO_CROSS_CAL_D_ZXCALD_POS = 0
export const F_SIMO_ZERO_CROSS_CAL_D_ZXCALD = 0xf << F_SIMO_ZERO_CROSS_CAL_D_ZXCALD_POS

// -------- PERIPHERAL TMR -------- //

export interface TMR_t {
    CNT: $Reg
    CMP: $Reg
    PWM: $Reg
    INTFL: $Reg
    CTRL0: $Reg
    NOLCMP: $Reg
    CTRL1: $Reg
    WKFL: $Reg
}

// -------- REGISTER CNT -------- //

/**
Timer Counter Register.*/
/**
The current count value for the timer. This field increments as the timer counts.*/
export const F_TMR_CNT_COUNT_POS = 0
export const F_TMR_CNT_COUNT = 0xffffffff << F_TMR_CNT_COUNT_POS

// -------- REGISTER CMP -------- //

/**
Timer Compare Register.*/
/**
The value in this register is used as the compare value for the timer's count value. The compare field meaning is determined by the specific mode of the timer.*/
export const F_TMR_CMP_COMPARE_POS = 0
export const F_TMR_CMP_COMPARE = 0xffffffff << F_TMR_CMP_COMPARE_POS

// -------- REGISTER PWM -------- //

/**
Timer PWM Register.*/
/**
Timer PWM Match:

                In PWM Mode, this field sets the count value for the first transition period of the PWM cycle. At the end of the cycle where CNT equals PWM, the PWM output transitions to the second period of the PWM cycle. The second PWM period count is stored in the CMP register. The value set for PWM must me less than the value set in CMP for PWM mode operation. Timer Capture Value:
                In Capture, Compare, and Capture/Compare modes, this field is used to store the CNT value when a Capture, Compare, or Capture/Compare event occurs.*/
export const F_TMR_PWM_PWM_POS = 0
export const F_TMR_PWM_PWM = 0xffffffff << F_TMR_PWM_PWM_POS

// -------- REGISTER INTFL -------- //

/**
Timer Interrupt Status Register.*/
/**
Interrupt Flag for Timer A.*/
export const F_TMR_INTFL_IRQ_A_POS = 0
export const F_TMR_INTFL_IRQ_A = 0x1 << F_TMR_INTFL_IRQ_A_POS
/**
Write Done Flag for Timer A indicating the write is complete from APB to CLK_TMR domain.*/
export const F_TMR_INTFL_WRDONE_A_POS = 8
export const F_TMR_INTFL_WRDONE_A = 0x1 << F_TMR_INTFL_WRDONE_A_POS
/**
Write Disable to CNT/PWM for Timer A in the non-cascaded dual timer configuration.*/
export const F_TMR_INTFL_WR_DIS_A_POS = 9
export const F_TMR_INTFL_WR_DIS_A = 0x1 << F_TMR_INTFL_WR_DIS_A_POS
/**
Interrupt Flag for Timer B.*/
export const F_TMR_INTFL_IRQ_B_POS = 16
export const F_TMR_INTFL_IRQ_B = 0x1 << F_TMR_INTFL_IRQ_B_POS
/**
Write Done Flag for Timer B indicating the write is complete from APB to CLK_TMR domain.*/
export const F_TMR_INTFL_WRDONE_B_POS = 24
export const F_TMR_INTFL_WRDONE_B = 0x1 << F_TMR_INTFL_WRDONE_B_POS
/**
Write Disable to CNT/PWM for Timer B in the non-cascaded dual timer configuration.*/
export const F_TMR_INTFL_WR_DIS_B_POS = 25
export const F_TMR_INTFL_WR_DIS_B = 0x1 << F_TMR_INTFL_WR_DIS_B_POS

// -------- REGISTER CTRL0 -------- //

/**
Timer Control Register.*/
/**
Mode Select for Timer A*/
export const F_TMR_CTRL0_MODE_A_POS = 0
export const F_TMR_CTRL0_MODE_A = 0xf << F_TMR_CTRL0_MODE_A_POS
export const V_TMR_CTRL0_MODE_A_ONE_SHOT = 0
export const S_TMR_CTRL0_MODE_A_ONE_SHOT = 0 << F_TMR_CTRL0_MODE_A_POS
export const V_TMR_CTRL0_MODE_A_CONTINUOUS = 1
export const S_TMR_CTRL0_MODE_A_CONTINUOUS = 1 << F_TMR_CTRL0_MODE_A_POS
export const V_TMR_CTRL0_MODE_A_COUNTER = 2
export const S_TMR_CTRL0_MODE_A_COUNTER = 2 << F_TMR_CTRL0_MODE_A_POS
export const V_TMR_CTRL0_MODE_A_PWM = 3
export const S_TMR_CTRL0_MODE_A_PWM = 3 << F_TMR_CTRL0_MODE_A_POS
export const V_TMR_CTRL0_MODE_A_CAPTURE = 4
export const S_TMR_CTRL0_MODE_A_CAPTURE = 4 << F_TMR_CTRL0_MODE_A_POS
export const V_TMR_CTRL0_MODE_A_COMPARE = 5
export const S_TMR_CTRL0_MODE_A_COMPARE = 5 << F_TMR_CTRL0_MODE_A_POS
export const V_TMR_CTRL0_MODE_A_GATED = 6
export const S_TMR_CTRL0_MODE_A_GATED = 6 << F_TMR_CTRL0_MODE_A_POS
export const V_TMR_CTRL0_MODE_A_CAPCOMP = 7
export const S_TMR_CTRL0_MODE_A_CAPCOMP = 7 << F_TMR_CTRL0_MODE_A_POS
export const V_TMR_CTRL0_MODE_A_DUAL_EDGE = 8
export const S_TMR_CTRL0_MODE_A_DUAL_EDGE = 8 << F_TMR_CTRL0_MODE_A_POS
export const V_TMR_CTRL0_MODE_A_IGATED = 14
export const S_TMR_CTRL0_MODE_A_IGATED = 14 << F_TMR_CTRL0_MODE_A_POS
/**
Clock Divider Select for Timer A*/
export const F_TMR_CTRL0_CLKDIV_A_POS = 4
export const F_TMR_CTRL0_CLKDIV_A = 0xf << F_TMR_CTRL0_CLKDIV_A_POS
export const V_TMR_CTRL0_CLKDIV_A_DIV_BY_1 = 0
export const S_TMR_CTRL0_CLKDIV_A_DIV_BY_1 = 0 << F_TMR_CTRL0_CLKDIV_A_POS
export const V_TMR_CTRL0_CLKDIV_A_DIV_BY_2 = 1
export const S_TMR_CTRL0_CLKDIV_A_DIV_BY_2 = 1 << F_TMR_CTRL0_CLKDIV_A_POS
export const V_TMR_CTRL0_CLKDIV_A_DIV_BY_4 = 2
export const S_TMR_CTRL0_CLKDIV_A_DIV_BY_4 = 2 << F_TMR_CTRL0_CLKDIV_A_POS
export const V_TMR_CTRL0_CLKDIV_A_DIV_BY_8 = 3
export const S_TMR_CTRL0_CLKDIV_A_DIV_BY_8 = 3 << F_TMR_CTRL0_CLKDIV_A_POS
export const V_TMR_CTRL0_CLKDIV_A_DIV_BY_16 = 4
export const S_TMR_CTRL0_CLKDIV_A_DIV_BY_16 = 4 << F_TMR_CTRL0_CLKDIV_A_POS
export const V_TMR_CTRL0_CLKDIV_A_DIV_BY_32 = 5
export const S_TMR_CTRL0_CLKDIV_A_DIV_BY_32 = 5 << F_TMR_CTRL0_CLKDIV_A_POS
export const V_TMR_CTRL0_CLKDIV_A_DIV_BY_64 = 6
export const S_TMR_CTRL0_CLKDIV_A_DIV_BY_64 = 6 << F_TMR_CTRL0_CLKDIV_A_POS
export const V_TMR_CTRL0_CLKDIV_A_DIV_BY_128 = 7
export const S_TMR_CTRL0_CLKDIV_A_DIV_BY_128 = 7 << F_TMR_CTRL0_CLKDIV_A_POS
export const V_TMR_CTRL0_CLKDIV_A_DIV_BY_256 = 8
export const S_TMR_CTRL0_CLKDIV_A_DIV_BY_256 = 8 << F_TMR_CTRL0_CLKDIV_A_POS
export const V_TMR_CTRL0_CLKDIV_A_DIV_BY_512 = 9
export const S_TMR_CTRL0_CLKDIV_A_DIV_BY_512 = 9 << F_TMR_CTRL0_CLKDIV_A_POS
export const V_TMR_CTRL0_CLKDIV_A_DIV_BY_1024 = 10
export const S_TMR_CTRL0_CLKDIV_A_DIV_BY_1024 = 10 << F_TMR_CTRL0_CLKDIV_A_POS
export const V_TMR_CTRL0_CLKDIV_A_DIV_BY_2048 = 11
export const S_TMR_CTRL0_CLKDIV_A_DIV_BY_2048 = 11 << F_TMR_CTRL0_CLKDIV_A_POS
export const V_TMR_CTRL0_CLKDIV_A_DIV_BY_4096 = 12
export const S_TMR_CTRL0_CLKDIV_A_DIV_BY_4096 = 12 << F_TMR_CTRL0_CLKDIV_A_POS
/**
Timer Polarity for Timer A*/
export const F_TMR_CTRL0_POL_A_POS = 8
export const F_TMR_CTRL0_POL_A = 0x1 << F_TMR_CTRL0_POL_A_POS
/**
PWM Synchronization Mode for Timer A*/
export const F_TMR_CTRL0_PWMSYNC_A_POS = 9
export const F_TMR_CTRL0_PWMSYNC_A = 0x1 << F_TMR_CTRL0_PWMSYNC_A_POS
/**
PWM Phase A (Non-Overlapping High) Polarity for Timer A*/
export const F_TMR_CTRL0_NOLHPOL_A_POS = 10
export const F_TMR_CTRL0_NOLHPOL_A = 0x1 << F_TMR_CTRL0_NOLHPOL_A_POS
/**
PWM Phase A-Prime (Non-Overlapping Low) Polarity for Timer A*/
export const F_TMR_CTRL0_NOLLPOL_A_POS = 11
export const F_TMR_CTRL0_NOLLPOL_A = 0x1 << F_TMR_CTRL0_NOLLPOL_A_POS
/**
PWM Phase A-Prime Output Disable for Timer A*/
export const F_TMR_CTRL0_PWMCKBD_A_POS = 12
export const F_TMR_CTRL0_PWMCKBD_A = 0x1 << F_TMR_CTRL0_PWMCKBD_A_POS
/**
Resets all flip flops in the CLK_TMR domain for Timer A. Self-clears.*/
export const F_TMR_CTRL0_RST_A_POS = 13
export const F_TMR_CTRL0_RST_A = 0x1 << F_TMR_CTRL0_RST_A_POS
/**
Write 1 to Enable CLK_TMR for Timer A*/
export const F_TMR_CTRL0_CLKEN_A_POS = 14
export const F_TMR_CTRL0_CLKEN_A = 0x1 << F_TMR_CTRL0_CLKEN_A_POS
/**
Enable for Timer A*/
export const F_TMR_CTRL0_EN_A_POS = 15
export const F_TMR_CTRL0_EN_A = 0x1 << F_TMR_CTRL0_EN_A_POS
/**
Mode Select for Timer B*/
export const F_TMR_CTRL0_MODE_B_POS = 16
export const F_TMR_CTRL0_MODE_B = 0xf << F_TMR_CTRL0_MODE_B_POS
export const V_TMR_CTRL0_MODE_B_ONE_SHOT = 0
export const S_TMR_CTRL0_MODE_B_ONE_SHOT = 0 << F_TMR_CTRL0_MODE_B_POS
export const V_TMR_CTRL0_MODE_B_CONTINUOUS = 1
export const S_TMR_CTRL0_MODE_B_CONTINUOUS = 1 << F_TMR_CTRL0_MODE_B_POS
export const V_TMR_CTRL0_MODE_B_COUNTER = 2
export const S_TMR_CTRL0_MODE_B_COUNTER = 2 << F_TMR_CTRL0_MODE_B_POS
export const V_TMR_CTRL0_MODE_B_PWM = 3
export const S_TMR_CTRL0_MODE_B_PWM = 3 << F_TMR_CTRL0_MODE_B_POS
export const V_TMR_CTRL0_MODE_B_CAPTURE = 4
export const S_TMR_CTRL0_MODE_B_CAPTURE = 4 << F_TMR_CTRL0_MODE_B_POS
export const V_TMR_CTRL0_MODE_B_COMPARE = 5
export const S_TMR_CTRL0_MODE_B_COMPARE = 5 << F_TMR_CTRL0_MODE_B_POS
export const V_TMR_CTRL0_MODE_B_GATED = 6
export const S_TMR_CTRL0_MODE_B_GATED = 6 << F_TMR_CTRL0_MODE_B_POS
export const V_TMR_CTRL0_MODE_B_CAPCOMP = 7
export const S_TMR_CTRL0_MODE_B_CAPCOMP = 7 << F_TMR_CTRL0_MODE_B_POS
export const V_TMR_CTRL0_MODE_B_DUAL_EDGE = 8
export const S_TMR_CTRL0_MODE_B_DUAL_EDGE = 8 << F_TMR_CTRL0_MODE_B_POS
export const V_TMR_CTRL0_MODE_B_IGATED = 14
export const S_TMR_CTRL0_MODE_B_IGATED = 14 << F_TMR_CTRL0_MODE_B_POS
/**
Clock Divider Select for Timer B*/
export const F_TMR_CTRL0_CLKDIV_B_POS = 20
export const F_TMR_CTRL0_CLKDIV_B = 0xf << F_TMR_CTRL0_CLKDIV_B_POS
export const V_TMR_CTRL0_CLKDIV_B_DIV_BY_1 = 0
export const S_TMR_CTRL0_CLKDIV_B_DIV_BY_1 = 0 << F_TMR_CTRL0_CLKDIV_B_POS
export const V_TMR_CTRL0_CLKDIV_B_DIV_BY_2 = 1
export const S_TMR_CTRL0_CLKDIV_B_DIV_BY_2 = 1 << F_TMR_CTRL0_CLKDIV_B_POS
export const V_TMR_CTRL0_CLKDIV_B_DIV_BY_4 = 2
export const S_TMR_CTRL0_CLKDIV_B_DIV_BY_4 = 2 << F_TMR_CTRL0_CLKDIV_B_POS
export const V_TMR_CTRL0_CLKDIV_B_DIV_BY_8 = 3
export const S_TMR_CTRL0_CLKDIV_B_DIV_BY_8 = 3 << F_TMR_CTRL0_CLKDIV_B_POS
export const V_TMR_CTRL0_CLKDIV_B_DIV_BY_16 = 4
export const S_TMR_CTRL0_CLKDIV_B_DIV_BY_16 = 4 << F_TMR_CTRL0_CLKDIV_B_POS
export const V_TMR_CTRL0_CLKDIV_B_DIV_BY_32 = 5
export const S_TMR_CTRL0_CLKDIV_B_DIV_BY_32 = 5 << F_TMR_CTRL0_CLKDIV_B_POS
export const V_TMR_CTRL0_CLKDIV_B_DIV_BY_64 = 6
export const S_TMR_CTRL0_CLKDIV_B_DIV_BY_64 = 6 << F_TMR_CTRL0_CLKDIV_B_POS
export const V_TMR_CTRL0_CLKDIV_B_DIV_BY_128 = 7
export const S_TMR_CTRL0_CLKDIV_B_DIV_BY_128 = 7 << F_TMR_CTRL0_CLKDIV_B_POS
export const V_TMR_CTRL0_CLKDIV_B_DIV_BY_256 = 8
export const S_TMR_CTRL0_CLKDIV_B_DIV_BY_256 = 8 << F_TMR_CTRL0_CLKDIV_B_POS
export const V_TMR_CTRL0_CLKDIV_B_DIV_BY_512 = 9
export const S_TMR_CTRL0_CLKDIV_B_DIV_BY_512 = 9 << F_TMR_CTRL0_CLKDIV_B_POS
export const V_TMR_CTRL0_CLKDIV_B_DIV_BY_1024 = 10
export const S_TMR_CTRL0_CLKDIV_B_DIV_BY_1024 = 10 << F_TMR_CTRL0_CLKDIV_B_POS
export const V_TMR_CTRL0_CLKDIV_B_DIV_BY_2048 = 11
export const S_TMR_CTRL0_CLKDIV_B_DIV_BY_2048 = 11 << F_TMR_CTRL0_CLKDIV_B_POS
export const V_TMR_CTRL0_CLKDIV_B_DIV_BY_4096 = 12
export const S_TMR_CTRL0_CLKDIV_B_DIV_BY_4096 = 12 << F_TMR_CTRL0_CLKDIV_B_POS
/**
Timer Polarity for Timer B*/
export const F_TMR_CTRL0_POL_B_POS = 24
export const F_TMR_CTRL0_POL_B = 0x1 << F_TMR_CTRL0_POL_B_POS
/**
PWM Synchronization Mode for Timer B*/
export const F_TMR_CTRL0_PWMSYNC_B_POS = 25
export const F_TMR_CTRL0_PWMSYNC_B = 0x1 << F_TMR_CTRL0_PWMSYNC_B_POS
/**
PWM Phase A (Non-Overlapping High) Polarity for Timer B*/
export const F_TMR_CTRL0_NOLHPOL_B_POS = 26
export const F_TMR_CTRL0_NOLHPOL_B = 0x1 << F_TMR_CTRL0_NOLHPOL_B_POS
/**
PWM Phase A-Prime (Non-Overlapping Low) Polarity for Timer B*/
export const F_TMR_CTRL0_NOLLPOL_B_POS = 27
export const F_TMR_CTRL0_NOLLPOL_B = 0x1 << F_TMR_CTRL0_NOLLPOL_B_POS
/**
PWM Phase A-Prime Output Disable for Timer B*/
export const F_TMR_CTRL0_PWMCKBD_B_POS = 28
export const F_TMR_CTRL0_PWMCKBD_B = 0x1 << F_TMR_CTRL0_PWMCKBD_B_POS
/**
Resets all flip flops in the CLK_TMR domain for Timer B. Self-clears.*/
export const F_TMR_CTRL0_RST_B_POS = 29
export const F_TMR_CTRL0_RST_B = 0x1 << F_TMR_CTRL0_RST_B_POS
/**
Write 1 to Enable CLK_TMR for Timer B*/
export const F_TMR_CTRL0_CLKEN_B_POS = 30
export const F_TMR_CTRL0_CLKEN_B = 0x1 << F_TMR_CTRL0_CLKEN_B_POS
/**
Enable for Timer B*/
export const F_TMR_CTRL0_EN_B_POS = 31
export const F_TMR_CTRL0_EN_B = 0x1 << F_TMR_CTRL0_EN_B_POS

// -------- REGISTER NOLCMP -------- //

/**
Timer Non-Overlapping Compare Register.*/
/**
Non-Overlapping Low Compare value for Timer A controls the time between the falling edge of PWM Phase A and the next rising edge of PWM Phase A-Prime.*/
export const F_TMR_NOLCMP_LO_A_POS = 0
export const F_TMR_NOLCMP_LO_A = 0xff << F_TMR_NOLCMP_LO_A_POS
/**
Non-Overlapping High Compare value for Timer A controls the time between the falling edge of PWM Phase A-Prime and the next rising edge of PWM Phase A.*/
export const F_TMR_NOLCMP_HI_A_POS = 8
export const F_TMR_NOLCMP_HI_A = 0xff << F_TMR_NOLCMP_HI_A_POS
/**
Non-Overlapping Low Compare value for Timer B controls the time between the falling edge of PWM Phase A and the next rising edge of PWM Phase A-Prime.*/
export const F_TMR_NOLCMP_LO_B_POS = 16
export const F_TMR_NOLCMP_LO_B = 0xff << F_TMR_NOLCMP_LO_B_POS
/**
Non-Overlapping High Compare value for Timer B controls the time between the falling edge of PWM Phase A-Prime and the next rising edge of PWM Phase A.*/
export const F_TMR_NOLCMP_HI_B_POS = 24
export const F_TMR_NOLCMP_HI_B = 0xff << F_TMR_NOLCMP_HI_B_POS

// -------- REGISTER CTRL1 -------- //

/**
Timer Configuration Register.*/
/**
Timer Clock Select for Timer A*/
export const F_TMR_CTRL1_CLKSEL_A_POS = 0
export const F_TMR_CTRL1_CLKSEL_A = 0x3 << F_TMR_CTRL1_CLKSEL_A_POS
/**
Timer A Enable Status*/
export const F_TMR_CTRL1_CLKEN_A_POS = 2
export const F_TMR_CTRL1_CLKEN_A = 0x1 << F_TMR_CTRL1_CLKEN_A_POS
/**
CLK_TMR Ready Flag for Timer A*/
export const F_TMR_CTRL1_CLKRDY_A_POS = 3
export const F_TMR_CTRL1_CLKRDY_A = 0x1 << F_TMR_CTRL1_CLKRDY_A_POS
/**
Event Select for Timer A*/
export const F_TMR_CTRL1_EVENT_SEL_A_POS = 4
export const F_TMR_CTRL1_EVENT_SEL_A = 0x7 << F_TMR_CTRL1_EVENT_SEL_A_POS
/**
Negative Edge Trigger for Event for Timer A*/
export const F_TMR_CTRL1_NEGTRIG_A_POS = 7
export const F_TMR_CTRL1_NEGTRIG_A = 0x1 << F_TMR_CTRL1_NEGTRIG_A_POS
/**
Interrupt Enable for Timer A*/
export const F_TMR_CTRL1_IE_A_POS = 8
export const F_TMR_CTRL1_IE_A = 0x1 << F_TMR_CTRL1_IE_A_POS
/**
Capture Event Select for Timer A*/
export const F_TMR_CTRL1_CAPEVENT_SEL_A_POS = 9
export const F_TMR_CTRL1_CAPEVENT_SEL_A = 0x3 << F_TMR_CTRL1_CAPEVENT_SEL_A_POS
/**
Software Capture Event for Timer A*/
export const F_TMR_CTRL1_SW_CAPEVENT_A_POS = 11
export const F_TMR_CTRL1_SW_CAPEVENT_A = 0x1 << F_TMR_CTRL1_SW_CAPEVENT_A_POS
/**
Wake-Up Enable for Timer A*/
export const F_TMR_CTRL1_WE_A_POS = 12
export const F_TMR_CTRL1_WE_A = 0x1 << F_TMR_CTRL1_WE_A_POS
/**
OUT_OE_O Enable for Modes 0, 1,and 5 for Timer A*/
export const F_TMR_CTRL1_OUTEN_A_POS = 13
export const F_TMR_CTRL1_OUTEN_A = 0x1 << F_TMR_CTRL1_OUTEN_A_POS
/**
PWM_CKB_EN_O Enable for Modes other than Mode 3 for Timer A*/
export const F_TMR_CTRL1_OUTBEN_A_POS = 14
export const F_TMR_CTRL1_OUTBEN_A = 0x1 << F_TMR_CTRL1_OUTBEN_A_POS
/**
Timer Clock Select for Timer B*/
export const F_TMR_CTRL1_CLKSEL_B_POS = 16
export const F_TMR_CTRL1_CLKSEL_B = 0x3 << F_TMR_CTRL1_CLKSEL_B_POS
/**
Timer B Enable Status*/
export const F_TMR_CTRL1_CLKEN_B_POS = 18
export const F_TMR_CTRL1_CLKEN_B = 0x1 << F_TMR_CTRL1_CLKEN_B_POS
/**
CLK_TMR Ready Flag for Timer B*/
export const F_TMR_CTRL1_CLKRDY_B_POS = 19
export const F_TMR_CTRL1_CLKRDY_B = 0x1 << F_TMR_CTRL1_CLKRDY_B_POS
/**
Event Select for Timer B*/
export const F_TMR_CTRL1_EVENT_SEL_B_POS = 20
export const F_TMR_CTRL1_EVENT_SEL_B = 0x7 << F_TMR_CTRL1_EVENT_SEL_B_POS
/**
Negative Edge Trigger for Event for Timer B*/
export const F_TMR_CTRL1_NEGTRIG_B_POS = 23
export const F_TMR_CTRL1_NEGTRIG_B = 0x1 << F_TMR_CTRL1_NEGTRIG_B_POS
/**
Interrupt Enable for Timer B*/
export const F_TMR_CTRL1_IE_B_POS = 24
export const F_TMR_CTRL1_IE_B = 0x1 << F_TMR_CTRL1_IE_B_POS
/**
Capture Event Select for Timer B*/
export const F_TMR_CTRL1_CAPEVENT_SEL_B_POS = 25
export const F_TMR_CTRL1_CAPEVENT_SEL_B = 0x3 << F_TMR_CTRL1_CAPEVENT_SEL_B_POS
/**
Software Capture Event for Timer B*/
export const F_TMR_CTRL1_SW_CAPEVENT_B_POS = 27
export const F_TMR_CTRL1_SW_CAPEVENT_B = 0x1 << F_TMR_CTRL1_SW_CAPEVENT_B_POS
/**
Wake-Up Enable for Timer B*/
export const F_TMR_CTRL1_WE_B_POS = 28
export const F_TMR_CTRL1_WE_B = 0x1 << F_TMR_CTRL1_WE_B_POS
/**
Cascade two 16-bit timers into one 32-bit timer. Only available when C_TMR16=0 adn C_DUALTMR16=1.*/
export const F_TMR_CTRL1_CASCADE_POS = 31
export const F_TMR_CTRL1_CASCADE = 0x1 << F_TMR_CTRL1_CASCADE_POS

// -------- REGISTER WKFL -------- //

/**
Timer Wakeup Status Register.*/
/**
Wake-Up Flag for Timer A*/
export const F_TMR_WKFL_A_POS = 0
export const F_TMR_WKFL_A = 0x1 << F_TMR_WKFL_A_POS
/**
Wake-Up Flag for Timer B*/
export const F_TMR_WKFL_B_POS = 16
export const F_TMR_WKFL_B = 0x1 << F_TMR_WKFL_B_POS

// -------- PERIPHERAL UART -------- //

export interface UART_t {
    CTRL: $Reg
    STATUS: $Reg
    INT_EN: $Reg
    INT_FL: $Reg
    CLKDIV: $Reg
    OSR: $Reg
    TXPEEK: $Reg
    PNR: $Reg
    FIFO: $Reg
    DMA: $Reg
    WKEN: $Reg
    WKFL: $Reg
}

// -------- REGISTER CTRL -------- //

/**
Control register*/
/**
This field specifies the depth of receive FIFO for interrupt generation (value 0 and > 16 are ignored) */
export const F_UART_CTRL_RX_THD_VAL_POS = 0
export const F_UART_CTRL_RX_THD_VAL = 0xf << F_UART_CTRL_RX_THD_VAL_POS
/**
Parity Enable*/
export const F_UART_CTRL_PAR_EN_POS = 4
export const F_UART_CTRL_PAR_EN = 0x1 << F_UART_CTRL_PAR_EN_POS
/**
when PAREN=1 selects odd or even parity odd is 1 even is 0*/
export const F_UART_CTRL_PAR_EO_POS = 5
export const F_UART_CTRL_PAR_EO = 0x1 << F_UART_CTRL_PAR_EO_POS
/**
Selects parity based on 1s or 0s count (when PAREN=1) */
export const F_UART_CTRL_PAR_MD_POS = 6
export const F_UART_CTRL_PAR_MD = 0x1 << F_UART_CTRL_PAR_MD_POS
/**
CTS Sampling Disable */
export const F_UART_CTRL_CTS_DIS_POS = 7
export const F_UART_CTRL_CTS_DIS = 0x1 << F_UART_CTRL_CTS_DIS_POS
/**
Flushes the TX FIFO buffer. This bit is automatically cleared by hardware when flush is completed.*/
export const F_UART_CTRL_TX_FLUSH_POS = 8
export const F_UART_CTRL_TX_FLUSH = 0x1 << F_UART_CTRL_TX_FLUSH_POS
/**
Flushes the RX FIFO buffer. This bit is automatically cleared by hardware when flush is completed.*/
export const F_UART_CTRL_RX_FLUSH_POS = 9
export const F_UART_CTRL_RX_FLUSH = 0x1 << F_UART_CTRL_RX_FLUSH_POS
/**
Selects UART character size*/
export const F_UART_CTRL_CHAR_SIZE_POS = 10
export const F_UART_CTRL_CHAR_SIZE = 0x3 << F_UART_CTRL_CHAR_SIZE_POS
export const V_UART_CTRL_CHAR_SIZE_5BITS = 0
export const S_UART_CTRL_CHAR_SIZE_5BITS = 0 << F_UART_CTRL_CHAR_SIZE_POS
export const V_UART_CTRL_CHAR_SIZE_6BITS = 1
export const S_UART_CTRL_CHAR_SIZE_6BITS = 1 << F_UART_CTRL_CHAR_SIZE_POS
export const V_UART_CTRL_CHAR_SIZE_7BITS = 2
export const S_UART_CTRL_CHAR_SIZE_7BITS = 2 << F_UART_CTRL_CHAR_SIZE_POS
export const V_UART_CTRL_CHAR_SIZE_8BITS = 3
export const S_UART_CTRL_CHAR_SIZE_8BITS = 3 << F_UART_CTRL_CHAR_SIZE_POS
/**
Selects the number of stop bits that will be generated*/
export const F_UART_CTRL_STOPBITS_POS = 12
export const F_UART_CTRL_STOPBITS = 0x1 << F_UART_CTRL_STOPBITS_POS
/**
Enables/disables hardware flow control*/
export const F_UART_CTRL_HFC_EN_POS = 13
export const F_UART_CTRL_HFC_EN = 0x1 << F_UART_CTRL_HFC_EN_POS
/**
Hardware Flow Control RTS Mode*/
export const F_UART_CTRL_RTSDC_POS = 14
export const F_UART_CTRL_RTSDC = 0x1 << F_UART_CTRL_RTSDC_POS
/**
Baud clock enable*/
export const F_UART_CTRL_BCLKEN_POS = 15
export const F_UART_CTRL_BCLKEN = 0x1 << F_UART_CTRL_BCLKEN_POS
/**
To select the UART clock source for the UART engine (except APB registers). Secondary clock (used for baud rate generator) can be asynchronous from APB clock.*/
export const F_UART_CTRL_BCLKSRC_POS = 16
export const F_UART_CTRL_BCLKSRC = 0x3 << F_UART_CTRL_BCLKSRC_POS
export const V_UART_CTRL_BCLKSRC_PERIPHERAL_CLOCK = 0
export const S_UART_CTRL_BCLKSRC_PERIPHERAL_CLOCK = 0 << F_UART_CTRL_BCLKSRC_POS
export const V_UART_CTRL_BCLKSRC_EXTERNAL_CLOCK = 1
export const S_UART_CTRL_BCLKSRC_EXTERNAL_CLOCK = 1 << F_UART_CTRL_BCLKSRC_POS
export const V_UART_CTRL_BCLKSRC_CLK2 = 2
export const S_UART_CTRL_BCLKSRC_CLK2 = 2 << F_UART_CTRL_BCLKSRC_POS
export const V_UART_CTRL_BCLKSRC_CLK3 = 3
export const S_UART_CTRL_BCLKSRC_CLK3 = 3 << F_UART_CTRL_BCLKSRC_POS
/**
Data/Parity bit frame error detection enable*/
export const F_UART_CTRL_DPFE_EN_POS = 18
export const F_UART_CTRL_DPFE_EN = 0x1 << F_UART_CTRL_DPFE_EN_POS
/**
Baud clock Ready read only bit*/
export const F_UART_CTRL_BCLKRDY_POS = 19
export const F_UART_CTRL_BCLKRDY = 0x1 << F_UART_CTRL_BCLKRDY_POS
/**
UART Clock Auto Gating mode*/
export const F_UART_CTRL_UCAGM_POS = 20
export const F_UART_CTRL_UCAGM = 0x1 << F_UART_CTRL_UCAGM_POS
/**
Fractional Division Mode*/
export const F_UART_CTRL_FDM_POS = 21
export const F_UART_CTRL_FDM = 0x1 << F_UART_CTRL_FDM_POS
/**
RX Dual Edge Sampling Mode*/
export const F_UART_CTRL_DESM_POS = 22
export const F_UART_CTRL_DESM = 0x1 << F_UART_CTRL_DESM_POS

// -------- REGISTER STATUS -------- //

/**
Status register*/
/**
Read-only flag indicating the UART transmit status*/
export const F_UART_STATUS_TX_BUSY_POS = 0
export const F_UART_STATUS_TX_BUSY = 0x1 << F_UART_STATUS_TX_BUSY_POS
/**
Read-only flag indicating the UART receiver status*/
export const F_UART_STATUS_RX_BUSY_POS = 1
export const F_UART_STATUS_RX_BUSY = 0x1 << F_UART_STATUS_RX_BUSY_POS
/**
Read-only flag indicating the RX FIFO state*/
export const F_UART_STATUS_RX_EM_POS = 4
export const F_UART_STATUS_RX_EM = 0x1 << F_UART_STATUS_RX_EM_POS
/**
Read-only flag indicating the RX FIFO state*/
export const F_UART_STATUS_RX_FULL_POS = 5
export const F_UART_STATUS_RX_FULL = 0x1 << F_UART_STATUS_RX_FULL_POS
/**
Read-only flag indicating the TX FIFO state*/
export const F_UART_STATUS_TX_EM_POS = 6
export const F_UART_STATUS_TX_EM = 0x1 << F_UART_STATUS_TX_EM_POS
/**
Read-only flag indicating the TX FIFO state*/
export const F_UART_STATUS_TX_FULL_POS = 7
export const F_UART_STATUS_TX_FULL = 0x1 << F_UART_STATUS_TX_FULL_POS
/**
Indicates the number of bytes currently in the RX FIFO (0-RX FIFO_ELTS) */
export const F_UART_STATUS_RX_LVL_POS = 8
export const F_UART_STATUS_RX_LVL = 0xf << F_UART_STATUS_RX_LVL_POS
/**
Indicates the number of bytes currently in the TX FIFO (0-TX FIFO_ELTS) */
export const F_UART_STATUS_TX_LVL_POS = 12
export const F_UART_STATUS_TX_LVL = 0xf << F_UART_STATUS_TX_LVL_POS

// -------- REGISTER INT_EN -------- //

/**
Interrupt Enable control register*/
/**
Enable Interrupt For RX Frame Error*/
export const F_UART_INT_EN_RX_FERR_POS = 0
export const F_UART_INT_EN_RX_FERR = 0x1 << F_UART_INT_EN_RX_FERR_POS
/**
Enable Interrupt For RX Parity Error*/
export const F_UART_INT_EN_RX_PAR_POS = 1
export const F_UART_INT_EN_RX_PAR = 0x1 << F_UART_INT_EN_RX_PAR_POS
/**
Enable Interrupt For CTS signal change Error*/
export const F_UART_INT_EN_CTS_EV_POS = 2
export const F_UART_INT_EN_CTS_EV = 0x1 << F_UART_INT_EN_CTS_EV_POS
/**
Enable Interrupt For RX FIFO Overrun Error*/
export const F_UART_INT_EN_RX_OV_POS = 3
export const F_UART_INT_EN_RX_OV = 0x1 << F_UART_INT_EN_RX_OV_POS
/**
Enable Interrupt For RX FIFO reaches the number of bytes configured by RXTHD*/
export const F_UART_INT_EN_RX_THD_POS = 4
export const F_UART_INT_EN_RX_THD = 0x1 << F_UART_INT_EN_RX_THD_POS
/**
Enable Interrupt For TX FIFO has half empty*/
export const F_UART_INT_EN_TX_HE_POS = 6
export const F_UART_INT_EN_TX_HE = 0x1 << F_UART_INT_EN_TX_HE_POS

// -------- REGISTER INT_FL -------- //

/**
Interrupt status flags Control register*/
/**
Flag for RX Frame Error Interrupt.*/
export const F_UART_INT_FL_RX_FERR_POS = 0
export const F_UART_INT_FL_RX_FERR = 0x1 << F_UART_INT_FL_RX_FERR_POS
/**
Flag for RX Parity Error interrupt*/
export const F_UART_INT_FL_RX_PAR_POS = 1
export const F_UART_INT_FL_RX_PAR = 0x1 << F_UART_INT_FL_RX_PAR_POS
/**
Flag for CTS signal change interrupt (hardware flow control disabled) */
export const F_UART_INT_FL_CTS_EV_POS = 2
export const F_UART_INT_FL_CTS_EV = 0x1 << F_UART_INT_FL_CTS_EV_POS
/**
Flag for RX FIFO Overrun interrupt*/
export const F_UART_INT_FL_RX_OV_POS = 3
export const F_UART_INT_FL_RX_OV = 0x1 << F_UART_INT_FL_RX_OV_POS
/**
Flag for interrupt when RX FIFO reaches the number of bytes configured by the RXTHD field*/
export const F_UART_INT_FL_RX_THD_POS = 4
export const F_UART_INT_FL_RX_THD = 0x1 << F_UART_INT_FL_RX_THD_POS
/**
Flag for interrupt when TX FIFO is half empty*/
export const F_UART_INT_FL_TX_HE_POS = 6
export const F_UART_INT_FL_TX_HE = 0x1 << F_UART_INT_FL_TX_HE_POS

// -------- REGISTER CLKDIV -------- //

/**
Clock Divider register*/
/**
Baud rate divisor value*/
export const F_UART_CLKDIV_CLKDIV_POS = 0
export const F_UART_CLKDIV_CLKDIV = 0xfffff << F_UART_CLKDIV_CLKDIV_POS

// -------- REGISTER OSR -------- //

/**
Over Sampling Rate register*/
/**
OSR*/
export const F_UART_OSR_OSR_POS = 0
export const F_UART_OSR_OSR = 0x7 << F_UART_OSR_OSR_POS

// -------- REGISTER TXPEEK -------- //

/**
TX FIFO Output Peek register*/
/**
Read TX FIFO next data. Reading from this field does not affect the contents of TX FIFO. Note that the parity bit is available from this field.*/
export const F_UART_TXPEEK_DATA_POS = 0
export const F_UART_TXPEEK_DATA = 0xff << F_UART_TXPEEK_DATA_POS

// -------- REGISTER PNR -------- //

/**
 Pin register*/
/**
Current sampled value of CTS IO*/
export const F_UART_PNR_CTS_POS = 0
export const F_UART_PNR_CTS = 0x1 << F_UART_PNR_CTS_POS
/**
This bit controls the value to apply on the RTS IO. If set to 1, the RTS IO is set to high level. If set to 0, the RTS IO is set to low level.*/
export const F_UART_PNR_RTS_POS = 1
export const F_UART_PNR_RTS = 0x1 << F_UART_PNR_RTS_POS

// -------- REGISTER FIFO -------- //

/**
FIFO Read/Write register*/
/**
Load/unload location for TX and RX FIFO buffers.*/
export const F_UART_FIFO_DATA_POS = 0
export const F_UART_FIFO_DATA = 0xff << F_UART_FIFO_DATA_POS
/**
Parity error flag for next byte to be read from FIFO.*/
export const F_UART_FIFO_RX_PAR_POS = 8
export const F_UART_FIFO_RX_PAR = 0x1 << F_UART_FIFO_RX_PAR_POS

// -------- REGISTER DMA -------- //

/**
DMA Configuration register*/
/**
TX FIFO Level DMA Trigger If the TX FIFO level is less than this value, then the TX FIFO DMA interface will send a signal to system DMA to notify that TX FIFO is ready to receive data from memory.*/
export const F_UART_DMA_TX_THD_VAL_POS = 0
export const F_UART_DMA_TX_THD_VAL = 0xf << F_UART_DMA_TX_THD_VAL_POS
/**
TX DMA channel enable*/
export const F_UART_DMA_TX_EN_POS = 4
export const F_UART_DMA_TX_EN = 0x1 << F_UART_DMA_TX_EN_POS
/**
Rx FIFO Level DMA Trigger If the RX FIFO level is greater than this value, then the RX FIFO DMA interface will send a signal to the system DMA to notify that RX FIFO has characters to transfer to memory.*/
export const F_UART_DMA_RX_THD_VAL_POS = 5
export const F_UART_DMA_RX_THD_VAL = 0xf << F_UART_DMA_RX_THD_VAL_POS
/**
RX DMA channel enable*/
export const F_UART_DMA_RX_EN_POS = 9
export const F_UART_DMA_RX_EN = 0x1 << F_UART_DMA_RX_EN_POS

// -------- REGISTER WKEN -------- //

/**
Wake up enable Control register*/
/**
Wake-Up Enable for RX FIFO Not Empty*/
export const F_UART_WKEN_RX_NE_POS = 0
export const F_UART_WKEN_RX_NE = 0x1 << F_UART_WKEN_RX_NE_POS
/**
Wake-Up Enable for RX FIFO Full*/
export const F_UART_WKEN_RX_FULL_POS = 1
export const F_UART_WKEN_RX_FULL = 0x1 << F_UART_WKEN_RX_FULL_POS
/**
Wake-Up Enable for RX FIFO Threshold Met*/
export const F_UART_WKEN_RX_THD_POS = 2
export const F_UART_WKEN_RX_THD = 0x1 << F_UART_WKEN_RX_THD_POS

// -------- REGISTER WKFL -------- //

/**
Wake up Flags register*/
/**
Wake-Up Flag for RX FIFO Not Empty*/
export const F_UART_WKFL_RX_NE_POS = 0
export const F_UART_WKFL_RX_NE = 0x1 << F_UART_WKFL_RX_NE_POS
/**
Wake-Up Flag for RX FIFO Full*/
export const F_UART_WKFL_RX_FULL_POS = 1
export const F_UART_WKFL_RX_FULL = 0x1 << F_UART_WKFL_RX_FULL_POS
/**
Wake-Up Flag for RX FIFO Threshold Met*/
export const F_UART_WKFL_RX_THD_POS = 2
export const F_UART_WKFL_RX_THD = 0x1 << F_UART_WKFL_RX_THD_POS

// -------- PERIPHERAL WDT -------- //

export interface WDT_t {
    CTRL: $Reg
    RST: $Reg
    CLKSEL: $Reg
    CNT: $Reg
}

// -------- REGISTER CTRL -------- //

/**
Watchdog Timer Control Register.*/
/**
Windowed Watchdog Interrupt Upper Limit. Sets the number of WDTCLK cycles until a windowed watchdog timer interrupt is generated (if enabled) if the CPU does not write the windowed watchdog reset sequence to the WWDT_RST register before the watchdog timer has counted this time period since the last timer reset.*/
export const F_WDT_CTRL_INT_LATE_VAL_POS = 0
export const F_WDT_CTRL_INT_LATE_VAL = 0xf << F_WDT_CTRL_INT_LATE_VAL_POS
export const V_WDT_CTRL_INT_LATE_VAL_WDT2POW31 = 0
export const S_WDT_CTRL_INT_LATE_VAL_WDT2POW31 = 0 << F_WDT_CTRL_INT_LATE_VAL_POS
export const V_WDT_CTRL_INT_LATE_VAL_WDT2POW30 = 1
export const S_WDT_CTRL_INT_LATE_VAL_WDT2POW30 = 1 << F_WDT_CTRL_INT_LATE_VAL_POS
export const V_WDT_CTRL_INT_LATE_VAL_WDT2POW29 = 2
export const S_WDT_CTRL_INT_LATE_VAL_WDT2POW29 = 2 << F_WDT_CTRL_INT_LATE_VAL_POS
export const V_WDT_CTRL_INT_LATE_VAL_WDT2POW28 = 3
export const S_WDT_CTRL_INT_LATE_VAL_WDT2POW28 = 3 << F_WDT_CTRL_INT_LATE_VAL_POS
export const V_WDT_CTRL_INT_LATE_VAL_WDT2POW27 = 4
export const S_WDT_CTRL_INT_LATE_VAL_WDT2POW27 = 4 << F_WDT_CTRL_INT_LATE_VAL_POS
export const V_WDT_CTRL_INT_LATE_VAL_WDT2POW26 = 5
export const S_WDT_CTRL_INT_LATE_VAL_WDT2POW26 = 5 << F_WDT_CTRL_INT_LATE_VAL_POS
export const V_WDT_CTRL_INT_LATE_VAL_WDT2POW25 = 6
export const S_WDT_CTRL_INT_LATE_VAL_WDT2POW25 = 6 << F_WDT_CTRL_INT_LATE_VAL_POS
export const V_WDT_CTRL_INT_LATE_VAL_WDT2POW24 = 7
export const S_WDT_CTRL_INT_LATE_VAL_WDT2POW24 = 7 << F_WDT_CTRL_INT_LATE_VAL_POS
export const V_WDT_CTRL_INT_LATE_VAL_WDT2POW23 = 8
export const S_WDT_CTRL_INT_LATE_VAL_WDT2POW23 = 8 << F_WDT_CTRL_INT_LATE_VAL_POS
export const V_WDT_CTRL_INT_LATE_VAL_WDT2POW22 = 9
export const S_WDT_CTRL_INT_LATE_VAL_WDT2POW22 = 9 << F_WDT_CTRL_INT_LATE_VAL_POS
export const V_WDT_CTRL_INT_LATE_VAL_WDT2POW21 = 10
export const S_WDT_CTRL_INT_LATE_VAL_WDT2POW21 = 10 << F_WDT_CTRL_INT_LATE_VAL_POS
export const V_WDT_CTRL_INT_LATE_VAL_WDT2POW20 = 11
export const S_WDT_CTRL_INT_LATE_VAL_WDT2POW20 = 11 << F_WDT_CTRL_INT_LATE_VAL_POS
export const V_WDT_CTRL_INT_LATE_VAL_WDT2POW19 = 12
export const S_WDT_CTRL_INT_LATE_VAL_WDT2POW19 = 12 << F_WDT_CTRL_INT_LATE_VAL_POS
export const V_WDT_CTRL_INT_LATE_VAL_WDT2POW18 = 13
export const S_WDT_CTRL_INT_LATE_VAL_WDT2POW18 = 13 << F_WDT_CTRL_INT_LATE_VAL_POS
export const V_WDT_CTRL_INT_LATE_VAL_WDT2POW17 = 14
export const S_WDT_CTRL_INT_LATE_VAL_WDT2POW17 = 14 << F_WDT_CTRL_INT_LATE_VAL_POS
export const V_WDT_CTRL_INT_LATE_VAL_WDT2POW16 = 15
export const S_WDT_CTRL_INT_LATE_VAL_WDT2POW16 = 15 << F_WDT_CTRL_INT_LATE_VAL_POS
/**
Windowed Watchdog Reset Upper Limit. Sets the number of WDTCLK cycles until a system reset occurs (if enabled) if the CPU does not write the watchdog reset sequence to the WDT_RST register before the watchdog timer has counted this time period since the last timer reset.*/
export const F_WDT_CTRL_RST_LATE_VAL_POS = 4
export const F_WDT_CTRL_RST_LATE_VAL = 0xf << F_WDT_CTRL_RST_LATE_VAL_POS
export const V_WDT_CTRL_RST_LATE_VAL_WDT2POW31 = 0
export const S_WDT_CTRL_RST_LATE_VAL_WDT2POW31 = 0 << F_WDT_CTRL_RST_LATE_VAL_POS
export const V_WDT_CTRL_RST_LATE_VAL_WDT2POW30 = 1
export const S_WDT_CTRL_RST_LATE_VAL_WDT2POW30 = 1 << F_WDT_CTRL_RST_LATE_VAL_POS
export const V_WDT_CTRL_RST_LATE_VAL_WDT2POW29 = 2
export const S_WDT_CTRL_RST_LATE_VAL_WDT2POW29 = 2 << F_WDT_CTRL_RST_LATE_VAL_POS
export const V_WDT_CTRL_RST_LATE_VAL_WDT2POW28 = 3
export const S_WDT_CTRL_RST_LATE_VAL_WDT2POW28 = 3 << F_WDT_CTRL_RST_LATE_VAL_POS
export const V_WDT_CTRL_RST_LATE_VAL_WDT2POW27 = 4
export const S_WDT_CTRL_RST_LATE_VAL_WDT2POW27 = 4 << F_WDT_CTRL_RST_LATE_VAL_POS
export const V_WDT_CTRL_RST_LATE_VAL_WDT2POW26 = 5
export const S_WDT_CTRL_RST_LATE_VAL_WDT2POW26 = 5 << F_WDT_CTRL_RST_LATE_VAL_POS
export const V_WDT_CTRL_RST_LATE_VAL_WDT2POW25 = 6
export const S_WDT_CTRL_RST_LATE_VAL_WDT2POW25 = 6 << F_WDT_CTRL_RST_LATE_VAL_POS
export const V_WDT_CTRL_RST_LATE_VAL_WDT2POW24 = 7
export const S_WDT_CTRL_RST_LATE_VAL_WDT2POW24 = 7 << F_WDT_CTRL_RST_LATE_VAL_POS
export const V_WDT_CTRL_RST_LATE_VAL_WDT2POW23 = 8
export const S_WDT_CTRL_RST_LATE_VAL_WDT2POW23 = 8 << F_WDT_CTRL_RST_LATE_VAL_POS
export const V_WDT_CTRL_RST_LATE_VAL_WDT2POW22 = 9
export const S_WDT_CTRL_RST_LATE_VAL_WDT2POW22 = 9 << F_WDT_CTRL_RST_LATE_VAL_POS
export const V_WDT_CTRL_RST_LATE_VAL_WDT2POW21 = 10
export const S_WDT_CTRL_RST_LATE_VAL_WDT2POW21 = 10 << F_WDT_CTRL_RST_LATE_VAL_POS
export const V_WDT_CTRL_RST_LATE_VAL_WDT2POW20 = 11
export const S_WDT_CTRL_RST_LATE_VAL_WDT2POW20 = 11 << F_WDT_CTRL_RST_LATE_VAL_POS
export const V_WDT_CTRL_RST_LATE_VAL_WDT2POW19 = 12
export const S_WDT_CTRL_RST_LATE_VAL_WDT2POW19 = 12 << F_WDT_CTRL_RST_LATE_VAL_POS
export const V_WDT_CTRL_RST_LATE_VAL_WDT2POW18 = 13
export const S_WDT_CTRL_RST_LATE_VAL_WDT2POW18 = 13 << F_WDT_CTRL_RST_LATE_VAL_POS
export const V_WDT_CTRL_RST_LATE_VAL_WDT2POW17 = 14
export const S_WDT_CTRL_RST_LATE_VAL_WDT2POW17 = 14 << F_WDT_CTRL_RST_LATE_VAL_POS
export const V_WDT_CTRL_RST_LATE_VAL_WDT2POW16 = 15
export const S_WDT_CTRL_RST_LATE_VAL_WDT2POW16 = 15 << F_WDT_CTRL_RST_LATE_VAL_POS
/**
Windowed Watchdog Timer Enable.*/
export const F_WDT_CTRL_EN_POS = 8
export const F_WDT_CTRL_EN = 0x1 << F_WDT_CTRL_EN_POS
export const V_WDT_CTRL_EN_DIS = 0
export const S_WDT_CTRL_EN_DIS = 0 << F_WDT_CTRL_EN_POS
export const V_WDT_CTRL_EN_EN = 1
export const S_WDT_CTRL_EN_EN = 1 << F_WDT_CTRL_EN_POS
/**
Windowed Watchdog Timer Interrupt Flag Too Late.*/
export const F_WDT_CTRL_INT_LATE_POS = 9
export const F_WDT_CTRL_INT_LATE = 0x1 << F_WDT_CTRL_INT_LATE_POS
export const V_WDT_CTRL_INT_LATE_INACTIVE = 0
export const S_WDT_CTRL_INT_LATE_INACTIVE = 0 << F_WDT_CTRL_INT_LATE_POS
export const V_WDT_CTRL_INT_LATE_PENDING = 1
export const S_WDT_CTRL_INT_LATE_PENDING = 1 << F_WDT_CTRL_INT_LATE_POS
/**
Windowed Watchdog Timer Interrupt Enable.*/
export const F_WDT_CTRL_WDT_INT_EN_POS = 10
export const F_WDT_CTRL_WDT_INT_EN = 0x1 << F_WDT_CTRL_WDT_INT_EN_POS
export const V_WDT_CTRL_WDT_INT_EN_DIS = 0
export const S_WDT_CTRL_WDT_INT_EN_DIS = 0 << F_WDT_CTRL_WDT_INT_EN_POS
export const V_WDT_CTRL_WDT_INT_EN_EN = 1
export const S_WDT_CTRL_WDT_INT_EN_EN = 1 << F_WDT_CTRL_WDT_INT_EN_POS
/**
Windowed Watchdog Timer Reset Enable.*/
export const F_WDT_CTRL_WDT_RST_EN_POS = 11
export const F_WDT_CTRL_WDT_RST_EN = 0x1 << F_WDT_CTRL_WDT_RST_EN_POS
export const V_WDT_CTRL_WDT_RST_EN_DIS = 0
export const S_WDT_CTRL_WDT_RST_EN_DIS = 0 << F_WDT_CTRL_WDT_RST_EN_POS
export const V_WDT_CTRL_WDT_RST_EN_EN = 1
export const S_WDT_CTRL_WDT_RST_EN_EN = 1 << F_WDT_CTRL_WDT_RST_EN_POS
/**
Windowed Watchdog Timer Interrupt Flag Too Soon.*/
export const F_WDT_CTRL_INT_EARLY_POS = 12
export const F_WDT_CTRL_INT_EARLY = 0x1 << F_WDT_CTRL_INT_EARLY_POS
export const V_WDT_CTRL_INT_EARLY_INACTIVE = 0
export const S_WDT_CTRL_INT_EARLY_INACTIVE = 0 << F_WDT_CTRL_INT_EARLY_POS
export const V_WDT_CTRL_INT_EARLY_PENDING = 1
export const S_WDT_CTRL_INT_EARLY_PENDING = 1 << F_WDT_CTRL_INT_EARLY_POS
/**
Windowed Watchdog Interrupt Lower Limit. Sets the number of WDTCLK cycles that establishes the lower boundary of the watchdog window. A windowed watchdog timer interrupt is generated (if enabled) if the CPU writes the windowed watchdog reset sequence to the WWDT_RST register before the watchdog timer has counted this time period since the last timer reset.*/
export const F_WDT_CTRL_INT_EARLY_VAL_POS = 16
export const F_WDT_CTRL_INT_EARLY_VAL = 0xf << F_WDT_CTRL_INT_EARLY_VAL_POS
export const V_WDT_CTRL_INT_EARLY_VAL_WDT2POW31 = 0
export const S_WDT_CTRL_INT_EARLY_VAL_WDT2POW31 = 0 << F_WDT_CTRL_INT_EARLY_VAL_POS
export const V_WDT_CTRL_INT_EARLY_VAL_WDT2POW30 = 1
export const S_WDT_CTRL_INT_EARLY_VAL_WDT2POW30 = 1 << F_WDT_CTRL_INT_EARLY_VAL_POS
export const V_WDT_CTRL_INT_EARLY_VAL_WDT2POW29 = 2
export const S_WDT_CTRL_INT_EARLY_VAL_WDT2POW29 = 2 << F_WDT_CTRL_INT_EARLY_VAL_POS
export const V_WDT_CTRL_INT_EARLY_VAL_WDT2POW28 = 3
export const S_WDT_CTRL_INT_EARLY_VAL_WDT2POW28 = 3 << F_WDT_CTRL_INT_EARLY_VAL_POS
export const V_WDT_CTRL_INT_EARLY_VAL_WDT2POW27 = 4
export const S_WDT_CTRL_INT_EARLY_VAL_WDT2POW27 = 4 << F_WDT_CTRL_INT_EARLY_VAL_POS
export const V_WDT_CTRL_INT_EARLY_VAL_WDT2POW26 = 5
export const S_WDT_CTRL_INT_EARLY_VAL_WDT2POW26 = 5 << F_WDT_CTRL_INT_EARLY_VAL_POS
export const V_WDT_CTRL_INT_EARLY_VAL_WDT2POW25 = 6
export const S_WDT_CTRL_INT_EARLY_VAL_WDT2POW25 = 6 << F_WDT_CTRL_INT_EARLY_VAL_POS
export const V_WDT_CTRL_INT_EARLY_VAL_WDT2POW24 = 7
export const S_WDT_CTRL_INT_EARLY_VAL_WDT2POW24 = 7 << F_WDT_CTRL_INT_EARLY_VAL_POS
export const V_WDT_CTRL_INT_EARLY_VAL_WDT2POW23 = 8
export const S_WDT_CTRL_INT_EARLY_VAL_WDT2POW23 = 8 << F_WDT_CTRL_INT_EARLY_VAL_POS
export const V_WDT_CTRL_INT_EARLY_VAL_WDT2POW22 = 9
export const S_WDT_CTRL_INT_EARLY_VAL_WDT2POW22 = 9 << F_WDT_CTRL_INT_EARLY_VAL_POS
export const V_WDT_CTRL_INT_EARLY_VAL_WDT2POW21 = 10
export const S_WDT_CTRL_INT_EARLY_VAL_WDT2POW21 = 10 << F_WDT_CTRL_INT_EARLY_VAL_POS
export const V_WDT_CTRL_INT_EARLY_VAL_WDT2POW20 = 11
export const S_WDT_CTRL_INT_EARLY_VAL_WDT2POW20 = 11 << F_WDT_CTRL_INT_EARLY_VAL_POS
export const V_WDT_CTRL_INT_EARLY_VAL_WDT2POW19 = 12
export const S_WDT_CTRL_INT_EARLY_VAL_WDT2POW19 = 12 << F_WDT_CTRL_INT_EARLY_VAL_POS
export const V_WDT_CTRL_INT_EARLY_VAL_WDT2POW18 = 13
export const S_WDT_CTRL_INT_EARLY_VAL_WDT2POW18 = 13 << F_WDT_CTRL_INT_EARLY_VAL_POS
export const V_WDT_CTRL_INT_EARLY_VAL_WDT2POW17 = 14
export const S_WDT_CTRL_INT_EARLY_VAL_WDT2POW17 = 14 << F_WDT_CTRL_INT_EARLY_VAL_POS
export const V_WDT_CTRL_INT_EARLY_VAL_WDT2POW16 = 15
export const S_WDT_CTRL_INT_EARLY_VAL_WDT2POW16 = 15 << F_WDT_CTRL_INT_EARLY_VAL_POS
/**
Windowed Watchdog Reset Lower Limit. Sets the number of WDTCLK cycles that establishes the lower boundary of the watchdog window. A system reset occurs (if enabled) if the CPU writes the windowed watchdog reset sequence to the WWDT_RST register before the watchdog timer has counted this time period since the last timer reset.*/
export const F_WDT_CTRL_RST_EARLY_VAL_POS = 20
export const F_WDT_CTRL_RST_EARLY_VAL = 0xf << F_WDT_CTRL_RST_EARLY_VAL_POS
export const V_WDT_CTRL_RST_EARLY_VAL_WDT2POW31 = 0
export const S_WDT_CTRL_RST_EARLY_VAL_WDT2POW31 = 0 << F_WDT_CTRL_RST_EARLY_VAL_POS
export const V_WDT_CTRL_RST_EARLY_VAL_WDT2POW30 = 1
export const S_WDT_CTRL_RST_EARLY_VAL_WDT2POW30 = 1 << F_WDT_CTRL_RST_EARLY_VAL_POS
export const V_WDT_CTRL_RST_EARLY_VAL_WDT2POW29 = 2
export const S_WDT_CTRL_RST_EARLY_VAL_WDT2POW29 = 2 << F_WDT_CTRL_RST_EARLY_VAL_POS
export const V_WDT_CTRL_RST_EARLY_VAL_WDT2POW28 = 3
export const S_WDT_CTRL_RST_EARLY_VAL_WDT2POW28 = 3 << F_WDT_CTRL_RST_EARLY_VAL_POS
export const V_WDT_CTRL_RST_EARLY_VAL_WDT2POW27 = 4
export const S_WDT_CTRL_RST_EARLY_VAL_WDT2POW27 = 4 << F_WDT_CTRL_RST_EARLY_VAL_POS
export const V_WDT_CTRL_RST_EARLY_VAL_WDT2POW26 = 5
export const S_WDT_CTRL_RST_EARLY_VAL_WDT2POW26 = 5 << F_WDT_CTRL_RST_EARLY_VAL_POS
export const V_WDT_CTRL_RST_EARLY_VAL_WDT2POW25 = 6
export const S_WDT_CTRL_RST_EARLY_VAL_WDT2POW25 = 6 << F_WDT_CTRL_RST_EARLY_VAL_POS
export const V_WDT_CTRL_RST_EARLY_VAL_WDT2POW24 = 7
export const S_WDT_CTRL_RST_EARLY_VAL_WDT2POW24 = 7 << F_WDT_CTRL_RST_EARLY_VAL_POS
export const V_WDT_CTRL_RST_EARLY_VAL_WDT2POW23 = 8
export const S_WDT_CTRL_RST_EARLY_VAL_WDT2POW23 = 8 << F_WDT_CTRL_RST_EARLY_VAL_POS
export const V_WDT_CTRL_RST_EARLY_VAL_WDT2POW22 = 9
export const S_WDT_CTRL_RST_EARLY_VAL_WDT2POW22 = 9 << F_WDT_CTRL_RST_EARLY_VAL_POS
export const V_WDT_CTRL_RST_EARLY_VAL_WDT2POW21 = 10
export const S_WDT_CTRL_RST_EARLY_VAL_WDT2POW21 = 10 << F_WDT_CTRL_RST_EARLY_VAL_POS
export const V_WDT_CTRL_RST_EARLY_VAL_WDT2POW20 = 11
export const S_WDT_CTRL_RST_EARLY_VAL_WDT2POW20 = 11 << F_WDT_CTRL_RST_EARLY_VAL_POS
export const V_WDT_CTRL_RST_EARLY_VAL_WDT2POW19 = 12
export const S_WDT_CTRL_RST_EARLY_VAL_WDT2POW19 = 12 << F_WDT_CTRL_RST_EARLY_VAL_POS
export const V_WDT_CTRL_RST_EARLY_VAL_WDT2POW18 = 13
export const S_WDT_CTRL_RST_EARLY_VAL_WDT2POW18 = 13 << F_WDT_CTRL_RST_EARLY_VAL_POS
export const V_WDT_CTRL_RST_EARLY_VAL_WDT2POW17 = 14
export const S_WDT_CTRL_RST_EARLY_VAL_WDT2POW17 = 14 << F_WDT_CTRL_RST_EARLY_VAL_POS
export const V_WDT_CTRL_RST_EARLY_VAL_WDT2POW16 = 15
export const S_WDT_CTRL_RST_EARLY_VAL_WDT2POW16 = 15 << F_WDT_CTRL_RST_EARLY_VAL_POS
/**
Switch Ready Interrupt Enable. Fires an interrupt when it is safe to swithc the clock.*/
export const F_WDT_CTRL_CLKRDY_IE_POS = 27
export const F_WDT_CTRL_CLKRDY_IE = 0x1 << F_WDT_CTRL_CLKRDY_IE_POS
/**
Clock Status.*/
export const F_WDT_CTRL_CLKRDY_POS = 28
export const F_WDT_CTRL_CLKRDY = 0x1 << F_WDT_CTRL_CLKRDY_POS
/**
Enables the Windowed Watchdog Function.*/
export const F_WDT_CTRL_WIN_EN_POS = 29
export const F_WDT_CTRL_WIN_EN = 0x1 << F_WDT_CTRL_WIN_EN_POS
export const V_WDT_CTRL_WIN_EN_DIS = 0
export const S_WDT_CTRL_WIN_EN_DIS = 0 << F_WDT_CTRL_WIN_EN_POS
export const V_WDT_CTRL_WIN_EN_EN = 1
export const S_WDT_CTRL_WIN_EN_EN = 1 << F_WDT_CTRL_WIN_EN_POS
/**
Windowed Watchdog Timer Reset Flag Too Soon.*/
export const F_WDT_CTRL_RST_EARLY_POS = 30
export const F_WDT_CTRL_RST_EARLY = 0x1 << F_WDT_CTRL_RST_EARLY_POS
export const V_WDT_CTRL_RST_EARLY_NOEVENT = 0
export const S_WDT_CTRL_RST_EARLY_NOEVENT = 0 << F_WDT_CTRL_RST_EARLY_POS
export const V_WDT_CTRL_RST_EARLY_OCCURRED = 1
export const S_WDT_CTRL_RST_EARLY_OCCURRED = 1 << F_WDT_CTRL_RST_EARLY_POS
/**
Windowed Watchdog Timer Reset Flag Too Late.*/
export const F_WDT_CTRL_RST_LATE_POS = 31
export const F_WDT_CTRL_RST_LATE = 0x1 << F_WDT_CTRL_RST_LATE_POS
export const V_WDT_CTRL_RST_LATE_NOEVENT = 0
export const S_WDT_CTRL_RST_LATE_NOEVENT = 0 << F_WDT_CTRL_RST_LATE_POS
export const V_WDT_CTRL_RST_LATE_OCCURRED = 1
export const S_WDT_CTRL_RST_LATE_OCCURRED = 1 << F_WDT_CTRL_RST_LATE_POS

// -------- REGISTER RST -------- //

/**
Windowed Watchdog Timer Reset Register.*/
/**
Writing the watchdog counter 'reset sequence' to this register resets the watchdog counter. If the watchdog count exceeds INT_PERIOD_UPPER_LIMIT then a watchdog interrupt will occur, if enabled. If the watchdog count exceeds RST_PERIOD_UPPER_LIMIT then a watchdog reset will occur, if enabled.*/
export const F_WDT_RST_RESET_POS = 0
export const F_WDT_RST_RESET = 0xff << F_WDT_RST_RESET_POS
export const V_WDT_RST_RESET_SEQ0 = 0x000000A5
export const S_WDT_RST_RESET_SEQ0 = 0x000000A5 << F_WDT_RST_RESET_POS
export const V_WDT_RST_RESET_SEQ1 = 0x0000005A
export const S_WDT_RST_RESET_SEQ1 = 0x0000005A << F_WDT_RST_RESET_POS

// -------- REGISTER CLKSEL -------- //

/**
Windowed Watchdog Timer Clock Select Register.*/
/**
WWDT Clock Selection Register.*/
export const F_WDT_CLKSEL_SOURCE_POS = 0
export const F_WDT_CLKSEL_SOURCE = 0x7 << F_WDT_CLKSEL_SOURCE_POS

// -------- REGISTER CNT -------- //

/**
Windowed Watchdog Timer Count Register.*/
/**
Current Value of the Windowed Watchdog Timer Counter.*/
export const F_WDT_CNT_COUNT_POS = 0
export const F_WDT_CNT_COUNT = 0xffffffff << F_WDT_CNT_COUNT_POS

// -------- PERIPHERAL WUT -------- //

export interface WUT_t {
    CNT: $Reg
    CMP: $Reg
    INTR: $Reg
    CTRL: $Reg
    NOLCMP: $Reg
    PRESET: $Reg
    RELOAD: $Reg
    SNAPSHOT: $Reg
}

// -------- REGISTER CNT -------- //

/**
Count.  This register stores the current timer count.*/
/**
Timer Count Value. */
export const F_WUT_CNT_COUNT_POS = 0
export const F_WUT_CNT_COUNT = 0xffffffff << F_WUT_CNT_COUNT_POS

// -------- REGISTER CMP -------- //

/**
Compare.  This register stores the compare value, which is used to set the maximum count value to initiate a reload of the timer to 0x0001.*/
/**
Timer Compare Value.*/
export const F_WUT_CMP_COMPARE_POS = 0
export const F_WUT_CMP_COMPARE = 0xffffffff << F_WUT_CMP_COMPARE_POS

// -------- REGISTER INTR -------- //

/**
Clear Interrupt. Writing a value (0 or 1) to a bit in this register clears the associated interrupt.*/
/**
Clear Interrupt.*/
export const F_WUT_INTR_IRQ_CLR_POS = 0
export const F_WUT_INTR_IRQ_CLR = 0x1 << F_WUT_INTR_IRQ_CLR_POS

// -------- REGISTER CTRL -------- //

/**
Timer Control Register.*/
/**
Timer Mode.*/
export const F_WUT_CTRL_TMODE_POS = 0
export const F_WUT_CTRL_TMODE = 0x7 << F_WUT_CTRL_TMODE_POS
export const V_WUT_CTRL_TMODE_ONESHOT = 0
export const S_WUT_CTRL_TMODE_ONESHOT = 0 << F_WUT_CTRL_TMODE_POS
export const V_WUT_CTRL_TMODE_CONTINUOUS = 1
export const S_WUT_CTRL_TMODE_CONTINUOUS = 1 << F_WUT_CTRL_TMODE_POS
export const V_WUT_CTRL_TMODE_COUNTER = 2
export const S_WUT_CTRL_TMODE_COUNTER = 2 << F_WUT_CTRL_TMODE_POS
export const V_WUT_CTRL_TMODE_CAPTURE = 4
export const S_WUT_CTRL_TMODE_CAPTURE = 4 << F_WUT_CTRL_TMODE_POS
export const V_WUT_CTRL_TMODE_COMPARE = 5
export const S_WUT_CTRL_TMODE_COMPARE = 5 << F_WUT_CTRL_TMODE_POS
export const V_WUT_CTRL_TMODE_GATED = 6
export const S_WUT_CTRL_TMODE_GATED = 6 << F_WUT_CTRL_TMODE_POS
export const V_WUT_CTRL_TMODE_CAPTURECOMPARE = 7
export const S_WUT_CTRL_TMODE_CAPTURECOMPARE = 7 << F_WUT_CTRL_TMODE_POS
/**
Prescaler.  Set the Timer's prescaler value. The prescaler divides the PCLK input to the timer and sets the Timer's Count Clock, F_CNT_CLK = PCLK(HZ)/prescaler. The Timer's prescaler setting is a 4-bit value with pres3:pres[2:0].*/
export const F_WUT_CTRL_PRES_POS = 3
export const F_WUT_CTRL_PRES = 0x7 << F_WUT_CTRL_PRES_POS
export const V_WUT_CTRL_PRES_DIV1 = 0
export const S_WUT_CTRL_PRES_DIV1 = 0 << F_WUT_CTRL_PRES_POS
export const V_WUT_CTRL_PRES_DIV2 = 1
export const S_WUT_CTRL_PRES_DIV2 = 1 << F_WUT_CTRL_PRES_POS
export const V_WUT_CTRL_PRES_DIV4 = 2
export const S_WUT_CTRL_PRES_DIV4 = 2 << F_WUT_CTRL_PRES_POS
export const V_WUT_CTRL_PRES_DIV8 = 3
export const S_WUT_CTRL_PRES_DIV8 = 3 << F_WUT_CTRL_PRES_POS
export const V_WUT_CTRL_PRES_DIV16 = 4
export const S_WUT_CTRL_PRES_DIV16 = 4 << F_WUT_CTRL_PRES_POS
export const V_WUT_CTRL_PRES_DIV32 = 5
export const S_WUT_CTRL_PRES_DIV32 = 5 << F_WUT_CTRL_PRES_POS
export const V_WUT_CTRL_PRES_DIV64 = 6
export const S_WUT_CTRL_PRES_DIV64 = 6 << F_WUT_CTRL_PRES_POS
export const V_WUT_CTRL_PRES_DIV128 = 7
export const S_WUT_CTRL_PRES_DIV128 = 7 << F_WUT_CTRL_PRES_POS
/**
Timer input/output polarity bit.*/
export const F_WUT_CTRL_TPOL_POS = 6
export const F_WUT_CTRL_TPOL = 0x1 << F_WUT_CTRL_TPOL_POS
export const V_WUT_CTRL_TPOL_ACTIVEHI = 0
export const S_WUT_CTRL_TPOL_ACTIVEHI = 0 << F_WUT_CTRL_TPOL_POS
export const V_WUT_CTRL_TPOL_ACTIVELO = 1
export const S_WUT_CTRL_TPOL_ACTIVELO = 1 << F_WUT_CTRL_TPOL_POS
/**
Timer Enable.*/
export const F_WUT_CTRL_TEN_POS = 7
export const F_WUT_CTRL_TEN = 0x1 << F_WUT_CTRL_TEN_POS
export const V_WUT_CTRL_TEN_DIS = 0
export const S_WUT_CTRL_TEN_DIS = 0 << F_WUT_CTRL_TEN_POS
export const V_WUT_CTRL_TEN_EN = 1
export const S_WUT_CTRL_TEN_EN = 1 << F_WUT_CTRL_TEN_POS
/**
MSB of prescaler value.*/
export const F_WUT_CTRL_PRES3_POS = 8
export const F_WUT_CTRL_PRES3 = 0x1 << F_WUT_CTRL_PRES3_POS

// -------- REGISTER NOLCMP -------- //

/**
Timer Non-Overlapping Compare Register.*/
/**
Non-overlapping Low Compare.  The 8-bit timer count value of non-overlapping time between falling edge of PWM output 0A and next rising edge of PWM output 0A'.*/
export const F_WUT_NOLCMP_NOLLCMP_POS = 0
export const F_WUT_NOLCMP_NOLLCMP = 0xff << F_WUT_NOLCMP_NOLLCMP_POS
/**
Non-overlapping High Compare.  The 8-bit timer count value of non-overlapping time between falling edge of PWM output 0A' and next rising edge of PWM output 0A.*/
export const F_WUT_NOLCMP_NOLHCMP_POS = 8
export const F_WUT_NOLCMP_NOLHCMP = 0xff << F_WUT_NOLCMP_NOLHCMP_POS

// -------- REGISTER PRESET -------- //

/**
Preset register.*/
/**
Preset Value.*/
export const F_WUT_PRESET_PRESET_POS = 0
export const F_WUT_PRESET_PRESET = 0xffffffff << F_WUT_PRESET_PRESET_POS

// -------- REGISTER RELOAD -------- //

/**
Reload register.*/
/**
Rerload Value.*/
export const F_WUT_RELOAD_RELOAD_POS = 0
export const F_WUT_RELOAD_RELOAD = 0xffffffff << F_WUT_RELOAD_RELOAD_POS

// -------- REGISTER SNAPSHOT -------- //

/**
Snapshot register.*/
/**
Snapshot Value.*/
export const F_WUT_SNAPSHOT_SNAPSHOT_POS = 0
export const F_WUT_SNAPSHOT_SNAPSHOT = 0xffffffff << F_WUT_SNAPSHOT_SNAPSHOT_POS

// -------- INSTANCES -------- //

export const GCR = {} as GCR_t
export const GPIO0 = {} as GPIO_t
export const GPIO1 = {} as GPIO_t
export const GPIO2 = {} as GPIO_t
export const GPIO3 = {} as GPIO_t
export const ICC0 = {} as ICC_t
export const LPGCR = {} as LPGCR_t
export const MCR = {} as MCR_t
export const PWRSEQ = {} as PWRSEQ_t
export const RTC = {} as RTC_t
export const SIMO = {} as SIMO_t
export const TMR0 = {} as TMR_t
export const UART0 = {} as UART_t
export const UART3 = {} as UART_t
export const WDT0 = {} as WDT_t
export const WDT1 = {} as WDT_t
export const WUT = {} as WUT_t
export const GPIO = [] as GPIO_t[]
export const UART = [] as UART_t[]
