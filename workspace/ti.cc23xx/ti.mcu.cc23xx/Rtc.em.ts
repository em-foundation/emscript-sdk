import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as $R from '@ti.distro.cc23xx/REGS.em'

import * as IntrVec from '@em.arch.arm/IntrVec.em'
import * as TimeTypes from '@em.utils/TimeTypes.em'

export namespace em$meta {
    export function em$construct() {
        IntrVec.em$meta.useIntr('CPUIRQ0')
    }
}

export type Handler = cb_t<[]>

const RES_BITS = <u8>20

let cur_hlr = <Handler>$null

export function em$startup() {
    $R.CKMD.LFINCOVR.$$ = 0x8000_0000 + (1 << RES_BITS)
    $R.RTC.CTL.$$ = $R.RTC_CTL_RST
    $R.EVTSVT.CPUIRQ0SEL.$$ = $R.EVTSVT_CPUIRQ0SEL_PUBID_AON_RTC_COMB
    IntrVec.NVIC_enable(e$`CPUIRQ0_IRQn`)
}

export function disable() {
    cur_hlr = $null
    $R.RTC.IMCLR.$$ = $R.RTC_IMCLR_EV0
}

export function enable(thresh: u32, handler: Handler) {
    cur_hlr = handler
    $R.RTC.CH0CC8U.$$ = thresh
    $R.RTC.IMSET.$$ = $R.RTC_IMSET_EV0
}

export function getRawTime(): TimeTypes.RawTime {
    let lo: u32
    let hi: u32
    while (true) {
        lo = $R.RTC.TIME8U.$$
        hi = $R.RTC.TIME524M.$$
        if (lo == $R.RTC.TIME8U.$$) break
    }
    let res = TimeTypes.RawTime.$make()
    res.secs = hi
    res.subs = lo << 16
    return res
}

export function toThresh(ticks: u32): u32 {
    return $R.RTC.TIME8U.$$ + ticks
}

export function CPUIRQ0_isr$$() {
    $R.RTC.ICLR.$$ = $R.RTC_ICLR_EV0
    if (cur_hlr != $null) cur_hlr()
}
