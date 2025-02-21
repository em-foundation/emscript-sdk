import em from '@$$emscript'
export const $T = em.$declare('TEMPLATE')

import * as GpioI from '@em.hal/GpioI.em'

export namespace em$template {

    export const $U = em.$declare('MODULE', GpioI)

    export const pin_num = $config<i16>(-1)

    export namespace em$meta {

        export function pinId(): i16 {
            return pin_num.$$
        }
    }

    const pn = pin_num.$$
    const mask = 1 << pn

    export function clear(): void {
        $R.GPIO.DOUTCLR31_0.$$ = mask
    }

    export function functionSelect(select: u8): void {
        $R.IOC.IOC0.$[pn].$$ = select
    }

    export function get(): bool_t {
        return isInput() ? (($R.GPIO.DIN31_0.$$ & mask) != 0) : (($R.GPIO.DOUT31_0.$$ & mask) != 0)
    }

    export function isInput(): bool_t {
        return ($R.GPIO.DOE31_0.$$ & mask) == 0
    }

    export function isOutput(): bool_t {
        return ($R.GPIO.DOE31_0.$$ & mask) != 0
    }

    export function makeInput(): void {
        $R.GPIO.DOECLR31_0.$$ = mask
        $R.IOC.IOC0.$[pn].$$ |= $R.IOC_IOC0_INPEN

    }

    export function makeOutput(): void {
        $R.GPIO.DOESET31_0.$$ = mask
        $R.IOC.IOC0.$[pn].$$ &= ~$R.IOC_IOC0_INPEN
    }

    export function pinId(): i16 {
        return pn
    }

    export function reset(): void {
        $R.GPIO.DOECLR31_0.$$ = mask
        $R.IOC.IOC0.$[pn].$$ = 0
    }

    export function set(): void {
        $R.GPIO.DOUTSET31_0.$$ = mask
    }

    export function setInternalPulldown(enable: bool_t): void {
        if (enable) {
            $R.IOC.IOC0.$[pn].$$ |= $R.IOC_IOC0_PULLCTL_PULL_DOWN
        } else {
            $R.IOC.IOC0.$[pn].$$ &= ~$R.IOC_IOC0_PULLCTL_PULL_DOWN
        }
    }

    export function setInternalPullup(enable: bool_t): void {
        if (enable) {
            $R.IOC.IOC0.$[pn].$$ |= $R.IOC_IOC0_PULLCTL_PULL_UP
        } else {
            $R.IOC.IOC0.$[pn].$$ &= ~$R.IOC_IOC0_PULLCTL_PULL_UP
        }
    }

    export function toggle(): void {
        $R.GPIO.DOUTTGL31_0.$$ = mask
    }
}

export function $clone() { return { $T, ...em$template } }
