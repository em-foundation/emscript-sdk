import '@$$emscript'
export const $U = $declare('INTERFACE')

import * as T from '@em.utils/TimeTypes.em'

export type Handler = cb_t<[]>

export interface $I {
    disable(): void
    enable(thresh: T.RtcThresh, handler: Handler): void
    getRawTime(): T.RawTime
    toThresh(qsecs: T.Secs30p2): T.RtcThresh
}