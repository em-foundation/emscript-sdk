import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as EdgeI from '@em.hal/EdgeI.em'
import * as IntrVec from '@em.arch.arm/IntrVec.em'

export class HandlerInfo extends $struct {
    handler: EdgeI.Handler
    mask: u32
}

let handler_info_tab = $table<HandlerInfo>('ro')

export namespace em$meta {

    export function em$construct() {
        IntrVec.em$meta.useIntr('GPIO_COMB')
    }

    export function addHandlerInfo(hi: HandlerInfo) {
        handler_info_tab.$add(hi)
    }
}

export function em$startup() {
    IntrVec.NVIC_enable(e$`GPIO_COMB_IRQn`)
}

export function GPIO_COMB_isr$$() {
    let mis = $R.GPIO.MIS.$$
    for (let i = 0; i < handler_info_tab.$len; i++) {
        let hi = $ref(handler_info_tab[i])
        if ((mis & hi.$$.mask) && hi.$$.handler != $null) {
            hi.$$.handler()
        }
    }
}
