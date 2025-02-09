import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as BoardC from '@$distro/BoardC.em'
import * as Common from '@em.mcu/Common.em'
import * as FiberMgr from '@em.utils/FiberMgr.em'

export const AppBut = $delegate(BoardC.AppBut)
export const AppLed = $delegate(BoardC.AppLed)
export const SysLed = $delegate(BoardC.SysLed)

export function em$run() {
    AppBut.$$.onPressed($cb(onPressedH), 100, 4000)
    FiberMgr.run()
}

function onPressedH() {
    em.$['%%c']
    if (AppBut.$$.isPressed()) {
        SysLed.$$.on()
        Common.BusyWait.$$.wait(40_000)
        SysLed.$$.off()
    }
    else {
        AppLed.$$.on()
        Common.BusyWait.$$.wait(5_000)
        AppLed.$$.off()
    }
}
