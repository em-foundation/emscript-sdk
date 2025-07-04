import '@$$emscript'
export const $U = $declare('MODULE')

import * as $R from '@ti.distro.cc23xx/REGS.em'

import * as RfTemp from '@ti.radio.cc23xx/RfTemp.em'

export namespace em$meta { }

//>> ---- em$targ ---- <<//

const TEMPERATURE_MIN = -40
const TEMPERATURE_MAX = 125
const TEMPERATURE_NOM = 25
const EXTTRIM0_TEMPERATURE_SCALE_EXP = 7
const EXTTRIM1_TEMPERATURE_SCALE_EXP = 4
const DIVLDO_LOW_TEMP_ADJ_FACTOR = 10
const DIVLDO_HIGH_TEMP_ADJ_FACTOR = 10
const TDCLDO_LOW_TEMP_ADJ_FACTOR = 10
const TDCLDO_HIGH_TEMP_ADJ_FACTOR = 10
const RTRIM_LOW_TEMP_ADJ_FACTOR = 1
const RTRIM_HIGH_TEMP_ADJ_FACTOR = 1
const DEFAULT_RTRIM_MAX = 12
const ONE_THIRD_MANTISSA = 21845
const ONE_THIRD_NEG_EXP = 16
const RFE_SPARE1_AGC_VALUE_BM = <u32>0x000FF
const RFE_SPARE1_AGC_VALUE = 0

export function apply() {
    $R.LRFDRFE.PA0.$$ |= e$`LRF_TRIMS->trim0.pa0`
    $R.LRFDRFE.ATSTREFH.$$ |= e$`LRF_TRIMS->trim0.atstRefH`
    $R.LRFDRFE.LNA.$$ |= e$`LRF_TRIMS->trim1.lna`
    $R.LRFDRFE.IFAMPRFLDO.$$ |= e$`LRF_TRIMS->trim1.ifampRfLdo`
    $R.LRFDRFE.DCOLDO0.$$ |= e$`LRF_TRIMS->trim2.dcoLdo0`
    $R.LRFDRFE.IFADCALDO.$$ |= e$`LRF_TRIMS->trim2.ifadcAldo`
    $R.LRFDRFE.IFADCDLDO.$$ |= e$`LRF_TRIMS->trim2.ifadcDldo`
    $R.LRFDMDM.DEMIQMC0.$$ |= e$`LRF_TRIMS->trim4.demIQMC0`
    $reg16[$R.LRFD_RFERAM_BASE + $R.RFE_COMMON_RAM_O_IFAMPRFLDODEFAULT] = $reg16[$R.LRFDRFE_BASE + $R.LRFDRFE_O_IFAMPRFLDO] & <u16>$R.LRFDRFE_IFAMPRFLDO_TRIM_M
    // common: bwIndex = 0, bwIndexDither = 1
    $R.LRFDRFE.IFADCQUANT.$$ |= e$`LRF_TRIMS->trimVariant[0].ifadcQuant`
    $R.LRFDRFE.IFADC0.$$ |= e$`LRF_TRIMS->trimVariant[0].ifadc0`
    $R.LRFDRFE.IFADC1.$$ |= e$`LRF_TRIMS->trimVariant[0].ifadc1`
    $R.LRFDRFE.IFADCLF.$$ |= e$`LRF_TRIMS->trimVariant[0].ifadclf`
    $R.LRFDRFE.IFAMPRFLDO.$$ |= e$`LRF_TRIMS->trim4.ifamprfldo[0]`
    $R.LRFDRFE.IFADC0.$$ &= ~($R.LRFDRFE_IFADC0_DITHEREN_M | $R.LRFDRFE_IFADC0_DITHERTRIM_M) |
        (e$`LRF_TRIMS->trimVariant[1].ifadc0` & ($R.LRFDRFE_IFADC0_DITHEREN_M | $R.LRFDRFE_IFADC0_DITHERTRIM_M))

    // temperature
    $reg16[$R.LRFD_RFERAM_BASE + $R.RFE_COMMON_RAM_O_DIVLDOF] &= ~(<u16>$R.RFE_COMMON_RAM_DIVLDOF_VOUTTRIM_M)
    $reg16[$R.LRFD_RFERAM_BASE + $R.RFE_COMMON_RAM_O_DIVLDOI] &= ~(<u16>$R.RFE_COMMON_RAM_DIVLDOI_VOUTTRIM_M)
    $R.LRFDRFE.TDCLDO.$$ &= ~$R.LRFDRFE_TDCLDO_VOUTTRIM_M
    $R.LRFDRFE.DCO.$$ &= ~$R.LRFDRFE_DCO_TAILRESTRIM_M
    temperatureCompensateTrim()
}

