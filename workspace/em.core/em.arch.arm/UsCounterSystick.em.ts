import '@$$emscript'
export const $U = $declare('MODULE', UsCounterI)

import * as UsCounterI from '@em.hal/UsCounterI.em'

export const MHZ_P = $config<u16>(48)
export const MHZ_Q = $config<u16>(1)

const MAX = <u32>0x00ff_ffff

let cur_thresh = <u32>0

export function set(time_us: u32) {
    cur_thresh = MAX - (time_us * MHZ_P / MHZ_Q)
    // $['%%>'](cur_thresh)
    printf`%08x\n`(cur_thresh)
    start()
}

export function spin() {
    let val: volatile_t<u32> = MAX
    while (val > cur_thresh) val = e$`SysTick->VAL`
    e$`SysTick->CTRL = 0`
}

export function start() {
    e$`SysTick->CTRL = (1 << SysTick_CTRL_CLKSOURCE_Pos) | (1 << SysTick_CTRL_ENABLE_Pos)`
    e$`SysTick->LOAD = 0xFFFFFF`
    e$`SysTick->VAL = 0`
}

export function stop(): u32 {
    let lr = <u32>e$`SysTick->LOAD`
    let vr = <u32>e$`SysTick->VAL`
    let dt = (((lr - vr) << 1) * MHZ_Q / MHZ_P) >> 1
    e$`SysTick->CTRL = 0`
    return dt
}
