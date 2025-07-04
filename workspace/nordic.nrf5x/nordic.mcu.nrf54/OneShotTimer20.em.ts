import '@$$emscript'
export const $U = $declare('MODULE', OneShotI)

import * as $R from '@nordic.distro.nrf54/REGS.em'

import * as Idle from '@nordic.mcu.nrf54/Idle.em'
import * as IntrVec from '@em.arch.arm/IntrVec.em'
import * as OneShotI from '@em.hal/OneShotI.em'

export type Handler = OneShotI.Handler

export namespace em$meta {
    export function em$construct() {
        IntrVec.em$meta.useIntr('TIMER20')
    }
}

//>> ---- em$targ ---- <<//

var cur_arg: arg_t
var cur_fxn: Handler = $null

export function disable(): void {
    $R.TIMER20.TASKS_STOP.$$ = 1
    Idle.setPauseOnly(false)
    IntrVec.NVIC_disable(e$`TIMER20_IRQn`)
}

export function enable(msecs: u32, handler: OneShotI.Handler, arg: arg_t): void {
    ustart(msecs * 1000, handler, arg)
}

export function uenable(usecs: u32, handler: OneShotI.Handler, arg: arg_t): void {
    ustart(usecs, handler, arg)
}

function ustart(usecs: u32, handler: OneShotI.Handler, arg: arg_t) {
    cur_fxn = handler
    cur_arg = arg
    Idle.setPauseOnly(true)
    IntrVec.NVIC_enable(e$`TIMER20_IRQn`)
    $R.TIMER20.TASKS_STOP.$$ = 1
    $R.TIMER20.TASKS_CLEAR.$$ = 1
    $R.TIMER20.MODE.$$ = $R.TIMER_MODE_MODE_Timer
    $R.TIMER20.BITMODE.$$ = $R.TIMER_BITMODE_BITMODE_32Bit
    $R.TIMER20.CC[0].$$ = usecs
    $R.TIMER20.INTENSET.$$ = $R.TIMER_INTENSET_COMPARE0_Msk
    $R.TIMER20.TASKS_START.$$ = 1
}

export function TIMER20_isr$$() {
    IntrVec.NVIC_clear(e$`TIMER20_IRQn`)
    $R.TIMER20.INTENCLR.$$ = $R.TIMER_INTENCLR_COMPARE0_Msk
    $R.TIMER20.EVENTS_COMPARE[0].$$ = 0
    const fxn = cur_fxn
    disable()
    fxn(cur_arg)
}
