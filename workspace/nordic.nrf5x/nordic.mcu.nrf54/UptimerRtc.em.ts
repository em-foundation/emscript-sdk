import em from '@$$emscript'
export const $U = em.$declare('MODULE', UptimerI)

import * as Rtc from '@nordic.mcu.nrf54/Rtc.em'
import * as UptimerI from '@em.hal/UptimerI.em'
import * as TimeTypes from '@em.utils/TimeTypes.em'

export function read(): TimeTypes.RawTime {
    return Rtc.getRawTime()
}
