import em from '@$$emscript'
export const $U = em.$declare('MODULE', ConsoleUartI)

import * as ConsoleUartI from '@em.hal/ConsoleUartI.em'
import * as GpioI from '@em.hal/GpioI.em'
import * as Idle from '@ti.mcu.cc23xx/Idle.em'

export const TxPin = $proxy<GpioI.$I>()

export namespace em$meta {
    export function em$configure() {
        Idle.em$meta.addSleepEnter($cb(sleepEnter))
        Idle.em$meta.addSleepLeave($cb(sleepLeave))
    }
}

import * as $R from '@ti.distro.cc23xx/REGS.em'

export function em$startup(): void {
    sleepLeave()
}

export function flush(): void {
    while ($R.UART0.FR.$$ & $R.UART_FR_BUSY) {}
}

export function put(data: u8): void {
    $R.UART0.DR.$$ = data
    flush()
}

function sleepEnter() {
    $R.CLKCTL.CLKENCLR0.$$ = $R.CLKCTL_CLKENCLR0_UART0
    TxPin.$$.reset()
}

function sleepLeave() {
    $R.CLKCTL.CLKENSET0.$$ = $R.CLKCTL_CLKENSET0_UART0
    TxPin.$$.makeOutput()
    TxPin.$$.set()
    TxPin.$$.functionSelect(2)
    $R.UART0.CTL.$$ &= ~$R.UART_CTL_UARTEN
    $R.UART0.IBRD.$$ = 26
    $R.UART0.FBRD.$$ = 3
    $R.UART0.LCRH.$$ = $R.UART_LCRH_WLEN_BITL8
    $R.UART0.CTL.$$ |= $R.UART_CTL_UARTEN
}
