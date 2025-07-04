import '@$$emscript'
export const $U = $declare('INTERFACE')

export interface $I {
    set(time_us: u32): void
    spin(): void
    start(): void
    stop(): u32
}
