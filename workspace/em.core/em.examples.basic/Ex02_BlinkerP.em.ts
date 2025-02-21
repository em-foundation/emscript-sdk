import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as BoardC from '@$distro/BoardC.em'
import * as Common from '@em.mcu/Common.em'

export const AppLed = $delegate(BoardC.AppLed)

export function em$run() {
    AppLed.$$.on()
    for (let _ of $range(10)) {
        Common.BusyWait.$$.wait(500_000)
        AppLed.$$.toggle()
    }
    AppLed.$$.off()
}
