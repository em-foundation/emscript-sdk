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
    const PCLK_FREQ = 50_000_000

    export function em$construct() {
        clkdiv.$$val = Math.round(PCLK_FREQ / baud)
        Idle.em$meta.addSleepEnter($cb(sleepEnter))
        Idle.em$meta.addSleepLeave($cb(sleepLeave))
    }
}

export function em$startup() {
    sleepLeave()
}

export function flush(): void {
    while (($R.UART0.STATUS.$$ & $R.F_UART_STATUS_TX_EM) == 0) { }
}

export function put(data: u8): void {
    $R.UART0.FIFO.$$ = data
    flush()
}

function sleepEnter() {
    $R.GCR.PCLKDIS0.$$ |= $R.F_GCR_PCLKDIS0_UART0
    TxPin.reset()
}

function sleepLeave() {
    TxPin.makeOutput()
    TxPin.functionSelect(1)
    $R.GCR.PCLKDIS0.$$ &= ~$R.F_GCR_PCLKDIS0_UART0
    $R.UART0.CLKDIV.$$ = clkdiv
    $R.UART0.CTRL.$$ |=
        $R.S_UART_CTRL_CHAR_SIZE_8BITS |
        $R.S_UART_CTRL_BCLKSRC_PERIPHERAL_CLOCK |
        $R.F_UART_CTRL_BCLKEN |
        $R.F_UART_CTRL_UCAGM
}
