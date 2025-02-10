import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as BoardC from '@$distro/BoardC.em'
import * as Common from '@em.mcu/Common.em'
import * as CoreBench from '@em.bench.coremark/CoreBench.em'
import * as Utils from '@em.bench.coremark/Utils.em'

const AppLed = $delegate(BoardC.AppLed)

let ITERATIONS = $config<u16>(10)

export function em$startup() {
    CoreBench.setup()
}

export function em$run() {
    AppLed.$$.on()
    Common.BusyWait.$$.wait(250_000)
    AppLed.$$.off()
    Common.UsCounter.$$.start()
    em.$['%%d+']
    for (let i = 0; i < ITERATIONS.$$; i++) {
        CoreBench.run(0)
    }
    em.$['%%d-']
    let usecs = Common.UsCounter.$$.stop()
    AppLed.$$.on()
    Common.BusyWait.$$.wait(250_000)
    AppLed.$$.off()
    printf`usecs = %d\n`(usecs)
    printf`list crc = %04x\n`(Utils.getCrc(Utils.Kind.LIST))
    printf`matrix crc = %04x\n`(Utils.getCrc(Utils.Kind.MATRIX))
    printf`state crc = %04x\n`(Utils.getCrc(Utils.Kind.STATE))
    printf`final crc = %04x\n`(Utils.getCrc(Utils.Kind.FINAL))
}
