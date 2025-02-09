import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as Debug from '@em.lang/Debug.em'
import * as IntrVec from '@em.arch.arm/IntrVec.em'

export type SleepCB = cb_t<[]>

const sleep_enter_tab = $table<SleepCB>('ro')
const sleep_leave_tab = $table<SleepCB>('ro')

export namespace em$meta {

    export function addSleepEnter(cb: SleepCB) {
        sleep_enter_tab.$add(cb)
    }

    export function addSleepLeave(cb: SleepCB) {
        sleep_leave_tab.$add(cb)
    }
}

var cur_pause_only = false

export function em$startup() {
    em.$['%%b+']
    $R.PMCTL.VDDRCTL.$$ = $R.PMCTL_VDDRCTL_SELECT
    $R.EVTULL.WKUPMASK.$$ = $R.EVTULL_WKUPMASK_AON_IOC_COMB | $R.EVTULL_WKUPMASK_AON_RTC_COMB
}

function doSleep() {
    for (let i = 0; i < sleep_enter_tab.$len; i++) {
        const cb = sleep_enter_tab[i]
        cb()
    }
    em.$['%%b:'](2)
    em.$['%%b-']
    Debug.reset()
    $R.CKMD.LDOCTL.$$ = 0
    IntrVec.PRIMASK_set(1)
    e$`HapiEnterStandby(0)`
    Debug.startup()
    em.$['%%b+']
    for (let i = 0; i < sleep_leave_tab.$len; i++) {
        const cb = sleep_leave_tab[i]
        cb()
    }
    IntrVec.PRIMASK_set(0)
}

function doPause() {
    em.$['%%b:'](1)
    em.$['%%b-']
    IntrVec.PRIMASK_set(1)
    e$`asm volatile ("wfi")`
    em.$['%%b+']
    IntrVec.PRIMASK_set(0)
}

export function setPauseOnly(pause_only: bool_t) {
    cur_pause_only = pause_only
}

export function exec() {
    if (cur_pause_only) {
        doPause()
    }
    else {
        doSleep()
    }
}

export function wakeup() {

}
