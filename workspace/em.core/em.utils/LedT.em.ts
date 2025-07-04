import '@$$emscript'
export const $T = $declare('TEMPLATE')

import * as Common from '@em.mcu/Common.em'
import * as GpioI from '@em.hal/GpioI.em'
import * as LedI from '@em.hal/LedI.em'
import * as Poller from '@em.mcu/Poller.em'

export namespace em$template {
    export const $U = $declare('MODULE', LedI)

    export const Pin = $proxy<GpioI.$I>()
    export const active_low = $config<bool_t>()

    export namespace em$meta {
        export function em$construct() {
            Common.Idle.em$meta.addSleepEnter($cb(sleepEnter))
            Common.Idle.em$meta.addSleepLeave($cb(sleepLeave))
        }
    }

    //>> ---- em$targ ---- <<//

    export function em$startup(): void {
        sleepLeave()
    }

    export function off(): void {
        if (active_low) {
            Pin.set()
        } else {
            Pin.clear()
        }
    }

    export function on(): void {
        if (active_low) {
            Pin.clear()
        } else {
            Pin.set()
        }
    }

    export function toggle(): void {
        Pin.toggle()
    }

    export function wink(msecs: u32): void {
        on()
        Poller.pause(msecs)
        off()
    }

    function sleepEnter() {
        Pin.reset()
    }

    function sleepLeave() {
        Pin.makeOutput()
        off()
    }
}

export function $clone() {
    return { $T, ...em$template }
}
