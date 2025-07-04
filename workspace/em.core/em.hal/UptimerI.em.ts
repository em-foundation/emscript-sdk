import '@$$emscript'
export const $U = $declare('INTERFACE')

import * as TimeTypes from '@em.utils/TimeTypes.em'

export interface $I {
    read(): TimeTypes.RawTime
}
