import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as BoardC from '@$distro/BoardC.em'
import * as Common from '@em.mcu/Common.em'
import * as FiberMgr from '@em.utils/FiberMgr.em'

export const AppButEdge = $delegate(BoardC.AppButEdge)
export const AppLed = $delegate(BoardC.AppLed)

const blinkF = $config<FiberMgr.Obj>()

export namespace em$meta {
    export function em$construct() {
        AppButEdge.$$.em$meta.setDetectHandler($cb(handler))
        blinkF.$$ = FiberMgr.em$meta.create($cb(blinkFB))
    }
}

export function em$startup() {
    AppButEdge.$$.init(true)
    AppButEdge.$$.setDetectFalling()
}

export function em$run() {
    AppButEdge.$$.enableDetect()
    FiberMgr.run()
}

function blinkFB(a: arg_t) {
    $['%%d']
    AppLed.$$.on()
    Common.BusyWait.$$.wait(5_000)
    AppLed.$$.off()
    AppButEdge.$$.enableDetect()
}


function handler() {
    $['%%c']
    AppButEdge.$$.clearDetect()
    blinkF.$$.$$.post()
}
