import '@$$emscript'
export const $U = $declare('INTERFACE')

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
