import '@$$emscript'
export const $U = $declare('MODULE', IdleI)

import * as $R from '@nordic.distro.nrf52/REGS.em'

import * as Debug from '@em.lang/Debug.em'
import * as IdleI from '@em.hal/IdleI.em'
import * as IntrVec from '@em.arch.arm/IntrVec.em'

export type SleepCB = cb_t<[]>

const sleep_enter_tab = $table<SleepCB>()
const sleep_leave_tab = $table<SleepCB>()

export namespace em$meta {
    export function addSleepEnter(cb: SleepCB) {
        sleep_enter_tab.$$add(cb)
    }

    export function addSleepLeave(cb: SleepCB) {
        sleep_leave_tab.$$add(cb)
    }
}

//>> ---- em$targ ---- <<//

var cur_pause_only = false

export function em$startup() {
    $['%%b+']
}

function doPause() {
    $['%%b:'](1)
    $['%%b-']
    IntrVec.PRIMASK_set(1)
    e$`asm volatile ("wfi")`
    $['%%b+']
    IntrVec.PRIMASK_set(0)
}

function doSleep() {
    for (let cb of sleep_enter_tab) cb()
    $['%%b:'](2)
    $['%%b-']
    Debug.reset()
    IntrVec.PRIMASK_set(1)
    e$`asm volatile ("wfi")`
    Debug.startup()
    $['%%b']
    for (let cb of sleep_leave_tab) cb()
    IntrVec.PRIMASK_set(0)
}

export function exec() {
    if (cur_pause_only) {
        doPause()
    } else {
        doSleep()
    }
}

export function setPauseOnly(pause_only: bool_t) {
    cur_pause_only = pause_only
}

export function wakeup() { }
