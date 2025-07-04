import '@$$emscript'
export const $U = $declare('MODULE', RtcI)

import * as $R from '@nordic.distro.nrf52/REGS.em'

import * as IntrVec from '@em.arch.arm/IntrVec.em'
import * as RtcI from '@em.hal/RtcI.em'
import * as T from '@em.utils/TimeTypes.em'

export type Handler = RtcI.Handler

export namespace em$meta {
    export function em$construct() {
        IntrVec.em$meta.useIntr('RTC0')
    }
}

var ovr_cnt: u32 = 0

//>> ---- em$targ ---- <<//

const DEBUG = false
const TEST_OVR = false

const SUBS_Cnt = 15  // 32kHz 
const SUBS_Msk = (1 << SUBS_Cnt) - 1

var cur_hlr = <Handler>$null

export function em$startup() {
    // $R.RTC0.PRESCALER.$$ = 0     // 32kHz
    if (TEST_OVR) $R.RTC0.TASKS_TRIGOVRFLW.$$ = 1
    $R.RTC0.INTENSET.$$ = $R.RTC_INTENSET_OVRFLW_Msk
    $R.RTC0.TASKS_START.$$ = 1
    IntrVec.NVIC_enable(e$`RTC0_IRQn`)
}

export function disable() {
    cur_hlr = $null
    $R.RTC0.INTENCLR.$$ = $R.RTC_INTENCLR_COMPARE0_Msk
    $R.RTC0.EVENTS_COMPARE[0].$$ = 0
}

export function enable(thresh: T.RtcThresh, handler: Handler) {
    const ctr = $R.RTC0.COUNTER.$$
    if (DEBUG) printf`ena: ctr = %08x, thr = %08x\n`(ctr, thresh)
    cur_hlr = handler
    $R.RTC0.CC[0].$$ = thresh
    $R.RTC0.INTENSET.$$ = $R.RTC_INTENSET_COMPARE0_Msk
}

export function getRawTime(): T.RawTime {
    let res = T.RawTime.$make()
    const ctr = $R.RTC0.COUNTER.$$
    res.secs = ((ovr_cnt << 9)) | (ctr >> SUBS_Cnt) // TODO -- add overflow count
    res.subs = (ctr & SUBS_Msk) << (32 - SUBS_Cnt)
    if (DEBUG) printf`raw: ovr = %08x, ctr = %08x, secs = %08x, subs = %08x\n`(ovr_cnt, ctr, res.secs, res.subs)
    return res
}

export function toThresh(qsecs: T.Secs30p2): T.RtcThresh {
    return qsecs << 13   // 32 kHz
}

export function RTC0_isr$$() {
    IntrVec.NVIC_clear(e$`RTC0_IRQn`)
    if ($R.RTC0.EVENTS_OVRFLW.$$) {
        $R.RTC0.EVENTS_OVRFLW.$$ = 0
        ovr_cnt += 1
        $['%%>']($R.RTC0.COUNTER.$$)
        return
    }
    const hlr = cur_hlr
    disable()
    if (hlr != $null) hlr()
}
