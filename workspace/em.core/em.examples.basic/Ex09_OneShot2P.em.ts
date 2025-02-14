import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as BoardC from '@$distro/BoardC.em'
import * as Common from '@em.mcu/Common.em'
import * as FiberMgr from '@em.utils/FiberMgr.em'

export const AppLed = $delegate(BoardC.AppLed)
export const OneShot = $delegate(BoardC.OneShot)

let blinkF = $config<FiberMgr.Obj>()

export namespace em$meta {
    export function em$construct() {
        blinkF.$$ = FiberMgr.em$meta.create($cb(blinkFB))
    }
}

var count = 5

export function em$run() {
    blinkF.$$.$$.post()
    FiberMgr.run()
}

function blinkFB(a: arg_t) {
    em.$['%%d']
    if (--count == 0) em.halt()
    AppLed.$$.on()
    Common.BusyWait.$$.wait(5_000)
    AppLed.$$.off()
    OneShot.$$.enable(100, $cb(handler), 0)
}

function handler(arg: arg_t) {
    em.$['%%c']
    blinkF.$$.$$.post()
}
