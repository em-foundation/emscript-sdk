import '@$$emscript'
export const $U = $declare('MODULE')

import * as $R from '@ti.distro.cc23xx/REGS.em'

import * as Config from '@em.rf.driver/Config.em'

class Shape extends $struct {
    scale: u32
    freqdev: u32
    coeff: frame_t<u8>
}

const BLE_1M_SHAPE = $config<Shape>()

export namespace em$meta {
    export function em$construct() {
        BLE_1M_SHAPE.$$val.scale = 0x0FDE2
        BLE_1M_SHAPE.$$val.freqdev = 0x0003D090
        BLE_1M_SHAPE.$$val.coeff = $frame<u8>([0x01, 0x02, 0x05, 0x0A, 0x14, 0x22, 0x37, 0x52, 0x71, 0x91, 0xB0, 0xCB, 0xE0, 0xEE, 0xF8, 0xFD, 0xFF])
    }
}

//>> ---- em$targ ---- <<//

const P_FACTOR: u32 = 9
const P_SHIFT: u32 = 4
const Q_MAGN_SHIFT: u32 = 6
const FRAC_NUM_BITS: u32 = 28
const FRAC_EXTRA_BITS: u32 = (32 - FRAC_NUM_BITS)

const fXtalInv0 = 0x00001E52
const fXtalInv1 = 0x02CBD3F0

function countLeadingZeros(valueIn: u16): u32 {
    let value = valueIn
    let numZeros: u32 = 0
    if (value >= 0x0100) {
        value >>= 8
    } else {
        numZeros += 8
    }
    if (value >= 0x10) {
        value >>= 4
    } else {
        numZeros += 4
    }
    if (value >= 0x04) {
        value >>= 2
    } else {
        numZeros += 2
    }
    if (value >= 0x02) { } else {
        numZeros += 1
    }
    return numZeros
}

function findFoff(frequencyOffset: i32, invSynthFreq: u32): u32 {
    if (frequencyOffset == 0) return 0
    let absFrequencyOffset = (frequencyOffset < 0) ? -frequencyOffset : frequencyOffset
    absFrequencyOffset = (absFrequencyOffset + (1 << 5)) >> 6
    absFrequencyOffset *= <i32>invSynthFreq
    absFrequencyOffset = (absFrequencyOffset + (1 << 19)) >> 20
    const fOffRes = (frequencyOffset < 0) ? -absFrequencyOffset : absFrequencyOffset
    return <u32>fOffRes & $R.LRFDRFE_MOD1_FOFF_M
}

function findCalM(frequency: u32, prediv: u32): u32 {
    let frefInv = (fXtalInv1 >> 4) * prediv
    frefInv += 1 << 15
    frefInv >>= 16
    let calM = frefInv * ((frequency + (1 << 14)) >> 15)
    calM += 1 << 15
    calM >>= 16
    return calM
}

function findLog2Bde1(demmisc3: u32): u32 {
    return ((demmisc3 & $R.LRFDMDM_DEMMISC3_BDE1FILTMODE_M) != 0) ? 0 : (demmisc3 & $R.LRFDMDM_DEMMISC3_BDE1NUMSTAGES_M) >> $R.LRFDMDM_DEMMISC3_BDE1NUMSTAGES_S
}

function findPllMBase(frequency: u32): u32 {
    const frefInv = fXtalInv1
    let pllMBase = (frefInv >> 16) * (frequency >> 16)
    let tmpPllMBase = ((frefInv >> 16) * (frequency & 0xFFFF)) >> 1
    tmpPllMBase += ((frefInv & 0xFFFF) * (frequency >> 16)) >> 1
    tmpPllMBase += (1 << 14)
    tmpPllMBase >>= 15
    pllMBase += tmpPllMBase
    pllMBase += 1
    pllMBase >>= 1
    return pllMBase
}

