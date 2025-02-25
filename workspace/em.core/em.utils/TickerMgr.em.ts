import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as AlarmMgr from '@em.utils/AlarmMgr.em'
import * as FiberMgr from '@em.utils/FiberMgr.em'
import * as TimeTypes from '@em.utils/TimeTypes.em'

export type Callback = cb_t<[]>
export type Obj = ref_t<Ticker>

class Ticker extends $struct {
    _alarm: AlarmMgr.Obj
    _fiber: FiberMgr.Obj
    _rate: TimeTypes.Secs24p8
    _tick_cb: Callback
    start: (rate: TimeTypes.Secs24p8, tick_cb: Callback) => void
    stop: () => void
}
let TickerFac = $factory(Ticker.$make())

export namespace em$meta {
    export function create(): Obj {
        let ticker = TickerFac.$create()
        let fiber = FiberMgr.em$meta.create($cb(alarmFB), TickerFac.$len - 1)
        let alarm = AlarmMgr.em$meta.create(fiber)
        ticker.$$._alarm = alarm
        ticker.$$._fiber = fiber
        return ticker
    }
}

function alarmFB(a: arg_t) {
    let ticker = $ref(TickerFac[<u16>a])
    if (ticker.$$._tick_cb == $null) return
    ticker.$$._tick_cb()
    ticker.$$._alarm.$$.wakeupAligned(ticker.$$._rate)
}

function Ticker__start(self: Obj, rate: TimeTypes.Secs24p8, tick_cb: Callback) {
    self.$$._rate = rate
    self.$$._tick_cb = tick_cb
    self.$$._alarm.$$.wakeupAligned(rate)
}

function Ticker__stop(self: Obj) {
    self.$$._alarm.$$.cancel()
    self.$$._tick_cb = $null
}
