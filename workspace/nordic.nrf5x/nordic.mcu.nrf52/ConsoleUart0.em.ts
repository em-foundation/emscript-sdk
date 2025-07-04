import '@$$emscript'
export const $U = $declare('MODULE', ConsoleUartI)

import * as $R from '@nordic.distro.nrf52/REGS.em'

import * as ConsoleUartI from '@em.hal/ConsoleUartI.em'
import * as GpioI from '@em.hal/GpioI.em'
import * as Idle from '@nordic.mcu.nrf52/Idle.em'

export const TxPin = $proxy<GpioI.$I>()

export namespace em$meta {
    export function em$construct() {
        Idle.em$meta.addSleepEnter($cb(sleepEnter))
        Idle.em$meta.addSleepLeave($cb(sleepLeave))
    }
}

//>> ---- em$targ ---- <<//

var txd: u8

export function em$startup() {
    sleepLeave()
}

export function flush() { }

export function put(data: u8) {
    $R.UART0.TXD.$$ = data
    while ($R.UART0.EVENTS_TXDRDY.$$ == 0) { }
    $R.UART0.EVENTS_TXDRDY.$$ = 0
}

function sleepEnter() {
    $R.UART0.ENABLE.$$ = $R.UART_ENABLE_ENABLE_Disabled
    TxPin.reset()
}

function sleepLeave() {
    $R.UART0.PSELTXD.$$ = TxPin.pinId()
    $R.UART0.BAUDRATE.$$ = $R.UART_BAUDRATE_BAUDRATE_Baud115200
    $R.UART0.ENABLE.$$ = $R.UART_ENABLE_ENABLE_Enabled
    $R.UART0.TASKS_STARTTX.$$ = 1
}
