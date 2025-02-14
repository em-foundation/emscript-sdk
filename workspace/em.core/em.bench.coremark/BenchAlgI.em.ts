import em from '@$$emscript'
export const $U = em.$declare('INTERFACE')

import * as Utils from '@em.bench.coremark/Utils.em'

export interface $I {
    kind(): Utils.Kind
    print(): void
    run(arg: i16): Utils.sum_t
    setup(): void
}