function findExtTrim0TrimAdjustment(temperature: i32, tempCompFactor: i32, offset: i32): i32 {
    return (((temperature - TEMPERATURE_NOM) * tempCompFactor) >> EXTTRIM0_TEMPERATURE_SCALE_EXP) + offset
}

function findExtTrim1TrimAdjustment(temperatureDiff: u32, tempThreshFactor: u32, maxAdjustment: u32): u32 {
    let adjustment: u32 = 0
    switch (tempThreshFactor) {
        case 1:
            adjustment = ((temperatureDiff * maxAdjustment) + (1 << (EXTTRIM1_TEMPERATURE_SCALE_EXP - 1))) >> EXTTRIM1_TEMPERATURE_SCALE_EXP
            break
        case 2:
            adjustment = ((temperatureDiff * maxAdjustment) + (1 << EXTTRIM1_TEMPERATURE_SCALE_EXP)) >> (EXTTRIM1_TEMPERATURE_SCALE_EXP + 1)
            break
        case 3:
            adjustment = ((temperatureDiff * maxAdjustment * ONE_THIRD_MANTISSA) + (1 << (EXTTRIM1_TEMPERATURE_SCALE_EXP + ONE_THIRD_NEG_EXP - 1))) >> (EXTTRIM1_TEMPERATURE_SCALE_EXP + ONE_THIRD_NEG_EXP)
            break
    }
    return adjustment
}

