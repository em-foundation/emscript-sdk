import em from '@$$emscript'
export const $U = em.$declare('INTERFACE')

export type SleepCB = cb_t<[]>

export interface em$meta {
    addSleepEnter(cb: SleepCB): void
    addSleepLeave(cb: SleepCB): void
}

//>> ---- em$targ ---- <<//

export interface $I {
    em$meta: em$meta
    exec: () => void
    wakeup: () => void
}
