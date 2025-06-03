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
}
interface Ticker {
    start(this: Ticker, rate: TimeTypes.Secs24p8, tick_cb: Callback): void
    stop(this: Ticker): void
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

Ticker.prototype.start = function (this: Ticker, rate: TimeTypes.Secs24p8, tick_cb: Callback) {
    this._rate = rate
    this._tick_cb = tick_cb
    this._alarm.$$.wakeupAligned(rate)
}

Ticker.prototype.stop = function (this: Ticker) {
    this._alarm.$$.cancel()
    this._tick_cb = $null
}
