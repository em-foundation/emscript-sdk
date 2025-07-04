import '@$$emscript'
export const $U = $declare('MODULE', ConsoleUartI)

import * as $R from '@nordic.distro.nrf54/REGS.em'

import * as ConsoleUartI from '@em.hal/ConsoleUartI.em'
import * as GpioI from '@em.hal/GpioI.em'
import * as Idle from './Idle.em'

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

export function flush() {
    while ($R.UARTE30.EVENTS_DMA.TX.END.$$ == 0) { }
    $R.UARTE30.EVENTS_DMA.TX.END.$$ = 1
}

export function put(data: u8) {
    txd = data
    $R.UARTE30.EVENTS_DMA.TX.END.$$ = 0
    $R.UARTE30.TASKS_DMA.TX.START.$$ = 1
    flush()
}

function sleepEnter() {
    $R.UARTE30.ENABLE.$$ = $R.UARTE_ENABLE_ENABLE_Disabled
    TxPin.reset()
}

function sleepLeave() {
    $R.UARTE30.PSEL.TXD.$$ = 0
    $R.UARTE30.BAUDRATE.$$ = $R.UARTE_BAUDRATE_BAUDRATE_Baud115200
    $R.UARTE30.ENABLE.$$ = $R.UARTE_ENABLE_ENABLE_Enabled
    //
    e$`NRF_UARTE30_S->DMA.TX.PTR = (uint32_t)&txd`
    $R.UARTE30.DMA.TX.MAXCNT.$$ = 1
    $R.UARTE30.EVENTS_DMA.TX.END.$$ = 1
}
