import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as FiberMgr from '@em.utils/FiberMgr.em'
import * as TimeTypes from '@em.utils/TimeTypes.em'
import * as WakeupTimerI from '@em.hal/WakeupTimerI.em'

export const WakeupTimer = $proxy<WakeupTimerI.$I>()

export type Obj = $$<Alarm>

type Secs24p8 = TimeTypes.Secs24p8
type Thresh = WakeupTimerI.Thresh

class Alarm extends $struct {
    _fiber: FiberMgr.Obj
    _thresh: Thresh
    _dt_secs: Secs24p8
}
interface Alarm {
    cancel(this: Alarm): void
    isActive(this: Alarm): bool_t
    wakeup(this: Alarm, delta: Secs24p8): void
    wakeupAligned(this: Alarm, delta: Secs24p8): void
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

var cur_alarm = <Obj>$null

function dispatch(delta: Secs24p8) {
    WakeupTimer.disable()
    let nxt_alarm = <Obj>$null
    let max_dt_secs = ~(<Secs24p8>0)
    for (let a of alarm_tab) {
        // iterate through all alarms
        if (a.$$._dt_secs == 0) continue // INACTIVE state
        a.$$._dt_secs -= delta > a.$$._dt_secs ? a.$$._dt_secs : delta
        if (a.$$._dt_secs == 0) {
            // RINGING state
            a.$$._fiber.$$.post() // becomes INACTIVE after post
            continue
        }
        if (a.$$._dt_secs <= max_dt_secs) {
            // ACTIVE state
            nxt_alarm = a // best candidate
            max_dt_secs = a.$$._dt_secs
        }
    }
    cur_alarm = nxt_alarm // $null if no candidates found
    if (cur_alarm) {
        const id = <arg_t>cur_alarm
        // $['%%>'](<u8>id)
        WakeupTimer.enable(cur_alarm.$$._thresh, $cb(wakeupHandler))
    }
}

function setup(alarm: Obj, delta: Secs24p8) {
    alarm.$$._thresh = WakeupTimer.secsToThresh(delta)
    alarm.$$._dt_secs = delta
    if (cur_alarm == $null || cur_alarm.$$._dt_secs > delta) {
        //        if (cur_alarm) {
        //            $['%%>'](<u8>0xAA)
        //            $['%%>'](cur_alarm.$$._dt_secs)
        //            $['%%>'](delta)
        //        }
        dispatch(0)
    }
}

function wakeupHandler() {
    dispatch(cur_alarm.$$._dt_secs)
}

Alarm.prototype.cancel = function (this: Alarm) {
    this._dt_secs = 0 // make inactive
}

Alarm.prototype.isActive = function (this: Alarm): bool_t {
    return this._dt_secs != 0
}

Alarm.prototype.wakeup = function (this: Alarm, delta: Secs24p8) {
    setup($ref(this), delta)
}

Alarm.prototype.wakeupAligned = function (this: Alarm, delta: Secs24p8) {
    setup($ref(this), WakeupTimer.secsAligned(delta))
}
