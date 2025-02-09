import em from '@$$emscript'
export const $U = em.$declare('INTERFACE')

export interface $I {
    exec: () => void
    wakeup: () => void
}
