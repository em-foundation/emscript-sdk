import em from '@$$emscript'
export const $T = em.$declare('TEMPLATE')

import * as ButtonI from '@em.hal/ButtonI.em'
import * as EdgeI from '@em.hal/EdgeI.em'
import * as FiberMgr from '@em.utils/FiberMgr.em'
import * as Poller from '@em.mcu/Poller.em'

export namespace em$template {

    export const $U = em.$declare('MODULE', ButtonI)

    export const Edge = $proxy<EdgeI.$I>()

    export type Handler = ButtonI.Handler

    const debounceF = $config<FiberMgr.Obj>()

    export namespace em$meta {

        export function em$construct() {
            debounceF.$$ = FiberMgr.em$meta.create($cb(debounceFB))
            Edge.$$.em$meta.setDetectHandler($cb(buttonHandler))
        }
    }

    var cur_fxn = <Handler>$null
    var cur_dur = 0
    var cur_max = 0
    var cur_min = 0

    export function em$startup() {
        Edge.$$.init(true)
        Edge.$$.setDetectFalling()
    }

    function buttonHandler() {
        Edge.$$.clearDetect()
        if (cur_fxn != $null) debounceF.$$.$$.post()
    }

    function debounceFB(a: arg_t) {
        cur_dur = 0
        while (true) {
            Poller.pause(cur_min)
            if (!isPressed() && cur_dur == 0) return
            cur_dur += cur_min
            if (!isPressed() || cur_dur >= cur_max) break
        }
        cur_fxn()
    }

    export function isPressed(): bool_t {
        return !Edge.$$.getState()
    }

    export function onPressed(handler: Handler, min_dur_ms: u16, max_dur_ms: u16) {
        cur_fxn = handler
        cur_max = max_dur_ms
        cur_min = min_dur_ms
        if (handler == $null) {
            Edge.$$.disableDetect()
        } else {
            Edge.$$.enableDetect()
        }
    }

}

export function $clone() { return { $T, ...em$template } }
