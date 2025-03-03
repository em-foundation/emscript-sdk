import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as $R from '@adi.distro.max326xx/REGS.em'

import * as TimeTypes from '@em.utils/TimeTypes.em'

export function em$startup() {
    $R.GCR.CLKCTRL.$$ |= $R.F_GCR_CLKCTRL_ERTCO_EN
    $R.RTC.CTRL.$$ = 0
    $R.RTC.CTRL.$$ = $R.F_RTC_CTRL_WR_EN
    while ($R.RTC.CTRL.$$ & $R.F_RTC_CTRL_BUSY) {}
    $R.RTC.CTRL.$$ = $R.F_RTC_CTRL_EN | $R.F_RTC_CTRL_RD_EN | $R.F_RTC_CTRL_WR_EN
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
