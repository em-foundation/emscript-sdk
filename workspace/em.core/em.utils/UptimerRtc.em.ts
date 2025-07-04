import '@$$emscript'
export const $U = $declare('MODULE', UptimerI)

import * as RtcI from '@em.hal/RtcI.em'
import * as UptimerI from '@em.hal/UptimerI.em'
import * as TimeTypes from '@em.utils/TimeTypes.em'

export const Rtc = $proxy<RtcI.$I>()

export function read(): TimeTypes.RawTime {
    return Rtc.getRawTime()
}
