import '@$$emscript'
export const $U = $declare('MODULE', ConsoleUartI)

import * as $R from '@adi.distro.max326xx/REGS.em'

import * as ConsoleUartI from '@em.hal/ConsoleUartI.em'
import * as GpioI from '@em.hal/GpioI.em'
import * as Idle from '@adi.mcu.max326xx/Idle.em'

export const TxPin = $proxy<GpioI.$I>()

export const baud = $config<u32>(115200)

const clkdiv = $config<u32>()

export namespace em$meta {

    const IBRO_FREQ = 7_372_800

    export function em$construct() {
        clkdiv.$$val = Math.round(IBRO_FREQ / baud)
        Idle.em$meta.addSleepEnter($cb(sleepEnter))
        Idle.em$meta.addSleepLeave($cb(sleepLeave))
    }
}

//>> ---- em$targ ---- <<//

export function em$startup() {
    sleepLeave()
}

export function flush(): void {
    while (($R.UART3.STATUS.$$ & $R.F_UART_STATUS_TX_EM) == 0) { }
}

export function put(data: u8): void {
    $R.UART3.FIFO.$$ = data
    flush()
}

function sleepEnter() {
    TxPin.reset()
    $R.LPGCR.PCLKDIS.$$ |= ($R.F_LPGCR_PCLKDIS_UART3 | $R.F_LPGCR_PCLKDIS_GPIO2)
    $R.GCR.CLKCTRL.$$ &= ~$R.F_GCR_CLKCTRL_IBRO_EN
}

function sleepLeave() {
    $R.LPGCR.PCLKDIS.$$ &= ~($R.F_LPGCR_PCLKDIS_UART3 | $R.F_LPGCR_PCLKDIS_GPIO2)
    TxPin.makeOutput()
    TxPin.functionSelect(2)
    $R.GCR.CLKCTRL.$$ |= $R.F_GCR_CLKCTRL_IBRO_EN
    $R.UART3.OSR.$$ = 5
    $R.UART3.CLKDIV.$$ = clkdiv
    $R.UART3.CTRL.$$ |=
        $R.S_UART_CTRL_CHAR_SIZE_8BITS |
        $R.S_UART_CTRL_BCLKSRC_PERIPHERAL_CLOCK |
        $R.F_UART_CTRL_BCLKEN |
        $R.F_UART_CTRL_UCAGM
}