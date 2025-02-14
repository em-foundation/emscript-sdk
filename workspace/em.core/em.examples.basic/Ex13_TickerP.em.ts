import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as BoardC from '@$distro/BoardC.em'
import * as FiberMgr from '@em.utils/FiberMgr.em'
import * as TickerMgr from '@em.utils/TickerMgr.em'
import * as TimeTypes from '@em.utils/TimeTypes.em'

export const AppLed = $delegate(BoardC.AppLed)
export const SysLed = $delegate(BoardC.SysLed)

let app_ticker = $config<TickerMgr.Obj>()
let sys_ticker = $config<TickerMgr.Obj>()

export namespace em$meta {
    export function em$construct() {
        app_ticker.$$ = TickerMgr.em$meta.create()
        sys_ticker.$$ = TickerMgr.em$meta.create()
    }
}

export function em$run() {
    app_ticker.$$.$$.start(TimeTypes.Secs24p8_initMsecs(1_000), $cb(appTickCb))
    sys_ticker.$$.$$.start(TimeTypes.Secs24p8_initMsecs(1_500), $cb(sysTickCb))
    FiberMgr.run()
}

function appTickCb() {
    em.$['%%c']
    AppLed.$$.wink(100)
}

function sysTickCb() {
    em.$['%%d']
    SysLed.$$.wink(100)
}
