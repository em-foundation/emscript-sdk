import '@$$emscript'
export const $U = $declare('MODULE')

import * as $R from '@ti.distro.cc23xx/REGS.em'

import * as Common from '@em.mcu/Common.em'
import * as Idle from '@ti.mcu.cc23xx/Idle.em'
import * as IntrVec from '@em.arch.arm/IntrVec.em'

export namespace em$meta {
    export function em$construct() {
        IntrVec.em$meta.useIntr('CPUIRQ3')
    }
}

//>> ---- em$targ ---- <<//

const IREF_MAX = 8
const IREF_MIN = 3

var osc_ready: volatile_t<bool_t>

export function em$startup() {
    // Power_init
    $R.CKMD.AMPCFG1.$$ &= ~$R.CKMD_AMPCFG1_INTERVAL_M
    setIrefTrim(IREF_MAX)
    $R.EVTSVT.CPUIRQ3SEL.$$ = $R.EVTSVT_CPUIRQ3SEL_PUBID_AON_CKM_COMB
    IntrVec.NVIC_enable(e$`CPUIRQ3_IRQn`)
}

export function disable() {
    // adjust amplitude
    const stat = $R.CKMD.AMPADCSTAT.$$
    const peak = (stat & $R.CKMD_AMPADCSTAT_PEAKRAW_M) >> $R.CKMD_AMPADCSTAT_PEAKRAW_S
    const bias = (stat & $R.CKMD_AMPADCSTAT_BIAS_M) >> $R.CKMD_AMPADCSTAT_BIAS_S
    const ampl: u32 = (2 * peak > bias) ? (2 * peak - bias) : 0
    const trim: u32 = ($R.CKMD.HFXTTARG.$$ & $R.CKMD_HFXTTARG_IREF_M) >> $R.CKMD_HFXTTARG_IREF_S
    const adjust: i32 = (ampl < 10 && trim < IREF_MAX) ? 1 : (ampl > 16 && trim > IREF_MIN) ? -1 : 0
    setIrefTrim(<u32>(<i32>trim + adjust))
    $R.CKMD.HFXTCTL.$$ &= ~$R.CKMD_HFXTCTL_EN_M
    $R.CKMD.AMPADCCTL.$$ &= ~$R.CKMD_AMPADCCTL_SWOVR
}

export function enable() {
    // $['%%c+']
    // PowerCC23X0_startHFXT()
    $R.CKMD.LDOCTL.$$ =
        $R.CKMD_LDOCTL_SWOVR | $R.CKMD_LDOCTL_STARTCTL | $R.CKMD_LDOCTL_START | $R.CKMD_LDOCTL_EN
    Common.BusyWait.wait(66);
    $R.CKMD.LDOCTL.$$ =
        $R.CKMD_LDOCTL_SWOVR | $R.CKMD_LDOCTL_HFXTLVLEN | $R.CKMD_LDOCTL_EN
    $R.CKMD.AMPADCCTL.$$ =
        $R.CKMD_AMPADCCTL_SWOVR | $R.CKMD_AMPADCCTL_PEAKDETEN_ENABLE | $R.CKMD_AMPADCCTL_ADCEN_ENABLE;
    Common.BusyWait.wait(6);
    $R.CKMD.ICLR.$$ = $R.CKMD_ICLR_ADCBIASUPD
    $R.CKMD.AMPADCCTL.$$ |= $R.CKMD_AMPADCCTL_SARSTRT
    $R.CKMD.AMPADCCTL.$$ &= ~$R.CKMD_AMPADCCTL_SARSTRT
    while (!(($R.CKMD.RIS.$$ & $R.CKMD_RIS_ADCBIASUPD_M) == $R.CKMD_RIS_ADCBIASUPD)) { }
    $R.CKMD.AMPADCCTL.$$ &= ~($R.CKMD_AMPADCCTL_SWOVR_M | $R.CKMD_AMPADCCTL_ADCEN_M)
    $R.CKMD.HFXTCTL.$$ |= $R.CKMD_HFXTCTL_EN
    $R.CKMD.ICLR.$$ = $R.CKMD_ICLR_AMPSETTLED | $R.CKMD_ICLR_LFCLKGOOD
    $R.CKMD.IMSET.$$ = $R.CKMD_IMSET_AMPSETTLED | $R.CKMD_IMSET_LFCLKGOOD
    osc_ready = false
}

function setIrefTrim(iref: u32) {
    let hfxttarg = $R.CKMD.HFXTTARG.$$ & ~$R.CKMD_HFXTTARG_IREF_M
    hfxttarg |= (iref << $R.CKMD_HFXTTARG_IREF_S) & $R.CKMD_HFXTTARG_IREF_M
    $R.CKMD.HFXTTARG.$$ = hfxttarg
}

export function waitReady() {
    Idle.setPauseOnly(true)
    while (!osc_ready) Idle.exec()
    Idle.setPauseOnly(false)
    // PowerCC23X0_oscillatorISR
    //while (($R.CKMD.RIS.$$ & $R.CKMD_RIS_AMPSETTLED) == 0) {}
    $R.CKMD.AMPADCCTL.$$ =
        $R.CKMD_AMPADCCTL_SWOVR | $R.CKMD_AMPADCCTL_PEAKDETEN_ENABLE |
        $R.CKMD_AMPADCCTL_ADCEN_ENABLE | $R.CKMD_AMPADCCTL_SRCSEL_PEAK |
        $R.CKMD_AMPADCCTL_SARSTRT
    //while (($R.CKMD.RIS.$$ & $R.CKMD_MIS_LFCLKGOOD) == 0) {}
    $R.CKMD.LFMONCTL.$$ = $R.CKMD_LFMONCTL_EN
    $R.PMCTL.RSTCTL.$$ |= $R.PMCTL_RSTCTL_LFLOSS_ARMED
    $R.CKMD.ICLR.$$ = $R.CKMD_ICLR_AMPSETTLED | $R.CKMD_ICLR_LFCLKGOOD
    $R.CKMD.HFTRACKCTL.$$ |= $R.CKMD_HFTRACKCTL_EN_M
    // $['%%c-']
}

export function CPUIRQ3_isr$$() {
    IntrVec.NVIC_clear(e$`CPUIRQ3_IRQn`)
    const mis = $R.CKMD.MIS.$$
    $R.CKMD.ICLR.$$ = mis
    $R.CKMD.IMCLR.$$ = mis
    osc_ready = (mis & $R.CKMD_MIS_AMPSETTLED) != 0
    Common.BusyWait.wait(1); // TODO -- needed for SRAM execution

}
