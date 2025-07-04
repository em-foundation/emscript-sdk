import '@$$emscript'
export const $U = $declare('MODULE', RtcI)

import * as $R from '@adi.distro.max326xx/REGS.em'

import * as IntrVec from '@em.arch.arm/IntrVec.em'
import * as RtcI from '@em.hal/RtcI.em'
import * as T from '@em.utils/TimeTypes.em'

export type Handler = RtcI.Handler

export namespace em$meta {
    export function em$construct() {
        IntrVec.em$meta.useIntr('RTC')
    }
}

//>> ---- em$targ ---- <<//

var cur_hlr = <Handler>$null

export function em$startup() {
    $R.GCR.CLKCTRL.$$ |= $R.F_GCR_CLKCTRL_ERTCO_EN
    $R.RTC.CTRL.$$ = 0
    $R.RTC.CTRL.$$ = $R.F_RTC_CTRL_WR_EN
    while ($R.RTC.CTRL.$$ & $R.F_RTC_CTRL_BUSY) { }
    $R.RTC.CTRL.$$ = $R.F_RTC_CTRL_EN | $R.F_RTC_CTRL_RD_EN | $R.F_RTC_CTRL_WR_EN
    $R.GCR.PM.$$ |= $R.F_GCR_PM_RTC_WE
    IntrVec.NVIC_enable(e$`RTC_IRQn`)
}

export function disable() {
    cur_hlr = $null
    while ($R.RTC.CTRL.$$ & $R.F_RTC_CTRL_BUSY) { }
    $R.RTC.CTRL.$$ &= ~($R.F_RTC_CTRL_SSEC_ALARM_IE | $R.F_RTC_CTRL_SSEC_ALARM)
}

export function enable(thresh: T.RtcThresh, handler: Handler) {
    cur_hlr = handler
    const ticks = toTicks(thresh)
    $R.RTC.CTRL.$$ &= ~$R.F_RTC_CTRL_EN
    while ($R.RTC.CTRL.$$ & $R.F_RTC_CTRL_BUSY) { } // KEEP
    $R.RTC.SSECA.$$ = ticks
    $R.RTC.CTRL.$$ |= $R.F_RTC_CTRL_SSEC_ALARM_IE
    while ($R.RTC.CTRL.$$ & $R.F_RTC_CTRL_BUSY) { } // KEEP
    $R.RTC.CTRL.$$ |= $R.F_RTC_CTRL_EN
}

export function getRawTime(): T.RawTime {
    let secs: u32
    let subs: u32
    while (true) {
        subs = $R.RTC.SSEC.$$
        secs = $R.RTC.SEC.$$
        if ($R.RTC.SEC.$$ != secs) continue
        if ($R.RTC.SSEC.$$ != subs) break
    }
    let res = T.RawTime.$make()
    res.secs = secs
    res.subs = subs << 20
    return res
}

export function toThresh(qsecs: T.Secs30p2): T.RtcThresh {
    return qsecs // wup_time
}

export function RTC_isr$$() {
    IntrVec.NVIC_clear(e$`RTC_IRQn`)
    const hlr = cur_hlr
    disable()
    if (hlr != $null) hlr()
}

function toTicks(wup_time: T.Secs30p2): T.RtcThresh {
    const cur_time = T.RawTimeToSecs30p2(getRawTime())
    return 0xFFFF_FFFF - ((wup_time - cur_time) << 10)
}
