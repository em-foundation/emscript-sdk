import em from '@$$emscript'
export const $U = em.$declare('MODULE', IdleI)

import * as $R from '@adi.distro.max326xx/REGS.em'

import * as IdleI from '@em.hal/IdleI.em'
import * as IntrVec from '@em.arch.arm/IntrVec.em'

export namespace em$meta { }

export function em$startup() {
    $['%%b+']
}

export function exec() {
    $['%%b:'](1)
    $['%%b-']
    IntrVec.PRIMASK_set(1)
    e$`asm volatile ("wfi")`
    $['%%b+']
    IntrVec.PRIMASK_set(0)
}

export function wakeup() { }
