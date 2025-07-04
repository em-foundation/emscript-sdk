import '@$$emscript'
export const $T = $declare('TEMPLATE')

import * as $R from '@adi.distro.max326xx/REGS.em'

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
        $R.GPIO[pn].OUT_CLR.$$ = mask
    }

    export function functionSelect(select: u8): void {
        switch (select) {
            case 1: {
                $R.GPIO[pn].EN0_CLR.$$ = mask
                $R.GPIO[pn].EN1_CLR.$$ = mask
                break
            }
            case 2: {
                $R.GPIO[pn].EN0_CLR.$$ = mask
                $R.GPIO[pn].EN1_SET.$$ = mask
                break
            }
        }
    }

    export function get(): bool_t {
        return false
    }

    export function isInput(): bool_t {
        return false
    }

    export function isOutput(): bool_t {
        return true
    }

    export function makeInput(): void {
        $R.GPIO[pn].OUTEN_CLR.$$ = mask
        $R.GPIO[pn].EN0_SET.$$ = mask
    }

    export function makeOutput(): void {
        $R.GPIO[pn].OUTEN_SET.$$ = mask
        $R.GPIO[pn].EN0_SET.$$ = mask
    }

    export function pinId(): i16 {
        return pid
    }

    export function reset(): void {
        $R.GPIO[pn].EN0_SET.$$ = mask
        $R.GPIO[pn].EN1_CLR.$$ = mask
        $R.GPIO[pn].EN2_CLR.$$ = mask
    }

    export function set(): void {
        $R.GPIO[pn].OUT_SET.$$ = mask
    }

    export function setInternalPulldown(enable: bool_t): void { }

    export function setInternalPullup(enable: bool_t): void { }

    export function toggle(): void {
        $R.GPIO[pn].OUT.$$ ^= mask
    }
}

export function $clone() {
    return { $T, ...em$template }
}
