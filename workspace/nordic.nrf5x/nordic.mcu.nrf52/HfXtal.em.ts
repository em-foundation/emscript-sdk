import '@$$emscript'
export const $U = $declare('MODULE')

import * as $R from '@nordic.distro.nrf52/REGS.em'

import * as Idle from '@nordic.mcu.nrf52/Idle.em'
import * as IntrVec from '@em.arch.arm/IntrVec.em'

export namespace em$meta {
    export function em$construct() {
        Idle.em$meta.addSleepLeave($cb(start))
        IntrVec.em$meta.useIntr('POWER_CLOCK')
    }
}

//>> ---- em$targ ---- <<//

export function em$startup() {
    IntrVec.NVIC_enable(e$`POWER_CLOCK_IRQn`)
}

export function start() {
    $R.CLOCK.INTENSET.$$ = $R.CLOCK_INTENSET_HFCLKSTARTED_Set
    $R.CLOCK.EVENTS_HFCLKSTARTED.$$ = 0
    $R.CLOCK.TASKS_HFCLKSTART.$$ = 1
}

export function stop() {
    $R.CLOCK.TASKS_HFCLKSTOP.$$ = 1
    $R.CLOCK.EVENTS_HFCLKSTARTED.$$ = 0
}

export function wait() {
    Idle.setPauseOnly(true)
    while ($R.CLOCK.EVENTS_HFCLKSTARTED.$$ == 0) {
        Idle.exec()
    }
    Idle.setPauseOnly(false)
}

export function POWER_CLOCK_isr$$() {
    $R.CLOCK.INTENCLR.$$ = $R.CLOCK_INTENCLR_HFCLKSTARTED_Clear
    IntrVec.NVIC_clear(e$`POWER_CLOCK_IRQn`)
}