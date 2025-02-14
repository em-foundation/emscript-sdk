import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as BusyWait from '@ti.mcu.cc23xx/BusyWait.em'
import * as GpioI from '@em.hal/GpioI.em'

export const CS = $proxy<GpioI.$I>()
export const CLK = $proxy<GpioI.$I>()
export const PICO = $proxy<GpioI.$I>()
export const POCI = $proxy<GpioI.$I>()

const SD_CMD = <u8>0xB9

export function em$startup() {
    em.$['%%c+']
    CS.$$.makeOutput()
    CLK.$$.makeOutput()
    PICO.$$.makeOutput()
    POCI.$$.makeInput()
    // attention
    CS.$$.set()
    BusyWait.wait(1)
    CS.$$.clear()
    BusyWait.wait(1)
    CS.$$.set()
    BusyWait.wait(50)
    // shutdown command
    CS.$$.clear()
    for (let i = 0; i < 8; i++) {
        CLK.$$.clear()
        const bv = (SD_CMD >> (7 - i)) & 0x01
        if (bv == 0) {
            PICO.$$.clear()
        } else {
            PICO.$$.set()
        }
        CLK.$$.set()
        BusyWait.wait(1)
    }
    CLK.$$.clear()
    CS.$$.set()
    BusyWait.wait(50)
    //
    CS.$$.reset()
    CLK.$$.reset()
    PICO.$$.reset()
    POCI.$$.reset()
    em.$['%%c-']
}