export function program(frequency: u32) {
    const synthFrequency = frequency - 1_000_000 // TODO: generalize for different PHYs & RX/TX
    const synthFrequencyCompensated = scaleFreqWithHFXTOffset(synthFrequency)
    const frequencyDiv2_16 = (synthFrequency + (1 << 15)) >> 16
    $reg32[$R.LRFDRFE32_BASE + $R.LRFDRFE32_O_DIVIDEND] = 1 << 31
    $reg32[$R.LRFDRFE32_BASE + $R.LRFDRFE32_O_DIVISOR] = frequencyDiv2_16
    $reg16[$R.LRFD_RFERAM_BASE + $R.RFE_COMMON_RAM_O_K5] = <u16>frequencyDiv2_16
    let precalSetting = $reg32[$R.LRFDRFE32_BASE + $R.LRFDRFE32_O_PRE3_PRE2]
    const coarsePrecal = (precalSetting & $R.LRFDRFE32_PRE3_PRE2_CRSCALDIV_M) >> $R.LRFDRFE32_PRE3_PRE2_CRSCALDIV_S
    const midPrecal = (precalSetting & ($R.LRFDRFE32_PRE3_PRE2_MIDCALDIVMSB_M | $R.LRFDRFE32_PRE3_PRE2_MIDCALDIVLSB_M)) >> $R.LRFDRFE_PRE2_MIDCALDIVLSB_S
    const calMCoarse = findCalM(synthFrequency, coarsePrecal)
    const calMMid = (coarsePrecal == midPrecal) ? calMCoarse : findCalM(synthFrequency, midPrecal)
    $reg32[$R.LRFDRFE32_BASE + $R.LRFDRFE32_O_CALMMID_CALMCRS] = (calMCoarse << $R.LRFDRFE32_CALMMID_CALMCRS_CALMCRS_VAL_S) |
        (calMMid << $R.LRFDRFE32_CALMMID_CALMCRS_CALMMID_VAL_S)
    precalSetting = $reg32[$R.LRFDRFE32_BASE + $R.LRFDRFE32_O_PRE1_PRE0]
    const precal0 = (precalSetting & $R.LRFDRFE32_PRE1_PRE0_PLLDIV0_M) >> $R.LRFDRFE32_PRE1_PRE0_PLLDIV0_S
    const precal1 = (precalSetting & $R.LRFDRFE32_PRE1_PRE0_PLLDIV1_M) >> $R.LRFDRFE32_PRE1_PRE0_PLLDIV1_S
    const pllMBase = programPQ(findPllMBase(synthFrequency))
    const pllMBaseCompensated = (synthFrequencyCompensated == synthFrequency) ? pllMBase : findPllMBase(synthFrequencyCompensated)
    $reg32[$R.LRFDRFE32_BASE + $R.LRFDRFE32_O_PLLM0] = ((pllMBaseCompensated * precal0) << $R.LRFDRFE32_PLLM0_VAL_S)
    $reg32[$R.LRFDRFE32_BASE + $R.LRFDRFE32_O_PLLM1] = ((pllMBaseCompensated * precal1) << $R.LRFDRFE32_PLLM1_VAL_S)
    while (($reg32[$R.LRFDRFE_BASE + $R.LRFDRFE_O_DIVSTA] & $R.LRFDRFE_DIVSTA_STAT_M) != 0) { }
    const invSynthFreq = $reg32[$R.LRFDRFE32_BASE + $R.LRFDRFE32_O_QUOTIENT]
    $reg16[$R.LRFD_RFERAM_BASE + $R.RFE_COMMON_RAM_O_RXIF] = <u16>findFoff(0, invSynthFreq) // rxFreqOff
    $reg16[$R.LRFD_RFERAM_BASE + $R.RFE_COMMON_RAM_O_TXIF] = <u16>findFoff(1_000_000, invSynthFreq) // txFreqOff
    programCMixN(1_000_000, invSynthFreq) // rxIntFreq
    switch (Config.getPhy()) {
        case Config.Phy.BLE_1M:
        case Config.Phy.PROP_1M:
            programShape(BLE_1M_SHAPE, invSynthFreq << 4)
            break
    }
}

function programCMixN(rxIntFrequency: i32, invSynthFreq: u32) {
    let absRxIntFrequency = (rxIntFrequency < 0) ? -rxIntFrequency : rxIntFrequency
    absRxIntFrequency = (absRxIntFrequency + (1 << 5)) >> 6
    let cMixN = <u32>absRxIntFrequency * invSynthFreq
    cMixN = ((cMixN + (1 << 3)) >> 4) * 9
    const rightShift = (37 - 15) - findLog2Bde1($R.LRFDMDM.DEMMISC3.$$)
    cMixN = (cMixN + (1 << rightShift) - 1) >> rightShift
    const signedCMixN = (rxIntFrequency > 0) ? -(<i32>cMixN) : <i32>cMixN
    cMixN = <u32>signedCMixN & $R.LRFDMDM_DEMMISC0_CMIXN_M
    $R.LRFDMDM.DEMMISC0.$$ = cMixN
    $R.LRFDMDM.SPARE3.$$ = cMixN
}

