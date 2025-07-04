import '@$$emscript'
export const $U = $declare('MODULE')

import * as $R from '@nordic.distro.nrf54/REGS.em'

import * as Idle from '@nordic.mcu.nrf54/Idle.em'
import * as IntrVec from '@em.arch.arm/IntrVec.em'
import * as Poller from '@em.mcu/Poller.em'

export namespace em$meta {
    export function em$construct() {
        Idle.em$meta.addSleepLeave($cb(start))
        IntrVec.em$meta.useIntr('CLOCK_POWER')
    }
}

//>> ---- em$targ ---- <<//

var ready: volatile_t<bool_t> = false

export function em$startup() {
    // IntrVec.NVIC_enable(e$`CLOCK_POWER_IRQn`)
}

export function start() {
    ready = false
    $R.CLOCK.EVENTS_XOTUNED.$$ = 0
    e$`asm volatile ("dsb sy")`
    $R.CLOCK.TASKS_PLLSTART.$$ = 1
    e$`asm volatile ("dsb sy")`
    $R.CLOCK.TASKS_XOSTART.$$ = 1
    e$`asm volatile ("dsb sy")`
    $R.CLOCK.TASKS_XOTUNE.$$ = 1
}

export function stop() {
    $R.CLOCK.TASKS_XOTUNEABORT.$$ = 1
    e$`asm volatile ("dsb sy")`
    $R.CLOCK.TASKS_XOSTOP.$$ = 1
    e$`asm volatile ("dsb sy")`
    $R.CLOCK.TASKS_PLLSTOP.$$ = 1
    e$`asm volatile ("dsb sy")`
    $R.CLOCK.EVENTS_XOTUNED.$$ = 0
    while ($R.CLOCK.PLL.STAT.$$ != 0) { }
}

export function wait() {
    $['%%c+']
    while (!ready) {
        // Poller.upause(100)
        ready = $R.CLOCK.EVENTS_XOTUNED.$$ != 0
    }
    $['%%c-']
}

export function CLOCK_POWER_isr$$() {
    ready = true
    $R.CLOCK.INTENCLR.$$ = $R.CLOCK_INTENCLR_XOTUNED_Clear
    IntrVec.NVIC_clear(e$`CLOCK_POWER_IRQn`)
}