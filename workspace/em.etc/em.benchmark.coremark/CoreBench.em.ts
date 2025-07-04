import '@$$emscript'
export const $U = $declare('MODULE')

import * as Crc from '@em.benchmark.coremark/Crc.em'
import * as ListBench from '@em.benchmark.coremark/ListBench.em'
import * as MatrixBench from '@em.benchmark.coremark/MatrixBench.em'
import * as StateBench from '@em.benchmark.coremark/StateBench.em'
import * as Utils from '@em.benchmark.coremark/Utils.em'

const total_data_size = $config<u16>(2000)
const num_algs = $config<u8>(3)

export namespace em$meta {
    export function em$configure() {
        let memsize = Math.floor(total_data_size / num_algs)
        ListBench.memsize.$$val = memsize
        MatrixBench.memsize.$$val = memsize
        StateBench.memsize.$$val = memsize
    }

    export function em$construct() {
        Utils.em$meta.bindSeed(1, 0x0)
        Utils.em$meta.bindSeed(2, 0x0)
        Utils.em$meta.bindSeed(3, 0x66)
    }
}

//>> ---- em$targ ---- <<//

export function kind(): Utils.Kind {
    return Utils.Kind.FINAL
}

export function print() {
    ListBench.print()
    MatrixBench.print()
    StateBench.print()
}

export function run(arg: i16): Utils.sum_t {
    let crc = ListBench.run(1)
    Utils.setCrc(
        Utils.Kind.FINAL,
        Crc.add16(<i16>crc, Utils.getCrc(Utils.Kind.FINAL))
    )
    crc = ListBench.run(-1)
    Utils.setCrc(
        Utils.Kind.FINAL,
        Crc.add16(<i16>crc, Utils.getCrc(Utils.Kind.FINAL))
    )
    Utils.bindCrc(Utils.Kind.LIST, Utils.getCrc(Utils.Kind.FINAL))
    return Utils.getCrc(Utils.Kind.FINAL)
}

export function setup() {
    ListBench.setup()
    MatrixBench.setup()
    StateBench.setup()
}
