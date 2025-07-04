import '@$$emscript'
export const $U = $declare('MODULE', McuI)

import * as $R from '@nordic.distro.nrf52/REGS.em'

import * as Debug from '@em.lang/Debug.em'
import * as McuI from '@em.hal/McuI.em'

const use_sram = $config<bool_t>()

export namespace em$meta {
    export function em$construct() {
        use_sram.$$val = $property('em.build.BootFlash', false)
    }
}

function errata(): void {
    // #12
    e$`*(volatile uint32_t *)0x40013540 = (*(uint32_t *)0x10000324 & 0x00001F00) >> 8`
    // #31
    e$`*(volatile uint32_t *)0x4000053C = ((*(volatile uint32_t *)0x10000244) & 0x0000E000) >> 13`
    // #36
    e$`NRF_CLOCK->EVENTS_DONE = 0`
    e$`NRF_CLOCK->EVENTS_CTTO = 0`
    e$`NRF_CLOCK->CTIV = 0`
    // #66
    e$`NRF_TEMP->A0 = NRF_FICR->TEMP.A0`
    e$`NRF_TEMP->A1 = NRF_FICR->TEMP.A1`
    e$`NRF_TEMP->A2 = NRF_FICR->TEMP.A2`
    e$`NRF_TEMP->A3 = NRF_FICR->TEMP.A3`
    e$`NRF_TEMP->A4 = NRF_FICR->TEMP.A4`
    e$`NRF_TEMP->A5 = NRF_FICR->TEMP.A5`
    e$`NRF_TEMP->B0 = NRF_FICR->TEMP.B0`
    e$`NRF_TEMP->B1 = NRF_FICR->TEMP.B1`
    e$`NRF_TEMP->B2 = NRF_FICR->TEMP.B2`
    e$`NRF_TEMP->B3 = NRF_FICR->TEMP.B3`
    e$`NRF_TEMP->B4 = NRF_FICR->TEMP.B4`
    e$`NRF_TEMP->B5 = NRF_FICR->TEMP.B5`
    e$`NRF_TEMP->T0 = NRF_FICR->TEMP.T0`
    e$`NRF_TEMP->T1 = NRF_FICR->TEMP.T1`
    e$`NRF_TEMP->T2 = NRF_FICR->TEMP.T2`
    e$`NRF_TEMP->T3 = NRF_FICR->TEMP.T3`
    e$`NRF_TEMP->T4 = NRF_FICR->TEMP.T4`
    // #108
    e$`*(volatile uint32_t *)0x40000EE4ul = *(volatile uint32_t *)0x10000258ul & 0x0000004Ful`
    // #136
    e$`if (NRF_POWER->RESETREAS & POWER_RESETREAS_RESETPIN_Msk) NRF_POWER->RESETREAS =  ~POWER_RESETREAS_RESETPIN_Msk`
    // #182
    e$` *(volatile uint32_t *) 0x4000173C |= (0x1 << 10)`
}// 

function resetConfig(): void {
    const RESET_PIN = 21
    const con0 = $R.UICR.PSELRESET[0].$$ & $R.UICR_PSELRESET_CONNECT_Msk
    const con1 = $R.UICR.PSELRESET[1].$$ & $R.UICR_PSELRESET_CONNECT_Msk
    if (con0 == 0 && con1 == 0) return
    $R.NVMC.CONFIG.$$ = $R.NVMC_CONFIG_WEN_Wen
    $R.UICR.PSELRESET[0].$$ = RESET_PIN
    while ($R.NVMC.READY.$$ == $R.NVMC_READY_READY_Busy) { }
    $R.UICR.PSELRESET[1].$$ = RESET_PIN
    $R.NVMC.CONFIG.$$ = $R.NVMC_CONFIG_WEN_Ren
    e$`NVIC_SystemReset()`
}

export function startup(): void {
    resetConfig()
    Debug.startup()
    $['%%a:'](2)
    errata()
    e$`NRF_APPROTECT->DISABLE = NRF_UICR->APPROTECT`
    if (!use_sram) {
        $R.NVMC.ICACHECNF.$$ = 1
    }
    // $R.POWER.RAM[2].POWER.$$ = 0
    // $R.POWER.RAM[3].POWER.$$ = 0
    // $R.POWER.RAM[6].POWER.$$ = 0
    // $R.POWER.RAM[7].POWER.$$ = 0
    $R.POWER.DCDCEN.$$ = 1
    $R.CLOCK.LFCLKSRC.$$ = $R.CLOCK_LFCLKSRCCOPY_SRC_Xtal
    $R.CLOCK.TASKS_LFCLKSTART.$$ = 1
}
