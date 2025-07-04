import '@$$emscript'
export const $U = $declare('MODULE', OneShotI)

import * as $R from '@adi.distro.max326xx/REGS.em'

import * as Idle from '@adi.mcu.max326xx/Idle.em'
import * as IntrVec from '@em.arch.arm/IntrVec.em'
import * as OneShotI from '@em.hal/OneShotI.em'
import * as SysOsc from '@adi.mcu.max326xx/SysOsc.em'

export type Handler = OneShotI.Handler

export namespace em$meta {
    export function em$construct() {
        IntrVec.em$meta.useIntr('TMR0')
    }
}

//>> ---- em$targ ---- <<//

const use_ERFO = SysOsc.isUsingERFO()

var cur_arg: arg_t
var cur_fxn: Handler = $null

export function disable(): void {
    cur_fxn = $null
    $R.GCR.PCLKDIS0.$$ |= $R.F_GCR_PCLKDIS0_TMR0
    Idle.setPauseOnly(false)
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
    Idle.setPauseOnly(true)
    IntrVec.NVIC_enable(e$`TMR0_IRQn`)
    $R.GCR.PCLKDIS0.$$ &= ~$R.F_GCR_PCLKDIS0_TMR0
    $R.TMR0.CTRL0.$$ = $R.F_TMR_CTRL0_RST_A
    $R.TMR0.CMP.$$ = usecsToTicks(usecs)
    $R.TMR0.CTRL1.$$ |= $R.F_TMR_CTRL1_CASCADE | $R.F_TMR_CTRL1_IE_A
    const div = use_ERFO ? $R.S_TMR_CTRL0_CLKDIV_A_DIV_BY_16 : $R.S_TMR_CTRL0_CLKDIV_A_DIV_BY_2
    $R.TMR0.CTRL0.$$ = $R.F_TMR_CTRL0_CLKEN_A | div
    $R.TMR0.CTRL0.$$ |= $R.F_TMR_CTRL0_EN_A
}

function usecsToTicks(us: u32): u32 {
    return use_ERFO ? us : (((us * 44) / 3)) - 4
}

export function TMR0_isr$$() {
    IntrVec.NVIC_clear(e$`TMR0_IRQn`)
    $R.TMR0.INTFL.$$ |= $R.F_TMR_INTFL_IRQ_A
    const fxn = cur_fxn
    disable()
    fxn(cur_arg)
}
