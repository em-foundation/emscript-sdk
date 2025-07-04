import '@$$emscript'
export const $U = $declare('MODULE', RtcI)

import * as $R from '@nordic.distro.nrf54/REGS.em'

import * as IntrVec from '@em.arch.arm/IntrVec.em'
import * as RtcI from '@em.hal/RtcI.em'
import * as T from '@em.utils/TimeTypes.em'

export type Handler = RtcI.Handler

export namespace em$meta {
    export function em$construct() {
        IntrVec.em$meta.useIntr('GRTC_0')
    }
}

//>> ---- em$targ ---- <<//

var cur_hlr = <Handler>$null

export function em$startup() {
    $R.GRTC.MODE.$$ = $R.GRTC_MODE_SYSCOUNTEREN_Msk
    $R.GRTC.TASKS_START.$$ = 1
    IntrVec.NVIC_enable(e$`GRTC_0_IRQn`)
}

export function disable() {
    cur_hlr = $null
    $R.GRTC.INTENCLR0.$$ = 1
}

export function enable(thresh: T.RtcThresh, handler: Handler) {
    cur_hlr = handler
    const hi_lo = readHiLo()
    const lo_cc = thresh
    const hi_cc = 0
    $R.GRTC.EVENTS_COMPARE[0].$$ = 0
    $R.GRTC.CC[0].CCL.$$ = lo_cc
    $R.GRTC.CC[0].CCH.$$ = hi_cc
    $R.GRTC.CC[0].CCEN.$$ = 1
    $R.GRTC.INTENSET0.$$ = 1
}

export function getRawTime(): T.RawTime {
    let res = T.RawTime.$make()
    const hi_low: u64 = readHiLo()
    res.secs = <u32>(hi_low / 1_000_000)
    res.subs = T.UsecsToRawSubs(<u32>(hi_low % 1_000_000))
    return res
}

export function toThresh(secs: T.Secs30p2): T.RtcThresh {
    return T.Secs30p2ToUsecs(secs)
}

export function GRTC_0_isr$$() {
    IntrVec.NVIC_clear(e$`GRTC_0_IRQn`)
    const hlr = cur_hlr
    disable()
    if (hlr != $null) hlr()
}

function readHiLo(): u64 {
    let lo: u32
    let hi: u32
    while (true) {
        lo = $R.GRTC.SYSCOUNTER[1].SYSCOUNTERL.$$
        const hi_reg = $R.GRTC.SYSCOUNTER[1].SYSCOUNTERH.$$
        hi = hi_reg & $R.GRTC_SYSCOUNTER_SYSCOUNTERH_VALUE_Msk
        if ((hi & $R.GRTC_SYSCOUNTER_SYSCOUNTERH_OVERFLOW_Msk) != 0) {
            hi -= 1
        }
        if ((hi_reg & $R.GRTC_SYSCOUNTER_SYSCOUNTERH_BUSY_Msk) == 0) break
    }
    const hi_lo: u64 = (<u64>hi << 32) | lo
    return hi_lo
}
