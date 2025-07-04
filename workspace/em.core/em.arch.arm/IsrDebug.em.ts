import '@$$emscript'
export const $U = $declare('MODULE', IsrI)

import * as IsrI from '@em.arch.arm/IsrI.em'

//>> ---- em$targ ---- <<//

export function exec() {
    $['%%b:'](3)
    let vnum = <u32>e$`__get_IPSR()`
    $['%%>'](vnum)
    let fp = <ptr_t<u32>>e$`__get_MSP()`
    $['%%>'](fp.$cur())
    for (let _ of $range(8)) {
        $['%%b']
        $['%%>'](fp.$$)
        fp.$inc()
    }
}