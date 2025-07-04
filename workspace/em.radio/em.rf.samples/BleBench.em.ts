import '@$$emscript'
export const $U = $declare('MODULE')

import * as BoardC from '@$distro/BoardC.em'
import * as Common from '@em.mcu/Common.em'
import * as FiberMgr from '@em.utils/FiberMgr.em'
import * as RadioConfig from '@em.rf.driver/Config.em'
import * as TickerMgr from '@em.utils/TickerMgr.em'
import * as TimeTypes from '@em.utils/TimeTypes.em'

export const RadioDriver = $delegate(BoardC.RadioDriver)

const ticker = $config<TickerMgr.Obj>()

let adv_pkt = $table<u8>()

export namespace em$meta {
    export function em$configure() {
        RadioConfig.phy.$$val = RadioConfig.Phy.BLE_1M
    }
    export function em$construct() {
        ticker.$$val = TickerMgr.em$meta.create()
        let bytes = [0x22, 14, 0xCC, 0xCC, 0xBB, 0xBB, 0xAA, 0xAA, 4, 0x08, c$`E`, c$`M`, c$`S`, 2, 0x01, 0x06]
        for (const b of bytes) {
            adv_pkt.$$add(b)
        }
    }
}

//>> ---- em$targ ---- <<//

export function em$run() {
    ticker.$$.start(TimeTypes.Secs30p2_initMsecs(1000), $cb(tickCb))
    FiberMgr.run()
}

function tickCb() {
    RadioDriver.enable()
    for (const chan of $range(37, 40)) {
        RadioDriver.startTx(adv_pkt.$frame(0), chan)
        RadioDriver.waitReady()
    }
    RadioDriver.disable()
    $['%%d']
}