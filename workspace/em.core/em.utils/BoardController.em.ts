import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as Common from '@em.mcu/Common.em'
import * as LedI from '@em.hal/LedI.em'

export const Led = $proxy<LedI.$I>()

const blinkRate = 50000
const EOT_BYTE = 0x04
const SOT_BYTE = 0x03
const SOT_COUNT = 13

export function em$reset(): void {
    Common.Mcu.$$.startup()
}

export function em$ready(): void {
    Led.$$.off()
    blink(2, blinkRate)
    Common.ConsoleUart.$$.flush()
    Common.ConsoleUart.$$.put(0x00)
    Common.ConsoleUart.$$.put(0x00)
    for (let i = 0; i < SOT_COUNT; i++) {
        Common.ConsoleUart.$$.put(SOT_BYTE)
    }
    Common.ConsoleUart.$$.flush()
}

export function em$fail(): void {
    Common.GlobalInterrupts.$$.disable()
    while (true) blink(2, blinkRate)
}

export function em$halt(): void {
    Common.GlobalInterrupts.$$.disable()
    Common.ConsoleUart.$$.put(EOT_BYTE)
    Common.ConsoleUart.$$.flush()
    Led.$$.on()
}

function blink(times: u8, usecs: u32): void {
    for (let i = 0; i < times * 2; i++) {
        Led.$$.toggle()
        Common.BusyWait.$$.wait(usecs)
    }
}