function temperatureCompensateTrim() {
    let divLdoTempOffset: u32 = 0
    let tdcLdoTempOffset: u32 = 0
    let rtrimTempOffset: u32 = 0
    let rssiTempOffset: i32 = 0
    let agcValOffset: i32 = 0

    const temperature = RfTemp.getTemperature()
    const tempLdoRtrim = e$`LRF_TRIMS->trim3.lrfdrfeExtTrim1.tempLdoRtrim`
    const tempThreshLow = TEMPERATURE_MIN + <i16><u16>tempLdoRtrim.tThrl * (1 << EXTTRIM1_TEMPERATURE_SCALE_EXP)
    const tempThreshHigh = TEMPERATURE_MAX - <i16><u16>tempLdoRtrim.tThrh * (1 << EXTTRIM1_TEMPERATURE_SCALE_EXP)
    if (temperature < tempThreshLow) {
        const temperatureDiff: u32 = <u16>(tempThreshLow - temperature)
        divLdoTempOffset = findExtTrim1TrimAdjustment(temperatureDiff, tempLdoRtrim.tThrl, DIVLDO_LOW_TEMP_ADJ_FACTOR * <u32>tempLdoRtrim.divLdoMinOffset)
        tdcLdoTempOffset = findExtTrim1TrimAdjustment(temperatureDiff, tempLdoRtrim.tThrl, TDCLDO_LOW_TEMP_ADJ_FACTOR * <u32>tempLdoRtrim.tdcLdoMinOffset)
        rtrimTempOffset = findExtTrim1TrimAdjustment(temperatureDiff, tempLdoRtrim.tThrl, RTRIM_LOW_TEMP_ADJ_FACTOR * <u32>tempLdoRtrim.rtrimMinOffset)
    } else if (temperature > tempThreshHigh) {
        const temperatureDiff: u32 = <u16>(temperature - tempThreshHigh)
        divLdoTempOffset = findExtTrim1TrimAdjustment(temperatureDiff, tempLdoRtrim.tThrh, DIVLDO_HIGH_TEMP_ADJ_FACTOR * <u32>tempLdoRtrim.divLdoMaxOffset)
        tdcLdoTempOffset = findExtTrim1TrimAdjustment(temperatureDiff, tempLdoRtrim.tThrh, TDCLDO_HIGH_TEMP_ADJ_FACTOR * <u32>tempLdoRtrim.tdcLdoMaxOffset)
        rtrimTempOffset = findExtTrim1TrimAdjustment(temperatureDiff, tempLdoRtrim.tThrh, RTRIM_HIGH_TEMP_ADJ_FACTOR * <u32>tempLdoRtrim.rtrimMaxOffset)
    }
    rssiTempOffset = findExtTrim0TrimAdjustment(temperature, e$`LRF_TRIMS->trim3.lrfdrfeExtTrim0.rssiTcomp`, 0)
    // std AGC
    agcValOffset = findExtTrim0TrimAdjustment(temperature, e$`LRF_TRIMS->trim3.lrfdrfeExtTrim0.magnTcomp`, e$`LRF_TRIMS->trim3.lrfdrfeExtTrim0.magnOffset`)
    let divLdoVoutTrim: u32 = e$`LRF_TRIMS->trim1.divLdo.voutTrim`
    divLdoVoutTrim ^= 0x40
    divLdoVoutTrim += divLdoTempOffset
    const DIV_ONES = ($R.LRFDRFE_DIVLDO_VOUTTRIM_ONES >> $R.LRFDRFE_DIVLDO_VOUTTRIM_S)
    if (divLdoVoutTrim > DIV_ONES) divLdoVoutTrim = DIV_ONES
    $reg16[$R.LRFD_RFERAM_BASE + $R.RFE_COMMON_RAM_O_DIVLDOF] |= (divLdoVoutTrim ^ 0x40) << $R.RFE_COMMON_RAM_DIVLDOF_VOUTTRIM_S
    divLdoVoutTrim += $reg16[$R.LRFD_RFERAM_BASE + $R.RFE_COMMON_RAM_O_DIVLDOIOFF]
    if (divLdoVoutTrim > DIV_ONES) divLdoVoutTrim = DIV_ONES
    let tdcLdoVoutTrim: u32 = e$`LRF_TRIMS->trim1.tdcLdo.voutTrim`
    if (tdcLdoTempOffset > 0) {
        tdcLdoVoutTrim ^= 0x40
        tdcLdoVoutTrim += tdcLdoTempOffset
        const TDC_ONES = ($R.LRFDRFE_TDCLDO_VOUTTRIM_ONES >> $R.LRFDRFE_DIVLDO_VOUTTRIM_S)
        if (tdcLdoVoutTrim > TDC_ONES) tdcLdoVoutTrim = TDC_ONES
        tdcLdoVoutTrim ^= 0x40
    }
    $reg16[$R.LRFDRFE_BASE + $R.LRFDRFE_O_TDCLDO] |= (tdcLdoVoutTrim << $R.LRFDRFE_TDCLDO_VOUTTRIM_S)
    let rtrim: u32 = e$`LRF_TRIMS->trim2.dco.tailresTrim`
    if (rtrim < DEFAULT_RTRIM_MAX) {
        rtrim += rtrimTempOffset
        rtrim += $reg16[$R.LRFD_RFERAM_BASE + $R.RFE_COMMON_RAM_O_RTRIMOFF]
        if (rtrim > DEFAULT_RTRIM_MAX) rtrim = DEFAULT_RTRIM_MAX
    }
    const minRtrim: u32 = $reg16[$R.LRFD_RFERAM_BASE + $R.RFE_COMMON_RAM_O_RTRIMMIN]
    if (rtrim < minRtrim) rtrim = minRtrim
    $reg16[$R.LRFDRFE_BASE + $R.LRFDRFE_O_DCO] |= (rtrim << $R.LRFDRFE_DCO_TAILRESTRIM_S)
    let rssiOffset: i32 = <i32>e$`LRF_TRIMS->trim4.rssiOffset`
    if (e$`LRF_TRIMS->revision` == 4 && rssiOffset <= -4) rssiOffset += 5
    rssiOffset += rssiTempOffset
    rssiOffset += $reg16[$R.LRFD_RFERAM_BASE + $R.RFE_COMMON_RAM_O_PHYRSSIOFFSET]
    $reg16[$R.LRFDRFE_BASE + $R.LRFDRFE_O_RSSIOFFSET] = rssiOffset
    /// **** quick hack
    $reg16[$R.LRFDRFE_BASE + $R.LRFDRFE_O_RSSIOFFSET] = 0x57
    /// ****
    const spare0Val: u32 = $reg16[$R.LRFD_RFERAM_BASE + $R.RFE_COMMON_RAM_O_SPARE0SHADOW]
    $reg16[$R.LRFDRFE_BASE + $R.LRFDRFE_O_SPARE0] = spare0Val
    let spare1Val: u32 = $reg16[$R.LRFD_RFERAM_BASE + $R.RFE_COMMON_RAM_O_SPARE1SHADOW]
    if (agcValOffset != 0) {
        let agcVal: i32 = ((spare1Val & RFE_SPARE1_AGC_VALUE_BM) >> RFE_SPARE1_AGC_VALUE)
        agcVal += agcValOffset
        if (agcVal < 0) agcVal = 0
        const sval = (RFE_SPARE1_AGC_VALUE_BM >> RFE_SPARE1_AGC_VALUE)
        if (agcVal > sval) agcVal = sval
        spare1Val = (spare1Val & ~RFE_SPARE1_AGC_VALUE_BM) | <u32>(agcVal << RFE_SPARE1_AGC_VALUE)
    }
    $reg16[$R.LRFDRFE_BASE + $R.LRFDRFE_O_SPARE1] = spare1Val
    /// **** quick hack
    $reg16[$R.LRFDRFE_BASE + $R.LRFDRFE_O_SPARE1] = 0x2E
}

export function em$run() {
    apply()
}