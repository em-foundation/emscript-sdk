import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as BoardC from '@$distro/BoardC.em'
import * as Common from '@em.mcu/Common.em'

export const AppLed = $delegate(BoardC.AppLed)
export const OneShot = $delegate(BoardC.OneShot)

let active_flag = false

export function em$run() {
    Common.GlobalInterrupts.$$.enable()
    for (let _ of $range(5)) {
        $['%%d']
        AppLed.$$.on()
        Common.BusyWait.$$.wait(5_000)
        AppLed.$$.off()
        active_flag = true
        OneShot.$$.enable(100, $cb(handler), 0)
        while (active_flag) Common.Idle.$$.exec()
    }
}

function handler(arg: arg_t) {
    $['%%c']
    active_flag = false
}
