import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as AlarmMgr from '@em.utils/AlarmMgr.em'
import * as BoardC from '@$distro/BoardC.em'
import * as FiberMgr from '@em.utils/FiberMgr.em'
import * as TimeTypes from '@em.utils/TimeTypes.em'

export const AppLed = $delegate(BoardC.AppLed)

let alarm = $config<AlarmMgr.Obj>()
let blinkF = $config<FiberMgr.Obj>()

export namespace em$meta {
    export function em$construct() {
        blinkF.$$ = FiberMgr.em$meta.create($cb(blinkFB))
        alarm.$$ = AlarmMgr.em$meta.create(blinkF.$$)
    }
}

var counter = <u32>0

export function em$run() {
    blinkF.$$.$$.post()
    FiberMgr.run()
}

function blinkFB(a: arg_t) {
    em.$['%%c']
    counter += 1
    let msecs = (counter & 0x1) != 0 ? 100 : 5
    AppLed.$$.wink(msecs)
    alarm.$$.$$.wakeupAligned(TimeTypes.Secs24p8_initMsecs(1_500))
}
