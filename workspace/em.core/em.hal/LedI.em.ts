import em from '@$$emscript'
export const $U = em.$declare('INTERFACE')

export interface $I {
    off(): void
    on(): void
    toggle(): void
    wink(msecs: u32): void
}
