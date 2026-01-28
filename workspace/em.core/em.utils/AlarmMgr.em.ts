import '@$$emscript'
export const $U = $declare('MODULE')

import * as Common from '@em.mcu/Common.em'
import * as FiberMgr from '@em.utils/FiberMgr.em'
import * as RtcI from '@em.hal/RtcI.em'
import * as T from '@em.utils/TimeTypes.em'

export const Rtc = $proxy<RtcI.$I>()

export type Obj = $$<Alarm>

class Alarm extends $struct {
    _fiber: FiberMgr.Obj
    _thresh: T.RtcThresh
    _wup_time: T.Secs30p2
}
interface Alarm {
    cancel(this: Alarm): void
    isActive(this: Alarm): bool_t
    wakeup(this: Alarm, delta: T.Secs30p2): void
    wakeupAligned(this: Alarm, delta: T.Secs30p2): void
}

var alarm_tab = $table<Alarm>()

export namespace em$meta {
    export function create(fiber: FiberMgr.Obj): Obj {
        let alarm = alarm_tab.$$add()
        alarm.$$._fiber = fiber
        return alarm
    }
}

//>> ---- em$targ ---- <<//

const DBG_FLG = false

function dispatch(cur_time: T.Secs30p2) {
    if (DBG_FLG) printf`dis: cur = %08x\n`(cur_time)
    Rtc.disable()
    let nxt_alarm = <Obj>$null
    let max_wup_time = ~(<T.Secs30p2>0)
    for (let a of alarm_tab) {
        // iterate through all alarms
        if (a.$$._wup_time == 0) continue // INACTIVE state
        if (cur_time >= a.$$._wup_time) { // EXPIRED state
            a.$$._wup_time = 0  // becomes INACTIVE after post
            a.$$._fiber.$$.post()
            continue
        }
        if (a.$$._wup_time <= max_wup_time) {
            // ACTIVE state
            nxt_alarm = a // best candidate
            max_wup_time = a.$$._wup_time
        }
    }
    if (nxt_alarm) {
        Rtc.enable(nxt_alarm.$$._thresh, $cb(wakeupHandler))
    }
}

function readCurTime(): T.Secs30p2 {
    return T.RawTimeToSecs30p2(Common.Uptimer.read())
}

function setup(alarm: Obj, delta: T.Secs30p2, aligned: bool_t) {
    const cur_time = readCurTime()
    let wup_time = cur_time + delta
    if (aligned) {
        wup_time -= wup_time % delta
    }
    alarm.$$._thresh = Rtc.toThresh(wup_time)
    alarm.$$._wup_time = wup_time
    if (DBG_FLG) printf`set: cur = %08x, wup = %08x, thr = %08x\n`(cur_time, wup_time, alarm.$$._thresh)
    dispatch(cur_time)
}

function wakeupHandler() {
    dispatch(readCurTime())
}

Alarm.prototype.cancel = function (this: Alarm) {
    this._wup_time = 0 // make inactive
}

Alarm.prototype.isActive = function (this: Alarm): bool_t {
    return this._wup_time != 0
}

Alarm.prototype.wakeup = function (this: Alarm, delta_qs: T.Secs30p2) {
    setup($ref(this), delta_qs, false)
}

Alarm.prototype.wakeupAligned = function (this: Alarm, delta_qs: T.Secs30p2) {
    setup($ref(this), delta_qs, true)
}
