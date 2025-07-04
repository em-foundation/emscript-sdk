import '@$$emscript'
export const $T = $declare('TEMPLATE')

import * as $R from '@nordic.distro.nrf52/REGS.em'

import * as GpioI from '@em.hal/GpioI.em'

export namespace em$template {
    export const $U = $declare('MODULE', GpioI)

    export const pin_num = $config<i16>(-1)

    export namespace em$meta {
        export function pinId(): i16 {
            return pin_num
        }
    }

    const pid = pin_num & 0xff
    const mask = 1 << pid

    export function clear(): void {
        $R.P0.OUTCLR.$$ = mask
    }

    export function functionSelect(select: u8): void {
    }

    export function get(): bool_t {
        return $R.P0.IN.$$ & mask ? true : false
    }

    export function isInput(): bool_t {
        return false
    }

    export function isOutput(): bool_t {
        return true
    }

    export function makeInput(): void {
        $R.P0.DIRCLR.$$ = mask
    }

    export function makeOutput(): void {
        $R.P0.DIRSET.$$ = mask
    }

    export function pinId(): i16 {
        return pid
    }

    export function reset(): void {
        $R.P0.PIN_CNF[pid].$$ = $R.GPIO_PIN_CNF_INPUT_Msk
    }

    export function set(): void {
        $R.P0.OUTSET.$$ = mask
    }

    export function setInternalPulldown(enable: bool_t): void {
        $R.P0.PIN_CNF[pid].$$ = $R.GPIO_PIN_CNF_PULL_Pulldown << $R.GPIO_PIN_CNF_PULL_Pos
    }

    export function setInternalPullup(enable: bool_t): void {
        $R.P0.PIN_CNF[pid].$$ = $R.GPIO_PIN_CNF_PULL_Pullup << $R.GPIO_PIN_CNF_PULL_Pos
    }

    export function toggle(): void {
        $R.P0.OUT.$$ ^= mask
    }
}

export function $clone() {
    return { $T, ...em$template }
}
