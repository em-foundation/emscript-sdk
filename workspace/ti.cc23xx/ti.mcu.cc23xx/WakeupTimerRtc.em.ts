import em from '@$$emscript'
export const $U = em.$declare('MODULE', WakeupTimerI)

import * as Rtc from '@ti.mcu.cc23xx/Rtc.em'
import * as WakeupTimerI from '@em.hal/WakeupTimerI.em'

type Handler = WakeupTimerI.Handler
type Secs24p8 = WakeupTimerI.Secs24p8
type Thresh = WakeupTimerI.Thresh

export function disable() {
    Rtc.disable()
}

export function enable(secs256: Secs24p8, handler: Handler) {
    Rtc.enable(secs256, handler)
}

export function secsAligned(secs: Secs24p8): Secs24p8 {
    let raw_time = Rtc.getRawTime()
    let raw_secs = <Secs24p8>((raw_time.secs << 8) | (raw_time.subs >> 24))
    let rem = raw_secs % secs
    return secs - rem
}

export function secsToThresh(secs: Secs24p8): Thresh {
    return Rtc.toThresh(secs << 8)
}
