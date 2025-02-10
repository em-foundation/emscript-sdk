import em from '@$$emscript'
export const $U = em.$declare('INTERFACE')

export type Key = u32

export interface $I {
    disable(): Key
    enable(): void
    isEnabled(): bool_t
    restore(key: Key): void
}
