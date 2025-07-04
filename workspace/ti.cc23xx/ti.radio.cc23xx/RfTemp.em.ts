import '@$$emscript'
export const $U = $declare('MODULE')

import * as $R from '@ti.distro.cc23xx/REGS.em'

export const TXPOWER_REFERENCE_TEMPERATURE: i16 = 25
export const TXPOWER_TEMPERATURE_SCALING: i16 = 0x100

export namespace em$meta { }

//>> ---- em$targ ---- <<//

export function getTemperature(): i16 {
    let temperature: i32 = $R.PMUD.TEMP.$$
    temperature = (temperature & ($R.PMUD_TEMP_INT_M | $R.PMUD_TEMP_FRAC_M)) >> $R.PMUD_TEMP_FRAC_S
    temperature = (temperature << (32 - ($R.PMUD_TEMP_INT_W + $R.PMUD_TEMP_FRAC_W))) >>
        (32 - ($R.PMUD_TEMP_INT_W + $R.PMUD_TEMP_FRAC_W))
    // scaleToReal
    const p1: i32 = 1094172;
    const p0: i32 = -7043721;
    temperature = (temperature * p1) + p0;
    const mask: i32 = (1 << 22);
    if (temperature > 0) {
        temperature = (temperature + mask) / mask
    } else {
        temperature = (temperature - mask) / mask
    }
    return temperature
}