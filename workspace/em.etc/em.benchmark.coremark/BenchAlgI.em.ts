import '@$$emscript'
export const $U = $declare('INTERFACE')

import * as Utils from '@em.benchmark.coremark/Utils.em'

export interface $I {
    kind(): Utils.Kind
    print(): void
    run(arg: i16): Utils.sum_t
    setup(): void
}
