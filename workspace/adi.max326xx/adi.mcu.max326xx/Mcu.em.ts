import em from '@$$emscript'
export const $U = em.$declare('MODULE', McuI)

import * as $R from '@adi.distro.max326xx/REGS.em'

import * as Debug from '@em.lang/Debug.em'
import * as McuI from '@em.hal/McuI.em'

export namespace em$meta {}

export function startup(): void {
    $R.ICC0.CTRL.$$ |= $R.F_ICC_CTRL_EN
    $R.GCR.PCLKDIS0.$$ &= ~($R.F_GCR_PCLKDIS0_GPIO0 | $R.F_GCR_PCLKDIS0_GPIO1)
    Debug.startup()
    $['%%a:'](2)
}
