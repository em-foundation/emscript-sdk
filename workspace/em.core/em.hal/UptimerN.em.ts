import '@$$emscript'
export const $U = $declare('MODULE', UptimerI)

import * as UptimerI from '@em.hal/UptimerI.em'
import * as TimeTypes from '@em.utils/TimeTypes.em'

export function read(): TimeTypes.RawTime {
    return TimeTypes.RawTime_ZERO()
}
