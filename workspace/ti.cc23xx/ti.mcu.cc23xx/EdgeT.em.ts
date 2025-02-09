import em from '@$$emscript'
export const $T = em.$declare('TEMPLATE')

import * as Aux from '@ti.mcu.cc23xx/EdgeAux.em'
import * as EdgeI from '@em.hal/EdgeI.em'
import * as GpioI from '@em.hal/GpioI.em'

export namespace em$template {

    export const $U = em.$declare('MODULE')

    export const Pin = $proxy<GpioI.$I>()
    export const pin_num = $config<i16>()

    export namespace em$meta {

        export function setDetectHandler(h: EdgeI.Handler) {
            let hi = Aux.HandlerInfo.$make()
            hi.handler = h
            hi.mask = 1 << pin_num.$$
            Aux.em$meta.addHandlerInfo(hi)
        }
    }

    const pn = pin_num.$$
    const mask = 1 << pn

    export function clearDetect(): void {
        $R.GPIO.ICLR.$$ = mask
    }

    export function disableDetect(): void {
        $R.GPIO.IMCLR.$$ = mask
        $R.IOC.IOC0.$[pn].$$ &= ~$R.IOC_IOC0_WUENSB
    }

    export function enableDetect(): void {
        $R.GPIO.IMSET.$$ = mask
        $R.IOC.IOC0.$[pn].$$ |= $R.IOC_IOC0_WUENSB
    }

    export function getState(): bool_t {
        return Pin.$$.get()
    }

    export function init(pullup: bool_t) {
        Pin.$$.makeInput()
        Pin.$$.setInternalPullup(pullup)
    }

    export function setDetectFalling() {
        $R.IOC.IOC0.$[pn].$$ &= ~$R.IOC_IOC0_EDGEDET_M
        $R.IOC.IOC0.$[pn].$$ |= $R.IOC_IOC0_EDGEDET_EDGE_NEG
    }

    export function setDetectRising() {
        $R.IOC.IOC0.$[pn].$$ &= ~$R.IOC_IOC0_EDGEDET_M
        $R.IOC.IOC0.$[pn].$$ |= $R.IOC_IOC0_EDGEDET_EDGE_POS
    }
}

export function $clone() { return { $T, ...em$template } }
