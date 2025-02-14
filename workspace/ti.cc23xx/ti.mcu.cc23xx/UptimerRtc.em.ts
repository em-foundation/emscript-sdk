import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as Rtc from '@ti.mcu.cc23xx/Rtc.em'
import * as TimeTypes from '@em.utils/TimeTypes.em'

export function read(): TimeTypes.RawTime {
    return Rtc.getRawTime()
}
