import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as BoardC from '@$distro/BoardC.em'
import * as Common from '@em.mcu/Common.em'

export const AppLed = $delegate(BoardC.AppLed)

export function em$run() {
    for (let i = 0; ; i++) {
        if (i % 10 == 0) {
            printf`hello world %d\n`(i / 2)
        }
        Common.BusyWait.$$.wait(500_000)
        AppLed.$$.toggle()
    }
}
