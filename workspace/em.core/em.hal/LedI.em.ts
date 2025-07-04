import '@$$emscript'
export const $U = $declare('INTERFACE')

export interface $I {
    off(): void
    on(): void
    toggle(): void
    wink(msecs: u32): void
}
