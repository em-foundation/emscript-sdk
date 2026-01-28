import '@$$emscript'
export const $U = $declare('MODULE', GlobalInterruptsI)

import * as GlobalInterruptsI from '@em.hal/GlobalInterruptsI.em'

export function disable(): GlobalInterruptsI.Key {
    let key: u32 = 0
    e$`asm volatile("clri %0\nsync" : "=r"(key) : : "memory")`
    return <GlobalInterruptsI.Key>key
}

export function enable() {
    restore(0xf << 2)
}

export function isEnabled(): bool_t {
    const stat32: u32 = e$`_lr(STATUS32)`
    return (stat32 & (1 << 31)) != 0
}

export function restore(key: GlobalInterruptsI.Key) {
    e$`asm volatile("seti %0" : : "r"(key) : "memory")`
}
