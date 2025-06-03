import em from '@$$emscript'
export const $U = em.$declare('MODULE', IsrI)

import * as IsrI from '@em.arch.arm/IsrI.em'

export function exec() {
    let dummy: volatile_t<bool_t> = true
    while (dummy) { }
}