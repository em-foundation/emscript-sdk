import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as BoardC from '@$distro/BoardC.em'
import * as Common from '@em.mcu/Common.em'

export const AppLed = $delegate(BoardC.AppLed)
export const OneShot = $delegate(BoardC.OneShot)

var active_flag = false

export function em$run() {
    Common.GlobalInterrupts.$$.enable()
    for (let i = 0; i < 5; i++) {
        em.$['%%d']
        AppLed.$$.on()
        Common.BusyWait.$$.wait(5_000)
        AppLed.$$.off()
        active_flag = true
        OneShot.$$.enable(100, $cb(handler), 0)
        while (active_flag) Common.Idle.$$.exec()
    }
}

function handler(arg: arg_t) {
    em.$['%%c']
    active_flag = false
}
