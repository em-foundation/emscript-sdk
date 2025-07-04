import '@$$emscript'
export const $U = $declare('INTERFACE')

import * as Dev from '@em.rf.core/Dev.em'

type Handler = cb_t<[]>

export interface em$meta {
    bindHandler(h: Handler): void
}

export interface $I {
    em$meta: em$meta
    disable(): void
    enable(): void
    startRx(rx_buf: Dev.BufPtr, chan: u8): void
    startTx(tx_buf: Dev.BufPtr, chan: u8): void
}