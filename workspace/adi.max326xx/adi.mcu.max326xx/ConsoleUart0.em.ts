import em from '@$$emscript'
export const $U = em.$declare('MODULE', ConsoleUartI)

import * as $R from '@adi.distro.max326xx/REGS.em'

import * as ConsoleUartI from '@em.hal/ConsoleUartI.em'
import * as GpioI from '@em.hal/GpioI.em'

export const TxPin = $proxy<GpioI.$I>()

export const baud = $config<u32>(115200)

const clkdiv = $config<u32>()

export namespace em$meta {
    const IBRO_FREQ = 7372800

    export function em$construct() {
        clkdiv.$$ = Math.round(IBRO_FREQ / baud.$$)
    }
}

export function em$startup() {
    TxPin.$$.makeOutput()
    TxPin.$$.functionSelect(1)
    $R.GCR.CLKCTRL.$$ |= $R.F_GCR_CLKCTRL_IBRO_EN
    $R.GCR.PCLKDIS0.$$ &= ~$R.F_GCR_PCLKDIS0_UART0
    $R.UART0.OSR.$$ = 5
    $R.UART0.CLKDIV.$$ = clkdiv.$$
}

export function flush(): void {
    while (($R.UART0.STATUS.$$ & $R.F_UART_STATUS_TX_EM) == 0) { }
}

export function put(data: u8): void {
    $R.UART0.CTRL.$$ |= // TODO -- doesn't work in startup
        $R.S_UART_CTRL_CHAR_SIZE_8BITS |
        $R.S_UART_CTRL_BCLKSRC_CLK2 |
        $R.F_UART_CTRL_BCLKEN |
        $R.F_UART_CTRL_UCAGM
    $R.UART0.FIFO.$$ = data
    flush()
}
