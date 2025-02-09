import em from '@$$emscript'
export const $U = em.$declare('MODULE')

import * as Debug from '@em.lang/Debug.em'

const use_sram = $config<bool_t>()

export namespace em$meta {

    export function em$construct() {
        use_sram.$$ = $property('em.lang.BootFlash', false)
    }
}

export function startup(): void {
    Debug.startup()
    em.$['%%a:'](2)
    $R.CKMD.LFCLKSEL.$$ = e$`CKMD_LFCLKSEL_MAIN_LFXT`
    $R.CKMD.LFXTCTL.$$ = $R.CKMD_LFXTCTL_EN
    $R.CKMD.IMSET.$$ = $R.CKMD_IMSET_HFXTFAULT | $R.CKMD_IMSET_TRACKREFLOSS | $R.CKMD_IMSET_LFCLKGOOD
    if (use_sram.$$) {
        $R.CLKCTL.IDLECFG.$$ = 1
        $R.VIMS.CCHCTRL.$$ = 0

    }
}
