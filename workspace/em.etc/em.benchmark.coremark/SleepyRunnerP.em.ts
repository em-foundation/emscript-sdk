import '@$$emscript'
export const $U = $declare('MODULE')

import * as CoreBench from '@em.benchmark.coremark/CoreBench.em'
import * as FiberMgr from '@em.utils/FiberMgr.em'
import * as TickerMgr from '@em.utils/TickerMgr.em'
import * as TimeTypes from '@em.utils/TimeTypes.em'

const ticker = $config<TickerMgr.Obj>()

export namespace em$meta {
    export function em$construct() {
        ticker.$$val = TickerMgr.em$meta.create()
    }
}

//>> ---- em$targ ---- <<//

let count = 100

export function em$startup() {
    CoreBench.setup()
}

export function em$run() {
    ticker.$$.start(TimeTypes.Secs30p2_initMsecs(1_000), $cb(tickCB))
    FiberMgr.run()
}

function tickCB() {
    $['%%d+']
    const crc = CoreBench.run(0)
    $['%%d-']
    printf`crc = %04x\n`(crc)
    count -= 1
    if (count > 0) return
    ticker.$$.stop()
    halt()
}
