import em from '@$$emscript'
export const $U = em.$declare('MODULE', BusyWaitI)

import * as BusyWaitI from '@em.hal/BusyWaitI.em'

export const scalar = $config<u8>(3)

export function wait(usecs: u32): void {
    if (usecs == 0) return
    let cnt = usecs * scalar.$$
    let dummy: volatile_t<u32>
    while (cnt--) dummy = 0
}
