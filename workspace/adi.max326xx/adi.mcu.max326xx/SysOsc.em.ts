import '@$$emscript'
export const $U = $declare('MODULE')

import * as $R from '@adi.distro.max326xx/REGS.em'

export const use_ERFO = $config<bool_t>(false)

export namespace em$meta {
    export type Src = 'ERFO' | 'IPO'
}

//>> ---- em$targ ---- <<//

export function startup() {
    if (use_ERFO) {
        $R.GCR.BTLELDOCTRL.$$ |= $R.F_GCR_BTLELDOCTRL_LDORXEN | $R.F_GCR_BTLELDOCTRL_LDOTXEN
        $R.GCR.CLKCTRL.$$ |= $R.F_GCR_CLKCTRL_ISO_EN
        while (($R.GCR.CLKCTRL.$$ & $R.F_GCR_CLKCTRL_ISO_RDY) == 0) { }
        $R.GCR.CLKCTRL.$$ |= $R.F_GCR_CLKCTRL_ERFO_EN
        while (($R.GCR.CLKCTRL.$$ & $R.F_GCR_CLKCTRL_ERFO_RDY) == 0) { }
        $R.GCR.CLKCTRL.$$ |= $R.S_GCR_CLKCTRL_SYSCLK_SEL_ERFO
    } else {
        $R.GCR.CLKCTRL.$$ |= $R.F_GCR_CLKCTRL_IPO_EN
        while (($R.GCR.CLKCTRL.$$ & $R.F_GCR_CLKCTRL_IPO_RDY) == 0) { }
        $R.GCR.CLKCTRL.$$ |= $R.S_GCR_CLKCTRL_SYSCLK_SEL_IPO
        $R.GCR.CLKCTRL.$$ |= $R.S_GCR_CLKCTRL_SYSCLK_DIV_DIV1
    }
}

export function isUsingERFO(): bool_t {
    return use_ERFO
}

