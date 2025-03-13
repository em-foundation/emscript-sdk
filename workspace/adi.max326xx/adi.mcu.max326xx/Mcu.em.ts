import em from '@$$emscript'
export const $U = em.$declare('MODULE', McuI)

import * as $R from '@adi.distro.max326xx/REGS.em'

import * as Debug from '@em.lang/Debug.em'
import * as McuI from '@em.hal/McuI.em'

export namespace em$meta { }

export function startup(): void {
    // ERFO -> SYSCLK
    $R.GCR.BTLELDOCTRL.$$ |= $R.F_GCR_BTLELDOCTRL_LDORXEN | $R.F_GCR_BTLELDOCTRL_LDOTXEN
    $R.GCR.CLKCTRL.$$ |= $R.F_GCR_CLKCTRL_ISO_EN
    while (($R.GCR.CLKCTRL.$$ & $R.F_GCR_CLKCTRL_ISO_RDY) == 0) { }
    $R.GCR.CLKCTRL.$$ |= $R.F_GCR_CLKCTRL_ERFO_EN
    while (($R.GCR.CLKCTRL.$$ & $R.F_GCR_CLKCTRL_ERFO_RDY) == 0) { }
    $R.GCR.CLKCTRL.$$ |= $R.S_GCR_CLKCTRL_SYSCLK_SEL_ERFO
    //
    $R.ICC0.CTRL.$$ |= $R.F_ICC_CTRL_EN
    $R.GCR.PCLKDIS0.$$ &= ~($R.F_GCR_PCLKDIS0_GPIO0 | $R.F_GCR_PCLKDIS0_GPIO1)
    Debug.startup()
    $['%%a:'](2)
}
