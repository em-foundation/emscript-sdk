import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as Common from '@em.mcu/Common.em'
import * as OneShotI from '@em.hal/OneShotI.em'

export const OneShot = $proxy<OneShotI.$I>()

var active_flag = <volatile_t<bool_t>>false

export function pause(time_ms: u32) {
    upause(time_ms * 1000)
}

export function upause(time_us: u32) {
    if (time_us == 0) return
    active_flag = true
    OneShot.$$.uenable(time_us, $cb(handler), 0)
    while (active_flag) Common.Idle.$$.exec()
}

function handler(a: arg_t) {
    active_flag = false
}
