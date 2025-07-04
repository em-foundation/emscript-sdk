import '@$$emscript'
export const $U = $declare('MODULE')

import * as Dev from '@em.rf.core/Dev.em'

export namespace em$meta { }

//>> ---- em$targ ---- <<//

var params = Dev.Params.$make()

export function getParams(): $$<Dev.Params> {
    return $ref(params)
}