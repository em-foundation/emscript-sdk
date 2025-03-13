import em from '@$$emscript'
export const $U = em.$declare('MODULE', OneShotI)

import * as $R from '@adi.distro.max326xx/REGS.em'

import * as IntrVec from '@em.arch.arm/IntrVec.em'
import * as OneShotI from '@em.hal/OneShotI.em'

export type Handler = OneShotI.Handler

export namespace em$meta {
    export function em$construct() {
        IntrVec.em$meta.useIntr('TMR0')
    }
}

//>> ---- em$targ ---- <<//

var cur_arg: arg_t
var cur_fxn: Handler = $null

export function disable(): void {
    cur_fxn = $null
    $R.GCR.PCLKDIS0.$$ |= $R.F_GCR_PCLKDIS0_TMR0
    IntrVec.NVIC_disable(e$`TMR0_IRQn`)
}

export function enable(msecs: u32, handler: OneShotI.Handler, arg: arg_t): void {
    ustart(msecs * 1000, handler, arg)
}

export function uenable(usecs: u32, handler: OneShotI.Handler, arg: arg_t): void {
    ustart(usecs, handler, arg)
}

function ustart(usecs: u32, handler: OneShotI.Handler, arg: arg_t) {
    cur_fxn = handler
    cur_arg = arg
    IntrVec.NVIC_enable(e$`TMR0_IRQn`)
    $R.GCR.PCLKDIS0.$$ &= ~$R.F_GCR_PCLKDIS0_TMR0
    $R.TMR0.CTRL0.$$ = $R.F_TMR_CTRL0_RST_A
    $R.TMR0.CMP.$$ = usecs
    $R.TMR0.CTRL1.$$ |= $R.F_TMR_CTRL1_CASCADE | $R.F_TMR_CTRL1_IE_A
    $R.TMR0.CTRL0.$$ = $R.F_TMR_CTRL0_CLKEN_A | $R.S_TMR_CTRL0_CLKDIV_A_DIV_BY_16
    $R.TMR0.CTRL0.$$ |= $R.F_TMR_CTRL0_EN_A
}

export function TMR0_isr$$() {
    IntrVec.NVIC_clear(e$`TMR0_IRQn`)
    $R.TMR0.INTFL.$$ |= $R.F_TMR_INTFL_IRQ_A
    const fxn = cur_fxn
    disable()
    fxn(cur_arg)
}
