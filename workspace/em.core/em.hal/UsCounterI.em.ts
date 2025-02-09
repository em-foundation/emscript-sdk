import em from '@$$emscript'
export const $U = em.$declare('INTERFACE')

export interface $I {
    set(time_us: u32): void
    spin(): void
    start(): void
    stop(): u32
}
