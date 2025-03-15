import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as $R from '@adi.distro.max326xx/REGS.em'

import * as Common from '@em.mcu/Common.em'

import * as IntrVec from '@em.arch.arm/IntrVec.em'
import * as TimeTypes from '@em.utils/TimeTypes.em'

export type Handler = cb_t<[]>

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

export function enable(thresh: u32, handler: Handler) {
    cur_hlr = handler
    $R.RTC.SSECA.$$ = thresh
    while ($R.RTC.CTRL.$$ & $R.F_RTC_CTRL_BUSY) { }
    $R.RTC.CTRL.$$ |= $R.F_RTC_CTRL_SSEC_ALARM_IE
}

export function getRawTime(): TimeTypes.RawTime {
    let secs: u32
    let subs: u32
    while (true) {
        subs = $R.RTC.SSEC.$$
        secs = $R.RTC.SEC.$$
        if ($R.RTC.SEC.$$ != secs) continue
        if ($R.RTC.SSEC.$$ != subs) break
    }
    let res = TimeTypes.RawTime.$make()
    res.secs = secs
    res.subs = subs << 20
    return res
}

export function toThresh(ticks: u32): u32 {
    return 0xFFFF_FFFF - ticks
}

export function RTC_isr$$() {
    const hlr = cur_hlr
    disable()
    if (hlr != $null) hlr()
}
