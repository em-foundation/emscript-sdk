import em from '@$$emscript'
export const $T = em.$declare('TEMPLATE')

import * as GpioI from '@em.hal/GpioI.em'
import * as LedI from '@em.hal/LedI.em'
import * as Poller from '@em.mcu/Poller.em'

export namespace em$template {

    export const $U = em.$declare('MODULE', LedI)

    export const Pin = $proxy<GpioI.$I>()
    export const active_low = $config<bool_t>(false)

    export function em$startup(): void {
        Pin.$$.makeOutput()
        off()
    }

    export function off(): void {
        if (active_low.$$) { Pin.$$.set() } else { Pin.$$.clear() }
    }

    export function on(): void {
        if (active_low.$$) { Pin.$$.clear() } else { Pin.$$.set() }
    }

    export function toggle(): void {
        Pin.$$.toggle()
    }

    export function wink(msecs: u32): void {
        on()
        Poller.pause(msecs)
        off()
    }
}

export function $clone() { return { $T, ...em$template } }
