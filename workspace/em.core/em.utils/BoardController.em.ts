import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as Common from '@em.mcu/Common.em'
import * as LedI from '@em.hal/LedI.em'

export const Led = $proxy<LedI.$I>()

const BLINK_RATE = 50000
const EOT_BYTE = 0x04
const SOT_BYTE = 0x03
const SOT_COUNT = 13

export function em$reset(): void {
    Common.Mcu.$$.startup()
}

export function em$ready(): void {
    Led.$$.off()
    blink(2, BLINK_RATE)
    Common.ConsoleUart.$$.flush()
    Common.ConsoleUart.$$.put(0x00)
    Common.ConsoleUart.$$.put(0x00)
    for (let i of $range(SOT_COUNT)) {
        Common.ConsoleUart.$$.put(SOT_BYTE)
    }
    Common.ConsoleUart.$$.flush()
}

export function em$fail(): void {
    Common.GlobalInterrupts.$$.disable()
    while (true) blink(2, BLINK_RATE)
}

export function em$halt(): void {
    Common.GlobalInterrupts.$$.disable()
    Common.ConsoleUart.$$.put(EOT_BYTE)
    Common.ConsoleUart.$$.flush()
    Led.$$.on()
}

function blink(times: u8, usecs: u32): void {
    for (let _ of $range(times * 2)) {
        Led.$$.toggle()
        Common.BusyWait.$$.wait(usecs)
    }
}
