import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as BoardC from '@$distro/BoardC.em'
import * as Common from '@em.mcu/Common.em'
import * as Poller from '@em.mcu/Poller.em'

export const AppLed = $delegate(BoardC.AppLed)

export function em$run() {
    Common.GlobalInterrupts.$$.enable()
    for (let _ of $range(5)) {
        Poller.upause(100_000) // 100ms
        AppLed.$$.wink(5) // 5ms
    }
}
