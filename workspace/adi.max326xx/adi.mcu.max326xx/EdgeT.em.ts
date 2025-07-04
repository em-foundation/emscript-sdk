import '@$$emscript'
export const $T = $declare('TEMPLATE')

import * as $R from '@adi.distro.max326xx/REGS.em'

import * as Aux from '@adi.mcu.max326xx/EdgeAux.em'
import * as EdgeI from '@em.hal/EdgeI.em'
import * as GpioI from '@em.hal/GpioI.em'

export namespace em$template {
    export const $U = $declare('MODULE', EdgeI)

    export const Pin = $proxy<GpioI.$I>()
    export const pin_num = $config<i16>()

    export namespace em$meta {
        export function setDetectHandler(h: EdgeI.Handler) {
            let hi = Aux.HandlerInfo.$make()
            hi.handler = h
            hi.mask = 1 << pin_num
            Aux.em$meta.addHandlerInfo(hi)
        }
    }

    const pid = pin_num & 0xff
    const mask = 1 << pid

    export function clearDetect(): void {
        $R.GPIO0.INTFL_CLR.$$ = mask
    }

    export function disableDetect(): void {
        $R.GPIO0.INTEN_CLR.$$ = mask
    }

    export function enableDetect(): void {
        $R.GPIO0.INTEN_SET.$$ = mask
    }

    export function getState(): bool_t {
        return Pin.get()
    }

    export function init(pullup: bool_t) {
        Pin.makeInput()
        Pin.setInternalPullup(pullup)
        $R.GPIO0.INTMODE.$$ |= mask
    }

    export function setDetectFalling() {
        $R.GPIO0.INTPOL.$$ &= ~mask
    }

    export function setDetectRising() {
        $R.GPIO0.INTPOL.$$ |= mask
    }
}

export function $clone() {
    return { $T, ...em$template }
}
