import '@$$emscript'
export const $T = $declare('TEMPLATE')

import * as $R from '@nordic.distro.nrf54/REGS.em'

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
    const pn = <u8>(pin_num >> 8)
    const mask = 1 << pid

    export function clear(): void {
        $R.P[pn].OUTCLR.$$ = mask
    }

    export function functionSelect(select: u8): void {
        // switch (select) {
        //     case 1: {
        //         $R.GPIO[pn].EN0_CLR.$$ = mask
        //         $R.GPIO[pn].EN1_CLR.$$ = mask
        //         break
        //     }
        //     case 2: {
        //         $R.GPIO[pn].EN0_CLR.$$ = mask
        //         $R.GPIO[pn].EN1_SET.$$ = mask
        //         break
        //     }
        // }
    }

    export function get(): bool_t {
        return $R.P[pn].IN.$$ & mask ? true : false
    }

    export function isInput(): bool_t {
        return false
    }

    export function isOutput(): bool_t {
        return true
    }

    export function makeInput(): void {
        $R.P[pn].DIRCLR.$$ = mask
    }

    export function makeOutput(): void {
        $R.P[pn].DIRSET.$$ = mask
    }

    export function pinId(): i16 {
        return pid
    }

    export function reset(): void {
        $R.P[pn].PIN_CNF[pid].$$ = $R.GPIO_PIN_CNF_INPUT_Msk
    }

    export function set(): void {
        $R.P[pn].OUTSET.$$ = mask
    }

    export function setInternalPulldown(enable: bool_t): void {
        $R.P[pn].PIN_CNF[pid].$$ = $R.GPIO_PIN_CNF_PULL_Pulldown << $R.GPIO_PIN_CNF_PULL_Pos
    }

    export function setInternalPullup(enable: bool_t): void {
        $R.P[pn].PIN_CNF[pid].$$ = $R.GPIO_PIN_CNF_PULL_Pullup << $R.GPIO_PIN_CNF_PULL_Pos
    }

    export function toggle(): void {
        $R.P[pn].OUT.$$ ^= mask
    }
}

export function $clone() {
    return { $T, ...em$template }
}
