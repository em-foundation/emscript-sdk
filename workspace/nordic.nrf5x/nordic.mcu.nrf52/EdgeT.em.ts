import '@$$emscript'
export const $T = $declare('TEMPLATE')

import * as $R from '@nordic.distro.nrf52/REGS.em'

import * as Aux from '@nordic.mcu.nrf52/EdgeAux.em'
import * as EdgeI from '@em.hal/EdgeI.em'
import * as GpioI from '@em.hal/GpioI.em'

export namespace em$template {
    export const $U = $declare('MODULE', EdgeI)

    export const Pin = $proxy<GpioI.$I>()
    export const pin_num = $config<i16>()

    const pin_chan = $config<u8>()

    export namespace em$meta {
        export function setDetectHandler(h: EdgeI.Handler) {
            let hi = Aux.HandlerInfo.$make()
            hi.handler = h
            pin_chan.$$val = Aux.em$meta.addHandlerInfo(hi)
        }
    }

    const pc = <u8>pin_chan
    const pid = pin_num & 0xff
    const mask = 1 << pid
    const int_en = 1 << pc

    export function clearDetect(): void {
        $R.GPIOTE.EVENTS_IN[pc].$$ = 0
    }

    export function disableDetect(): void {
        $R.GPIOTE.INTENCLR.$$ = int_en
    }

    export function enableDetect(): void {
        $R.GPIOTE.INTENSET.$$ = int_en
    }

    export function getState(): bool_t {
        return Pin.get()
    }

    export function init(pullup: bool_t) {
        Pin.makeInput()
        Pin.setInternalPullup(pullup)
        $R.GPIOTE.CONFIG[pc].$$ =
            ($R.GPIOTE_CONFIG_MODE_Event << $R.GPIOTE_CONFIG_MODE_Pos) |
            (pid << $R.GPIOTE_CONFIG_PSEL_Pos)
    }

    export function setDetectFalling() {
        $R.GPIOTE.CONFIG[pc].$$ &= ~$R.GPIOTE_CONFIG_POLARITY_Msk
        $R.GPIOTE.CONFIG[pc].$$ |= $R.GPIOTE_CONFIG_POLARITY_HiToLo << $R.GPIOTE_CONFIG_POLARITY_Pos
    }

    export function setDetectRising() {
        $R.GPIOTE.CONFIG[pc].$$ &= ~$R.GPIOTE_CONFIG_POLARITY_Msk
        $R.GPIOTE.CONFIG[pc].$$ |= $R.GPIOTE_CONFIG_POLARITY_LoToHi << $R.GPIOTE_CONFIG_POLARITY_Pos
    }
}

export function $clone() {
    return { $T, ...em$template }
}
