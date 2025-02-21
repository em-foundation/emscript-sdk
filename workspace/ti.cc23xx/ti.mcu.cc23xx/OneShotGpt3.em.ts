import em from '@$$emscript'
export const $U = em.$declare('MODULE', OneShotI)

import * as Idle from '@ti.mcu.cc23xx/Idle.em'
import * as IntrVec from '@em.arch.arm/IntrVec.em'
import * as OneShotI from '@em.hal/OneShotI.em'

export type Handler = OneShotI.Handler

export namespace em$meta {

    export function em$construct() {
        IntrVec.em$meta.useIntr('LGPT3_COMB')
    }
}

var cur_arg: arg_t
var cur_fxn: Handler = $null

export function disable() {
    cur_fxn = $null
    Idle.setPauseOnly(false)
    IntrVec.NVIC_disable(e$`LGPT3_COMB_IRQn`)
    $R.LGPT3.ICLR.$$ = $R.LGPT_ICLR_TGT
}

export function enable(msecs: u32, handler: OneShotI.Handler, arg: arg_t) {
    ustart(msecs * 1000, handler, arg)
}

export function uenable(usecs: u32, handler: OneShotI.Handler, arg: arg_t) {
    ustart(usecs, handler, arg)
}

function ustart(usecs: u32, handler: OneShotI.Handler, arg: arg_t) {
    cur_fxn = handler
    cur_arg = arg
    Idle.setPauseOnly(true)
    IntrVec.NVIC_enable(e$`LGPT3_COMB_IRQn`)
    $R.CLKCTL.CLKENSET0.$$ = $R.CLKCTL_CLKCFG0_LGPT3
    $R.LGPT3.IMSET.$$ = $R.LGPT_IMSET_TGT
    $R.LGPT3.PRECFG.$$ = 48 << $R.LGPT_PRECFG_TICKDIV_S
    $R.LGPT3.TGT.$$ = usecs
    $R.LGPT3.CTL.$$ = $R.LGPT_CTL_MODE_UP_ONCE | $R.LGPT_CTL_C0RST_RST
}

export function LGPT3_COMB_isr$$() {
    let fxn = cur_fxn
    disable()
    fxn(cur_arg)
}
