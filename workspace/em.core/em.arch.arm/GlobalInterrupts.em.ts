import em from '@$$emscript'
export const $U = em.$declare('MODULE', GlobalInterruptsI)

import * as GlobalInterruptsI from '@em.hal/GlobalInterruptsI.em'
import * as IntrVec from '@em.arch.arm/IntrVec.em'

export function disable(): GlobalInterruptsI.Key {
    const key = IntrVec.PRIMASK_get()
    e$`asm volatile ("cpsid i" ::: "memory")`
    return <GlobalInterruptsI.Key>key
}

export function enable() {
    e$`asm volatile ("cpsie i" ::: "memory")`
}

export function isEnabled(): bool_t {
    return IntrVec.PRIMASK_get() == 0
}

export function restore(key: GlobalInterruptsI.Key) {
    if (key == 0) enable()
}
