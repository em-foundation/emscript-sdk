import em from '@$$emscript'
export const $U = em.$declare('MODULE', WakeupTimerI)

import * as Rtc from '@nordic.mcu.nrf54/Rtc.em'
import * as WakeupTimerI from '@em.hal/WakeupTimerI.em'

type Handler = WakeupTimerI.Handler
type Secs24p8 = WakeupTimerI.Secs24p8
type Thresh = WakeupTimerI.Thresh

//>> ---- em$targ ---- <<//

export function disable() {
    Rtc.disable()
}

export function enable(secs256: Secs24p8, handler: Handler) {
    Rtc.enable(secs256, handler)
}

export function secsAligned(secs: Secs24p8): Secs24p8 {
    const raw_time = Rtc.getRawTime()
    const raw_secs = <Secs24p8>((raw_time.secs << 24) | (raw_time.subs >> 24))
    const res = secs - (raw_secs % secs)
    return res
}

export function secsToThresh(secs: Secs24p8): Thresh {
    return Rtc.toThresh(secs)
}