function programPQ(pllMBase: u32): u32 {
    // TODO verify u5 casts
    let roundingError = false
    let rateWord: u32 = $R.LRFDMDM.BAUD.$$ << 5
    rateWord |= ($R.LRFDMDM.BAUDPRE.$$ & $R.LRFDMDM_BAUDPRE_EXTRATEWORD_M) >> $R.LRFDMDM_BAUDPRE_EXTRATEWORD_S
    const pre: u32 = $R.LRFDMDM.BAUDPRE.$$ & $R.LRFDMDM_BAUDPRE_PRESCALER_M
    const demmisc3: u32 = $R.LRFDMDM.DEMMISC3.$$
    const log2Bde1 = findLog2Bde1(demmisc3)
    const bde2: u32 = (demmisc3 & $R.LRFDMDM_DEMMISC3_BDE2DECRATIO_M) >> $R.LRFDMDM_DEMMISC3_BDE2DECRATIO_S
    const log2PdifDecim: u32 = (demmisc3 & $R.LRFDMDM_DEMMISC3_PDIFDECIM_M) >> $R.LRFDMDM_DEMMISC3_PDIFDECIM_S
    let leftShiftP: u32 = log2Bde1 + log2PdifDecim + P_SHIFT
    let demFracP: u32 = rateWord * bde2
    if (demFracP > (<u64>1 << 32) / P_FACTOR) {
        if ((demFracP & 1) != 0) {
            roundingError = true
        }
        demFracP >>= 1
        leftShiftP -= 1
    }
    demFracP *= P_FACTOR
    let demFracQ: u32 = ((pllMBase + ((1 << Q_MAGN_SHIFT) - 1)) >> Q_MAGN_SHIFT) * pre
    const num0Q: u32 = countLeadingZeros(<u16>(demFracQ >> 16))
    // TODO const pllMShift: i32 = em.as(i32, em.as(u32, Q_MAGN_SHIFT + FRAC_EXTRA_BITS - num0Q))
    const pllMShift: i32 = <i32>(Q_MAGN_SHIFT + FRAC_EXTRA_BITS - num0Q)
    let pllMBaseRounded: u32
    if (pllMShift <= 0) {
        pllMBaseRounded = pllMBase
        demFracQ = pllMBase * pre
        const leftShiftQ = -pllMShift
        leftShiftP += leftShiftQ
        demFracQ <<= leftShiftQ
    } else {
        const pshft5 = pllMShift
        pllMBaseRounded = ((pllMBase + (<u32>1)) << (pshft5 - 1)) >> pshft5
        demFracQ = pllMBaseRounded * pre
        pllMBaseRounded <<= pshft5
        leftShiftP -= <u32>pllMShift
    }
    var lshft5 = leftShiftP
    if (leftShiftP >= 0) {
        demFracP <<= lshft5
    } else {
        lshft5 = -leftShiftP
        if ((demFracP & (<u32>1 << lshft5) - 1) != 0) {
            roundingError = true
        }
        demFracP >>= lshft5
    }
    $reg32[$R.LRFDMDM32_BASE + $R.LRFDMDM32_O_DEMFRAC1_DEMFRAC0] = demFracP
    $reg32[$R.LRFDMDM32_BASE + $R.LRFDMDM32_O_DEMFRAC3_DEMFRAC2] = demFracQ
    return pllMBaseRounded
}


function programShape(shape: Shape, invSynthFreq: u32) {
    const NUM_TAPS = 24
    e$`union { em::u8 b[NUM_TAPS]; em::u32 w[NUM_TAPS/4]; } filterCoeff`
    const deviation = shape.freqdev
    const deviationFactor1: u32 =
        ((deviation >> 12) * invSynthFreq) + (((deviation & 0x0FFF) * invSynthFreq) >> 12)
    const scale = shape.scale
    const deviationFactor2: u32 =
        ((((deviationFactor1 >> 15) * scale) >> 1) + (((deviationFactor1 & 0x7FFF) * scale) >> 16) + (1 << 4)) >> 5
    let shapeGain: u32 = 8 - countLeadingZeros(<u16>(deviationFactor2 >> 11))
    if (shapeGain > 0x7FFFFFF) shapeGain = 0
    const startCoeff: u32 = NUM_TAPS - shape.coeff.$len
    for (const i of $range(startCoeff)) {
        e$`filterCoeff.b[i] = 0`
    }
    for (const i of $range(NUM_TAPS - startCoeff)) {
        const c = <u8>(((deviationFactor2 * shape.coeff[i]) + (1 << (18 + shapeGain))) >> (19 + shapeGain))
        e$`filterCoeff.b[i + startCoeff] = c`
    }
    for (const i of $range(NUM_TAPS / 4)) {
        const off = <u32>($R.LRFDRFE32_O_DTX1_DTX0 + (i * 4))
        $reg32[$R.LRFDRFE32_BASE + off] = e$`filterCoeff.w[i]`
    }
    if (shapeGain > 3) shapeGain = 3
    $R.LRFDRFE.MOD0.$$ = ($R.LRFDRFE.MOD0.$$ & ~$R.LRFDRFE_MOD0_SHPGAIN_M) | (shapeGain << $R.LRFDRFE_MOD0_SHPGAIN_S)
}

function scaleFreqWithHFXTOffset(frequency: u32): u32 {
    const ratio = ($R.CKMD.HFTRACKCTL.$$ & $R.CKMD_HFTRACKCTL_RATIO_M) >> $R.CKMD_HFTRACKCTL_RATIO_S
    let freqOut = frequency
    if (ratio != $R.CKMD_HFTRACKCTL_RATIO_REF48M) {
        const ah = frequency >> 16
        const al = frequency & 0xFFFF
        const bh = ratio >> 16
        const bl = ratio & 0xFFFF
        freqOut = ((bl * ah + bh * al + ((bl * al) >> 16)) >> 6) + ((bh * ah) << 10)
    }
    return frequency
}
