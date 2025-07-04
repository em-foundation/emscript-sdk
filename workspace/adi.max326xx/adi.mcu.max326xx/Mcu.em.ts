import '@$$emscript'
export const $U = $declare('MODULE', McuI)

import * as $R from '@adi.distro.max326xx/REGS.em'

import * as Debug from '@em.lang/Debug.em'
import * as McuI from '@em.hal/McuI.em'
import * as SysOsc from '@adi.mcu.max326xx/SysOsc.em'

export namespace em$meta { }

export function startup(): void {
    const vrego_A = $R.F_SIMO_VREGO_A_RANGEA | ((1750 - 600) / 10)
    $R.SIMO.VREGO_A.$$ = vrego_A
    $R.SIMO.VREGO_A.$$ = vrego_A
    const vrego_B = $R.F_SIMO_VREGO_B_RANGEB | ((1100 - 600) / 10)
    $R.SIMO.VREGO_B.$$ = vrego_B
    $R.SIMO.VREGO_B.$$ = vrego_B
    const vrego_C = $R.F_SIMO_VREGO_C_RANGEC | ((1100 - 600) / 10)
    $R.SIMO.VREGO_C.$$ = vrego_C
    $R.SIMO.VREGO_C.$$ = vrego_C
    SysOsc.startup()
    $R.ICC0.CTRL.$$ |= $R.F_ICC_CTRL_EN
    $R.GCR.PCLKDIS0.$$ &= ~($R.F_GCR_PCLKDIS0_GPIO0 | $R.F_GCR_PCLKDIS0_GPIO1)
    // $R.WDT0.RST.$$ = 0xA5
    // $R.WDT0.RST.$$ = 0x5A
    // $R.WDT0.CTRL.$$ = 0
    // $R.WDT1.RST.$$ = 0xA5
    // $R.WDT1.RST.$$ = 0x5A
    // $R.WDT1.CTRL.$$ = 0
    Debug.startup()
    $['%%a:'](2)
}
