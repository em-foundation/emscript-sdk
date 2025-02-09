import em from '@$$emscript'
export const $U = em.$declare('INTERFACE')

export type Handler = cb_t<[arg_t]>

export interface $I {
    disable(): void
    enable(msecs: u32, handler: Handler, arg: arg_t): void
    uenable(usecs: u32, handler: Handler, arg: arg_t): void
}
