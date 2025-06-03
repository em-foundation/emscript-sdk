import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as $R from '@nordic.distro.nrf52/REGS.em'

import * as IntrVec from '@em.arch.arm/IntrVec.em'
import * as TimeTypes from '@em.utils/TimeTypes.em'

export type Handler = cb_t<[]>

export namespace em$meta {
    export function em$construct() {
        IntrVec.em$meta.useIntr('RTC0')
    }
}

//>> ---- em$targ ---- <<//

const SUBS_Cnt = 8
const SUBS_Msk = (1 << SUBS_Cnt) - 1
const PRE = (1 << (15 - SUBS_Cnt)) - 1

var cur_hlr = <Handler>$null

export function em$startup() {
    $R.RTC0.PRESCALER.$$ = PRE
    $R.RTC0.TASKS_START.$$ = 1
    IntrVec.NVIC_enable(e$`RTC0_IRQn`)
}

export function disable() {
    cur_hlr = $null
    $R.RTC0.INTENCLR.$$ = $R.RTC_INTENCLR_COMPARE0_Msk
    $R.RTC0.EVENTS_COMPARE[0].$$ = 0
}

export function enable(thresh: u32, handler: Handler) {
    cur_hlr = handler
    // const ctr = $R.RTC0.COUNTER.$$
    // $['%%>'](ctr)
    // $['%%>'](thresh)
    $R.RTC0.CC[0].$$ = thresh
    $R.RTC0.INTENSET.$$ = $R.RTC_INTENSET_COMPARE0_Msk
}

export function getRawTime(): TimeTypes.RawTime {
    let res = TimeTypes.RawTime.$make()
    const ctr = $R.RTC0.COUNTER.$$
    res.secs = ctr >> SUBS_Cnt
    res.subs = (ctr & SUBS_Msk) << (32 - SUBS_Cnt)
    return res
}

export function toThresh(delta: TimeTypes.Secs24p8): u32 {
    const ctr = $R.RTC0.COUNTER.$$
    const thr = ctr + (delta >> (8 - SUBS_Cnt))
    return thr
}

export function RTC0_isr$$() {
    IntrVec.NVIC_clear(e$`RTC0_IRQn`)
    const hlr = cur_hlr
    disable()
    if (hlr != $null) hlr()
}
