import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as BoardC from '@$distro/BoardC.em'
import * as Common from '@em.mcu/Common.em'

export const AppButEdge = $delegate(BoardC.AppButEdge)
export const AppLed = $delegate(BoardC.AppLed)

export namespace em$meta {
    export function em$construct() {
        AppButEdge.$$.em$meta.setDetectHandler($cb(handler))
    }
}

export function em$startup() {
    AppButEdge.$$.init(true)
    AppButEdge.$$.setDetectFalling()
}

export function em$run() {
    Common.GlobalInterrupts.$$.enable()
    while (true) {
        AppButEdge.$$.enableDetect()
        Common.Idle.$$.exec()
    }
}

function handler() {
    $['%%c']
    AppButEdge.$$.clearDetect()
    AppLed.$$.on()
    Common.BusyWait.$$.wait(5_000)
    AppLed.$$.off()
}
