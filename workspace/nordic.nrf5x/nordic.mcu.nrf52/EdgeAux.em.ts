import '@$$emscript'
export const $U = $declare('MODULE')

import * as $R from '@nordic.distro.nrf52/REGS.em'

import * as EdgeI from '@em.hal/EdgeI.em'
import * as IntrVec from '@em.arch.arm/IntrVec.em'

export class HandlerInfo extends $struct {
    handler: EdgeI.Handler
}

const handler_info_tab = $table<HandlerInfo>()

export namespace em$meta {
    export function em$construct() {
        IntrVec.em$meta.useIntr('GPIOTE')
    }

    export function addHandlerInfo(hi: HandlerInfo): u8 {
        const chan = <u8>handler_info_tab.$len
        handler_info_tab.$$add(hi)
        return chan
    }
}

export function em$startup() {
    IntrVec.NVIC_enable(e$`GPIOTE_IRQn`)
}

export function GPIOTE_isr$$() {
    let pc = 0
    for (let hi of handler_info_tab) {
        if ($R.GPIOTE.EVENTS_IN[pc].$$ && hi.handler != $null) {
            hi.handler()
        }
        pc += 1
    }
}
