import em from '@$$emscript'
export const $U = em.$declare('INTERFACE')

export interface $I {
    flush(): void
    put(data: u8): void
}
