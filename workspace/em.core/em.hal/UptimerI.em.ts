import em from '@$$emscript'
export const $U = em.$declare('INTERFACE')

import * as TimeTypes from '@em.utils/TimeTypes.em'

export interface $I {
    read(): TimeTypes.RawTime
}
