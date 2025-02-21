import em from '@$$emscript'
export const $U = em.$declare('MODULE', UptimerI)

import * as Rtc from '@ti.mcu.cc23xx/Rtc.em'
import * as TimeTypes from '@em.utils/TimeTypes.em'
import * as UptimerI from '@em.hal/UptimerI.em'

export function read(): TimeTypes.RawTime {
    return Rtc.getRawTime()
}
