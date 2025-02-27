import em from '@$$emscript'
export const $U = em.$declare('MODULE', OneShotI)

import * as OneShotI from '@em.hal/OneShotI.em'

export namespace em$meta {}

export function disable(): void {}

export function enable(
    msecs: u32,
    handler: OneShotI.Handler,
    arg: arg_t
): void {}

export function uenable(
    usecs: u32,
    handler: OneShotI.Handler,
    arg: arg_t
): void {}
