import '@$$emscript'
export const $U = $declare('MODULE')

import * as AlarmMgr from '@em.utils/AlarmMgr.em'
import * as BoardC from '@$distro/BoardC.em'
import * as Config from '@em.rf.driver/Config.em'
import * as FiberMgr from '@em.utils/FiberMgr.em'
import * as TimeTypes from '@em.utils/TimeTypes.em'

export const AppLed = $delegate(BoardC.AppLed)
export const RadioDriver = $delegate(BoardC.RadioDriver)

const alarm = $config<AlarmMgr.Obj>()
const fiber = $config<FiberMgr.Obj>()

var pktbuf = $table<u8>()

export namespace em$meta {
    export function em$init() {
        for (const _ of $range(25)) pktbuf.$$add(0)
    }
    export function em$configure() {
        Config.phy.$$val = Config.Phy.BLE_1M
    }
    export function em$construct() {
        fiber.$$val = FiberMgr.em$meta.create($cb(fiberF))
        alarm.$$val = AlarmMgr.em$meta.create(fiber)
    }
}

//>> ---- em$targ ---- <<//

const CHAN = 17
const RATE = 1000

export function em$run() {
    fiber.$$.post()
    FiberMgr.run()
}

function fiberF(_: arg_t) {
    RadioDriver.enable()
    RadioDriver.startRx(CHAN, 0)
    RadioDriver.waitReady()
    AppLed.wink(5)
    for (const b of pktbuf.$frame(0)) printf`%02x `(b)
    printf`\n`()
    RadioDriver.disable()
    alarm.$$.wakeup(TimeTypes.Secs30p2_initMsecs(RATE))
}