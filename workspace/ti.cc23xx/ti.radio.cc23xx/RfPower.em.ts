import '@$$emscript'
export const $U = $declare('MODULE')

import * as $R from '@ti.distro.cc23xx/REGS.em'

import * as LRF from '@ti.radio.cc23xx/LRF.em'
import * as RfTemp from '@ti.radio.cc23xx/RfTemp.em'

export namespace em$meta { }

//>> ---- em$targ ---- <<//

function findEntry(level: i8): LRF.PowerTableEntry {
    for (const entry of LRF.POWER_TABLE) {
        if ((entry.$$).power.dBm >= level) return entry.$$
    }
    return LRF.POWER_TABLE[LRF.POWER_TABLE.$len - 1]
}

export function program(level: i8) {
    const entry = findEntry(level)
    const tempCoeff = entry.tempCoeff
    let value = entry.value
    if (tempCoeff != 0) {
        let ib: i32 = value.bits.ib
        const temperature = RfTemp.getTemperature()
        // em.print("coeff = {d}, ib = {d}, temp = {d}\n", .{ tempCoeff, ib, temperature })
        const IB_MIN: i32 = 1
        const IB_MAX = <i32>($R.LRFDRFE_PA0_IB_MAX >> $R.LRFDRFE_PA0_IB_S)
        ib += (temperature - RfTemp.TXPOWER_REFERENCE_TEMPERATURE) * <i16>tempCoeff / RfTemp.TXPOWER_TEMPERATURE_SCALING
        if (ib < IB_MIN) {
            ib = IB_MIN
        } else if (ib > IB_MAX) ib = IB_MAX
        value.bits.ib = <u8>ib
    }
    $R.LRFDRFE.SPARE5.$$ = value.raw
}
