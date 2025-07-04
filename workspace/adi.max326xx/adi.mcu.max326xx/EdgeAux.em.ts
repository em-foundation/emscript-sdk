import '@$$emscript'
export const $U = $declare('MODULE')

import * as $R from '@adi.distro.max326xx/REGS.em'

import * as EdgeI from '@em.hal/EdgeI.em'
import * as IntrVec from '@em.arch.arm/IntrVec.em'

export class HandlerInfo extends $struct {
    handler: EdgeI.Handler
    mask: u32
}

const handler_info_tab = $table<HandlerInfo>()

export namespace em$meta {
    export function em$construct() {
        IntrVec.em$meta.useIntr('GPIO0')
    }

    export function addHandlerInfo(hi: HandlerInfo) {
        handler_info_tab.$$add(hi)
    }
}

export function em$startup() {
    IntrVec.NVIC_enable(e$`GPIO0_IRQn`)
    $R.GCR.PM.$$ |= $R.F_GCR_PM_GPIO_WE
}

export function GPIO0_isr$$() {
    return
    // let intfl = $R.GPIO0.INTFL.$$
    // // $['%%>'](intfl)
    // // $R.GPIO0.INTFL_CLR.$$ = intfl
    // IntrVec.NVIC_clear(e$`GPIO0_IRQn`)
    // for (let hi of handler_info_tab) {
    //     if (intfl & hi.mask && hi.handler != $null) {
    //         hi.handler()
    //     }
    // }
}
